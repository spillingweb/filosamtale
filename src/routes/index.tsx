import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { bloggPosts } from '#/data/blogg'

export const Route = createFileRoute('/')({ component: Forside })

const tjenester = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26A7 7 0 0112 2z" />
        <path d="M9 21h6M10 17v4M14 17v4" />
      </svg>
    ),
    tittel: 'Filosofisk dialog',
    tekst: 'En-til-en samtaler der vi utforsker dine spørsmål om mening, identitet og verdier i dybden.',
    href: '/tjenester#dialog',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="7" r="4" /><circle cx="17" cy="9" r="3" />
        <path d="M1 21v-2a7 7 0 0116 0v2" /><path d="M18 15a4 4 0 014 4v2" />
      </svg>
    ),
    tittel: 'Samtalegrupper',
    tekst: 'Månedlige grupper der vi undersøker eksistensielle spørsmål i trygt og inkluderende fellesskap.',
    href: '/tjenester#grupper',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18" />
        <path d="M8 14h2M14 14h2M8 18h2M14 18h2" />
      </svg>
    ),
    tittel: 'Seminarer',
    tekst: 'Halvdagsseminarer om filosofiske temaer — fra stoikernes visdom til eksistensfilosofi og etikk.',
    href: '/tjenester#seminarer',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
    tittel: 'Veiledning for helsepersonell',
    tekst: 'Spesialtilpassede samtaler og kurs for sykepleiere og andre som møter eksistensielle spørsmål i arbeidshverdagen.',
    href: '/tjenester#helsepersonell',
  },
]

function Forside() {
  const sisteInnlegg = bloggPosts.slice(0, 3)

  return (
    <main>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="page-wrap px-4 pb-8 pt-12 sm:pt-16">
        <div className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12 sm:py-16">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.28),transparent_66%)]" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(197,164,122,0.22),transparent_66%)]" />

          <p className="island-kicker mb-3">Filosofisk veiledning · Fevik, Agder</p>
          <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.06] font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl lg:text-6xl">
            Finn mening og retning gjennom filosofisk dialog
          </h1>
          <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] leading-relaxed sm:text-lg">
            Jeg er sykepleier og filosof, og hjelper deg å utforske livets store spørsmål — om
            mening, verdier, identitet og hvordan vi ønsker å leve. Gjennom samtale og refleksjon
            finner vi klarhet og retning.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/tjenester">Se tjenester og priser</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/om-meg">Hvem er jeg?</Link>
            </Button>
          </div>

          {/* Stat bar */}
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-8 sm:max-w-lg">
            {[
              ['10+', 'Års erfaring'],
              ['200+', 'Samtaler'],
              ['Fevik', '& online'],
            ].map(([n, label]) => (
              <div key={label} className="text-center">
                <p className="display-title text-2xl font-bold text-[var(--sea-ink)]">{n}</p>
                <p className="mt-0.5 text-xs text-[var(--sea-ink-soft)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TJENESTER OVERVIEW ────────────────────────────────── */}
      <section className="page-wrap px-4 pb-12 pt-4">
        <div className="mb-8 text-center">
          <p className="island-kicker mb-2">Hva jeg tilbyr</p>
          <h2 className="display-title text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl">
            Tjenester tilpasset ditt behov
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tjenester.map(({ icon, tittel, tekst, href }, i) => (
            <article
              key={tittel}
              className="island-shell feature-card rise-in rounded-2xl p-6"
              style={{ animationDelay: `${i * 80 + 60}ms` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-[var(--palm)]">
                {icon}
              </div>
              <h3 className="mb-2 font-semibold text-[var(--sea-ink)]">{tittel}</h3>
              <p className="mb-4 text-sm text-[var(--sea-ink-soft)] leading-relaxed">{tekst}</p>
              <Link
                to={href as '/tjenester'}
                className="text-xs font-semibold text-[var(--lagoon-deep)] no-underline hover:underline"
              >
                Les mer →
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/tjenester">Alle tjenester og priser</Link>
          </Button>
        </div>
      </section>

      {/* ── QUOTE DIVIDER ─────────────────────────────────────── */}
      <section className="px-4 py-12">
        <div className="page-wrap">
          <blockquote className="island-shell rise-in rounded-2xl px-8 py-10 text-center sm:px-16">
            <p className="display-title mb-4 text-2xl font-bold italic text-[var(--sea-ink)] leading-relaxed sm:text-3xl">
              «Livet som ikke er utforsket, er ikke verdt å leve.»
            </p>
            <footer className="island-kicker text-[var(--kicker)]">— Sokrates</footer>
          </blockquote>
        </div>
      </section>

      {/* ── OM MEG TEASER ─────────────────────────────────────── */}
      <section className="page-wrap px-4 py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Placeholder portrait */}
          <div className="order-2 lg:order-1">
            <div className="island-shell overflow-hidden rounded-2xl">
              <div
                className="flex aspect-[4/3] w-full items-end justify-center rounded-2xl bg-[radial-gradient(ellipse_at_30%_20%,rgba(79,184,178,0.18),transparent_60%),radial-gradient(ellipse_at_70%_80%,rgba(197,164,122,0.18),transparent_60%),var(--bg-base)] p-6"
              >
                {/* Stylised silhouette placeholder */}
                <div className="relative flex h-full w-full items-end justify-center">
                  <div className="absolute bottom-0 h-[70%] w-32 rounded-t-full bg-[var(--sand)] opacity-60" />
                  <div className="absolute bottom-[68%] h-24 w-24 rounded-full bg-[var(--sand)] opacity-60" />
                  <p className="relative z-10 mb-6 text-sm text-[var(--sea-ink-soft)]">Bilde kommer snart</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="island-kicker mb-3">Om meg</p>
            <h2 className="display-title mb-4 text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl">
              Anne Linn Haugen
            </h2>
            <p className="mb-3 text-[var(--sea-ink-soft)] leading-relaxed">
              Jeg er utdannet sykepleier med master i filosofi, og har i over ti år arbeidet i
              skjæringspunktet mellom omsorg og eksistensfilosofi.
            </p>
            <p className="mb-6 text-[var(--sea-ink-soft)] leading-relaxed">
              Gjennom arbeidet som sykepleier erfarte jeg at mange av de viktigste spørsmålene
              mennesker bærer på, ikke er medisinske — de er filosofiske. Det var dette som ledet
              meg til å grunnlegge Sykosofi.
            </p>
            <Button asChild>
              <Link to="/om-meg">Les mer om meg</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── BLOGG TEASER ──────────────────────────────────────── */}
      <section className="page-wrap px-4 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="island-kicker mb-2">Fra bloggen</p>
            <h2 className="display-title text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl">
              Tanker og refleksjoner
            </h2>
          </div>
          <Link
            to="/blogg"
            className="hidden text-sm font-semibold text-[var(--lagoon-deep)] no-underline hover:underline sm:block"
          >
            Se alle innlegg →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sisteInnlegg.map((post, i) => (
            <Card
              key={post.slug}
              className="rise-in transition hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="accent">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString('nb-NO', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  to="/blogg/$slug"
                  params={{ slug: post.slug }}
                  className="text-sm font-semibold text-[var(--lagoon-deep)] no-underline hover:underline"
                >
                  Les innlegget →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link to="/blogg">Se alle innlegg</Link>
          </Button>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────────────────── */}
      <section className="px-4 pb-16 pt-8">
        <div className="page-wrap">
          <div className="island-shell rounded-2xl px-8 py-10 text-center sm:px-16">
            <p className="island-kicker mb-3">Neste steg</p>
            <h2 className="display-title mb-4 text-2xl font-bold text-[var(--sea-ink)] sm:text-3xl">
              Klar for en samtale?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-[var(--sea-ink-soft)] leading-relaxed">
              Om du er nysgjerrig på filosofisk dialog, ønsker å delta på et seminar, eller bare
              vil stille et spørsmål — ta gjerne kontakt. Første samtale er gratis.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <a href="#kontakt">Ta kontakt</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/arrangementer">Se arrangementer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

