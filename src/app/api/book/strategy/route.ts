import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "x402-next";
import type { Address } from "viem";

const WALLET_ADDRESS = (process.env.WALLET_ADDRESS ?? "0x0000000000000000000000000000000000000000") as Address;
const ENABLE_X402 = process.env.ENABLE_X402 === "true";
const NETWORK = process.env.X402_NETWORK === "base" ? "base" : "base-sepolia";

async function handler(request: NextRequest): Promise<NextResponse> {
  const body = await request.json().catch(() => ({}));
  const { name, email } = body as { name?: string; email?: string };

  if (!name || !email) {
    return NextResponse.json(
      { error: "name and email are required" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    type: "strategy",
    durationMinutes: 60,
    bookingUrl: `https://cal.com/bradroemer/strategy?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
    message: "Payment received — complete your Strategy Session booking on Cal.com.",
    note: "Paid via x402 ($1 USDC)",
  });
}

export const POST = ENABLE_X402
  ? withX402(handler, WALLET_ADDRESS, {
      price: "$1",
      network: NETWORK,
      config: {
        description: "Book a 60-minute paid strategy session with Brad Roemer",
      },
    })
  : handler;
