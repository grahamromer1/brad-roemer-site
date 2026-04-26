import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import TerminalPrompt from "@/components/ui/TerminalPrompt";
import TerminalWindow from "@/components/ui/TerminalWindow";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "0to1 Team — AI for small businesses | 0to1.AI",
  description:
    "Each team member gets their own 0to1. The team gets shared coaching, sprints, and concierge. Built for small businesses with 5–10 person teams. Starts at $1,295/mo.",
  alternates: {
    canonical: "/teams",
  },
  openGraph: {
    title: "0to1 Team — AI for small businesses",
    description:
      "Each team member gets their own 0to1. The team gets shared coaching, sprints, and concierge. Starts at $1,295/mo.",
    url: "https://get0to1.ai/teams",
  },
};

export default function TeamsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-28 sm:pt-32 md:pt-36 pb-24">
        {/* Hero */}
        <section className="px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <TerminalPrompt
              command="cat teams.md"
              heading="0to1 Team — AI for small businesses"
              subheading="For small businesses with 5–10 person teams"
            />
            <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-5">
              Each team member gets their own 0to1. The team gets shared
              coaching, sprints, and concierge.
            </h1>
            <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed">
              Built for small businesses with 5–10 person teams. Every team
              member moves through Phase I at their own pace and gets Phase
              II builds curated to their role. Plus monthly team strategy
              calls, quarterly Team Build Sprints, and shared concierge
              access.
            </p>
          </div>
        </section>

        {/* What you get */}
        <section className="px-4 sm:px-6 mt-20 md:mt-28">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-xs text-accent-green uppercase tracking-wider mb-4">
              // ── what you get ──
            </p>
            <h2 className="font-mono text-2xl md:text-3xl font-bold text-text-primary mb-8">
              Individual experience + team-wide perks
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TerminalWindow filename="each-member.md">
                <p className="font-mono text-text-primary text-sm font-bold mb-3">
                  Each team member individually:
                </p>
                <ul className="space-y-2.5" role="list">
                  {[
                    "Personal Phase I onboarding — own pace (advanced members fly through, beginners take their time)",
                    "Personal Phase II curation — pick builds based on YOUR role and YOUR work",
                    "Personal Notion archive of their own builds",
                    "Personal concierge access — email/Discord the team channel directly",
                  ].map((item) => (
                    <li
                      key={item}
                      className="font-sans text-sm text-text-secondary leading-relaxed flex gap-2"
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
              </TerminalWindow>

              <TerminalWindow filename="team-collectively.md">
                <p className="font-mono text-text-primary text-sm font-bold mb-3">
                  The team collectively:
                </p>
                <ul className="space-y-2.5" role="list">
                  {[
                    "Up to 10 team seats included (5-seat minimum)",
                    "Full Phase II library + infrastructure lessons for everyone",
                    "Monthly 60-min Team Strategy Call with Brad",
                    "Quarterly Team Build Sprint — 90-min live build session",
                    "Team-shared concierge channel for cross-team questions",
                    "2x Phase II build pacing (4 builds/week combined team activity)",
                  ].map((item) => (
                    <li
                      key={item}
                      className="font-sans text-sm text-text-secondary leading-relaxed flex gap-2"
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
              </TerminalWindow>
            </div>
          </div>
        </section>

        {/* Mixed experience */}
        <section className="px-4 sm:px-6 mt-20 md:mt-28">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-xs text-accent-green uppercase tracking-wider mb-4">
              // ── mixed experience levels ──
            </p>
            <p className="font-sans text-text-primary text-base md:text-lg leading-relaxed italic">
              Teams come in mixed. That&apos;s why each team member moves at
              their own pace through Phase I &mdash; your veterans may
              complete it in one day, your beginners take their time. Phase
              II is fully personalized too &mdash; each member picks their
              own builds based on their role and where their work is
              leaking time. The team layer adds coordination, not lockstep
              pacing.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-4 sm:px-6 mt-20 md:mt-28">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-xs text-accent-green uppercase tracking-wider mb-4">
              // ── pricing ──
            </p>
            <TerminalWindow filename="team-pricing.md">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <span className="font-mono text-accent-green font-bold text-3xl md:text-4xl">
                  $1,295
                </span>
                <span className="font-mono text-text-dim text-base">
                  / month
                </span>
              </div>
              <p className="font-mono text-sm text-text-secondary mb-1">
                Or <span className="text-accent-green">$3,495</span>{" "}
                paid quarterly &mdash; save $390 (~10% off)
              </p>
              <p className="font-mono text-xs text-text-dim mb-5">
                // up to 10 seats included · 5-seat minimum
              </p>
              <Button href="mailto:info@get0to1.ai?subject=0to1%20Team%20signup">
                Get started <span aria-hidden="true">&rarr;</span>
              </Button>
            </TerminalWindow>
          </div>
        </section>

        {/* Larger teams */}
        <section className="px-4 sm:px-6 mt-20 md:mt-28">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-xs text-accent-green uppercase tracking-wider mb-4">
              // ── larger teams ──
            </p>
            <TerminalWindow filename="larger-teams.md">
              <p className="font-sans text-text-primary text-base md:text-lg leading-relaxed mb-3">
                Larger team or specific integration needs? Email{" "}
                <a
                  href="mailto:info@get0to1.ai"
                  className="text-accent-green hover:underline"
                >
                  info@get0to1.ai
                </a>{" "}
                to discuss.
              </p>
              <p className="font-mono text-xs text-text-dim">
                // tbd per engagement
              </p>
            </TerminalWindow>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 mt-20 md:mt-28">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-xs text-accent-green uppercase tracking-wider mb-4">
              // ── team FAQ ──
            </p>
            <div className="space-y-8">
              {[
                {
                  q: "How does Phase I work if my team is at different experience levels?",
                  a: "Each team member moves at their own pace. Veterans complete Phase I in days. Beginners take their time. No forced cohort cadence.",
                },
                {
                  q: "Does each team member get their own builds?",
                  a: "Yes. Each member picks Phase II builds based on their role and work. The shared parts of the team tier are the monthly strategy call, quarterly Team Build Sprint, and the concierge channel for cross-team questions.",
                },
                {
                  q: "What about teams larger than 10?",
                  a: "Email info@get0to1.ai. Larger team engagements are scoped individually.",
                },
                {
                  q: "Can we add seats mid-cycle?",
                  a: "Yes — email the team to add a seat anytime.",
                },
                {
                  q: "Do you provide invoicing, W-9, or MSA paperwork?",
                  a: "We will send invoicing and receipts. Further documents available upon request.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="pl-4 border-l-2 border-border-terminal"
                >
                  <p className="font-sans text-base md:text-lg text-text-primary font-semibold mb-1">
                    <span className="font-mono text-accent-cyan">[?]</span>{" "}
                    {item.q}
                  </p>
                  <p className="font-sans text-text-secondary text-base leading-relaxed ml-6">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
