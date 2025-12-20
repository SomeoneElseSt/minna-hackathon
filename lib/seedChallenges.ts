import type { Challenge } from "./types";

export function buildSeedChallenges(): Challenge[] {
  return [
    {
      id: 1,
      title: "Build Snake",
      description: "Create a classic Snake game with keyboard controls and score.",
      goals: [
        "Render a grid and snake body",
        "Move snake on arrow keys",
        "Spawn food and increase length",
        "Detect collision and reset"
      ],
      order: 1,
      icon: "snake",
      points: 20
    },
    {
      id: 2,
      title: "Personal Website",
      description: "Publish a simple personal site with bio, projects, and contact.",
      goals: [
        "Create home, about, projects pages",
        "Add responsive navigation",
        "Deploy to Vercel or similar"
      ],
      order: 2,
      icon: "site",
      points: 20
    },
    {
      id: 3,
      title: "Logo Design",
      description: "Design a minimal logo for your vibe brand.",
      goals: [
        "Sketch 3 ideas",
        "Pick color palette",
        "Export SVG/PNG"
      ],
      order: 3,
      icon: "logo",
      points: 15
    },
    {
      id: 4,
      title: "Ambient Track",
      description: "Produce a short ambient track with 2-3 layers.",
      goals: [
        "Choose tempo and key",
        "Layer pads and textures",
        "Export 30-60s demo"
      ],
      order: 4,
      icon: "music",
      points: 25
    },
    {
      id: 5,
      title: "Interactive Art",
      description: "Create an interactive sketch with mouse/touch input.",
      goals: [
        "Render shapes",
        "React to pointer input",
        "Add color transitions"
      ],
      order: 5,
      icon: "art",
      points: 25
    }
  ];
}
