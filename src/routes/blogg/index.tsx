import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge } from '#/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { bloggPosts } from '#/data/blogg'

export const Route = createFileRoute('/blogg/')({ component: Blogg })

function Blogg() {
  const featured = bloggPosts[0]!
  const rest = bloggPosts.slice(1)

  return (
    <main className="page-wrap px-4 py-12">
      {/* Header */}
      <section className="island-shell rise-in relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.22),transparent_66%)]" />
        <p className="island-kicker mb-3">Blogg</p>
        <h1 className="display-title mb-4 max-w-2xl text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Tanker og refleksjoner
        </h1>
        <p className="max-w-xl text-[var(--sea-ink-soft)] leading-relaxed">
          Her skriver jeg om filosofi, livets store spørsmål og erfaringer fra ti år i
          skjæringspunktet mellom sykepleie og filosofi.
        </p>
      </section>

      {/* Featured post */}
      <article className="mt-8">
        <Link
          to="/blogg/$slug"
          params={{ slug: featured.slug }}
          className="block no-underline"
        >
          <div className="island-shell rise-in group overflow-hidden rounded-2xl transition hover:-translate-y-0.5">
            {/* Decorative header bar */}
            <div className="h-2 bg-gradient-to-r from-[var(--lagoon)] to-[var(--palm)]" />
            <div className="p-6 sm:p-8 lg:grid lg:grid-cols-5 lg:gap-8">
              <div className="lg:col-span-3">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant="accent">{featured.category}</Badge>
                  <span className="island-kicker">Utvalgt innlegg</span>
                </div>
                <h2 className="display-title mb-3 text-2xl font-bold text-[var(--sea-ink)] group-hover:text-[var(--palm)] sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mb-4 text-[var(--sea-ink-soft)] leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-[var(--sea-ink-soft)]">
                  <time dateTime={featured.date}>
                    {new Date(featured.date).toLocaleDateString('nb-NO', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  <span>·</span>
                  <span>{featured.readingTime} min lesetid</span>
                </div>
              </div>
              <div className="mt-4 flex items-end justify-end lg:col-span-2 lg:mt-0">
                <span className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)] transition group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  Les innlegget →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>

      {/* All other posts */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, i) => (
          <Link
            key={post.slug}
            to="/blogg/$slug"
            params={{ slug: post.slug }}
            className="no-underline"
          >
            <Card
              className="h-full transition hover:-translate-y-1"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <CardHeader>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <Badge variant="accent">{post.category}</Badge>
                  <time
                    dateTime={post.date}
                    className="text-xs text-muted-foreground"
                  >
                    {new Date(post.date).toLocaleDateString('nb-NO', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </time>
                </div>
                <CardTitle className="text-lg leading-snug hover:text-[var(--palm)]">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-xs text-[var(--sea-ink-soft)]">
                  {post.readingTime} min lesetid
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
