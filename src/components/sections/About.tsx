"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const META = [
  { key: "founder", value: "Brad Roemer" },
  { key: "background", value: "business operator, not a tech person" },
  { key: "based", value: "North County, San Diego" },
  { key: "serving", value: "solo operators + freelancers, anywhere" },
];

export default function About() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-2xl mx-auto">
        <TerminalPrompt command="cat about.md" />

        <div className="fade-in-up font-sans text-text-secondary text-base md:text-lg leading-relaxed space-y-5 mb-10">
          <p>
            0to1 AI was started by <span className="text-text-primary font-semibold">Brad Roemer</span> —
            an entrepreneur, investor, and real estate developer who, like most of
            you, woke up one day realizing AI was going to change everything and
            had no idea where to start.
          </p>
          <p>
            I&apos;m not a computer scientist. I don&apos;t have an engineering
            degree. I&apos;m a business operator who spent the last couple years
            going deep on AI the hard way — trying tools, breaking things,
            figuring out what actually moves the needle for a small business
            versus what&apos;s just hype.
          </p>
          <p>
            What I learned: most AI content is written by tech people for tech
            people. Everyone else is left Googling, spinning their wheels, and
            eventually giving up. The gap isn&apos;t the technology — it&apos;s the{" "}
            <span className="text-accent-green">translation</span>.
          </p>
          <p>
            0to1 AI is the guide I wish I&apos;d had: practical, personalized,
            no-BS. I&apos;ll never hand you a black box. I&apos;ll teach you how
            to fish — meet you where you are, walk alongside you, and leave you
            with real skills you own for life.
          </p>
        </div>

        {/* Config metadata */}
        <div className="fade-in-up rounded-lg border border-border-terminal bg-bg-surface p-5" style={{ transitionDelay: "200ms" }}>
          {META.map((m) => (
            <p key={m.key} className="font-mono text-sm mb-1 last:mb-0">
              <span className="text-accent-green">{m.key}:</span>{" "}
              <span className="text-text-secondary">{m.value}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
