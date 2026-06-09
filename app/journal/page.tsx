import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { MLEmbed } from "../components/MLEmbed";
import { client, allPostsQuery, urlForImage } from "../../lib/sanity";

export const revalidate = 0; // always SSR — live Sanity data on every visit

export const metadata: Metadata = {
  title: "Journal — Lisa Houghton Studio",
  description:
    "Essays, industry insights, and conversations with designers — from inside the fashion industry.",
};

const TABS = [
  { label: "All", href: "/journal", slug: null },
  { label: "The Week in Fashion", href: "/journal/the-week-in-fashion", slug: "the-week-in-fashion" },
  { label: "Industry Insights", href: "/journal/industry-insights", slug: "industry-insights" },
  { label: "Life of a Designer", href: "/journal/life-of-a-designer", slug: "life-of-a-designer" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PostCard({ post }: { post: any }) {
  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage).width(800).height(500).fit("crop").url()
    : null;
  return (
    <Link
      href={`/journal/${post.slug.current}`}
      style={{ textDecoration: "none", color: "inherit" }}
      className="group block"
    >
      {imageUrl && (
        <div style={{ position: "relative", aspectRatio: "8/5", marginBottom: "1.25rem", overflow: "hidden" }}>
          <Image
            src={imageUrl}
            alt={post.coverImage?.alt || post.title}
            fill
            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
            className="group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <p
        className="text-xs tracking-widest uppercase mb-2"
        style={{ color: "var(--muted)", fontWeight: 400 }}
      >
        {post.category}
        {post.publishedAt && (
          <span style={{ marginLeft: "1rem" }}>{formatDate(post.publishedAt)}</span>
        )}
      </p>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "1.3rem",
          lineHeight: 1.2,
          marginBottom: "0.6rem",
          transition: "opacity 0.2s",
        }}
        className="group-hover:opacity-60"
      >
        {post.title}
      </h2>
      {post.excerpt && (
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.75, fontWeight: 300 }}>
          {post.excerpt}
        </p>
      )}
    </Link>
  );
}

export default async function JournalPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: any[] = await client.fetch(allPostsQuery);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav active="/journal" />

      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p
            className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Journal
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
            From the<br />
            <em style={{ fontStyle: "italic" }}>studio</em>
          </h1>
          <p
            className="fade-up fade-up-3 text-base md:text-lg leading-loose"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "36rem" }}
          >
            Essays, industry insights, and conversations from inside fashion.
          </p>
        </div>

        {/* Category tabs */}
        <div
          className="flex gap-8 mb-12 overflow-x-auto"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {TABS.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className="text-xs tracking-widest uppercase whitespace-nowrap pb-4 transition-opacity hover:opacity-60"
              style={{
                textDecoration: "none",
                color: "var(--foreground)",
                borderBottom: !tab.slug ? "1px solid var(--foreground)" : "none",
                marginBottom: "-1px",
                fontWeight: 400,
              }}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Post grid */}
        {posts.length === 0 ? (
          <p style={{ color: "var(--muted)", fontWeight: 300 }}>
            Posts coming soon.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Newsletter embed */}
        <div
          className="mt-24 md:mt-32 pt-16"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Don&rsquo;t miss an issue
          </p>
          <p
            className="text-base leading-loose mb-8 max-w-lg"
            style={{ color: "var(--muted)", fontWeight: 300 }}
          >
            New essays and interviews arrive in the newsletter first. Join to get
            them straight to your inbox.
          </p>
          <MLEmbed formId="eiqW28" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
