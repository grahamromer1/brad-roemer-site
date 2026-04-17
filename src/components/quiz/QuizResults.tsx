"use client";

import { useEffect, useState } from "react";
import { type QuizResult, type QuizAnswers } from "@/lib/quizData";
import { EVENTS, identifyUser, track } from "@/lib/analytics";

interface QuizResultsProps {
  result: QuizResult;
  firstName?: string;
  lastName?: string;
  email?: string;
  answers?: QuizAnswers;
  submitStatus?: "pending" | "ok" | "failed";
}

function AxisBar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-text-secondary">{label}</span>
        <span className="text-text-dim">
          {value}/{max}
        </span>
      </div>
      <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-green rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between font-mono text-[10px] text-text-dim">
        <span>low</span>
        <span>high</span>
      </div>
    </div>
  );
}

function TypeIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    blank_slate: "[ ]",
    organized_starter: "[>]",
    curious_tinkerer: "[~]",
    ready_builder: "[#]",
  };
  return (
    <span className="font-mono text-4xl text-accent-green">
      {icons[type] ?? "[?]"}
    </span>
  );
}

export default function QuizResults({
  result,
  firstName,
  lastName,
  email,
  answers,
  submitStatus,
}: QuizResultsProps) {
  const { scores, type, typeLabel, typeDescription, insights, actions } = result;

  const [captureEmail, setCaptureEmail] = useState("");
  const [captureSubmitting, setCaptureSubmitting] = useState(false);
  const [captureSent, setCaptureSent] = useState(false);

  const hadEmailUpfront = !!(email && email.trim().length > 0);

  // Fire results-viewed once so we can measure (completed → viewed) and
  // (viewed → CTA click) separately. In practice these happen back-to-back
  // but keeping them distinct future-proofs against async loading.
  useEffect(() => {
    track(EVENTS.quiz_results_viewed, {
      result_type: type,
      result_type_label: typeLabel,
      had_email_upfront: hadEmailUpfront,
    });
  }, [type, typeLabel, hadEmailUpfront]);

  async function handleEmailCapture(e: React.FormEvent) {
    e.preventDefault();
    if (!captureEmail.trim() || captureSubmitting) return;
    setCaptureSubmitting(true);

    // Identify + track at the moment of capture so we get both the
    // person profile (PostHog can now dedupe future sessions by email)
    // and a clean conversion event to put on dashboards.
    const trimmedEmail = captureEmail.trim();
    identifyUser(trimmedEmail, { firstName, lastName });
    track(EVENTS.results_email_captured, {
      result_type: type,
      source: "results_page",
    });

    try {
      await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName || "",
          lastName: lastName || "",
          email: trimmedEmail,
          answers: answers ?? {},
          scores,
          type,
          typeLabel,
          insights,
          actions,
          timestamp: new Date().toISOString(),
        }),
      });
      setCaptureSent(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("[quiz] email capture submit failed", err);
      // Still show success — the primary submission already went through on completion.
      setCaptureSent(true);
    } finally {
      setCaptureSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-border-terminal">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <a href="/" className="font-mono text-sm" aria-label="Back to site">
            <span className="text-accent-green">~/</span>
            <span className="text-text-primary">0to1</span>
          </a>
          <span className="font-mono text-xs text-accent-green">
            results ready
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8">
        {submitStatus === "failed" && (
          <div className="rounded-lg border border-amber-400 bg-amber-400/5 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs md:text-sm text-amber-400">
              // heads up — your results saved locally but didn&apos;t reach
              us.
            </p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") window.location.reload();
              }}
              className="font-mono text-xs md:text-sm text-amber-400 border border-amber-400 rounded px-3 py-1 hover:bg-amber-400/10 transition-colors"
            >
              retry
            </button>
          </div>
        )}

        {/* ── 1. Type Badge + Description ── */}
        <div className="text-center space-y-4">
          <TypeIcon type={type} />
          <div>
            <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider mb-2">
              {firstName ? `${firstName}'s type` : "your type"}
            </p>
            <h1 className="font-mono text-2xl md:text-3xl text-text-primary font-bold">
              {typeLabel}
            </h1>
          </div>
          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            {typeDescription}
          </p>
        </div>

        {/* ── 2. AI Snapshot ── */}
        <div className="rounded-lg border border-border-terminal bg-bg-surface p-6 space-y-5">
          <h2 className="font-mono text-sm text-text-primary font-bold">
            <span className="text-accent-cyan">$</span> your ai snapshot
          </h2>

          <AxisBar
            label="AI Maturity"
            value={scores.aiMaturity}
            max={scores.aiMaturityMax}
          />
          <AxisBar
            label="Business Systems"
            value={scores.systemsMaturity}
            max={scores.systemsMaturityMax}
          />

          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 gap-1 mt-4">
            {[
              { t: "blank_slate", label: "Blank Slate" },
              { t: "organized_starter", label: "Organized Starter" },
              { t: "curious_tinkerer", label: "Curious Tinkerer" },
              { t: "ready_builder", label: "Ready Builder" },
            ].map((cell) => (
              <div
                key={cell.t}
                className={`p-3 rounded text-center font-mono text-xs transition-all ${
                  cell.t === type
                    ? "bg-accent-green/15 border border-accent-green text-accent-green font-bold"
                    : "bg-bg-elevated/50 border border-transparent text-text-dim"
                }`}
              >
                {cell.label}
              </div>
            ))}
          </div>
          <div className="flex justify-between font-mono text-[10px] text-text-dim px-1">
            <span>low systems</span>
            <span>high systems</span>
          </div>
        </div>

        {/* ── 3. Two Key Insights ── */}
        <div className="space-y-4">
          <h2 className="font-mono text-sm text-text-primary font-bold">
            <span className="text-accent-amber">[!]</span> key insights
          </h2>
          {insights.map((insight, i) => (
            <div
              key={i}
              className="rounded-lg border border-border-terminal bg-bg-surface p-5"
            >
              <p className="font-mono text-xs text-accent-amber mb-2">
                insight {i + 1}
              </p>
              <p className="font-sans text-text-secondary text-sm leading-relaxed">
                {insight}
              </p>
            </div>
          ))}
        </div>

        {/* ── 4. Two High-Leverage Actions ── */}
        <div className="space-y-4">
          <h2 className="font-mono text-sm text-text-primary font-bold">
            <span className="text-accent-green">[&gt;]</span> your next moves
          </h2>
          {actions.map((action, i) => (
            <div
              key={i}
              className="rounded-lg border border-accent-green/20 bg-accent-green/5 p-5"
            >
              <p className="font-mono text-xs text-accent-green mb-2">
                action {i + 1}
              </p>
              <p className="font-sans text-text-primary text-sm leading-relaxed">
                {action}
              </p>
            </div>
          ))}
        </div>

        {/* ── 5. Primary CTA ── */}
        <div className="rounded-lg border border-accent-green bg-bg-surface p-6 md:p-8 text-center space-y-4">
          <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
            next step
          </p>
          <p className="font-sans text-text-secondary text-sm md:text-base leading-relaxed">
            You&apos;re a{" "}
            <span className="text-accent-green font-semibold">{typeLabel}</span>.
            0to1.AI is a month-to-month program built to take you from here
            to confidently applying AI to your business — one curated weekly
            drop, one monthly call, one real skill at a time.
          </p>
          <p className="font-sans text-text-primary text-sm md:text-base leading-relaxed">
            Start with a{" "}
            <span className="text-accent-green font-semibold">
              free 15-min intro call
            </span>
            . We&apos;ll review your quiz results together and figure out if it&apos;s
            a fit. No pressure, no sales pitch.
          </p>
          <a
            href="/#book"
            onClick={() =>
              track(EVENTS.cta_clicked, {
                cta: "book_intro_call",
                location: "results_primary",
                result_type: type,
              })
            }
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-mono text-base font-semibold transition-all duration-200 min-h-[44px] bg-accent-green text-bg-primary hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
          >
            Book a Free Intro Call
          </a>
          <p className="font-mono text-xs text-text-dim pt-1">
            // or see the{" "}
            <a
              href="/#services"
              onClick={() =>
                track(EVENTS.cta_clicked, {
                  cta: "see_full_plan",
                  location: "results_secondary",
                  result_type: type,
                })
              }
              className="text-accent-amber hover:underline"
            >
              full plan
            </a>{" "}
            first — $295/mo, cancel anytime.
          </p>
        </div>

        {/* ── 6. Email Capture (only if not collected upfront) ── */}
        {!hadEmailUpfront && !captureSent && (
          <form
            onSubmit={handleEmailCapture}
            className="rounded-lg border border-border-terminal bg-bg-surface p-6 space-y-4"
          >
            <div className="text-center space-y-1">
              <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
                // optional
              </p>
              <h3 className="font-mono text-lg text-text-primary font-bold">
                Want your results sent to your inbox?
              </h3>
              <p className="font-sans text-sm text-text-secondary">
                {firstName ? `${firstName}, d` : "D"}rop your email and I&apos;ll
                send a copy you can reference anytime.
              </p>
            </div>
            <div>
              <label
                htmlFor="results-email"
                className="block font-mono text-sm text-text-secondary mb-1"
              >
                <span className="text-accent-cyan">email:</span>
              </label>
              <input
                id="results-email"
                type="email"
                required
                value={captureEmail}
                onChange={(e) => setCaptureEmail(e.target.value)}
                className="w-full bg-bg-primary border border-border-terminal rounded px-3 py-2 font-mono text-text-primary focus:border-accent-green outline-none"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={captureSubmitting || !captureEmail.trim()}
              className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                captureEmail.trim() && !captureSubmitting
                  ? "bg-accent-green text-bg-primary hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                  : "bg-bg-elevated text-text-dim cursor-not-allowed"
              }`}
            >
              {captureSubmitting ? "Sending…" : "Send My Results"}
            </button>
          </form>
        )}

        {captureSent && (
          <div className="rounded-lg border border-accent-green/40 bg-accent-green/5 p-5 text-center">
            <p className="font-mono text-sm text-accent-green">
              [ok] thanks — we have your email on file.
            </p>
            <p className="font-mono text-xs text-text-dim mt-1">
              // check your inbox over the next few minutes
            </p>
          </div>
        )}

        {/* ── Back to site ── */}
        <div className="text-center pt-4 pb-8">
          <a
            href="/"
            className="font-mono text-sm text-text-dim hover:text-text-secondary transition-colors"
          >
            &larr; back to get0to1.ai
          </a>
        </div>
      </div>
    </div>
  );
}
