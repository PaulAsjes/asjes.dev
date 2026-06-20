import type { Metadata } from "next";
import { talks } from "@/data/talks";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Talks",
  description:
    "Conference talks and presentations on JavaScript, payments, and developer experience.",
};

export default function TalksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
      <h1 className="font-heading mb-6 text-6xl tracking-widest text-white sm:text-8xl">
        TALKS
      </h1>
      <p className="font-body mb-16 max-w-lg text-sm leading-relaxed text-off-white">
        Questions about any of the below, or want to suggest a topic?{" "}
        <a
          href="mailto:hello@asjes.dev"
          className="text-red underline underline-offset-4 transition-colors hover:text-white"
        >
          Get in touch.
        </a>
      </p>

      <ul className="space-y-0 divide-y divide-border">
        {talks.map((talk) => (
          <li key={talk.youtubeId} className="py-8">
            <a
              href={`https://www.youtube.com/watch?v=${talk.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-6 sm:flex-row sm:items-start"
            >
              {/* Thumbnail */}
              <div className="relative shrink-0 overflow-hidden border border-border sm:w-64">
                <img
                  src={`https://img.youtube.com/vi/${talk.youtubeId}/mqdefault.jpg`}
                  alt={talk.title}
                  className="aspect-video w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                  width={320}
                  height={180}
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/20">
                  <div className="border-4 border-white/80 bg-red/80 p-2 transition-colors group-hover:bg-red">
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

              {/* Info */}
              <div className="flex flex-col justify-center">
                <span className="font-body mb-2 text-xs tracking-widest text-muted uppercase">
                  {talk.event} &middot;{" "}
                  {format(new Date(talk.date), "MMM yyyy")}
                </span>
                <h2 className="font-heading mb-3 text-2xl tracking-wide text-white transition-colors group-hover:text-red sm:text-3xl">
                  {talk.title.toUpperCase()}
                </h2>
                {talk.description && (
                  <p className="font-body text-sm leading-relaxed text-off-white">
                    {talk.description}
                  </p>
                )}
                <span className="font-body mt-4 text-xs tracking-widest text-red uppercase transition-colors group-hover:text-white">
                  WATCH ON YOUTUBE →
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
