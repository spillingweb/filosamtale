import { createFileRoute } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'
import { tjenester } from '#/data/tjenester'

export const Route = createFileRoute('/tjenester')({
  loader: () => ({ tjenester }),
  component: () => {
    const { tjenester } = Route.useLoaderData()

    return (
      <main className="page-wrap px-4 py-12">
        {/* Header */}
        <section className="rise-in py-5">
          <p className="island-kicker mb-3">Tjenester og priser</p>
          <h1 className="display-title mb-4 max-w-2xl text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Finn rett tilbud for deg
        </h1>
        <p className="max-w-2xl text-[var(--sea-ink-soft)] leading-relaxed">
          Alle tilbud kan tilpasses dine behov og ønsker. Ta gjerne kontakt for en uforpliktende
          prat om hva som passer best for deg.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-primary/10 px-4 py-2 text-sm font-medium text-[var(--palm)]">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm.75 4.75v1.5h-1.5v-1.5h1.5zm0 3v4.5h-1.5v-4.5h1.5z" />
          </svg>
          Første konsultasjon (30 min) er alltid gratis
        </div>
      </section>

      {/* Service cards */}
      <div className="mt-8 space-y-6">
        {tjenester.map(({ id, tittel, undertittel, beskrivelse, detaljer, priser, badge }) => (
          <article
            id={id}
            key={id}
            className="island-shell grid scroll-mt-24 gap-6 rounded-2xl p-6 sm:p-8 lg:grid-cols-3"
          >
            {/* Left: description */}
            <div className="lg:col-span-2">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <h2 className="display-title text-2xl font-bold text-[var(--sea-ink)]">{tittel}</h2>
                {badge && <Badge variant="accent">{badge}</Badge>}
              </div>
              <p className="island-kicker mb-3">{undertittel}</p>
              <p className="mb-4 text-[var(--sea-ink-soft)] leading-relaxed">{beskrivelse}</p>
              <ul className="space-y-1.5">
                {detaljer.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-[var(--sea-ink-soft)]">
                    <svg
                      viewBox="0 0 16 16"
                      width="14"
                      height="14"
                      fill="none"
                      className="mt-0.5 shrink-0 text-[var(--palm)]"
                    >
                      <path
                        d="M3 8l4 4 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: prices */}
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <p className="island-kicker mb-3">Priser</p>
              <ul className="space-y-3">
                {priser.map(({ label, pris }) => (
                  <li
                    key={label}
                    className="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-[var(--sea-ink-soft)]">{label}</span>
                    <span className="font-semibold text-[var(--sea-ink)]">{pris}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-5 w-full">
                <a href="#kontakt">Book time</a>
              </Button>
            </div>
          </article>
        ))}
      </div>

      {/* FAQ strip */}
      <section className="island-shell mt-10 rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-3">Spørsmål og svar</p>
        <h2 className="display-title mb-6 text-2xl font-bold text-[var(--sea-ink)]">
          Vanlige spørsmål
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              q: 'Hva er forskjellen på filosofisk dialog og terapi?',
              a: 'Filosofisk dialog er ikke terapi og heller ikke rådgivning. Vi undersøker ideer, antakelser og verdier — ikke symptomer eller psykisk helse. Du trenger ikke ha et «problem» for å delta.',
            },
            {
              q: 'Trenger jeg forkunnskaper i filosofi?',
              a: 'Absolutt ikke. Alt vi trenger er nysgjerrighet og vilje til å tenke høyt. Filosofisk kunnskap er en bonus, ikke et krav.',
            },
            {
              q: 'Tilbyr du timer på nett?',
              a: 'Ja, alle individuelle timer og kurs kan gjennomføres via video. Gruppesamtaler holdes primært i Fevik, men nettbaserte grupper kan settes opp ved tilstrekkelig interesse.',
            },
            {
              q: 'Hvordan er det å booke en time?',
              a: 'Fyll ut kontaktskjemaet nedenfor, eller send en e-post til hei@filosamtale.no. Jeg svarer innen to virkedager og vi finner en tid som passer.',
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="mb-2 font-semibold text-[var(--sea-ink)]">{q}</h3>
              <p className="text-sm text-[var(--sea-ink-soft)] leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Button asChild size="lg">
          <a href="#kontakt">Ta kontakt for en uforpliktende samtale</a>
        </Button>
      </div>
    </main>
    )
  },
})
