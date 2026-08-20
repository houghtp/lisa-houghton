import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { MLEmbed } from "../components/MLEmbed";
import { client } from "../../lib/sanity";
import { groq } from "next-sanity";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Newsletter - Lisa Houghton Studio",
  description:
    "A weekly letter from inside the fashion industry. Lisa's take, then the week's news.",
};

const allNewsletterIssuesQuery = groq`*[_type == "newsletterIssue" && defined(publishedAt)] | order(issueNumber desc) {
  _id, title, slug, issueNumber, publishedAt
}`;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsletterPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const issues: any[] = await client.fetch(allNewsletterIssuesQuery);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav active="/newsletter" />

      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-3xl mx-auto w-full">

          <p
            className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Newsletter
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
            Fashion from the<br />
            <em style={{ fontStyle: "italic" }}>inside out</em>
          </h1>
          <p
            className="fade-up fade-up-3 text-base md:text-lg leading-loose"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "36rem", marginBottom: "3rem" }}
          >
            One email a week. Lisa&rsquo;s take on what matters, then the stories that shaped the industry.
          </p>

          {/* Issue list */}
          {issues.length === 0 ? (
            <p style={{ color: "var(--muted)", fontWeight: 300 }}>
              First issue coming soon.
            </p>
          ) : (
            <div style={{ borderTop: "1px solid var(--border)" }}>
              {issues.map((issue) => (
                <Link
                  key={issue._id}
                  href={`/newsletter/${issue.slug.current}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="group block py-6"
                >
                  <div
                    className="flex items-start justify-between gap-8"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <div className="pb-6">
                      <p
                        className="text-xs tracking-widest uppercase mb-2"
                        style={{ color: "var(--muted)", fontWeight: 400 }}
                      >
                        Issue #{issue.issueNumber}
                        {issue.publishedAt && (
                          <span style={{ marginLeft: "1rem" }}>{formatDate(issue.publishedAt)}</span>
                        )}
                      </p>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 400,
                          fontSize: "1.3rem",
                          lineHeight: 1.2,
                          transition: "opacity 0.2s",
                        }}
                        className="group-hover:opacity-60"
                      >
                        {issue.title}
                      </h2>
                    </div>
                    <span
                      className="text-xs tracking-widest uppercase mt-1 flex-shrink-0 transition-opacity group-hover:opacity-60"
                      style={{ color: "var(--muted)", fontWeight: 400 }}
                    >
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Subscribe prompt */}
          <div
            className="mt-20 md:mt-28 pt-12"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--muted)", fontWeight: 400 }}
            >
              Get it in your inbox
            </p>
            <p
              className="text-base leading-loose mb-8 max-w-lg"
              style={{ color: "var(--muted)", fontWeight: 300 }}
            >
              Each issue arrives on a Monday. Free, no brand deals, no filler.
            </p>
            <MLEmbed formId="eiqW28" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
