import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Check your email - Lisa Houghton Studio",
  description: "One more step — confirm your email to complete your signup.",
  robots: { index: false, follow: false },
};

export default function CheckEmailPage() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav active="/" />

      <main className="flex-1 px-8 md:px-16 pt-20 md:pt-32 pb-20 md:pb-32">
        <div className="max-w-3xl mb-16 md:mb-20">
          <p
            className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            One more step
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
            Check your<br />
            <em style={{ fontStyle: "italic" }}>inbox.</em>
          </h1>
          <p
            className="fade-up fade-up-3 text-base md:text-lg leading-loose"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "36rem" }}
          >
            We&rsquo;ve sent a confirmation link to your email address. Click it to complete your signup.
          </p>
          <p
            className="fade-up fade-up-4 text-sm leading-loose mt-4"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "36rem", opacity: 0.7 }}
          >
            Check your junk folder if it doesn&rsquo;t arrive within a couple of minutes.
          </p>
        </div>

        <div
          className="fade-up fade-up-4"
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "2.5rem",
            maxWidth: "64rem",
          }}
        >
          <div className="flex flex-wrap gap-6">
            <Link
              href="/journal"
              className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity duration-200"
              style={{
                color: "var(--foreground)",
                fontWeight: 400,
                textDecoration: "none",
                borderBottom: "1px solid var(--foreground)",
                paddingBottom: "2px",
              }}
            >
              Read the journal
            </Link>
            <Link
              href="/"
              className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity duration-200"
              style={{
                color: "var(--muted)",
                fontWeight: 400,
                textDecoration: "none",
                borderBottom: "1px solid var(--muted)",
                paddingBottom: "2px",
              }}
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
