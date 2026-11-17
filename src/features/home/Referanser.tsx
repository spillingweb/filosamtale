import { DisplayHeading } from "#/components/ui/DisplayHeading";
import IslandKicker from "#/components/ui/IslandKicker";
import IslandShell from "#/components/ui/IslandShell";
import { tinaField } from "tinacms/tina-field";
import type { PagesHomepage } from "../../../tina/__generated__/types";

const Referanser = ({ page }: { page: PagesHomepage }) => {
  if (!page.testimonials || page.testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="mb-8 text-center motion-safe:anim-scroll">
        <IslandKicker className="mb-2">Hva klientene sier</IslandKicker>
        <DisplayHeading as="h2" size="xl">
          Referanser
        </DisplayHeading>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {page.testimonials
          .filter((t): t is NonNullable<typeof t> => t !== null)
          .map((testimonial, index) => {
            // Calculate staggered animation index for small and large screens
            const smStagger =
              index % 2 === 1 ? "sm:[--index:1]" : "sm:[--index:0]";

            const lgStagger = [
              "lg:[--index:0]",
              "lg:[--index:1]",
              "lg:[--index:2]",
            ][index % 3];

            return (
              <IslandShell
                key={testimonial.name}
                className={`motion-safe:anim-scroll px-6 py-8 flex flex-col ${smStagger} ${lgStagger}`}
                isFeature
              >
                <blockquote className="flex-1">
                  <p
                    className="mb-6 text-base italic text-sea-ink-soft leading-relaxed"
                    data-tina-field={tinaField(testimonial, "quote")}
                  >
                    «{testimonial.quote}»
                  </p>
                </blockquote>
                <div className="mt-auto">
                  <p
                    className="font-semibold text-foreground"
                    data-tina-field={tinaField(testimonial, "name")}
                  >
                    {testimonial.name}
                  </p>
                  {testimonial.role && (
                    <p
                      className="text-sm text-sea-ink-soft"
                      data-tina-field={tinaField(testimonial, "role")}
                    >
                      {testimonial.role}
                    </p>
                  )}
                </div>
              </IslandShell>
            );
          })}
      </div>
    </section>
  );
};

export default Referanser;
