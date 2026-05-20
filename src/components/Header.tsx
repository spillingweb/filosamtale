import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { to: '/' as const, label: 'Hjem', exact: true },
  { to: '/om-meg' as const, label: 'Om meg' },
  { to: '/tjenester' as const, label: 'Tjenester & priser' },
  { to: '/blogg' as const, label: 'Blogg' },
  { to: '/arrangementer' as const, label: 'Arrangementer' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        {/* Logo / brand */}
        <h1 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_6px_18px_rgba(45,80,70,0.10)] sm:px-4 sm:py-2"
          >
            <svg
              viewBox="0 0 20 20"
              width="16"
              height="16"
              aria-hidden="true"
              className="shrink-0"
            >
              <circle cx="10" cy="10" r="9" fill="none" stroke="var(--lagoon)" strokeWidth="1.5" />
              <path
                d="M10 5 C7 5 5 7 5 10 C5 13 7.5 14.5 10 14 C12.5 13.5 14 12 14 10"
                fill="none"
                stroke="var(--palm)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="10" cy="10" r="2" fill="var(--lagoon)" />
            </svg>
            <span className="font-serif font-semibold">Sykosofi</span>
          </Link>
        </h1>

        {/* Navigation links */}
        <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-medium sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
              activeOptions={to === '/' ? { exact: true } : undefined}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/kontakt"
            className="hidden rounded-full border border-[var(--chip-line)] bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground no-underline transition hover:-translate-y-0.5 sm:inline-flex"
          >
            Ta kontakt
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

