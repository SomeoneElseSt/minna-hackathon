import NavBar from "../../components/NavBar";

export default function SettingsPage() {
  return (
    <div className="screen">
      <div className="content">
        <h1 className="title">Settings</h1>
        <p className="muted">Customize your experience.</p>
        <div className="card" style={{ marginTop: 16, display: "grid", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Dark mode</span>
            <span className="badge">Auto</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Notifications</span>
            <span className="badge">On</span>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
}
