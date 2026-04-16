"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import TerminalWindow from "@/components/ui/TerminalWindow";
import Button from "@/components/ui/Button";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const BENEFITS = [
  "A personalized weekly game plan \u2014 one quick win, one real project, tailored to where you are",
  "Curated AI briefing every week \u2014 the news, tools, and tactics that actually matter, filtered so you don\u2019t have to be",
  "The 0to1 team in your corner \u2014 ask questions, get unstuck, and join a growing community of operators building with AI",
  "Real fluency, not just tips \u2014 you learn the fundamentals so you can solve, build, and implement on your own",
];

const UPCHARGES = [
  { label: "Extra 1:1 time beyond your monthly call", value: "$175/hr" },
  { label: "Custom workflow builds", value: "project-priced" },
  { label: "In-person sessions (North County San Diego)", value: "hourly" },
];

export default function Services() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="services" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <TerminalPrompt command="cat plan.md" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* ── Core Plan (spans 2 cols) ── */}
          <div
            className="fade-in-up lg:col-span-2 transition-all duration-200 rounded-lg"
          >
            <TerminalWindow filename="0to1-program.md">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                <h3 className="font-mono text-text-primary text-xl md:text-2xl font-bold">
                  The 0to1.AI Program
                </h3>
                <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider px-2 py-1 rounded border border-accent-cyan/40 bg-accent-cyan/5">
                  core offer
                </span>
              </div>
              <div className="h-px bg-border-terminal mb-5" aria-hidden="true" />

              <div className="mb-5">
                {/* 1. Price — inlined with cancel anytime */}
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-mono text-accent-green font-bold text-3xl md:text-4xl">
                    $295
                  </span>
                  <span className="font-mono text-text-dim text-base">
                    / month{" "}
                    <span className="text-text-dim">(cancel anytime)</span>
                  </span>
                </div>
                {/* 2. Anchor line */}
                <p className="font-mono text-xs text-text-dim mt-2">
                  // less than one hour with most consultants — you get the
                  full month.
                </p>
              </div>

              <p className="font-mono text-sm text-text-secondary uppercase tracking-wider mb-3">
                // what you get:
              </p>
              <ul className="space-y-3 mb-6">
                {BENEFITS.map((item) => (
                  <li
                    key={item}
                    className="pl-4 border-l-2 border-accent-green"
                  >
                    <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Dual CTA — mirrors the Hero pattern */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  href="/quiz"
                  variant="primary"
                  aria-label="Take the free AI readiness quiz"
                >
                  Take the Free Quiz <span aria-hidden="true">&rarr;</span>
                </Button>
                <Button
                  href="#book"
                  variant="secondary"
                  aria-label="Book a free intro call"
                >
                  Book a Free Intro Call
                </Button>
              </div>

              {/* Promo — at the bottom, feels like a bonus */}
              <p className="font-mono text-xs text-accent-amber mt-5">
                <span aria-hidden="true">[!]</span> First two months:{" "}
                <span className="text-accent-green font-bold">$195/mo</span>{" "}
                when you pay for both upfront.
              </p>
            </TerminalWindow>
          </div>

          {/* ── Upcharges ── */}
          <div
            className="fade-in-up mt-16 lg:mt-0"
            style={{ transitionDelay: "150ms" }}
          >
            <TerminalWindow filename="add-ons.md">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                <h3 className="font-mono text-text-primary text-lg font-bold">
                  Go Deeper
                </h3>
                <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider px-2 py-1 rounded border border-accent-cyan/40 bg-accent-cyan/5">
                  add-ons
                </span>
              </div>
              <p className="font-mono text-xs text-text-dim mb-4">
                // available to active clients
              </p>
              <div className="h-px bg-border-terminal mb-4" aria-hidden="true" />

              <ul className="space-y-4">
                {UPCHARGES.map((u) => (
                  <li
                    key={u.label}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <p className="font-sans text-sm text-text-primary leading-snug">
                      {u.label}
                    </p>
                    <p className="font-mono text-xs text-accent-green whitespace-nowrap">
                      {u.value}
                    </p>
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
