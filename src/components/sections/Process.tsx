"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "DIAGNOSE",
    desc: "I learn your business, map where time and money are being wasted, and find the highest-ROI opportunities for AI.",
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "I design simple, practical workflows using tools you can actually maintain. No over-engineering. No complexity for its own sake.",
  },
  {
    num: "03",
    title: "IMPLEMENT",
    desc: "I help you set up your first systems, train your team, and make sure everything actually gets used.",
  },
];

export default function Process() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="process" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <TerminalPrompt command="./process --explain" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="fade-in-up rounded-lg border border-border-terminal bg-bg-surface p-6"
              style={{ transitionDelay: `${i * 150}ms` }}
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
