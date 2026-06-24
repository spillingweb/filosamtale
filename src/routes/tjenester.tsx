import { createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { generateServiceSchema } from "#/lib/structured-data";
import Tjenester from "#/features/tjenester/Tjenester";

export const Route = createFileRoute("/tjenester")({
  loader: async () => {
    const [tjenesterResult, pageResult] = await Promise.all([
      client.queries.tjenesterConnection({ sort: "orden" }),
      client.queries.pages({ relativePath: "tjenester.md" }),
    ]);
    return {
      tjenester: tjenesterResult,
      page: pageResult,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const baseUrl = "https://filosamtale.no";
    const services = (loaderData.tjenester.data.tjenesterConnection.edges || [])
      .map((edge: any) => edge?.node)
      .filter((node: any) => node !== null);

    return {
      title:
        "Tjenester — Filosofisk veiledning og samtalegrupper — Filosamtale",
      meta: [
        {
          name: "description",
          content:
            "Filosamtale tilbyr filosofisk veiledning, samtalegrupper, seminarer og nettkurs. Utforsk eksistensielle spørsmål med en erfaren sykepleier og filosof.",
        },
        { property: "og:title", content: "Tjenester — Filosamtale" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${baseUrl}/tjenester` },
      ],
      links: [{ rel: "canonical", href: `${baseUrl}/tjenester` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            services
              .map((service: any) => {
                if (!service) return null;
                return generateServiceSchema({
                  name: service.tittel || service.name || "",
                  description: service.undertittel || service.description || "",
                  serviceType: service.category || "Filosofisk tjeneste",
                  url: `${baseUrl}/tjenester#${service._sys.filename.replace(".json", "")}`,
                });
              })
              .filter(Boolean),
          ),
        },
      ],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const initialData = Route.useLoaderData();

  // Enable live preview for services
  const { data: tjenesterData } = useTina({
    query: initialData.tjenester.query,
    variables: initialData.tjenester.variables,
    data: initialData.tjenester.data,
  });

  // Enable live preview for page header
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  return <Tjenester tjenesterData={tjenesterData} pageData={pageData} />;
}
