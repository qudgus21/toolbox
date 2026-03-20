export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "3.75rem", fontWeight: 700, marginBottom: "1rem" }}>
            404
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#666", marginBottom: "2rem" }}>
            Page not found
          </p>
          <a
            href="/pdf"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRadius: "9999px",
              backgroundColor: "#6366f1",
              padding: "0.625rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Go Home
          </a>
        </main>
      </body>
    </html>
  );
}
