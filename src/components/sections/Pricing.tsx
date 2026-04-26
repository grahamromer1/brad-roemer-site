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
  recommended?: boolean;
}

const TIERS: Tier[] = [
  {
    id: "founding",
    title: "Founding Member",
    badge: "20 of 20 spots — opening soon",
    badgeTone: "amber",
    price: "$1,470 paid in full",
    subline: "Then $245/mo locked for life",
    fineLine: "// 6-month commitment + 30-day money-back",
    bullets: [
      "Lifetime $245/mo rate after the initial 6 months",
      "Everything in the Monthly tier",
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
    subline: "Or $2,950/yr — save $590 (2 months free)",
    fineLine: "// skip-anytime monthly · pause anytime",
    bullets: [
      "Phase I: 5 foundation sessions",
      "Phase II: 2 workflow builds per week",
      "Monthly 30-min strategy call with Brad",
      "Async team access — reply within days, not weeks",
      "100+ workflow library + new builds added weekly",
      "Infrastructure lessons (Claude, ChatGPT, Google AI, GitHub, Vercel, more)",
      "Personal Notion knowledge base",
    ],
    ctaLabel: "Start Monthly",
    ctaEvent: "monthly_signup",
  },
  {
    id: "pro",
    title: "Pro",
    badge: "recommended",
    badgeTone: "green",
    price: "$495 / month",
    subline: "Or $4,950/yr — save $990 (2 months free)",
    fineLine: "// for operators wanting heavier cadence",
    bullets: [
      "Everything in Monthly, plus:",
      "Bi-weekly 1:1 strategy calls (vs monthly)",
      "Concierge channel — direct Slack/Loom team access",
      "Quarterly Build Sprint — 60 min live build with Brad",
      "First access to new builds and infrastructure lessons (1 week before Monthly)",
      "Custom workflow design every 6 months",
      "4 Phase II builds per week (vs 2 in Monthly)",
    ],
    ctaLabel: "Start Pro",
    ctaEvent: "pro_signup",
    recommended: true,
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

function TierCard({ tier, delayIndex }: { tier: Tier; delayIndex: number }) {
  const cardBorder = tier.recommended
    ? "border-accent-green shadow-[0_0_24px_rgba(74,222,128,0.12)]"
    : "border-border-terminal";

  return (
    <div
      className={`fade-in-up rounded-lg border ${cardBorder} bg-bg-surface overflow-hidden flex flex-col`}
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
          variant={tier.recommended ? "primary" : "secondary"}
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
        <div className="fade-in-up" style={{ transitionDelay: "300ms" }}>
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

        <p className="font-mono text-text-dim text-sm text-center mt-10">
          // not sure if this fits? the intro call is free &mdash; come
          curious, leave with a plan.
        </p>
      </div>
    </section>
  );
}
