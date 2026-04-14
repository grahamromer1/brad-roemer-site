"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import TerminalWindow from "@/components/ui/TerminalWindow";
import Button from "@/components/ui/Button";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const SERVICES = [
  {
    filename: "strategy-session.md",
    title: "AI Strategy Session",
    items: [
      "60-90 minutes",
      "Deep dive into your operations",
      "Identify top 3 AI opportunities",
      "Prioritized roadmap + next steps",
    ],
    price: "Starting at $750",
    cta: "Book Your Session",
    calLink: "bradroemer/strategy",
  },
  {
    filename: "system-setup.md",
    title: "AI System Setup",
    items: [
      "1-2 week engagement",
      "Implement 1-2 AI workflows",
      "Hands-on setup + team training",
      "30 days follow-up support",
    ],
    price: "Starting at $2,500",
    cta: "Let's Talk",
    href: "#book",
  },
];

export default function Services() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="services" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <TerminalPrompt command="ls services/" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.filename}
              className="fade-in-up transition-all duration-200 hover:-translate-y-[2px] hover:border-text-dim rounded-lg"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <TerminalWindow filename={svc.filename}>
                <h3 className="font-mono text-text-primary text-xl font-bold mb-1">{svc.title}</h3>
                <div className="h-px bg-border-terminal mb-4 w-40" aria-hidden="true" />

                <ul className="space-y-2 mb-6">
                  {svc.items.map((item) => (
                    <li key={item} className="font-mono text-sm text-text-secondary">
                      <span className="text-accent-cyan" aria-hidden="true">&rarr;</span> {item}
                    </li>
                  ))}
                </ul>

                <p className="font-mono text-accent-green font-bold text-lg mb-6">{svc.price}</p>

                {svc.calLink ? (
                  <Button
                    href={`https://cal.com/${svc.calLink}`}
                    variant="primary"
                  >
                    {svc.cta}
                  </Button>
                ) : (
                  <Button href={svc.href} variant="primary">
                    {svc.cta}
                  </Button>
                )}
              </TerminalWindow>
            </div>
          ))}
        </div>

        <p className="font-mono text-text-dim text-sm text-center mt-8">
          // looking for ongoing support? ask about monthly advisory retainers.
        </p>
      </div>
    </section>
  );
}
