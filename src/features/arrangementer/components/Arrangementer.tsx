import { Button } from "#/components/ui/button";
import PageHeader from "#/components/PageHeader";
import { DisplayHeading } from "#/components/ui/DisplayHeading";
import ContentLayout from "#/components/ContentLayout";
import { tinaField } from "tinacms/dist/react";
import { useState, useEffect } from "react";

import type {
  ArrangementerConnectionQuery,
  PagesQuery,
  KategorierConnectionQuery,
} from "../../../../tina/__generated__/types";
import {
  filterArrangementerByCategory,
  getAlleArrangementer,
  getArrangementCategories,
  getArrangementCategoryLabels,
  groupArrangementerByMonth,
} from "../utils";
import ArrangementKort from "./ArragementKort";

function Arrangementer({
  arrangementerData,
  pageData,
  kategorierData,
}: {
  arrangementerData: ArrangementerConnectionQuery;
  pageData: PagesQuery;
  kategorierData: KategorierConnectionQuery;
}) {
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visiblePastCount, setVisiblePastCount] = useState(3);

  useEffect(() => {
    setVisiblePastCount(3);
  }, [selectedCategory]);

  const page = pageData.pages;

  const categories = getArrangementCategories(kategorierData);
  const categoryLabels = getArrangementCategoryLabels(kategorierData);

  // Type guard: ensure we have header template
  if (page.__typename !== "PagesHeader") {
    throw new Error("Expected header template for arrangementer.md");
  }

  const alleArrangementer = getAlleArrangementer(arrangementerData);
  const filteredArrangementer = filterArrangementerByCategory(
    alleArrangementer,
    selectedCategory,
  );

  const now = new Date();
  const upcomingEvents = filteredArrangementer.filter(
    (arr) => new Date(arr.date) >= now,
  );
  const pastEvents = filteredArrangementer.filter(
    (arr) => new Date(arr.date) < now,
  );

  const upcomingByMonth = groupArrangementerByMonth(upcomingEvents);
  const pastByMonth = groupArrangementerByMonth(pastEvents);

  const sortedUpcomingMonths = Object.entries(upcomingByMonth).sort(
    ([a], [b]) => a.localeCompare(b),
  );
  const sortedPastMonths = Object.entries(pastByMonth).sort(([a], [b]) =>
    b.localeCompare(a),
  ); // Reverse order for past

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
      <nav className="pt-1 -mx-4 px-4 overflow-x-auto hidden md:block">
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
              <DisplayHeading as="h3" size="sm" className="mb-5">
                {label}
              </DisplayHeading>
              <div className="space-y-5">
                {events.map((arr) => (
                  <ArrangementKort
                    key={arr.id}
                    arr={arr}
                    // onImageClick={setSelectedImage}
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
      {sortedPastMonths.length > 0 && (() => {
        let remaining = visiblePastCount;
        const visibleMonths = sortedPastMonths
          .map(([monthKey, { label, events }]) => {
            if (remaining <= 0) return null;
            const visible = events.slice(0, remaining);
            remaining -= visible.length;
            return [monthKey, { label, events: visible }] as const;
          })
          .filter((x): x is NonNullable<typeof x> => x !== null);
        const totalPastEvents = sortedPastMonths.reduce(
          (sum, [, { events }]) => sum + events.length,
          0,
        );
        return (
          <div className="mt-16 space-y-10">
            <DisplayHeading as="h2" size="xl">
              Tidligere arrangementer
            </DisplayHeading>
            {visibleMonths.map(([monthKey, { label, events }]) => (
              <section key={monthKey}>
                <DisplayHeading as="h3" size="sm" className="mb-5">
                  {label}
                </DisplayHeading>
                <div className="space-y-5">
                  {events.map((arr) => (
                    <ArrangementKort
                      key={arr.id}
                      arr={arr}
                      // onImageClick={setSelectedImage}
                      categoryLabels={categoryLabels}
                      isPast={true}
                    />
                  ))}
                </div>
              </section>
            ))}
            {visiblePastCount < totalPastEvents && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setVisiblePastCount((n) => n + 3)}
                >
                  Last flere tidligere arrangementer
                </Button>
              </div>
            )}
          </div>
        );
      })()}

    </ContentLayout>
  );
}

export default Arrangementer;
