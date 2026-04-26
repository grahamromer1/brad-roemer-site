import BlinkingCursor from "@/components/ui/BlinkingCursor";
import { TrackedQuizCtaButton } from "@/components/analytics/TrackedQuizCta";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 pt-28 sm:pt-32 md:pt-36 pb-12"
    >
      <div className="max-w-3xl w-full">
        {/* Terminal window wrapper */}
        <div className="rounded-lg border border-border-terminal bg-bg-surface/50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border-terminal">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" aria-hidden="true" />
          </div>

          <div className="p-6 sm:p-10 md:p-14">
            <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-2">
              <span className="block">AI-curious to</span>
              <span className="block">AI-fluent.</span>
            </h1>

            <p className="font-mono text-accent-green text-lg md:text-xl mb-8">
              <span className="typing-effect inline-block">
                Learn AI with a guide, not a guru.
              </span>
              <BlinkingCursor />
            </p>

            <div className="mb-10">
              <p className="font-sans text-lg sm:text-xl md:text-2xl text-text-primary leading-relaxed mb-5">
                You&apos;ve decided AI is no longer optional for your
                business. You just need someone to teach you to actually
                install it.
              </p>
              <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed">
                0to1.AI is a personalized program that builds the AI layer
                of your business and your life. You&apos;ll build a real
                foundation and the working knowledge to ship workflows,
                agents, and solutions &mdash; with a coach and a system
                that delivers.
              </p>
              <p className="font-sans text-text-secondary text-sm md:text-base mt-4 leading-relaxed">
                Built by a self-taught operator who figured it out the hard way.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <TrackedQuizCtaButton location="hero">
                Take the Free Quiz <span aria-hidden="true">&rarr;</span>
              </TrackedQuizCtaButton>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center mt-12">
          <p className="font-mono text-text-dim text-sm mb-2">// scroll to explore</p>
          <span className="scroll-bounce inline-block text-text-dim" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 4v12M4 12l6 6 6-6" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
