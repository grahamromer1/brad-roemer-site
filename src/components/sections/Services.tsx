"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import TerminalWindow from "@/components/ui/TerminalWindow";
import Button from "@/components/ui/Button";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";
import { EVENTS, track } from "@/lib/analytics";

const BENEFITS = [
  "Kickoff call to map your opportunities + quick wins",
  "Weekly sessions \u2014 each with a mindset shift + a hands-on build",
  "Sessions that branch as you grow: personal systems, business ops, or building something new",
  "Monthly 30-min strategy call",
  "Async access to the 0to1.AI team \u2014 ask anything, anytime, and get fast, personal answers specific to your situation",
  "Curated AI briefings \u2014 the news and tools that actually matter, filtered so you don\u2019t have to keep up with a market that moves every week",
  "Personal Notion knowledge base \u2014 every session archived and searchable, yours to keep forever",
  "A framework for thinking about AI that compounds \u2014 the skill to see where it fits, whether you\u2019re solving a problem or building something new",
];

const UPCHARGES = [
  { label: "Extra 1:1 time beyond your monthly call", value: "$175/hr" },
  { label: "Build custom integrations, workflows and agents", value: "project-priced" },
  { label: "In-person sessions (Southern California)", value: "TBD" },
];

export default function Services() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="services" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <TerminalPrompt
          command="cat plan.md"
          heading="Pricing and what you get"
          subheading="What you get"
        />

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

              <p className="font-mono text-sm text-text-secondary uppercase tracking-wider mb-4">
                // what&apos;s included:
              </p>
              <ul className="space-y-3 mb-6" role="list">
                {BENEFITS.map((item) => (
                  <li
                    key={item}
                    className="font-sans text-sm md:text-base text-text-secondary leading-relaxed flex gap-2"
                  >
                    <span
                      className="font-mono text-accent-green shrink-0"
                      aria-hidden="true"
                    >
                      &rarr;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Dual CTA — mirrors the Hero pattern */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  href="/quiz"
                  variant="primary"
                  onClick={() =>
                    track(EVENTS.cta_clicked, {
                      cta: "take_quiz",
                      location: "services",
                    })
                  }
                >
                  Take the Free Quiz <span aria-hidden="true">&rarr;</span>
                </Button>
                <Button
                  href="#book"
                  variant="secondary"
                  onClick={() =>
                    track(EVENTS.cta_clicked, {
                      cta: "book_intro_call",
                      location: "services",
                    })
                  }
                >
                  Book a Free Intro Call
                </Button>
              </div>
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
