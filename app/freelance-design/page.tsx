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

export default function FreelanceDesignPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = { service: "Freelance Design", name: fd.get("name"), email: fd.get("email"), company: fd.get("company"), brief: fd.get("brief"), timeline: fd.get("timeline") };
    await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      <Nav active="/freelance-design" />

      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">

        {/* ── PAGE HEADER ── */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6" style={{ color: "var(--muted)", fontWeight: 400 }}>Work with me</p>
          <h1 className="fade-up fade-up-2" style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(2.8rem, 7vw, 6rem)", lineHeight: 0.95, letterSpacing: "-0.01em", marginBottom: "2rem" }}>
            Freelance<br /><em style={{ fontStyle: "italic" }}>Design</em>
          </h1>
          <p className="fade-up fade-up-3 text-base md:text-lg leading-loose mb-4" style={{ color: "var(--muted)", fontWeight: 300 }}>
            Senior design experience, available for the right project.
          </p>
          <p className="fade-up fade-up-3 text-base leading-loose" style={{ color: "var(--muted)", fontWeight: 300 }}>
            Twenty years across British fashion retail — ranges, seasons, collections. I work with brands, retailers, and agencies who need experienced design input without a full-time hire.
          </p>
        </div>

        {/* ── 2-COL BODY ── */}
        <div className="grid lg:grid-cols-[1fr,420px] gap-16 lg:gap-24 items-start">

          {/* LEFT: content */}
          <div>
            <div style={{ height: "1px", background: "var(--border)", marginBottom: "3rem" }} />

            <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "var(--muted)", fontWeight: 400 }}>What I take on</p>
            <div>
              {[
                { heading: "Range design", body: "Seasonal ranges for womenswear, menswear and accessories — from concept through to delivery-ready specs." },
                { heading: "Design consultancy", body: "Strategic design input on direction, range architecture, or positioning. Useful when you need an experienced eye, not a full design team." },
                { heading: "Agency projects", body: "Available for short and medium-term agency engagements where senior fashion design expertise is needed." },
              ].map((item) => (
                <div key={item.heading} className="py-8 pr-8 md:pr-12" style={{ borderTop: "1px solid var(--border)" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.2rem", marginBottom: "0.5rem" }}>{item.heading}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.75, fontWeight: 300 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: sticky form */}
          <div className="lg:sticky lg:top-12" style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)", fontWeight: 400 }}>Enquire</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              <em style={{ fontStyle: "italic" }}>Tell me about your project</em>
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
                <div><label style={labelStyle}>Company / Brand</label><input name="company" type="text" required placeholder="Brand or agency name" style={inputStyle} /></div>
                <div><label style={labelStyle}>Tell me about the project</label><textarea name="brief" required placeholder="What are you working on, and what kind of design input do you need?" rows={5} style={{ ...inputStyle, resize: "vertical" as const }} /></div>
                <div><label style={labelStyle}>Timeline / start date</label><input name="timeline" type="text" placeholder="e.g. Looking to start end of June, approx. 6 weeks" style={inputStyle} /></div>
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
