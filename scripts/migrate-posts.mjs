/**
 * One-time migration: GitHub Issues → MDX files in content/blog/
 *
 * Usage:
 *   GH_TOKEN=your_token node scripts/migrate-posts.mjs
 *
 * Requires GH_TOKEN for higher rate limits (5000 req/hr vs 60).
 * Get one at: https://github.com/settings/tokens (no scopes needed for public repos)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../content/blog");

const GH_USER_REPO = "PaulAsjes/asjes.dev";
const APPROVED_POSTERS = ["PaulAsjes"];
const PUBLISHED_LABEL = "Published";

function slugify(text) {
  return text
    .toString()
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseLinksHeader(header) {
  if (!header) return null;
  const links = {};
  header.split(",").forEach((part) => {
    const match = part.trim().match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match) links[match[2]] = match[1];
  });
  return links;
}

async function fetchAllIssues() {
  const authHeader = process.env.GH_TOKEN
    ? { Authorization: `token ${process.env.GH_TOKEN}` }
    : {};

  const issues = [];
  let url = `https://api.github.com/repos/${GH_USER_REPO}/issues?state=all&labels=${encodeURIComponent(PUBLISHED_LABEL)}&per_page=100&creator=PaulAsjes`;

  while (url) {
    console.log(`Fetching: ${url}`);
    const res = await fetch(url, { headers: authHeader });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`GitHub API error ${res.status}: ${body}`);
    }

    const batch = await res.json();
    for (const issue of batch) {
      if (APPROVED_POSTERS.includes(issue.user.login)) {
        issues.push(issue);
      }
    }

    const links = parseLinksHeader(res.headers.get("Link"));
    url = links?.next ?? null;
  }

  return issues;
}

function issueToMdx(issue) {
  // The issue body starts with YAML frontmatter wrapped in gray-matter format
  const body = issue.body ?? "";

  // Try to extract existing frontmatter
  let frontmatter = {};
  let content = body;

  const fmMatch = body.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (fmMatch) {
    // Parse the existing frontmatter manually
    const fmLines = fmMatch[1].split("\n");
    for (const line of fmLines) {
      const colonIdx = line.indexOf(":");
      if (colonIdx === -1) continue;
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
      frontmatter[key] = value;
    }
    content = fmMatch[2];
  }

  // Determine title and slug
  const title = frontmatter.title ?? issue.title;
  const slug = frontmatter.slug
    ? frontmatter.slug
    : slugify(title);

  // Determine date
  const date = frontmatter.date
    ? new Date(frontmatter.date).toISOString().split("T")[0]
    : new Date(issue.created_at).toISOString().split("T")[0];

  // Extract description
  let description = frontmatter.description ?? "";
  if (!description) {
    // Use first non-empty line of content as description
    const firstLine = content
      .trim()
      .split("\n")
      .find((l) => l.trim() && !l.startsWith("#"));
    description = firstLine
      ? firstLine.replace(/[*_`[\]]/g, "").slice(0, 160).trim()
      : "";
  }

  // Tags
  let tags = [];
  if (frontmatter.tags) {
    tags = frontmatter.tags
      .replace(/[\[\]]/g, "")
      .split(",")
      .map((t) => t.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  // Transform shortcodes that MDX can't parse
  content = content
    // {% youtube <url-or-id> %} → JSX iframe
    .replace(/\{%\s*(?:youtube|video)\s+(.*?)\s*%\}/g, (_, src) => {
      const id = src.startsWith("http")
        ? src.match(/(?:v=|youtu\.be\/)([^&?\s]+)/)?.[1] ?? src
        : src.trim();
      return `<iframe src="https://www.youtube.com/embed/${id}" title="YouTube video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{width:'100%',aspectRatio:'16/9',border:'none',marginBottom:'1rem'}} />`;
    })
    // {% tweet <url-or-id> %} → plain link (Twitter embeds need JS, skip them)
    .replace(/\{%\s*(?:tweet|twitter)\s+(.*?)\s*%\}/g, (_, src) => {
      const url = src.startsWith("http") ? src : `https://twitter.com/i/status/${src.trim()}`;
      return `[View tweet](${url})`;
    });

  // Build new frontmatter
  const fm = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: ${date}`,
    description ? `description: "${description.replace(/"/g, '\\"')}"` : null,
    tags.length > 0 ? `tags: [${tags.join(", ")}]` : null,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  return { slug, mdx: `${fm}\n\n${content.trim()}\n` };
}

async function main() {
  console.log("Fetching issues from GitHub...");
  const issues = await fetchAllIssues();
  console.log(`Found ${issues.length} published issues.\n`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const written = [];
  const skipped = [];

  for (const issue of issues) {
    try {
      const { slug, mdx } = issueToMdx(issue);
      const filename = `${slug}.mdx`;
      const filepath = path.join(OUTPUT_DIR, filename);

      // Don't overwrite existing files unless forced
      if (fs.existsSync(filepath) && !process.argv.includes("--force")) {
        console.log(`  SKIP  ${filename} (already exists, use --force to overwrite)`);
        skipped.push(filename);
        continue;
      }

      fs.writeFileSync(filepath, mdx, "utf-8");
      console.log(`  WRITE ${filename}`);
      written.push(filename);
    } catch (err) {
      console.error(`  ERROR issue #${issue.number} "${issue.title}": ${err.message}`);
    }
  }

  console.log(`\nDone. Written: ${written.length}, Skipped: ${skipped.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
