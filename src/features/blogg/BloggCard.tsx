import { Badge } from "#/components/ui/badge";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import IslandShell from "#/components/ui/IslandShell";
import { Link } from "@tanstack/react-router";
import { tinaField } from "tinacms/tina-field";
import type { Blogg } from "../../../tina/__generated__/types";

const BloggCard = ({ post, index }: { post: Blogg; index: number }) => {
  return (
    <IslandShell
      className="animate-rise-in group cursor-pointer flex flex-col overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
      isFeature
    >
      <Link
        to="/blogg/$slug"
        params={{ slug: post._sys.filename.replace(".md", "") }}
        className="flex flex-col h-full"
      >
        {post.coverImage && (
          <div className="overflow-hidden">
            <img
              src={post.coverImage}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              alt={post.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              data-tina-field={tinaField(post, "coverImage")}
            />
          </div>
        )}
        <CardHeader className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Badge
              variant="accent"
              data-tina-field={tinaField(post, "category")}
            >
              {post.category}
            </Badge>
            <span
              className="text-xs text-muted-foreground"
              data-tina-field={tinaField(post, "date")}
            >
              {new Date(post.date).toLocaleDateString("nb-NO", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              })}
            </span>
          </div>
          <CardTitle
            className="text-lg leading-snug text-balance"
            data-tina-field={tinaField(post, "title")}
          >
            {post.title}
          </CardTitle>
          <CardDescription
            className="line-clamp-4 leading-relaxed"
            data-tina-field={tinaField(post, "excerpt")}
          >
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-semibold text-lagoon-deep no-underline group-hover:underline">
            Les innlegget →
          </p>
        </CardContent>
      </Link>
    </IslandShell>
  );
};

export default BloggCard;
