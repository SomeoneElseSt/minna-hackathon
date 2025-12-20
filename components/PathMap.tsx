'use client';

import type { Challenge } from "../lib/types";
import { NODE_SIZE, SVG_STROKE, PATH_COLOR } from "../lib/constants";
import Link from "next/link";

type Props = {
  challenges: Challenge[];
};

type Pos = { x: number; y: number };

function positions(count: number): Pos[] {
  const base: Pos[] = [
    { x: 18, y: 12 },
    { x: 68, y: 20 },
    { x: 34, y: 40 },
    { x: 58, y: 56 },
    { x: 28, y: 78 },
    { x: 70, y: 84 }
  ];
  if (count <= base.length) {
    return base.slice(0, count);
  }
  const extra: Pos[] = [];
  for (let i = base.length; i < count; i++) {
    const xp = 20 + ((i - base.length) * 12) % 60;
    const yp = 86 - ((i - base.length) * 6) % 20;
    extra.push({ x: xp, y: yp });
  }
  return base.concat(extra);
}

function pathD(points: Pos[]): string {
  if (points.length === 0) return "";
  const first = points[0] as Pos;
  let d = `M ${first.x}% ${first.y}%`;
  if (points.length < 2) return d;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1] as Pos;
    const p = points[i] as Pos;
    const cx = (prev.x + p.x) / 2;
    const cy = (prev.y + p.y) / 2;
    d += ` Q ${cx}% ${cy}%, ${p.x}% ${p.y}%`;
  }
  return d;
}

export default function PathMap({ challenges }: Props) {
  const pos = positions(challenges.length);
  const d = pathD(pos);

  return (
    <div className="map card">
      <svg className="svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d={d} fill="none" stroke={PATH_COLOR} strokeWidth={SVG_STROKE} strokeLinecap="round" />
      </svg>
      {challenges.map((c, idx) => {
        const p: Pos = pos[idx] ?? { x: 50, y: 50 };
        const left = `calc(${p.x}% - ${NODE_SIZE / 2}px)`;
        const top = `calc(${p.y}% - ${NODE_SIZE / 2}px)`;
        const labelLeft = `calc(${p.x}% - 50%)`;
        return (
          <Link
            key={c.id}
            href={`/challenge/${c.id}`}
            style={{ left, top }}
            className="node"
          >
            {idx + 1}
            <span className="node-label" style={{ left: labelLeft }}>
              {c.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
