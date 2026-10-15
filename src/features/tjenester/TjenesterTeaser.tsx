import { Button } from "#/components/ui/button";
import { DisplayHeading } from "#/components/ui/DisplayHeading";
import IslandKicker from "#/components/ui/IslandKicker";
import IslandShell from "#/components/ui/IslandShell";
import { Link } from "@tanstack/react-router";
import { tinaField } from "tinacms/tina-field";
import type { PagesHomepage, TjenesterConnectionQuery } from "../../../tina/__generated__/types";

const TjenesterTeaser = ({ page, data }: { page: PagesHomepage; data: TjenesterConnectionQuery }) => {
  
  const tjenesterFromCMS = (data.tjenesterConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null)
    .sort((a, b) => {
      const aOrden = (a as { orden?: number }).orden ?? Number.MAX_SAFE_INTEGER;
      const bOrden = (b as { orden?: number }).orden ?? Number.MAX_SAFE_INTEGER;
      if (aOrden !== bOrden) return aOrden - bOrden;
      return (a.tittel || "").localeCompare(b.tittel || "", "nb");
    });

  return (
    <section className="pb-12 pt-15 xl:pt-40">
      <div className="mb-8 text-center">
        <IslandKicker className="mb-2">Hva jeg tilbyr</IslandKicker>
        <DisplayHeading
          as="h2"
          size="xl"
          className="text-center"
          data-tina-field={tinaField(page, "servicesHeading")}
        >
          {page.servicesHeading || "Tjenester tilpasset ditt behov"}
        </DisplayHeading>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tjenesterFromCMS.slice(0, 4).map((tjeneste, i) => (
          <IslandShell
            key={tjeneste.id}
            isFeature
            className="rise-in overflow-hidden p-0"
            style={{ animationDelay: `${i * 80 + 60}ms` }}
          >
            <Link
              to="/tjenester"
              hash={tjeneste._sys.filename.replace(".json", "")}
              className="group flex flex-col h-full"
            >
              {tjeneste.image && (
                <div className="overflow-hidden">
                  <img
                    src={tjeneste.image}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    alt={tjeneste.tittel}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                    data-tina-field={tinaField(tjeneste, "image")}
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
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
              </div>
            </Link>
          </IslandShell>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link to="/tjenester">Alle tjenester og priser</Link>
        </Button>
      </div>
    </section>
  );
};

export default TjenesterTeaser;
