import { NextRequest, NextResponse } from "next/server";

// Keep the endpoint dynamic — we never want it cached.
export const dynamic = "force-dynamic";

interface QuizSubmission {
  firstName?: string;
  lastName?: string;
  email?: string;
  answers?: Record<string, { selected?: string[]; openText?: string }>;
  scores?: { aiMaturity?: number; systemsMaturity?: number };
  type?: string;
  typeLabel?: string;
  insights?: string[];
  actions?: string[];
  timestamp?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: QuizSubmission;
  try {
    body = (await request.json()) as QuizSubmission;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.QUIZ_WEBHOOK_URL;

  // If no webhook configured, log server-side and return success so the UX
  // works in dev / before Google Sheets is wired up.
  if (!webhookUrl) {
    // eslint-disable-next-line no-console
    console.info("[quiz/submit] QUIZ_WEBHOOK_URL not set — logging only", {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      type: body.type,
      timestamp: body.timestamp,
    });
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    // Google Apps Script web apps accept POST with JSON body.
    // We don't await the response content — only care that it completed.
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Apps Script can take a few seconds; allow it.
      cache: "no-store",
    });

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.warn("[quiz/submit] webhook returned non-OK", res.status);
      return NextResponse.json({ ok: true, forwarded: false });
    }

    return NextResponse.json({ ok: true, forwarded: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[quiz/submit] webhook error", err);
    // Still return ok — we don't want to block the user's results.
    return NextResponse.json({ ok: true, forwarded: false });
  }
}
