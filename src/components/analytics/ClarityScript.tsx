"use client";

import Script from "next/script";

// Microsoft Clarity — heatmaps + session replay.
// Project ID lives in NEXT_PUBLIC_CLARITY_PROJECT_ID; we no-op in dev / when
// the var is missing so local sessions don't pollute the Clarity dashboard.
// `afterInteractive` runs the snippet once the page is interactive but before
// idle — same timing Microsoft's docs recommend for third-party analytics.
export default function ClarityScript() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  if (!projectId) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  );
}
