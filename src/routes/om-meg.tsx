import { createFileRoute } from "@tanstack/react-router";
import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import OmMeg from "#/features/om-meg/OmMegPage";
import type { PagesAbout } from "../../tina/__generated__/types";

export const Route = createFileRoute("/om-meg")({
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
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const page = loaderData.page.data.pages as PagesAbout;

    return {
      meta: [
        { title: page.metaTitle },
        {
          name: "description",
          content: page.metaDescription,
        },
        { property: "og:title", content: page.metaTitle },
        { property: "og:type", content: "profile" },
        { property: "og:description", content: page.metaDescription },
        { property: "og:url", content: "https://filosamtale.no/om-meg" },
      ],
      links: [{ rel: "canonical", href: "https://filosamtale.no/om-meg" }],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
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

  return <OmMeg pageData={pageData} utdanningData={utdanningData} />;
}
