import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { client, fashionEventsQuery } from "../../lib/sanity";

export const revalidate = 3600; // refresh from Sanity every hour

export const metadata: Metadata = {
  title: "Catwalk Calendar — Lisa Houghton Studio",
  description:
    "Major fashion week dates for the season — New York, London, Milan, Paris. Updated when schedules are announced.",
};

const OFFICIAL_SOURCES = [
  { name: "CFDA (New York)", url: "https://cfda.com" },
  { name: "British Fashion Council (London)", url: "https://britishfashioncouncil.co.uk" },
  { name: "Camera Nazionale della Moda (Milan)", url: "https://cameramoda.it" },
  { name: "FHCM (Paris)", url: "https://fhcm.paris" },
];

function formatEventDate(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const optsYear: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };

  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()}–${e.toLocaleDateString("en-GB", optsYear)}`;
  }
  return `${s.toLocaleDateString("en-GB", opts)} – ${e.toLocaleDateString("en-GB", optsYear)}`;
}

export default async function CalendarPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let events: any[] = await client.fetch(fashionEventsQuery);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find next upcoming event index
  const nextIdx = events.findIndex((e) => new Date(e.startDate) >= today);

  // Fallback hardcoded events if CMS is empty
  if (events.length === 0) {
    events = [
      { _id: "1", name: "New York Fashion Week (FW26/27)", city: "New York", startDate: "2026-02-11", endDate: "2026-02-16" },
      { _id: "2", name: "London Fashion Week (FW26/27)", city: "London", startDate: "2026-02-19", endDate: "2026-02-23" },
      { _id: "3", name: "Milan Fashion Week (Women's FW26/27)", city: "Milan", startDate: "2026-02-24", endDate: "2026-03-02" },
      { _id: "4", name: "Paris Fashion Week (Women's FW26/27)", city: "Paris", startDate: "2026-03-02", endDate: "2026-03-10" },
      { _id: "5", name: "London Fashion Week (SS27)", city: "London", startDate: "2026-09-17", endDate: "2026-09-21", note: "Projected — confirm against official schedule" },
      { _id: "6", name: "Milan Fashion Week (Women's SS27)", city: "Milan", startDate: "2026-09-23", endDate: "2026-09-29", note: "Projected — confirm against official schedule" },
      { _id: "7", name: "Paris Fashion Week (Women's SS27)", city: "Paris", startDate: "2026-09-30", endDate: "2026-10-08", note: "Projected — confirm against official schedule" },
    ];
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav active="/catwalk-calendar" />

      <main className="flex-1 px-8 md:px-16 pt-16 md:pt-24 pb-20 md:pb-32">

        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p
            className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6"
            style={{ color: "var(--muted)", fontWeight: 400 }}
          >
            Reference
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
            Catwalk<br />
            <em style={{ fontStyle: "italic" }}>Calendar</em>
          </h1>
          <p
            className="fade-up fade-up-3 text-base md:text-lg leading-loose"
            style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "36rem" }}
          >
            Major fashion week dates — the Big Four, in date order. Updated when
            schedules are announced.
          </p>
        </div>

        {/* Event list */}
        <div style={{ maxWidth: "56rem" }}>
          {events.map((event, i) => {
            const start = new Date(event.startDate);
            const isPast = start < today;
            const isNext = i === nextIdx && !isPast;

            return (
              <div
                key={event._id}
                className="py-8 md:py-10"
                style={{
                  borderTop: "1px solid var(--border)",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "2rem",
                  alignItems: "center",
                  opacity: isPast ? 0.45 : 1,
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    {isNext && (
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
                        Next
                      </span>
                    )}
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                        lineHeight: 1.2,
                      }}
                    >
                      {event.name}
                    </h2>
                  </div>
                  <p
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "var(--muted)", fontWeight: 400 }}
                  >
                    {event.city}
                  </p>
                  {event.note && (
                    <p
                      className="mt-2 text-xs italic"
                      style={{ color: "var(--muted)", fontWeight: 300 }}
                    >
                      {event.note}
                    </p>
                  )}
                </div>
                <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 300,
                      fontSize: "0.95rem",
                      color: isPast ? "var(--muted)" : "var(--foreground)",
                    }}
                  >
                    {formatEventDate(event.startDate, event.endDate)}
                  </p>
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>

        {/* Accuracy note */}
        <div className="mt-12 max-w-2xl">
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--muted)", fontWeight: 300 }}
          >
            Dates as announced — always confirm against official schedules:{" "}
            {OFFICIAL_SOURCES.map((s, i) => (
              <span key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                  style={{ color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: "2px" }}
                >
                  {s.name}
                </a>
                {i < OFFICIAL_SOURCES.length - 1 ? " · " : "."}
              </span>
            ))}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
