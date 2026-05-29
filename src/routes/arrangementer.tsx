import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'
import PageHeader from '#/components/PageHeader'
import ContentLayout from '#/components/ContentLayout'
import { client } from '../../tina/__generated__/client'
import { useTina, tinaField } from 'tinacms/dist/react'

export const Route = createFileRoute('/arrangementer')({
  loader: async () => {
    const [arrangementerResult, pageResult] = await Promise.all([
      client.queries.arrangementerConnection({ sort: 'date' }),
      client.queries.pages({ relativePath: 'arrangementer.md' }),
    ])
    return {
      arrangementer: arrangementerResult,
      page: pageResult,
    }
  },
  component: Arrangementer,
})

const categoryLabels: Record<string, string> = {
  seminar: 'Seminar',
  gruppe: 'Gruppe',
  kurs: 'Kurs',
  dialog: 'Dialog',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('nb-NO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function ArrangementKort({ arr }: { arr: any }) {
  const categoryValue = arr.category && typeof arr.category === 'object' ? arr.category.value : arr.category
  const category = categoryValue || 'dialog'
  
  return (
    <article className="island-shell rounded-2xl overflow-hidden">
      {arr.image && (
        <img 
          src={arr.image}
          alt={arr.title}
          className="w-full h-48 object-cover"
          data-tina-field={tinaField(arr, 'image')}
        />
      )}
      <div
        className={`h-1.5 ${
          category === 'seminar'
            ? 'bg-primary'
            : category === 'gruppe'
              ? 'bg-accent'
              : category === 'kurs'
                ? 'bg-lagoon-deep'
                : 'bg-sea-ink-soft'
        }`}
      />
      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge
            variant={
              category === 'seminar'
                ? 'default'
                : category === 'gruppe'
                  ? 'accent'
                  : 'secondary'
            }
            data-tina-field={tinaField(arr, 'category')}
          >
            {categoryLabels[category]}
          </Badge>
          {arr.isOnline && (
            <Badge variant="outline" data-tina-field={tinaField(arr, 'isOnline')}>
              <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" className="mr-1">
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 1.4a5.6 5.6 0 110 11.2A5.6 5.6 0 018 2.4zm-.7 1.4v1.4H6v1.4h1.3V8H6v1.4h1.3v1.4h1.4V9.4H10V8H8.7V6.6H10V5.2H8.7V3.8H7.3z" />
              </svg>
              Online
            </Badge>
          )}
          {arr.price === 0 && (
            <Badge variant="secondary" data-tina-field={tinaField(arr, 'price')}>
              Gratis
            </Badge>
          )}
        </div>

        <h2 
          className="display-title mb-2 text-xl font-bold text-foreground"
          data-tina-field={tinaField(arr, 'title')}
        >
          {arr.title}
        </h2>
        <p 
          className="mb-4 text-sm text-sea-ink-soft leading-relaxed"
          data-tina-field={tinaField(arr, 'description')}
        >
          {arr.description}
        </p>

        <dl className="mb-4 grid gap-y-1.5 text-sm">
          <div className="flex items-start gap-2">
            <dt className="flex items-center gap-1 font-medium text-foreground shrink-0">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" className="text-accent">
                <path d="M14 2h-1V1h-2v1H5V1H3v1H2a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm0 12H2V6h12v8zM2 5V4h12v1H2zm3 3h1.5v1.5H5V8zm3 0h1.5v1.5H8V8zm3 0h1.5v1.5H11V8z" />
              </svg>
              Dato:
            </dt>
            <dd className="text-sea-ink-soft" data-tina-field={tinaField(arr, 'date')}>
              {formatDate(arr.date)}
              {arr.endDate ? ` – ${formatDate(arr.endDate)}` : ''}
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="flex items-center gap-1 font-medium text-foreground shrink-0">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" className="text-accent">
                <path d="M8 3.5a.5.5 0 00-1 0V9a.5.5 0 00.252.434l3.5 2a.5.5 0 00.496-.868L8 8.71V3.5z" />
                <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm7-8A7 7 0 111 8a7 7 0 0114 0z" />
              </svg>
              Tid:
            </dt>
            <dd className="text-sea-ink-soft" data-tina-field={tinaField(arr, 'time')}>
              {arr.time}
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="flex items-center gap-1 font-medium text-foreground shrink-0">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" className="text-accent">
                <path d="M8 16s6-5.686 6-10A6 6 0 002 6c0 4.314 6 10 6 10zm0-7a3 3 0 110-6 3 3 0 010 6z" />
              </svg>
              Sted:
            </dt>
            <dd className="text-sea-ink-soft" data-tina-field={tinaField(arr, 'location')}>
              {arr.location}
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="flex items-center gap-1 font-medium text-foreground shrink-0">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" className="text-accent">
                <path d="M0 4a1 1 0 011-1h14a1 1 0 011 1v8a1 1 0 01-1 1H1a1 1 0 01-1-1V4zm4 5a2 2 0 100-4 2 2 0 000 4zm-2 1a3 3 0 016 0H2zm10-3a1 1 0 00-1 1H8a1 1 0 102 0h2a1 1 0 00-1-1zm-1 3a1 1 0 00-1 1H8a1 1 0 102 0h1z" />
              </svg>
              Pris:
            </dt>
            <dd className="text-sea-ink-soft" data-tina-field={tinaField(arr, 'price')}>
              {arr.price === 0 ? 'Gratis' : `${arr.price} kr`}
            </dd>
          </div>
          {arr.capacity && (
            <div className="flex items-start gap-2">
              <dt className="flex items-center gap-1 font-medium text-foreground shrink-0">
                <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" className="text-accent">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 017 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 01-.014.002H7.022zM11 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Kapasitet:
              </dt>
              <dd className="text-sea-ink-soft" data-tina-field={tinaField(arr, 'capacity')}>
                {arr.capacity} plasser
              </dd>
            </div>
          )}
        </dl>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="sm">
            <a href="#kontakt">Meld interesse</a>
          </Button>
          {arr.capacity && arr.capacity <= 12 && (
            <span className="text-xs text-sea-ink-soft">
              Begrenset antall plasser
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

function Arrangementer() {
  const initialData = Route.useLoaderData()
  
  // Enable live preview for arrangementer
  const { data: arrangementerData } = useTina({
    query: initialData.arrangementer.query,
    variables: initialData.arrangementer.variables,
    data: initialData.arrangementer.data,
  })
  
  // Enable live preview for page header
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  })
  
  const page = pageData.pages
  
  // Type guard: ensure we have header template
  if (page.__typename !== 'PagesHeader') {
    throw new Error('Expected header template for arrangementer.md')
  }
  
  // Extract arrangementer from connection
  const alleArrangementer = (arrangementerData.arrangementerConnection.edges || [])
    .map(edge => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  const now = new Date()
  const kommende = alleArrangementer.filter(arr => new Date(arr.date) >= now)
  const tidligere = alleArrangementer.filter(arr => new Date(arr.date) < now)

  return (
    <ContentLayout>
      {/* Header */}
      <PageHeader
        pageName="Arrangementer"
        title={page.title}
        description={page.intro || ''}
        tinaFields={{
          title: tinaField(page, 'title'),
          description: tinaField(page, 'intro'),
        }}
      />

      {/* Upcoming events */}
      <section className="mt-8">
        <h2 className="mb-5 text-xl font-semibold text-foreground">
          Kommende ({kommende.length})
        </h2>
        {kommende.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {kommende.map((arr) => (
              <ArrangementKort key={arr.id} arr={arr} />
            ))}
          </div>
        ) : (
          <p className="text-sea-ink-soft">Ingen kommende arrangementer for øyeblikket.</p>
        )}
      </section>

      {/* Newsletter strip */}
      <section className="island-shell mt-10 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="island-kicker mb-1">Aldri gå glipp av et arrangement</p>
            <p className="text-sea-ink-soft">
              Send meg en e-post for å bli varslet om nye seminarer og grupper.
            </p>
          </div>
          <Button asChild className="shrink-0">
            <a href="mailto:hei@filosamtale.no?subject=Varslinger om arrangementer">
              Bli varslet
            </a>
          </Button>
        </div>
      </section>

      {/* Past events */}
      {tidligere.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 text-xl font-semibold text-foreground">
            Tidligere arrangementer
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 opacity-70">
            {tidligere.map((arr) => {
              const categoryValue = typeof arr.category === 'object' && arr.category !== null ? (arr.category as any)?.value : arr.category
              const category = categoryValue || 'dialog'
              return (
                <article key={arr.id} className="island-shell rounded-2xl overflow-hidden">
                  {arr.image && (
                    <img 
                      src={arr.image}
                      alt={arr.title}
                      className="w-full h-32 object-cover"
                      data-tina-field={tinaField(arr, 'image')}
                    />
                  )}
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2">
                    <Badge variant="secondary" data-tina-field={tinaField(arr, 'category')}>
                      {categoryLabels[category]}
                    </Badge>
                    <time 
                      className="text-xs text-sea-ink-soft" 
                      dateTime={arr.date}
                      data-tina-field={tinaField(arr, 'date')}
                    >
                      {new Date(arr.date).toLocaleDateString('nb-NO', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                  <h3 
                    className="font-semibold text-foreground"
                    data-tina-field={tinaField(arr, 'title')}
                  >
                    {arr.title}
                  </h3>
                  <p 
                    className="mt-1 text-sm text-sea-ink-soft"
                    data-tina-field={tinaField(arr, 'location')}
                  >
                    {arr.location}
                  </p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="mt-10 text-center">
        <p className="mb-4 text-sea-ink-soft">
          Ønsker du et skreddersydd arrangement for din bedrift eller gruppe?
        </p>
        <Button asChild size="lg">
          <Link to="/tjenester">Se alle tjenester</Link>
        </Button>
      </div>
    </ContentLayout>
  )
}
