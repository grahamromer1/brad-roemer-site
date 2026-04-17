// Centralized, typed event tracking for PostHog. Keeps event names in
// one place so the quiz funnel stays consistent and typos don't silently
// break dashboards. All helpers are safe to call before PostHog boots —
// they no-op on the server and when the client isn't initialized yet.

import posthog from "posthog-js";

type EventProps = Record<string, unknown>;

// Every custom event the app fires. Add new ones here; dashboards read
// these names literally.
export const EVENTS = {
  quiz_intro_viewed: "quiz_intro_viewed",
  quiz_started: "quiz_started",
  quiz_question_answered: "quiz_question_answered",
  quiz_completed: "quiz_completed",
  quiz_results_viewed: "quiz_results_viewed",
  results_email_captured: "results_email_captured",
  cta_clicked: "cta_clicked",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

function isReady(): boolean {
  return typeof window !== "undefined" && typeof posthog?.capture === "function";
}

export function track(event: EventName, props?: EventProps): void {
  if (!isReady()) return;
  try {
    posthog.capture(event, props);
  } catch {
    /* swallow — analytics must never break the app */
  }
}

// Associate this browser session with a user. PostHog treats the first
// argument as a stable user ID; using email gives us person profiles we
// can filter on. Safe to call repeatedly.
export function identifyUser(
  email: string,
  traits?: { firstName?: string; lastName?: string }
): void {
  if (!isReady() || !email) return;
  try {
    posthog.identify(email, {
      email,
      ...(traits?.firstName ? { first_name: traits.firstName } : {}),
      ...(traits?.lastName ? { last_name: traits.lastName } : {}),
    });
  } catch {
    /* swallow */
  }
}

// Reset identity on logout/reset flows (not used yet but cheap to expose).
export function resetIdentity(): void {
  if (!isReady()) return;
  try {
    posthog.reset();
  } catch {
    /* swallow */
  }
}
