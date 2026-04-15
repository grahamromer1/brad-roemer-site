"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "TAKE THE QUIZ",
    desc: "Free AI readiness quiz tells us where you are today. You get a snapshot + 2 actions you can run this week — no strings attached.",
  },
  {
    num: "02",
    title: "INTRO CALL",
    desc: "Free 15-minute call. Walk through your quiz results, see if we're a fit. Zero pressure — most people leave with a concrete next step even if they don't sign up.",
  },
  {
    num: "03",
    title: "MONTH 1 KICKOFF",
    desc: "Onboarding call + a handful of quick wins to build momentum immediately. You'll feel the shift in the first week.",
  },
  {
    num: "04",
    title: "WEEKLY DROPS",
    desc: "Every week: a curated email of tools, workflows, and experiments picked specifically for your business — archived in a Notion doc you can reference anytime.",
  },
  {
    num: "05",
    title: "MONTHLY STRATEGY CALL",
    desc: "45 minutes with me, one-on-one. We review what's working, troubleshoot what isn't, and plan the next 30 days.",
  },
  {
    num: "06",
    title: "ASYNC SUPPORT",
    desc: "Questions in between calls? Drop them in Discord any time and get thoughtful answers — not a generic chatbot, not weeks-later replies.",
  },
];

export default function Process() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="process" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <TerminalPrompt command="./how-it-works --explain" />

        <p className="fade-in-up font-sans text-text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
          From curious to confident, one week at a time. You&apos;ll learn how to
          apply AI to your business — not just consume it — and you&apos;ll own
          the playbook when you graduate.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="fade-in-up rounded-lg border border-border-terminal bg-bg-surface p-6"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-mono text-accent-green text-2xl font-bold mb-2">[{step.num}]</p>
              <h3 className="font-mono text-text-primary text-lg font-bold uppercase mb-4 flex items-center gap-2">
                {step.title}
                <span className="flex-1 h-px bg-border-terminal" aria-hidden="true" />
              </h3>
              <p className="font-sans text-text-secondary text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
