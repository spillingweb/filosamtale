import { Button } from "#/components/ui/button";
import { DisplayHeading } from "#/components/ui/DisplayHeading";
import IslandKicker from "#/components/ui/IslandKicker";
import IslandShell from "#/components/ui/IslandShell";
import { OptimizedImage } from "#/components/ui/OptimizedImage";
import { Link } from "@tanstack/react-router";
import { tinaField } from "tinacms/tina-field";
import type { PagesHomepage } from "../../../tina/__generated__/types";

const OmMegTeaser = ({ page }: { page: PagesHomepage }) => {
  return (
    <section className="px-2 sm:px-4 py-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Profile portrait */}
        <div className="order-2 lg:order-1">
          <IslandShell
            className="overflow-hidden"
            data-tina-field={tinaField(page, "profileImage")}
          >
            <OptimizedImage
              src={page.profileImage || "/uploads/profile.jpg"}
              defaultWidth={750}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy" // Lazy load below-the-fold content
              alt={`${page.aboutName} - Sykepleier og filosof`}
              className="aspect-4/3 w-full object-cover"
              data-tina-field={tinaField(page, "profileImage")}
            />
          </IslandShell>
        </div>

        <div className="order-1 lg:order-2">
          <IslandKicker className="mb-3">Om meg</IslandKicker>
          <DisplayHeading
            as="h2"
            size="xl"
            className="mb-4"
            data-tina-field={tinaField(page, "aboutName")}
          >
            {page.aboutName}
          </DisplayHeading>
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
  );
};

export default OmMegTeaser;
