# asjes.dev

Source for [asjes.dev](https://asjes.dev).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [MDX](https://mdxjs.com) via `next-mdx-remote` — blog posts live in `content/blog/`
- [rehype-pretty-code](https://rehype-pretty-code.netlify.app) + [Shiki](https://shiki.style) for syntax highlighting (Dracula theme)
- [Vercel](https://vercel.com)

## Development

```bash
pnpm install
pnpm dev
```

## Blog

Posts are MDX files in `content/blog/`. Frontmatter fields:

```yaml
---
title: "Post title"
date: 2025-01-01
description: "Short description"
tags:
  - javascript
  - api-design
---
```
