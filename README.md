# Vibe Coding Journey (Duolingo-style)

Mobile-first web app that gamifies learning vibe coding with a path of challenges. Built with Next.js + TypeScript, deployable to Vercel, using Supabase for challenge data.

## Quickstart

- Install pnpm: `npm i -g pnpm`
- Install deps: `pnpm install`
- Configure env in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

- Run dev server: `pnpm dev`

## Supabase

Create table `challenges`:

```sql
create table if not exists public.challenges (
  id bigserial primary key,
  title text not null,
  description text not null,
  goals text[] not null default '{}',
  "order" int not null,
  icon text,
  points int not null default 10
);
```

Insert a few rows so the path renders.

## Deploy (Vercel)

- Import the repo in Vercel
- Set environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Build command: `pnpm build`; Output directory: `.next`

## Notes

- Explicit error handling with early returns; no exceptions
- Flat code, small modules for separation of concerns
- Mobile-first UI; components ready for future LLM integrations
