import ContentLayout from "#/components/ContentLayout";
import PageHeader from "#/components/PageHeader";
import { tinaField } from "tinacms/tina-field";
import type { BloggConnectionQuery, PagesQuery } from "../../../tina/__generated__/types";
import { Link } from "@tanstack/react-router";
import { Badge } from "#/components/ui/badge";
import IslandKicker from "#/components/ui/IslandKicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import IslandShell from "#/components/ui/IslandShell";

const Blogg = ({ pageData, bloggData }: { pageData: PagesQuery; bloggData: BloggConnectionQuery }) => {
    
  const page = pageData.pages
  
  // Type guard: ensure we have header template
  if (page.__typename !== 'PagesHeader') {
    throw new Error('Expected header template for blogg.md')
  }
  
  // Extract posts from connection
  const posts = (bloggData.bloggConnection.edges || [])
    .map(edge => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  const featured = posts[0]
  const rest = posts.slice(1)
  
  if (!featured) {
    return <ContentLayout><p>Ingen blogginnlegg funnet.</p></ContentLayout>
  }

  return (
    <ContentLayout>
      {/* Header */}
      <PageHeader
        pageName="Blogg"
        title={page.title}
        description={page.intro || ''}
        tinaFields={{
          title: tinaField(page, 'title'),
          description: tinaField(page, 'intro'),
        }}
      />

      {/* Featured post */}
      <article className="mt-8">
        <Link
          to="/blogg/$slug"
          params={{ slug: featured._sys.filename.replace('.md', '') }}
          className="block no-underline"
        >
          <IslandShell className="rise-in group overflow-hidden transition hover:-translate-y-0.5">
            {/* Decorative header bar */}
            <div className="h-2 bg-linear-to-r from-accent to-primary" />
            <div className="p-6 sm:p-8 lg:grid lg:grid-cols-5 lg:gap-8">
              <div className="lg:col-span-3">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant="accent" data-tina-field={tinaField(featured, 'category')}>{featured.category}</Badge>
                  <IslandKicker>Utvalgt innlegg</IslandKicker >
                </div>
                <h2 
                  className="display-title mb-3 text-2xl font-bold text-foreground group-hover:text-primary sm:text-3xl"
                  data-tina-field={tinaField(featured, 'title')}
                >
                  {featured.title}
                </h2>
                <p 
                  className="mb-4 text-sea-ink-soft leading-relaxed"
                  data-tina-field={tinaField(featured, 'excerpt')}
                >
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-sea-ink-soft">
                  <time dateTime={featured.date} data-tina-field={tinaField(featured, 'date')}>
                    {new Date(featured.date).toLocaleDateString("nb-NO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span data-tina-field={tinaField(featured, 'readingTime')}>{featured.readingTime} min lesetid</span>
                </div>
              </div>
              <div className="mt-4 flex items-end justify-end lg:col-span-2 lg:mt-0">
                <span className="rounded-full border border-chip-line bg-chip-bg px-4 py-2 text-sm font-semibold text-lagoon-deep transition group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  Les innlegget →
                </span>
              </div>
            </div>
          </IslandShell>
        </Link>
      </article>

      {/* All other posts */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, i) => (
          <Link
            key={post.id}
            to="/blogg/$slug"
            params={{ slug: post._sys.filename.replace('.md', '') }}
            className="no-underline"
          >
            <Card
              className="h-full transition hover:-translate-y-1"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <CardHeader>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <Badge variant="accent" data-tina-field={tinaField(post, 'category')}>{post.category}</Badge>
                  <time
                    dateTime={post.date}
                    className="text-xs text-muted-foreground"
                    data-tina-field={tinaField(post, 'date')}
                  >
                    {new Date(post.date).toLocaleDateString("nb-NO", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <CardTitle 
                  className="text-lg leading-snug hover:text-primary"
                  data-tina-field={tinaField(post, 'title')}
                >
                  {post.title}
                </CardTitle>
                <CardDescription 
                  className="line-clamp-3 leading-relaxed"
                  data-tina-field={tinaField(post, 'excerpt')}
                >
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-xs text-sea-ink-soft" data-tina-field={tinaField(post, 'readingTime')}>
                  {post.readingTime} min lesetid
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </ContentLayout>
  );
}

export default Blogg;