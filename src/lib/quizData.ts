// ── Quiz Data & Scoring Logic ─────────────────────────────

export interface QuizOption {
  label: string;
  value: string;
  /**
   * Mutually-exclusive option (e.g. "all of the above"). On a multi-select
   * question, picking it clears any other selection and auto-advances. On a
   * single-select question this flag has no effect (the option already
   * advances on click).
   */
  exclusive?: boolean;
}

export interface QuizQuestion {
  id: string;
  section: string;
  question: string;
  options: QuizOption[];
  multiSelect: boolean;
  openFieldLabel?: string;
  /** For Q11: max number of selections allowed */
  maxSelections?: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ── Section 1: About You & Your Business ──
  {
    id: "business_type",
    section: "About You",
    question: "What best describes your business?",
    multiSelect: false,
    openFieldLabel: "None of these fit? Tell me more.",
    options: [
      { label: "Professional services (consulting, legal, accounting, etc.)", value: "professional_services" },
      { label: "Real estate or property management", value: "real_estate" },
      { label: "Local retail or e-commerce", value: "retail_ecommerce" },
      { label: "Creative / marketing / media", value: "creative_media" },
      { label: "Health & wellness", value: "health_wellness" },
      { label: "Trades / field services", value: "trades_field" },
      { label: "Tech / SaaS", value: "tech_saas" },
    ],
  },
  {
    id: "team_size",
    section: "About You",
    question: "How big is your team?",
    multiSelect: false,
    options: [
      { label: "Just me", value: "solo" },
      { label: "2–3 people", value: "2_3" },
      { label: "4–5 people", value: "4_5" },
      { label: "6–10 people", value: "6_10" },
      { label: "10+", value: "10_plus" },
    ],
  },
  {
    id: "primary_role",
    section: "About You",
    question: "What's your primary role day-to-day?",
    multiSelect: false,
    openFieldLabel: "Something else? Tell me.",
    options: [
      { label: "I do everything (sales, ops, delivery, admin)", value: "everything" },
      { label: "I focus on sales/growth and delegate operations", value: "sales_growth" },
      { label: "I focus on delivery/service and someone else handles the business side", value: "delivery_service" },
      { label: "I manage the team and oversee the business", value: "manager" },
    ],
  },
  // ── Section 2: How You Work Today ──
  {
    id: "communication",
    section: "How You Work",
    question: "How does your business communicate?",
    multiSelect: true,
    openFieldLabel: "Use something else? Add it.",
    options: [
      { label: "Email (Gmail / Google Workspace)", value: "gmail" },
      { label: "Email (Outlook / Microsoft 365)", value: "outlook" },
      { label: "Slack or Discord", value: "slack_discord" },
      { label: "Microsoft Teams", value: "teams" },
      { label: "Text messages / iMessage / WhatsApp", value: "text_messaging" },
      { label: "Phone calls (mostly)", value: "phone" },
      { label: "Zoom / Google Meet / Video calls", value: "video_calls" },
    ],
  },
  {
    id: "info_storage",
    section: "How You Work",
    question: "Where does your business information live?",
    multiSelect: true,
    openFieldLabel: "Something else?",
    options: [
      { label: "Google Drive / Google Docs", value: "google_drive" },
      { label: "Dropbox", value: "dropbox" },
      { label: "Microsoft OneDrive / SharePoint", value: "onedrive" },
      { label: "Notion", value: "notion" },
      { label: "Physical files / paper", value: "physical" },
      { label: "Scattered across different places", value: "scattered" },
      { label: "I honestly don't know", value: "dont_know" },
    ],
  },
  {
    id: "business_tools",
    section: "How You Work",
    question: "What tools do you use to manage your business?",
    multiSelect: true,
    openFieldLabel: "Other tools?",
    options: [
      { label: "Google Calendar", value: "google_calendar" },
      { label: "Outlook Calendar", value: "outlook_calendar" },
      { label: "A CRM (HubSpot, Salesforce, etc.)", value: "crm" },
      { label: "Project management tool (Asana, Monday, Trello, etc.)", value: "project_mgmt" },
      { label: "Accounting software (QuickBooks, Xero, etc.)", value: "accounting" },
      { label: "Scheduling tool (Calendly, Acuity, etc.)", value: "scheduling" },
      { label: "Invoicing or payments (Stripe, Square, FreshBooks, etc.)", value: "invoicing_payments" },
      { label: "Social media management (Hootsuite, Buffer, Later, etc.)", value: "social_mgmt" },
      { label: "We mostly use spreadsheets and email", value: "spreadsheets_email" },
      { label: "Not much — it's mostly in my head", value: "in_my_head" },
    ],
  },
  {
    id: "work_devices",
    section: "How You Work",
    question: "What devices do you rely on most to run your business?",
    multiSelect: false,
    openFieldLabel: "Want to add more color?",
    options: [
      { label: "Mostly my laptop or desktop", value: "desktop" },
      { label: "Mostly my phone", value: "mobile" },
      { label: "A mix — but I live in my phone", value: "mix_mobile" },
      { label: "A mix — but I live in my laptop", value: "mix_desktop" },
      { label: "A tablet / iPad is my main tool", value: "tablet" },
    ],
  },
  {
    id: "work_environment",
    section: "How You Work",
    question: "Where does your work actually happen?",
    multiSelect: true,
    openFieldLabel: "Something else? Tell me.",
    options: [
      { label: "At a desk / home office (remote)", value: "remote_desk" },
      { label: "At a physical office or storefront", value: "office_storefront" },
      { label: "On job sites or in the field", value: "field_jobsite" },
      { label: "On the go — car, coffee shops, wherever", value: "on_the_go" },
      { label: "Mostly in-person meetings with clients", value: "in_person_meetings" },
      { label: "A mix of everything", value: "mix_all" },
    ],
  },
  // ── Section 3: Your AI Experience ──
  {
    id: "ai_usage",
    section: "AI Experience",
    question: "Have you used any AI tools?",
    multiSelect: false,
    openFieldLabel: "Want to add more color?",
    options: [
      { label: "No, never", value: "never" },
      { label: "I've tried ChatGPT or similar once or twice", value: "tried_once" },
      { label: "I use ChatGPT / Claude / Gemini occasionally", value: "occasionally" },
      { label: "I use AI tools regularly in my work", value: "regularly" },
      { label: "I've tried to set up automations or workflows with AI", value: "workflows" },
    ],
  },
  {
    id: "ai_use_cases",
    section: "AI Experience",
    question: "What have you used AI for? (if anything)",
    multiSelect: true,
    openFieldLabel: "Something else?",
    options: [
      { label: "I haven't really used it yet", value: "none" },
      { label: "Writing emails or content", value: "writing" },
      { label: "Brainstorming or research", value: "brainstorming" },
      { label: "Summarizing documents or notes", value: "summarizing" },
      { label: "Customer-facing chat or support", value: "customer_chat" },
      { label: "Generating social media posts", value: "social_media" },
      { label: "Data analysis or spreadsheets", value: "data_analysis" },
      { label: "Vibe coded a website or app", value: "vibe_coding" },
    ],
  },
  {
    id: "ai_comfort",
    section: "AI Experience",
    question: "How would you describe your comfort level with AI right now?",
    multiSelect: false,
    openFieldLabel: "Want to add more color?",
    options: [
      { label: "Curious but overwhelmed — I don't know where to start", value: "overwhelmed" },
      { label: "Interested but skeptical — I'm not sure it applies to my business", value: "skeptical" },
      { label: "I've dabbled but can't figure out how to make it stick", value: "dabbled" },
      { label: "I use it but know I'm barely scratching the surface", value: "scratching_surface" },
      { label: "I'm fairly comfortable and want to go deeper", value: "comfortable" },
    ],
  },
  // ── Section 4: What's Holding You Back & What You Want ──
  {
    id: "friction",
    section: "What's Next",
    question: "What's eating the most time or energy in your business right now?",
    multiSelect: true,
    maxSelections: 3,
    openFieldLabel: "Something else weighing on you?",
    options: [
      { label: "Too much time on email and admin", value: "email_admin" },
      { label: "Lead generation or finding new clients", value: "lead_gen" },
      { label: "Following up with leads or customers", value: "follow_up" },
      { label: "Creating content (social, marketing, proposals)", value: "content_creation" },
      { label: "Scheduling and calendar management", value: "scheduling" },
      { label: "Keeping track of tasks and projects", value: "task_management" },
      { label: "Onboarding or managing clients", value: "client_onboarding" },
      { label: "Research and staying informed", value: "research" },
      { label: "I don't even know — everything feels manual", value: "everything_manual" },
    ],
  },
  {
    id: "ai_goal",
    section: "What's Next",
    question: "THIS WEEK — if AI could unlock one thing for you, what would matter most?",
    multiSelect: false,
    openFieldLabel: "Something else on your mind?",
    options: [
      { label: "Save serious time on repetitive work", value: "save_time" },
      { label: "Grow the business — more clients, content, and revenue", value: "new_opportunities" },
      { label: "Build systems so I'm not the bottleneck", value: "build_systems" },
      { label: "Free up real life — family, health, personal time", value: "free_time_personal" },
      { label: "Focus on my highest-and-best-use in the business", value: "highest_best_use" },
      { label: "I honestly don't know yet — that's why I'm here", value: "dont_know" },
    ],
  },
  {
    id: "ai_goal_longterm",
    section: "What's Next",
    question: "THE NEXT 12 MONTHS — where do you want AI to take your business? (pick up to 3)",
    multiSelect: true,
    maxSelections: 3,
    openFieldLabel: "Bigger vision? Share it.",
    options: [
      { label: "Reclaim hours every week and step back from day-to-day ops", value: "reclaim_time_lt" },
      { label: "Grow revenue and capacity without growing headcount", value: "grow_revenue_lt" },
      { label: "Systematize the business so it runs without me in every detail", value: "systematize_lt" },
      { label: "Launch new products, services, or scale my expertise into IP", value: "new_product_lt" },
      { label: "Spend more time on family, health, and personal life", value: "personal_life_lt" },
      { label: "All of the above", value: "all_above_lt", exclusive: true },
    ],
  },
  {
    id: "ai_style",
    section: "What's Next",
    question: "When it comes to AI in your business, which approach fits you best?",
    multiSelect: false,
    options: [
      {
        label:
          "DIY — I want to learn it myself. Hand me the tools and I'll figure it out.",
        value: "diy",
      },
      {
        label:
          "DWY — I want help. Walk with me — guidance, structure, and accountability while I do the work.",
        value: "dwy",
      },
      {
        label:
          "DFY — Just do it for me. I want results without becoming the expert.",
        value: "dfy",
      },
    ],
  },
];

// ── Scoring ────────────────────────────────────────────────

export interface QuizAnswers {
  [questionId: string]: {
    selected: string[];
    openText?: string;
  };
}

export interface QuizScores {
  aiMaturity: number;
  aiMaturityMax: number;
  systemsMaturity: number;
  systemsMaturityMax: number;
}

export type QuizType = "blank_slate" | "organized_starter" | "curious_tinkerer" | "ready_builder";

export interface Phase1Week {
  num: number;
  title: string;
  description: string;
}

export interface QuizResult {
  scores: QuizScores;
  type: QuizType;
  typeLabel: string;
  typeDescription: string;
  /** Plain-English diagnosis of the mindset currently running under the surface. */
  surfaceParagraph: string;
  /** One-line cost of inaction. */
  stakes: string;
  /** Honest early-access proof line. No invented numbers. */
  proof: string;
  /** Shared 5-week Phase I arc. Identical for every archetype. */
  phase1Arc: Phase1Week[];
  /** Which week numbers (1–5) are "especially high leverage" for this archetype. */
  highlightedWeeks: number[];
  /** Two mini builds to try before Week 1 fires — previews of session concepts. */
  tryThisWeek: [string, string];
  /** @deprecated kept for webhook back-compat — mirrors surfaceParagraph + stakes. */
  insights: [string, string];
  /** @deprecated kept for webhook back-compat — mirrors tryThisWeek. */
  actions: [string, string];
}

function scoreAIMaturity(answers: QuizAnswers): number {
  let score = 0;

  // Q8: ai_usage (0–4)
  const usage = answers.ai_usage?.selected?.[0];
  const usageMap: Record<string, number> = {
    never: 0,
    tried_once: 1,
    occasionally: 2,
    regularly: 3,
    workflows: 4,
  };
  score += usageMap[usage] ?? 0;

  // Q9: ai_use_cases (0–3 based on count)
  const useCases = answers.ai_use_cases?.selected ?? [];
  const nonNone = useCases.filter((v) => v !== "none");
  if (nonNone.length === 0) score += 0;
  else if (nonNone.length <= 2) score += 1;
  else if (nonNone.length <= 4) score += 2;
  else score += 3;

  // Q10: ai_comfort (0–4)
  const comfort = answers.ai_comfort?.selected?.[0];
  const comfortMap: Record<string, number> = {
    overwhelmed: 0,
    skeptical: 1,
    dabbled: 2,
    scratching_surface: 3,
    comfortable: 4,
  };
  score += comfortMap[comfort] ?? 0;

  return score;
}

function scoreSystemsMaturity(answers: QuizAnswers): number {
  let score = 0;

  // Q5: info_storage (0–3)
  const storage = answers.info_storage?.selected ?? [];
  if (storage.includes("scattered") || storage.includes("dont_know")) {
    score += 0;
  } else if (storage.includes("physical")) {
    score += 1;
  } else if (storage.length === 1) {
    score += 2;
  } else if (storage.length >= 2) {
    score += 3;
  }

  // Q6: business_tools (0–4)
  const tools = answers.business_tools?.selected ?? [];
  if (tools.includes("in_my_head")) {
    score += 0;
  } else if (tools.includes("spreadsheets_email")) {
    score += 1;
  } else {
    const toolCount = tools.length;
    if (toolCount <= 2) {
      score += 2;
    } else {
      score += 3;
    }
    // Bonus for CRM + project management
    if (tools.includes("crm") && tools.includes("project_mgmt")) {
      score += 1;
    }
  }

  return score;
}

function determineType(aiScore: number, systemsScore: number): QuizType {
  const lowAI = aiScore <= 4;
  const lowSystems = systemsScore <= 3;

  if (lowAI && lowSystems) return "blank_slate";
  if (lowAI && !lowSystems) return "organized_starter";
  if (!lowAI && lowSystems) return "curious_tinkerer";
  return "ready_builder";
}

const TYPE_INFO: Record<QuizType, { label: string; description: string }> = {
  blank_slate: {
    label: "The Blank Slate",
    description:
      "You're running on hustle and instinct — and it's working. But you're doing everything manually, and AI still feels like a foreign language. Good news: you have the most to gain, and the first couple of wins will feel massive.",
  },
  organized_starter: {
    label: "The Organized Starter",
    description:
      "You've already got systems and a tight operation. AI is the one lever you haven't pulled yet — which means the runway is short. Your structure is a head start most people don't have.",
  },
  curious_tinkerer: {
    label: "The Curious Tinkerer",
    description:
      "You've played with AI enough to know it works \u2014 sometimes. But the results are inconsistent, the chats drift, and you're back to old habits by Wednesday. You know what's possible. You just haven't stitched it to your actual workflow yet.",
  },
  ready_builder: {
    label: "The Ready Builder",
    description:
      "You're past \"what is AI\" and into \"why doesn't this ship.\" You've got the tools and the reps, and you can feel the ceiling. You don't need an introduction \u2014 you need the structure that gets AI producing deliverables instead of drafts.",
  },
};

// ── "What's running under the surface" — one paragraph per archetype
// Names the current mindset in plain English. Hints at the fix without
// naming the 7-Input framework (protects the Session 6 reveal).

export const TYPE_SURFACE_PARAGRAPH: Record<QuizType, string> = {
  blank_slate:
    "You've probably asked ChatGPT something, gotten a useless answer, and moved on. That's because you're treating it like Google \u2014 type a question, get an answer, done. It works dramatically better when you let it ask YOU a couple of questions back before it opens its mouth. That's the first shift.",
  organized_starter:
    "Your Google Drive, your CRM, your SOPs \u2014 all that order is exactly what AI needs to plug into. The gap isn't organization; it's knowing how to talk to AI so answers come back about your actual business, not generic advice scraped off LinkedIn.",
  curious_tinkerer:
    "Here's what's going on: every chat starts blank, so every answer is generic. Long chats drift. You've felt both 200 times. Two specific moves close most of the gap \u2014 one at the start of a chat, one mid-conversation. Small. Mechanical. Nothing philosophical.",
  ready_builder:
    "You've hit the ceiling where AI talks well but doesn't ship. The fix isn't more tools or better prompts \u2014 it's the input structure you'd give a new hire on day one, plus a habit of making every response end with something you could actually use. Weeks 1\u20133 build that lattice. Weeks 4\u20135 put it to work.",
};

// ── Stakes — one line per archetype, placed right after surfaceParagraph.
// Blunt but not doom-y. Opportunity cost, not fear.

export const TYPE_STAKES: Record<QuizType, string> = {
  blank_slate:
    "Stay on hustle-and-instinct and AI becomes a thing you'll keep saying you should figure out \u2014 for three more years. The gap between what your business could run on and what it actually runs on keeps widening.",
  organized_starter:
    "A tight operation without AI wired in is running at a fraction of what your stack could actually do. The longer you sit on the lever, the more you'll feel the gap when you finally pull it.",
  curious_tinkerer:
    "You'll keep buying $50 courses that start strong and never stick. Another year passes. You still know more about AI than you actually use.",
  ready_builder:
    "The ceiling is real and it compounds. Another six months of AI-that-drafts-but-doesn't-ship is six more months where your output is capped by your own hours.",
};

// ── Proof — honest early-access framing, one line per archetype.
// No invented numbers or testimonials. Authentic beats fake.

export const TYPE_PROOF: Record<QuizType, string> = {
  blank_slate:
    "Early-access cohort \u2014 the first Blank Slates through Phase I are helping shape what it looks like for people in your spot. Small group, direct access.",
  organized_starter:
    "Early-access \u2014 the first operators with your kind of structure are through Phase I now. Their feedback is shaping what Phase II becomes.",
  curious_tinkerer:
    "Early-access \u2014 Phase I is being refined with the first cohort right now. If you want input on how it gets built for people like you, this is the window.",
  ready_builder:
    "Early-access \u2014 Ready Builders are the ones pressure-testing Phase I and Phase II right now. You'd be in that group.",
};

// ── Phase I arc — shared across all archetypes. Bolded weeks vary.
// Week titles deliberately plain-English; no framework vocabulary.

export const PHASE1_ARC: Phase1Week[] = [
  {
    num: 1,
    title: "Treat AI like a brain, not a search bar",
    description:
      "How to have real conversations that actually get you useful answers.",
  },
  {
    num: 2,
    title: "Teach AI who you are and what you do",
    description:
      "Give AI the context it needs so answers stop being generic.",
  },
  {
    num: 3,
    title: "Reset a chat when it drifts",
    description:
      "The one-liner that pulls long chats back on track without starting over.",
  },
  {
    num: 4,
    title: "Brief AI before you ask, not after",
    description:
      "Set it up once at the top so every answer is already shaped the way you need.",
  },
  {
    num: 5,
    title: "Turn answers into shippable output",
    description:
      "End every session with something you could actually send, post, or do.",
  },
];

export const TYPE_HIGHLIGHTED_WEEKS: Record<QuizType, number[]> = {
  blank_slate: [1, 2],
  organized_starter: [1, 3, 4],
  curious_tinkerer: [2, 3],
  ready_builder: [4, 5],
};

// ── Legacy insight/action libraries ───────────────────────
// These powered the old "key insights" + "your next moves" blocks.
// The new UI reads surfaceParagraph + stakes + tryThisWeek instead.
// Kept (unused) so a regression can revert cleanly. Safe to delete
// once the new results layout ships to prod.

interface InsightRule {
  condition: (answers: QuizAnswers, scores: QuizScores) => boolean;
  insight: string;
}

interface ActionRule {
  condition: (answers: QuizAnswers, scores: QuizScores, type: QuizType) => boolean;
  action: string;
}

const INSIGHT_LIBRARY: InsightRule[] = [
  {
    condition: (a) =>
      (a.info_storage?.selected ?? []).some((v) => v === "scattered" || v === "dont_know"),
    insight:
      "Your files are scattered — that's costing you hours every week just finding things. One folder restructure (takes 30 minutes) gives AI a single place to pull from and instantly makes every other automation possible.",
  },
  {
    condition: (a) =>
      a.ai_comfort?.selected?.[0] === "overwhelmed",
    insight:
      "You don't need to learn AI. You need one workflow set up for you — today. The gap isn't knowledge, it's setup. Once you see AI draft 10 emails in 2 minutes, the overwhelm disappears.",
  },
  {
    condition: (a) =>
      a.ai_usage?.selected?.[0] === "occasionally" ||
      a.ai_usage?.selected?.[0] === "regularly",
    insight:
      "You're using AI like a search engine — one question at a time. The immediate ROI jump: connect it to your email or calendar so it works in the background while you do other things. That's a same-day upgrade.",
  },
  {
    condition: (a) =>
      (a.ai_goal?.selected?.[0] === "save_time"),
    insight:
      "You have a task right now that takes 20+ minutes daily and could be done by AI in under 60 seconds. Email triage, meeting prep, data entry — pick one and automate it today. That's 7+ hours back this week.",
  },
  {
    condition: (a) =>
      (a.business_tools?.selected ?? []).includes("in_my_head"),
    insight:
      "Everything in your head = zero leverage. Spend 15 minutes today dumping your top 5 recurring tasks into a doc. That list becomes your automation hit list — and the fastest path to getting hours back immediately.",
  },
  {
    condition: (a) =>
      (a.friction?.selected ?? []).includes("everything_manual"),
    insight:
      "Don't try to fix everything. Pick the one task you'll do again tomorrow morning and automate just that. One workflow, set up in an hour, saving you 30+ minutes every single day. Compound that.",
  },
  {
    condition: (a) =>
      (a.friction?.selected ?? []).includes("follow_up"),
    insight:
      "You're losing revenue right now from leads that went cold because you got busy. A 3-email AI follow-up sequence takes 20 minutes to build and can recover 20–30% of dead leads within days — not months.",
  },
  {
    condition: (a) =>
      (a.friction?.selected ?? []).includes("content_creation"),
    insight:
      "5-minute voice memo → AI → a week of social posts, in your voice. Not next month — today. The tools exist right now to turn a single brain dump into 10+ pieces of content in under 15 minutes.",
  },
  {
    condition: (a, s) => s.systemsMaturity >= 4 && s.aiMaturity >= 5,
    insight:
      "You have the tools and the AI experience — you're one automation away from a major unlock. The gap is connecting what you already use. One Zapier/Make workflow linking your CRM to AI can save 5+ hours this week.",
  },
  {
    condition: (a) =>
      a.ai_comfort?.selected?.[0] === "skeptical",
    insight:
      "Fair — most AI hype is noise. Here's what's real: AI can draft your emails, prep your meetings, and follow up with leads while you sleep. Try it on one task for 48 hours. If it doesn't save time, drop it.",
  },
  {
    condition: (a) =>
      a.ai_comfort?.selected?.[0] === "dabbled",
    insight:
      "AI didn't stick because you used it once and moved on. The fix is dead simple: pick one daily task, run it through AI every day this week. By Friday it's a habit. By next Friday it's saving you 5+ hours.",
  },
  {
    condition: (a) =>
      a.primary_role?.selected?.[0] === "everything",
    insight:
      "You're the bottleneck on everything — which means one automation has an outsized impact. Offload your #1 time drain to AI this week and you'll feel the difference in 48 hours.",
  },
  {
    condition: (a) =>
      (a.work_devices?.selected?.[0] === "mobile" || a.work_devices?.selected?.[0] === "mix_mobile"),
    insight:
      "You're on your phone all day — that's actually perfect for AI. Voice-to-text workflows mean you can dictate emails, tasks, and content on the go and have AI format and send them. Set this up in 10 minutes.",
  },
  {
    condition: (a) =>
      (a.friction?.selected ?? []).includes("lead_gen"),
    insight:
      "AI can research 50 prospects, write personalized outreach for each, and have them ready in your inbox — before your first coffee. That's not a future promise, that's a workflow you can build this afternoon.",
  },
  {
    condition: (a) =>
      (a.friction?.selected ?? []).includes("email_admin"),
    insight:
      "You're spending 2+ hours a day on email. AI can triage your inbox, draft replies, and flag what actually needs you — cutting that to 30 minutes. This is a same-day setup with immediate payoff.",
  },
  {
    condition: (a) =>
      a.ai_goal?.selected?.[0] === "free_time_personal",
    insight:
      "Every hour AI saves you is an hour back with your family or on yourself. The fastest win: automate your end-of-day admin so you close your laptop 45 minutes earlier — starting tonight.",
  },
  {
    condition: (a) =>
      a.ai_goal?.selected?.[0] === "new_opportunities",
    insight:
      "AI can scan your industry, competitors, and customer patterns in minutes — surfacing opportunities you haven't had time to notice. One 15-minute research prompt can reveal your next revenue stream.",
  },
  {
    condition: (a) =>
      a.ai_goal?.selected?.[0] === "highest_best_use",
    insight:
      "Right now, at least 60% of your week is tasks someone — or something — else could handle. Identify the top 3, hand them to AI this week, and you're instantly operating at a higher level.",
  },
  {
    condition: (a) =>
      (a.ai_use_cases?.selected ?? []).includes("vibe_coding"),
    insight:
      "You've already built with AI — that puts you ahead of 95% of business owners. Now apply that same approach to your operations. If you can vibe code an app in a weekend, you can automate your whole client intake by Friday.",
  },
];

const ACTION_LIBRARY: ActionRule[] = [
  // Blank Slate actions
  {
    condition: (a, _s, type) => type === "blank_slate",
    action:
      "Today: create one Google Drive folder called 'Business Hub.' Move your 10 most-used files into it. That's it. You just built the foundation for every AI workflow that comes next.",
  },
  {
    condition: (a, _s, type) =>
      type === "blank_slate" || a.ai_usage?.selected?.[0] === "never",
    action:
      "Right now: open Claude or ChatGPT, paste your last 3 sent emails, and ask 'rewrite these to be clearer and more professional.' You'll see the value in 60 seconds flat.",
  },
  // Organized Starter actions
  {
    condition: (a, _s, type) => type === "organized_starter",
    action:
      "This afternoon: pick your most-used tool (CRM, calendar, whatever) and search '[tool name] + Zapier AI.' You'll find a ready-made automation you can activate in 15 minutes that saves hours every week.",
  },
  {
    condition: (a, _s, type) =>
      type === "organized_starter" &&
      (a.friction?.selected ?? []).includes("email_admin"),
    action:
      "Today: forward your 5 most common email types to Claude, ask it to create response templates for each. Save them as drafts. You just cut your email time in half starting tomorrow morning.",
  },
  // Curious Tinkerer actions
  {
    condition: (a, _s, type) => type === "curious_tinkerer",
    action:
      "Grab a timer. Track every task you do tomorrow. At the end of the day, circle anything that took 10+ minutes and didn't require your personal judgment. That's your automation hit list — pick the top one and let's build it.",
  },
  {
    condition: (a, _s, type) => type === "curious_tinkerer",
    action:
      "Stop chatting with AI — start connecting it. Today: link your Gmail or Outlook to an AI tool (Claude, Zapier, or Make). Have it auto-draft replies to common email types. You'll save 30+ minutes by end of day.",
  },
  // Ready Builder actions
  {
    condition: (a, _s, type) => type === "ready_builder",
    action:
      "Pick the one workflow that costs you the most time this week. Map it: trigger → steps → output. Build it as an automation today — not a prototype, the real thing. You have the skills; stop planning and ship it.",
  },
  {
    condition: (a, _s, type) => type === "ready_builder",
    action:
      "Build one AI agent this week for a single function — lead follow-up, meeting prep, or content drafting. Give it a narrow job, real data, and let it run. One focused agent beats ten half-built experiments.",
  },
  // Friction-specific actions
  {
    condition: (a) => (a.friction?.selected ?? []).includes("follow_up"),
    action:
      "Today: write a 3-email follow-up sequence (initial check-in, value add, last chance). Feed them to an AI tool, set a trigger for 'no reply in 48 hours.' This recovers dead leads starting this week.",
  },
  {
    condition: (a) => (a.friction?.selected ?? []).includes("content_creation"),
    action:
      "Tomorrow morning: record a 5-minute voice memo about something you know well. Paste the transcript into Claude with 'turn this into 3 social posts, 1 email, and 1 blog intro.' You'll have a week of content in 15 minutes.",
  },
  {
    condition: (a) => (a.friction?.selected ?? []).includes("scheduling"),
    action:
      "30-minute setup, right now: connect Calendly (free) to your calendar and set your availability rules. Add an AI scheduling link to your email signature. You'll never play the 'when works for you?' game again.",
  },
  {
    condition: (a) => (a.friction?.selected ?? []).includes("task_management"),
    action:
      "Today: start texting or voice-noting your tasks to an AI assistant (Claude, ChatGPT, or a Siri shortcut). At end of day, ask it to organize and prioritize them. Instant clarity, zero friction.",
  },
  {
    condition: (a) =>
      a.ai_goal?.selected?.[0] === "build_systems",
    action:
      "15 minutes, right now: pick your most repeated process and write it out step-by-step in plain English. That document is the exact instruction set an AI agent needs to run it for you. Step 2: let's build it together.",
  },
  {
    condition: (a) =>
      a.ai_goal?.selected?.[0] === "look_professional",
    action:
      "Today: take your last proposal or client email, paste it into Claude with 'make this look like it came from a top-tier firm.' Save the output as a template. Instant polish, zero design skills needed.",
  },
  {
    condition: (a) =>
      a.ai_goal?.selected?.[0] === "free_time_personal",
    action:
      "Tonight: list the 3 tasks that kept you working past when you wanted to stop today. Those are your AI targets. Automate just one this week — you'll close your laptop 30–45 minutes earlier every day.",
  },
  {
    condition: (a) =>
      a.ai_goal?.selected?.[0] === "new_opportunities",
    action:
      "Right now: ask Claude 'Given a [your business type] serving [your customers], what are 5 adjacent services or revenue streams I could offer with minimal overhead?' You'll have new ideas in 2 minutes.",
  },
  {
    condition: (a) =>
      a.ai_goal?.selected?.[0] === "highest_best_use",
    action:
      "Tomorrow: for every task you do, ask yourself 'does this require MY brain, MY relationships, or MY judgment?' If no — flag it. By end of week, hand the top 3 flagged tasks to AI. You just promoted yourself.",
  },
];

function selectInsights(answers: QuizAnswers, scores: QuizScores): [string, string] {
  const matching = INSIGHT_LIBRARY.filter((rule) => rule.condition(answers, scores));
  if (matching.length >= 2) return [matching[0].insight, matching[1].insight];
  if (matching.length === 1) {
    return [
      matching[0].insight,
      "Businesses your size are losing 5–10 hours per week on tasks AI can handle right now — not with some future tool, but with what's available today. That's time and money sitting on the table.",
    ];
  }
  return [
    "You have at least one task you'll repeat tomorrow that AI could do in under a minute. Finding it is the unlock — and it's faster than you think.",
    "Businesses your size are losing 5–10 hours per week on tasks AI can handle right now. That's time and money sitting on the table, starting today.",
  ];
}

function selectActions(
  answers: QuizAnswers,
  scores: QuizScores,
  type: QuizType
): [string, string] {
  const matching = ACTION_LIBRARY.filter((rule) => rule.condition(answers, scores, type));
  if (matching.length >= 2) return [matching[0].action, matching[1].action];
  if (matching.length === 1) {
    return [
      matching[0].action,
      "Book a 15-minute intro call this week. Come with your #1 time drain — we'll map the automation live on the call so you leave with a concrete plan, not a pitch.",
    ];
  }
  return [
    "Right now: open Claude or ChatGPT and paste in the last repetitive task you did. Ask it to do the task for you. That's your proof of concept — in 2 minutes.",
    "Book a 15-minute intro call this week. Come with your #1 time drain — we'll map the automation live on the call so you leave with a concrete plan, not a pitch.",
  ];
}

// ── "Two things to try before Week 1" ──────────────────────
// Replaces the old generic insights/actions for the UI. Each archetype
// gets a default pair that previews a session build without teaching it.
// Friction/goal can swap one item for a more specific variant.
//
// IMPORTANT: Ready Builder's default #1 was rewritten to avoid
// pre-teaching Session 4 (the role/rules/format template). It now asks
// for a messy paragraph — the learner feels the need without building
// the artifact.

const TRY_THIS_WEEK_DEFAULTS: Record<QuizType, [string, string]> = {
  blank_slate: [
    "Pick one real decision you're mulling today. Type it to ChatGPT with: \u201cAsk me three questions before you answer.\u201d Notice what changes.",
    "Write five bullets about your business \u2014 what you do, who for, how you talk, what you're working toward, what makes you different. Save them. You'll use this again.",
  ],
  organized_starter: [
    "Run one real decision through AI as a 10-minute back-and-forth \u2014 let it ask you three questions first. Notice how the answer changes when it actually knows the situation.",
    "Write a 30-second version of your business: what you do, who you serve, how you talk, what makes you different, what you're chasing this quarter. Paste it above your next real chat. Watch generic become specific.",
  ],
  curious_tinkerer: [
    "Write five bullets about your business and paste them at the top of your next real chat. Watch the answers stop being generic.",
    "Next time a long chat starts drifting, stop and type: \u201cQuick reset. Here's the goal: ___. Here's what we've locked in: ___. Here's what I need next: ___.\u201d Costs nothing. Works every time.",
  ],
  ready_builder: [
    "Take your most-used AI prompt today. Write one messy paragraph on who AI should be acting as, what it should push back on, and what shape you want the answer in. Don't polish it \u2014 you'll refine it later.",
    "Add one line to the end of your next real chat: \u201cEnd every substantive response with (1) what I should do right now, (2) what's blocking me, (3) one thing I could ship today.\u201d Watch AI stop being a commentator.",
  ],
};

// Overrides keyed on friction/goal — these replace the SECOND item only,
// so each archetype's identity-building #1 (context / reset / briefing)
// stays intact.
function tryThisWeekOverride(
  answers: QuizAnswers,
  type: QuizType
): string | null {
  const friction = answers.friction?.selected ?? [];
  const goal = answers.ai_goal?.selected?.[0];

  // Friction-specific (apply to any archetype)
  if (friction.includes("email_admin")) {
    return "Paste your last three sent emails into Claude or ChatGPT and ask: \u201crewrite these to be clearer and a bit shorter.\u201d Compare. You'll feel the upgrade in 60 seconds.";
  }
  if (friction.includes("content_creation")) {
    return "Record a 5-minute voice memo about something you know well. Paste the transcript into AI with: \u201cturn this into 3 social posts and one short email, in my voice.\u201d Notice which outputs sound like you \u2014 that's your starting prompt.";
  }
  if (friction.includes("follow_up")) {
    return "Open one lead that went cold this month. Ask AI: \u201cdraft a 2-line check-in that doesn't sound like a salesperson.\u201d Send it. See what comes back.";
  }

  // Goal-specific
  if (goal === "free_time_personal") {
    return "List the three tasks that kept you working past when you wanted to stop today. Pick the one with no judgment involved. Ask AI to do it for you tomorrow. Log the time saved.";
  }
  if (goal === "highest_best_use" && type === "ready_builder") {
    return "Next to every task on your calendar this week, jot one letter: B (your brain), R (relationships), J (judgment), or \u2014 (none of those). Hand the \u2014 pile to AI and see what comes back.";
  }

  return null;
}

function selectTryThisWeek(
  answers: QuizAnswers,
  type: QuizType
): [string, string] {
  const defaults = TRY_THIS_WEEK_DEFAULTS[type];
  const override = tryThisWeekOverride(answers, type);
  if (override) {
    return [defaults[0], override];
  }
  return defaults;
}

// ── Main Scoring Function ──────────────────────────────────

export function calculateResults(answers: QuizAnswers): QuizResult {
  const aiMaturity = scoreAIMaturity(answers);
  const systemsMaturity = scoreSystemsMaturity(answers);
  const type = determineType(aiMaturity, systemsMaturity);
  const info = TYPE_INFO[type];
  const scores: QuizScores = {
    aiMaturity,
    aiMaturityMax: 11,
    systemsMaturity,
    systemsMaturityMax: 7,
  };

  const surfaceParagraph = TYPE_SURFACE_PARAGRAPH[type];
  const stakes = TYPE_STAKES[type];
  const proof = TYPE_PROOF[type];
  const highlightedWeeks = TYPE_HIGHLIGHTED_WEEKS[type];
  const tryThisWeek = selectTryThisWeek(answers, type);

  return {
    scores,
    type,
    typeLabel: info.label,
    typeDescription: info.description,
    surfaceParagraph,
    stakes,
    proof,
    phase1Arc: PHASE1_ARC,
    highlightedWeeks,
    tryThisWeek,
    // Back-compat for the Google Apps Script webhook: mirror the new
    // fields into the old shape so Brad's sheet keeps getting what
    // it expects, now with richer content.
    insights: [surfaceParagraph, stakes],
    actions: tryThisWeek,
  };
}
