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
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          {/* Name — owns the top */}
          <div className="pb-6 pt-10 sm:pt-14">
            <p className="font-body mb-5 text-xs tracking-[0.3em] text-red uppercase">
              Developer Experience Engineer
            </p>
            <h1
              className="font-heading leading-[0.88] text-white"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 14rem)",
                letterSpacing: "0.03em",
                textShadow: "2px 2px 0 rgba(204, 0, 0, 0.2)",
              }}
            >
              PAUL
              <br />
              ASJES
            </h1>
          </div>

          {/* The cut */}
          <div className="h-[2px] w-full bg-red" />

          {/* Below the cut: bio left, portrait right */}
          <div className="flex items-end justify-between gap-8 py-10">
            <div>
              <p className="font-body mb-6 max-w-xs text-sm leading-loose text-off-white sm:max-w-sm">
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
              <div className="flex gap-3">
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

            {/* Portrait — subordinate, anchored to bottom */}
            <div className="relative hidden shrink-0 sm:block">
              <div
                className="relative h-48 w-36"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 84%, 86% 100%, 0 100%)" }}
              >
                <Image
                  src="/profile.png"
                  alt="Paul Asjes"
                  fill
                  className="object-cover object-top grayscale contrast-[1.4] brightness-75"
                  sizes="144px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
          <div className="mb-8 flex items-center gap-5">
            <h2 className="font-heading shrink-0 text-4xl tracking-widest text-white sm:text-5xl">
              WRITING
            </h2>
            <div className="flex-1 border-t border-border" />
            <Link
              href="/blog"
              className="font-body shrink-0 text-xs tracking-widest text-muted uppercase transition-colors hover:text-red"
            >
              ALL POSTS →
            </Link>
          </div>

          <ul className="divide-y divide-border">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-center justify-between gap-4 border-l-2 border-l-transparent py-4 pl-3 transition-colors hover:border-l-red"
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
          <div className="mb-8 flex items-center gap-5">
            <h2 className="font-heading shrink-0 text-4xl tracking-widest text-white sm:text-5xl">
              TALKS
            </h2>
            <div className="flex-1 border-t border-border" />
            <Link
              href="/talks"
              className="font-body shrink-0 text-xs tracking-widest text-muted uppercase transition-colors hover:text-red"
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
