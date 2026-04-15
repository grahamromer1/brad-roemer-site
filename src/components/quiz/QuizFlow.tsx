"use client";

import { useState, useCallback, useEffect } from "react";
import {
  QUIZ_QUESTIONS,
  calculateResults,
  type QuizAnswers,
  type QuizResult,
} from "@/lib/quizData";
import QuizResults from "./QuizResults";

// Fire-and-forget POST to the quiz submission endpoint.
// Never surfaces errors to the user — logs silently.
function submitQuizData(payload: Record<string, unknown>) {
  try {
    fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.warn("[quiz] submit failed", err);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[quiz] submit threw", err);
  }
}

export default function QuizFlow() {
  const [showIntro, setShowIntro] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [openText, setOpenText] = useState("");
  const [result, setResult] = useState<QuizResult | null>(null);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[currentIndex];
  const currentAnswer = answers[question?.id];
  const selectedValues = currentAnswer?.selected ?? [];

  // Reset open text when changing questions
  useEffect(() => {
    setOpenText(currentAnswer?.openText ?? "");
  }, [currentIndex, currentAnswer?.openText]);

  const updateAnswer = useCallback(
    (questionId: string, selected: string[], openTextVal?: string) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: {
          selected,
          openText: openTextVal ?? prev[questionId]?.openText,
        },
      }));
    },
    []
  );

  const finalize = useCallback(
    (finalAnswers: QuizAnswers) => {
      const computed = calculateResults(finalAnswers);
      setResult(computed);
      submitQuizData({
        firstName,
        lastName,
        email: email || "",
        answers: finalAnswers,
        scores: computed.scores,
        type: computed.type,
        typeLabel: computed.typeLabel,
        insights: computed.insights,
        actions: computed.actions,
        timestamp: new Date().toISOString(),
      });
    },
    [firstName, lastName, email]
  );

  const handleSelect = useCallback(
    (value: string) => {
      if (!question) return;

      if (question.multiSelect) {
        const current = selectedValues;
        let next: string[];
        if (current.includes(value)) {
          next = current.filter((v) => v !== value);
        } else {
          if (question.maxSelections && current.length >= question.maxSelections) {
            return;
          }
          next = [...current, value];
        }
        updateAnswer(question.id, next);
      } else {
        updateAnswer(question.id, [value]);
        setTimeout(() => {
          goNext([value]);
        }, 400);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question, selectedValues, updateAnswer]
  );

  const transition = useCallback(
    (dir: "forward" | "back", callback: () => void) => {
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        callback();
        setAnimating(false);
      }, 200);
    },
    []
  );

  const goNext = useCallback(
    (overrideSelected?: string[]) => {
      const sel = overrideSelected ?? selectedValues;
      if (sel.length === 0 && !openText) return;

      if (openText) {
        updateAnswer(question.id, sel, openText);
      }

      if (currentIndex < totalQuestions - 1) {
        transition("forward", () => setCurrentIndex((i) => i + 1));
      } else {
        const finalAnswers: QuizAnswers = {
          ...answers,
          [question.id]: { selected: sel, openText: openText || undefined },
        };
        finalize(finalAnswers);
      }
    },
    [
      selectedValues,
      openText,
      currentIndex,
      totalQuestions,
      answers,
      question,
      updateAnswer,
      transition,
      finalize,
    ]
  );

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      transition("back", () => setCurrentIndex((i) => i - 1));
    }
  }, [currentIndex, transition]);

  const handleStartQuiz = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!firstName.trim() || !lastName.trim()) return;
      setShowIntro(false);
    },
    [firstName, lastName]
  );

  // ── Results Screen ──
  if (result) {
    return (
      <QuizResults
        result={result}
        firstName={firstName}
        lastName={lastName}
        email={email}
        answers={answers}
      />
    );
  }

  // ── Intro / Name Capture Screen ──
  if (showIntro) {
    const canStart = firstName.trim().length > 0 && lastName.trim().length > 0;
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-border-terminal">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <a href="/" className="font-mono text-sm" aria-label="Back to site">
              <span className="text-accent-green">~/</span>
              <span className="text-text-primary">0to1</span>
            </a>
            <span className="font-mono text-xs text-text-dim">
              AI readiness quiz
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
                // ~/0to1 $ ./start-quiz
              </p>
              <h1 className="font-mono text-2xl md:text-3xl text-text-primary font-bold">
                Let&apos;s get started
              </h1>
              <p className="font-sans text-text-secondary text-sm md:text-base leading-relaxed">
                Five minutes. Thirteen questions. You&apos;ll walk away with a
                snapshot of where you stand and two high-leverage actions for this
                week.
              </p>
            </div>

            <form
              onSubmit={handleStartQuiz}
              className="rounded-lg border border-border-terminal bg-bg-surface p-6 space-y-4"
            >
              <div>
                <label
                  htmlFor="first-name"
                  className="block font-mono text-sm text-text-secondary mb-1"
                >
                  <span className="text-accent-cyan">first name:</span>
                </label>
                <input
                  id="first-name"
                  type="text"
                  required
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-bg-primary border border-border-terminal rounded px-3 py-2 font-mono text-text-primary focus:border-accent-green outline-none"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block font-mono text-sm text-text-secondary mb-1"
                >
                  <span className="text-accent-cyan">last name:</span>
                </label>
                <input
                  id="last-name"
                  type="text"
                  required
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-bg-primary border border-border-terminal rounded px-3 py-2 font-mono text-text-primary focus:border-accent-green outline-none"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="intro-email"
                  className="block font-mono text-sm text-text-secondary mb-1"
                >
                  <span className="text-accent-cyan">email:</span>{" "}
                  <span className="text-text-dim">(optional)</span>
                </label>
                <input
                  id="intro-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg-primary border border-border-terminal rounded px-3 py-2 font-mono text-text-primary focus:border-accent-green outline-none"
                  placeholder="jane@example.com"
                />
                <p className="font-mono text-[11px] text-text-dim mt-1">
                  // add your email to get your results sent to your inbox
                </p>
              </div>

              <button
                type="submit"
                disabled={!canStart}
                className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                  canStart
                    ? "bg-accent-green text-bg-primary hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                    : "bg-bg-elevated text-text-dim cursor-not-allowed"
                }`}
              >
                Start Quiz &rarr;
              </button>
            </form>

            <p className="font-mono text-xs text-text-dim text-center">
              // we never sell or spam — just one guide, one email, on your terms
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz Question Screen ──
  const progressPct = ((currentIndex + 1) / totalQuestions) * 100;
  const canAdvance = selectedValues.length > 0 || !!openText;

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header with progress */}
      <div className="px-4 sm:px-6 py-4 border-b border-border-terminal">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <a
              href="/"
              className="font-mono text-sm"
              aria-label="Back to site"
            >
              <span className="text-accent-green">~/</span>
              <span className="text-text-primary">0to1</span>
            </a>
            <span className="font-mono text-xs text-text-dim">
              {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1 bg-bg-elevated rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-green rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div
          className={`w-full max-w-2xl transition-all duration-200 ${
            animating
              ? direction === "forward"
                ? "opacity-0 translate-x-8"
                : "opacity-0 -translate-x-8"
              : "opacity-100 translate-x-0"
          }`}
        >
          {/* Section label */}
          <div className="mb-2">
            <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
              {question.section}
            </span>
          </div>

          {/* Question */}
          <h2 className="font-mono text-lg md:text-xl text-text-primary font-bold mb-1">
            {question.question}
          </h2>

          {/* Subtext for multi-select */}
          {question.multiSelect && (
            <p className="font-mono text-xs text-text-dim mb-4">
              {question.maxSelections
                ? `select up to ${question.maxSelections}`
                : "select all that apply"}
            </p>
          )}
          {!question.multiSelect && <div className="mb-4" />}

          {/* Options */}
          <div className="space-y-2">
            {question.options.map((opt) => {
              const isSelected = selectedValues.includes(opt.value);
              const atMax =
                question.multiSelect &&
                question.maxSelections &&
                selectedValues.length >= question.maxSelections &&
                !isSelected;

              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  disabled={!!atMax}
                  className={`w-full text-left px-4 py-3 rounded-lg border font-sans text-sm transition-all duration-150 min-h-[44px] ${
                    isSelected
                      ? "border-accent-green bg-accent-green/10 text-text-primary"
                      : atMax
                      ? "border-border-terminal bg-bg-surface/30 text-text-dim cursor-not-allowed"
                      : "border-border-terminal bg-bg-surface hover:border-text-dim text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {question.multiSelect ? (
                      <span
                        className={`flex-shrink-0 w-4 h-4 rounded border ${
                          isSelected
                            ? "border-accent-green bg-accent-green"
                            : "border-text-dim"
                        } flex items-center justify-center`}
                      >
                        {isSelected && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M2 5L4 7L8 3"
                              stroke="#0C0C0C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                    ) : (
                      <span
                        className={`flex-shrink-0 w-4 h-4 rounded-full border ${
                          isSelected
                            ? "border-accent-green"
                            : "border-text-dim"
                        } flex items-center justify-center`}
                      >
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-accent-green" />
                        )}
                      </span>
                    )}
                    <span>{opt.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Open-ended field — always visible */}
          {question.openFieldLabel && (
            <div className="mt-5 space-y-2">
              <label className="font-mono text-xs text-accent-cyan">
                {question.openFieldLabel}
              </label>
              <textarea
                value={openText}
                onChange={(e) => {
                  setOpenText(e.target.value);
                  updateAnswer(question.id, selectedValues, e.target.value);
                }}
                rows={2}
                className="w-full bg-bg-primary border border-border-terminal rounded px-3 py-2 font-sans text-sm text-text-primary focus:border-accent-green outline-none resize-none"
                placeholder="Type here..."
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={goBack}
              className={`font-mono text-sm text-text-dim hover:text-text-secondary transition-colors ${
                currentIndex === 0 ? "invisible" : ""
              }`}
            >
              &larr; back
            </button>

            {(question.multiSelect || question.openFieldLabel) && (
              <button
                onClick={() => goNext()}
                disabled={!canAdvance}
                className={`font-mono text-sm px-5 py-2 rounded-lg transition-all duration-200 min-h-[44px] ${
                  canAdvance
                    ? "bg-accent-green text-bg-primary hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                    : "bg-bg-elevated text-text-dim cursor-not-allowed"
                }`}
              >
                {currentIndex === totalQuestions - 1 ? "See My Results" : "Next"}{" "}
                &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
