import TjenesteCard from "./TjenesteCard";
import type {
  PagesQuery,
  TjenesterConnectionQuery,
  Tjenester,
} from "../../../tina/__generated__/types";
import { Button } from "#/components/ui/button";
import PageHeader from "#/components/PageHeader";
import { DisplayHeading } from "#/components/ui/DisplayHeading";
import ContentLayout from "#/components/ContentLayout";
import IslandKicker from "#/components/ui/IslandKicker";
import { tinaField } from "tinacms/tina-field";
import IslandShell from "#/components/ui/IslandShell";

const TjenesterPage = ({
  tjenesterData,
  pageData,
}: {
  tjenesterData: TjenesterConnectionQuery;
  pageData: PagesQuery;
}) => {
  const page = pageData.pages;

  // Type guard: ensure we have services template
  if (page.__typename !== "PagesServices") {
    throw new Error("Expected services template for tjenester.md");
  }

  // Extract services from connection and filter out nulls
  const tjenester = (tjenesterData.tjenesterConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null)
    .sort((a, b) => {
      const aOrden = (a as { orden?: number }).orden ?? Number.MAX_SAFE_INTEGER;
      const bOrden = (b as { orden?: number }).orden ?? Number.MAX_SAFE_INTEGER;
      if (aOrden !== bOrden) return aOrden - bOrden;
      return (a.tittel || "").localeCompare(b.tittel || "", "nb");
    });

  const privatTjenester = tjenester.filter(
    (tjeneste) => (tjeneste.malgruppe || "privatperson") === "privatperson",
  );

  const bedriftsTjenester = tjenester.filter(
    (tjeneste) => tjeneste.malgruppe === "bedrift",
  );

  const tjenesteGrupper = [
    {
      id: "for-privatpersoner",
      title: "For privatpersoner",
      services: privatTjenester,
    },
    {
      id: "for-bedrifter",
      title: "For bedrifter",
      services: bedriftsTjenester,
    },
  ];

  return (
    <ContentLayout className="md:px-0">
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end lg:gap-8">
        <PageHeader
          pageName="Tjenester og priser"
          title={page.title}
          subtitle={page.subtitle || ""}
          description={page.intro || ""}
          tinaFields={{
            title: tinaField(page, "title"),
            subtitle: tinaField(page, "subtitle"),
            description: tinaField(page, "intro"),
          }}
        />

        <nav
          aria-label="Hopp til tjenestekategori"
          className="rise-in -mx-4 px-4 lg:mx-0 lg:px-0 lg:pt-10"
        >
          <div className="rounded-xl border border-chip-line bg-card p-4 lg:sticky lg:top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-sea-ink-soft">
              Hopp til
            </p>
            <div className="flex flex-col gap-1.5">
              {tjenesteGrupper.map((gruppe) => (
                <a
                  key={gruppe.id}
                  href={`#${gruppe.id}`}
                  className="inline-flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-sea-ink-soft no-underline transition hover:bg-primary/10 hover:text-foreground"
                >
                  <span>{gruppe.title}</span>
                  <span aria-hidden="true" className="text-xs opacity-70">
                    ↓
                  </span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </section>

      {page.infoBadge && (
        <div
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-chip-line bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          data-tina-field={tinaField(page, "infoBadge")}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm.75 4.75v1.5h-1.5v-1.5h1.5zm0 3v4.5h-1.5v-4.5h1.5z" />
          </svg>
          {page.infoBadge}
        </div>
      )}

      <div className="mt-8 space-y-12">
        {tjenesteGrupper.map((gruppe) => (
          <section key={gruppe.id} id={gruppe.id} className="scroll-mt-24">
            <DisplayHeading as="h2" size="base" className="mb-5">
              {gruppe.title}
            </DisplayHeading>
            <div className="space-y-8">
              {gruppe.services.map((tjeneste) => (
                <TjenesteCard
                  key={tjeneste._sys.filename}
                  tjeneste={tjeneste as Tjenester}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* FAQ strip */}
      {page.faq && page.faq.length > 0 && (
        <section>
          <IslandShell className="mt-10 p-6 sm:p-8">
            <IslandKicker className="mb-3">Spørsmål og svar</IslandKicker>
            <DisplayHeading as="h2" size="base" className="mb-6">
              Vanlige spørsmål
            </DisplayHeading>
            <div
              className="grid gap-6 sm:grid-cols-2"
              data-tina-field={tinaField(page, "faq")}
            >
              {page.faq
                .filter(
                  (item): item is NonNullable<typeof item> => item !== null,
                )
                .map((item, idx) => (
                  <div key={idx}>
                    <h3
                      className="mb-2 font-semibold text-foreground"
                      data-tina-field={tinaField(item, "question")}
                    >
                      {item.question}
                    </h3>
                    <p
                      className="text-sm text-sea-ink-soft leading-relaxed"
                      data-tina-field={tinaField(item, "answer")}
                    >
                      {item.answer}
                    </p>
                  </div>
                ))}
            </div>
          </IslandShell>
        </section>
      )}

      {/* CTA */}
      <div className="mt-8 text-center">
        <Button asChild size="lg">
          <a href="#kontakt">Ta kontakt for en samtale</a>
        </Button>
      </div>
    </ContentLayout>
  );
};

export default TjenesterPage;
