import { createFileRoute } from "@tanstack/react-router";
import { client } from '../../../tina/__generated__/client'
import { useTina } from 'tinacms/dist/react'
import Blogg from "#/features/blogg/Blogg";

export const Route = createFileRoute("/blogg/")({
  loader: async () => {
    const [bloggResult, pageResult] = await Promise.all([
      client.queries.bloggConnection({
        sort: 'date',
        last: -1,
      }),
      client.queries.pages({ relativePath: 'blogg.md' }),
    ])
    return {
      blogg: bloggResult,
      page: pageResult,
    }
  },
  head: () => ({
    title: 'Blogg — Tanker om filosofi og livets spørsmål — Filosamtale',
    meta: [
      { name: 'description', content: 'Les filosofiske refleksjoner og tanker om livets store spørsmål. Artikler om eksistensialisme, stoisk filosofi, omsorg og mening.' },
      { property: 'og:title', content: 'Blogg — Filosamtale' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://filosamtale.no/blogg' },
    ],
    links: [
      { rel: 'canonical', href: 'https://filosamtale.no/blogg' }
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const initialData = Route.useLoaderData()
  
  // Enable live preview for blog posts
  const { data: bloggData } = useTina({
    query: initialData.blogg.query,
    variables: initialData.blogg.variables,
    data: initialData.blogg.data,
  })
  
  // Enable live preview for page header
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  })
  
  return <Blogg bloggData={bloggData} pageData={pageData} />
}
