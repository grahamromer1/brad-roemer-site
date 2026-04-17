"use client";

import { EVENTS, track } from "@/lib/analytics";
import Button from "@/components/ui/Button";

// Thin client wrapper around Button that fires a `cta_clicked` event
// tagged with the surface (hero, services, booking, etc.). Use this
// instead of <Button href="/quiz"> anywhere you want to know which
// surface drove a quiz start. Keeping the wrapper small means server
// components can keep their RSC benefits — only this tiny leaf runs
// on the client.

interface TrackedQuizCtaProps {
  children: React.ReactNode;
  location: string;
  variant?: "primary" | "secondary";
  className?: string;
  "aria-label"?: string;
}

export function TrackedQuizCtaButton({
  children,
  location,
  variant = "primary",
  className,
}: TrackedQuizCtaProps) {
  return (
    <Button
      href="/quiz"
      variant={variant}
      className={className}
      onClick={() =>
        track(EVENTS.cta_clicked, { cta: "take_quiz", location })
      }
    >
      {children}
    </Button>
  );
}

interface TrackedQuizLinkProps {
  children: React.ReactNode;
  location: string;
  className?: string;
}

export function TrackedQuizLink({
  children,
  location,
  className,
}: TrackedQuizLinkProps) {
  return (
    <a
      href="/quiz"
      className={className}
      onClick={() =>
        track(EVENTS.cta_clicked, { cta: "take_quiz", location })
      }
    >
      {children}
    </a>
  );
}
