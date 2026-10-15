import { Button } from "#/components/ui/button";
import { DisplayHeading } from "#/components/ui/DisplayHeading";
import IslandKicker from "#/components/ui/IslandKicker";
import IslandShell from "#/components/ui/IslandShell";
import { Link } from "@tanstack/react-router";
import { tinaField } from "tinacms/tina-field";
import type { PagesHomepage } from "../../../tina/__generated__/types";

const CallToAction = ({ page }: { page: PagesHomepage }) => {
  return (
    <section className="pb-16 pt-8">
      <IslandShell className="px-8 py-10 text-center sm:px-16">
        <IslandKicker className="mb-3">Neste steg</IslandKicker>
        <DisplayHeading
          as="h2"
          size="lg"
          className="mb-4"
          data-tina-field={tinaField(page, "ctaTitle")}
        >
          {page.ctaTitle}
        </DisplayHeading>
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
      </IslandShell>
    </section>
  );
};

export default CallToAction;
