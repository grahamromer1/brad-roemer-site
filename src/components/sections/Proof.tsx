"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import TerminalWindow from "@/components/ui/TerminalWindow";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const STATS = [
  { key: "workshops run", value: "5+" },
  { key: "AI agents built", value: "multiple, running live" },
  { key: "AI businesses built", value: "2 (and counting)" },
  { key: "foundation clients", value: "growing" },
  { key: "technical background", value: "zero" },
];

export default function Proof() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="proof" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-2xl mx-auto">
        <TerminalPrompt
          command="cat proof.md"
          heading="Why you can trust this program"
          subheading="Why operators trust this"
        />

        <p className="fade-in-up font-mono text-xs text-accent-cyan uppercase tracking-wider mb-6">
          // what this looks like in practice
        </p>

        <blockquote className="fade-in-up border-l-2 border-accent-green pl-4 mb-8">
          <p className="font-mono text-xl md:text-2xl text-text-primary font-bold">
            &ldquo;I built this program for myself first.&rdquo;
          </p>
        </blockquote>

        <div className="fade-in-up font-sans text-text-secondary text-base md:text-lg leading-relaxed space-y-5 mb-10">
          <p>
            Before 0to1.AI was a business, it was my own learning plan. The
            same framework I&apos;m offering you is what took me from
            Googling &ldquo;what is ChatGPT good for&rdquo; to building
            multiple AI agents and running workflows that handle real work in
            my business.
          </p>
          <p>
            I&apos;ve since run workshops helping real people apply these
            skills for the first time. The pattern is always the same: once
            someone has a guide and a weekly practice, the compounding kicks
            in fast.
          </p>
          <p>
            The long-term goal is bigger than coaching — it&apos;s building a
            community of people like you, learning together, sharing what
            works, and pushing each other forward. You&apos;re not just
            signing up for a program. You&apos;re joining something early.
          </p>
        </div>

        {/* sessions_log.md — terminal stat block */}
        <div
          className="fade-in-up"
          style={{ transitionDelay: "150ms" }}
        >
          <TerminalWindow filename="sessions_log.md">
            <ul className="space-y-2">
              {STATS.map((s) => (
                <li
                  key={s.key}
                  className="font-mono text-sm flex flex-wrap gap-x-2"
                >
                  <span className="text-accent-green">{s.key}:</span>
                  <span className="text-text-secondary">{s.value}</span>
                </li>
              ))}
            </ul>
          </TerminalWindow>
        </div>

        <p className="fade-in-up font-mono text-xs text-text-dim mt-6 text-center">
          // client stories coming soon — this section grows as we do.
        </p>
      </div>
    </section>
  );
}
