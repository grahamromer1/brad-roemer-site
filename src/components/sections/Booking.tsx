"use client";

import { useState } from "react";
import Cal from "@calcom/embed-react";
import TerminalPrompt from "@/components/ui/TerminalPrompt";
import Button from "@/components/ui/Button";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

type EventType = "intro" | "strategy";

interface BookingResult {
  ok: boolean;
  bookingUrl?: string;
  message?: string;
  note?: string;
  error?: string;
}

export default function Booking() {
  const ref = useScrollReveal<HTMLElement>();
  const [eventType, setEventType] = useState<EventType>("intro");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);

  async function connectWallet() {
    setError(null);
    const eth = (window as unknown as { ethereum?: { request: (args: { method: string }) => Promise<string[]> } }).ethereum;
    if (!eth) {
      setError("MetaMask not detected. Please install MetaMask to book a paid session.");
      return;
    }
    try {
      const accounts = await eth.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0] ?? null);
    } catch {
      setError("Wallet connection rejected.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      if (eventType === "intro") {
        const res = await fetch("/api/book/intro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        });
        const data = (await res.json()) as BookingResult;
        if (!res.ok) throw new Error(data.error ?? "Booking failed");
        setResult(data);
      } else {
        // Strategy: x402-gated. Use x402-fetch to handle the 402 response.
        if (!walletAddress) {
          throw new Error("Please connect your wallet first.");
        }

        const { wrapFetchWithPayment } = await import("x402-fetch");
        const { createWalletClient, custom, publicActions } = await import("viem");
        const { baseSepolia, base } = await import("viem/chains");

        const useMainnet = process.env.NEXT_PUBLIC_X402_NETWORK === "base";
        const eth = (window as unknown as { ethereum: Parameters<typeof custom>[0] }).ethereum;

        const walletClient = createWalletClient({
          account: walletAddress as `0x${string}`,
          chain: useMainnet ? base : baseSepolia,
          transport: custom(eth),
        }).extend(publicActions);

        // viem's chain-union inference clashes with x402-fetch's narrow Signer type;
        // the runtime shape satisfies the Signer contract.
        const fetchWithPay = wrapFetchWithPayment(
          fetch,
          walletClient as Parameters<typeof wrapFetchWithPayment>[1]
        );
        const res = await fetchWithPay("/api/book/strategy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        });
        const data = (await res.json()) as BookingResult;
        if (!res.ok) throw new Error(data.error ?? "Payment or booking failed");
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const isStrategy = eventType === "strategy";

  return (
    <section id="book" className="py-20 md:py-32 px-4 sm:px-6 bg-[#0F0F0F]" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <TerminalPrompt command="./book --select" />

        <div className="fade-in-up">
          <h3 className="font-mono text-text-primary text-2xl md:text-3xl font-bold mb-4 text-center">
            Ready to get started?
          </h3>
          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed mb-8 text-center">
            Pick your session. Free intro is instant. Strategy session is gated by a $1 USDC payment on Base.
          </p>

          {/* Event type selector */}
          <div
            role="tablist"
            aria-label="Booking type"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
          >
            <button
              role="tab"
              aria-selected={!isStrategy}
              onClick={() => {
                setEventType("intro");
                setResult(null);
                setError(null);
              }}
              className={`text-left p-5 rounded-lg border transition-all font-mono ${
                !isStrategy
                  ? "border-accent-green bg-bg-surface shadow-[0_0_15px_rgba(74,222,128,0.15)]"
                  : "border-border-terminal bg-bg-surface/50 hover:border-text-dim"
              }`}
            >
              <div className="text-text-primary font-bold mb-1">Intro Call</div>
              <div className="text-sm">
                <span className="text-text-dim">15 min · </span>
                <span className="text-accent-green">Free</span>
              </div>
            </button>
            <button
              role="tab"
              aria-selected={isStrategy}
              onClick={() => {
                setEventType("strategy");
                setResult(null);
                setError(null);
              }}
              className={`text-left p-5 rounded-lg border transition-all font-mono ${
                isStrategy
                  ? "border-accent-green bg-bg-surface shadow-[0_0_15px_rgba(74,222,128,0.15)]"
                  : "border-border-terminal bg-bg-surface/50 hover:border-text-dim"
              }`}
            >
              <div className="text-text-primary font-bold mb-1">Strategy Session</div>
              <div className="text-sm">
                <span className="text-text-dim">60 min · </span>
                <span className="text-accent-green">$1 USDC</span>
                <span className="text-text-dim"> on Base</span>
              </div>
            </button>
          </div>

          {/* Booking form */}
          {!result && (
            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-border-terminal bg-bg-surface p-6 space-y-4"
            >
              <div>
                <label htmlFor="name" className="block font-mono text-sm text-text-secondary mb-1">
                  <span className="text-accent-cyan">name:</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-bg-primary border border-border-terminal rounded px-3 py-2 font-mono text-text-primary focus:border-accent-green outline-none"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-sm text-text-secondary mb-1">
                  <span className="text-accent-cyan">email:</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg-primary border border-border-terminal rounded px-3 py-2 font-mono text-text-primary focus:border-accent-green outline-none"
                  placeholder="jane@example.com"
                />
              </div>

              {/* Wallet UI only for strategy */}
              {isStrategy && (
                <div className="border-t border-border-terminal pt-4">
                  <p className="font-mono text-xs text-text-dim mb-3">
                    <span className="text-accent-amber">[!]</span> Paid session — requires MetaMask
                  </p>
                  {walletAddress ? (
                    <p className="font-mono text-sm text-text-secondary">
                      <span className="text-accent-green">wallet:</span>{" "}
                      {walletAddress.slice(0, 6)}…{walletAddress.slice(-4)}
                    </p>
                  ) : (
                    <Button onClick={connectWallet} variant="secondary">
                      Connect Wallet
                    </Button>
                  )}
                </div>
              )}

              {error && (
                <p className="font-mono text-sm text-accent-amber" role="alert">
                  <span aria-hidden="true">[!]</span> {error}
                </p>
              )}

              <div className="pt-2">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading || (isStrategy && !walletAddress)}
                >
                  {loading
                    ? "Processing…"
                    : isStrategy
                    ? "Pay $1 & Book Strategy Session"
                    : "Book Intro Call"}
                </Button>
              </div>
            </form>
          )}

          {/* Success: show Cal.com embed */}
          {result?.ok && (
            <div className="space-y-4">
              <div className="rounded-lg border border-accent-green/40 bg-accent-green/5 p-5">
                <p className="font-mono text-accent-green text-sm mb-1">
                  [ok] {result.message}
                </p>
                {result.note && (
                  <p className="font-mono text-text-dim text-xs">// {result.note}</p>
                )}
              </div>

              <div className="rounded-lg border border-border-terminal overflow-hidden">
                <Cal
                  namespace={eventType}
                  calLink={isStrategy ? "bradroemer/strategy" : "bradroemer/intro"}
                  config={{ theme: "dark", layout: "month_view" }}
                  style={{ width: "100%", height: "100%", overflow: "auto" }}
                />
              </div>
            </div>
          )}

          <p className="font-mono text-text-dim text-sm mt-6 text-center">
            // or email directly:{" "}
            <a
              href="mailto:brad@bradroemer.com"
              className="text-accent-green hover:underline"
            >
              brad@bradroemer.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
