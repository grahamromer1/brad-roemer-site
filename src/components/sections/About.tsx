"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const META = [
  { key: "location", value: "San Diego, CA" },
  { key: "status", value: "Available for local + remote" },
  { key: "stack", value: "[Claude, OpenAI, Firecrawl, n8n, custom agents]" },
];

export default function About() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-2xl mx-auto">
        <TerminalPrompt command="cat about.md" />

        <div className="fade-in-up font-sans text-text-secondary text-base md:text-lg leading-relaxed space-y-5 mb-10">
          <p>
            I&apos;m Brad Roemer &mdash; entrepreneur, investor, and real estate
            developer turned AI consultant.
          </p>
          <p>
            I&apos;m not a tech guy with a computer science degree. I&apos;m a
            business owner who spent the last year going deep on AI because I saw
            what it could do for my own companies.
          </p>
          <p>
            What I found is that most AI tools are powerful but unusable for normal
            businesses. The gap isn&apos;t the technology &mdash; it&apos;s the
            translation. Someone needs to bridge what AI can do and what your
            business actually needs.
          </p>
          <p>
            That&apos;s what I do. I take complex AI capabilities and turn them into
            simple systems that small business owners can actually use, maintain, and
            benefit from.
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
