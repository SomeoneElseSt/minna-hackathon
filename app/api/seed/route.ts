import { NextRequest } from "next/server";
import { getSupabase } from "../../../lib/supabaseClient";
import { buildSeedChallenges } from "../../../lib/seedChallenges";

export async function GET(_req: NextRequest) {
  const client = getSupabase();
  if (!client) {
    return Response.json({ ok: false, message: "Supabase env missing" }, { status: 400 });
  }

  const seed = buildSeedChallenges().map((c) => ({
    title: c.title,
    description: c.description,
    goals: c.goals,
    order: c.order,
    icon: c.icon,
    points: c.points
  }));

  const { data: existingRows, error: existingError } = await client
    .from("challenges")
    .select("id,order");
  if (existingError) {
    return Response.json({ ok: false, message: "Select failed", detail: existingError.message }, { status: 500 });
  }

  const byOrder = new Map<number, number>();
  (existingRows || []).forEach((r: { id: number; order: number }) => {
    byOrder.set(r.order, r.id);
  });

  let updated = 0;
  let inserted = 0;

  for (const row of seed) {
    const existingId = byOrder.get(row.order);
    if (existingId) {
      const { error: updateError } = await client
        .from("challenges")
        .update({
          title: row.title,
          description: row.description,
          goals: row.goals,
          icon: row.icon,
          points: row.points
        })
        .eq("id", existingId);
      if (updateError) {
        return Response.json(
          { ok: false, message: "Update failed", detail: updateError.message },
          { status: 500 }
        );
      }
      updated += 1;
      continue;
    }

    const { error: insertError } = await client.from("challenges").insert(row);
    if (insertError) {
      return Response.json(
        { ok: false, message: "Insert failed", detail: insertError.message },
        { status: 500 }
      );
    }
    inserted += 1;
  }

  return Response.json({ ok: true, updated, inserted, total: seed.length }, { status: 200 });
}
