import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { MLEmbed } from "../components/MLEmbed";

export const metadata: Metadata = {
  title: "Newsletter — Lisa Houghton Studio",
  description:
    "The newsletter for fashion professionals — industry news, career advice, and the job market, straight from twenty years inside the industry.",
};

const SENDS = [
  {
    label: "The Week in Fashion",
    freq: "Monthly",
    description:
      "The stories that actually mattered this month — runway, business, culture. No press releases, no fluff.",
  },
  {
    label: "Career",
    freq: "Monthly",
    description:
      "CV, portfolio, interviews, career moves. Honest advice from someone who has hired, been hired, and helped others do both.",
  },
  {
    label: "The Industry",
    freq: "Monthly",
    description:
      "How buying works. How retail thinks. The business side of fashion that nobody explains on the job.",
  },
  {
    label: "Where's the Work",
    freq: "Monthly",
    description:
      "What the job market is actually doing — which brands are hiring, what levels, and what it means for your next move.",
  },
];

export default function SignupPage() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav active="/signup" />

      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-3xl mx-auto w-full">

          {/* Label */}
          <p
            className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Newsletter
          </p>

          {/* Headline */}
          <h1
            className="fade-up fade-up-2"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              marginBottom: "1.5rem",
            }}
          >
            Fashion from the<br />
            <em style={{ fontStyle: "italic" }}>inside out</em>
          </h1>

          {/* Subhead */}
          <p
            className="fade-up fade-up-3 text-base md:text-lg leading-loose"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "34rem", marginBottom: "3rem" }}
          >
            Four sends a month from someone who spent twenty years in buying, styling, and visual merchandising
            at brands you know. Industry news, career advice, and the job market — without the noise.
          </p>

          {/* What you get */}
          <div className="fade-up fade-up-4 mb-12">
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ color: "var(--muted)", fontWeight: 400 }}
            >
              What&rsquo;s inside
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {SENDS.map((send, i) => (
                <div
                  key={send.label}
                  className="py-6 pr-8"
                  style={{
                    borderTop: "1px solid var(--border)",
                    borderBottom: i >= SENDS.length - 2 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        fontSize: "1.05rem",
                      }}
                    >
                      {send.label}
                    </span>
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{
                        color: "var(--muted)",
                        fontWeight: 400,
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {send.freq}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-loose"
                    style={{ color: "var(--muted)", fontWeight: 300 }}
                  >
                    {send.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="fade-up fade-up-5" style={{ maxWidth: "28rem" }}>
            <p
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: "var(--muted)", fontWeight: 400 }}
            >
              Join the list
            </p>
            <MLEmbed formId="eiqW28" />
            <p
              className="mt-5 text-xs leading-relaxed"
              style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "26rem" }}
            >
              Four emails a month, free. No affiliate links, no brand deals, no sponsored content.
              Unsubscribe any time.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
