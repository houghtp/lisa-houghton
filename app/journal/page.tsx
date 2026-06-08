import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal — Lisa Houghton Studio",
  description: "Life of a Designer — candid conversations with fashion designers, directors, and creatives from across the industry.",
};

const interviews = [
  {
    episode: "Coming soon",
    name: "Interview 01",
    role: "Senior Designer, London",
    excerpt: "On building a career without compromising what you actually want from it.",
    status: "soon",
  },
  {
    episode: "Coming soon",
    name: "Interview 02",
    role: "Creative Director",
    excerpt: "The decisions that define a creative career — and the ones you can&rsquo;t take back.",
    status: "soon",
  },
  {
    episode: "Coming soon",
    name: "Interview 03",
    role: "Freelance Designer",
    excerpt: "Why she left a full-time role at 28 and never went back.",
    status: "soon",
  },
];

export default function JournalPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      {/* ── NAV ── */}
      <header className="w-full px-8 md:px-16 pt-10 pb-6 flex items-center justify-between">
        <Link href="/" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.12em", fontSize: "0.8rem", fontWeight: 500, textDecoration: "none", color: "var(--foreground)" }} className="uppercase tracking-widest hover:opacity-60 transition-opacity duration-200">
          Lisa Houghton Studio
        </Link>
        <nav className="flex gap-8 text-xs tracking-widest uppercase" style={{ color: "var(--muted)", fontWeight: 400 }}>
          <Link href="/about" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", textDecoration: "none" }}>About</Link>
          <Link href="/#services" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", textDecoration: "none" }}>Work with me</Link>
          <Link href="/journal" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--foreground)", textDecoration: "none" }}>Journal</Link>
          <Link href="/signup" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", textDecoration: "none" }}>Newsletter</Link>
        </nav>
      </header>

      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">

        {/* ── HEADER ── */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <p className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6" style={{ color: "var(--muted)", fontWeight: 400 }}>
            Journal
          </p>
          <h1
            className="fade-up fade-up-2"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              marginBottom: "1.5rem",
            }}
          >
            Life of a<br /><em style={{ fontStyle: "italic" }}>Designer</em>
          </h1>
          <p className="fade-up fade-up-3 text-base md:text-lg leading-loose" style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "36rem" }}>
            Candid conversations with designers, directors, and creatives from across the industry — on careers, craft, and what nobody tells you at college.
          </p>
        </div>

        {/* ── INTERVIEW GRID ── */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {interviews.map((item, i) => (
            <div
              key={i}
              className={`fade-up fade-up-${Math.min(i + 3, 6)} py-10 md:py-12`}
              style={{ borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "start" }}
            >
              <div>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--muted)", fontWeight: 400 }}>
                  {item.episode}
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "0.3rem" }}>
                  {item.name}
                </h2>
                <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)", fontWeight: 400 }}>
                  {item.role}
                </p>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300, maxWidth: "44rem" }} dangerouslySetInnerHTML={{ __html: item.excerpt }} />
              </div>
              <div className="pt-1" style={{ whiteSpace: "nowrap" }}>
                <span className="text-xs tracking-widest uppercase" style={{ color: "#c8c4bb", fontWeight: 400 }}>
                  Coming soon
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── NEWSLETTER CTA ── */}
        <div className="mt-16 md:mt-20 max-w-xl">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)", fontWeight: 400 }}>
            Don&rsquo;t miss an issue
          </p>
          <p className="text-base leading-loose mb-6" style={{ color: "var(--muted)", fontWeight: 300 }}>
            New interviews and essays land in the newsletter first. Join to get them straight to your inbox.
          </p>
          <Link href="/signup" className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--foreground)", fontWeight: 400, textDecoration: "none", borderBottom: "1px solid var(--foreground)", paddingBottom: "2px" }}>
            Join the newsletter
          </Link>
        </div>
      </main>

      <footer className="px-8 md:px-16 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--muted)", fontWeight: 300 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "0.85rem", letterSpacing: "0.06em" }}>Lisa Houghton Studio</span>
        <div className="flex gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity duration-200 tracking-widest uppercase" style={{ fontSize: "0.7rem", color: "var(--muted)", textDecoration: "none" }}>Instagram</a>
          <a href="mailto:lisa@lisahoughtonstudio.com" className="hover:opacity-60 transition-opacity duration-200 tracking-widest uppercase" style={{ fontSize: "0.7rem", color: "var(--muted)", textDecoration: "none" }}>Contact</a>
        </div>
        <span style={{ fontSize: "0.7rem" }}>&copy; Lisa Houghton Studio 2026</span>
      </footer>
    </div>
  );
}
