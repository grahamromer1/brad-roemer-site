"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const PROBLEMS = [
  {
    title: "You know AI matters, but you don't know where to start.",
    desc: "Every tool promises to change your business. None came with instructions — and most advice is written for engineers, not operators.",
  },
  {
    title: "You tried ChatGPT. It was cool for a week. Then nothing changed.",
    desc: "Tools without a practice don't stick. You need someone pointing you at the right experiment this week, then the next.",
  },
  {
    title: "You don't want a done-for-you black box.",
    desc: "You want to understand what you're building. Teach a person to fish, don't hand them a fish they don't know how to reheat.",
  },
  {
    title: "Custom agency builds are $10k+ and generic courses don't fit your business.",
    desc: "You need something in between — personal, practical, priced for a solo operator, and tailored to what you actually do.",
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
