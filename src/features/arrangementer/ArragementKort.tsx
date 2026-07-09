import { Badge } from "#/components/ui/badge";
import IslandShell from "#/components/ui/IslandShell";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/tina-field";
import { Button } from "#/components/ui/button";

function ArrangementKort({
  arr,
  onImageClick,
  categoryLabels = {
    seminar: "Seminar",
    gruppe: "Gruppe",
    kurs: "Kurs",
    dialog: "Dialog",
  },
  isPast = false,
}: {
  arr: any;
  onImageClick?: (imageUrl: string) => void;
  categoryLabels?: Record<string, string>;
  isPast?: boolean;
}) {
  const categoryValue =
    arr.category && typeof arr.category === "object"
      ? arr.category.value
      : arr.category;
  const category = categoryValue || "dialog";
  const eventDate = new Date(arr.date);

  return (
    <IslandShell className={isPast ? "opacity-60" : ""}>
      <article className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[280px_1fr]">
        {/* Image with date overlay - left on desktop, top on mobile */}
        <div className="relative overflow-hidden rounded-lg order-first">
          {arr.image ? (
            <>
              <img
                src={arr.image}
                alt={arr.title}
                className="w-full h-48 lg:h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                data-tina-field={tinaField(arr, "image")}
                onClick={() => arr.image && onImageClick?.(arr.image)}
              />
              {/* Date overlay */}
              <div className="absolute top-4 left-4 bg-surface-strong backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground leading-none">
                    {eventDate.getDate()}
                  </div>
                  <div className="text-xs text-sea-ink-soft uppercase mt-0.5">
                    {eventDate.toLocaleDateString("nb-NO", {
                      month: "short",
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-48 lg:h-full bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-3xl font-bold text-foreground leading-none mb-1">
                  {eventDate.getDate()}
                </div>
                <div className="text-sm text-sea-ink-soft">
                  {eventDate.toLocaleDateString("nb-NO", {
                    month: "long",
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Event details */}
        <div className="flex flex-col">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge
              variant={isPast ? "secondary" : "accent"}
              data-tina-field={tinaField(arr, "category")}
            >
              {categoryLabels[category]}
            </Badge>
            {arr.isOnline && (
              <Badge variant="outline">Online</Badge>
            )}
            {isPast && (
              <Badge variant="secondary">Avholdt</Badge>
            )}
          </div>

          <h3
            className="display-title text-2xl text-balance font-bold text-foreground mb-2"
            data-tina-field={tinaField(arr, "title")}
          >
            {arr.title}
          </h3>

          <div className="mb-4 space-y-1 text-sm text-sea-ink-soft">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 16 16"
                width="14"
                height="14"
                fill="currentColor"
              >
                <path d="M5.5 7a1 1 0 100-2 1 1 0 000 2zm5 0a1 1 0 100-2 1 1 0 000 2zM8 9a4 4 0 00-3.5 2H11A3.99 3.99 0 008 9zm6-1.5V14a2 2 0 01-2 2H4a2 2 0 01-2-2V7.5A2 2 0 014 5.5h8a2 2 0 012 2zM3 1.5v1h10v-1a.5.5 0 00-.5-.5h-9a.5.5 0 00-.5.5z" />
              </svg>
              <time
                dateTime={arr.date}
                data-tina-field={tinaField(arr, "date")}
              >
                {eventDate.toLocaleDateString("nb-NO", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
            {arr.time && (
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="currentColor"
                >
                  <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 14A6 6 0 108 2a6 6 0 000 12zm.5-10v4.5H11V10H9V4h-.5z" />
                </svg>
                <span data-tina-field={tinaField(arr, "time")}>
                  {arr.time}
                </span>
              </div>
            )}
            {arr.location && (
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="currentColor"
                >
                  <path d="M8 0a5 5 0 00-5 5c0 3.5 5 11 5 11s5-7.5 5-11a5 5 0 00-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
                <span data-tina-field={tinaField(arr, "location")}>
                  {arr.location}
                </span>
              </div>
            )}
            {arr.price !== undefined && arr.price !== null && (
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="currentColor"
                >
                  <path d="M2 4h12a2 2 0 012 2v6a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v6h12V6H2zm6 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </svg>
                <span data-tina-field={tinaField(arr, "price")}>
                  {arr.price === 0 ? "Gratis" : `${arr.price} kr`}
                </span>
              </div>
            )}
          </div>

          {arr.description && (
            <div
              className="flex-1 text-sm text-sea-ink-soft leading-relaxed prose dark:prose-invert prose-sm max-w-none mb-4"
              data-tina-field={tinaField(arr, "description")}
            >
              <TinaMarkdown content={arr.description} />
            </div>
          )}

          {!isPast && (
            <div className="mt-auto flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={`?message=${encodeURIComponent(`Hei! Jeg ønsker å være med på arrangementet "${arr.title}".`)}#kontakt`}
                >
                  Meld interesse
                </a>
              </Button>
              {arr.registrationUrl && (
                <Button asChild variant="outline">
                  <a
                    href={arr.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-tina-field={tinaField(arr, "registrationUrl")}
                  >
                    Ekstern påmelding
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </article>
    </IslandShell>
  );
}

export default ArrangementKort;
