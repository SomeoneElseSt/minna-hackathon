We are building “Duolingo for vibe coding” — a mobile-first, gamified learning journey that presents vibe coding challenges along a path with a bottom navigation (Home, Leaderboard, Settings). The target is a fast demo deployable on Vercel, with clean architecture to later plug in LLMs.

Stack and deployment:
- TypeScript with Next.js (mobile-first web app), deployable to Vercel
- `pnpm` for package management
- Supabase for storing challenges (title, description, goals, etc.)
- Clean separation to later integrate LLMs

Frontend scope (demo-ready):
- Home: gamified path view (Duolingo-style) showing challenge nodes connected by a curved path
- Leaderboard: simple ranked list of users by points
- Settings: simple page for profile and preferences
- Bottom navigation bar across pages (Home, Leaderboard, Settings)

Data model (Supabase):
- Table `challenges` with columns: `id`, `title`, `description`, `goals`, `order`, `icon`, `points`
- Read-only for demo; later we add progress tracking and submissions

Coding guidelines acknowledged and enforced:
- Explicit error handling with early returns; no try/catch or throwing
- Flat code with low complexity; separation of concerns via small modules
- Constants for fixed numeric values at file top; English naming
- Mobile-first UI; components isolated for future LLM integration

Next actions:
1) Scaffold Next.js TS app with `pnpm` and minimal dependencies
2) Implement gamified path and bottom navigation
3) Integrate Supabase client and load `challenges` for the journey
4) Add Leaderboard and Settings pages
5) Provide Vercel deployment and `.env` instructions
