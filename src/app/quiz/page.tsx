import type { Metadata } from "next";
import QuizFlow from "@/components/quiz/QuizFlow";

export const metadata: Metadata = {
  title: "AI Readiness Quiz — 0to1.AI",
  description:
    "A 5-minute quiz for solo operators and freelancers. See where you stand with AI today and get two high-leverage actions for this week — free, no email required.",
  openGraph: {
    title: "AI Readiness Quiz — 0to1.AI",
    description:
      "See where you stand with AI today and get two high-leverage actions for this week.",
    url: "https://get0to1.ai/quiz",
  },
};

export default function QuizPage() {
  return <QuizFlow />;
}
