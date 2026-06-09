import type { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { MLEmbed } from "../../components/MLEmbed";
import {

  client,
  postsByCategoryQuery,
  postBySlugQuery,
  allPostsQuery,
  urlForImage,
  CATEGORY_MAP,
} from "../../../lib/sanity";

export const revalidate = 0; // always SSR — live Sanity data on every visit

// ── helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const TABS = [
  { label: "All", href: "/journal", slug: null },
  { label: "The Week in Fashion", href: "/journal/the-week-in-fashion" },
  { label: "Industry Insights", href: "/journal/industry-insights" },
  { label: "Life of a Designer", href: "/journal/life-of-a-designer" },
];

// ── portable text components ─────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ptComponents: any = {
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p
        style={{
          marginBottom: "1.6rem",
          color: "var(--muted)",
          fontWeight: 300,
          lineHeight: 1.9,
          fontSize: "1.05rem",
        }}
      >
        {children}
      </p>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
          marginBottom: "1rem",
          marginTop: "2.5rem",
          lineHeight: 1.1,
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "1.3rem",
          marginBottom: "0.8rem",
          marginTop: "2rem",
          lineHeight: 1.15,
        }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote
        style={{
          borderLeft: "2px solid var(--border)",
          paddingLeft: "1.5rem",
          marginLeft: 0,
          marginBottom: "1.6rem",
          fontStyle: "italic",
          color: "var(--muted)",
          fontSize: "1.1rem",
        }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong style={{ fontWeight: 500 }}>{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em style={{ fontStyle: "italic" }}>{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any;
      children: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "var(--foreground)",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        {children}
      </a>
    ),
  },
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => {
      const url = urlForImage(value).width(1200).fit("max").url();
      return (
        <figure style={{ margin: "2.5rem 0" }}>
          <Image
            src={url}
            alt={value?.alt || ""}
            width={1200}
            height={675}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {value?.alt && (
            <figcaption
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: "var(--muted)",
                fontWeight: 300,
                textAlign: "center",
              }}
            >
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

// ── PostCard ─────────────────────────────────────────────────────────────────
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
        <div
          style={{
            position: "relative",
            aspectRatio: "8/5",
            marginBottom: "1.25rem",
            overflow: "hidden",
          }}
        >
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
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.875rem",
            lineHeight: 1.75,
            fontWeight: 300,
          }}
        >
          {post.excerpt}
        </p>
      )}
    </Link>
  );
}

// ── Category view ─────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function CategoryView({ slug, categoryName }: { slug: string; categoryName: string }) {
  const posts: any[] = await client.fetch(postsByCategoryQuery, {
    category: categoryName,
  });
  const activeTab = TABS.find((t) => t.href === `/journal/${slug}`);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav active="/journal" />
      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-3xl mb-12">
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Journal
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              marginBottom: "0",
            }}
          >
            <em style={{ fontStyle: "italic" }}>{categoryName}</em>
          </h1>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-8 mb-12 overflow-x-auto"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab ? tab.href === activeTab.href : !tab.slug;
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className="text-xs tracking-widest uppercase whitespace-nowrap pb-4 transition-opacity hover:opacity-60"
                style={{
                  textDecoration: "none",
                  color: "var(--foreground)",
                  borderBottom: isActive ? "1px solid var(--foreground)" : "none",
                  marginBottom: "-1px",
                  fontWeight: 400,
                }}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

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

        <div
          className="mt-24 pt-16"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Don&rsquo;t miss an issue
          </p>
          <MLEmbed formId="eiqW28" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ── Article view ──────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ArticleView({ post }: { post: any }) {
  const coverUrl = post.coverImage
    ? urlForImage(post.coverImage).width(1600).height(900).fit("crop").url()
    : null;

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav />
      <main className="flex-1">
        {/* Cover image */}
        {coverUrl && (
          <div
            style={{ position: "relative", width: "100%", aspectRatio: "16/7", maxHeight: "520px", overflow: "hidden" }}
          >
            <Image
              src={coverUrl}
              alt={post.coverImage?.alt || post.title}
              fill
              priority
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
          </div>
        )}

        {/* Article header */}
        <div className="px-8 md:px-16 pt-12 pb-10 max-w-3xl">
          <p
            className="text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            <Link
              href={`/journal/${Object.entries(CATEGORY_MAP).find(([, v]) => v === post.category)?.[0] || ""}`}
              style={{ color: "var(--muted)", textDecoration: "none" }}
              className="hover:opacity-60 transition-opacity"
            >
              {post.category}
            </Link>
            {post.publishedAt && (
              <span style={{ marginLeft: "1.5rem" }}>
                {formatDate(post.publishedAt)}
              </span>
            )}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              marginBottom: "1.5rem",
            }}
          >
            {post.title}
          </h1>
          {post.excerpt && (
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "var(--muted)",
                fontWeight: 300,
                maxWidth: "40rem",
              }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Guest details for Life of a Designer */}
          {post.category === "Life of a Designer" &&
            (post.guestName || post.guestRole) && (
              <div
                className="flex items-center gap-4 mt-8 pt-8"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                {post.guestImage && (
                  <div
                    style={{
                      position: "relative",
                      width: "3.5rem",
                      height: "3.5rem",
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={urlForImage(post.guestImage)
                        .width(112)
                        .height(112)
                        .fit("crop")
                        .url()}
                      alt={post.guestImage?.alt || post.guestName || ""}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div>
                  {post.guestName && (
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        fontSize: "1rem",
                        marginBottom: "0.1rem",
                      }}
                    >
                      {post.guestName}
                    </p>
                  )}
                  {post.guestRole && (
                    <p
                      style={{
                        color: "var(--muted)",
                        fontSize: "0.8rem",
                        fontWeight: 300,
                      }}
                    >
                      {post.guestRole}
                    </p>
                  )}
                </div>
              </div>
            )}
        </div>

        {/* Divider */}
        <div
          className="mx-8 md:mx-16"
          style={{ height: "1px", background: "var(--border)", maxWidth: "48rem" }}
        />

        {/* Body */}
        {post.body && (
          <article className="px-8 md:px-16 pt-10 pb-0 max-w-3xl">
            <PortableText value={post.body} components={ptComponents} />
          </article>
        )}

        {/* Newsletter */}
        <div
          className="px-8 md:px-16 mt-16 md:mt-20 pt-12 pb-20 md:pb-32"
          style={{ borderTop: "1px solid var(--border)", maxWidth: "48rem" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Liked this?
          </p>
          <p
            className="text-base leading-loose mb-8"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "36rem" }}
          >
            Get the next one in your inbox — new essays and interviews arrive in
            the newsletter first.
          </p>
          <MLEmbed formId="eiqW28" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ── Page component ────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>;
}): Promise<Metadata> {
  const { segment } = await params;

  if (CATEGORY_MAP[segment]) {
    return {
      title: `${CATEGORY_MAP[segment]} — Lisa Houghton Studio`,
      description: `Browse all ${CATEGORY_MAP[segment]} posts from Lisa Houghton Studio.`,
    };
  }

  const post = await client.fetch(postBySlugQuery, { slug: segment });
  if (!post) return { title: "Lisa Houghton Studio" };

  return {
    title: `${post.title} — Lisa Houghton Studio`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImage
        ? [{ url: urlForImage(post.coverImage).width(1200).height(630).fit("crop").url() }]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const posts: { slug: { current: string } }[] = await client.fetch(allPostsQuery);
  const categorySlugs = Object.keys(CATEGORY_MAP).map((slug) => ({ segment: slug }));
  const postSlugs = posts.map((p) => ({ segment: p.slug.current }));
  return [...categorySlugs, ...postSlugs];
}

export default async function JournalSegmentPage({
  params,
}: {
  params: Promise<{ segment: string }>;
}) {
  const { segment } = await params;

  // Category view
  if (CATEGORY_MAP[segment]) {
    return (
      <CategoryView slug={segment} categoryName={CATEGORY_MAP[segment]} />
    );
  }

  // Article view
  const post = await client.fetch(postBySlugQuery, { slug: segment });
  if (!post) notFound();

  return <ArticleView post={post} />;
}
