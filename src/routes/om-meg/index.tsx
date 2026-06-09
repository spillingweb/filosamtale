import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import ContentLayout from "#/components/ContentLayout";
import PageHeader from "#/components/PageHeader";
import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Mail, MapPin, User } from "lucide-react";
import client from "../../../tina/__generated__/client";

export const Route = createFileRoute("/om-meg/")({
  loader: async () => {
    const [pageResult, utdanningResult] = await Promise.all([
      client.queries.pages({ relativePath: "om-meg.md" }),
      client.queries.utdanningConnection({ sort: "ar" }),
    ]);
    return {
      page: pageResult,
      utdanning: utdanningResult,
    };
  },
  component: OmMeg,
});

function OmMeg() {
  const initialData = Route.useLoaderData();

  // Enable live preview when editing in TinaCMS
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  const { data: utdanningData } = useTina({
    query: initialData.utdanning.query,
    variables: initialData.utdanning.variables,
    data: initialData.utdanning.data,
  });

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
      {/* Header */}
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

      {/* Portrait + bio */}
      <div className="mt-8 grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Portrait */}
        <div>
          <div className="island-shell overflow-hidden rounded-2xl">
            <img
              src={page.profileImage || "/uploads/profile.jpg"}
              alt={`${page.title} - Sykepleier og filosof`}
              className="aspect-square w-full object-cover"
              data-tina-field={tinaField(page, "profileImage")}
            />
          </div>

          <div className="mt-5 space-y-2 rounded-xl bg-muted/40 p-4 text-sm text-sea-ink-soft">
            {page.contactName && (
              <div className="flex items-center gap-2">
                <User className="text-accent" size={16} />
                <span data-tina-field={tinaField(page, "contactName")}>
                  {page.contactName}
                </span>
              </div>
            )}
            {page.contactLocation && (
              <div className="flex items-center gap-2">
                <MapPin className="text-accent" size={16} />
                <span data-tina-field={tinaField(page, "contactLocation")}>
                  {page.contactLocation}
                </span>
              </div>
            )}
            {page.contactEmail && (
              <div className="flex items-center gap-2">
                <Mail className="text-accent" size={16} />
                <a
                  href={`mailto:${page.contactEmail}`}
                  className="hover:text-lagoon-deep"
                  data-tina-field={tinaField(page, "contactEmail")}
                >
                  {page.contactEmail}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Long bio */}
        <div className="space-y-6 lg:col-span-2">
          <div
            className="island-shell rounded-2xl p-6 sm:p-8"
            data-tina-field={tinaField(page, "body")}
          >
            <div className="prose max-w-none prose-headings:text-foreground prose-h2:display-title prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-bold prose-h3:mb-2 prose-h3:font-semibold prose-p:mb-4 prose-p:text-sea-ink-soft prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-2 prose-li:text-sea-ink-soft prose-strong:font-semibold prose-strong:text-foreground">
              {page.body && <TinaMarkdown content={page.body} />}
            </div>
          </div>

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
                    <div key={idx} className="island-shell rounded-xl p-5">
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
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Utdanning */}
          <div className="island-shell rounded-2xl p-6">
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
          </div>

          <div className="flex flex-wrap gap-3">
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
}
