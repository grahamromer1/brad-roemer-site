"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What’s the difference between Founding, Monthly, and Pro?",
    a: "Founding Members get $245/mo locked for life with a 6-month upfront commitment ($1,470 total) — limited to the first 20 clients. Monthly is the standard tier at $295/mo. Pro is $495/mo for operators wanting bi-weekly calls, a concierge channel, quarterly build sprints with Brad, and faster Phase II cadence. All three include the full Phase II library and infrastructure lessons.",
  },
  {
    q: "Why $1,470 upfront for Founding Members?",
    a: "The upfront commitment ($245/mo × 6 months) is the filter. Founding Members get a lifetime rate that pays back in under 30 months and recognition as an early supporter.",
  },
  {
    q: "Do you have a team plan?",
    a: "Yes — 0to1 Team is built for small businesses with 5-10 person teams at $1,295/mo (or $3,495 paid quarterly). See team plans at /teams for full details. Larger teams can email info@get0to1.ai for a custom conversation.",
  },
  {
    q: "I’m not technical at all. Is this for me?",
    a: "That’s exactly who this is for. Brad isn’t technical either — a real estate developer who taught himself. The whole program is built around translating AI into language and actions that make sense for non-technical operators.",
  },
  {
    q: "I already use Claude Cowork a bit. Is this too basic?",
    a: "No. Most clients are past the “what is AI” stage. Phase I teaches you to brief AI like an operator, not a tinkerer. Phase II is personalized to your business — you pick the next workflow build each month based on where time is leaking. The program meets advanced users where they are.",
  },
  {
    q: "How is this different from an online course?",
    a: "Courses give you information. 0to1 installs working AI workflows in your business. Phase I is 5 foundation sessions that teach you to brief AI like an operator. Phase II is a library of 100+ workflow installs (and growing weekly), and we pick your next install based on where your business is leaking time. It’s a membership, not a course — personalized, ongoing, and the relationship deepens as we go.",
  },
  {
    q: "How much time does this take per week?",
    a: "Each Phase II build is designed to take 20–30 minutes for the install, plus whatever time you spend running it once it’s live. Most clients spend about 1–2 hours total per week. The strategy call is 30 minutes (Monthly) or bi-weekly 30 minutes (Pro). It’s designed to fit around running a business, not replace it.",
  },
  {
    q: "Can I pause?",
    a: "Yes — pause anytime on Monthly and Pro tiers. Founding Members commit to 6 months upfront ($1,470). After the initial 6 months, Founding Members are also pause-anytime at the locked $245/mo rate.",
  },
  {
    q: "What happens on the intro call?",
    a: "15 minutes with Brad. We look at where your business is leaking time, what AI workflow would install fastest, and whether the program is a fit. You’ll leave with a concrete next step either way — no pitch, no pressure.",
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
