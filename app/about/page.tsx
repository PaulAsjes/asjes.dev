import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Developer Experience Engineer at ElevenLabs. Previously Developer Relations at Stripe.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
      <h1 className="font-heading mb-16 text-6xl tracking-widest text-white sm:text-8xl">
        ABOUT
      </h1>

      {/* Bio section */}
      <div className="mb-16 flex flex-col gap-12 sm:flex-row sm:items-start">
        <div className="shrink-0">
          <div className="relative h-48 w-48 sm:h-64 sm:w-64">
            <Image
              src="/about-profile.jpg"
              alt="Paul Asjes"
              fill
              className="object-cover grayscale contrast-125"
              sizes="(max-width: 640px) 192px, 256px"
              priority
            />
            <div className="absolute inset-0 border border-border" />
            {/* Red corner accent */}
            <div className="absolute bottom-0 right-0 h-6 w-6 bg-red" />
          </div>
        </div>

        <div className="max-w-2xl space-y-6">
          <p className="font-body text-sm leading-loose text-off-white">
            Hello, I&apos;m Paul Asjes. I work as a Developer Experience
            Engineer at{" "}
            <a
              href="https://elevenlabs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red underline underline-offset-4 transition-colors hover:text-white"
            >
              ElevenLabs
            </a>
            . I focus on raising awareness, being the voice of the developer,
            and giving internal teams what they need to build great products.
          </p>
          <p className="font-body text-sm leading-loose text-off-white">
            Prior to ElevenLabs I ran Developer Relations at{" "}
            <a
              href="https://stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red underline underline-offset-4 transition-colors hover:text-white"
            >
              Stripe
            </a>
            . Before that I was a product engineer for 10+ years, working at
            Tumblr and various startups over the years. I started my career as a
            Flash developer back in the stone age of the internet, now preferring
            to work in the JavaScript ecosystem.
          </p>
        </div>
      </div>

      {/* Contact */}
      <section>
        <h2 className="font-heading mb-3 text-4xl tracking-widest text-white sm:text-5xl">
          CONTACT
        </h2>
        <div className="mb-8 border-b border-border" />
        <p className="font-body max-w-xl text-sm leading-loose text-off-white">
          The best way to reach me is via{" "}
          <a
            href="https://twitter.com/paul_asjes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red underline underline-offset-4 transition-colors hover:text-white"
          >
            Twitter / X
          </a>{" "}
          or{" "}
          <a
            href="mailto:hello@asjes.dev"
            className="text-red underline underline-offset-4 transition-colors hover:text-white"
          >
            email
          </a>
          . If inquiring about speaking at a conference, please include the
          dates, location, type of conference, and talk type in your message.
        </p>
      </section>


    </div>
  );
}
