// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env["GITHUB_BRANCH"] ?? process.env["VERCEL_GIT_COMMIT_REF"] ?? "main",
  clientId: process.env["TINA_PUBLIC_CLIENT_ID"] ?? null,
  token: process.env["TINA_TOKEN"] ?? null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      /* ── BLOG POSTS ─────────────────────────────────────── */
      {
        name: "blogg",
        label: "Blogginnlegg",
        path: "content/blogg",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.["title"] ? values["title"].toLowerCase().replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "innlegg"
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tittel",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Ingress / sammendrag",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Publiseringsdato",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Kategori",
            options: ["Filosofi", "Refleksjon", "Filosofihistorie", "Etikk", "Helse", "Annet"]
          },
          {
            type: "number",
            name: "readingTime",
            label: "Lesetid (minutter)"
          },
          {
            type: "image",
            name: "coverImage",
            label: "Forsidebilde"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Innhold",
            isBody: true
          }
        ]
      },
      /* ── EVENTS ──────────────────────────────────────────── */
      {
        name: "arrangementer",
        label: "Arrangementer",
        path: "content/arrangementer",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.["title"] ? values["title"].toLowerCase().replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "arrangement"
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tittel",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Beskrivelse",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Dato",
            required: true
          },
          {
            type: "datetime",
            name: "endDate",
            label: "Sluttdato (valgfritt, for flerdagskurs)"
          },
          {
            type: "string",
            name: "time",
            label: "Tidspunkt (f.eks. 18:00\u201320:00)",
            required: true
          },
          {
            type: "string",
            name: "location",
            label: "Sted",
            required: true
          },
          {
            type: "number",
            name: "price",
            label: "Pris (kr, 0 = gratis)",
            required: true
          },
          {
            type: "number",
            name: "capacity",
            label: "Maks antall deltakere"
          },
          {
            type: "string",
            name: "category",
            label: "Kategori",
            options: [
              { value: "seminar", label: "Seminar" },
              { value: "gruppe", label: "Samtalegruppe" },
              { value: "kurs", label: "Kurs" },
              { value: "dialog", label: "Dialog" }
            ],
            required: true
          },
          {
            type: "boolean",
            name: "isOnline",
            label: "Nettbasert arrangement?"
          },
          {
            type: "string",
            name: "registrationUrl",
            label: "P\xE5meldingslenke (valgfritt)"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Utfyllende informasjon",
            isBody: true
          }
        ]
      },
      /* ── PAGES (om meg, tjenester) ────────────────────────── */
      {
        name: "pages",
        label: "Statiske sider",
        path: "content/pages",
        format: "md",
        ui: {
          filename: {
            readonly: true
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Sidetittel",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "subtitle",
            label: "Undertittel"
          },
          {
            type: "string",
            name: "intro",
            label: "Introtekst",
            ui: { component: "textarea" }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Innhold",
            isBody: true
          }
        ]
      },
      /* ── SERVICES (tjenester) ──────────────────────────────── */
      {
        name: "tjenester",
        label: "Tjenester",
        path: "content/tjenester",
        format: "json",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.["tittel"] ? values["tittel"].toLowerCase().replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "tjeneste"
          }
        },
        fields: [
          {
            type: "string",
            name: "tittel",
            label: "Tittel",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "undertittel",
            label: "Undertittel",
            required: true
          },
          {
            type: "string",
            name: "badge",
            label: "Badge (valgfritt)",
            description: 'F.eks. "Popul\xE6r" eller "Fleksibelt"'
          },
          {
            type: "string",
            name: "beskrivelse",
            label: "Beskrivelse",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "string",
            name: "detaljer",
            label: "Detaljer",
            list: true,
            ui: {
              component: "list",
              defaultItem: "Ny detalj"
            }
          },
          {
            type: "object",
            name: "priser",
            label: "Priser",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: 'Label (f.eks. "60 min")',
                required: true
              },
              {
                type: "string",
                name: "pris",
                label: 'Pris (f.eks. "950 kr")',
                required: true
              }
            ]
          },
          {
            type: "number",
            name: "orden",
            label: "Sorteringsrekkef\xF8lge",
            description: "Lavere tall vises f\xF8rst"
          }
        ]
      },
      /* ── EDUCATION (utdanning) ──────────────────────────────── */
      {
        name: "utdanning",
        label: "Utdanning og kurs",
        path: "content/utdanning",
        format: "json",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.["grad"] ? values["grad"].toLowerCase().replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "utdanning"
          }
        },
        fields: [
          {
            type: "string",
            name: "ar",
            label: "\xC5r",
            required: true
          },
          {
            type: "string",
            name: "grad",
            label: "Grad/kurs",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "sted",
            label: "Institusjon",
            required: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
