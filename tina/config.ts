import { defineConfig } from 'tinacms'

/**
 * Sykosofi — TinaCMS configuration
 *
 * Allows the site owner to edit content, post new blogs and events
 * through the TinaCMS visual editor.
 *
 * Local development:
 *   npx tinacms dev -c "npm run dev"
 *
 * Production (Tina Cloud):
 *   Set TINA_PUBLIC_CLIENT_ID and TINA_TOKEN environment variables.
 *   See https://tina.io/docs/tina-cloud/overview for setup.
 */
export default defineConfig({
  branch:
    process.env['GITHUB_BRANCH'] ?? process.env['VERCEL_GIT_COMMIT_REF'] ?? 'main',
  clientId: process.env['TINA_PUBLIC_CLIENT_ID'] ?? null,
  token: process.env['TINA_TOKEN'] ?? null,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      /* ── BLOG POSTS ─────────────────────────────────────── */
      {
        name: 'blogg',
        label: 'Blogginnlegg',
        path: 'content/blogg',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.['title']
                ? (values['title'] as string)
                    .toLowerCase()
                    .replace(/æ/g, 'ae')
                    .replace(/ø/g, 'o')
                    .replace(/å/g, 'a')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '')
                : 'innlegg',
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Tittel',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Ingress / sammendrag',
            ui: { component: 'textarea' },
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Publiseringsdato',
            required: true,
          },
          {
            type: 'string',
            name: 'category',
            label: 'Kategori',
            options: ['Filosofi', 'Refleksjon', 'Filosofihistorie', 'Etikk', 'Helse', 'Annet'],
          },
          {
            type: 'number',
            name: 'readingTime',
            label: 'Lesetid (minutter)',
          },
          {
            type: 'image',
            name: 'coverImage',
            label: 'Forsidebilde',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Innhold',
            isBody: true,
          },
        ],
      },

      /* ── EVENTS ──────────────────────────────────────────── */
      {
        name: 'arrangementer',
        label: 'Arrangementer',
        path: 'content/arrangementer',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.['title']
                ? (values['title'] as string)
                    .toLowerCase()
                    .replace(/æ/g, 'ae')
                    .replace(/ø/g, 'o')
                    .replace(/å/g, 'a')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '')
                : 'arrangement',
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Tittel',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Beskrivelse',
            ui: { component: 'textarea' },
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Dato',
            required: true,
          },
          {
            type: 'datetime',
            name: 'endDate',
            label: 'Sluttdato (valgfritt, for flerdagskurs)',
          },
          {
            type: 'string',
            name: 'time',
            label: 'Tidspunkt (f.eks. 18:00–20:00)',
            required: true,
          },
          {
            type: 'string',
            name: 'location',
            label: 'Sted',
            required: true,
          },
          {
            type: 'number',
            name: 'price',
            label: 'Pris (kr, 0 = gratis)',
            required: true,
          },
          {
            type: 'number',
            name: 'capacity',
            label: 'Maks antall deltakere',
          },
          {
            type: 'string',
            name: 'category',
            label: 'Kategori',
            options: [
              { value: 'seminar', label: 'Seminar' },
              { value: 'gruppe', label: 'Samtalegruppe' },
              { value: 'kurs', label: 'Kurs' },
              { value: 'dialog', label: 'Dialog' },
            ],
            required: true,
          },
          {
            type: 'boolean',
            name: 'isOnline',
            label: 'Nettbasert arrangement?',
          },
          {
            type: 'string',
            name: 'registrationUrl',
            label: 'Påmeldingslenke (valgfritt)',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Utfyllende informasjon',
            isBody: true,
          },
        ],
      },

      /* ── PAGES (om meg, tjenester) ────────────────────────── */
      {
        name: 'sider',
        label: 'Statiske sider',
        path: 'content/sider',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Sidetittel',
            isTitle: true,
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Innhold',
            isBody: true,
          },
        ],
      },
    ],
  },
})
