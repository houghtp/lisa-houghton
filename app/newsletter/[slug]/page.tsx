import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { client } from "../../../lib/sanity";
import { groq } from "next-sanity";

export const revalidate = 0;

const newsletterIssueBySlugQuery = groq`*[_type == "newsletterIssue" && slug.current == $slug][0] {
  _id, title, slug, issueNumber, publishedAt, lisaTake, handoffLine, weekInFashion
}`;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Minimal portable text renderer — handles the block types defined in the schema
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlocks(blocks: any[]) {
  if (!blocks || blocks.length === 0) return null;
  return blocks.map((block, i) => {
    if (block._type !== "block") return null;

    // Build inline children
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const children = (block.children || []).map((child: any, j: number) => {
      let text: React.ReactNode = child.text;

      // Apply marks
      if (child.marks && child.marks.length > 0) {
        for (const mark of child.marks) {
          if (mark === "strong") {
            text = <strong key={j}>{text}</strong>;
          } else if (mark === "em") {
            text = <em key={j}>{text}</em>;
          } else {
            // It's a link key — find the annotation
            const def = (block.markDefs || []).find(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (d: any) => d._key === mark
            );
            if (def && def._type === "link") {
              text = (
                <a
                  key={j}
                  href={def.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--foreground)", textDecorationColor: "var(--border)" }}
                >
                  {text}
                </a>
              );
            }
          }
        }
      }
      return <span key={j}>{text}</span>;
    });

    const style = block.style || "normal";

    if (style === "h2") {
      return (
        <h2
          key={block._key || i}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "1.4rem",
            lineHeight: 1.2,
            marginTop: "2.5rem",
            marginBottom: "0.75rem",
          }}
        >
          {children}
        </h2>
      );
    }

    if (style === "blockquote") {
      return (
        <blockquote
          key={block._key || i}
          style={{
            borderLeft: "2px solid var(--border)",
            paddingLeft: "1.5rem",
            marginLeft: 0,
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
            color: "var(--muted)",
            fontStyle: "italic",
          }}
        >
          {children}
        </blockquote>
      );
    }

    // Normal paragraph
    return (
      <p
        key={block._key || i}
        style={{
          marginTop: "1.25rem",
          lineHeight: 1.85,
          fontWeight: 300,
          fontSize: "1rem",
        }}
      >
        {children}
      </p>
    );
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = await client.fetch(newsletterIssueBySlugQuery, { slug });
  if (!issue) return { title: "Newsletter - Lisa Houghton Studio" };
  return {
    title: `${issue.title} - Lisa Houghton Studio`,
    description: `Newsletter issue #${issue.issueNumber} from Lisa Houghton Studio.`,
  };
}

export default async function NewsletterIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = await client.fetch(newsletterIssueBySlugQuery, { slug });
  if (!issue) notFound();

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav active="/newsletter" />

      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-2xl mx-auto w-full">

          {/* Back link */}
          <Link
            href="/newsletter"
            className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
            style={{ color: "var(--muted)", textDecoration: "none", fontWeight: 400 }}
          >
            ← All issues
          </Link>

          {/* Header */}
          <div className="mt-10 mb-12" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "2rem" }}>
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--muted)", fontWeight: 400 }}
            >
              Issue #{issue.issueNumber}
              {issue.publishedAt && (
                <span style={{ marginLeft: "1rem" }}>{formatDate(issue.publishedAt)}</span>
              )}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}
            >
              {issue.title}
            </h1>
          </div>

          {/* Lisa's take */}
          {issue.lisaTake && issue.lisaTake.length > 0 && (
            <section className="mb-12">
              <p
                className="text-xs tracking-widest uppercase mb-6"
                style={{ color: "var(--muted)", fontWeight: 400 }}
              >
                Lisa&rsquo;s take
              </p>
              <div style={{ fontSize: "1.05rem" }}>
                {renderBlocks(issue.lisaTake)}
              </div>
            </section>
          )}

          {/* Handoff line */}
          {issue.handoffLine && (
            <p
              className="my-10 text-sm tracking-widest uppercase"
              style={{
                color: "var(--muted)",
                fontWeight: 400,
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                padding: "1.5rem 0",
                letterSpacing: "0.08em",
              }}
            >
              {issue.handoffLine}
            </p>
          )}

          {/* Week in fashion */}
          {issue.weekInFashion && issue.weekInFashion.length > 0 && (
            <section>
              <p
                className="text-xs tracking-widest uppercase mb-6"
                style={{ color: "var(--muted)", fontWeight: 400 }}
              >
                The week in fashion
              </p>
              {renderBlocks(issue.weekInFashion)}
            </section>
          )}

          {/* Footer nav */}
          <div
            className="mt-16 pt-8 flex justify-between items-center"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <Link
              href="/newsletter"
              className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
              style={{ color: "var(--muted)", textDecoration: "none", fontWeight: 400 }}
            >
              ← All issues
            </Link>
            <Link
              href="/signup"
              className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
              style={{ color: "var(--muted)", textDecoration: "none", fontWeight: 400 }}
            >
              Subscribe →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
