import SectionDivider from "@/components/ui/SectionDivider";

export default function Footer() {
  return (
    <footer className="pb-12 pt-4 px-4 sm:px-6">
      <SectionDivider />

      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-text-secondary text-sm mb-1">
          &copy; 2026 0to1.AI. All rights reserved.
        </p>
        <p className="font-mono text-text-dim text-sm mb-6">
          <a href="https://get0to1.ai" className="hover:text-accent-green transition-colors">
            get0to1.ai
          </a>
        </p>

        <div className="flex items-center justify-center gap-6 mb-8">
          <a
            href="https://www.linkedin.com/in/bradroemer/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent-green transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="LinkedIn profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="mailto:bradroemer@gmail.com"
            className="text-text-secondary hover:text-accent-green transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Send email"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 4L12 13 2 4"/>
            </svg>
          </a>
        </div>

        <p className="font-mono text-text-dim text-xs">// end session</p>
      </div>
    </footer>
  );
}
