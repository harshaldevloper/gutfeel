# GutVista — Eat Confidently

AI-Powered Low FODMAP Meal Planner for people with IBS. Built on the Monash University protocol.

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [Cloudflare Pages](https://pages.cloudflare.com) for hosting
- TypeScript
- Tailwind CSS
- Supabase for backend
- Dodo for payments
- Monash University FODMAP protocol for food data

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can edit the app by modifying files in the `app/` and `src/` directories. The page auto-updates as you edit.

## Learn More

To learn more about Next.js, take a look at the [Next.js Documentation](https://nextjs.org/docs).

## Deploy

This app is deployed via Cloudflare Pages. To deploy locally:

```bash
npm run build && npx wrangler pages deploy .vercel/output/static
```