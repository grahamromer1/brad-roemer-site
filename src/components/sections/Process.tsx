"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

type StepGroup = "free" | "program";

const STEPS: {
  num: string;
  title: string;
  desc: string;
  group: StepGroup;
}[] = [
  {
    num: "01",
    title: "TAKE THE QUIZ",
    desc: "5 minutes, 13 questions. You\u2019ll get a snapshot of where you stand with AI today and two things to try this week. No email required, no strings.",
    group: "free",
  },
  {
    num: "02",
    title: "BOOK AN INTRO CALL",
    desc: "15 minutes, free. We walk through your results and figure out if this is the right fit. You\u2019ll leave with a concrete next step either way.",
    group: "free",
  },
  {
    num: "03",
    title: "KICKOFF + QUICK WINS",
    desc: "Your first week: an onboarding call where we map AI opportunities to your business and your daily life, plus a handful of quick wins you can run immediately. Momentum from day one.",
    group: "program",
  },
  {
    num: "04",
    title: "YOUR WEEKLY GUIDE",
    desc: "Every week you get a personalized email — tools, workflows, experiments, and a curated briefing on what\u2019s happening in AI right now. Tailored to your business and your life, archived in a Notion doc you can reference anytime.",
    group: "program",
  },
  {
    num: "05",
    title: "MONTHLY STRATEGY CALL",
    desc: "30 minutes, one-on-one. We review what\u2019s working, troubleshoot what isn\u2019t, and plan the next 30 days.",
    group: "program",
  },
  {
    num: "06",
    title: "ASK ANYTHING, ANYTIME",
    desc: "Questions between calls? Send them anytime and get real, thoughtful answers from the 0to1 team — fast, personal, and specific to your situation.",
    group: "program",
  },
];

const FREE_STEPS = STEPS.filter((s) => s.group === "free");
const PROGRAM_STEPS = STEPS.filter((s) => s.group === "program");

function StepCard({
  step,
  delayIndex,
}: {
  step: (typeof STEPS)[number];
  delayIndex: number;
}) {
  return (
    <div
      className="fade-in-up rounded-lg border border-border-terminal bg-bg-surface p-6"
      style={{ transitionDelay: `${delayIndex * 100}ms` }}
    >
      <p className="font-mono text-accent-green text-2xl font-bold mb-2">
        [{step.num}]
      </p>
      <h3 className="font-mono text-text-primary text-lg font-bold uppercase mb-4 flex items-center gap-2">
        {step.title}
        <span className="flex-1 h-px bg-border-terminal" aria-hidden="true" />
      </h3>
      <p className="font-sans text-text-secondary text-base leading-relaxed">
        {step.desc}
      </p>
    </div>
  );
}

export default function Process() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="process" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <TerminalPrompt
          command="./how-it-works --explain"
          heading="How the 0to1.AI program works"
        />

        <div className="fade-in-up max-w-2xl mb-10 space-y-2">
          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed">
            Here&apos;s the path. Start free. Go deeper if it fits.
          </p>
          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed">
            Each week builds on the last. No finish line — just a sharper
            foundation.
          </p>
        </div>

        {/* Free on-ramp */}
        <p className="fade-in-up font-mono text-xs text-accent-cyan uppercase tracking-wider mb-4">
          // &#9472;&#9472; start here (free) &#9472;&#9472;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {FREE_STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} delayIndex={i} />
          ))}
        </div>

        {/* Program */}
        <p className="fade-in-up font-mono text-xs text-accent-cyan uppercase tracking-wider mb-4">
          // &#9472;&#9472; what the program looks like &#9472;&#9472;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {PROGRAM_STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} delayIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
