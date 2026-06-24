import { createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import Home from "#/features/home/Home";

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
    title: "Filosamtale — Filosofisk veiledning og dialog i Fevik",
    meta: [
      {
        name: "description",
        content:
          "Filosamtale tilbyr filosofisk veiledning, samtalegrupper og seminarer i Fevik, Agder. Utforsk livets store spørsmål med sykepleier og filosof Tina Maria Lie.",
      },
      {
        property: "og:title",
        content: "Filosamtale — Filosofisk veiledning og dialog",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://filosamtale.no" },
    ],
    links: [{ rel: "canonical", href: "https://filosamtale.no" }],
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

  return <Home pageData={pageData} tjenesterData={tjenesterData} bloggData={bloggData} />;
}
