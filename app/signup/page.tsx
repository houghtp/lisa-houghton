import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Newsletter — Lisa Houghton Studio",
  description:
    "Free portfolio & CV tips for fashion graduates — practical, honest advice from twenty years in the industry.",
};

export default function SignupPage() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* ── NAV ── */}
      <header className="w-full px-8 md:px-16 pt-10 pb-6 flex items-center justify-between">
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "0.12em",
            fontSize: "0.8rem",
            fontWeight: 500,
            textDecoration: "none",
            color: "var(--foreground)",
          }}
          className="uppercase tracking-widest hover:opacity-60 transition-opacity duration-200"
        >
          Lisa Houghton Studio
        </Link>
        <Link
          href="/"
          className="hover:opacity-60 transition-opacity duration-200 text-xs tracking-widest uppercase"
          style={{ color: "var(--muted)", fontWeight: 400, textDecoration: "none" }}
        >
          ← Home
        </Link>
      </header>

      {/* ── CONTENT ── */}
      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20">
        <div className="max-w-xl">
          <p
            className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Newsletter
          </p>

          <h1
            className="fade-up fade-up-2"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              lineHeight: 1.0,
              marginBottom: "1.5rem",
            }}
          >
            Free portfolio &amp; CV tips<br />
            <em style={{ fontStyle: "italic" }}>for new grads</em>
          </h1>

          <p
            className="fade-up fade-up-3 mb-10 text-base leading-loose"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "32rem" }}
          >
            Practical advice from twenty years in the industry — straight to your inbox, no fluff.
            Portfolio guidance, CV insight, and the things fashion courses don&rsquo;t teach you.
          </p>

          {/* ── MAILERLITE EMBED ── */}
          <div className="fade-up fade-up-4">
            <div className="ml-embedded" data-form="eiqW28" />
            <p className="mt-5 text-xs leading-relaxed" style={{ color: "#9a9790", maxWidth: "28rem" }}>
              By joining you&rsquo;ll receive Lisa Houghton Studio&rsquo;s newsletter —
              fashion career tips and occasional course news. Unsubscribe any time. We never share your details.
            </p>
          </div>
          {/* ── END MAILERLITE ── */}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="px-8 md:px-16 py-8"
        style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
      >
        <span style={{ fontSize: "0.7rem", fontWeight: 300 }}>
          &copy; Lisa Houghton Studio 2026
        </span>
      </footer>
    </div>
  );
}
