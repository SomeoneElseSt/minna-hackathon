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
      title: "Neighborhood Storefront",
      description: "Build a storefront for a neighborhood shop of your choice.",
      goals: [
        "Create a product grid with categories",
        "Add product detail view and add-to-cart",
        "Implement a simple cart with totals",
        "Add a checkout form (mock submit)"
      ],
      order: 3,
      icon: "store",
      points: 25
    },
    {
      id: 4,
      title: "Disease Spread Dashboard",
      description: "Make a dashboard for a scientific model of disease spread in a population.",
      goals: [
        "Simulate an SIR model over time",
        "Add sliders for parameters (β, γ, population)",
        "Plot S/I/R curves and summary stats",
        "Let users reset and rerun scenarios"
      ],
      order: 4,
      icon: "dashboard",
      points: 25
    },
    {
      id: 5,
      title: "Email Automation",
      description: "Create an automation for sending emails.",
      goals: [
        "Design an email template with variables",
        "Create a recipient list and filter logic",
        "Preview and schedule a send (mock)",
        "Log runs and show delivery status (mock)"
      ],
      order: 5,
      icon: "email",
      points: 25
    }
  ];
}
