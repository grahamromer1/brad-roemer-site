"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Initialize PostHog client-side with privacy-friendly defaults.
// - api_host points at our reverse proxy (/ingest) to bypass ad blockers.
// - person_profiles: 'identified_only' means anonymous visitors do NOT
//   create person profiles until we call posthog.identify() (e.g. on
//   quiz submission). This keeps our profile count clean and free tier-friendly.
// - capture_pageview: false — we capture pageviews manually below so we
//   correctly handle Next.js App Router client-side navigation.
// - respect_dnt: true — honor browser Do Not Track header.
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return; // no-op in local dev until env var is set

    posthog.init(key, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: true,
      respect_dnt: true,
      session_recording: {
        maskAllInputs: true,
        maskInputOptions: {
          password: true,
          email: false,
        },
      },
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") ph.debug(false);
      },
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPageView />
      {children}
    </PHProvider>
  );
}

function PageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    let url = window.location.origin + pathname;
    const qs = searchParams?.toString();
    if (qs) url += `?${qs}`;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

// useSearchParams() requires a Suspense boundary in App Router.
function SuspendedPageView() {
  return (
    <Suspense fallback={null}>
      <PageView />
    </Suspense>
  );
}
