import { createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import HomePage from "#/features/home/HomePage";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [pageResult, tjenesterResult, bloggResult] = await Promise.all([
      client.queries.pages({ relativePath: "forside.md" }),
      client.queries.tjenesterConnection({ sort: "orden" }),
      client.queries.bloggConnection({ sort: "date", last: -1 }),
    ]);
    return {
      page: pageResult,
      tjenester: tjenesterResult,
      blogg: bloggResult,
    };
  },
  head: () => ({
    meta: [
      { title: "Filosamtale — Filosofisk veiledning og dialog i Fevik" },
      {
        name: "description",
        content:
          "Filosamtale tilbyr filosofisk veiledning, samtalegrupper og seminarer i Fevik, Agder. Sykepleier Tina Maria Lie har videreutdanning i filosofi og hjelper deg å utforske livets store spørsmål.",
      },
      {
        name: "keywords",
        content:
        "filosofisk veiledning, terapi, samtalegruppe, seminar, Fevik, fevik, Agder, filosofi, sykepleier, eksistensiell samtale, psykolog, samtalepraksis, samtale",
      },
      {
        property: "og:title",
        content: "Filosamtale — Filosofisk veiledning og dialog",
      },
      {
        property: "og:description",
        content:
        "Filosofisk veiledning, seminarer og samtalegrupper i Fevik og på nett. Utforsk livets spørsmål med en sykepleier med videreutdanning i filosofi.",
      },
      { property: "og:url", content: "https://filosamtale.no" },
      { property: "og:locale", content: "nb_NO" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Filosamtale" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Filosamtale — Filosofisk veiledning og dialog",
      },
      {
        name: "twitter:description",
        content:
        "Filosofisk veiledning, seminarer og samtalegrupper i Fevik og på nett.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://filosamtale.no" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const initialData = Route.useLoaderData();

  // Enable live preview for page content
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  // Enable live preview for tjenester
  const { data: tjenesterData } = useTina({
    query: initialData.tjenester.query,
    variables: initialData.tjenester.variables,
    data: initialData.tjenester.data,
  });

  // Enable live preview for blog posts
  const { data: bloggData } = useTina({
    query: initialData.blogg.query,
    variables: initialData.blogg.variables,
    data: initialData.blogg.data,
  });

  return (
    <HomePage
      pageData={pageData}
      tjenesterData={tjenesterData}
      bloggData={bloggData}
    />
  );
}
