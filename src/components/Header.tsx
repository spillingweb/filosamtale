import { Link } from "@tanstack/react-router";
import { useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";

const navLinks = [
  { to: "/" as const, label: "Hjem", exact: true },
  { to: "/om-meg" as const, label: "Om meg" },
  { to: "/tjenester" as const, label: "Tjenester" },
  { to: "/blogg" as const, label: "Blogg" },
  { to: "/arrangementer" as const, label: "Arrangementer" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-header-bg px-2 backdrop-blur-lg">
      <nav className="page-wrap flex items-center gap-x-7 py-3 sm:py-4">
        {/* Logo / brand */}
        <h1 className="m-0 shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 py-1.5 text-sm text-foreground no-underline "
          >
            <Logo className="shrink-0" />
            <span className="font-serif font-semibold uppercase tracking-wide">Filosamtale</span>
          </Link>
        </h1>

        {/* Desktop Navigation links */}
        <div className="hidden items-center gap-x-4 text-sm font-medium md:flex">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="nav-link"
              activeProps={{ className: "nav-link is-active" }}
              activeOptions={to === "/" ? { exact: true } : undefined}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden rounded-full border-chip-line bg-primary text-primary-foreground shadow-[0_6px_18px_rgba(47,106,74,0.12)] hover:border-chip-line hover:shadow-[0_8px_22px_rgba(47,106,74,0.16)] md:inline-flex"
          >
            <Link to="/kontakt" className="no-underline">
              Ta kontakt
            </Link>
          </Button>

          {/* Hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="text-foreground transition-all duration-200 ease-in-out cursor-pointer hover:-translate-y-0.5 md:hidden"
          >
            {mobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed left-0 right-0 top-15 bottom-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="fixed right-0 top-15 z-50 h-[calc(100vh-60px)] w-64 border-l bg-surface-strong shadow-[-8px_0_32px_rgba(47,72,54,0.12)] backdrop-blur-lg md:hidden">
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-sea-ink-soft transition hover:bg-link-bg-hover hover:text-foreground"
                  activeProps={{
                    className:
                      "rounded-lg px-4 py-3 text-sm font-medium bg-chip-bg text-foreground border border-chip-line shadow-[0_2px_8px_rgba(47,106,74,0.08)]",
                  }}
                  activeOptions={to === "/" ? { exact: true } : undefined}
                >
                  {label}
                </Link>
              ))}

              {/* Mobile contact button */}
              <Button
                asChild
                size="sm"
                className="mt-4 w-full rounded-full border-chip-line bg-primary text-primary-foreground shadow-[0_6px_18px_rgba(47,106,74,0.12)]"
              >
                <Link
                  to="/kontakt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="no-underline"
                >
                  Ta kontakt
                </Link>
              </Button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
