"use client";

import Cal from "@calcom/embed-react";
import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

export default function Booking() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="book" className="py-20 md:py-32 px-4 sm:px-6 bg-[#0F0F0F]" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <TerminalPrompt command="./book --intro" />

        <div className="fade-in-up">
          <h3 className="font-mono text-text-primary text-2xl md:text-3xl font-bold mb-4">
            Ready to get started?
          </h3>

          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed mb-10">
            Book a free 15-minute intro call.
            <br />
            No pitch. No pressure. Just a conversation about whether AI can help your business.
          </p>

          <div className="rounded-lg border border-border-terminal overflow-hidden">
            <Cal
              namespace="intro"
              calLink="bradroemer/intro"
              config={{
                theme: "dark",
                layout: "month_view",
              }}
              style={{ width: "100%", height: "100%", overflow: "auto" }}
            />
          </div>

          <p className="font-mono text-text-dim text-sm mt-6">
            // or email directly:{" "}
            <a
              href="mailto:brad@bradroemer.com"
              className="text-accent-green hover:underline"
            >
              brad@bradroemer.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
