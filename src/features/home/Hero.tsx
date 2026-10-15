import { Button } from "#/components/ui/button";
import { DisplayHeading } from "#/components/ui/DisplayHeading";
import IslandKicker from "#/components/ui/IslandKicker";
import { OptimizedImage } from "#/components/ui/OptimizedImage";
import PageWrap from "#/components/ui/PageWrap";
import { Link } from "@tanstack/react-router";
import { tinaField } from "tinacms/tina-field";

const Hero = ({ page }: { page: any }) => {
  return (
    <section className="relative pb-4">
      <div className="relative overflow-hidden">
        <OptimizedImage
          src={page.heroImage}
          fallbackSrc="/uploads/hero-chairs.jpg"
          sizes="100vw"
          defaultWidth={1200} // High resolution starting point if srcSet isn't evaluated
          loading="eager" // Eager load for maximum SEO page-speed performance
          fetchPriority="high"
          decoding="async"
          alt="Hero image"
          className="aspect-16/7 w-full object-cover object-bottom lg:opacity-30"
          data-tina-field={tinaField(page, "heroImage")}
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
      <PageWrap>
        <div className="mt-6 sm:-mt-16 lg:-mt-100 relative z-10">
          <div className="rise-in mx-auto lg:mx-0 max-w-4xl text-center lg:text-left">
            <IslandKicker
              className="mb-3"
              data-tina-field={tinaField(page, "kicker")}
            >
              {page.kicker}
            </IslandKicker>
            <DisplayHeading
              as="h1"
              size="2xl"
              className="mb-5 leading-[1.06] tracking-tight"
              data-tina-field={tinaField(page, "title")}
            >
              {page.title}
            </DisplayHeading>
            <p
              className="mx-auto lg:mx-0 mb-8 max-w-2xl text-base text-sea-ink-soft leading-relaxed sm:text-lg"
              data-tina-field={tinaField(page, "subtitle")}
            >
              {page.subtitle}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <Button asChild size="lg">
                <Link to="/tjenester">Se tjenester og priser</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/om-meg">Hvem er jeg?</Link>
              </Button>
            </div>
          </div>
        </div>
      </PageWrap>
    </section>
  );
};

export default Hero;
