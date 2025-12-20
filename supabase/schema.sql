-- Challenges table
create table if not exists public.challenges (
  id bigserial primary key,
  title text not null,
  description text not null,
  goals text[] not null default '{}',
  "order" int not null,
  icon text,
  points int not null default 10
);

alter table public.challenges enable row level security;

create policy "challenges_select_public"
  on public.challenges
  for select
  using (true);

create policy "challenges_insert_public_demo"
  on public.challenges
  for insert
  with check (true);
