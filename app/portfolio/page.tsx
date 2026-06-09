import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { client, portfolioQuery, urlForImage } from "../../lib/sanity";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Portfolio — Lisa Houghton Studio",
  description:
    "Selected work from Lisa Houghton's 20-year career in fashion — retail buying, visual merchandising, and styling for brands including Next and River Island.",
};

export default async function PortfolioPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let works: any[] = [];
  try {
    works = await client.fetch(portfolioQuery);
  } catch {
    works = [];
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav active="/portfolio" />
      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">

        {/* Page header */}
        <div className="max-w-3xl mx-auto w-full mb-16 md:mb-24">
          <p
            className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Work
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
            Selected<br />
            <em style={{ fontStyle: "italic" }}>Portfolio</em>
          </h1>
          <p
            className="fade-up fade-up-3 text-base md:text-lg leading-loose"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "36rem" }}
          >
            Twenty years across buying, visual merchandising, and styling — a selection of projects from brands including Next and River Island. Work shown with employer attribution.
          </p>
        </div>

        {/* Portfolio entries */}
        {works.length === 0 ? (
          <div
            className="max-w-3xl mx-auto w-full py-20 text-center"
            style={{ color: "var(--muted)" }}
          >
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 300 }}>
              Portfolio coming soon.
            </p>
            <p className="mt-4 text-sm" style={{ fontWeight: 300 }}>
              Work in progress — check back shortly.
            </p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto w-full">
            {works.map((work, i) => (
              <div
                key={work._id}
                className="py-12 md:py-16"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">

                  {/* Images */}
                  {work.images && work.images.length > 0 && (
                    <div
                      className={work.images.length > 1 ? "grid grid-cols-2 gap-3" : "grid grid-cols-1"}
                      style={{ order: i % 2 === 0 ? 0 : 1 }}
                    >
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {work.images.slice(0, 4).map((img: any, j: number) => (
                        <div
                          key={j}
                          className="relative overflow-hidden"
                          style={{
                            aspectRatio: work.images.length === 1 ? "4/3" : "1/1",
                            background: "var(--border)",
                          }}
                        >
                          <Image
                            src={urlForImage(img).width(800).url()}
                            alt={img.alt || work.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Text */}
                  <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {work.category && (
                        <span
                          className="text-xs tracking-widest uppercase"
                          style={{
                            background: "var(--foreground)",
                            color: "var(--background)",
                            padding: "2px 8px",
                            fontWeight: 500,
                            letterSpacing: "0.1em",
                            fontSize: "0.65rem",
                          }}
                        >
                          {work.category}
                        </span>
                      )}
                      {work.featured && (
                        <span
                          className="text-xs tracking-widest uppercase"
                          style={{
                            border: "1px solid var(--border)",
                            color: "var(--muted)",
                            padding: "2px 8px",
                            fontWeight: 400,
                            letterSpacing: "0.1em",
                            fontSize: "0.65rem",
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </div>

                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        fontSize: "clamp(1.4rem, 3vw, 2rem)",
                        lineHeight: 1.1,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {work.title}
                    </h2>

                    <p className="text-sm mb-6" style={{ color: "var(--muted)", fontWeight: 300 }}>
                      {[work.employer, work.season].filter(Boolean).join(" · ")}
                    </p>

                    {work.description && (
                      <p className="text-base leading-loose" style={{ color: "var(--muted)", fontWeight: 300 }}>
                        {work.description}
                      </p>
                    )}

                    {work.employer && (
                      <p className="mt-6 text-xs" style={{ color: "var(--muted)", fontWeight: 300, fontStyle: "italic" }}>
                        Work created during employment at {work.employer}.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        )}

        {/* CTA */}
        <div className="max-w-3xl mx-auto w-full mt-20">
          <p className="text-base leading-loose" style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "32rem" }}>
            Interested in working together? Lisa offers CV reviews, portfolio evaluations, and one-to-one mentoring for fashion professionals.
          </p>
          <a
            href="/cv-review"
            className="inline-block mt-6 text-sm tracking-widest uppercase hover:opacity-60 transition-opacity"
            style={{
              fontWeight: 500,
              borderBottom: "1px solid var(--foreground)",
              paddingBottom: "2px",
              letterSpacing: "0.1em",
              fontSize: "0.75rem",
            }}
          >
            See services →
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
