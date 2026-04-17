import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import TerminalPrompt from "@/components/ui/TerminalPrompt";
import TerminalWindow from "@/components/ui/TerminalWindow";
import { getAllPosts, formatPostDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — 0to1.AI",
  description:
    "Field notes from a self-taught operator learning AI in public. Mindset shifts, workflows, and what actually works.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — 0to1.AI",
    description:
      "Field notes from a self-taught operator learning AI in public.",
    url: "https://get0to1.ai/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — 0to1.AI",
    description:
      "Field notes from a self-taught operator learning AI in public.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-24">
        <section className="py-20 md:py-28 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <TerminalPrompt command="ls posts/" heading="Blog posts" />

            <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
              Field notes from building an AI practice from scratch. New posts
              every few weeks.
            </p>

            {posts.length === 0 ? (
              <p className="font-mono text-text-dim text-sm">
                // no posts yet — check back soon.
              </p>
            ) : (
              <ul className="space-y-6">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <a
                      href={`/blog/${post.slug}`}
                      className="block group focus:outline-none"
                      aria-label={`Read: ${post.title}`}
                    >
                      <TerminalWindow
                        filename={`${post.slug}.md`}
                        className="transition-colors group-hover:border-accent-green/60 group-focus-visible:border-accent-green"
                      >
                        <p className="font-mono text-xs text-text-dim uppercase tracking-wider mb-2">
                          {formatPostDate(post.date)}
                        </p>
                        <h2 className="font-mono text-xl md:text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-green transition-colors">
                          {post.title}
                        </h2>
                        <p className="font-sans text-text-secondary text-base leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        <p className="font-mono text-sm text-accent-green">
                          read &rarr;
                        </p>
                      </TerminalWindow>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
