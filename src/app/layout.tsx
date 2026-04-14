import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Brad Roemer — AI Consultant for Small Businesses | San Diego",
  description:
    "I help small businesses implement practical AI systems that save time and increase revenue. Strategy sessions, system setup, and ongoing advisory. Based in San Diego.",
  openGraph: {
    title: "Brad Roemer — AI Consultant for Small Businesses",
    description:
      "I help small businesses implement practical AI systems that save time and increase revenue. Strategy sessions, system setup, and ongoing advisory.",
    url: "https://bradroemer.com",
    siteName: "Brad Roemer AI Consulting",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brad Roemer — AI Consultant for Small Businesses",
    description:
      "I help small businesses implement practical AI systems that save time and increase revenue.",
  },
  metadataBase: new URL("https://bradroemer.com"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Brad Roemer AI Consulting",
  description: "AI consulting for small businesses",
  url: "https://bradroemer.com",
  telephone: "",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Diego",
    addressRegion: "CA",
    addressCountry: "US",
  },
  priceRange: "$750 - $5000",
  serviceType: "AI Consulting",
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
