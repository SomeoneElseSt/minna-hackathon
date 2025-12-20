import Link from "next/link";
import NavBar from "../../../components/NavBar";
import { fetchChallenges } from "../../../lib/challenges";

type Props = {
  params: { id: string };
};

export default async function ChallengePage({ params }: Props) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return (
      <div className="screen">
        <div className="content">
          <div className="card">
            <p>Invalid challenge id.</p>
          </div>
        </div>
        <NavBar />
      </div>
    );
  }

  const all = await fetchChallenges();
  const challenge = all.find((c) => c.id === id);
  if (!challenge) {
    return (
      <div className="screen">
        <div className="content">
          <div className="card">
            <p>Challenge not found.</p>
            <p className="muted">Return to <Link href="/">Home</Link>.</p>
          </div>
        </div>
        <NavBar />
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="content">
        <h1 className="title">{challenge.title}</h1>
        <p className="muted">{challenge.description}</p>
        <div className="card" style={{ marginTop: 16 }}>
          <h2 className="title">Goals</h2>
          <ul>
            {challenge.goals.map((g, i) => (
              <li key={i} style={{ marginTop: 8 }}>{g}</li>
            ))}
          </ul>
          <div style={{ marginTop: 12 }}>
            <span className="badge">{challenge.points} pts</span>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
}
