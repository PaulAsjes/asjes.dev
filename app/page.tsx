import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { talks } from "@/data/talks";
import { format } from "date-fns";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 4);
  const recentTalks = talks.slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-20 sm:flex-row sm:items-center sm:px-8 sm:py-28">
          {/* Text */}
          <div className="flex-1">
            <p className="font-body mb-4 text-xs tracking-[0.3em] text-red uppercase">
              Developer Experience Engineer
            </p>
            <h1 className="font-heading mb-6 text-[5rem] leading-none tracking-wider text-white sm:text-[8rem] lg:text-[10rem]">
              PAUL
              <br />
              ASJES
            </h1>
            <div className="mb-8 h-0.5 w-24 bg-red" />
            <p className="font-body max-w-sm text-sm leading-loose text-off-white">
              Building developer tools, giving talks, writing about the web.
              Currently at{" "}
              <a
                href="https://elevenlabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red underline-offset-4 hover:underline"
              >
                ElevenLabs
              </a>
              .
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/blog"
                className="font-heading border border-red px-6 py-2 text-lg tracking-widest text-red transition-colors hover:bg-red hover:text-black"
              >
                BLOG
              </Link>
              <Link
                href="/about"
                className="font-heading border border-border px-6 py-2 text-lg tracking-widest text-off-white transition-colors hover:border-white hover:text-white"
              >
                ABOUT
              </Link>
            </div>
          </div>

          {/* Profile image */}
          <div className="relative shrink-0 self-start sm:self-auto">
            <div className="relative h-56 w-56 sm:h-72 sm:w-72">
              <Image
                src="/profile.png"
                alt="Paul Asjes"
                fill
                className="object-cover grayscale contrast-125"
                sizes="(max-width: 640px) 224px, 288px"
                priority
              />
              <div className="absolute -bottom-2 -right-2 h-full w-full border border-red/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
          <div className="mb-10 flex items-baseline justify-between">
            <div>
              <h2 className="font-heading text-4xl tracking-widest text-white sm:text-5xl">
                WRITING
              </h2>
              <div className="mt-1 h-0.5 w-10 bg-red" />
            </div>
            <Link
              href="/blog"
              className="font-body text-xs tracking-widest text-muted uppercase transition-colors hover:text-red"
            >
              ALL POSTS →
            </Link>
          </div>

          <ul className="divide-y divide-border">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <h3 className="font-heading text-xl tracking-wide text-white transition-colors group-hover:text-red sm:text-2xl">
                    {post.title.toUpperCase()}
                  </h3>
                  <span className="font-body shrink-0 text-xs tracking-widest text-muted uppercase">
                    {format(new Date(post.date), "MMM yyyy")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Recent talks */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
          <div className="mb-10 flex items-baseline justify-between">
            <div>
              <h2 className="font-heading text-4xl tracking-widest text-white sm:text-5xl">
                TALKS
              </h2>
              <div className="mt-1 h-0.5 w-10 bg-red" />
            </div>
            <Link
              href="/talks"
              className="font-body text-xs tracking-widest text-muted uppercase transition-colors hover:text-red"
            >
              ALL TALKS →
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {recentTalks.map((talk) => (
              <a
                key={talk.youtubeId}
                href={`https://www.youtube.com/watch?v=${talk.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-border transition-colors hover:border-red"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${talk.youtubeId}/mqdefault.jpg`}
                    alt={talk.title}
                    className="aspect-video w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                    width={320}
                    height={180}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-colors group-hover:bg-black/20">
                    <div className="bg-red/80 p-3 transition-colors group-hover:bg-red">
                      <svg
                        className="h-5 w-5 translate-x-0.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <span className="font-body block text-xs tracking-widest text-muted uppercase">
                    {talk.event} &middot; {format(new Date(talk.date), "yyyy")}
                  </span>
                  <h3 className="font-heading mt-1 text-xl tracking-wide text-white transition-colors group-hover:text-red">
                    {talk.title.toUpperCase()}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
