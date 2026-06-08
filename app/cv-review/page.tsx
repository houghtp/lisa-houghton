"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";

const inputStyle = {
  display: "block",
  width: "100%",
  background: "transparent",
  border: "1px solid #c8c4bb",
  borderRadius: 0,
  fontFamily: "'Jost', system-ui, sans-serif",
  fontSize: "0.875rem",
  fontWeight: 300,
  color: "#1a1a1a",
  padding: "0.75rem 1.25rem",
  outline: "none",
  marginBottom: "1rem",
};

const labelStyle = {
  display: "block",
  fontSize: "0.7rem",
  fontWeight: 400,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#6b6b6b",
  marginBottom: "0.4rem",
};

export default function CVReviewPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = { service: "CV Review", name: fd.get("name"), email: fd.get("email"), cvLink: fd.get("cvLink"), stage: fd.get("stage"), targeting: fd.get("targeting") };
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
        <div className="max-w-2xl">

          <p className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6" style={{ color: "var(--muted)", fontWeight: 400 }}>Work with me</p>
          <h1
            className="fade-up fade-up-2"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(2.8rem, 7vw, 6rem)", lineHeight: 0.95, letterSpacing: "-0.01em", marginBottom: "2rem" }}
          >
            CV<br /><em style={{ fontStyle: "italic" }}>Review</em>
          </h1>

          <p className="fade-up fade-up-3 text-base md:text-lg leading-loose mb-4" style={{ color: "var(--muted)", fontWeight: 300 }}>
            The page that lands the interview — done properly.
          </p>
          <p className="fade-up fade-up-3 text-base leading-loose" style={{ color: "var(--muted)", fontWeight: 300 }}>
            A fashion CV isn&rsquo;t like other CVs. The conventions are different, the emphasis is different, and what gets you noticed at a mid-market retailer is not what gets you noticed at a boutique studio. I&rsquo;ve hired from both sides, and I know the difference.
          </p>

          <div className="my-12 md:my-16" style={{ height: "1px", background: "var(--border)" }} />

          <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "var(--muted)", fontWeight: 400 }}>What you&apos;ll receive</p>
          <div className="mb-12">
            {[
              { heading: "Honest structural feedback", body: "Is the layout working for your experience level? Is the order right? What needs to come first?" },
              { heading: "Line-by-line notes", body: "Every bullet point and description reviewed — what to cut, what to expand, how to reframe your experience for the roles you want." },
              { heading: "Industry conventions", body: "Fashion has its own shorthand. I flag anything that looks off to a trained eye, and explain why." },
              { heading: "Clear action points", body: "You&rsquo;ll know exactly what to change and why — not vague suggestions, specific improvements." },
            ].map((item) => (
              <div key={item.heading} className="py-8 pr-8 md:pr-12" style={{ borderTop: "1px solid var(--border)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.2rem", marginBottom: "0.5rem" }}>{item.heading}</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.75, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: item.body }} />
              </div>
            ))}
          </div>

          <div className="my-12 md:my-16" style={{ height: "1px", background: "var(--border)" }} />
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)", fontWeight: 400 }}>Book a review</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.05, marginBottom: "1.5rem" }}>
            <em style={{ fontStyle: "italic" }}>Share your CV</em>
          </h2>

          {submitted ? (
            <div className="py-10">
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 400, marginBottom: "0.75rem" }}>Thank you — I&rsquo;ll be in touch.</p>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem", fontWeight: 300 }}>I typically reply within two working days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: "36rem" }}>
              <div>
                <label style={labelStyle}>Your name</label>
                <input name="name" type="text" required placeholder="Full name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email address</label>
                <input name="email" type="email" required placeholder="your@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Link to your CV (Google Doc, Dropbox, etc.)</label>
                <input name="cvLink" type="text" required placeholder="https://" style={inputStyle} />
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
              <div>
                <label style={labelStyle}>What roles are you targeting?</label>
                <textarea name="targeting" required placeholder="e.g. Graduate designer roles at mid-market womenswear retailers, London-based..." rows={3} style={{ ...inputStyle, resize: "vertical" as const }} />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ background: "#1a1a1a", color: "#fafaf8", border: "none", borderRadius: 0, fontFamily: "'Jost', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.875rem 2rem", cursor: "pointer", opacity: loading ? 0.6 : 1, transition: "opacity 0.2s" }}
              >
                {loading ? "Sending..." : "Send enquiry"}
              </button>
            </form>
          )}
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
