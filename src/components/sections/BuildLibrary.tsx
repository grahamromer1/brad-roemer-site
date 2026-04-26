"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import TerminalWindow from "@/components/ui/TerminalWindow";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const WORKFLOW_EXAMPLES = [
  "Inbox triage, reply drafting, and follow-up automation",
  "Customer and contact memory systems",
  "Meeting prep, briefing, and post-meeting action capture",
  "Document, proposal, and contract summarization",
  "Lead research, outreach, and prospect intelligence",
  "Reporting, dashboards, and KPI summarization",
  "Content production and one-source-to-many repurposing",
  "Internal SOPs, decision tracking, and onboarding",
];

const INFRA_EXAMPLES = [
  "Claude — Code, Cowork, Projects, MCP servers, Claude in Chrome",
  "ChatGPT — flagship reasoning, Codex, Custom GPTs, image gen",
  "Google AI — Gemini, Notebook LM, Nano Banana, AI Studio",
  "Automation — n8n, Zapier, Make.com, Apple Shortcuts",
  "Vibe coding — Lovable, Replit Agent, Bolt.new, v0 by Vercel",
  "Infra — GitHub, Cursor, Vercel, Resend, Cloudflare, Stripe",
  "Terminology — LLM, MCP, RAG, agents, context, tokens, embeddings",
  "Hardware — Mac vs PC, mics, multi-monitor builder setups",
];

export default function BuildLibrary() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="library"
      className="py-20 md:py-32 px-4 sm:px-6"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto">
        <TerminalPrompt
          command="cat library.md"
          heading="100+ workflow library plus the operator stack"
          subheading="What gets installed"
        />

        <p className="fade-in-up font-sans text-text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-3xl">
          Phase II is your build library &mdash; 100+ workflows you and the
          0to1.AI team pick from based on where your business needs
          leverage. New builds added weekly, plus infrastructure lessons on
          the tools serious operators are using right now.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workflow examples */}
          <div className="fade-in-up">
            <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider mb-4">
              // ── high-ROI workflow examples ──
            </p>
            <TerminalWindow filename="phase-ii-workflows.md">
              <ul className="space-y-2" role="list">
                {WORKFLOW_EXAMPLES.map((c) => (
                  <li
                    key={c}
                    className="font-mono text-sm text-text-secondary leading-relaxed"
                  >
                    <span className="text-accent-green" aria-hidden="true">
                      &rarr;
                    </span>{" "}
                    {c}
                  </li>
                ))}
              </ul>
            </TerminalWindow>
          </div>

          {/* Infra examples */}
          <div className="fade-in-up" style={{ transitionDelay: "100ms" }}>
            <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider mb-4">
              // ── infrastructure lesson examples ──
            </p>
            <TerminalWindow filename="operator-stack.md">
              <ul className="space-y-2" role="list">
                {INFRA_EXAMPLES.map((c) => (
                  <li
                    key={c}
                    className="font-mono text-sm text-text-secondary leading-relaxed"
                  >
                    <span className="text-accent-green" aria-hidden="true">
                      &rarr;
                    </span>{" "}
                    {c}
                  </li>
                ))}
              </ul>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  );
}
