import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "You're confirmed — Lisa Houghton Studio",
  description: "You're on the list. Expect fashion from the inside out.",
  robots: { index: false, follow: false },
};

const SENDS = [
  {
    label: "The Month in Fashion",
    freq: "Monthly",
    description: "The stories that moved the industry — from runway to retail, filtered through twenty years of knowing what actually matters.",
  },
  {
    label: "Behind the Rail",
    freq: "Monthly",
    description: "How the industry really works. Buying cycles, how decisions get made, and the things nobody tells you until it\'s too late.",
  },
  {
    label: "The Forecast",
    freq: "Monthly",
    description: "Trend direction before it becomes obvious. Where the industry is heading — and what to do with that knowledge.",
  },
  {
    label: "The Edit",
    freq: "Monthly",
    description: "How to build a wardrobe with intention. Written for designers and industry professionals, not the general public.",
  },
];

export default function ConfirmedPage() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav active="/" />

      <main className="flex-1 px-8 md:px-16 pt-20 md:pt-32 pb-20 md:pb-32">
        {/* ── HEADLINE ── */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p
            className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            You&rsquo;re confirmed
          </p>
          <h1
            className="fade-up fade-up-2"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              marginBottom: "2rem",
            }}
          >
            You&rsquo;re in —<br />
            <em style={{ fontStyle: "italic" }}>welcome.</em>
          </h1>
          <p
            className="fade-up fade-up-3 text-base md:text-lg leading-loose"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "36rem" }}
          >
            Your subscription is confirmed. Here&rsquo;s what you can expect to land in your inbox — four distinct sends, once a month each.
          </p>
        </div>

        {/* ── THIN RULE ── */}
        <div
          className="fade-up fade-up-3 mb-12"
          style={{ height: "1px", maxWidth: "64rem", background: "var(--border)" }}
        />

        {/* ── NEWSLETTER GRID ── */}
        <div className="grid md:grid-cols-2 gap-0 max-w-4xl mb-16 md:mb-20">
          {SENDS.map((send, i) => (
            <div
              key={send.label}
              className={`fade-up fade-up-${Math.min(i + 3, 6)} py-8 pr-8 md:pr-12`}
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div className="flex items-baseline gap-3 mb-3">
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "1.2rem",
                    fontStyle: "italic",
                  }}
                >
                  {send.label}
                </h2>
                <span
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    fontWeight: 400,
                  }}
                >
                  {send.freq}
                </span>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.8, fontWeight: 300 }}>
                {send.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div
          className="fade-up fade-up-6"
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "2.5rem",
            maxWidth: "64rem",
          }}
        >
          <p
            className="text-base leading-loose mb-8"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "32rem" }}
          >
            While you wait for your first issue, there&rsquo;s plenty to read in the journal.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/journal"
              className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity duration-200"
              style={{
                color: "var(--foreground)",
                fontWeight: 400,
                textDecoration: "none",
                borderBottom: "1px solid var(--foreground)",
                paddingBottom: "2px",
              }}
            >
              Read the journal
            </Link>
            <Link
              href="/"
              className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity duration-200"
              style={{
                color: "var(--muted)",
                fontWeight: 400,
                textDecoration: "none",
                borderBottom: "1px solid var(--muted)",
                paddingBottom: "2px",
              }}
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
