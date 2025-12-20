import NavBar from "../../../../components/NavBar";
import ChallengeRunner from "../../../../components/ChallengeRunner";
import { fetchChallenges } from "../../../../lib/challenges";
import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default async function StartPage({ params }: Props) {
  const p = await params;
  const id = Number(p.id);
  if (Number.isNaN(id)) {
    return (
      <div className="screen">
        <div className="content">
          <div className="card">
            <p>Invalid challenge id.</p>
            <p className="muted">Return to <Link href="/">Home</Link>.</p>
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
        <ChallengeRunner challenge={challenge} />
      </div>
      <NavBar />
    </div>
  );
}
