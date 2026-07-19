import { Link } from "@tanstack/react-router";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { NavLink } from "./ui/nav-link";
import PageWrap from "./ui/PageWrap";

const navLinks = [
  { to: "/" as const, label: "Hjem", exact: true },
  { to: "/om-meg" as const, label: "Om meg" },
  { to: "/tjenester" as const, label: "Tjenester" },
  { to: "/arrangementer" as const, label: "Arrangementer" },
  { to: "/blogg" as const, label: "Blogg" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card backdrop-blur-lg">
      <PageWrap>
        <nav className="flex items-baseline-last gap-x-7 py-3 sm:py-4">
          {/* Logo / brand */}
          <h1 className="m-0 shrink-0 text-base tracking-tight">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 py-1.5 text-md text-foreground no-underline "
            >
              {/* <Logo className="shrink-0" /> */}
              <span className="font-serif text-medium text-2xl tracking-wider">
                Filosamtale
              </span>
            </Link>
          </h1>

          {/* Desktop Navigation links */}
          <div className="hidden items-center gap-x-4 text-sm font-medium md:flex">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                activeOptions={to === "/" ? { exact: true } : undefined}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden md:inline-flex">
              <a href="#kontakt" className="no-underline">
                Ta kontakt
              </a>
            </Button>

            {/* Hamburger button with animation */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className="relative h-5 w-5 text-foreground cursor-pointer md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
                  mobileMenuOpen
                    ? "rotate-45 translate-y-2"
                    : "rotate-0 translate-y-0"
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
                  mobileMenuOpen
                    ? "-rotate-45 -translate-y-2"
                    : "rotate-0 translate-y-0"
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="fixed left-0 right-0 top-15 z-40 h-[calc(100dvh-60px)] w-full bg-card md:hidden flex flex-col animate-in fade-in-0 duration-200">
            <nav className="flex-1 flex flex-col items-center justify-center gap-2 p-4">
              {navLinks.map(({ to, label }, i) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rise-in px-4 py-3 text-2xl font-medium  transition hover:text-foreground"
                  style={{ animationDelay: `${i * 80}ms` }}
                  activeProps={{
                    className:
                      "rise-in px-4 py-3 text-2xl font-semibold text-primary",
                  }}
                  activeOptions={to === "/" ? { exact: true } : undefined}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Mobile contact button */}
            <div className="p-4">
              <Button
                asChild
                className="rise-in w-full"
                style={{ animationDelay: `${navLinks.length * 80}ms` }}
              >
                <a
                  href="#kontakt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="no-underline"
                >
                  Ta kontakt
                </a>
              </Button>
            </div>
          </div>
        )}
      </PageWrap>
    </header>
  );
}
