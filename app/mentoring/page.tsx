"use client";

import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
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

export default function MentoringPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = { service: "Mentoring", name: fd.get("name"), email: fd.get("email"), career: fd.get("career"), goals: fd.get("goals") };
    await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      <Nav active="/mentoring" />

      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">

        {/* ── PAGE HEADER ── */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6" style={{ color: "var(--muted)", fontWeight: 400 }}>Work with me</p>
          <h1 className="fade-up fade-up-2" style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(2.8rem, 7vw, 6rem)", lineHeight: 0.95, letterSpacing: "-0.01em", marginBottom: "2rem" }}>
            Mentoring
          </h1>
          <p className="fade-up fade-up-3 text-base md:text-lg leading-loose mb-4" style={{ color: "var(--muted)", fontWeight: 300 }}>
            One-to-one guidance for graduates and early-career designers who want more than advice — they want a strategy.
          </p>
          <p className="fade-up fade-up-3 text-base leading-loose" style={{ color: "var(--muted)", fontWeight: 300 }}>
            Whether you&rsquo;re trying to get your first role, figure out where to take your career, or just want someone with real industry experience in your corner — this is built around you and what you need.
          </p>
        </div>

        {/* ── 2-COL BODY ── */}
        <div className="grid lg:grid-cols-[1fr,420px] gap-16 lg:gap-24 items-start">

          {/* LEFT: content */}
          <div>
            <div style={{ height: "1px", background: "var(--border)", marginBottom: "3rem" }} />

            <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "var(--muted)", fontWeight: 400 }}>How it works</p>
            <div className="grid md:grid-cols-3 gap-0 mb-12">
              {[
                { n: "01", heading: "First conversation", body: "We start with a free 20-minute call to understand where you are, what you want, and whether we're a good fit." },
                { n: "02", heading: "Regular sessions", body: "Ongoing video calls structured around your goals — career direction, applications, portfolios, interviews, navigating studio culture." },
                { n: "03", heading: "Practical support", body: "Between sessions I'm available for quick questions, feedback on applications, and honest input when you need it." },
              ].map((step) => (
                <div key={step.n} className="py-8 pr-6 md:pr-8" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--muted)", fontWeight: 400 }}>{step.n}</p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.15rem", marginBottom: "0.5rem" }}>{step.heading}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.75, fontWeight: 300 }}>{step.body}</p>
                </div>
              ))}
            </div>

            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "var(--muted)", fontWeight: 400 }}>What we cover</p>
            <div>
              {["Career positioning and direction", "Portfolio strategy and storytelling", "Job applications, cover letters, and interview preparation", "Navigating studio culture and early career decisions", "Freelance vs. in-house: understanding your options"].map((item) => (
                <div key={item} className="py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 300 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: sticky form */}
          <div className="lg:sticky lg:top-12" style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)", fontWeight: 400 }}>Get in touch</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              <em style={{ fontStyle: "italic" }}>Tell me about yourself</em>
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
                <div><label style={labelStyle}>Where are you in your career?</label><textarea name="career" required placeholder="e.g. Final year at LCF, looking for my first role in womenswear..." rows={3} style={{ ...inputStyle, resize: "vertical" as const }} /></div>
                <div><label style={labelStyle}>What are you hoping to get from mentoring?</label><textarea name="goals" required placeholder="Tell me what you're working towards..." rows={4} style={{ ...inputStyle, resize: "vertical" as const }} /></div>
                <button type="submit" disabled={loading} style={{ background: "#1a1a1a", color: "#fafaf8", border: "none", borderRadius: 0, fontFamily: "'Jost', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.875rem 2rem", cursor: "pointer", opacity: loading ? 0.6 : 1, transition: "opacity 0.2s" }}>
                  {loading ? "Sending..." : "Send enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
