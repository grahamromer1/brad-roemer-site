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

function identityFields(body: QuizSubmission) {
  return {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    type: body.type,
    timestamp: body.timestamp,
  };
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
  const isProd = process.env.VERCEL_ENV === "production";

  // Webhook not configured.
  if (!webhookUrl) {
    if (isProd) {
      // In prod this is a silent-loss bug — fail loud so it shows up in
      // alerts and the client can surface a retry.
      // eslint-disable-next-line no-console
      console.error(
        "[quiz/submit] QUIZ_WEBHOOK_URL not set in production",
        identityFields(body)
      );
      return NextResponse.json(
        { ok: false, error: "webhook_not_configured" },
        { status: 500 }
      );
    }

    // Dev / preview — keep UX working without the sheet wired up.
    // eslint-disable-next-line no-console
    console.info(
      "[quiz/submit] QUIZ_WEBHOOK_URL not set — logging only",
      identityFields(body)
    );
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    // Google Apps Script web apps accept POST with JSON body.
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Apps Script can take a few seconds; allow it.
      cache: "no-store",
    });

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error("[quiz/submit] webhook returned non-OK", {
        upstreamStatus: res.status,
        ...identityFields(body),
      });
      return NextResponse.json(
        {
          ok: false,
          error: "webhook_failed",
          upstreamStatus: res.status,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, forwarded: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[quiz/submit] webhook exception", {
      err: err instanceof Error ? err.message : String(err),
      ...identityFields(body),
    });
    return NextResponse.json(
      { ok: false, error: "webhook_exception" },
      { status: 502 }
    );
  }
}
