'use client';

import { useState } from "react";
import type { Challenge } from "../lib/types";
import { initialArtifact } from "../lib/artifacts";
import Link from "next/link";

type Props = { challenge: Challenge };

type ViewMode = "chat" | "artifact";

export default function ChallengeRunner({ challenge }: Props) {
  const [view, setView] = useState<ViewMode>("chat");
  const [artifact, setArtifact] = useState<string>(initialArtifact(challenge));
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const [busy, setBusy] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  async function send() {
    if (busy) return;
    const text = input.trim();
    if (text.length === 0) return;
    setInput("");
    const payload = {
      prompt: text,
      artifactHtml: artifact,
      challengeTitle: challenge.title,
      history: messages.slice(-5)
    };
    setBusy(true);
    setErrorText("");
    setMessages((m) => m.concat([{ role: "user", content: text }]));

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      setBusy(false);
      setErrorText("AI request failed");
      return;
    }
    const json = await res.json() as {
      ok?: boolean;
      assistantMessage?: string;
      artifactHtml?: string;
      message?: string;
    };
    if (!json.ok) {
      setBusy(false);
      setErrorText(json.message || "AI returned error");
      return;
    }
    const assistantMsg = (json.assistantMessage || "").trim();
    const nextArtifact = (json.artifactHtml || "").trim();
    if (assistantMsg.length > 0) {
      setMessages((m) => m.concat([{ role: "assistant", content: assistantMsg }]));
    }
    if (nextArtifact.length > 0) {
      setArtifact(nextArtifact);
      setView("artifact");
    }
    setBusy(false);
  }

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div className="segmented">
          <button
            type="button"
            className={view === "chat" ? "segbtn active" : "segbtn"}
            onClick={() => setView("chat")}
          >
            Chat
          </button>
          <button
            type="button"
            className={view === "artifact" ? "segbtn active" : "segbtn"}
            onClick={() => setView("artifact")}
          >
            Artifact
          </button>
        </div>
        <Link href={`/challenge/${challenge.id}`} className="navbtn">Back</Link>
      </div>

      {view === "chat" ? (
        <div>
          {busy ? <div className="spinner" role="status" aria-label="Loading" /> : null}
          <div style={{ display: "grid", gap: 8, marginBottom: 8 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ padding: 8, borderRadius: 8, background: m.role === "user" ? "rgba(124,58,237,.18)" : "rgba(6,182,212,.18)" }}>
                <span className="badge">{m.role}</span>
                <div style={{ marginTop: 6 }}>{m.content}</div>
              </div>
            ))}
          </div>
          {errorText.length > 0 ? <p className="muted">Error: {errorText}</p> : null}
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the next change..."
              style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid rgba(255,255,255,.15)", background: "#0f172a", color: "#e5e7eb" }}
            />
            <button className="sendbtn" onClick={send} disabled={busy}>{busy ? "..." : "Send"}</button>
          </div>
        </div>
      ) : (
        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,.1)" }}>
          <iframe
            title="artifact"
            sandbox="allow-scripts"
            style={{ width: "100%", height: 500, background: "#111827", border: "none" }}
            srcDoc={artifact}
          />
        </div>
      )}
    </div>
  );
}
