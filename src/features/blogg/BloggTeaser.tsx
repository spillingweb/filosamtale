import { Button } from "#/components/ui/button";
import { DisplayHeading } from "#/components/ui/DisplayHeading";
import IslandKicker from "#/components/ui/IslandKicker";
import { Link } from "@tanstack/react-router";
import type {
  Blogg,
  BloggConnectionQuery,
  PagesHomepage,
} from "../../../tina/__generated__/types";
import { tinaField } from "tinacms/tina-field";
import BloggCard from "./BloggCard";

const BloggTeaser = ({
  page,
  data,
}: {
  page: PagesHomepage;
  data: BloggConnectionQuery;
}) => {
  // Extract blog posts
  const allBloggPosts = (data.bloggConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const sisteInnlegg = allBloggPosts.slice(0, 3);

  return (
    <section className="py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <IslandKicker className="mb-2">Fra bloggen</IslandKicker>
          <DisplayHeading
            as="h2"
            size="xl"
            data-tina-field={tinaField(page, "blogHeading")}
          >
            {page.blogHeading || "Tanker og refleksjoner"}
          </DisplayHeading>
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
          <BloggCard post={post as Blogg} index={i} key={post.id} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Button asChild variant="outline">
          <Link to="/blogg">Se alle innlegg</Link>
        </Button>
      </div>
    </section>
  );
};

export default BloggTeaser;
