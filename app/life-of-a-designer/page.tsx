import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { MLEmbed } from "../components/MLEmbed";
export const revalidate = 3600;

import { client, lifePostsQuery, urlForImage } from "../../lib/sanity";

export const metadata: Metadata = {
  title: "Life of a Designer — Lisa Houghton Studio",
  description:
    "Candid conversations with designers, directors, and creatives from across the fashion industry — on careers, craft, and what nobody tells you at college.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

export default async function LifeOfADesignerPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: any[] = await client.fetch(lifePostsQuery);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav active="/life-of-a-designer" />

      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">

        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <p
            className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Series
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
            Life of a<br />
            <em style={{ fontStyle: "italic" }}>Designer</em>
          </h1>
          <p
            className="fade-up fade-up-3 text-base md:text-lg leading-loose"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "38rem" }}
          >
            Conversations with people across the industry about how they actually
            got here and what the job is really like. No PR, no polish — just
            honest accounts of creative careers.
          </p>
        </div>

        {/* Interview grid */}
        {posts.length === 0 ? (
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {/* Placeholder cards while no posts exist */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="py-10 md:py-12"
                style={{
                  borderBottom: "1px solid var(--border)",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "2rem",
                  alignItems: "start",
                }}
              >
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-3"
                    style={{ color: "var(--muted)", fontWeight: 400 }}
                  >
                    Coming soon
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      fontSize: "clamp(1.4rem, 3vw, 2rem)",
                      color: "#c8c4bb",
                    }}
                  >
                    Interview {String(i).padStart(2, "0")}
                  </h2>
                </div>
                <span
                  className="text-xs tracking-widest uppercase pt-1"
                  style={{ color: "#c8c4bb", fontWeight: 400 }}
                >
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {posts.map((post) => {
              const guestImageUrl = post.guestImage
                ? urlForImage(post.guestImage)
                    .width(600)
                    .height(750)
                    .fit("crop")
                    .url()
                : post.coverImage
                ? urlForImage(post.coverImage)
                    .width(600)
                    .height(750)
                    .fit("crop")
                    .url()
                : null;

              return (
                <Link
                  key={post._id}
                  href={`/journal/${post.slug.current}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="group block"
                >
                  {guestImageUrl && (
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "4/5",
                        marginBottom: "1.25rem",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={guestImageUrl}
                        alt={
                          post.guestImage?.alt ||
                          post.guestName ||
                          post.title
                        }
                        fill
                        style={{
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                        className="group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  {post.guestName && (
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        fontSize: "1.1rem",
                        marginBottom: "0.15rem",
                        transition: "opacity 0.2s",
                      }}
                      className="group-hover:opacity-60"
                    >
                      {post.guestName}
                    </p>
                  )}
                  {post.guestRole && (
                    <p
                      className="text-xs tracking-widest uppercase mb-2"
                      style={{ color: "var(--muted)", fontWeight: 400 }}
                    >
                      {post.guestRole}
                    </p>
                  )}
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 300,
                      fontSize: "1.1rem",
                      lineHeight: 1.25,
                      marginBottom: "0.5rem",
                      fontStyle: "italic",
                    }}
                  >
                    {post.title}
                  </p>
                  {post.publishedAt && (
                    <p
                      className="text-xs"
                      style={{ color: "var(--muted)", fontWeight: 300 }}
                    >
                      {formatDate(post.publishedAt)}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Newsletter */}
        <div
          className="mt-24 md:mt-32 pt-16"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Get every interview
          </p>
          <p
            className="text-base leading-loose mb-8 max-w-lg"
            style={{ color: "var(--muted)", fontWeight: 300 }}
          >
            New conversations are sent to subscribers first. Join to get them
            straight to your inbox.
          </p>
          <MLEmbed formId="eiqW28" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
