import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function getMDXFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
}

function parsePost(slug: string): PostMeta {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  let tags: string[] = [];
  if (data.tags) {
    tags = Array.isArray(data.tags) ? data.tags : [data.tags];
    tags = tags.map((t) => t.toLowerCase().trim());
  }

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    description: data.description ?? "",
    tags,
    readingTime: rt.text,
  };
}

export function getAllPosts(): PostMeta[] {
  return getMDXFiles()
    .map((filename) => parsePost(filename.replace(/\.mdx$/, "")))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  let tags: string[] = [];
  if (data.tags) {
    tags = Array.isArray(data.tags) ? data.tags : [data.tags];
    tags = tags.map((t) => t.toLowerCase().trim());
  }

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    description: data.description ?? "",
    tags,
    readingTime: rt.text,
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set(posts.flatMap((p) => p.tags));
  return [...tagSet].sort();
}
