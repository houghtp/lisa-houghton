export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      {/* ── NAV ── */}
      <header className="fade-up fade-up-1 w-full px-8 md:px-16 pt-10 pb-6 flex items-center justify-between">
        <span
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.12em", fontSize: "0.8rem", fontWeight: 500 }}
          className="uppercase tracking-widest"
        >
          Lisa Houghton Studio
        </span>
        <nav className="flex gap-8 text-xs tracking-widest uppercase" style={{ color: "var(--muted)", fontWeight: 400 }}>
          <a href="#about" className="hover:opacity-60 transition-opacity duration-200">About</a>
          <a href="#services" className="hover:opacity-60 transition-opacity duration-200">Work with me</a>
          <a href="#signup" className="hover:opacity-60 transition-opacity duration-200">Newsletter</a>
        </nav>
      </header>

      {/* ── HERO ── */}
      <main className="flex-1 flex flex-col">
        <section className="px-8 md:px-16 pt-20 md:pt-32 pb-24 md:pb-40 w-full">
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
        </section>

        {/* ── THIN RULE ── */}
        <div className="fade-up fade-up-4 mx-8 md:mx-16" style={{ height: "1px", background: "var(--border)" }} />

        {/* ── SERVICES ── */}
        <section id="services" className="px-8 md:px-16 py-20 md:py-28">
          <p
            className="fade-up fade-up-4 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            What I offer
          </p>

          <div className="grid md:grid-cols-2 gap-0">
            {[
              {
                title: "Mentoring",
                body: "One-to-one guidance for graduates and early-career designers finding their direction.",
              },
              {
                title: "Portfolio evaluations",
                body: "An honest, industry-trained eye on the work that gets you hired.",
              },
              {
                title: "CV reviews",
                body: "Make the page that lands the interview actually work.",
              },
              {
                title: "Freelance design",
                body: "Available for select retail design projects and consultancy.",
              },
            ].map((service, i) => (
              <div
                key={service.title}
                className={`fade-up fade-up-${Math.min(i + 4, 6)} py-10 md:py-12 pr-8 md:pr-16`}
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "1.5rem",
                    letterSpacing: "0.01em",
                    marginBottom: "0.6rem",
                  }}
                >
                  {service.title}
                </h2>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300 }}>
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SIGNUP ── */}
        <section
          id="signup"
          className="mx-8 md:mx-16 mb-20 md:mb-28 rounded-sm px-10 md:px-16 py-16 md:py-20"
          style={{ background: "#f2f0eb" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Newsletter
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              lineHeight: 1.15,
              marginBottom: "1.2rem",
              maxWidth: "28rem",
            }}
          >
            Free portfolio &amp; CV tips<br />
            <em style={{ fontStyle: "italic" }}>for new grads</em>
          </h2>
          <p
            className="mb-10 max-w-md text-sm leading-loose"
            style={{ color: "var(--muted)", fontWeight: 300 }}
          >
            Practical advice from twenty years in the industry — straight to your inbox, no fluff.
            Portfolio guidance, CV insight, and the things fashion courses don&rsquo;t teach you.
          </p>

          {/* ── MAILERLITE EMBED PLACEHOLDER ── */}
          {/* Replace this block with the MailerLite embed snippet when available */}
          <div className="max-w-sm">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3 text-sm border rounded-none outline-none focus:border-foreground transition-colors duration-200"
                style={{
                  background: "transparent",
                  border: "1px solid #c8c4bb",
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  color: "var(--foreground)",
                }}
                disabled
              />
              <button
                className="px-7 py-3 text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-70"
                style={{
                  background: "var(--foreground)",
                  color: "var(--background)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  cursor: "not-allowed",
                  opacity: 0.5,
                }}
                disabled
              >
                Join the list
              </button>
            </div>
            <p className="mt-4 text-xs leading-relaxed" style={{ color: "#9a9790" }}>
              <em>Signup coming soon.</em>{' '}By joining you&rsquo;ll receive Lisa Houghton Studio&rsquo;s newsletter —
              fashion career tips and occasional course news. Unsubscribe any time. We never share your details.
            </p>
          </div>
          {/* ── END PLACEHOLDER ── */}
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="px-8 md:px-16 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
        style={{ borderTop: "1px solid var(--border)", color: "var(--muted)", fontWeight: 300 }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "0.85rem", letterSpacing: "0.06em" }}>
          Lisa Houghton Studio
        </span>
        <div className="flex gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity duration-200 tracking-widest uppercase" style={{ fontSize: "0.7rem", color: "var(--muted)", textDecoration: "none" }}>Instagram</a>
          <a href="mailto:hello@lisahoughtonstudio.com" className="hover:opacity-60 transition-opacity duration-200 tracking-widest uppercase" style={{ fontSize: "0.7rem", color: "var(--muted)", textDecoration: "none" }}>Contact</a>
        </div>
        <span style={{ fontSize: "0.7rem" }}>&copy; Lisa Houghton Studio 2026</span>
      </footer>

    </div>
  );
}
