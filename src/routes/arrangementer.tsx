import { createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";
import { generateEventSchema } from "#/lib/structured-data";
import Arrangementer from "#/features/arrangementer/Arrangementer";
import { useTina } from "tinacms/react";

export const Route = createFileRoute("/arrangementer")({
  loader: async () => {
    const [arrangementerResult, pageResult] = await Promise.all([
      client.queries.arrangementerConnection({ sort: "date" }),
      client.queries.pages({ relativePath: "arrangementer.md" }),
    ]);
    return {
      arrangementer: arrangementerResult,
      page: pageResult,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const baseUrl = "https://filosamtale.no";
    const events = (
      loaderData.arrangementer.data.arrangementerConnection.edges || []
    )
      .map((edge: any) => edge?.node)
      .filter((node: any) => node !== null);

    return {
      title: "Arrangementer — Seminarer, kurs og samtalegrupper — Filosamtale",
      meta: [
        {
          name: "description",
          content:
            "Kommende arrangementer hos Filosamtale. Bli med på filosofiske samtaler, seminarer og workshops i Fevik og på nett.",
        },
        { property: "og:title", content: "Arrangementer — Filosamtale" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${baseUrl}/arrangementer` },
      ],
      links: [{ rel: "canonical", href: `${baseUrl}/arrangementer` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            events
              .map((event: any) => {
                if (!event) return null;
                return generateEventSchema({
                  name: event.title || "",
                  description: event.description || "",
                  startDate: event.date || "",
                  location: event.location || "Fevik",
                  eventType: event.category || "Event",
                  price: event.price,
                  maxParticipants: event.capacity,
                  url: `${baseUrl}/arrangementer#${event._sys.filename.replace(".md", "")}`,
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

    // Enable live preview for arrangementer
  const { data: arrangementerData } = useTina({
    query: initialData.arrangementer.query,
    variables: initialData.arrangementer.variables,
    data: initialData.arrangementer.data,
  });

  // Enable live preview for page header
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  return <Arrangementer arrangementerData={arrangementerData} pageData={pageData} />;
}