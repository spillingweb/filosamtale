import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { client } from '../../../tina/__generated__/client'
import { useTina } from 'tinacms/dist/react'
import { generateBlogPostSchema, generateBreadcrumbSchema } from '#/lib/structured-data'
import BloggInnlegg from '#/features/blogg/BloggInnlegg'

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
  component: RouteComponent,
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

function RouteComponent() {
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
  
  return <BloggInnlegg postData={postData} allPostsData={allPostsData} />
}
