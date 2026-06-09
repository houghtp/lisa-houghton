import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { client, jobListingsQuery } from "../../lib/sanity";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Fashion Jobs — Lisa Houghton Studio",
  description:
    "Curated fashion industry job listings — buying, merchandising, styling, and design roles. Handpicked by Lisa Houghton.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const TYPE_LABELS: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "freelance": "Freelance",
  "internship": "Internship",
};

const LEVEL_LABELS: Record<string, string> = {
  "entry": "Entry level",
  "junior": "Junior",
  "mid": "Mid-level",
  "senior": "Senior",
};

export default async function JobsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let jobs: any[] = [];
  try {
    jobs = await client.fetch(jobListingsQuery);
  } catch {
    jobs = [];
  }

  const featuredJobs = jobs.filter((j) => j.featured);
  const regularJobs = jobs.filter((j) => !j.featured);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav active="/jobs" />
      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">

        {/* Page header */}
        <div className="max-w-3xl mx-auto w-full mb-16 md:mb-24">
          <p
            className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Opportunities
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
            Fashion<br />
            <em style={{ fontStyle: "italic" }}>Jobs</em>
          </h1>
          <p
            className="fade-up fade-up-3 text-base md:text-lg leading-loose"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "36rem" }}
          >
            Roles worth looking at — buying, merchandising, styling, design. Updated regularly. All listings link back to the original source.
          </p>
        </div>

        {/* Jobs list */}
        {jobs.length === 0 ? (
          <div
            className="max-w-3xl mx-auto w-full py-20 text-center"
            style={{ color: "var(--muted)" }}
          >
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 300 }}>
              No listings right now.
            </p>
            <p className="mt-4 text-sm" style={{ fontWeight: 300 }}>
              Check back soon — new roles are added weekly.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full">

            {/* Featured */}
            {featuredJobs.length > 0 && (
              <>
                <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "var(--muted)", fontWeight: 400 }}>
                  Highlighted
                </p>
                {featuredJobs.map((job) => (
                  <JobCard key={job._id} job={job} featured />
                ))}
                {regularJobs.length > 0 && (
                  <p className="text-xs tracking-widest uppercase mt-12 mb-6" style={{ color: "var(--muted)", fontWeight: 400 }}>
                    All roles
                  </p>
                )}
              </>
            )}

            {/* Regular */}
            {regularJobs.map((job) => (
              <JobCard key={job._id} job={job} featured={false} />
            ))}

            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        )}

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto w-full mt-12">
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)", fontWeight: 300 }}>
            All listings link to their original source — Adzuna, Reed, or direct employer pages. Lisa Houghton Studio is not involved in any application process and cannot be held responsible for third-party listing accuracy.
          </p>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto w-full mt-16">
          <div
            className="p-8 md:p-10"
            style={{ border: "1px solid var(--border)" }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                marginBottom: "0.75rem",
              }}
            >
              Want help landing one of these roles?
            </p>
            <p className="text-sm leading-loose mb-6" style={{ color: "var(--muted)", fontWeight: 300 }}>
              Lisa offers CV reviews and portfolio evaluations for fashion professionals at every level — from graduate to senior buyer.
            </p>
            <a
              href="/cv-review"
              className="inline-block text-sm tracking-widest uppercase hover:opacity-60 transition-opacity"
              style={{
                fontWeight: 500,
                borderBottom: "1px solid var(--foreground)",
                paddingBottom: "2px",
                letterSpacing: "0.1em",
                fontSize: "0.75rem",
              }}
            >
              CV &amp; Portfolio Review →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function JobCard({ job, featured }: { job: any; featured: boolean }) {
  const isDeadlineSoon =
    job.deadline &&
    new Date(job.deadline).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000 &&
    new Date(job.deadline) > new Date();

  return (
    <a
      href={job.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block py-7 md:py-8 group hover:opacity-80 transition-opacity"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mb-3">
            {featured && (
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  background: "var(--foreground)",
                  color: "var(--background)",
                  padding: "2px 8px",
                  fontWeight: 500,
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                }}
              >
                Highlighted
              </span>
            )}
            {job.jobType && (
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--muted)",
                  padding: "2px 8px",
                  fontWeight: 400,
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                }}
              >
                {TYPE_LABELS[job.jobType] ?? job.jobType}
              </span>
            )}
            {job.level && (
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--muted)",
                  padding: "2px 8px",
                  fontWeight: 400,
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                }}
              >
                {LEVEL_LABELS[job.level] ?? job.level}
              </span>
            )}
            {isDeadlineSoon && (
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  background: "var(--foreground)",
                  color: "var(--background)",
                  padding: "2px 8px",
                  fontWeight: 500,
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  opacity: 0.7,
                }}
              >
                Closes soon
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
              lineHeight: 1.2,
              marginBottom: "0.35rem",
            }}
          >
            {job.title}
          </h2>

          {/* Company + Location */}
          <p className="text-sm" style={{ color: "var(--muted)", fontWeight: 300 }}>
            {[job.company, job.location].filter(Boolean).join(" · ")}
            {job.salary && (
              <span style={{ marginLeft: "0.75rem", color: "var(--muted)", fontWeight: 300 }}>
                {job.salary}
              </span>
            )}
          </p>

          {/* Lisa's note */}
          {job.lisasNote && (
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "var(--muted)", fontWeight: 300, fontStyle: "italic", maxWidth: "40rem" }}
            >
              &ldquo;{job.lisasNote}&rdquo;
            </p>
          )}

          {/* Meta */}
          <div className="flex gap-4 mt-3">
            {job.sourceName && (
              <p className="text-xs" style={{ color: "var(--muted)", fontWeight: 300 }}>
                Via {job.sourceName}
              </p>
            )}
            {job.deadline && (
              <p className="text-xs" style={{ color: "var(--muted)", fontWeight: 300 }}>
                Closes {formatDate(job.deadline)}
              </p>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div
          className="flex-shrink-0 mt-1 text-lg group-hover:translate-x-1 transition-transform"
          style={{ color: "var(--muted)" }}
        >
          →
        </div>
      </div>
    </a>
  );
}
