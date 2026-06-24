import { Badge } from "#/components/ui/badge";
import IslandShell from "#/components/ui/IslandShell";
import { cn, formatDate } from "#/lib/utils";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/tina-field";
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Users,
  Globe,
} from "lucide-react";
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
}: {
  arr: any;
  onImageClick?: (imageUrl: string) => void;
  categoryLabels?: Record<string, string>;
}) {
  const categoryValue =
    arr.category && typeof arr.category === "object"
      ? arr.category.value
      : arr.category;
  const category = categoryValue || "dialog";

  // Extract date parts
  const eventDate = new Date(arr.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleDateString("nb-NO", { month: "short" });
  const year = eventDate.getFullYear();

  return (
    <IslandShell>
      <article className="overflow-hidden @container">
        <div
          className={`h-1.5 ${
            category === "seminar"
              ? "bg-primary"
              : category === "gruppe"
                ? "bg-accent"
                : category === "kurs"
                  ? "bg-lagoon-deep"
                  : "bg-sea-ink-soft"
          }`}
        />
        <div className="p-6 flex flex-col gap-3 h-full">
          <div className="flex flex-row gap-6">
            {/* Date badge - prominently displayed */}
            <div className="shrink-0 flex @md:flex-col gap-4 @md:gap-0">
              <div
                className={cn(
                  "relative rounded-xl px-5 py-4 @md:w-24 text-center shadow-md border-2 transition-transform group-hover:scale-105",
                  category === "seminar" && "bg-primary/10 border-primary/30",
                  category === "gruppe" && "bg-accent/10 border-accent/30",
                  category === "kurs" &&
                    "bg-lagoon-deep/10 border-lagoon-deep/30",
                  category === "dialog" &&
                    "bg-sea-ink-soft/10 border-sea-ink-soft/30",
                )}
                data-tina-field={tinaField(arr, "date")}
              >
                <div className="text-3xl font-bold text-foreground leading-none">
                  {day}
                </div>
                <div className="text-xs font-semibold uppercase text-foreground/70 mt-1 tracking-wide">
                  {month}
                </div>
                <div className="text-xs text-foreground/60 mt-0.5">{year}</div>
              </div>
            </div>

            {/* Event details */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    category === "seminar"
                      ? "default"
                      : category === "gruppe"
                        ? "accent"
                        : "secondary"
                  }
                  data-tina-field={tinaField(arr, "category")}
                >
                  {categoryLabels[category]}
                </Badge>
                {arr.isOnline && (
                  <Badge
                    variant="outline"
                    data-tina-field={tinaField(arr, "isOnline")}
                  >
                    <Globe className="w-3 h-3 mr-1" />
                    Online
                  </Badge>
                )}
                {arr.price === 0 && (
                  <Badge
                    variant="secondary"
                    data-tina-field={tinaField(arr, "price")}
                  >
                    Gratis
                  </Badge>
                )}
              </div>
              <h2
                className="display-title text-xl font-bold text-foreground text-balance"
                data-tina-field={tinaField(arr, "title")}
              >
                {arr.title}
              </h2>
            </div>
          </div>
          <div
            className="flex-1 text-sm text-sea-ink-soft leading-relaxed prose prose-sm max-w-none"
            data-tina-field={tinaField(arr, "description")}
          >
            <TinaMarkdown content={arr.description} />
          </div>
          <div
            className={cn(arr.image && "grid @md:grid-cols-[auto_10rem] gap-6")}
          >
            <div className="flex-1 min-w-50">
              <dl className="grid gap-y-1.5 text-sm">
                <div className="flex items-start gap-2">
                  <dt className="flex items-center gap-1 font-medium text-foreground shrink-0">
                    <Calendar className="w-4 h-4 text-accent" />
                    Dato:
                  </dt>
                  <dd
                    className="text-sea-ink-soft"
                    data-tina-field={tinaField(arr, "date")}
                  >
                    {formatDate(arr.date)}
                    {arr.endDate ? ` – ${formatDate(arr.endDate)}` : ""}
                  </dd>
                </div>
                <div className="flex items-start gap-2">
                  <dt className="flex items-center gap-1 font-medium text-foreground shrink-0">
                    <Clock className="w-4 h-4 text-accent" />
                    Tid:
                  </dt>
                  <dd
                    className="text-sea-ink-soft"
                    data-tina-field={tinaField(arr, "time")}
                  >
                    {arr.time}
                  </dd>
                </div>
                <div className="flex items-start gap-2">
                  <dt className="flex items-center gap-1 font-medium text-foreground shrink-0">
                    <MapPin className="w-4 h-4 text-accent" />
                    Sted:
                  </dt>
                  <dd
                    className="text-sea-ink-soft"
                    data-tina-field={tinaField(arr, "location")}
                  >
                    {arr.location}
                  </dd>
                </div>
                <div className="flex items-start gap-2">
                  <dt className="flex items-center gap-1 font-medium text-foreground shrink-0">
                    <CreditCard className="w-4 h-4 text-accent" />
                    Pris:
                  </dt>
                  <dd
                    className="text-sea-ink-soft"
                    data-tina-field={tinaField(arr, "price")}
                  >
                    {arr.price === 0 ? "Gratis" : `${arr.price} kr`}
                  </dd>
                </div>
                {arr.capacity && (
                  <div className="flex items-start gap-2">
                    <dt className="flex items-center gap-1 font-medium text-foreground shrink-0">
                      <Users className="w-4 h-4 text-accent" />
                      Kapasitet:
                    </dt>
                    <dd
                      className="text-sea-ink-soft"
                      data-tina-field={tinaField(arr, "capacity")}
                    >
                      {arr.capacity} plasser
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {arr.image && (
              <div className="shrink-0 justify-self-center @md:justify-self-end">
                <img
                  src={arr.image}
                  alt={arr.title}
                  className="w-48 h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  data-tina-field={tinaField(arr, "image")}
                  onClick={() => arr.image && onImageClick?.(arr.image)}
                />
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="sm">
              <a href="#kontakt">Meld interesse</a>
            </Button>
            {arr.capacity && arr.capacity <= 12 && (
              <span className="text-xs text-sea-ink-soft">
                Begrenset antall plasser
              </span>
            )}
          </div>
        </div>
      </article>
    </IslandShell>
  );
}

export default ArrangementKort;
