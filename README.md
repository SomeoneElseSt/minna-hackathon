
**Live App**:
```
https://c02c6183ad85.ngrok-free.app
```

# Vibe Coding Journey (Duolingo-style)

Mobile-first web app that gamifies learning vibe coding with a path of challenges. Built with Next.js + TypeScript, deployable to Vercel, using Supabase for challenge data.

## Quickstart

- Install pnpm: `npm i -g pnpm`
- Install deps: `pnpm install`
- Configure env in `.env.local`:

```
SUPABASE_PROJECT_URL=your-url
SUPABASE_ANON_KEY=your-anon-key
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

-- Enable RLS and allow public read and insert (demo)
alter table public.challenges enable row level security;
create policy "challenges_select_public" on public.challenges for select using (true);
create policy "challenges_insert_public_demo" on public.challenges for insert with check (true);
```

Insert a few rows so the path renders.

Or run the seed route locally after creating the table:

```
curl http://localhost:3000/api/seed
```

## Deploy (Vercel)

- Import the repo in Vercel
- Set environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Or use `SUPABASE_PROJECT_URL` and `SUPABASE_ANON_KEY` (preferred)

## AI Chat & Artifact

- Set `OPENAI_API_KEY` in `.env`
- The AI model used is `gpt-4o-mini` (cost-effective)
- Start a challenge: open a challenge detail and click `Start Challenge`
- Chat returns two sections: `<assistant>` and `<artifact>`; the artifact is a complete HTML document, rendered in a sandboxed iframe
- Build command: `pnpm build`; Output directory: `.next`

## Notes

- Explicit error handling with early returns; no exceptions
- Flat code, small modules for separation of concerns
- Mobile-first UI; components ready for future LLM integrations
