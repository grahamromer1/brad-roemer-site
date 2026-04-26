"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

interface ArcYear {
  label: string;
  title: string;
  body: string;
}

const ARC: ArcYear[] = [
  {
    label: "Year 1",
    title: "Install.",
    body: "Heavy build phase. Monthly (or bi-weekly) strategy calls, weekly drops, 4–15 workflows installed.",
  },
  {
    label: "Year 2+",
    title: "Refine.",
    body: "Your AI layer is doing its job. You shift to Alumni — quarterly check-ins, continued access to the growing library, new builds when you want them.",
  },
  {
    label: "Year 3+",
    title: "Operate.",
    body: "You’re an operator with a mature AI layer. 0to1 functions as your AI R&D — staying current on new tools, pulling new builds when needed.",
  },
];

export default function LongTermArc() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="arc"
      className="py-20 md:py-32 px-4 sm:px-6"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto">
        <TerminalPrompt
          command="cat the-arc.md"
          heading="0to1 grows with your business"
          subheading="Year one, year two, year three"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARC.map((year, i) => (
            <div
              key={year.label}
              className="fade-in-up rounded-lg border border-border-terminal bg-bg-surface p-6"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider mb-3">
                {year.label}
              </p>
              <h3 className="font-mono text-text-primary text-xl font-bold mb-3">
                {year.title}
              </h3>
              <p className="font-sans text-text-secondary text-base leading-relaxed">
                {year.body}
              </p>
            </div>
          ))}
        </div>

        <p className="fade-in-up font-mono text-xs text-text-dim mt-8 text-center">
          // alumni rate available after 12 months
        </p>
      </div>
    </section>
  );
}
