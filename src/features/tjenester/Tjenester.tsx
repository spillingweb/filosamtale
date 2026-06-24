import type {
  PagesQuery,
  TjenesterConnectionQuery,
} from "../../../tina/__generated__/types";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import PageHeader from "#/components/PageHeader";
import ContentLayout from "#/components/ContentLayout";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import IslandKicker from "#/components/ui/IslandKicker";
import { tinaField } from "tinacms/tina-field";
import IslandShell from "#/components/ui/IslandShell";

const Tjenester = ({
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
    .sort((a, b) => (a.orden || 999) - (b.orden || 999));

  return (
    <ContentLayout className="md:px-0">
      {/* Header */}
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

      <div className="mt-8 space-y-8">
        {tjenester.map((tjeneste) => (
          <IslandShell key={tjeneste.id}>
            <article
              id={tjeneste._sys.filename.replace(".json", "")}
              className="grid scroll-mt-24 gap-6 p-6 sm:p-8 lg:grid-cols-3"
            >
              {/* Left: description */}
              <div className="lg:col-span-2">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <h2
                    className="display-title text-2xl font-bold text-foreground"
                    data-tina-field={tinaField(tjeneste, "tittel")}
                  >
                    {tjeneste.tittel}
                  </h2>
                  {tjeneste.badge && (
                    <Badge
                      variant="accent"
                      data-tina-field={tinaField(tjeneste, "badge")}
                    >
                      {tjeneste.badge}
                    </Badge>
                  )}
                </div>
                <IslandKicker
                  className="mb-3"
                  data-tina-field={tinaField(tjeneste, "undertittel")}
                >
                  {tjeneste.undertittel}
                </IslandKicker>
                <div
                  className="mb-4 text-sea-ink-soft leading-relaxed prose prose-sm max-w-none"
                  data-tina-field={tinaField(tjeneste, "description")}
                >
                  <TinaMarkdown content={tjeneste.description} />
                </div>
                <ul
                  className="space-y-1.5"
                  data-tina-field={tinaField(tjeneste, "detaljer")}
                >
                  {(tjeneste.detaljer || []).map((detalj, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-sea-ink-soft"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        width="14"
                        height="14"
                        fill="none"
                        className="mt-0.5 shrink-0 text-primary"
                      >
                        <path
                          d="M3 8l4 4 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {detalj}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: prices */}
              <div className="rounded-xl border bg-surface p-5 h-full flex flex-col">
                <IslandKicker className="mb-3">Priser</IslandKicker>
                <ul
                  className="space-y-3 flex-1"
                  data-tina-field={tinaField(tjeneste, "priser")}
                >
                  {(tjeneste.priser || []).map((pris, idx) => {
                    if (!pris?.label || !pris?.pris) return null;
                    return (
                      <li
                        key={idx}
                        className="flex items-center justify-between gap-3 border-b pb-3 last:border-0 last:pb-0"
                      >
                        <span className="text-sm text-sea-ink-soft text-balance">
                          {pris.label}
                        </span>
                        <span className="font-semibold text-foreground text-nowrap">
                          {pris.pris}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <Button asChild className="mt-5 w-full">
                  <a href="#kontakt">Book time</a>
                </Button>
              </div>
            </article>
          </IslandShell>
        ))}
      </div>

      {/* FAQ strip */}
      {page.faq && page.faq.length > 0 && (
        <section>
          <IslandShell className="mt-10 p-6 sm:p-8">
            <IslandKicker className="mb-3">Spørsmål og svar</IslandKicker>
            <h2 className="display-title mb-6 text-2xl font-bold text-foreground">
              Vanlige spørsmål
            </h2>
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

export default Tjenester;
