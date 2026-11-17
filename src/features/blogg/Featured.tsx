import IslandShell from "#/components/ui/IslandShell";
import { Badge } from "#/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { DisplayHeading } from "#/components/ui/DisplayHeading";
import IslandKicker from "#/components/ui/IslandKicker";
import { tinaField } from "tinacms/tina-field";
import type { Blogg } from "../../../tina/__generated__/types";
import { Button } from "#/components/ui/button";

const Featured = ({ content }: { content: Blogg }) => {
  const { coverImage, title, excerpt, date, readingTime, category, _sys } =
    content;

  return (
    <article className="mt-8">
      <Link
        to="/blogg/$slug"
        params={{ slug: _sys.filename.replace(".md", "") }}
        className="block no-underline"
      >
        <IslandShell className="motion-safe:animate-rise-in group overflow-hidden transition hover:-translate-y-0.5 grid md:grid-cols-[2fr_3fr]">
          {coverImage && (
            <div className="flex flex-col md:flex-row">
              {/* Decorative header bar */}
              <div className="h-2 md:w-2 md:h-full bg-linear-to-r md:bg-linear-to-t from-accent to-primary" />
              {/* content Image */}
              <div className="overflow-hidden">
                <img
                  src={coverImage}
                  alt={title}
                  className="w-full h-64 sm:h-80 object-cover object-bottom transition-transform duration-300 group-hover:scale-105"
                  data-tina-field={tinaField(content, "coverImage")}
                />
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8 flex flex-col">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge
                variant="accent"
                data-tina-field={tinaField(content, "category")}
              >
                {category}
              </Badge>
              <IslandKicker>Utvalgt innlegg</IslandKicker>
            </div>
            <DisplayHeading
              as="h2"
              size="lg"
              className="mb-3 group-hover:text-primary"
              data-tina-field={tinaField(content, "title")}
            >
              {title}
            </DisplayHeading>
            <p
              className="flex-1 mb-4 text-sea-ink-soft leading-relaxed"
              data-tina-field={tinaField(content, "excerpt")}
            >
              {excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-sea-ink-soft">
              <time
                dateTime={date}
                data-tina-field={tinaField(content, "date")}
              >
                {new Date(date).toLocaleDateString("nb-NO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </time>
              <span>·</span>
              <span data-tina-field={tinaField(content, "readingTime")}>
                {readingTime} min lesetid
              </span>
              <Button variant="link" className="flex-1 justify-end">
                Les innlegget →
              </Button>
            </div>
          </div>
        </IslandShell>
      </Link>
    </article>
  );
};

export default Featured;
