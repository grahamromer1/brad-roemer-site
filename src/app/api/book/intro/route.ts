import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
    type: "intro",
    durationMinutes: 15,
    bookingUrl: `https://cal.com/bradroemer/intro?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
    message: "Intro call unlocked — complete your booking on Cal.com.",
  });
}
