import { defineEventHandler } from 'h3'
import { client } from '../../tina/__generated__/client'

export default defineEventHandler(async () => {
  const baseUrl = 'https://filosamtale.no' // TODO: Update with your actual domain

  try {
    // Fetch all content
    const [bloggResult, arrangementerResult] = await Promise.all([
      client.queries.bloggConnection(),
      client.queries.arrangementerConnection(),
    ])

    const blog = (bloggResult.data.bloggConnection.edges || [])
      .map((edge: any) => edge?.node)
      .filter((node: any) => node !== null)

    const events = (arrangementerResult.data.arrangementerConnection.edges || [])
      .map((edge: any) => edge?.node)
      .filter((node: any) => node !== null)

    // Static pages
    const staticPages = [
      {
        url: `${baseUrl}/`,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: undefined,
      },
      {
        url: `${baseUrl}/om-meg`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: undefined,
      },
      {
        url: `${baseUrl}/tjenester`,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: undefined,
      },
      {
        url: `${baseUrl}/blogg`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: undefined,
      },
      {
        url: `${baseUrl}/arrangementer`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: undefined,
      },
      {
        url: `${baseUrl}/kontakt`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: undefined,
      },
    ]

    // Blog posts
    const blogPages = blog.map((post: any) => ({
      url: `${baseUrl}/blogg/${post._sys.filename.replace('.md', '')}`,
      lastmod: post.date,
      changefreq: 'monthly',
      priority: 0.7,
    }))

    // Events
    const eventPages = events.map((event: any) => ({
      url: `${baseUrl}/arrangementer#${event._sys.filename.replace('.md', '')}`,
      lastmod: event.date,
      changefreq: 'weekly',
      priority: 0.6,
    }))

    const allPages = [...staticPages, ...blogPages, ...eventPages]

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

    // Return XML with proper content type
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    throw error
  }
})
