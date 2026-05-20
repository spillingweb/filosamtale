import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'
import { kommende, tidligere, type Arrangement } from '#/data/arrangementer'

export const Route = createFileRoute('/arrangementer')({ component: Arrangementer })

const categoryLabels: Record<Arrangement['category'], string> = {
  seminar: 'Seminar',
  gruppe: 'Gruppe',
  kurs: 'Kurs',
  dialog: 'Dialog',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('nb-NO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function ArrangementKort({ arr }: { arr: Arrangement }) {
  return (
    <article className="island-shell rounded-2xl overflow-hidden">
      <div
        className={`h-1.5 ${
          arr.category === 'seminar'
            ? 'bg-[var(--palm)]'
            : arr.category === 'gruppe'
              ? 'bg-[var(--lagoon)]'
              : arr.category === 'kurs'
                ? 'bg-[var(--lagoon-deep)]'
                : 'bg-[var(--sea-ink-soft)]'
        }`}
      />
      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge
            variant={
              arr.category === 'seminar'
                ? 'default'
                : arr.category === 'gruppe'
                  ? 'accent'
                  : 'secondary'
            }
          >
            {categoryLabels[arr.category]}
          </Badge>
          {arr.isOnline && (
            <Badge variant="outline">
              <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" className="mr-1">
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 1.4a5.6 5.6 0 110 11.2A5.6 5.6 0 018 2.4zm-.7 1.4v1.4H6v1.4h1.3V8H6v1.4h1.3v1.4h1.4V9.4H10V8H8.7V6.6H10V5.2H8.7V3.8H7.3z" />
              </svg>
              Online
            </Badge>
          )}
          {arr.price === 0 && <Badge variant="secondary">Gratis</Badge>}
        </div>

        <h2 className="display-title mb-2 text-xl font-bold text-[var(--sea-ink)]">
          {arr.title}
        </h2>
        <p className="mb-4 text-sm text-[var(--sea-ink-soft)] leading-relaxed">
          {arr.description}
        </p>

        <dl className="mb-4 grid gap-y-1.5 text-sm">
          <div className="flex items-start gap-2">
            <dt className="flex items-center gap-1 font-medium text-[var(--sea-ink)] shrink-0">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" className="text-[var(--lagoon)]">
                <path d="M14 2h-1V1h-2v1H5V1H3v1H2a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm0 12H2V6h12v8zM2 5V4h12v1H2zm3 3h1.5v1.5H5V8zm3 0h1.5v1.5H8V8zm3 0h1.5v1.5H11V8z" />
              </svg>
              Dato:
            </dt>
            <dd className="text-[var(--sea-ink-soft)]">
              {formatDate(arr.date)}
              {arr.endDate ? ` – ${formatDate(arr.endDate)}` : ''}
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="flex items-center gap-1 font-medium text-[var(--sea-ink)] shrink-0">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" className="text-[var(--lagoon)]">
                <path d="M8 3.5a.5.5 0 00-1 0V9a.5.5 0 00.252.434l3.5 2a.5.5 0 00.496-.868L8 8.71V3.5z" />
                <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm7-8A7 7 0 111 8a7 7 0 0114 0z" />
              </svg>
              Tid:
            </dt>
            <dd className="text-[var(--sea-ink-soft)]">{arr.time}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="flex items-center gap-1 font-medium text-[var(--sea-ink)] shrink-0">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" className="text-[var(--lagoon)]">
                <path d="M8 16s6-5.686 6-10A6 6 0 002 6c0 4.314 6 10 6 10zm0-7a3 3 0 110-6 3 3 0 010 6z" />
              </svg>
              Sted:
            </dt>
            <dd className="text-[var(--sea-ink-soft)]">{arr.location}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="flex items-center gap-1 font-medium text-[var(--sea-ink)] shrink-0">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" className="text-[var(--lagoon)]">
                <path d="M0 4a1 1 0 011-1h14a1 1 0 011 1v8a1 1 0 01-1 1H1a1 1 0 01-1-1V4zm4 5a2 2 0 100-4 2 2 0 000 4zm-2 1a3 3 0 016 0H2zm10-3a1 1 0 00-1 1H8a1 1 0 102 0h2a1 1 0 00-1-1zm-1 3a1 1 0 00-1 1H8a1 1 0 102 0h1z" />
              </svg>
              Pris:
            </dt>
            <dd className="text-[var(--sea-ink-soft)]">
              {arr.price === 0 ? 'Gratis' : `${arr.price} kr`}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="sm">
            <a href="#kontakt">Meld interesse</a>
          </Button>
          {arr.capacity <= 12 && (
            <span className="text-xs text-[var(--sea-ink-soft)]">
              Begrenset til {arr.capacity} plasser
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

function Arrangementer() {
  return (
    <main className="page-wrap px-4 py-12">
      {/* Header */}
      <section className="island-shell rise-in relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.22),transparent_66%)]" />
        <p className="island-kicker mb-3">Arrangementer</p>
        <h1 className="display-title mb-4 max-w-2xl text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Kommende arrangementer
        </h1>
        <p className="max-w-xl text-[var(--sea-ink-soft)] leading-relaxed">
          Bli med på seminarer, samtalegrupper og kurs i Fevik og på nett. Meld deg på via
          kontaktskjemaet, eller send e-post til{' '}
          <a href="mailto:hei@sykosofi.no" className="font-medium">
            hei@sykosofi.no
          </a>
          .
        </p>
      </section>

      {/* Upcoming events */}
      <section className="mt-8">
        <h2 className="mb-5 text-xl font-semibold text-[var(--sea-ink)]">
          Kommende ({kommende.length})
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {kommende.map((arr) => (
            <ArrangementKort key={arr.slug} arr={arr} />
          ))}
        </div>
      </section>

      {/* Newsletter strip */}
      <section className="island-shell mt-10 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="island-kicker mb-1">Aldri gå glipp av et arrangement</p>
            <p className="text-[var(--sea-ink-soft)]">
              Send meg en e-post for å bli varslet om nye seminarer og grupper.
            </p>
          </div>
          <Button asChild className="shrink-0">
            <a href="mailto:hei@sykosofi.no?subject=Varslinger om arrangementer">
              Bli varslet
            </a>
          </Button>
        </div>
      </section>

      {/* Past events */}
      {tidligere.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 text-xl font-semibold text-[var(--sea-ink)]">
            Tidligere arrangementer
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 opacity-70">
            {tidligere.map((arr) => (
              <article key={arr.slug} className="island-shell rounded-2xl p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary">{categoryLabels[arr.category]}</Badge>
                  <time className="text-xs text-[var(--sea-ink-soft)]" dateTime={arr.date}>
                    {new Date(arr.date).toLocaleDateString('nb-NO', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </div>
                <h3 className="font-semibold text-[var(--sea-ink)]">{arr.title}</h3>
                <p className="mt-1 text-sm text-[var(--sea-ink-soft)]">{arr.location}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="mt-10 text-center">
        <p className="mb-4 text-[var(--sea-ink-soft)]">
          Ønsker du et skreddersydd arrangement for din bedrift eller gruppe?
        </p>
        <Button asChild size="lg">
          <Link to="/tjenester">Se alle tjenester</Link>
        </Button>
      </div>
    </main>
  )
}
