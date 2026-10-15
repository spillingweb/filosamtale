import type {
  BloggConnectionQuery,
  PagesHomepage,
  PagesQuery,
  TjenesterConnectionQuery,
} from "../../../tina/__generated__/types";
import PageWrap from "#/components/ui/PageWrap";
import TjenesterTeaser from "../tjenester/TjenesterTeaser";
import OmMegTeaser from "../om-meg/OmMegTeaser";
import Referanser from "./Referanser";
import BloggTeaser from "../blogg/BloggTeaser";
import CallToAction from "./CallToAction";
import Hero from "./Hero";

const HomePage = ({
  pageData,
  tjenesterData,
  bloggData,
}: {
  pageData: PagesQuery;
  tjenesterData: TjenesterConnectionQuery;
  bloggData: BloggConnectionQuery;
}) => {
  const page = pageData.pages as PagesHomepage;

  // Type guard: ensure we have homepage template
  if (page.__typename !== "PagesHomepage") {
    throw new Error("Expected homepage template for forside.md");
  }

  return (
    <main>
      {/* Hero section */}
      <Hero page={page} />

      <PageWrap>
        {/* Services section */}
        <TjenesterTeaser page={page} data={tjenesterData} />

        {/* About section */}
        <OmMegTeaser page={page} />

        {/* Client testimonials section */}
        {page.testimonials && page.testimonials.length > 0 && (
          <Referanser page={page} />
        )}

        {/* Blog section */}
        <BloggTeaser page={page} data={bloggData} />

        {/* CTA band */}
        <CallToAction page={page} />
      </PageWrap>
    </main>
  );
};

export default HomePage;
