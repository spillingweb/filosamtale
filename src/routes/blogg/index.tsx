import { createFileRoute } from "@tanstack/react-router";
import { client } from "../../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import BloggPage from "#/features/blogg/BloggPage";
import type { PagesHeader } from "../../../tina/__generated__/types";

export const Route = createFileRoute("/blogg/")({
  loader: async () => {
    const [bloggResult, pageResult] = await Promise.all([
      client.queries.bloggConnection({
        sort: "date",
        last: -1,
      }),
      client.queries.pages({ relativePath: "blogg.md" }),
    ]);
    return {
      blogg: bloggResult,
      page: pageResult,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const page = loaderData.page.data.pages as PagesHeader;

    return {
      meta: [
        { title: page.metaTitle },
        { name: "description", content: page.metaDescription },
        { property: "og:title", content: page.metaTitle },
        { property: "og:type", content: "website" },
        { property: "og:description", content: page.metaDescription },
        { property: "og:url", content: "https://filosamtale.no/blogg" },
      ],
      links: [{ rel: "canonical", href: "https://filosamtale.no/blogg" }],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const initialData = Route.useLoaderData();

  // Enable live preview for blog posts
  const { data: bloggData } = useTina({
    query: initialData.blogg.query,
    variables: initialData.blogg.variables,
    data: initialData.blogg.data,
  });

  // Enable live preview for page header
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  return <BloggPage bloggData={bloggData} pageData={pageData} />;
}
