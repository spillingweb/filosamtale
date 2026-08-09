import { Badge } from "#/components/ui/badge";
import { DisplayHeading } from "#/components/ui/DisplayHeading";
import IslandShell from "#/components/ui/IslandShell";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/tina-field";
import { Button } from "#/components/ui/button";
import { Banknote, Calendar, Clock, MapPin } from "lucide-react";

function ArrangementKort({
  arr,
  categoryLabels,
  isPast = false,
}: {
  arr: any;
  onImageClick?: (imageUrl: string) => void;
  categoryLabels?: Record<string, string>;
  isPast?: boolean;
}) {
  const categoryValue =
    arr.kategorier && typeof arr.kategorier === "object"
      ? arr.kategorier.value
      : arr.kategorier;
  const category = categoryValue || "dialog";
  const eventDate = new Date(arr.date);

  return (
    <IslandShell className={isPast ? "opacity-60" : ""}>
      <article className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[280px_1fr] group">
        {/* Image with date overlay - left on desktop, top on mobile */}
        <div className="relative overflow-hidden rounded-lg order-first">
          {arr.image ? (
            <>
              <img
                src={arr.image}
                alt={arr.title}
                className="w-full h-48 lg:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                data-tina-field={tinaField(arr, "image")}
              />
              {/* Date overlay */}
              <div className="absolute top-4 left-4 bg-card backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-border">
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
              {categoryLabels && categoryLabels[category]}
            </Badge>
            {arr.isOnline && <Badge variant="outline">Online</Badge>}
            {isPast && <Badge variant="secondary">Avholdt</Badge>}
          </div>

          <DisplayHeading
            as="h3"
            size="base"
            className="text-balance mb-2"
            data-tina-field={tinaField(arr, "title")}
          >
            {arr.title}
          </DisplayHeading>

          <div className="mb-4 space-y-1 text-sm text-sea-ink-soft">
            <div className="flex items-center gap-2">
             <Calendar className="w-4 h-4" />
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
                <Clock className="w-4 h-4" />
                <span data-tina-field={tinaField(arr, "time")}>{arr.time}</span>
              </div>
            )}
            {arr.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span data-tina-field={tinaField(arr, "location")}>
                  {arr.location}
                </span>
              </div>
            )}
            {arr.price !== undefined && arr.price !== null && (
              <div className="flex items-center gap-2">
               <Banknote className="w-4 h-4" />
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
