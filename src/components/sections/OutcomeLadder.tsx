"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

interface Rung {
  label: string;
  body: string;
}

const RUNGS: Rung[] = [
  {
    label: "Month 1 — Foundation.",
    body: "5 sessions teach you to brief AI like an operator, not a tinkerer. By the end of the month, AI is doing real work for you — not just answering questions.",
  },
  {
    label: "Month 2 — Workflows operating.",
    body: "4+ workflows installed and operating across the parts of your business that drain the most time — likely email, relationship memory, meeting prep, and document review.",
  },
  {
    label: "Months 3–6 — Compounding builds.",
    body: "8–15 workflows running. You’re picking each new build based on where time is leaking and where revenue is being left on the table. The monthly strategy call keeps the next install pointed at the highest-leverage spot.",
  },
  {
    label: "Months 6–12 — Compounding outcomes.",
    body: "Workflows talk to each other. You’re operating differently. The goal at this stage: 5–10 hours/week of manual work replaced, with new capacity opened for outreach, follow-through, and revenue work you couldn’t reach before. Top line moves with the bottom line.",
  },
  {
    label: "Month 12+ — Mature.",
    body: "Your AI layer is doing its job. You shift to a lighter touch — quarterly check-ins, new builds when you want them.",
  },
  {
    label: "Month 24+ — AI R&D function.",
    body: "Your AI runs on autopilot. You’re not learning anymore — you’re choosing what to build next. At this stage, 0to1 functions as your outsourced AI R&D — not your tutor.",
  },
];

export default function OutcomeLadder() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="outcomes"
      className="py-20 md:py-32 px-4 sm:px-6"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto">
        <TerminalPrompt
          command="cat what-it-looks-like.md"
          heading="What it looks like over time"
          subheading="Year one, year two, year three"
        />

        <ol className="space-y-6 mb-10" role="list">
          {RUNGS.map((rung, i) => (
            <li
              key={rung.label}
              className="fade-in-up rounded-lg border border-border-terminal bg-bg-surface p-5 md:p-6"
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              <p className="font-mono text-accent-green text-sm md:text-base font-bold mb-2">
                {rung.label}
              </p>
              <p className="font-sans text-text-secondary text-base leading-relaxed">
                {rung.body}
              </p>
            </li>
          ))}
        </ol>

        <div
          className="fade-in-up rounded-lg border border-accent-green/40 bg-accent-green/[0.04] p-5 md:p-6"
          style={{ transitionDelay: "450ms" }}
        >
          <p className="font-mono text-xs text-accent-green uppercase tracking-wider mb-3">
            // why it compounds
          </p>
          <p className="font-sans text-text-primary text-base md:text-lg leading-relaxed italic">
            Your AI layer gets sharper every month. Brad knows your business
            better. The workflows know your customers better. The system
            knows your patterns better. This is the part that doesn’t show
            up on a feature list but is why a year in feels different than
            a month in.
          </p>
        </div>
      </div>
    </section>
  );
}
