"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const PROBLEMS = [
  {
    title: "You know AI matters, but you don't know where to start.",
    desc: "Every tool promises to change your business. None came with instructions.",
  },
  {
    title: "You tried ChatGPT. It was cool for a week. Then nothing changed.",
    desc: "Tools without systems are just toys.",
  },
  {
    title: "You don't have time to figure this out.",
    desc: "You're running a business. You need someone who already has.",
  },
  {
    title: "Your competitors are pulling ahead and you can feel it.",
    desc: "The gap between AI-adopters and everyone else is growing fast.",
  },
];

export default function Problem() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="problems" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <TerminalPrompt command="cat problems.md" />

        <div className="space-y-8">
          {PROBLEMS.map((p, i) => (
            <div
              key={i}
              className="fade-in-up pl-4 border-l-2 border-border-terminal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-mono text-base md:text-lg text-text-primary font-semibold mb-1">
                <span className="text-accent-amber">[!]</span> {p.title}
              </p>
              <p className="font-sans text-text-secondary text-base leading-relaxed ml-6">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
