import ContentLayout from "#/components/ContentLayout";
import PageHeader from "#/components/PageHeader";
import { tinaField } from "tinacms/tina-field";
import type {
  Blogg,
  BloggConnectionQuery,
  PagesQuery,
} from "../../../tina/__generated__/types";
import Featured from "./Featured";
import BloggCard from "./BloggCard";

const BloggPage = ({
  pageData,
  bloggData,
}: {
  pageData: PagesQuery;
  bloggData: BloggConnectionQuery;
}) => {
  const page = pageData.pages;

  // Type guard: ensure we have header template
  if (page.__typename !== "PagesHeader") {
    throw new Error("Expected header template for blogg.md");
  }

  // Extract posts from connection
  const posts = (bloggData.bloggConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featured = posts[0];
  const rest = posts.slice(1);

  if (!featured) {
    return (
      <ContentLayout>
        <p>Ingen blogginnlegg funnet.</p>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout>
      {/* Header */}
      <PageHeader
        pageName="Blogg"
        title={page.title}
        description={page.intro || ""}
        tinaFields={{
          title: tinaField(page, "title"),
          description: tinaField(page, "intro"),
        }}
      />

      {/* Featured post */}
      <Featured content={featured as Blogg} />

      {/* All other posts */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, i) => (
          <BloggCard post={post as Blogg} index={i} key={post.id} />
        ))}
      </div>
    </ContentLayout>
  );
};

export default BloggPage;
