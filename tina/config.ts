import React from "react";
import { defineConfig } from "tinacms";

/**
 * Filosamtale — TinaCMS configuration
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
    process.env["GITHUB_BRANCH"] ??
    process.env["VERCEL_GIT_COMMIT_REF"] ??
    "main",
  clientId: process.env["TINA_PUBLIC_CLIENT_ID"] ?? null,
  token: process.env["TINA_TOKEN"] ?? null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  search: {
    tina: {
      indexerToken: "b15d2213274b9f00e2d9cc0e0cd63800f7840152",
      stopwordLanguages: ["no", "eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
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
            slugify: (values) =>
              values?.["title"]
                ? (values["title"] as string)
                    .toLowerCase()
                    .replace(/æ/g, "ae")
                    .replace(/ø/g, "o")
                    .replace(/å/g, "a")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
                : "innlegg",
          },
          router: ({ document }) => {
            return `/blogg/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tittel",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Ingress / sammendrag",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publiseringsdato",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Kategori",
            options: [
              "Filosofi",
              "Refleksjon",
              "Filosofihistorie",
              "Etikk",
              "Helse",
              "Annet",
            ],
          },
          {
            type: "number",
            name: "readingTime",
            label: "Lesetid (minutter)",
          },
          {
            type: "image",
            name: "coverImage",
            label: "Forsidebilde",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Innhold",
            isBody: true,
          },
        ],
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
            slugify: (values) =>
              values?.["title"]
                ? (values["title"] as string)
                    .toLowerCase()
                    .replace(/æ/g, "ae")
                    .replace(/ø/g, "o")
                    .replace(/å/g, "a")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
                : "arrangement",
          },
          router: () => {
            return "/arrangementer";
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tittel",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "description",
            label: "Beskrivelse",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Bilde/plakat",
            description: "Valgfritt bilde eller plakat for arrangementet",
          },
          {
            type: "datetime",
            name: "date",
            label: "Dato",
            required: true,
          },
          {
            type: "datetime",
            name: "endDate",
            label: "Sluttdato (valgfritt, for flerdagskurs)",
          },
          {
            type: "string",
            name: "time",
            label: "Tidspunkt (f.eks. 18:00–20:00)",
            required: true,
          },
          {
            type: "string",
            name: "location",
            label: "Sted",
            required: true,
          },
          {
            type: "number",
            name: "price",
            label: "Pris (kr, 0 = gratis)",
            required: true,
          },
          {
            type: "number",
            name: "capacity",
            label: "Maks antall deltakere",
          },
          {
            type: "reference",
            name: "kategorier",
            label: "Kategori",
            required: true,
            collections: ["kategorier"],
            ui: {
              optionComponent: (props: { label?: string }) => {
                return React.createElement(
                  "span",
                  null,
                  props?.label || "Ukjent kategori",
                );
              },
            },
          },
          {
            type: "boolean",
            name: "isOnline",
            label: "Nettbasert arrangement?",
          },
        ],
      },

      /* ── PAGES (om meg, tjenester, forside) ────────────────────────── */
      {
        name: "pages",
        label: "Statiske sider",
        path: "content/pages",
        format: "md",
        ui: {
          filename: {
            readonly: true,
          },
          router: ({ document }) => {
            const filename = document._sys.filename;
            if (filename === "forside") return "/";
            if (filename === "om-meg") return "/om-meg";
            if (filename === "tjenester") return "/tjenester";
            if (filename === "arrangementer") return "/arrangementer";
            if (filename === "blogg") return "/blogg";
            if (filename === "kontakt-info") return "/kontakt";
            return "/";
          },
        },
        templates: [
          {
            name: "homepage",
            label: "Forside",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Sidetittel",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "subtitle",
                label: "Undertittel",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "kicker",
                label: "Kicker-tekst (liten tekst over tittel)",
              },
              {
                type: "image",
                name: "heroImage",
                label: "Hovedbilde (hero)",
              },
              {
                type: "string",
                name: "stat1Value",
                label: "Statistikk 1: Verdi",
              },
              {
                type: "string",
                name: "stat1Label",
                label: "Statistikk 1: Etikett",
              },
              {
                type: "string",
                name: "stat2Value",
                label: "Statistikk 2: Verdi",
              },
              {
                type: "string",
                name: "stat2Label",
                label: "Statistikk 2: Etikett",
              },
              {
                type: "string",
                name: "stat3Value",
                label: "Statistikk 3: Verdi",
              },
              {
                type: "string",
                name: "stat3Label",
                label: "Statistikk 3: Etikett",
              },
              {
                type: "image",
                name: "profileImage",
                label: "Profilbilde (Om meg-seksjon)",
              },
              {
                type: "string",
                name: "aboutName",
                label: "Om meg: Navn",
              },
              {
                type: "string",
                name: "aboutText1",
                label: "Om meg: Avsnitt 1",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "aboutText2",
                label: "Om meg: Avsnitt 2",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "testimonials",
                label: "Referanser fra klienter",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.name || "Ny referanse" };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "quote",
                    label: "Sitat/referanse",
                    ui: { component: "textarea" },
                    required: true,
                  },
                  {
                    type: "string",
                    name: "name",
                    label: "Navn",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "role",
                    label: "Rolle/beskrivelse (valgfritt)",
                  },
                ],
              },
              {
                type: "string",
                name: "ctaTitle",
                label: "Call-to-action tittel",
              },
              {
                type: "string",
                name: "ctaDescription",
                label: "Call-to-action beskrivelse",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "servicesHeading",
                label: "Tjenester-seksjon: Overskrift",
              },
              {
                type: "string",
                name: "blogHeading",
                label: "Blogg-seksjon: Overskrift",
              },
            ],
          },
          {
            name: "standard",
            label: "Standard side",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Sidetittel",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "subtitle",
                label: "Undertittel",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "intro",
                label: "Introtekst",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "profileImage",
                label: "Profilbilde",
              },
              {
                type: "rich-text",
                name: "body",
                label: "Innhold",
                isBody: true,
              },
              {
                type: "string",
                name: "contactName",
                label: "Kontaktinfo: Navn",
              },
              {
                type: "string",
                name: "contactLocation",
                label: "Kontaktinfo: Sted",
              },
              {
                type: "string",
                name: "contactEmail",
                label: "Kontaktinfo: E-post",
              },
              {
                type: "object",
                name: "verdier",
                label: "Verdier",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.tittel || "Ny verdi" };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "tittel",
                    label: "Tittel",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "tekst",
                    label: "Beskrivelse",
                    ui: { component: "textarea" },
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            name: "header",
            label: "Side med kun header",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Sidetittel",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "intro",
                label: "Introtekst",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            name: "services",
            label: "Tjenester-side",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Sidetittel",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "subtitle",
                label: "Undertittel",
              },
              {
                type: "string",
                name: "intro",
                label: "Introtekst",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "infoBadge",
                label: "Informasjonsbadge tekst",
                description: "Tekst som vises i infoboksen øverst på siden",
              },
              {
                type: "object",
                name: "faq",
                label: "Vanlige spørsmål",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.question || "Nytt spørsmål" };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "question",
                    label: "Spørsmål",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "answer",
                    label: "Svar",
                    ui: { component: "textarea" },
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            name: "kontakt",
            label: "Kontaktinformasjon",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Sidetittel",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "kicker",
                label: "Kicker-tekst",
              },
              {
                type: "string",
                name: "heading",
                label: "Overskrift",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Beskrivelse",
                ui: { component: "textarea" },
                required: true,
              },
              {
                type: "string",
                name: "addressLine1",
                label: "Adresse linje 1",
              },
              {
                type: "string",
                name: "addressLine2",
                label: "Adresse linje 2",
              },
              {
                type: "string",
                name: "addressLine3",
                label: "Adresse linje 3",
              },
              {
                type: "string",
                name: "email",
                label: "E-postadresse",
                required: true,
              },
              {
                type: "string",
                name: "phone",
                label: "Telefonnummer",
                required: true,
              },
            ],
          },
        ],
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
            slugify: (values) =>
              values?.["tittel"]
                ? (values["tittel"] as string)
                    .toLowerCase()
                    .replace(/æ/g, "ae")
                    .replace(/ø/g, "o")
                    .replace(/å/g, "a")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
                : "tjeneste",
          },
        },
        fields: [
          {
            type: "string",
            name: "tittel",
            label: "Tittel",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "undertittel",
            label: "Undertittel",
            required: true,
          },
          {
            type: "string",
            name: "badge",
            label: "Badge (valgfritt)",
            description: 'F.eks. "Populær" eller "Fleksibelt"',
          },
          {
            type: "image",
            name: "image",
            label: "Bilde (valgfritt)",
            description: "Bilde som vises for denne tjenesten",
          },
          {
            type: "rich-text",
            name: "description",
            label: "Beskrivelse",
            required: true,
          },
          {
            type: "string",
            name: "detaljer",
            label: "Detaljer",
            list: true,
          },
          {
            type: "object",
            name: "priser",
            label: "Priser",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.label || "Ny pris (Ikke fylt ut)" };
              },
              defaultItem: () => {
                return {
                  label: "Ny tjeneste",
                  pris: "0 kr",
                };
              },
              validate: (value: any) => {
                console.log("Validating priser:", value);
                if (value?.length > 0) {
                  for (let i = 0; i < value.length; i++) {
                    if (!value[i]?.label || !value[i]?.pris) {
                      return "Alle priser må ha både en label og en pris.";
                    }
                  }
                }
              },
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: 'Label (f.eks. "60 min")',
                required: true,
              },
              {
                type: "string",
                name: "pris",
                label: 'Pris (f.eks. "950 kr")',
                required: true,
              },
            ],
          },
          {
            type: "number",
            name: "orden",
            label: "Sorteringsrekkefølge",
            description: "Lavere tall vises først",
          },
        ],
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
            slugify: (values) =>
              values?.["grad"]
                ? (values["grad"] as string)
                    .toLowerCase()
                    .replace(/æ/g, "ae")
                    .replace(/ø/g, "o")
                    .replace(/å/g, "a")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
                : "utdanning",
          },
        },
        fields: [
          {
            type: "string",
            name: "ar",
            label: "År",
            required: true,
          },
          {
            type: "string",
            name: "grad",
            label: "Grad/kurs",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "sted",
            label: "Institusjon",
            required: true,
          },
        ],
      },

      /* ── CATEGORIES (arrangementkategorier) ────────────────────── */
      {
        name: "kategorier",
        label: "Kategorier",
        path: "content/kategorier",
        format: "json",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.["value"]
                ? (values["value"] as string)
                    .toLowerCase()
                    .replace(/æ/g, "ae")
                    .replace(/ø/g, "o")
                    .replace(/å/g, "a")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
                : "kategori",
          },
        },
        fields: [
          {
            type: "string",
            name: "value",
            label: "Verdi (brukes i kode, f.eks. 'seminar')",
            required: true,
            description:
              "Intern verdi brukt i URL-er og filtrering. Må være unik.",
          },
          {
            type: "string",
            name: "label",
            label: "Visningsnavn (f.eks. 'Seminar')",
            isTitle: true,
            required: true,
            description: "Navnet som vises til brukere i menyer og lister.",
          },
        ],
      },
    ],
  },
});
