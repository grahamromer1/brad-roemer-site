"use client";

import Cal from "@calcom/embed-react";
import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

export default function Booking() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="book" className="py-20 md:py-32 px-4 sm:px-6 bg-[#0F0F0F]" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <TerminalPrompt command="./book --intro-call" />

        <div className="fade-in-up">
          <h3 className="font-mono text-text-primary text-2xl md:text-3xl font-bold mb-4 text-center">
            Book a free intro call
          </h3>
          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed mb-4 text-center">
            15 minutes. No pressure. We&apos;ll walk through where you are,
            where you want to go, and whether 0to1 AI is the right fit. You&apos;ll
            leave with at least one concrete next step either way.
          </p>
          <p className="font-mono text-xs text-text-dim text-center mb-8">
            // tip: take the <a href="/quiz" className="text-accent-amber hover:underline">free quiz</a> first so we can make the call count.
          </p>

          <div
            className="rounded-lg border border-border-terminal overflow-hidden bg-bg-surface"
            style={{ minHeight: "720px" }}
          >
            <Cal
              namespace="intro-inline"
              calLink="bradroemer/intro"
              config={{ theme: "dark", layout: "month_view" }}
              style={{ width: "100%", minHeight: "720px", overflow: "auto" }}
            />
          </div>

          <p className="font-mono text-text-dim text-sm mt-6 text-center">
            // or email directly:{" "}
            <a
              href="mailto:hello@get0to1.ai"
              className="text-accent-green hover:underline"
            >
              hello@get0to1.ai
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
