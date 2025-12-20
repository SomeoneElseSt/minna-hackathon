import NavBar from "../components/NavBar";
import PathMap from "../components/PathMap";
import { fetchChallenges } from "../lib/challenges";

export default async function Page() {
  const challenges = await fetchChallenges();
  const hasData = challenges.length > 0;

  return (
    <div className="screen">
      <div className="content">
        <h1 className="title">Vibe Coding Journey</h1>
        <p className="muted">A gamified path of challenges to learn vibe coding.</p>

        {hasData ? (
          <PathMap challenges={challenges} />
        ) : (
          <div className="card" style={{ marginTop: 16 }}>
            <p>No challenges found.</p>
            <p className="muted">Connect Supabase and insert rows into the <span className="badge">challenges</span> table.</p>
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
}
