import Link from "next/link";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

const services = [
  {
    title: "Mentoring",
    body: "One-to-one guidance for graduates and early-career designers finding their direction.",
    href: "/mentoring",
  },
  {
    title: "Portfolio evaluations",
    body: "An honest, industry-trained eye on the work that gets you hired.",
    href: "/portfolio-evaluation",
  },
  {
    title: "CV reviews",
    body: "Make the page that lands the interview actually work.",
    href: "/cv-review",
  },
  {
    title: "Freelance design",
    body: "Available for select retail design projects and consultancy.",
    href: "/freelance-design",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      <Nav active="/" />

      {/* ── HERO ── */}
      <main className="flex-1 flex flex-col">
        <section id="about" className="px-8 md:px-16 pt-20 md:pt-32 pb-12 md:pb-20 w-full">
          <p
            className="fade-up fade-up-2 mb-6 text-xs tracking-widest uppercase"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Fashion designer &nbsp;·&nbsp; mentor &nbsp;·&nbsp; twenty years in the industry
          </p>

          <h1
            className="fade-up fade-up-3"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
            }}
          >
            Lisa<br />
            <em style={{ fontStyle: "italic" }}>Houghton</em>
          </h1>

          <p
            className="fade-up fade-up-4 mt-10 max-w-lg text-base md:text-lg leading-relaxed"
            style={{ color: "var(--muted)", fontWeight: 300 }}
          >
            For two decades I&rsquo;ve designed for the fashion retail industry — through the briefs,
            the deadlines, the portfolios that open doors and the ones that don&rsquo;t. Now I work
            with graduates and early-career designers: refining portfolios, sharpening CVs, and
            mentoring the people who&rsquo;ll define what comes next.
          </p>

          <div className="fade-up fade-up-5 mt-8">
            <Link
              href="/about"
              className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity duration-200"
              style={{ color: "var(--foreground)", fontWeight: 400, textDecoration: "none", borderBottom: "1px solid var(--foreground)", paddingBottom: "2px" }}
            >
              About Lisa
            </Link>
          </div>
        </section>

        {/* ── THIN RULE ── */}
        <div className="fade-up fade-up-4 mx-8 md:mx-16" style={{ height: "1px", background: "var(--border)" }} />

        {/* ── SERVICES ── */}
        <section id="services" className="px-8 md:px-16 pt-12 md:pt-16 pb-20 md:pb-28">
          <p
            className="fade-up fade-up-4 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            What I offer
          </p>

          <div className="grid md:grid-cols-2 gap-0">
            {services.map((service, i) => (
              <Link
                key={service.title}
                href={service.href}
                className={`fade-up fade-up-${Math.min(i + 4, 6)} py-10 md:py-12 pr-8 md:pr-16 group block`}
                style={{ borderTop: "1px solid var(--border)", textDecoration: "none", color: "inherit" }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "1.5rem",
                    letterSpacing: "0.01em",
                    marginBottom: "0.6rem",
                    transition: "opacity 0.2s",
                  }}
                  className="group-hover:opacity-60"
                >
                  {service.title}
                </h2>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300, marginBottom: "1.2rem" }}>
                  {service.body}
                </p>
                <span
                  className="text-xs tracking-widest uppercase group-hover:opacity-60 transition-opacity duration-200"
                  style={{ color: "var(--foreground)", fontWeight: 400, borderBottom: "1px solid var(--foreground)", paddingBottom: "2px" }}
                >
                  Find out more
                </span>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
