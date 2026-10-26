import { Button } from "#/components/ui/button";
import { DisplayHeading } from "#/components/ui/DisplayHeading";
import IslandKicker from "#/components/ui/IslandKicker";
import IslandShell from "#/components/ui/IslandShell";
import { Link } from "@tanstack/react-router";
import { tinaField } from "tinacms/tina-field";
import type { PagesHomepage } from "../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const OmMegTeaser = ({ page }: { page: PagesHomepage }) => {
  return (
    <section className="px-2 sm:px-4 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Profile portrait */}
        <div className="order-2 md:order-1">
          <IslandShell
            className="overflow-hidden h-full"
            data-tina-field={tinaField(page, "profileImage")}
          >
            <img
              src={page.profileImage || "/uploads/profile.jpg"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              alt={`${page.aboutName} - Sykepleier og filosof`}
              className="w-full object-cover h-full"
              data-tina-field={tinaField(page, "profileImage")}
            />
          </IslandShell>
        </div>

        <div className="order-1 md:order-2">
          <IslandKicker className="mb-3">Om meg</IslandKicker>
          <DisplayHeading
            as="h2"
            size="xl"
            className="mb-4"
            data-tina-field={tinaField(page, "aboutName")}
          >
            {page.aboutName}
          </DisplayHeading>

          <div
            className="text-sea-ink-soft leading-relaxed flex flex-col gap-2 mb-4"
            data-tina-field={tinaField(page, "aboutText")}
          >
            <TinaMarkdown content={page.aboutText} />
          </div>
          <Button asChild>
            <Link to="/om-meg">Les mer om meg</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OmMegTeaser;
