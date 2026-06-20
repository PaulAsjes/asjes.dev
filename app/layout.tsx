import type { Metadata } from "next";
import "@fontsource/bebas-neue";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: {
    default: "Paul Asjes",
    template: "%s — Paul Asjes",
  },
  description:
    "Developer Experience Engineer, speaker, and writer. Building things with JavaScript.",
  metadataBase: new URL("https://asjes.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asjes.dev",
    siteName: "Paul Asjes",
    images: [{ url: "/android-chrome-256x256.png" }],
  },
  twitter: {
    card: "summary",
    creator: "@paul_asjes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-black text-white antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border py-8 text-center text-sm text-muted">
          <p>
            &copy; {new Date().getFullYear()} Paul Asjes &mdash;{" "}
            <a
              href="mailto:hello@asjes.dev"
              className="text-muted transition-colors hover:text-red"
            >
              hello@asjes.dev
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
