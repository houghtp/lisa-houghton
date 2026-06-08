import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Lisa Houghton Studio",
  description: "Twenty years designing for the fashion retail industry. Now working with graduates and early-career designers through mentoring, portfolio evaluations and CV reviews.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      {/* ── NAV ── */}
      <header className="w-full px-8 md:px-16 pt-10 pb-6 flex items-center justify-between">
        <Link href="/" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.12em", fontSize: "0.8rem", fontWeight: 500, textDecoration: "none", color: "var(--foreground)" }} className="uppercase tracking-widest hover:opacity-60 transition-opacity duration-200">
          Lisa Houghton Studio
        </Link>
        <nav className="flex gap-8 text-xs tracking-widest uppercase" style={{ color: "var(--muted)", fontWeight: 400 }}>
          <Link href="/about" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--foreground)", textDecoration: "none" }}>About</Link>
          <Link href="/#services" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", textDecoration: "none" }}>Work with me</Link>
          <Link href="/journal" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", textDecoration: "none" }}>Journal</Link>
          <a href="/signup" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", textDecoration: "none" }}>Newsletter</a>
        </nav>
      </header>

      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">

        {/* ── INTRO ── */}
        <div className="max-w-4xl">
          <p className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6" style={{ color: "var(--muted)", fontWeight: 400 }}>
            About
          </p>
          <h1
            className="fade-up fade-up-2"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              marginBottom: "2.5rem",
            }}
          >
            Twenty years —<br />
            <em style={{ fontStyle: "italic" }}>and everything<br />that comes with them.</em>
          </h1>

          <p className="fade-up fade-up-3 text-base md:text-lg leading-loose mb-6" style={{ color: "var(--muted)", fontWeight: 300 }}>
            I&rsquo;m Lisa Houghton — a fashion designer with two decades of experience across the British retail industry. I&rsquo;ve worked on everything from high street ranges to considered collections, navigating the full cycle of design from brief to buyer sign-off.
          </p>
          <p className="fade-up fade-up-3 text-base md:text-lg leading-loose mb-6" style={{ color: "var(--muted)", fontWeight: 300 }}>
            Over the years I&rsquo;ve reviewed hundreds of graduate portfolios, sat on the other side of the interview table, and watched talented designers struggle to communicate work they should be proud of. Most of the gaps I see have nothing to do with talent — they&rsquo;re about presentation, framing, and understanding how the industry actually makes decisions.
          </p>
          <p className="fade-up fade-up-3 text-base md:text-lg leading-loose" style={{ color: "var(--muted)", fontWeight: 300 }}>
            That&rsquo;s what I work on with the designers I mentor. Not what to make — but how to show it, talk about it, and build a career around it.
          </p>
        </div>

        {/* ── DIVIDER ── */}
        <div className="my-16 md:my-20" style={{ height: "1px", maxWidth: "64rem", background: "var(--border)" }} />

        {/* ── WHAT I BELIEVE ── */}
        <div className="max-w-4xl">
          <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "var(--muted)", fontWeight: 400 }}>
            What I believe
          </p>
          <div className="grid md:grid-cols-2 gap-0">
            {[
              { heading: "Talent isn’t the problem.", body: "Most graduates I work with have the creative ability. What they lack is the industry knowledge to position it correctly." },
              { heading: "Honesty is more useful than encouragement.", body: "I give direct feedback — not to be harsh, but because vague praise doesn’t help you improve or get hired." },
              { heading: "Process matters less than outcome.", body: "Recruiters spend seconds on a portfolio. The work has to lead with the strongest finished result, not how you got there." },
              { heading: "Careers are built deliberately.", body: "The designers who break in fastest are the ones who understand what they want and present themselves accordingly." },
            ].map((item) => (
              <div key={item.heading} className="py-8 pr-8 md:pr-12" style={{ borderTop: "1px solid var(--border)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem", marginBottom: "0.6rem" }}>
                  <em style={{ fontStyle: "italic" }}>{item.heading}</em>
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="my-16 md:my-20" style={{ height: "1px", maxWidth: "64rem", background: "var(--border)" }} />

        {/* ── CTA ── */}
        <div className="max-w-2xl">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)", fontWeight: 400 }}>
            Work with me
          </p>
          <p className="text-base leading-loose mb-8" style={{ color: "var(--muted)", fontWeight: 300 }}>
            I offer mentoring, portfolio evaluations, CV reviews, and freelance design work. If you&rsquo;re not sure which is right for you, get in touch and we&rsquo;ll figure it out.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/#services" className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--foreground)", fontWeight: 400, textDecoration: "none", borderBottom: "1px solid var(--foreground)", paddingBottom: "2px" }}>
              See all services
            </Link>
            <a href="mailto:lisa@lisahoughtonstudio.com" className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", fontWeight: 400, textDecoration: "none", borderBottom: "1px solid var(--muted)", paddingBottom: "2px" }}>
              Get in touch
            </a>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
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
