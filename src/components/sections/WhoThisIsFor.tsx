"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import TerminalWindow from "@/components/ui/TerminalWindow";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const BUYERS = [
  "Realtors, brokers, and real estate teams",
  "Insurance and financial advisors",
  "Coaches and consultants",
  "Bookkeepers and small accounting firms",
  "Agency owners with 2–10 employees",
  "Healthcare and wellness practice owners",
  "Trade business owners ($500k–$5M)",
  "Other operators ready to install AI in their business",
];

export default function WhoThisIsFor() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="who-this-is-for"
      className="py-20 md:py-32 px-4 sm:px-6"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto">
        <TerminalPrompt
          command="cat who-this-is-for.md"
          heading="Built for revenue-generating operators"
          subheading="Who this is for"
        />

        <div className="fade-in-up">
          <TerminalWindow filename="who-this-is-for.md">
            <p className="font-sans text-text-primary text-base md:text-lg leading-relaxed mb-5 italic">
              Built for revenue-generating operators running $200k–$2M
              businesses.
            </p>
            <p className="font-sans text-text-secondary text-base leading-relaxed mb-3">
              Common 0to1 clients include:
            </p>
            <ul className="space-y-1.5" role="list">
              {BUYERS.map((b) => (
                <li
                  key={b}
                  className="font-mono text-sm text-text-secondary leading-relaxed"
                >
                  <span className="text-accent-green" aria-hidden="true">
                    &rarr;
                  </span>{" "}
                  {b}
                </li>
              ))}
            </ul>
          </TerminalWindow>

          <p className="font-mono text-xs text-text-dim mt-6">
            // not for: hobbyists, the AI-curious without a business,
            engineers building their own stack.
          </p>
        </div>
      </div>
    </section>
  );
}
