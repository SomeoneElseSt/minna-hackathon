import type { Challenge } from "./types";
import { getSupabase } from "./supabaseClient";

export async function fetchChallenges(): Promise<Challenge[]> {
  const client = getSupabase();
  if (!client) {
    return [];
  }
  const { data } = await client
    .from("challenges")
    .select("id,title,description,goals,order,icon,points")
    .order("order", { ascending: true });
  if (!data) {
    return [];
  }
  return (data as Record<string, unknown>[])
    .map((row) => ({
      id: row.id as number,
      title: row.title as string,
      description: row.description as string,
      goals: Array.isArray(row.goals) ? (row.goals as string[]) : [],
      order: row.order as number,
      icon: (row.icon as string) ?? null,
      points: (row.points as number) ?? 0
    }));
}
