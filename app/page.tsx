export default function Landing() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "64px 20px",
        background:
          "radial-gradient(1000px 600px at 20% 10%, rgba(99,102,241,0.25), transparent 60%), #070A12",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 42, marginBottom: 16 }}>
          AI Resume Tailoring
        </h1>

        <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 700, margin: "0 auto 32px" }}>
          Automatically optimize your resume for any job description.
          Improve ATS compatibility and increase your interview chances.
        </p>

        <a
          href="/app"
          style={{
            display: "inline-block",
            padding: "14px 28px",
            borderRadius: 14,
            background: "rgba(99,102,241,0.35)",
            border: "1px solid rgba(255,255,255,0.15)",
            fontWeight: 600,
            letterSpacing: 0.3,
            textDecoration: "none",
            color: "white",
          }}
        >
          Try the App →
        </a>

        <div
          style={{
            marginTop: 80,
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          <Feature title="ATS Optimized" text="Detect and fix issues before submission." />
          <Feature title="Job Fit Score" text="See how well your resume matches the role." />
          <Feature title="AI Rewrite" text="Smart bullet improvements without fabrication." />
        </div>
      </div>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div
      style={{
        padding: 24,
        borderRadius: 16,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <h3 style={{ marginBottom: 10 }}>{title}</h3>
      <p style={{ opacity: 0.75 }}>{text}</p>
    </div>
  );
}

