import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI SaaS Builder — Turn Ideas Into Startups",
  description:
    "Input your startup idea and get instant AI-generated business analysis, MVP roadmaps, and technical architecture. Launch faster with AI SaaS Builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="animated-bg" />
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(2, 6, 23, 0.7)',
          borderBottom: '1px solid var(--border-color)',
          backdropFilter: 'blur(16px)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <div className="container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
            <a href="/" style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 800,
                fontSize: '1rem',
              }}>A</div>
              <span style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}>
                SaaS Builder
              </span>
            </a>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <a href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Projects</a>
              <a href="/projects/new" className="btn-gradient" style={{ padding: '8px 16px', borderRadius: '8px' }}>
                Create New
              </a>
            </div>
          </div>
        </nav>

        <main style={{ minHeight: 'calc(100vh - 64px)', padding: '48px 0' }}>
          {children}
        </main>

        <footer style={{
          borderTop: '1px solid var(--border-color)',
          padding: '40px 0',
          background: 'rgba(2, 6, 23, 0.3)',
        }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              © 2026 AI SaaS Builder. Built for modern entrepreneurs.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
