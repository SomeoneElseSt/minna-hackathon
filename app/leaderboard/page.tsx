import NavBar from "../../components/NavBar";

export default function LeaderboardPage() {
  const items = [] as { name: string; points: number }[];
  const hasItems = items.length > 0;

  return (
    <div className="screen">
      <div className="content">
        <h1 className="title">Leaderboard</h1>
        <p className="muted">Top vibers by points.</p>
        {hasItems ? (
          <div className="card" style={{ marginTop: 16 }}>
            {items.map((i, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: 8 }}>
                <span>#{idx + 1} {i.name}</span>
                <span className="badge">{i.points} pts</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ marginTop: 16 }}>
            <p>No leaderboard data yet.</p>
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
}
