'use client';

import type { Challenge } from "../lib/types";
import Link from "next/link";

type Props = {
  challenges: Challenge[];
};

type Pos = { x: number; y: number };

const STEP_HEIGHT = 160;
const X_AMPLITUDE = 30;
const START_Y = 100;

function getPositions(count: number): Pos[] {
  return Array.from({ length: count }).map((_, i) => {
    const x = 50 + X_AMPLITUDE * Math.sin(i * 1.2);
    const y = START_Y + i * STEP_HEIGHT;
    return { x, y };
  });
}

function generatePath(points: Pos[]): string {
  if (points.length === 0) return "";
  const first = points[0];
  if (!first) return "";
  
  let d = `M ${first.x} ${first.y}`;
  
  if (points.length < 2) return d;

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    
    if (!current || !next) continue;

    const cp1y = current.y + STEP_HEIGHT * 0.5;
    const cp2y = next.y - STEP_HEIGHT * 0.5;
    
    d += ` C ${current.x} ${cp1y}, ${next.x} ${cp2y}, ${next.x} ${next.y}`;
  }
  
  return d;
}

export default function PathMap({ challenges }: Props) {
  const points = getPositions(challenges.length);
  const pathData = generatePath(points);
  
  const lastPoint = points.length > 0 ? points[points.length - 1] : null;
  const lastY = lastPoint ? lastPoint.y : 0;
  const totalHeight = lastY + 150;

  return (
    <div className="map-container" style={{ height: totalHeight, position: "relative" }}>
      <svg 
        className="path-svg" 
        width="100%" 
        height={totalHeight} 
        viewBox={`0 0 100 ${totalHeight}`}
        preserveAspectRatio="none"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        <path 
          d={pathData} 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.14)" 
          strokeWidth="60" 
          strokeLinecap="round" 
        />
        
        <path 
          d={pathData} 
          fill="none" 
          stroke="url(#pathGradient)" 
          strokeWidth="12" 
          strokeLinecap="round" 
        />
        
        <path 
          d={pathData} 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.35)" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeDasharray="8 12" 
        />
      </svg>

      {points.map((p, i) => {
        const isLeft = p.x < 50;
        const decorX = isLeft ? p.x + 25 : p.x - 25;
        const decorType = i % 3;
        
        if (i % 2 === 0) return null;

        return (
          <div 
            key={`decor-${i}`}
            className={`decor decor-${decorType}`}
            style={{ 
              left: `${decorX}%`, 
              top: p.y - 20,
              transform: `scale(${0.8 + (i % 5) * 0.1}) rotate(${ (i * 10) % 20 - 10 }deg)`
            }} 
          />
        );
      })}

      {challenges.map((c, idx) => {
        const p = points[idx];
        if (!p) return null;
        
        return (
          <Link
            key={c.id}
            href={`/challenge/${c.id}`}
            className="node-wrapper"
            style={{ 
              left: `${p.x}%`, 
              top: p.y,
            }}
          >
            <div className="node-circle">
               {idx + 1}
               <div className="stars">
                 <span>★</span><span>★</span><span>★</span>
               </div>
            </div>
            
            <div className="node-card">
              <span className="node-title">{c.title}</span>
              <span className="node-desc">Level {idx + 1}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
