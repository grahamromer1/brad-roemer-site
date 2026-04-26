"use client";

import TerminalPrompt from "@/components/ui/TerminalPrompt";
import TerminalWindow from "@/components/ui/TerminalWindow";
import { useScrollReveal } from "@/components/hooks/useScrollReveal";

const WORKFLOW_CATEGORIES = [
  "Inbox triage, reply drafting, and follow-up automation",
  "Customer and contact memory systems",
  "Meeting prep, briefing, and post-meeting action capture",
  "Document, proposal, and contract summarization",
  "Content production and one-source-to-many repurposing",
  "Lead research, prospect intelligence, and outreach",
  "Decision tracking and reasoning capture",
  "Reporting, dashboards, and KPI summarization",
  "Receipt, expense, and admin workflow automation",
  "Internal SOPs, process documentation, and onboarding",
];

interface InfraStack {
  filename: string;
  title: string;
  items: string[];
}

const INFRA_STACK: InfraStack[] = [
  {
    filename: "claude.md",
    title: "Claude",
    items: [
      "Claude Code — terminal-grade AI for builders and operators",
      "Claude Cowork — local AI that runs on your desktop and acts on your behalf",
      "Claude.ai + Projects — chat interface and context-aware workspaces",
      "MCP servers — connecting Claude to Gmail, Slack, Notion, your file system",
      "Claude in Chrome — agentic browsing",
    ],
  },
  {
    filename: "chatgpt.md",
    title: "ChatGPT",
    items: [
      "ChatGPT 5.5 — flagship reasoning model",
      "Codex — coding agent for non-coders",
      "Custom GPTs — packaged AI experts you build once and reuse",
      "Image generation 2.0 — branding, marketing assets, decks",
    ],
  },
  {
    filename: "google-ai.md",
    title: "Google AI stack",
    items: [
      "Gemini — Google’s flagship model",
      "Nano Banana — fast, cheap image generation",
      "Notebook LM — research and document synthesis",
      "Google’s latest design and AI Studio releases",
    ],
  },
  {
    filename: "automation.md",
    title: "Automated workflow systems",
    items: [
      "n8n — open-source, self-hostable automation",
      "Zapier — the most popular cross-app automation",
      "Make.com — visual flow builder",
      "Apple Shortcuts — Mac and iPhone automation",
    ],
  },
  {
    filename: "vibe-coding.md",
    title: "Vibe coding applications",
    items: [
      "Lovable — natural language to working web apps",
      "Replit Agent — code and ship from a browser",
      "Bolt.new — apps from a sentence",
      "v0 by Vercel — UI from a prompt",
    ],
  },
  {
    filename: "infra.md",
    title: "Infrastructure",
    items: [
      "GitHub — version control and code hosting",
      "Cursor — AI-first IDE",
      "Vercel — ship and host what you build",
      "Resend — email infrastructure for builders",
      "Cloudflare — domains, hosting, security",
      "Stripe — payments for digital products",
    ],
  },
  {
    filename: "terminology.md",
    title: "Terminology you’ll actually understand",
    items: [
      "LLM, MCP, CLI, API, RAG, agent, context window, prompt, token, embedding, fine-tuning, system prompt",
    ],
  },
  {
    filename: "hardware.md",
    title: "Hardware setup",
    items: [
      "Mac vs PC for AI work",
      "Optimal Mac Mini and laptop setups for builders",
      "Microphones for voice-driven workflows",
      "Multi-monitor setups for terminal + AI side-by-side",
    ],
  },
];

export default function BuildLibrary() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="library"
      className="py-20 md:py-32 px-4 sm:px-6"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <TerminalPrompt
          command="cat library.md"
          heading="100+ workflow library plus the operator stack"
          subheading="What gets installed"
        />

        <p className="fade-in-up font-sans text-text-primary text-base md:text-lg leading-relaxed mb-10 max-w-3xl italic">
          Phase II is your build library &mdash; 100+ workflows you and Brad
          pick from based on where your business needs leverage. New builds
          added weekly. Plus infrastructure lessons that get you running on
          the tools serious operators are using right now.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Workflow categories */}
          <div className="fade-in-up">
            <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider mb-4">
              // &#9472;&#9472; high-ROI workflow categories &#9472;&#9472;
            </p>
            <TerminalWindow filename="phase-ii-workflows.md">
              <ul className="space-y-2.5" role="list">
                {WORKFLOW_CATEGORIES.map((c) => (
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

          {/* Infrastructure stack */}
          <div className="fade-in-up" style={{ transitionDelay: "100ms" }}>
            <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider mb-4">
              // &#9472;&#9472; infrastructure lessons (operator stack) &#9472;&#9472;
            </p>
            <div className="space-y-4">
              {INFRA_STACK.map((stack) => (
                <TerminalWindow key={stack.title} filename={stack.filename}>
                  <p className="font-mono text-text-primary text-sm font-bold mb-3">
                    {stack.title}
                  </p>
                  <ul className="space-y-1.5" role="list">
                    {stack.items.map((item) => (
                      <li
                        key={item}
                        className="font-mono text-xs text-text-secondary leading-relaxed"
                      >
                        <span
                          className="text-accent-green"
                          aria-hidden="true"
                        >
                          &rarr;
                        </span>{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </TerminalWindow>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
