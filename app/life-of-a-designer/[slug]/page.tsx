import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { client, urlForImage } from "../../../lib/sanity";
import { groq } from "next-sanity";

export const revalidate = 0;

const lifePostBySlugQuery = groq`*[_type == "lifePost" && slug.current == $slug][0] {
  _id, title, slug, publishedAt, excerpt, guestName, guestRole, guestImage, body
}`;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlocks(blocks: any[]) {
  if (!blocks || blocks.length === 0) return null;
  return blocks.map((block, i) => {
    if (block._type !== "block") return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const children = (block.children || []).map((child: any, j: number) => {
      let text: React.ReactNode = child.text;
      if (child.marks && child.marks.length > 0) {
        for (const mark of child.marks) {
          if (mark === "strong") { text = <strong key={j}>{text}</strong>; }
          else if (mark === "em") { text = <em key={j}>{text}</em>; }
          else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const def = (block.markDefs || []).find((d: any) => d._key === mark);
            if (def && def._type === "link") {
              text = (<a key={j} href={def.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--foreground)", textDecorationColor: "var(--border)" }}>{text}</a>);
            }
          }
        }
      }
      return <span key={j}>{text}</span>;
    });
    const style = block.style || "normal";
    // Interview questions are stored as h3
    if (style === "h3") {
      return (
        <h3 key={block._key || i} style={{
          fontWeight: 600,
          fontSize: "0.95rem",
          lineHeight: 1.4,
          letterSpacing: "0.01em",
          marginTop: "2.5rem",
          marginBottom: "0.5rem",
          fontFamily: "inherit",
        }}>
          {children}
        </h3>
      );
    }
    if (style === "h2") {
      return (<h2 key={block._key || i} style={{ fontWeight: 600, fontSize: "1.1rem", lineHeight: 1.35, letterSpacing: "0.01em", marginTop: "2.5rem", marginBottom: "0.5rem" }}>{children}</h2>);
    }
    if (style === "blockquote") {
      return (<blockquote key={block._key || i} style={{ borderLeft: "2px solid var(--border)", paddingLeft: "1.5rem", marginLeft: 0, marginTop: "1.5rem", marginBottom: "1.5rem", color: "var(--muted)", fontStyle: "italic" }}>{children}</blockquote>);
    }
    return (<p key={block._key || i} style={{ marginTop: "1.25rem", lineHeight: 1.85, fontWeight: 300, fontSize: "1rem" }}>{children}</p>);
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(lifePostBySlugQuery, { slug });
  if (!post) return { title: "Life of a Designer - Lisa Houghton Studio" };
  return {
    title: `${post.guestName || post.title} - Lisa Houghton Studio`,
    description: post.excerpt || `Interview with ${post.guestName}`,
  };
}

export default async function LifePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch(lifePostBySlugQuery, { slug });
  if (!post) notFound();
  const imageUrl = post.guestImage ? urlForImage(post.guestImage).width(800).height(600).url() : null;
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Nav active="/life-of-a-designer" />
      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-2xl mx-auto w-full">
          <Link href="/life-of-a-designer" className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
            style={{ color: "var(--muted)", textDecoration: "none", fontWeight: 400 }}>
            ← Life of a Designer
          </Link>
          <div className="mt-10 mb-12" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "2rem" }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)", fontWeight: 400 }}>
              Life of a Designer
              {post.publishedAt && <span style={{ marginLeft: "1rem" }}>{formatDate(post.publishedAt)}</span>}
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.01em" }}>
              {post.title}
            </h1>
            {post.guestName && (
              <p className="mt-4 text-sm" style={{ color: "var(--muted)", fontWeight: 400 }}>
                {post.guestName}{post.guestRole ? ` — ${post.guestRole}` : ""}
              </p>
            )}
          </div>
          {imageUrl && (
            <div className="mb-12" style={{ position: "relative", width: "100%", paddingBottom: "66.6%" }}>
              <Image src={imageUrl} alt={post.guestName || post.title} fill style={{ objectFit: "cover" }} />
            </div>
          )}
          {post.excerpt && (
            <p className="mb-10 text-base" style={{ color: "var(--muted)", fontWeight: 300, lineHeight: 1.7, fontStyle: "italic" }}>
              {post.excerpt}
            </p>
          )}
          {post.body && post.body.length > 0 && (
            <div>{renderBlocks(post.body)}</div>
          )}
          <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
            <Link href="/life-of-a-designer" className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
              style={{ color: "var(--muted)", textDecoration: "none", fontWeight: 400 }}>
              ← All interviews
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
