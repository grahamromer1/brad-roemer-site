import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * Blog post loader. Reads Markdown files from `content/posts/` at build time.
 *
 * To add a new post: drop `{slug}.md` into `content/posts/` with the required
 * frontmatter (title, date, excerpt, slug). No code changes needed — the
 * `/blog` listing, per-post pages, sitemap, and OG cards all pick it up on the
 * next build.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostFrontmatter {
  title: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  excerpt: string;
  slug: string;
}

export interface PostSummary extends PostFrontmatter {}

export interface Post extends PostFrontmatter {
  /** Rendered HTML body, ready to drop into dangerouslySetInnerHTML. */
  contentHtml: string;
}

function parseFrontmatter(raw: string, fileName: string): PostFrontmatter {
  const { data } = matter(raw);

  const missing = ["title", "date", "excerpt", "slug"].filter(
    (key) => !(key in data) || data[key] === undefined || data[key] === "",
  );
  if (missing.length > 0) {
    throw new Error(
      `Post "${fileName}" is missing required frontmatter: ${missing.join(", ")}`,
    );
  }

  // `date` may parse as a Date (YYYY-MM-DD without quotes in YAML). Normalize
  // to ISO-ish string so downstream consumers can Intl-format deterministically.
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date);

  return {
    title: String(data.title),
    date,
    excerpt: String(data.excerpt),
    slug: String(data.slug),
  };
}

export function getAllPosts(): PostSummary[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    return parseFrontmatter(raw, file);
  });

  // Newest first.
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  const frontmatter = parseFrontmatter(raw, `${slug}.md`);

  // `data` is used here only to silence unused-destructure warnings downstream.
  void data;

  const processed = await remark().use(html).process(content);
  const contentHtml = String(processed);

  return {
    ...frontmatter,
    contentHtml,
  };
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/**
 * Formats an ISO date string (YYYY-MM-DD) as a human-readable date.
 * Hardcoded en-US so SSG output is deterministic across build machines.
 */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
