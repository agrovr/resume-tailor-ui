export default function Landing() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "clamp(20px, 3vw, 32px)",
        background:
          "radial-gradient(1000px 600px at 20% 10%, rgba(99,102,241,0.22), transparent 60%), radial-gradient(900px 500px at 90% 8%, rgba(14,165,233,0.14), transparent 56%), linear-gradient(180deg, #07111f 0%, #060b16 100%)",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          borderRadius: 28,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "linear-gradient(180deg, rgba(8,15,30,0.86), rgba(8,15,30,0.7))",
          padding: "clamp(24px, 5vw, 48px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.28)",
        }}
      >
        <div style={{ display: "grid", gap: 24, alignItems: "center", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 0.35,
                textTransform: "uppercase",
              }}
            >
              AI Resume Tailoring
            </div>

            <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", lineHeight: 0.98, margin: "18px 0 14px", letterSpacing: -1.7 }}>
              Smarter resume tailoring, built for real job applications.
            </h1>

            <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.08rem)", opacity: 0.82, maxWidth: 640, lineHeight: 1.7, margin: 0 }}>
              Optimize your resume for specific roles, improve ATS compatibility, and review fit insights in a cleaner,
              more polished workflow across desktop and mobile.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
              <a
                href="/app"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 50,
                  padding: "12px 18px",
                  borderRadius: 16,
                  background: "linear-gradient(135deg, rgba(99,102,241,0.9), rgba(14,165,233,0.8))",
                  border: "1px solid rgba(255,255,255,0.14)",
                  fontWeight: 800,
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Open the app
              </a>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 50,
                  padding: "12px 16px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.05)",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                Tailor • Score • Export
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: 14,
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
          >
            <Feature title="ATS optimized" text="Spot and reduce issues before you submit." />
            <Feature title="Fit score" text="See how well your resume matches a role." />
            <Feature title="AI rewrite" text="Refine bullets without inventing experience." />
            <Feature title="Mobile friendly" text="A cleaner, more usable layout on smaller screens." />
          </div>
        </div>
      </div>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 20,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        minHeight: 150,
      }}
    >
      <h3 style={{ margin: "0 0 10px", fontSize: 18 }}>{title}</h3>
      <p style={{ opacity: 0.76, lineHeight: 1.65, margin: 0 }}>{text}</p>
    </div>
  );
}
