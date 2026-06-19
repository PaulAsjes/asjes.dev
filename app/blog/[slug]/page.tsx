import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { getPost, getAllPosts } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: false,
        },
      ],
    ],
  },
} as const;

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
      {/* Back link */}
      <Link
        href="/blog"
        className="font-body mb-12 inline-block text-xs tracking-widest text-muted uppercase transition-colors hover:text-red"
      >
        ← BACK TO BLOG
      </Link>

      {/* Header */}
      <header className="mb-12">
        <h1 className="font-heading mb-4 text-5xl leading-none tracking-wide text-white sm:text-7xl">
          {post.title.toUpperCase()}
        </h1>
        <div className="mb-6 h-0.5 w-16 bg-red" />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <time
            dateTime={post.date}
            className="font-body text-xs tracking-widest text-muted uppercase"
          >
            {format(new Date(post.date), "MMMM d, yyyy")}
          </time>
          <span className="font-body text-xs text-muted">{post.readingTime}</span>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="font-body text-xs tracking-widest text-red uppercase transition-colors hover:text-white"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="prose">
        {/* @ts-expect-error rehype plugin types */}
        <MDXRemote source={post.content} options={mdxOptions} />
      </div>

      {/* Footer nav */}
      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/blog"
          className="font-body text-xs tracking-widest text-muted uppercase transition-colors hover:text-red"
        >
          ← ALL POSTS
        </Link>
      </div>
    </article>
  );
}
