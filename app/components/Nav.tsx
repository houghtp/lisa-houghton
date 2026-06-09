"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/about", label: "About", exact: true },
  { href: "/#services", label: "Work with me", exact: true },
  { href: "/journal", label: "Journal", exact: false },
  { href: "/life-of-a-designer", label: "Life of a Designer", exact: true },
  { href: "/catwalk-calendar", label: "Calendar", exact: true },
];

export function Nav({ active }: { active?: string }) {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) => {
    if (active) return active === href;
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="w-full px-8 md:px-16 pt-10 pb-6 flex items-center justify-between gap-8">
      <Link
        href="/"
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
      <nav
        className="flex flex-wrap gap-x-6 gap-y-2 justify-end text-xs tracking-widest uppercase"
        style={{ fontWeight: 400 }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:opacity-60 transition-opacity duration-200"
            style={{
              color: isActive(link.href, link.exact)
                ? "var(--foreground)"
                : "var(--muted)",
              textDecoration: "none",
            }}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="/signup"
          className="hover:opacity-60 transition-opacity duration-200"
          style={{
            color:
              (active === "/signup" || pathname === "/signup")
                ? "var(--foreground)"
                : "var(--muted)",
            textDecoration: "none",
          }}
        >
          Newsletter
        </a>
      </nav>
    </header>
  );
}
