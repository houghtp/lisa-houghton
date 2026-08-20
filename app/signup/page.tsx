import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { MLEmbed } from "../components/MLEmbed";

export const metadata: Metadata = {
  title: "Newsletter - Lisa Houghton Studio",
  description:
    "A weekly letter from inside the fashion industry. Lisa's take, then the week's news. No filler, no brand deals.",
};

const WHAT_YOU_GET = [
  {
    label: "Lisa's take",
    freq: "Weekly",
    description:
      "One thing worth an opinion each week. How the industry really works, where it's heading, and the things nobody tells you until it's too late.",
  },
  {
    label: "The week in fashion",
    freq: "Weekly",
    description:
      "The stories that mattered. Runway to retail, filtered through twenty years of knowing what to pay attention to.",
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
            One email a week from someone who spent twenty years in buying, styling, and visual merchandising
            at brands you know. My take on what actually matters, then the week&apos;s industry news. Without the noise.
          </p>

          {/* What you get */}
          <div className="fade-up fade-up-4 mb-12">
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ color: "var(--muted)", fontWeight: 400 }}
            >
              What you get
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {WHAT_YOU_GET.map((item, i) => (
                <div
                  key={item.label}
                  className="py-6 pr-8"
                  style={{
                    borderTop: "1px solid var(--border)",
                    borderBottom: i >= WHAT_YOU_GET.length - 1 ? "1px solid var(--border)" : "none",
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
                      {item.label}
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
                      {item.freq}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-loose"
                    style={{ color: "var(--muted)", fontWeight: 300 }}
                  >
                    {item.description}
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
              One email a week, free. No affiliate links, no brand deals, no sponsored content.
              Unsubscribe any time.
            </p>
            <p
              className="mt-3 text-xs leading-relaxed"
              style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "26rem" }}
            >
              By subscribing you agree to receive marketing emails from Lisa Houghton Studio.
              You can unsubscribe at any time.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
