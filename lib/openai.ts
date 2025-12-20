export const OPENAI_MODEL = "gpt-4o-mini";
export const MAX_TOKENS = 4000;

export type AiRequest = {
  prompt: string;
  artifactHtml: string;
  challengeTitle: string;
};

export type AiResponse = {
  assistantMessage: string;
  artifactHtml: string;
};

export function getOpenAiKey(): string {
  const raw = process.env.OPENAI_API_KEY || "";
  const key = raw.trim().replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, "");
  if (key.length === 0) return "";
  return key;
}

export function buildSystemPrompt(purpose?: string): string {
  const p = purpose && purpose.trim().length > 0 ? purpose.trim() : "produce a complete, self-contained HTML artifact for the current challenge";
  return [
    "You are an AI coding assistant focused on quickly producing complete artifacts.",
    "Output MUST include a full HTML document for the artifact on each turn.",
    `Purpose: ${p}.`,
    "Rules:",
    "- Always return two sections marked with XML tags:",
    "  <assistant>...short explanation...</assistant>",
    "  <artifact>...FULL HTML DOCUMENT...</artifact>",
    "- The HTML must be self-contained (no external network calls).",
    "- Keep code compact; prefer minimal dependencies.",
    "- Avoid dangerous JS; no external scripts.",
    "- Each change replaces the entire artifact document."
  ].join("\n");
}

export function extractArtifactAndMessage(text: string): AiResponse {
  const aStart = text.indexOf("<assistant>");
  const aEnd = text.indexOf("</assistant>");
  const fStart = text.indexOf("<artifact>");
  const fEnd = text.indexOf("</artifact>");
  const assistantMessage =
    aStart >= 0 && aEnd > aStart ? text.slice(aStart + 11, aEnd).trim() : text.trim();
  const artifactHtml =
    fStart >= 0 && fEnd > fStart ? text.slice(fStart + 10, fEnd).trim() : "";
  return { assistantMessage, artifactHtml };
}
