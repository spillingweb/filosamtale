import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { Dialog, DialogContent } from "#/components/ui/dialog";
import PageHeader from "#/components/PageHeader";
import ContentLayout from "#/components/ContentLayout";
import { client } from "../../../tina/__generated__/client";
import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useState } from "react";
import { cn } from "#/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Users,
  Globe,
} from "lucide-react";
import { generateEventSchema } from "#/lib/structured-data";

export const Route = createFileRoute("/arrangementer/")({
  loader: async () => {
    const [arrangementerResult, pageResult] = await Promise.all([
      client.queries.arrangementerConnection({ sort: "date" }),
      client.queries.pages({ relativePath: "arrangementer.md" }),
    ]);
    return {
      arrangementer: arrangementerResult,
      page: pageResult,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    
    const baseUrl = 'https://filosamtale.no'
    const events = (loaderData.arrangementer.data.arrangementerConnection.edges || [])
      .map((edge: any) => edge?.node)
      .filter((node: any) => node !== null)
    
    return {
      title: 'Arrangementer — Seminarer, kurs og samtalegrupper — Filosamtale',
      meta: [
        { name: 'description', content: 'Kommende arrangementer hos Filosamtale. Bli med på filosofiske samtaler, seminarer og workshops i Fevik og på nett.' },
        { property: 'og:title', content: 'Arrangementer — Filosamtale' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${baseUrl}/arrangementer` },
      ],
      links: [
        { rel: 'canonical', href: `${baseUrl}/arrangementer` }
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            events.map((event: any) => {
              if (!event) return null
              return generateEventSchema({
                name: event.title || '',
                description: event.description || '',
                startDate: event.date || '',
                location: event.location || 'Fevik',
                eventType: event.category || 'Event',
                price: event.price,
                maxParticipants: event.capacity,
                url: `${baseUrl}/arrangementer#${event._sys.filename.replace('.md', '')}`,
              })
            }).filter(Boolean)
          ),
        },
      ],
    }
  },
  component: Arrangementer,
});

const categoryLabels: Record<string, string> = {
  seminar: "Seminar",
  gruppe: "Gruppe",
  kurs: "Kurs",
  dialog: "Dialog",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ArrangementKort({
  arr,
  onImageClick,
}: {
  arr: any;
  onImageClick?: (imageUrl: string) => void;
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
    <article className="island-shell rounded-2xl overflow-hidden @container">
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
              <Calendar className="absolute top-2 right-2 w-3.5 h-3.5 text-foreground/40" />
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
              className="display-title text-xl font-bold text-foreground"
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
  );
}

function Arrangementer() {
  const initialData = Route.useLoaderData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Enable live preview for arrangementer
  const { data: arrangementerData } = useTina({
    query: initialData.arrangementer.query,
    variables: initialData.arrangementer.variables,
    data: initialData.arrangementer.data,
  });

  // Enable live preview for page header
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  const page = pageData.pages;

  // Type guard: ensure we have header template
  if (page.__typename !== "PagesHeader") {
    throw new Error("Expected header template for arrangementer.md");
  }

  // Extract arrangementer from connection
  const alleArrangementer = (
    arrangementerData.arrangementerConnection.edges || []
  )
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const now = new Date();
  const kommende = alleArrangementer.filter((arr) => new Date(arr.date) >= now);
  const tidligere = alleArrangementer.filter((arr) => new Date(arr.date) < now);

  return (
    <ContentLayout>
      {/* Header */}
      <PageHeader
        pageName="Arrangementer"
        title={page.title}
        description={page.intro || ""}
        tinaFields={{
          title: tinaField(page, "title"),
          description: tinaField(page, "intro"),
        }}
      />

      {/* Upcoming events */}
      <section className="mt-8">
        <h2 className="mb-5 text-xl font-semibold text-foreground">
          Kommende ({kommende.length})
        </h2>
        {kommende.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {kommende.map((arr) => (
              <ArrangementKort
                key={arr.id}
                arr={arr}
                onImageClick={setSelectedImage}
              />
            ))}
          </div>
        ) : (
          <p className="text-sea-ink-soft">
            Ingen kommende arrangementer for øyeblikket.
          </p>
        )}
      </section>

      {/* Newsletter strip */}
      <section className="island-shell mt-10 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="island-kicker mb-1">
              Aldri gå glipp av et arrangement
            </p>
            <p className="text-sea-ink-soft">
              Send meg en e-post for å bli varslet om nye seminarer og grupper.
            </p>
          </div>
          <Button asChild className="shrink-0">
            <a href="mailto:filosamtale@gmail.com?subject=Varslinger om arrangementer">
              Bli varslet
            </a>
          </Button>
        </div>
      </section>

      {/* Past events */}
      {tidligere.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 text-xl font-semibold text-foreground">
            Tidligere arrangementer
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 opacity-70">
            {tidligere.map((arr) => {
              const categoryValue =
                typeof arr.category === "object" && arr.category !== null
                  ? (arr.category as any)?.value
                  : arr.category;
              const category = categoryValue || "dialog";
              return (
                <article
                  key={arr.id}
                  className="island-shell rounded-2xl overflow-hidden"
                >
                  <div className="flex gap-4 p-5">
                    <div className="flex-1 min-w-0">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          data-tina-field={tinaField(arr, "category")}
                        >
                          {categoryLabels[category]}
                        </Badge>
                        <time
                          className="text-xs text-sea-ink-soft"
                          dateTime={arr.date}
                          data-tina-field={tinaField(arr, "date")}
                        >
                          {new Date(arr.date).toLocaleDateString("nb-NO", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <h3
                        className="font-semibold text-foreground"
                        data-tina-field={tinaField(arr, "title")}
                      >
                        {arr.title}
                      </h3>
                      <p
                        className="mt-1 text-sm text-sea-ink-soft"
                        data-tina-field={tinaField(arr, "location")}
                      >
                        {arr.location}
                      </p>
                    </div>

                    {arr.image && (
                      <div className="shrink-0">
                        <img
                          src={arr.image}
                          alt={arr.title}
                          className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          data-tina-field={tinaField(arr, "image")}
                          onClick={() =>
                            arr.image && setSelectedImage(arr.image)
                          }
                        />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="mt-10 text-center">
        <p className="mb-4 text-sea-ink-soft">
          Ønsker du et skreddersydd arrangement for din bedrift eller gruppe?
        </p>
        <Button asChild size="lg">
          <Link to="/tjenester">Se alle tjenester</Link>
        </Button>
      </div>

      {/* Image Modal */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Arrangementplakat"
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </ContentLayout>
  );
}
