export function Footer() {
  return (
    <footer
      className="px-8 md:px-16 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
      style={{
        borderTop: "1px solid var(--border)",
        color: "var(--muted)",
        fontWeight: 300,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "0.85rem",
          letterSpacing: "0.06em",
        }}
      >
        Lisa Houghton Studio
      </span>
      <div className="flex gap-6">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-60 transition-opacity duration-200 tracking-widest uppercase"
          style={{ fontSize: "0.7rem", color: "var(--muted)", textDecoration: "none" }}
        >
          Instagram
        </a>
        <a
          href="mailto:lisa@lisahoughtonstudio.com"
          className="hover:opacity-60 transition-opacity duration-200 tracking-widest uppercase"
          style={{ fontSize: "0.7rem", color: "var(--muted)", textDecoration: "none" }}
        >
          Contact
        </a>
      </div>
      <span style={{ fontSize: "0.7rem" }}>&copy; Lisa Houghton Studio 2026</span>
    </footer>
  );
}
