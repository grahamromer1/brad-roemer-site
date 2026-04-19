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
    a: "Courses give you information. 0to1 builds a skill. The first 5 weeks follow a structured foundation \u2014 each session shifts how you think about AI, not just what buttons to press. After that, the program branches based on where you want to go. It\u2019s personalized to your business, updated every week, and you have the 0to1.AI team you can ask questions anytime. Nothing here is off-the-shelf.",
  },
  {
    q: "How much time does this take per week?",
    a: "Each session is designed to take 20\u201330 minutes for the core build, plus whatever time you spend experimenting on your own. Most people spend about 1\u20132 hours total per week. The monthly call is 30 minutes. It\u2019s designed to fit around running a business, not replace it.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Month-to-month, cancel anytime. No contracts, no commitments beyond the current month.",
  },
  {
    q: "What happens on the intro call?",
    a: "15 minutes. We look at where you are with AI, what\u2019s most relevant to your situation, and whether the program is a good fit. You\u2019ll leave with a next step either way \u2014 no pitch, no pressure.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: a,
    },
  })),
};

export default function FAQ() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="faq" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <TerminalPrompt
          command="cat faq.md"
          heading="Frequently asked questions"
          subheading="Common questions"
        />

        <div className="space-y-8">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className="fade-in-up pl-4 border-l-2 border-border-terminal"
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              <p className="font-sans text-base md:text-lg text-text-primary font-semibold mb-1">
                <span className="font-mono text-accent-cyan">[?]</span>{" "}
                {item.q}
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
