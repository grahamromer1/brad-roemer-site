"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import LazyCalEmbed from "@/components/ui/LazyCalEmbed";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";
import { EVENTS, track } from "@/lib/analytics";

export default function Booking() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="book" className="py-20 md:py-32 px-4 sm:px-6 bg-[#0F0F0F]" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <TerminalPrompt
          command="./book --intro-call"
          heading="Book a free intro call"
          subheading="15 minutes, free, no pitch"
        />

        <div className="fade-in-up">
          <h3 className="font-mono text-text-primary text-2xl md:text-3xl font-bold mb-4 text-center">
            Book a free intro call
          </h3>
          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed mb-4 text-center">
            15 minutes. No pitch, no pressure. We&apos;ll look at where you are
            with AI right now, what&apos;s most relevant to your business and
            your life, and whether 0to1.AI is the right fit.
          </p>
          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed mb-4 text-center">
            You&apos;ll leave with a concrete next step either way — even if
            you don&apos;t sign up.
          </p>
          <p className="font-mono text-xs text-text-dim text-center mb-8">
            // tip: take the{" "}
            <a
              href="/quiz"
              onClick={() =>
                track(EVENTS.cta_clicked, {
                  cta: "take_quiz",
                  location: "booking_tip",
                })
              }
              className="text-accent-amber hover:underline"
            >
              free quiz
            </a>{" "}
            first so we can make the call count.
          </p>

          {/* TODO: Cal.com doesn't natively support hiding times until date
              selection — may need custom CSS or embed config update */}
          <LazyCalEmbed />

          <p className="font-mono text-text-dim text-xs mt-2 text-center">
            // all times shown in Pacific Time (PST)
          </p>

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
