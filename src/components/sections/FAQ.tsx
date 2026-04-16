"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const FAQS: { q: string; a: string }[] = [
  {
    q: "I\u2019m not technical at all. Is this for me?",
    a: "That\u2019s exactly who this is for. I\u2019m not technical either \u2014 I\u2019m a real estate developer who taught himself. The whole program is built around translating AI into language and actions that make sense for non-technical people.",
  },
  {
    q: "I already use ChatGPT a bit. Is this too basic?",
    a: "No. Most people who sign up are past the \u201cwhat is AI\u201d stage. The program meets you where you are \u2014 whether that\u2019s prompting basics or building workflows that run parts of your business.",
  },
  {
    q: "How is this different from an online course?",
    a: "Courses are generic and one-directional. This is personalized to your business, updated every week with what\u2019s actually happening in AI right now, and you have the 0to1.AI team you can ask questions anytime. Nothing you get here is off-the-shelf.",
  },
  {
    q: "How much time does this take per week?",
    a: "Most people spend 1\u20132 hours on their weekly guide plus whatever time they spend trying things. The monthly call is 30 minutes. It\u2019s designed to fit around running a business, not replace it.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Month-to-month, cancel anytime. No contracts, no commitments beyond the current month. If you prepay your first two months ($195/mo instead of $295/mo), that\u2019s the only commitment \u2014 and it saves you $200.",
  },
  {
    q: "What happens on the intro call?",
    a: "15 minutes. We look at where you are with AI, what\u2019s most relevant to your situation, and whether the program is a good fit. You\u2019ll leave with a next step either way \u2014 no pitch, no pressure.",
  },
];

export default function FAQ() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="faq" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <TerminalPrompt command="cat faq.md" />

        <div className="space-y-8">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className="fade-in-up pl-4 border-l-2 border-border-terminal"
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              <p className="font-mono text-base md:text-lg text-text-primary font-semibold mb-1">
                <span className="text-accent-cyan">[?]</span> {item.q}
              </p>
              <p className="font-sans text-text-secondary text-base leading-relaxed ml-6">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
