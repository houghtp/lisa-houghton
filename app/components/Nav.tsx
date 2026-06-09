"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/about", label: "About", exact: true },
  { href: "/#services", label: "Work with me", exact: true },
  { href: "/journal", label: "Journal", exact: false },
  { href: "/life-of-a-designer", label: "Life of a Designer", exact: true },
  { href: "/catwalk-calendar", label: "Calendar", exact: true },
  { href: "/signup", label: "Newsletter", exact: true },
];

export function Nav({ active }: { active?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact: boolean) => {
    if (active) return active === href;
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="w-full px-8 md:px-16 pt-10 pb-6 flex items-center justify-between gap-8 relative">
      {/* Logo */}
      <Link
        href="/"
        onClick={() => setOpen(false)}
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "0.12em",
          fontSize: "0.8rem",
          fontWeight: 500,
          textDecoration: "none",
          color: "var(--foreground)",
          flexShrink: 0,
        }}
        className="uppercase tracking-widest hover:opacity-60 transition-opacity duration-200"
      >
        Lisa Houghton Studio
      </Link>

      {/* Desktop nav */}
      <nav
        className="hidden md:flex flex-wrap gap-x-6 gap-y-2 justify-end text-xs tracking-widest uppercase"
        style={{ fontWeight: 400 }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:opacity-60 transition-opacity duration-200"
            style={{
              color: isActive(link.href, link.exact) ? "var(--foreground)" : "var(--muted)",
              textDecoration: "none",
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span
          style={{
            display: "block",
            width: "22px",
            height: "1px",
            background: "var(--foreground)",
            transition: "transform 0.3s, opacity 0.3s",
            transform: open ? "translateY(6px) rotate(45deg)" : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: "22px",
            height: "1px",
            background: "var(--foreground)",
            transition: "opacity 0.3s",
            opacity: open ? 0 : 1,
          }}
        />
        <span
          style={{
            display: "block",
            width: "22px",
            height: "1px",
            background: "var(--foreground)",
            transition: "transform 0.3s, opacity 0.3s",
            transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col px-8 pt-10 pb-16"
          style={{ background: "var(--background)" }}
        >
          {/* Header row in overlay */}
          <div className="flex items-center justify-between mb-16">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.12em",
                fontSize: "0.8rem",
                fontWeight: 500,
                textDecoration: "none",
                color: "var(--foreground)",
              }}
              className="uppercase tracking-widest"
            >
              Lisa Houghton Studio
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              className="flex flex-col gap-[5px] p-2 -mr-2"
            >
              <span style={{ display: "block", width: "22px", height: "1px", background: "var(--foreground)", transform: "translateY(6px) rotate(45deg)" }} />
              <span style={{ display: "block", width: "22px", height: "1px", background: "var(--foreground)", transform: "translateY(-6px) rotate(-45deg)" }} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 8vw, 3rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                  textDecoration: "none",
                  color: isActive(link.href, link.exact) ? "var(--foreground)" : "var(--muted)",
                  fontStyle: isActive(link.href, link.exact) ? "italic" : "normal",
                  transition: "opacity 0.2s",
                }}
                className="hover:opacity-60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
