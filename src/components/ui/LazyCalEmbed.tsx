"use client";

import { useEffect, useRef, useState } from "react";
import Cal from "@calcom/embed-react";

/**
 * Lazy-mounts the Cal.com embed only once the wrapper enters the viewport.
 * Keeps a same-size skeleton placeholder so there is no CLS and the page's
 * LCP is not dominated by Cal.com's scheduler app.
 */
export default function LazyCalEmbed() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return;
    const node = wrapperRef.current;
    if (!node) return;

    // Fallback: if IntersectionObserver is missing, just mount.
    if (typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldMount(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldMount]);

  return (
    <div
      ref={wrapperRef}
      className="rounded-lg border border-border-terminal overflow-hidden bg-bg-surface"
      style={{ minHeight: "720px" }}
      aria-label="Intro call scheduler"
    >
      {shouldMount ? (
        <Cal
          namespace="intro-inline"
          calLink="bradroemer/intro"
          config={{
            theme: "dark",
            layout: "month_view",
            hideEventTypeDetails: "false",
          }}
          style={{ width: "100%", minHeight: "720px", overflow: "auto" }}
        />
      ) : (
        <div
          className="w-full flex items-center justify-center"
          style={{ minHeight: "720px" }}
          aria-hidden="true"
        >
          <p className="font-mono text-text-dim text-sm">
            // loading scheduler...
          </p>
        </div>
      )}
    </div>
  );
}
