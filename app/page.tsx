import NavBar from "../components/NavBar";
import PathMap from "../components/PathMap";
import { fetchChallenges } from "../lib/challenges";
import Image from "next/image";

export default async function Page() {
  const challenges = await fetchChallenges();
  const hasData = challenges.length > 0;

  return (
    <div className="screen">
      <div className="content">
        <div className="home-header">
          <Image className="home-logo" src="/boar_image.png" alt="Minna" width={44} height={44} priority />
          <div>
            <h1 className="title">Vibe Coding Journey</h1>
            <p className="muted">A gamified path of challenges to learn vibe coding.</p>
          </div>
        </div>

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
