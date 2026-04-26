"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import TerminalWindow from "@/components/ui/TerminalWindow";
import Button from "@/components/ui/Button";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";
import { EVENTS, track } from "@/lib/analytics";

interface Tier {
  id: "founding" | "monthly" | "pro";
  title: string;
  badge: string;
  badgeTone: "cyan" | "amber" | "green";
  price: string;
  subline: string;
  fineLine: string;
  bullets: string[];
  ctaLabel: string;
  ctaEvent: string;
  /** Visually emphasized card (border + glow). */
  emphasized?: "cyan" | "green";
}

const TIERS: Tier[] = [
  {
    id: "founding",
    title: "Founding Member",
    badge: "9 spots remain",
    badgeTone: "amber",
    price: "$245 / month",
    subline: "Locked for life · 6 months paid in full ($1,470)",
    fineLine: "// 6-month commitment + 30-day money-back",
    bullets: [
      "Lifetime $245/mo rate after the initial 6 months",
      "Everything in the Monthly tier",
      "Up to 4 Phase II builds per week (vs 2 in Monthly)",
      "Founding-member status and recognition",
      "First access to new builds and infrastructure lessons (alongside Pro members)",
    ],
    ctaLabel: "Become a Founding Member",
    ctaEvent: "founding_signup",
  },
  {
    id: "monthly",
    title: "Monthly",
    badge: "default",
    badgeTone: "cyan",
    price: "$295 / month",
    subline: "Skip-anytime monthly · pause anytime",
    fineLine: "// the standard tier — month to month",
    bullets: [
      "Phase I: 5 foundation sessions",
      "Phase II: 2 workflow and infrastructure builds per week",
      "Monthly 30-min strategy call with Brad",
      "Async 0to1.AI team access",
      "100+ workflow library + new builds added weekly",
      "Personal Notion knowledge base",
    ],
    ctaLabel: "Start Monthly",
    ctaEvent: "monthly_signup",
    emphasized: "cyan",
  },
  {
    id: "pro",
    title: "Pro",
    badge: "recommended",
    badgeTone: "green",
    price: "$495 / month",
    subline: "For operators wanting heavier cadence",
    fineLine: "// pause anytime",
    bullets: [
      "Everything in Monthly, plus:",
      "Bi-weekly 1:1 strategy calls (vs monthly)",
      "Concierge channel — direct Discord/Loom team access",
      "Quarterly Build Sprint — 60 min live build with Brad",
      "First access to new builds and infrastructure lessons (1 week before Monthly)",
      "Up to 4 Phase II builds per week (vs 2 in Monthly)",
    ],
    ctaLabel: "Start Pro",
    ctaEvent: "pro_signup",
  },
];

function badgeClasses(tone: Tier["badgeTone"]) {
  switch (tone) {
    case "amber":
      return "border-accent-amber/40 bg-accent-amber/5 text-accent-amber";
    case "green":
      return "border-accent-green/50 bg-accent-green/10 text-accent-green";
    case "cyan":
    default:
      return "border-accent-cyan/40 bg-accent-cyan/5 text-accent-cyan";
  }
}

function emphasisClasses(tier: Tier) {
  if (tier.emphasized === "cyan") {
    return "border-accent-cyan shadow-[0_0_24px_rgba(34,211,238,0.10)]";
  }
  if (tier.emphasized === "green") {
    return "border-accent-green shadow-[0_0_24px_rgba(74,222,128,0.12)]";
  }
  return "border-border-terminal";
}

function TierCard({ tier, delayIndex }: { tier: Tier; delayIndex: number }) {
  return (
    <div
      className={`fade-in-up rounded-lg border ${emphasisClasses(tier)} bg-bg-surface overflow-hidden flex flex-col`}
      style={{ transitionDelay: `${delayIndex * 100}ms` }}
    >
      {/* terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border-terminal">
        <span
          className="w-3 h-3 rounded-full bg-[#FF5F56]"
          aria-hidden="true"
        />
        <span
          className="w-3 h-3 rounded-full bg-[#FFBD2E]"
          aria-hidden="true"
        />
        <span
          className="w-3 h-3 rounded-full bg-[#27C93F]"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-mono text-text-dim">
          {tier.id}.md
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h3 className="font-mono text-text-primary text-xl font-bold">
            {tier.title}
          </h3>
          <span
            className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${badgeClasses(tier.badgeTone)}`}
          >
            [{tier.badge}]
          </span>
        </div>
        <div className="h-px bg-border-terminal my-4" aria-hidden="true" />

        <div className="mb-4">
          <p className="font-mono text-accent-green font-bold text-2xl md:text-3xl">
            {tier.price}
          </p>
          <p className="font-mono text-text-secondary text-sm mt-1">
            {tier.subline}
          </p>
          <p className="font-mono text-xs text-text-dim mt-2">
            {tier.fineLine}
          </p>
        </div>

        <p className="font-mono text-xs text-text-secondary uppercase tracking-wider mb-3">
          // what&apos;s included:
        </p>
        <ul className="space-y-2.5 mb-6 flex-1" role="list">
          {tier.bullets.map((b) => (
            <li
              key={b}
              className="font-sans text-sm text-text-secondary leading-relaxed flex gap-2"
            >
              <span
                className="font-mono text-accent-green shrink-0"
                aria-hidden="true"
              >
                &rarr;
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <Button
          href="#book"
          variant={tier.emphasized === "cyan" ? "primary" : "secondary"}
          onClick={() =>
            track(EVENTS.cta_clicked, {
              cta: tier.ctaEvent,
              location: "pricing",
            })
          }
          className="w-full"
        >
          {tier.ctaLabel}
        </Button>
      </div>
    </div>
  );
}

const ADDONS: { label: string; value: string }[] = [
  { label: "Extra 1:1 time beyond your monthly call", value: "$200/hr" },
  {
    label: "Build custom integrations, workflows and agents",
    value: "project-priced",
  },
  { label: "In-person sessions (Southern California)", value: "TBD" },
];

export default function Pricing() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="pricing" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <TerminalPrompt
          command="cat pricing.md"
          heading="Pricing — three tiers, one product"
          subheading="What you get"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} delayIndex={i} />
          ))}
        </div>

        {/* Team callout */}
        <div className="fade-in-up mb-8" style={{ transitionDelay: "300ms" }}>
          <TerminalWindow filename="teams.md">
            <p className="font-mono text-xs text-text-dim mb-3">
              // running a team or small business?
            </p>
            <p className="font-sans text-text-primary text-base md:text-lg leading-relaxed mb-2">
              <span className="font-bold">0to1 Team</span> &mdash; for small
              businesses with 5–10 person teams. Phase I + Phase II library +
              infrastructure lessons for everyone, monthly team strategy
              calls, quarterly Team Build Sprints. Starts at{" "}
              <span className="text-accent-green font-mono">$1,295/mo</span>.
            </p>
            <a
              href="/teams"
              className="font-mono text-sm text-accent-green hover:underline inline-flex items-center gap-1 mt-2"
              onClick={() =>
                track(EVENTS.cta_clicked, {
                  cta: "see_team_plans",
                  location: "pricing",
                })
              }
            >
              See team plans <span aria-hidden="true">&rarr;</span>
            </a>
          </TerminalWindow>
        </div>

        {/* Add-ons */}
        <div className="fade-in-up" style={{ transitionDelay: "400ms" }}>
          <TerminalWindow filename="add-ons.md">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
              <p className="font-mono text-text-primary text-base md:text-lg font-bold">
                Go Deeper
              </p>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-accent-cyan/40 bg-accent-cyan/5 text-accent-cyan">
                [add-ons]
              </span>
            </div>
            <p className="font-mono text-xs text-text-dim mb-4">
              // available to active clients
            </p>
            <div className="h-px bg-border-terminal mb-4" aria-hidden="true" />
            <ul className="space-y-3" role="list">
              {ADDONS.map((a) => (
                <li
                  key={a.label}
                  className="flex items-baseline justify-between gap-4"
                >
                  <p className="font-sans text-sm text-text-primary leading-snug">
                    {a.label}
                  </p>
                  <p className="font-mono text-xs text-accent-green whitespace-nowrap">
                    {a.value}
                  </p>
                </li>
              ))}
            </ul>
          </TerminalWindow>
        </div>

        <p className="font-mono text-text-dim text-sm text-center mt-10">
          // alumni rate available to clients after 12 months · not sure if
          this fits? the intro call is free.
        </p>
      </div>
    </section>
  );
}
