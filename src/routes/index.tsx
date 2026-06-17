import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";
import { client } from "../../tina/__generated__/client";
import { useTina, tinaField } from "tinacms/dist/react";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [pageResult, tjenesterResult, bloggResult] = await Promise.all([
      client.queries.pages({ relativePath: "forside.md" }),
      client.queries.tjenesterConnection({ sort: "orden" }),
      client.queries.bloggConnection({ sort: "date", last: -1 }),
    ]);
    return {
      page: pageResult,
      tjenester: tjenesterResult,
      blogg: bloggResult,
    };
  },
  head: () => ({
    title: "Filosamtale — Filosofisk veiledning og dialog i Fevik",
    meta: [
      {
        name: "description",
        content:
          "Filosamtale tilbyr filosofisk veiledning, samtalegrupper og seminarer i Fevik, Agder. Utforsk livets store spørsmål med sykepleier og filosof Tina Maria Lie.",
      },
      {
        property: "og:title",
        content: "Filosamtale — Filosofisk veiledning og dialog",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://filosamtale.no" },
    ],
    links: [{ rel: "canonical", href: "https://filosamtale.no" }],
  }),
  component: Forside,
});

function Forside() {
  const initialData = Route.useLoaderData();

  // Enable live preview for page content
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  // Enable live preview for tjenester
  const { data: tjenesterData } = useTina({
    query: initialData.tjenester.query,
    variables: initialData.tjenester.variables,
    data: initialData.tjenester.data,
  });

  // Enable live preview for blog posts
  const { data: bloggData } = useTina({
    query: initialData.blogg.query,
    variables: initialData.blogg.variables,
    data: initialData.blogg.data,
  });

  const page = pageData.pages;

  // Type guard: ensure we have homepage template
  if (page.__typename !== "PagesHomepage") {
    throw new Error("Expected homepage template for forside.md");
  }

  // Extract tjenester from connection
  const tjenesterFromCMS = (tjenesterData.tjenesterConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null)
    .sort((a, b) => (a.orden || 999) - (b.orden || 999));

  // Extract blog posts
  const allBloggPosts = (bloggData.bloggConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const sisteInnlegg = allBloggPosts.slice(0, 3);

  const hasStats = page.stat1Value || page.stat2Value || page.stat3Value;

  return (
    <main>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative pb-4">
        {/* Hero visual */}
        <div className="relative overflow-hidden">
          <img
            src={page.heroImage || "/uploads/hero-chairs.jpg"}
            alt="Hero image"
            className="aspect-16/7 w-full object-cover object-bottom"
            data-tina-field={tinaField(page, "heroImage")}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{
              filter:
                "sepia(0.15) saturate(0.95) hue-rotate(-5deg) brightness(1.02) contrast(1.05)",
              maskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%)",
            }}
          />
        </div>

        <div className="page-wrap px-2 sm:px-4 mt-6 sm:-mt-16 lg:-mt-24 relative z-10">
          <div className="rise-in mx-auto max-w-4xl text-center">
            <p
              className="island-kicker mb-3"
              data-tina-field={tinaField(page, "kicker")}
            >
              {page.kicker}
            </p>
            <h1
              className="display-title mb-5 text-4xl leading-[1.06] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              data-tina-field={tinaField(page, "title")}
            >
              {page.title}
            </h1>
            <p
              className="mx-auto mb-8 max-w-2xl text-base text-sea-ink-soft leading-relaxed sm:text-lg"
              data-tina-field={tinaField(page, "subtitle")}
            >
              {page.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Button asChild size="lg">
                <Link to="/tjenester">Se tjenester og priser</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/om-meg">Hvem er jeg?</Link>
              </Button>
            </div>

            {/* Stat bar */}
            {hasStats && (
              <div className="mx-auto grid max-w-lg grid-cols-3 gap-4 border-t pt-8">
                <div className="text-center">
                  <p
                    className="display-title text-2xl font-bold text-foreground"
                    data-tina-field={tinaField(page, "stat1Value")}
                  >
                    {page.stat1Value}
                  </p>
                  <p
                    className="mt-0.5 text-xs text-sea-ink-soft"
                    data-tina-field={tinaField(page, "stat1Label")}
                  >
                    {page.stat1Label}
                  </p>
                </div>
                <div className="text-center">
                  <p
                    className="display-title text-2xl font-bold text-foreground"
                    data-tina-field={tinaField(page, "stat2Value")}
                  >
                    {page.stat2Value}
                  </p>
                  <p
                    className="mt-0.5 text-xs text-sea-ink-soft"
                    data-tina-field={tinaField(page, "stat2Label")}
                  >
                    {page.stat2Label}
                  </p>
                </div>
                <div className="text-center">
                  <p
                    className="display-title text-2xl font-bold text-foreground"
                    data-tina-field={tinaField(page, "stat3Value")}
                  >
                    {page.stat3Value}
                  </p>
                  <p
                    className="mt-0.5 text-xs text-sea-ink-soft"
                    data-tina-field={tinaField(page, "stat3Label")}
                  >
                    {page.stat3Label}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── TJENESTER OVERVIEW ────────────────────────────────── */}
      <section className="page-wrap px-2 sm:px-4 pb-12 pt-6">
        <div className="mb-8 text-center">
          <p className="island-kicker mb-2">Hva jeg tilbyr</p>
          <h2
            className="display-title text-3xl font-bold text-foreground sm:text-4xl"
            data-tina-field={tinaField(page, "servicesHeading")}
          >
            {page.servicesHeading || "Tjenester tilpasset ditt behov"}
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tjenesterFromCMS.slice(0, 4).map((tjeneste, i) => (
            <article
              key={tjeneste.id}
              className="island-shell feature-card rise-in rounded-2xl p-6"
              style={{ animationDelay: `${i * 80 + 60}ms` }}
            >
              <Link
                to="/tjenester"
                hash={tjeneste._sys.filename.replace(".json", "")}
                className="group flex flex-col h-full"
              >
                <h3
                  className="mb-2 font-semibold text-foreground"
                  data-tina-field={tinaField(tjeneste, "tittel")}
                >
                  {tjeneste.tittel}
                </h3>
                <p
                  className="mb-4 text-sm text-sea-ink-soft leading-relaxed flex-1"
                  data-tina-field={tinaField(tjeneste, "undertittel")}
                >
                  {tjeneste.undertittel}
                </p>
                <p className="text-xs font-semibold text-lagoon-deep no-underline group-hover:underline">
                  Les mer →
                </p>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/tjenester">Alle tjenester og priser</Link>
          </Button>
        </div>
      </section>

      {/* ── QUOTE DIVIDER ─────────────────────────────────────── */}
      <section className="px-2 sm:px-4 py-12">
        <div className="page-wrap">
          <blockquote className="island-shell rise-in rounded-2xl px-8 py-10 text-center sm:px-16">
            <p
              className="display-title mb-4 text-2xl font-bold italic text-foreground leading-relaxed sm:text-3xl"
              data-tina-field={tinaField(page, "quote")}
            >
              «{page.quote}»
            </p>
            <footer
              className="island-kicker text-kicker"
              data-tina-field={tinaField(page, "quoteAuthor")}
            >
              — {page.quoteAuthor}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── OM MEG TEASER ─────────────────────────────────────── */}
      <section className="page-wrap px-2 sm:px-4 py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Profile portrait */}
          <div className="order-2 lg:order-1">
            <div className="island-shell overflow-hidden rounded-2xl">
              <img
                src={page.profileImage || "/uploads/profile.jpg"}
                alt={`${page.aboutName} - Sykepleier og filosof`}
                className="aspect-4/3 w-full object-cover"
                data-tina-field={tinaField(page, "profileImage")}
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="island-kicker mb-3">Om meg</p>
            <h2
              className="display-title mb-4 text-3xl font-bold text-foreground sm:text-4xl"
              data-tina-field={tinaField(page, "aboutName")}
            >
              {page.aboutName}
            </h2>
            <p
              className="mb-3 text-sea-ink-soft leading-relaxed"
              data-tina-field={tinaField(page, "aboutText1")}
            >
              {page.aboutText1}
            </p>
            <p
              className="mb-6 text-sea-ink-soft leading-relaxed"
              data-tina-field={tinaField(page, "aboutText2")}
            >
              {page.aboutText2}
            </p>
            <Button asChild>
              <Link to="/om-meg">Les mer om meg</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── BLOGG TEASER ──────────────────────────────────────── */}
      <section className="page-wrap px-2 sm:px-4 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="island-kicker mb-2">Fra bloggen</p>
            <h2
              className="display-title text-3xl font-bold text-foreground sm:text-4xl"
              data-tina-field={tinaField(page, "blogHeading")}
            >
              {page.blogHeading || "Tanker og refleksjoner"}
            </h2>
          </div>
          <Link
            to="/blogg"
            className="hidden text-sm font-semibold text-lagoon-deep no-underline hover:underline sm:block"
          >
            Se alle innlegg →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sisteInnlegg.map((post, i) => (
            <Card
              key={post.id}
              className="rise-in transition hover:-translate-y-1 flex flex-col h-full"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <CardHeader className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Badge
                    variant="accent"
                    data-tina-field={tinaField(post, "category")}
                  >
                    {post.category}
                  </Badge>
                  <span
                    className="text-xs text-muted-foreground"
                    data-tina-field={tinaField(post, "date")}
                  >
                    {new Date(post.date).toLocaleDateString("nb-NO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <CardTitle
                  className="text-lg leading-snug text-balance"
                  data-tina-field={tinaField(post, "title")}
                >
                  {post.title}
                </CardTitle>
                <CardDescription
                  className="line-clamp-3 leading-relaxed"
                  data-tina-field={tinaField(post, "excerpt")}
                >
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  to="/blogg/$slug"
                  params={{ slug: post._sys.filename.replace(".md", "") }}
                  className="text-sm font-semibold text-lagoon-deep no-underline hover:underline"
                >
                  Les innlegget →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link to="/blogg">Se alle innlegg</Link>
          </Button>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────────────────── */}
      <section className="px-2 sm:px-4 pb-16 pt-8">
        <div className="page-wrap">
          <div className="island-shell rounded-2xl px-8 py-10 text-center sm:px-16">
            <p className="island-kicker mb-3">Neste steg</p>
            <h2
              className="display-title mb-4 text-2xl font-bold text-foreground sm:text-3xl"
              data-tina-field={tinaField(page, "ctaTitle")}
            >
              {page.ctaTitle}
            </h2>
            <p
              className="mx-auto mb-8 max-w-xl text-sea-ink-soft leading-relaxed"
              data-tina-field={tinaField(page, "ctaDescription")}
            >
              {page.ctaDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <a href="#kontakt">Ta kontakt</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/arrangementer">Se arrangementer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
