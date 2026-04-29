"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

type StepGroup = "free" | "program";

interface Step {
  num: string;
  title: string;
  desc: string;
  group: StepGroup;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "TAKE THE QUIZ",
    desc: "5 minutes, 15 questions. You’ll get scored on two axes and mapped to one of four AI archetypes — plus a preview of your first 5 weeks and two small things to try before Week 1. No email required.",
    group: "free",
  },
  {
    num: "02",
    title: "BOOK AN INTRO CALL",
    desc: "15 minutes, free. We walk through your quiz results, look at your business, and figure out if this is the right fit. You leave with a concrete next step either way.",
    group: "free",
  },
  {
    num: "03",
    title: "KICKOFF",
    desc: "First call. We map AI opportunities to your specific business and pick your first installs. You leave with momentum from day one.",
    group: "program",
  },
  {
    num: "04",
    title: "PHASE I: 5 FOUNDATION SESSIONS",
    desc: "Five sessions, one per week, that teach you to brief AI like an operator, not a tinkerer. By the end of month 1, AI is doing real work for you — not just answering questions.",
    group: "program",
  },
  {
    num: "05",
    title: "PHASE II: WORKFLOW & INFRASTRUCTURE BUILDS",
    desc: "After Phase I, you and the 0to1.AI team pick from the 100+ workflow library each month — plus infrastructure lessons on the operator stack (Claude Code, Cowork, ChatGPT, Codex, GitHub, Vercel, n8n, and more). New builds added weekly. Each install replaces real work in your business.",
    group: "program",
  },
  {
    num: "06",
    title: "MONTHLY STRATEGY CALL",
    desc: "30 minutes, one-on-one. Each call covers 3 things: a Win, a Question, and a Miss — so we’re always building on what’s working and fixing what’s not.",
    group: "program",
  },
  {
    num: "07",
    title: "ASYNC ACCESS",
    desc: "Questions between calls? Send them anytime and get real, thoughtful answers from the 0to1.AI team — fast, personal, and specific to your situation.",
    group: "program",
  },
  {
    num: "08",
    title: "COMMUNITY CONVERSATION",
    desc: "Coming soon — a private space for 0to1 clients to swap builds, share what’s working, and trade notes on the tools and tactics that are actually moving the needle.",
    group: "program",
  },
];

const FREE_STEPS = STEPS.filter((s) => s.group === "free");
const PROGRAM_STEPS = STEPS.filter((s) => s.group === "program");

function StepCard({ step, delayIndex }: { step: Step; delayIndex: number }) {
  return (
    <div
      className="fade-in-up rounded-lg p-6 border border-border-terminal bg-bg-surface"
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
          command="cat how-it-works.md"
          heading="How the 0to1.AI program works"
        />

        <div className="fade-in-up max-w-2xl mb-10 space-y-2">
          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed">
            Here&apos;s the path. Start free. Go deeper if it fits.
          </p>
          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed">
            Phase I installs the foundation. Phase II compounds month over
            month.
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

        {/* The Program */}
        <p className="fade-in-up font-mono text-xs text-accent-cyan uppercase tracking-wider mb-4">
          // &#9472;&#9472; the program &#9472;&#9472;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAM_STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} delayIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
