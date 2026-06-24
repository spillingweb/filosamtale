import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { Dialog, DialogContent } from "#/components/ui/dialog";
import PageHeader from "#/components/PageHeader";
import ContentLayout from "#/components/ContentLayout";
import { tinaField } from "tinacms/dist/react";
import { useState } from "react";

import IslandKicker from "#/components/ui/IslandKicker";
import ArrangementKort from "#/features/arrangementer/ArragementKort";
import type {
  ArrangementerConnectionQuery,
  PagesQuery,
} from "../../../tina/__generated__/types";
import IslandShell from "#/components/ui/IslandShell";

const categoryLabels: Record<string, string> = {
  seminar: "Seminar",
  gruppe: "Gruppe",
  kurs: "Kurs",
  dialog: "Dialog",
};

function Arrangementer({
  arrangementerData,
  pageData,
}: {
  arrangementerData: ArrangementerConnectionQuery;
  pageData: PagesQuery;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // En

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
      <IslandShell className="mt-10 p-6 sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <IslandKicker className="mb-1">
              Aldri gå glipp av et arrangement
            </IslandKicker>
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
      </IslandShell>

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
                <IslandShell key={arr.id} className="overflow-hidden">
                  <article>
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
                          className="font-semibold text-foreground text-balance"
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
                </IslandShell>
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

export default Arrangementer;
