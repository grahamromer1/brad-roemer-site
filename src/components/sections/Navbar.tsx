"use client";

import { useState, useEffect, useCallback } from "react";
import { useScrollSpy } from "@/components/hooks/useScrollSpy";

const NAV_ITEMS: { id: string; label: string; href?: string }[] = [
  { id: "process", label: "how it works" },
  { id: "services", label: "plan" },
  { id: "about", label: "about" },
  { id: "quiz", label: "quiz", href: "/quiz" },
  { id: "book", label: "book" },
  { id: "faq", label: "faq" },
];

const SECTION_IDS = [
  "hero",
  "problems",
  "process",
  "services",
  "about",
  "proof",
  "book",
  "faq",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS, 100);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0C0C0C]/80 backdrop-blur-md border-b border-border-terminal"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        <button
          onClick={() => scrollTo("hero")}
          className="font-mono text-sm md:text-base"
          aria-label="0to1.AI — back to top"
        >
          <span aria-hidden="true">
            <span className="text-accent-green">~/</span>
            <span className="text-text-primary">0to1</span>
            <span className="text-accent-green">.AI</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <a
                key={item.id}
                href={item.href!}
                className={`inline-flex items-center font-mono text-sm leading-none px-3 py-2 rounded transition-colors min-h-[44px] text-accent-amber hover:shadow-[0_0_10px_rgba(251,191,36,0.2)]`}
              >
                <span aria-hidden="true">[</span>
                {item.label}
                <span aria-hidden="true">]</span>
              </a>
            ) : (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-current={activeId === item.id ? "page" : undefined}
                className={`inline-flex items-center font-mono text-sm leading-none px-3 py-2 rounded transition-colors min-h-[44px] ${
                  activeId === item.id
                    ? "text-accent-green"
                    : "text-text-secondary hover:text-text-primary"
                } ${item.id === "book" ? "text-accent-green hover:shadow-[0_0_10px_rgba(74,222,128,0.2)]" : ""}`}
              >
                <span aria-hidden="true">[</span>
                {item.label}
                <span aria-hidden="true">]</span>
              </button>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden bg-[#0C0C0C]/95 backdrop-blur-md border-b border-border-terminal"
        >
          <div className="flex flex-col px-6 py-4 gap-2">
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <a
                  key={item.id}
                  href={item.href!}
                  className="font-mono text-base text-left py-3 min-h-[44px] text-accent-amber"
                >
                  <span aria-hidden="true">[</span>
                  {item.label}
                  <span aria-hidden="true">]</span>
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  aria-current={activeId === item.id ? "page" : undefined}
                  className={`font-mono text-base text-left py-3 min-h-[44px] ${
                    activeId === item.id ? "text-accent-green" : "text-text-secondary"
                  }`}
                >
                  <span aria-hidden="true">[</span>
                  {item.label}
                  <span aria-hidden="true">]</span>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
