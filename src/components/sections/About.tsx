"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const META = [
  { key: "founder", value: "Brad Roemer" },
  { key: "background", value: "sole proprietor, real estate developer" },
  { key: "education", value: "USC \u00b7 Columbia University" },
  { key: "built", value: "AI agents, automated workflows, a new AI business" },
  { key: "based", value: "North County, San Diego" },
  { key: "serving", value: "operators and small businesses installing AI" },
];

export default function About() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-2xl mx-auto">
        <TerminalPrompt
          command="cat about.md"
          heading="About Brad Roemer"
          subheading="Who built this"
        />

        <div className="fade-in-up font-sans text-text-secondary text-base md:text-lg leading-relaxed space-y-5 mb-10">
          <p>
            I&apos;m <span className="text-text-primary font-semibold">Brad</span>.
          </p>
          <p>
            I don&apos;t have a technical background. I&apos;m not an engineer.
            I&apos;m a sole proprietor and real estate developer who knew AI was
            going to change everything — and couldn&apos;t find a good place to
            start learning it. YouTube videos, online courses, free tools,
            Reddit threads. Months of experimenting — all one-off, none of it
            directed, none of it building toward anything worthwhile.
          </p>
          <p>
            Then I built myself a plan. Mapped out what to learn, in what order,
            and something clicked. I spun up an AI agent team with OpenClaw.
            Learned to build with Claude Code. Created workflows that now run
            parts of my own business. Started a new AI company. Each week the
            skills compounded on the last — and I got obsessed. I also
            realized how much time it takes to stay on top of a space that
            evolves every
            single week.
          </p>
          <p>
            What I found: the gap isn&apos;t the technology — it&apos;s the{" "}
            <span className="text-accent-green">translation</span>. Most of
            what&apos;s out there is written by tech people for tech people.
            Everyone else is left spinning their wheels.
          </p>
          <p>
            That&apos;s why I built 0to1.AI. Not a course. Not an agency. A
            personalized program that meets you where you are — week by week,
            tailored to your business and your life. Until AI isn&apos;t
            something you&apos;re &ldquo;meaning to figure out&rdquo; anymore.
            It&apos;s how you operate. How you find opportunities. How you
            ship.
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
