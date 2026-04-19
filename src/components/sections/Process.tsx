"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

type StepGroup = "free" | "program";

interface Step {
  num: string;
  title: string;
  desc: string;
  group: StepGroup;
  /** Optional terminal-style bullet list, rendered with → cyan prefixes. */
  bullets?: string[];
  /** Optional lead-in line shown above bullets. */
  bulletsLead?: string;
  /** Optional second paragraph shown below bullets. */
  outro?: string;
  /** Optional third paragraph shown below outro. */
  outro2?: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "TAKE THE QUIZ",
    desc: "5 minutes, 13 questions. You\u2019ll get scored on two axes and mapped to one of four AI personas \u2014 plus two things to try this week. No email required.",
    group: "free",
  },
  {
    num: "02",
    title: "BOOK AN INTRO CALL",
    desc: "15 minutes, free. We walk through your quiz results, look at your business, and figure out if this is the right fit. You leave with a concrete next step either way.",
    group: "free",
  },
  {
    num: "03",
    title: "KICKOFF + QUICK WINS",
    desc: "Your first week: a kickoff call where we map AI opportunities to your business and your daily life. You\u2019ll walk away with quick wins you can run immediately. Momentum from day one.",
    group: "program",
  },
  {
    num: "04",
    title: "YOUR WEEKLY SESSIONS",
    desc: "Every week, you get a session built around one thing: a shift in how you think about AI. Not tool tutorials \u2014 real skills.",
    group: "program",
    bulletsLead: "You\u2019ll learn to:",
    bullets: [
      "Have real conversations with AI, not just Q&A",
      "Give it context so answers are about YOU, not generic advice",
      "Manage conversations as a resource, not throwaway chats",
      "Shape how AI thinks and responds",
      "Make AI act on your world, not just talk about it",
    ],
    outro:
      "Each session includes a concrete 20\u201330 minute build \u2014 something you actually create that week. No pure-concept weeks.",
    outro2:
      "As you progress, sessions branch into what matters most to you \u2014 personal systems, business operations, or building something new.",
  },
  {
    num: "05",
    title: "MONTHLY STRATEGY CALL",
    desc: "30 minutes, one-on-one. Each call covers 3 Things: a Win, a Question, and a Miss \u2014 so we\u2019re always building on what\u2019s working and fixing what\u2019s not. That\u2019s where the real learning happens.",
    group: "program",
  },
  {
    num: "06",
    title: "YOUR GROWING KNOWLEDGE BASE",
    desc: "Every session archives to a personal Notion database you keep forever. Searchable, referenceable, yours. The 0to1.AI team is in your corner for questions between calls \u2014 and when something big drops in AI, you\u2019ll get a briefing on what changed and how it affects what you\u2019ve already built.",
    outro: "No finish line. Just a sharper foundation, every week.",
    group: "program",
  },
  {
    num: "07",
    title: "ASK ANYTHING, ANYTIME",
    desc: "Questions between calls? Send them anytime and get real, thoughtful answers from the 0to1.AI team \u2014 fast, personal, and specific to your situation.",
    group: "program",
  },
];

const FREE_STEPS = STEPS.filter((s) => s.group === "free");
const PROGRAM_STEPS = STEPS.filter((s) => s.group === "program");

function StepCard({ step, delayIndex }: { step: Step; delayIndex: number }) {
  return (
    <div
      className="fade-in-up rounded-lg p-6 border border-border-terminal bg-bg-surface"
      style={{ transitionDelay: `${delayIndex * 100}ms` }}
    >
      <p className="font-mono text-accent-green text-2xl font-bold mb-2">
        [{step.num}]
      </p>
      <h3 className="font-mono text-text-primary text-lg font-bold uppercase mb-4 flex items-center gap-2">
        {step.title}
        <span
          className="flex-1 h-px bg-border-terminal"
          aria-hidden="true"
        />
      </h3>
      <p className="font-sans text-text-secondary text-base leading-relaxed">
        {step.desc}
      </p>
      {step.bullets && step.bullets.length > 0 && (
        <>
          {step.bulletsLead && (
            <p className="font-sans text-text-secondary text-base leading-relaxed mt-4">
              {step.bulletsLead}
            </p>
          )}
          <ul className="mt-2 space-y-1.5" role="list">
            {step.bullets.map((b) => (
              <li
                key={b}
                className="font-mono text-sm text-text-secondary leading-relaxed"
              >
                <span className="text-accent-green" aria-hidden="true">
                  &rarr;
                </span>{" "}
                {b}
              </li>
            ))}
          </ul>
        </>
      )}
      {step.outro && (
        <p className="font-sans text-text-secondary text-base leading-relaxed mt-4">
          {step.outro}
        </p>
      )}
      {step.outro2 && (
        <p className="font-sans text-text-secondary text-base leading-relaxed mt-4">
          {step.outro2}
        </p>
      )}
    </div>
  );
}

export default function Process() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="process" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <TerminalPrompt
          command="./how-it-works --explain"
          heading="How the 0to1.AI program works"
          subheading="How it works"
        />

        <div className="fade-in-up max-w-2xl mb-10 space-y-2">
          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed">
            Here&apos;s the path. Start free. Go deeper if it fits.
          </p>
          <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed">
            Each week builds on the last. No finish line &mdash; just a
            sharper foundation.
          </p>
        </div>

        {/* Free on-ramp */}
        <p className="fade-in-up font-mono text-xs text-accent-cyan uppercase tracking-wider mb-4">
          // &#9472;&#9472; start here (free) &#9472;&#9472;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {FREE_STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} delayIndex={i} />
          ))}
        </div>

        {/* The Program */}
        <p className="fade-in-up font-mono text-xs text-accent-cyan uppercase tracking-wider mb-4">
          // &#9472;&#9472; the program &#9472;&#9472;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAM_STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} delayIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
