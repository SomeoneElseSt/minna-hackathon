import { NextRequest } from "next/server";
import { getOpenAiKey, OPENAI_MODEL, MAX_TOKENS, buildSystemPrompt, extractArtifactAndMessage } from "../../../lib/openai";

export async function POST(req: NextRequest) {
  const key = getOpenAiKey();
  if (key.length === 0) {
    return Response.json({ ok: false, message: "Missing OPENAI_API_KEY" }, { status: 400 });
  }
  const body = await req.json().catch(() => null) as {
    prompt?: string;
    artifactHtml?: string;
    challengeTitle?: string;
    history?: { role: "user" | "assistant"; content: string }[];
  } | null;
  if (!body) {
    return Response.json({ ok: false, message: "Invalid request body" }, { status: 400 });
  }
  const prompt = body.prompt || "";
  const artifactHtml = body.artifactHtml || "";
  const challengeTitle = body.challengeTitle || "";
  const history = Array.isArray(body.history) ? body.history : [];
  if (prompt.length === 0) {
    return Response.json({ ok: false, message: "Empty prompt" }, { status: 400 });
  }

  const lastFive = history.slice(-5).filter((h) => (h.role === "user" || h.role === "assistant") && typeof h.content === "string");
  const messages = [{ role: "system", content: buildSystemPrompt(`Create code/artifacts for "${challengeTitle}"`)}] as { role: "system" | "user" | "assistant"; content: string }[];
  lastFive.forEach((h) => {
    messages.push({ role: h.role, content: h.content });
  });
  messages.push({
    role: "user",
    content: [
      `Challenge: ${challengeTitle}`,
      `Current artifact (HTML):`,
      artifactHtml.length > 0 ? artifactHtml : "(none yet)",
      "",
      "Instruction:",
      prompt,
      "",
      "Reminder: Return <assistant>...</assistant> and <artifact>...</artifact> with a FULL HTML document."
    ].join("\n")
  });

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      max_tokens: MAX_TOKENS,
      temperature: 0.4
    })
  });

  if (!response.ok) {
    return Response.json({ ok: false, message: "OpenAI request failed", status: response.status }, { status: 502 });
  }

  const json = await response.json() as any;
  const content: string =
    json && json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content
      ? json.choices[0].message.content as string
      : "";

  if (content.length === 0) {
    return Response.json({ ok: false, message: "Empty AI response" }, { status: 502 });
  }

  const parsed = extractArtifactAndMessage(content);
  const artifact = parsed.artifactHtml.length > 0 ? parsed.artifactHtml : artifactHtml;
  return Response.json({ ok: true, assistantMessage: parsed.assistantMessage, artifactHtml: artifact }, { status: 200 });
}
