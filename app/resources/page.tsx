import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Resources - Lisa Houghton Studio",
  description:
    "Free cheat sheets for fashion professionals. Industry acronyms, the buying cycle, garment construction terms. No sign-up required.",
};

const SHEETS = [
  {
    title: "Fashion Industry Acronyms",
    description:
      "OTB, MOQ, FOB, WSSI, STR. The thirty terms that come up in every meeting and every buying call. If you've nodded along while quietly Googling, this is for you.",
    tags: ["Buying", "Retail", "Graduate essentials"],
    file: "/resources/fashion-acronyms.pdf",
    pages: "1 page · PDF",
  },
  {
    title: "The Buying Cycle",
    description:
      "A season in fashion retail runs on a precise twelve-stage timetable. From range planning nine months out to end-of-season review, this is what happens at each stage and when.",
    tags: ["Buying", "Merchandising", "Planning"],
    file: "/resources/the-buying-cycle.pdf",
    pages: "1 page · PDF",
  },
  {
    title: "Garment Construction Terms",
    description:
      "Darts, princess seams, bias cut, GSM, toile, critical path. The technical vocabulary designers and buyers both need, organised by pattern, process, fabric, and production.",
    tags: ["Design", "Technical", "Production"],
    file: "/resources/garment-construction-terms.pdf",
    pages: "2 pages · PDF",
  },
];

export default function ResourcesPage() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav active="/resources" />

      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">

        {/* ── HEADER ── */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <p
            className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Free resources
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
            Cheat sheets.<br />
            <em style={{ fontStyle: "italic" }}>the things<br />worth knowing.</em>
          </h1>
          <p
            className="fade-up fade-up-3 text-base md:text-lg leading-loose"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "38rem" }}
          >
            Download, print, keep at your desk. No sign-up.
          </p>
        </div>

        {/* ── RULE ── */}
        <div
          className="fade-up fade-up-3 mb-0"
          style={{ height: "1px", maxWidth: "64rem", background: "var(--border)" }}
        />

        {/* ── SHEET CARDS ── */}
        <div className="max-w-4xl">
          {SHEETS.map((sheet, i) => (
            <div
              key={sheet.title}
              className={`fade-up fade-up-${Math.min(i + 4, 6)} py-10 md:py-12`}
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:gap-16">

                {/* ── LEFT: meta ── */}
                <div className="md:w-48 mb-4 md:mb-0 flex-shrink-0">
                  <p
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      fontWeight: 400,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {sheet.pages}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sheet.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          border: "1px solid var(--border)",
                          padding: "2px 7px",
                          fontWeight: 400,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── RIGHT: content ── */}
                <div className="flex-1">
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      fontSize: "1.6rem",
                      fontStyle: "italic",
                      marginBottom: "0.75rem",
                      lineHeight: 1.1,
                    }}
                  >
                    {sheet.title}
                  </h2>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.9rem",
                      lineHeight: 1.8,
                      fontWeight: 300,
                      marginBottom: "1.25rem",
                      maxWidth: "36rem",
                    }}
                  >
                    {sheet.description}
                  </p>
                  <a
                    href={sheet.file}
                    download
                    className="inline-flex items-center gap-3 text-xs tracking-widest uppercase hover:opacity-60 transition-opacity duration-200"
                    style={{
                      color: "var(--foreground)",
                      fontWeight: 400,
                      textDecoration: "none",
                      borderBottom: "1px solid var(--foreground)",
                      paddingBottom: "2px",
                    }}
                  >
                    Download PDF
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M5 1v6M2 5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── MORE COMING ── */}
        <div
          className="fade-up fade-up-6 max-w-4xl pt-12"
        >
          <p style={{ color: "var(--muted)", fontSize: "0.875rem", fontWeight: 300, lineHeight: 1.8, maxWidth: "32rem" }}>
            More in progress: fabric weights, colour theory for buyers, and a guide
            to reading a WSSI. Subscribe to the newsletter to hear when they land.
          </p>
          <div className="mt-6">
            <Link
              href="/signup"
              className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity duration-200"
              style={{
                color: "var(--foreground)",
                fontWeight: 400,
                textDecoration: "none",
                borderBottom: "1px solid var(--foreground)",
                paddingBottom: "2px",
              }}
            >
              Join the newsletter
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
