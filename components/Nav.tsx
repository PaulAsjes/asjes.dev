"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/talks", label: "Talks" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-black">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-8">
        <Link
          href="/"
          className="font-heading text-2xl tracking-widest text-white transition-colors hover:text-red sm:text-3xl"
        >
          PAUL ASJES
        </Link>
        <ul className="flex items-center gap-5 sm:gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-heading text-lg tracking-widest transition-colors sm:text-xl ${
                  pathname.startsWith(href)
                    ? "text-red"
                    : "text-off-white hover:text-red"
                }`}
              >
                {label.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
