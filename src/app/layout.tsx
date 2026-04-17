import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Matches globals.css --bg-primary so mobile browser chrome (iOS Safari
// address bar, Android Chrome status bar) blends into the site background.
export const viewport: Viewport = {
  themeColor: "#0C0C0C",
  colorScheme: "dark",
};

// Only ship the weights actually used in the app: regular body text (400),
// font-semibold (600), and font-bold (700). This trims ~6 weight files per
// font vs. Next's default "variable" fallback behavior.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "0to1.AI — AI guidance for real business owners",
  description:
    "Personal AI guidance for solo operators and freelancers. Learn AI with a guide, not a guru. Weekly curated drops, monthly strategy calls, async support. $295/mo, cancel anytime.",
  openGraph: {
    title: "0to1.AI — Learn AI with a guide, not a guru",
    description:
      "Personal AI guidance for solo operators and freelancers. Weekly curated drops, monthly strategy calls, async support. Founded by Brad Roemer.",
    url: "https://get0to1.ai",
    siteName: "0to1.AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "0to1.AI — Learn AI with a guide, not a guru",
    description:
      "Personal AI guidance for solo operators and freelancers. $295/mo, cancel anytime.",
  },
  metadataBase: new URL("https://get0to1.ai"),
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "0to1.AI",
  description:
    "Personal AI guidance program for solo operators and freelancers. Weekly curated drops, monthly strategy calls, async support.",
  url: "https://get0to1.ai",
  provider: {
    "@type": "Person",
    name: "Brad Roemer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Diego",
      addressRegion: "CA",
      addressCountry: "US",
    },
  },
  areaServed: "Worldwide",
  serviceType: "AI Guidance",
  offers: {
    "@type": "Offer",
    price: "295",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "295",
      priceCurrency: "USD",
      referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitCode: "MON" },
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
