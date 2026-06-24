import ContentLayout from "#/components/ContentLayout";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";
import type { BloggConnectionQuery, BloggQuery } from "../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/tina-field";
import IslandShell from "#/components/ui/IslandShell";

const BloggInnlegg = ({
  postData,
  allPostsData,
}: {
  postData: BloggQuery;
  allPostsData: BloggConnectionQuery;
}) => {
  const post = postData.blogg;

  // Get other posts for sidebar
  const allPosts = (allPostsData.bloggConnection.edges || [])
    .map((edge: any) => edge?.node)
    .filter((node: any): node is NonNullable<typeof node> => node !== null)
    .filter((p: any) => p.id !== post.id)
    .slice(0, 3);

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
        <span
          className="text-foreground"
          data-tina-field={tinaField(post, "title")}
        >
          {post.title}
        </span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Article */}
        <IslandShell className="rise-in  p-6 sm:p-8 lg:col-span-3">
        <article>
          <header className="mb-8 border-b pb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge
                variant="accent"
                data-tina-field={tinaField(post, "category")}
              >
                {post.category}
              </Badge>
              <time
                dateTime={post.date}
                className="text-sm text-sea-ink-soft"
                data-tina-field={tinaField(post, "date")}
              >
                {new Date(post.date).toLocaleDateString("nb-NO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="text-sm text-sea-ink-soft">
                ·{" "}
                <span data-tina-field={tinaField(post, "readingTime")}>
                  {post.readingTime}
                </span>{" "}
                min lesetid
              </span>
            </div>
            <h1
              className="display-title text-balance text-3xl font-bold text-foreground leading-tight sm:text-4xl"
              data-tina-field={tinaField(post, "title")}
            >
              {post.title}
            </h1>
          </header>

          {/* Body */}
          <div
            className="prose max-w-none prose-headings:text-foreground prose-h2:display-title prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-bold prose-h3:mb-2 prose-h3:font-semibold prose-p:mb-4 prose-p:text-sea-ink-soft prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-2 prose-li:text-sea-ink-soft prose-strong:font-semibold prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            data-tina-field={tinaField(post, "body")}
          >
            <TinaMarkdown content={post.body} />
          </div>

          <div className="mt-10 flex items-center gap-4 border-t pt-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
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
        </IslandShell>

        {/* Sidebar */}
        <aside className="space-y-4 lg:col-span-1">
          <IslandShell className="p-5">
            <h2 className="mb-4 font-semibold text-foreground">
              Andre innlegg
            </h2>
            <ul className="space-y-4">
              {allPosts.map((p: any) => (
                <li key={p.id}>
                  <Link
                    to="/blogg/$slug"
                    params={{ slug: p._sys.filename.replace(".md", "") }}
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
          </IslandShell>

          <IslandShell className="p-5 text-center">
            <p className="mb-2 text-sm font-semibold text-foreground">
              Interessert i en samtale?
            </p>
            <p className="mb-4 text-xs text-sea-ink-soft">
              Første konsultasjon er gratis.
            </p>
            <Button asChild size="sm" className="w-full">
              <a href="#kontakt">Ta kontakt</a>
            </Button>
          </IslandShell>
        </aside>
      </div>
    </ContentLayout>
  );
};

export default BloggInnlegg;