"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";

const inputStyle = {
  display: "block", width: "100%", background: "transparent",
  border: "1px solid #c8c4bb", borderRadius: 0,
  fontFamily: "'Jost', system-ui, sans-serif", fontSize: "0.875rem",
  fontWeight: 300, color: "#1a1a1a", padding: "0.75rem 1.25rem",
  outline: "none", marginBottom: "1rem",
};
const labelStyle = {
  display: "block", fontSize: "0.7rem", fontWeight: 400,
  letterSpacing: "0.1em", textTransform: "uppercase" as const,
  color: "#6b6b6b", marginBottom: "0.4rem",
};

export default function PortfolioEvaluationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = { service: "Portfolio Evaluation", name: fd.get("name"), email: fd.get("email"), portfolioLink: fd.get("portfolioLink"), tier: fd.get("tier"), stage: fd.get("stage"), focus: fd.get("focus") };
    await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      <header className="w-full px-8 md:px-16 pt-10 pb-6 flex items-center justify-between">
        <Link href="/" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.12em", fontSize: "0.8rem", fontWeight: 500, textDecoration: "none", color: "var(--foreground)" }} className="uppercase tracking-widest hover:opacity-60 transition-opacity duration-200">
          Lisa Houghton Studio
        </Link>
        <nav className="flex gap-8 text-xs tracking-widest uppercase" style={{ color: "var(--muted)", fontWeight: 400 }}>
          <Link href="/about" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", textDecoration: "none" }}>About</Link>
          <Link href="/#services" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--foreground)", textDecoration: "none" }}>Work with me</Link>
          <Link href="/journal" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", textDecoration: "none" }}>Journal</Link>
          <Link href="/signup" className="hover:opacity-60 transition-opacity duration-200" style={{ color: "var(--muted)", textDecoration: "none" }}>Newsletter</Link>
        </nav>
      </header>

      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">

        {/* ── PAGE HEADER ── */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6" style={{ color: "var(--muted)", fontWeight: 400 }}>Work with me</p>
          <h1 className="fade-up fade-up-2" style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(2.8rem, 7vw, 6rem)", lineHeight: 0.95, letterSpacing: "-0.01em", marginBottom: "2rem" }}>
            Portfolio<br /><em style={{ fontStyle: "italic" }}>Evaluation</em>
          </h1>
          <p className="fade-up fade-up-3 text-base md:text-lg leading-loose mb-4" style={{ color: "var(--muted)", fontWeight: 300 }}>
            An honest, industry-trained eye on the work that defines your career.
          </p>
          <p className="fade-up fade-up-3 text-base leading-loose" style={{ color: "var(--muted)", fontWeight: 300 }}>
            I&rsquo;ve reviewed hundreds of graduate portfolios from the hiring side of the table. I know what makes recruiters stop — and what makes them skip. This service gives you that perspective before it counts.
          </p>
        </div>

        {/* ── 2-COL BODY ── */}
        <div className="grid lg:grid-cols-[1fr,420px] gap-16 lg:gap-24 items-start">

          {/* LEFT: content */}
          <div>
            <div style={{ height: "1px", background: "var(--border)", marginBottom: "3rem" }} />

            <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "var(--muted)", fontWeight: 400 }}>Choose your level</p>
            <div className="grid md:grid-cols-2 gap-0 mb-12">
              {[
                {
                  label: "Written Review",
                  heading: "Detailed written feedback",
                  body: "I work through your portfolio project by project — what's working, what isn't, and the specific changes that will make the difference. Delivered as a clear written document you can act on immediately.",
                  includes: ["Project-by-project analysis", "Strengths and improvement notes", "Formatting and narrative advice", "What to lead with and what to cut"],
                },
                {
                  label: "In-Depth Session",
                  heading: "Written feedback + Zoom call",
                  body: "Everything in the written review, plus a 60-minute video call to work through the feedback together. We look at the portfolio in real time, you ask questions, and we build a clear action plan.",
                  includes: ["Full written review", "60-minute Zoom/Teams session", "Real-time walkthrough together", "Prioritised action plan"],
                },
              ].map((tier) => (
                <div key={tier.label} className="py-8 pr-8 md:pr-12" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--muted)", fontWeight: 400 }}>{tier.label}</p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.3rem", marginBottom: "0.75rem" }}>{tier.heading}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.75, fontWeight: 300, marginBottom: "1rem" }}>{tier.body}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {tier.includes.map((item) => (
                      <li key={item} style={{ fontSize: "0.8rem", fontWeight: 300, color: "#6b6b6b", paddingBottom: "0.3rem" }}>— {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: sticky form */}
          <div className="lg:sticky lg:top-12" style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)", fontWeight: 400 }}>Book an evaluation</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              <em style={{ fontStyle: "italic" }}>Send your portfolio</em>
            </h2>

            {submitted ? (
              <div className="py-8">
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, marginBottom: "0.75rem" }}>Thank you — I&rsquo;ll be in touch.</p>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", fontWeight: 300 }}>I typically reply within two working days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div><label style={labelStyle}>Your name</label><input name="name" type="text" required placeholder="Full name" style={inputStyle} /></div>
                <div><label style={labelStyle}>Email address</label><input name="email" type="email" required placeholder="your@email.com" style={inputStyle} /></div>
                <div><label style={labelStyle}>Portfolio link</label><input name="portfolioLink" type="url" required placeholder="https://yourportfolio.com" style={inputStyle} /></div>
                <div>
                  <label style={labelStyle}>Which service?</label>
                  <select name="tier" required style={{ ...inputStyle, appearance: "none" as const }}>
                    <option value="">Select an option</option>
                    <option value="written">Written Review</option>
                    <option value="indepth">In-Depth Session (written + Zoom)</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Where are you in your career?</label>
                  <select name="stage" required style={{ ...inputStyle, appearance: "none" as const }}>
                    <option value="">Select an option</option>
                    <option value="student">Still studying</option>
                    <option value="grad">Just graduated</option>
                    <option value="working">Early career (0–3 years)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div><label style={labelStyle}>Anything specific to focus on? (optional)</label><textarea name="focus" placeholder="e.g. I'm applying for womenswear roles, unsure if my styling projects are working..." rows={3} style={{ ...inputStyle, resize: "vertical" as const }} /></div>
                <button type="submit" disabled={loading} style={{ background: "#1a1a1a", color: "#fafaf8", border: "none", borderRadius: 0, fontFamily: "'Jost', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.875rem 2rem", cursor: "pointer", opacity: loading ? 0.6 : 1, transition: "opacity 0.2s" }}>
                  {loading ? "Sending..." : "Send enquiry"}
                </button>
              </form>
            )}
          </div>
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
