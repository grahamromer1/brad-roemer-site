import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import TerminalPrompt from "@/components/ui/TerminalPrompt";
import PostBody from "@/components/blog/PostBody";
import {
  formatPostDate,
  getAllPostSlugs,
  getPostBySlug,
} from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `https://get0to1.ai/blog/${post.slug}`;
  return {
    title: `${post.title} — 0to1.AI`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: "Brad Roemer" },
    publisher: { "@type": "Organization", name: "0to1.AI" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://get0to1.ai/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        <article className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <TerminalPrompt
              command={`cat ${post.slug}.md`}
              heading={post.title}
            />

            <header className="mb-10">
              <p className="font-mono text-xs text-text-dim uppercase tracking-wider mb-3">
                {formatPostDate(post.date)}
              </p>
              <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight">
                {post.title}
              </h1>
            </header>

            <PostBody html={post.contentHtml} />

            <div className="mt-16 pt-8 border-t border-border-terminal">
              <a
                href="/blog"
                className="font-mono text-sm text-accent-green hover:underline"
              >
                &larr; back to all posts
              </a>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
