import IslandShell from "#/components/ui/IslandShell";
import { tinaField } from "tinacms/tina-field";
import type { Tjenester } from "../../../tina/__generated__/types";
import { DisplayHeading } from "#/components/ui/DisplayHeading";
import { Badge } from "#/components/ui/badge";
import IslandKicker from "#/components/ui/IslandKicker";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Button } from "#/components/ui/button";

const TjenesteCard = ({ tjeneste }: { tjeneste: Tjenester }) => {
  return (
    <IslandShell>
      <article
        id={tjeneste._sys.filename.replace(".json", "")}
        className="grid scroll-mt-24 gap-6 lg:gap-y-0 p-6 sm:p-8 lg:grid-cols-[280px_1fr]"
      >
        {/* Image - top on mobile, left on desktop */}
        {tjeneste.image && (
          <div className="lg:row-span-2 order-first lg:order-0">
            <img
              src={tjeneste.image}
              alt={tjeneste.tittel}
              sizes="100vw"
              className="w-full h-48 lg:h-full object-cover rounded-lg"
              data-tina-field={tinaField(tjeneste, "image")}
            />
          </div>
        )}

        <div className="flex flex-col gap-6 justify-between">
          {/* Description */}
          <div className={tjeneste.image ? "" : "lg:col-span-2"}>
            <div className="flex flex-wrap items-center gap-2">
              <DisplayHeading
                as="h3"
                size="base"
                data-tina-field={tinaField(tjeneste, "tittel")}
              >
                {tjeneste.tittel}
              </DisplayHeading>
              {tjeneste.badge && (
                <Badge
                  variant="accent"
                  data-tina-field={tinaField(tjeneste, "badge")}
                >
                  {tjeneste.badge}
                </Badge>
              )}
            </div>
            <IslandKicker
              className="mb-3"
              data-tina-field={tinaField(tjeneste, "undertittel")}
            >
              {tjeneste.undertittel}
            </IslandKicker>
            <div
              className="mb-4 text-sea-ink-soft leading-relaxed prose dark:prose-invert prose-sm max-w-none"
              data-tina-field={tinaField(tjeneste, "description")}
            >
              <TinaMarkdown content={tjeneste.description} />
            </div>
            <ul
              className="space-y-1.5"
              data-tina-field={tinaField(tjeneste, "detaljer")}
            >
              {(tjeneste.detaljer || []).map((detalj, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-sea-ink-soft"
                >
                  <svg
                    viewBox="0 0 16 16"
                    width="14"
                    height="14"
                    fill="none"
                    className="mt-0.5 shrink-0 text-primary"
                  >
                    <path
                      d="M3 8l4 4 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {detalj}
                </li>
              ))}
            </ul>
          </div>

          {/* Prices */}
          <div className="rounded-xl border p-5 h-full flex flex-col lg:row-span-2">
            <IslandKicker className="mb-3">Priser</IslandKicker>
            <ul
              className="space-y-3 flex-1"
              data-tina-field={tinaField(tjeneste, "priser")}
            >
              {(tjeneste.priser || []).map((pris, idx) => {
                if (!pris?.label || !pris?.pris) return null;
                return (
                  <li
                    key={idx}
                    className="flex items-center justify-between gap-3 border-b pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-sea-ink-soft text-balance">
                      {pris.label}
                    </span>
                    <span className="font-semibold text-foreground text-nowrap">
                      {pris.pris}
                    </span>
                  </li>
                );
              })}
            </ul>
            <Button asChild className="mt-5 w-full">
              <a href="#kontakt">Book time</a>
            </Button>
          </div>
        </div>
      </article>
    </IslandShell>
  );
};

export default TjenesteCard;
