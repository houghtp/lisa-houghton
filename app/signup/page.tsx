import type { Metadata } from "next";
import Link from "next/link";
import { MLEmbed } from "../components/MLEmbed";

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
        <nav className="flex gap-8 text-xs tracking-widest uppercase" style={{ color: "var(--muted)", fontWeight: 400 }}>
          <Link href="/about" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", textDecoration: "none" }}>About</Link>
          <Link href="/#services" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", textDecoration: "none" }}>Work with me</Link>
          <Link href="/journal" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", textDecoration: "none" }}>Journal</Link>
          <Link href="/signup" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--foreground)", textDecoration: "none" }}>Newsletter</Link>
        </nav>
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
            <MLEmbed formId="eiqW28" />
            <p className="mt-5 text-xs leading-relaxed" style={{ color: "#9a9790", maxWidth: "28rem" }}>
              By joining you&rsquo;ll receive Lisa Houghton Studio&rsquo;s newsletter —
              fashion career tips and occasional course news. Unsubscribe any time. We never share your details.
            </p>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="px-8 md:px-16 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
        style={{ borderTop: "1px solid var(--border)", color: "var(--muted)", fontWeight: 300 }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "0.85rem", letterSpacing: "0.06em" }}>
          Lisa Houghton Studio
        </span>
        <div className="flex gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity duration-200 tracking-widest uppercase" style={{ fontSize: "0.7rem", color: "var(--muted)", textDecoration: "none" }}>Instagram</a>
          <a href="mailto:lisa@lisahoughtonstudio.com" className="hover:opacity-60 transition-opacity duration-200 tracking-widest uppercase" style={{ fontSize: "0.7rem", color: "var(--muted)", textDecoration: "none" }}>Contact</a>
        </div>
        <span style={{ fontSize: "0.7rem" }}>&copy; Lisa Houghton Studio 2026</span>
      </footer>
    </div>
  );
}
