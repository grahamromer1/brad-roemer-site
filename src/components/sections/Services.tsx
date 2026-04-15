"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import TerminalWindow from "@/components/ui/TerminalWindow";
import Button from "@/components/ui/Button";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const INCLUDED = [
  "Month 1 kickoff call + quick wins to build momentum",
  "Weekly personalized email drops — tools, articles, workflows, experiments picked for your business",
  "Private Notion archive of every drop, always reference-able",
  "Monthly 45-min strategy call, one-on-one with Brad",
  "Async support in Discord — ask questions any time and get thoughtful answers",
  "Monthly recap: progress, wins, what's next",
];

const UPCHARGES = [
  { label: "Extra 1:1 time beyond your monthly call", value: "$160/hr" },
  { label: "Custom workflow builds", value: "project-priced" },
  { label: "In-person sessions (North County San Diego)", value: "hourly" },
];

export default function Services() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="services" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <TerminalPrompt command="cat plan.md" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* ── Core Plan (spans 2 cols) ── */}
          <div
            className="fade-in-up lg:col-span-2 transition-all duration-200 rounded-lg"
          >
            <TerminalWindow filename="0to1-coaching.md">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                <h3 className="font-mono text-text-primary text-xl md:text-2xl font-bold">
                  The 0to1 Coaching Plan
                </h3>
                <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider px-2 py-1 rounded border border-accent-cyan/40 bg-accent-cyan/5">
                  core offer
                </span>
              </div>
              <div className="h-px bg-border-terminal mb-5" aria-hidden="true" />

              <div className="mb-5">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-mono text-accent-green font-bold text-3xl md:text-4xl">
                    $295
                  </span>
                  <span className="font-mono text-text-dim text-base">/ month</span>
                </div>
                <p className="font-mono text-xs text-text-dim mt-2">
                  month-to-month · paid upfront · cancel anytime
                </p>
                <p className="font-mono text-xs text-accent-amber mt-2">
                  <span aria-hidden="true">[!]</span> First two months discounted to{" "}
                  <span className="text-accent-green font-bold">$200/mo</span> when you pay for both together.
                </p>
              </div>

              <p className="font-mono text-sm text-text-secondary uppercase tracking-wider mb-3">
                // what&apos;s included
              </p>
              <ul className="space-y-2 mb-6">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="font-sans text-sm md:text-base text-text-secondary leading-relaxed"
                  >
                    <span className="text-accent-cyan font-mono" aria-hidden="true">
                      &rarr;
                    </span>{" "}
                    {item}
                  </li>
                ))}
              </ul>

              <Button href="#book" variant="primary">
                Start with a Free Intro Call
              </Button>
              <p className="font-mono text-xs text-text-dim mt-3">
                // or take the <a href="/quiz" className="text-accent-amber hover:underline">free quiz</a> first to see where you&apos;re starting from
              </p>
            </TerminalWindow>
          </div>

          {/* ── Upcharges ── */}
          <div
            className="fade-in-up"
            style={{ transitionDelay: "150ms" }}
          >
            <TerminalWindow filename="add-ons.md">
              <h3 className="font-mono text-text-primary text-lg font-bold mb-1">
                Go Deeper
              </h3>
              <p className="font-mono text-xs text-text-dim mb-4">
                // available to active clients
              </p>
              <div className="h-px bg-border-terminal mb-4" aria-hidden="true" />

              <ul className="space-y-4">
                {UPCHARGES.map((u) => (
                  <li key={u.label}>
                    <p className="font-sans text-sm text-text-primary leading-snug mb-1">
                      {u.label}
                    </p>
                    <p className="font-mono text-xs text-accent-green">{u.value}</p>
                  </li>
                ))}
              </ul>
            </TerminalWindow>
          </div>
        </div>

        <p className="font-mono text-text-dim text-sm text-center mt-10">
          // not sure if this fits? the intro call is free — come curious, leave with a plan.
        </p>
      </div>
    </section>
  );
}
