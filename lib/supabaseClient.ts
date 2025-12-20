import { createClient } from "@supabase/supabase-js";

function normalizeEnv(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  const cleaned = trimmed
    .replace(/^"+|"+$/g, "")
    .replace(/^'+|'+$/g, "")
    .replace(/^`+|`+$/g, "");
  return cleaned.trim();
}

export function getSupabase() {
  const urlRaw = process.env.SUPABASE_PROJECT_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const keyRaw = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const url = normalizeEnv(urlRaw);
  const key = normalizeEnv(keyRaw);
  if (url.length === 0) return null;
  if (key.length === 0) return null;
  return createClient(url, key);
}
