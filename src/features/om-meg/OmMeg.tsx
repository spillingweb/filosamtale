import ContentLayout from "#/components/ContentLayout";
import PageHeader from "#/components/PageHeader";
import { tinaField } from "tinacms/tina-field";
import type {
  PagesQuery,
  UtdanningConnectionQuery,
} from "../../../tina/__generated__/types";
import { Mail, MapPin, User } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";
import IslandShell from "#/components/ui/IslandShell";

const OmMeg = ({
  pageData,
  utdanningData,
}: {
  pageData: PagesQuery;
  utdanningData: UtdanningConnectionQuery;
}) => {
  const page = pageData.pages;

  // Type guard: ensure we have standard template
  if (page.__typename !== "PagesStandard") {
    throw new Error("Expected standard template for om-meg.md");
  }

  // Extract utdanning from connection
  const utdanningList = (utdanningData.utdanningConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null)
    .sort((a, b) => {
      const yearA = parseInt(a.ar || "0", 10);
      const yearB = parseInt(b.ar || "0", 10);
      return yearA - yearB;
    });

  return (
    <ContentLayout>
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {/* Header */}
        <div className="md:col-span-2">
          <PageHeader
            pageName="Om meg"
            title={page.title}
            subtitle={page.subtitle || ""}
            description={page.intro || ""}
            tinaFields={{
              title: tinaField(page, "title"),
              subtitle: tinaField(page, "subtitle"),
              description: tinaField(page, "intro"),
            }}
          />
        </div>

        {/* Portrait */}
        <div className="h-full place-content-center">
          <img
            src={page.profileImage || "/uploads/profile.jpg"}
            alt={`${page.title} - Sykepleier og filosof`}
            className="aspect-square w-full object-cover rounded-2xl"
            data-tina-field={tinaField(page, "profileImage")}
          />
        </div>
      </div>

      {/* Portrait + bio */}
      <div className="mt-8">
        {/* Long bio */}
        <div className="space-y-6 flex flex-col">
          <IslandShell
            className="p-6 sm:p-8"
            data-tina-field={tinaField(page, "body")}
          >
            <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-h2:display-title prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-bold prose-h3:mb-2 prose-h3:font-semibold prose-p:mb-4 prose-p:text-sea-ink-soft prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-2 prose-li:text-sea-ink-soft prose-strong:font-semibold prose-strong:text-foreground">
              {page.body && <TinaMarkdown content={page.body} />}
            </div>
          </IslandShell>

          {/* Verdier */}
          {page.verdier && page.verdier.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Mine verdier
              </h2>
              <div
                className="grid gap-3 sm:grid-cols-2"
                data-tina-field={tinaField(page, "verdier")}
              >
                {page.verdier
                  .filter(
                    (verdi): verdi is NonNullable<typeof verdi> =>
                      verdi !== null,
                  )
                  .map((verdi, idx) => (
                    <IslandShell key={idx} className="p-5">
                      <h3
                        className="mb-2 font-semibold text-foreground"
                        data-tina-field={tinaField(verdi, "tittel")}
                      >
                        {verdi.tittel}
                      </h3>
                      <p
                        className="text-sm text-sea-ink-soft leading-relaxed"
                        data-tina-field={tinaField(verdi, "tekst")}
                      >
                        {verdi.tekst}
                      </p>
                    </IslandShell>
                  ))}
              </div>
            </div>
          )}

          {/* Utdanning */}
          <IslandShell className="p-6">
            <h2 className="mb-5 text-xl font-semibold text-foreground">
              Utdanning og kurs
            </h2>
            <ul className="space-y-4">
              {utdanningList.map((item) => (
                <li key={item.id} className="flex items-start gap-4">
                  <Badge
                    variant="secondary"
                    className="mt-0.5 shrink-0"
                    data-tina-field={tinaField(item, "ar")}
                  >
                    {item.ar}
                  </Badge>
                  <div>
                    <p
                      className="font-medium text-foreground"
                      data-tina-field={tinaField(item, "grad")}
                    >
                      {item.grad}
                    </p>
                    <p
                      className="text-sm text-sea-ink-soft"
                      data-tina-field={tinaField(item, "sted")}
                    >
                      {item.sted}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </IslandShell>

          <div className="self-center flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/tjenester">Se tjenester og priser</Link>
            </Button>
            <Button asChild variant="outline">
              <a href="#kontakt">Ta kontakt</a>
            </Button>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default OmMeg;
