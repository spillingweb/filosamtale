import { createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import HomePage from "#/features/home/HomePage";
import type { PagesHomepage } from "../../tina/__generated__/types";

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
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const page = loaderData.page.data.pages as PagesHomepage;

    return {
      meta: [
        { title: page.metaTitle },
        {
          name: "description",
          content:
            page.metaDescription ||
            "Filosamtale tilbyr filosofisk veiledning, samtalegrupper og seminarer i Fevik, Agder. Sykepleier Tina Maria Lie har videreutdanning i filosofi og hjelper deg å utforske livets store spørsmål.",
        },
        {
          property: "og:title",
          content: page.metaTitle,
        },
        {
          property: "og:description",
          content: page.metaDescription,
        },
        { property: "og:url", content: "https://filosamtale.no" },
        { property: "og:locale", content: "nb_NO" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Filosamtale" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: page.metaTitle,
        },
        {
          name: "twitter:description",
          content: page.metaDescription,
        },
      ],
      links: [{ rel: "canonical", href: "https://filosamtale.no" }],
    };
  },
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
