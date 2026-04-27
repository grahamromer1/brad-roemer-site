"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import TerminalWindow from "@/components/ui/TerminalWindow";
import Button from "@/components/ui/Button";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";
import { EVENTS, track } from "@/lib/analytics";

interface Tier {
  id: "founding" | "monthly" | "pro" | "team";
  title: string;
  badge: string;
  badgeTone: "cyan" | "amber" | "green" | "neutral";
  price: string;
  priceUnit: string;
  subline: string;
  fineLine: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaEvent: string;
  /** Visually emphasized card (border + glow). */
  emphasized?: "cyan" | "green";
}

const TIERS: Tier[] = [
  {
    id: "founding",
    title: "Founding",
    badge: "first 10 only",
    badgeTone: "amber",
    price: "$245",
    priceUnit: "/ mo lifetime",
    subline: "$1,470 paid in full · rate locked forever",
    fineLine: "// 9 spots remaining · cohort opens May 1",
    bullets: [
      "Everything in Monthly",
      "Lifetime $245/mo (vs $295)",
      "Up to 4 Phase II builds per week (vs 2 in Monthly)",
      "Founding-cohort community access",
      "Priority on workflow requests",
    ],
    ctaLabel: "Claim a Founding Spot →",
    ctaHref: "#book",
    ctaEvent: "claim_founding",
  },
  {
    id: "monthly",
    title: "Monthly",
    badge: "default",
    badgeTone: "cyan",
    price: "$295",
    priceUnit: "/ month",
    subline: "The standard tier — month to month",
    fineLine: "// pause anytime",
    bullets: [
      "Phase I: 5 foundation sessions",
      "Phase II: 2 workflow & infrastructure builds per week",
      "Monthly 30-min strategy call with Brad",
      "Async 0to1.AI team access",
      "100+ workflow library + new builds added weekly",
      "Personal Notion knowledge base",
    ],
    ctaLabel: "Start Monthly",
    ctaHref: "#book",
    ctaEvent: "monthly_signup",
    emphasized: "cyan",
  },
  {
    id: "pro",
    title: "Pro",
    badge: "recommended",
    badgeTone: "green",
    price: "$495",
    priceUnit: "/ month",
    subline: "For operators wanting heavier cadence",
    fineLine: "// pause anytime",
    bullets: [
      "Everything in Monthly, plus:",
      "Bi-weekly 1:1 strategy calls (vs monthly)",
      "Concierge Discord channel",
      "Quarterly Build Sprint — 60 min live build with Brad",
      "First access to new builds (1 week before Monthly)",
      "Up to 4 Phase II builds per week (vs 2 in Monthly)",
    ],
    ctaLabel: "Start Pro",
    ctaHref: "#book",
    ctaEvent: "pro_signup",
  },
  {
    id: "team",
    title: "Team",
    badge: "5–10 seats",
    badgeTone: "neutral",
    price: "$1,295",
    priceUnit: "/ month",
    subline: "Or $3,495/quarter — save $390",
    fineLine: "// 5-seat minimum · pause anytime",
    bullets: [
      "Up to 10 team seats",
      "Each member gets their own Phase I + Phase II",
      "Monthly team strategy call",
      "Quarterly Team Build Sprint",
      "Async support for the whole team",
      "10+ employees? Inquire.",
    ],
    ctaLabel: "See Team Plans →",
    ctaHref: "/teams",
    ctaEvent: "see_team_plans",
  },
];

function badgeClasses(tone: Tier["badgeTone"]) {
  switch (tone) {
    case "amber":
      return "border-accent-amber/40 bg-accent-amber/5 text-accent-amber";
    case "green":
      return "border-accent-green/50 bg-accent-green/10 text-accent-green";
    case "cyan":
      return "border-accent-cyan/40 bg-accent-cyan/5 text-accent-cyan";
    case "neutral":
    default:
      return "border-border-terminal bg-bg-surface text-text-dim";
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
      style={{ transitionDelay: `${delayIndex * 75}ms` }}
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
          <h3 className="font-mono text-text-primary text-lg font-bold">
            {tier.title}
          </h3>
          <span
            className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${badgeClasses(tier.badgeTone)}`}
          >
            {tier.badge}
          </span>
        </div>
        <div className="h-px bg-border-terminal my-4" aria-hidden="true" />

        <div className="mb-4">
          <span className="font-mono text-accent-green font-bold text-2xl md:text-3xl">
            {tier.price}
          </span>
          <span className="font-mono text-text-dim text-sm">
            {" "}
            {tier.priceUnit}
          </span>
          <p className="font-mono text-text-secondary text-xs mt-1">
            {tier.subline}
          </p>
          <p className="font-mono text-xs text-text-dim mt-2">
            {tier.fineLine}
          </p>
        </div>

        <ul className="space-y-2 mb-6 flex-1" role="list">
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

        {tier.emphasized === "cyan" ? (
          <a
            href={tier.ctaHref}
            onClick={() =>
              track(EVENTS.cta_clicked, {
                cta: tier.ctaEvent,
                location: "pricing",
              })
            }
            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all duration-200 min-h-[44px] bg-accent-cyan text-bg-primary hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            {tier.ctaLabel}
          </a>
        ) : (
          <Button
            href={tier.ctaHref}
            variant="secondary"
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
        )}
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
          heading="Pricing — four tiers, one product"
          subheading="What you get"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-16 md:mb-20">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} delayIndex={i} />
          ))}
        </div>

        {/* Add-ons */}
        <div className="fade-in-up max-w-2xl mx-auto" style={{ transitionDelay: "400ms" }}>
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
              // available to active members
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
          // not sure which tier fits? the intro call is free &mdash; 15
          minutes, no pitch, leave with a next step either way.
        </p>
      </div>
    </section>
  );
}
