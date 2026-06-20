import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on JavaScript, developer experience, and the web.",
};

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  const posts = tag
    ? allPosts.filter((p) => p.tags.includes(tag.toLowerCase()))
    : allPosts;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
      <h1 className="font-heading mb-12 text-6xl tracking-widest text-white sm:text-8xl">
        BLOG
      </h1>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`border px-3 py-1 font-body text-xs tracking-widest uppercase transition-colors ${
              !tag
                ? "border-red bg-red text-black"
                : "border-border text-muted hover:border-red hover:text-red"
            }`}
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/blog?tag=${t}`}
              className={`border px-3 py-1 font-body text-xs tracking-widest uppercase transition-colors ${
                tag === t
                  ? "border-red bg-red text-black"
                  : "border-border text-muted hover:border-red hover:text-red"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      )}

      {/* Post list */}
      {posts.length === 0 ? (
        <p className="text-muted">No posts found.</p>
      ) : (
        <ul className="space-y-0 divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block border-l-2 border-l-transparent py-8 pl-4 transition-colors hover:border-l-red"
              >
                <div className="mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-body text-xs tracking-widest text-muted uppercase">
                    {format(new Date(post.date), "MMM d, yyyy")}
                  </span>
                  <span className="font-body text-xs text-muted">
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="font-heading mb-2 text-3xl tracking-wide text-white transition-colors group-hover:text-red sm:text-4xl">
                  {post.title.toUpperCase()}
                </h2>
                {post.description && (
                  <p className="font-body text-sm leading-relaxed text-off-white">
                    {post.description}
                  </p>
                )}
                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="font-body text-xs tracking-widest text-red uppercase"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
