import { createFileRoute } from "@tanstack/react-router";
import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import OmMeg from "#/features/om-meg/OmMeg";

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
  head: () => ({
    title: 'Om meg — Tina Maria Lie — Filosamtale',
    meta: [
      { name: 'description', content: 'Tina Maria Lie er sykepleier og filosof. Les om bakgrunnen min og hvorfor jeg tilbyr filosofisk veiledning og dialog.' },
      { property: 'og:title', content: 'Om meg — Filosamtale' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:url', content: 'https://filosamtale.no/om-meg' },
    ],
    links: [
      { rel: 'canonical', href: 'https://filosamtale.no/om-meg' }
    ],
  }),
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
