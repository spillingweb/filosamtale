import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Dialog, DialogContent } from "#/components/ui/dialog";
import PageHeader from "#/components/PageHeader";
import ContentLayout from "#/components/ContentLayout";
import { tinaField } from "tinacms/dist/react";
import { useState } from "react";

import IslandKicker from "#/components/ui/IslandKicker";
import IslandShell from "#/components/ui/IslandShell";
import type {
  ArrangementerConnectionQuery,
  PagesQuery,
} from "../../../tina/__generated__/types";
import ArrangementKort from "./ArragementKort";

const categoryLabels: Record<string, string> = {
  seminar: "Seminar",
  gruppe: "Gruppe",
  kurs: "Kurs",
  dialog: "Dialog",
};

const categories = [
  { value: "all", label: "Alle" },
  { value: "seminar", label: "Seminar" },
  { value: "gruppe", label: "Gruppe" },
  { value: "kurs", label: "Kurs" },
  { value: "dialog", label: "Dialog" },
];

function Arrangementer({
  arrangementerData,
  pageData,
}: {
  arrangementerData: ArrangementerConnectionQuery;
  pageData: PagesQuery;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  // Filter by category
  const filteredArrangementer = alleArrangementer.filter((arr) => {
    if (selectedCategory === "all") return true;
    const categoryValue =
      typeof arr.category === "object" && arr.category !== null
        ? (arr.category as any)?.value
        : arr.category;
    return categoryValue === selectedCategory;
  });

  const now = new Date();

  // Split into upcoming and past events
  const upcomingEvents = filteredArrangementer.filter(
    (arr) => new Date(arr.date) >= now
  );
  const pastEvents = filteredArrangementer.filter(
    (arr) => new Date(arr.date) < now
  );

  // Helper function to group by month
  const groupByMonth = (events: typeof alleArrangementer) => {
    return events.reduce((acc, arr) => {
      const date = new Date(arr.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthLabel = date.toLocaleDateString("nb-NO", {
        month: "long",
        year: "numeric",
      });
      
      if (!acc[monthKey]) {
        acc[monthKey] = {
          label: monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1),
          events: [],
        };
      }
      acc[monthKey].events.push(arr);
      return acc;
    }, {} as Record<string, { label: string; events: typeof alleArrangementer }>);
  };

  const upcomingByMonth = groupByMonth(upcomingEvents);
  const pastByMonth = groupByMonth(pastEvents);

  const sortedUpcomingMonths = Object.entries(upcomingByMonth).sort(([a], [b]) => a.localeCompare(b));
  const sortedPastMonths = Object.entries(pastByMonth).sort(([a], [b]) => b.localeCompare(a)); // Reverse order for past

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

      {/* Category Filter */}
      <nav className="mt-6 -mx-4 px-4 overflow-x-auto hidden md:block">
        <div className="flex gap-2 pb-2 min-w-max">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Upcoming Events */}
      {sortedUpcomingMonths.length > 0 ? (
        <div className="mt-8 space-y-10">
          {sortedUpcomingMonths.map(([monthKey, { label, events }]) => (
            <section key={monthKey}>
              <h2 className="mb-5 text-2xl font-bold text-foreground display-title">
                {label}
              </h2>
              <div className="space-y-5">
                {events.map((arr) => (
                  <ArrangementKort
                    key={arr.id}
                    arr={arr}
                    onImageClick={setSelectedImage}
                    categoryLabels={categoryLabels}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-8 text-center py-12">
          <p className="text-sea-ink-soft">
            {selectedCategory === "all"
              ? "Ingen kommende arrangementer for øyeblikket."
              : `Ingen kommende ${categoryLabels[selectedCategory]?.toLowerCase()} for øyeblikket.`}
          </p>
        </div>
      )}

      {/* Past Events Section */}
      {sortedPastMonths.length > 0 && (
        <div className="mt-16 space-y-10">
          <h2 className="text-3xl font-bold text-foreground display-title">
            Tidligere arrangementer
          </h2>
          {sortedPastMonths.map(([monthKey, { label, events }]) => (
            <section key={monthKey}>
              <h3 className="mb-5 text-xl font-semibold text-sea-ink-soft">
                {label}
              </h3>
              <div className="space-y-5">
                {events.map((arr) => (
                  <ArrangementKort
                    key={arr.id}
                    arr={arr}
                    onImageClick={setSelectedImage}
                    categoryLabels={categoryLabels}
                    isPast={true}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

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
