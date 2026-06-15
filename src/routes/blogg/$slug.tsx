import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { client } from '../../../tina/__generated__/client'
import { useTina, tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import ContentLayout from '#/components/ContentLayout'
import { generateBlogPostSchema, generateBreadcrumbSchema } from '#/lib/structured-data'

export const Route = createFileRoute('/blogg/$slug')({
  loader: async ({ params }) => {
    try {
      const [postResult, allPostsResult] = await Promise.all([
        client.queries.blogg({ relativePath: `${params.slug}.md` }),
        client.queries.bloggConnection({ sort: 'date', last: -1 }),
      ])
      return {
        post: postResult,
        allPosts: allPostsResult,
      }
    } catch (error) {
      throw notFound()
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    
    const post = loaderData.post.data.blogg
    const baseUrl = 'https://filosamtale.no' // TODO: Update with your actual domain
    const postUrl = `${baseUrl}/blogg/${params.slug}`
    
    // Extract plain text from body for description (first 160 chars)
    const bodyText = post.body?.children?.[0]?.children?.[0]?.text || ''
    const description = post.excerpt || bodyText.substring(0, 160) + '...'
    
    return {
      title: `${post.title} — Filosamtale`,
      meta: [
        { name: 'description', content: description },
        { name: 'author', content: 'Tina Maria Lie' },
        { property: 'og:title', content: post.title || '' },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: postUrl },
        { property: 'og:site_name', content: 'Filosamtale' },
        { property: 'article:published_time', content: post.date || '' },
        { property: 'article:author', content: 'Tina Maria Lie' },
        { property: 'article:section', content: post.category || '' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: post.title || '' },
        { name: 'twitter:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: postUrl }
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify([
            generateBlogPostSchema({
              title: post.title || '',
              excerpt: description,
              body: bodyText,
              date: post.date || '',
              author: 'Tina Maria Lie',
              category: post.category || '',
              url: postUrl,
            }),
            generateBreadcrumbSchema([
              { name: 'Hjem', url: baseUrl },
              { name: 'Blogg', url: `${baseUrl}/blogg` },
              { name: post.title || '', url: postUrl },
            ]),
          ]),
        },
      ],
    }
  },
  component: BloggPost,
  notFoundComponent: () => (
    <main className="page-wrap px-4 py-20 text-center">
      <h1 className="display-title text-3xl font-bold text-foreground">
        Innlegget ble ikke funnet
      </h1>
      <p className="mt-3 text-sea-ink-soft">
        Dette blogginnlegget eksisterer ikke eller er blitt fjernet.
      </p>
      <Button asChild className="mt-6">
        <Link to="/blogg">Tilbake til bloggen</Link>
      </Button>
    </main>
  ),
})

function BloggPost() {
  const initialData = Route.useLoaderData()
  
  if (!initialData) {
    return null
  }
  
  // Enable live preview for the current post
  const { data: postData } = useTina({
    query: initialData.post.query,
    variables: initialData.post.variables,
    data: initialData.post.data,
  })
  
  // Enable live preview for all posts (for sidebar)
  const { data: allPostsData } = useTina({
    query: initialData.allPosts.query,
    variables: initialData.allPosts.variables,
    data: initialData.allPosts.data,
  })
  
  const post = postData.blogg
  
  // Get other posts for sidebar
  const allPosts = (allPostsData.bloggConnection.edges || [])
    .map((edge: any) => edge?.node)
    .filter((node: any): node is NonNullable<typeof node> => node !== null)
    .filter((p: any) => p.id !== post.id)
    .slice(0, 3)

  return (
    <ContentLayout>
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-sea-ink-soft">
        <Link to="/" className="hover:text-foreground">
          Hjem
        </Link>
        <span>/</span>
        <Link to="/blogg" className="hover:text-foreground">
          Blogg
        </Link>
        <span>/</span>
        <span className="text-foreground" data-tina-field={tinaField(post, 'title')}>{post.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Article */}
        <article className="island-shell rise-in rounded-2xl p-6 sm:p-8 lg:col-span-3">
          <header className="mb-8 border-b pb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="accent" data-tina-field={tinaField(post, 'category')}>{post.category}</Badge>
              <time
                dateTime={post.date}
                className="text-sm text-sea-ink-soft"
                data-tina-field={tinaField(post, 'date')}
              >
                {new Date(post.date).toLocaleDateString('nb-NO', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
              <span className="text-sm text-sea-ink-soft">
                · <span data-tina-field={tinaField(post, 'readingTime')}>{post.readingTime}</span> min lesetid
              </span>
            </div>
            <h1 
              className="display-title text-balance text-3xl font-bold text-foreground leading-tight sm:text-4xl"
              data-tina-field={tinaField(post, 'title')}
            >
              {post.title}
            </h1>
          </header>

          {/* Body */}
          <div className="prose max-w-none prose-headings:text-foreground prose-h2:display-title prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-bold prose-h3:mb-2 prose-h3:font-semibold prose-p:mb-4 prose-p:text-sea-ink-soft prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-2 prose-li:text-sea-ink-soft prose-strong:font-semibold prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline" data-tina-field={tinaField(post, 'body')}>
            <TinaMarkdown content={post.body} />
          </div>

          <div className="mt-10 flex items-center gap-4 border-t pt-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20a8 8 0 0116 0" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-foreground">Tina Maria Lie</p>
              <p className="text-sm text-sea-ink-soft">
                Sykepleier og filosof · Fevik, Agder
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-4 lg:col-span-1">
          <div className="island-shell rounded-2xl p-5">
            <h2 className="mb-4 font-semibold text-foreground">Andre innlegg</h2>
            <ul className="space-y-4">
              {allPosts.map((p: any) => (
                <li key={p.id}>
                  <Link
                    to="/blogg/$slug"
                    params={{ slug: p._sys.filename.replace('.md', '') }}
                    className="group block no-underline"
                  >
                    <Badge variant="accent" className="mb-1">
                      {p.category}
                    </Badge>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary leading-snug">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-xs text-sea-ink-soft">
                      {p.readingTime} min lesetid
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="island-shell rounded-2xl p-5 text-center">
            <p className="mb-2 text-sm font-semibold text-foreground">
              Interessert i en samtale?
            </p>
            <p className="mb-4 text-xs text-sea-ink-soft">
              Første konsultasjon er gratis.
            </p>
            <Button asChild size="sm" className="w-full">
              <a href="#kontakt">Ta kontakt</a>
            </Button>
          </div>
        </aside>
      </div>
    </ContentLayout>
  )
}
