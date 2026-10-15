import { Button } from "#/components/ui/button";
import { DisplayHeading } from "#/components/ui/DisplayHeading";
import IslandKicker from "#/components/ui/IslandKicker";
import IslandShell from "#/components/ui/IslandShell";
import { Link } from "@tanstack/react-router";
import type { BloggConnectionQuery, PagesHomepage } from "../../../tina/__generated__/types";
import { tinaField } from "tinacms/tina-field";
import { CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import { OptimizedImage } from "#/components/ui/OptimizedImage";
import { Badge } from "#/components/ui/badge";

const BloggTeaser = ({ page, data }: { page: PagesHomepage; data: BloggConnectionQuery }) => {
  // Extract blog posts
  const allBloggPosts = (data.bloggConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const sisteInnlegg = allBloggPosts.slice(0, 3);

  return (
    <section className="py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <IslandKicker className="mb-2">Fra bloggen</IslandKicker>
          <DisplayHeading
            as="h2"
            size="xl"
            data-tina-field={tinaField(page, "blogHeading")}
          >
            {page.blogHeading || "Tanker og refleksjoner"}
          </DisplayHeading>
        </div>
        <Link
          to="/blogg"
          className="hidden text-sm font-semibold text-lagoon-deep no-underline hover:underline sm:block"
        >
          Se alle innlegg →
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sisteInnlegg.map((post, i) => (
          <IslandShell
            key={post.id}
            className="rise-in group cursor-pointer flex flex-col overflow-hidden"
            style={{ animationDelay: `${i * 100}ms` }}
            isFeature
          >
            <Link
              to="/blogg/$slug"
              params={{ slug: post._sys.filename.replace(".md", "") }}
              className="flex flex-col h-full"
            >
              {post.coverImage && (
                <div className="overflow-hidden">
                  <OptimizedImage
                    src={post.coverImage}
                    defaultWidth={640}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    data-tina-field={tinaField(post, "coverImage")}
                  />
                </div>
              )}
              <CardHeader className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Badge
                    variant="accent"
                    data-tina-field={tinaField(post, "category")}
                  >
                    {post.category}
                  </Badge>
                  <span
                    className="text-xs text-muted-foreground"
                    data-tina-field={tinaField(post, "date")}
                  >
                    {new Date(post.date).toLocaleDateString("nb-NO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </span>
                </div>
                <CardTitle
                  className="text-lg leading-snug text-balance"
                  data-tina-field={tinaField(post, "title")}
                >
                  {post.title}
                </CardTitle>
                <CardDescription
                  className="line-clamp-4 leading-relaxed"
                  data-tina-field={tinaField(post, "excerpt")}
                >
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold text-lagoon-deep no-underline group-hover:underline">
                  Les innlegget →
                </p>
              </CardContent>
            </Link>
          </IslandShell>
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Button asChild variant="outline">
          <Link to="/blogg">Se alle innlegg</Link>
        </Button>
      </div>
    </section>
  );
};

export default BloggTeaser;
