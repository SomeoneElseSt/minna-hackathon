import { NextRequest } from "next/server";
import { getSupabase } from "../../../lib/supabaseClient";
import { buildSeedChallenges } from "../../../lib/seedChallenges";

export async function GET(_req: NextRequest) {
  const client = getSupabase();
  if (!client) {
    return Response.json({ ok: false, message: "Supabase env missing" }, { status: 400 });
  }

  const { data: existing } = await client
    .from("challenges")
    .select("id")
    .limit(1);
  if (existing && existing.length > 0) {
    return Response.json({ ok: true, message: "Challenges already exist" }, { status: 200 });
  }

  const seed = buildSeedChallenges().map((c) => ({
    title: c.title,
    description: c.description,
    goals: c.goals,
    order: c.order,
    icon: c.icon,
    points: c.points
  }));

  const { error } = await client.from("challenges").insert(seed);
  if (error) {
    return Response.json({ ok: false, message: "Insert failed", detail: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, count: seed.length }, { status: 200 });
}
