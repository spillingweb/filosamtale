import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { bloggPosts } from '#/data/blogg'

export const Route = createFileRoute('/blogg/$slug')({
  loader: ({ params }) => {
    const post = bloggPosts.find((p) => p.slug === params.slug)
    if (!post) throw notFound()
    return post
  },
  component: BloggPost,
  notFoundComponent: () => (
    <main className="page-wrap px-4 py-20 text-center">
      <h1 className="display-title text-3xl font-bold text-[var(--sea-ink)]">
        Innlegget ble ikke funnet
      </h1>
      <p className="mt-3 text-[var(--sea-ink-soft)]">
        Dette blogginnlegget eksisterer ikke eller er blitt fjernet.
      </p>
      <Button asChild className="mt-6">
        <Link to="/blogg">Tilbake til bloggen</Link>
      </Button>
    </main>
  ),
})

function BloggPost() {
  const post = Route.useLoaderData()
  const andre = bloggPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <main className="page-wrap px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--sea-ink-soft)]">
        <Link to="/" className="hover:text-[var(--sea-ink)]">
          Hjem
        </Link>
        <span>/</span>
        <Link to="/blogg" className="hover:text-[var(--sea-ink)]">
          Blogg
        </Link>
        <span>/</span>
        <span className="text-[var(--sea-ink)]">{post.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Article */}
        <article className="island-shell rise-in rounded-2xl p-6 sm:p-8 lg:col-span-3">
          <header className="mb-8 border-b border-[var(--line)] pb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="accent">{post.category}</Badge>
              <time
                dateTime={post.date}
                className="text-sm text-[var(--sea-ink-soft)]"
              >
                {new Date(post.date).toLocaleDateString('nb-NO', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
              <span className="text-sm text-[var(--sea-ink-soft)]">
                · {post.readingTime} min lesetid
              </span>
            </div>
            <h1 className="display-title text-3xl font-bold text-[var(--sea-ink)] leading-tight sm:text-4xl">
              {post.title}
            </h1>
          </header>

          {/* Body — rendered as simple paragraphs; TinaCMS will provide rich text */}
          <div className="prose prose-slate max-w-none">
            {post.body.split(/\n\n+/).map((paragraph, i) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h2
                    key={i}
                    className="display-title mt-8 mb-3 text-xl font-bold text-[var(--sea-ink)]"
                  >
                    {paragraph.replace(/\*\*/g, '')}
                  </h2>
                )
              }
              if (paragraph.startsWith('**')) {
                const parts = paragraph.split(/\*\*(.*?)\*\*/g)
                return (
                  <p key={i} className="mb-4 text-[var(--sea-ink-soft)] leading-relaxed">
                    {parts.map((part, j) =>
                      j % 2 === 1 ? (
                        <strong key={j} className="font-semibold text-[var(--sea-ink)]">
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                )
              }
              return (
                <p key={i} className="mb-4 text-[var(--sea-ink-soft)] leading-relaxed">
                  {paragraph}
                </p>
              )
            })}
          </div>

          <div className="mt-10 flex items-center gap-4 border-t border-[var(--line)] pt-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[var(--palm)]">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20a8 8 0 0116 0" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-[var(--sea-ink)]">Anne Linn Haugen</p>
              <p className="text-sm text-[var(--sea-ink-soft)]">
                Sykepleier og filosof · Fevik, Agder
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-4 lg:col-span-1">
          <div className="island-shell rounded-2xl p-5">
            <h2 className="mb-4 font-semibold text-[var(--sea-ink)]">Andre innlegg</h2>
            <ul className="space-y-4">
              {andre.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/blogg/$slug"
                    params={{ slug: p.slug }}
                    className="group block no-underline"
                  >
                    <Badge variant="accent" className="mb-1">
                      {p.category}
                    </Badge>
                    <p className="text-sm font-medium text-[var(--sea-ink)] group-hover:text-[var(--palm)] leading-snug">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--sea-ink-soft)]">
                      {p.readingTime} min lesetid
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="island-shell rounded-2xl p-5 text-center">
            <p className="mb-2 text-sm font-semibold text-[var(--sea-ink)]">
              Interessert i en samtale?
            </p>
            <p className="mb-4 text-xs text-[var(--sea-ink-soft)]">
              Første konsultasjon er gratis.
            </p>
            <Button asChild size="sm" className="w-full">
              <a href="#kontakt">Ta kontakt</a>
            </Button>
          </div>
        </aside>
      </div>
    </main>
  )
}
