"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const PROBLEMS = [
  {
    title:
      "You already made the switch from Google searches to ChatGPT prompts. Maybe you downloaded Copilot or Cowork. You felt the spark — then couldn\u2019t figure out how to make it stick.",
    desc: "You\u2019re back to doing things the old way \u2014 not because the tools don\u2019t work, but because nobody\u2019s shown you how to actually tap into what they can do for your business.",
  },
  {
    title:
      "Every course, tutorial, and YouTube rabbit hole is built for engineers — or for use cases that have nothing to do with your life.",
    desc: "You\u2019re not looking for a computer science degree. You\u2019re looking for \u201chere\u2019s how this helps your actual business on Monday morning.\u201d",
  },
  {
    title:
      "Hiring someone to build it for you costs thousands — and you don\u2019t understand what they gave you. Online courses cost $49 and teach you nothing specific to your situation.",
    desc: "There\u2019s a gap in between — personal, practical, priced for someone running their own thing — and almost nobody fills it.",
  },
  {
    title:
      "You\u2019re watching other people create things with AI that weren\u2019t possible six months ago.",
    desc: "It\u2019s not fear — it\u2019s recognition. These are skills you need for the next chapter of your work and your life. You just need a place to start building them.",
  },
  {
    title:
      "You\u2019ve consumed plenty of AI content \u2014 but you still can\u2019t diagnose what\u2019s actually going wrong when something doesn\u2019t work.",
    desc: "That\u2019s the real gap. Not knowledge \u2014 judgment. The ability to look at an AI interaction that failed and name exactly why.",
  },
];

export default function Problem() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="problems" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <TerminalPrompt
          command="cat problems.md"
          heading="Why learning AI on your own is broken"
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
