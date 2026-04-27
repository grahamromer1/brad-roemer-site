"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const PROBLEMS = [
  {
    title:
      "You’ve decided AI is no longer optional. You just don’t have time to figure out which tools matter, which to ignore, and how to actually install them in your business.",
    desc: "You’re not behind because you’re not smart. You’re behind because the space moves every week and there’s nobody whose job it is to keep your business current.",
  },
  {
    title:
      "You’ve already paid for ChatGPT, maybe Claude, maybe a tool or two. They sit there. You use them for one-off questions instead of running parts of your business.",
    desc: "The gap isn’t access — it’s installation. Knowing what to build, in what order, that actually replaces work.",
  },
  {
    title:
      "Hiring a consultant runs $5k–$15k for one engagement, and you’re left with a system you don’t fully understand. YouTube and courses cost $49 and teach you nothing about your specific business.",
    desc: "Between “expensive consultant” and “generic course” there’s almost nothing — until now.",
  },
  {
    title:
      "Your competitors are quietly making their businesses AI-native. You don’t see it on their websites — you’ll feel it in 12 months when they’re operating at a different level.",
    desc: "This isn’t FOMO. It’s recognition. The operators who install AI now will run different businesses in 18 months.",
  },
  {
    title:
      "You don’t need more AI content. You need someone whose job it is to teach you to install AI in your business.",
    desc: "That’s the gap. Not knowledge — installation. Workflows shipped, not articles read.",
  },
];

export default function Problem() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="problems" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <TerminalPrompt
          command="cat problems.md"
          heading="Why installing AI on your own is broken"
          subheading="Sound familiar?"
        />

        <div className="space-y-8">
          {PROBLEMS.map((p, i) => (
            <div
              key={i}
              className="fade-in-up pl-4 border-l-2 border-border-terminal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-sans text-base md:text-lg text-text-primary font-semibold mb-1">
                <span className="font-mono text-accent-amber">[!]</span>{" "}
                {p.title}
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
