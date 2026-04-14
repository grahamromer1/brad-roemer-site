import BlinkingCursor from "@/components/ui/BlinkingCursor";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6">
      <div className="max-w-3xl w-full">
        {/* Terminal window wrapper */}
        <div className="rounded-lg border border-border-terminal bg-bg-surface/50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border-terminal">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" aria-hidden="true" />
          </div>

          <div className="p-6 sm:p-10 md:p-14">
            <p className="font-mono text-text-dim text-sm md:text-base mb-6">
              <span className="text-accent-green">~/brad $</span> whoami
            </p>

            <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-2">
              Brad Roemer
            </h1>

            <p className="font-mono text-accent-green text-lg md:text-xl mb-8">
              AI Consultant
            </p>

            <div className="mb-10">
              <p className="font-sans text-lg sm:text-xl md:text-2xl text-text-primary leading-relaxed">
                <span className="typing-effect inline-block">
                  I help small businesses implement AI systems that actually get used.
                </span>
                <BlinkingCursor />
              </p>
            </div>

            <Button href="#book" aria-label="Book a strategy session">
              Book a Strategy Session <span aria-hidden="true">&rarr;</span>
            </Button>
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
