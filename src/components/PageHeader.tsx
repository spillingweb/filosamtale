import type { ReactNode } from "react";
import IslandKicker from "./ui/IslandKicker";
import { DisplayHeading } from "./ui/DisplayHeading";

const PageHeader = ({
  pageName,
  title,
  subtitle,
  description,
  tinaFields,
}: {
  pageName: string;
  title: string;
  subtitle?: string;
  description: string | ReactNode;
  tinaFields?: {
    title?: any;
    subtitle?: any;
    description?: any;
  };
}) => {
  return (
    <section className="rise-in py-5">
      <IslandKicker className="mb-3">{pageName}</IslandKicker>
      <DisplayHeading 
        as="h1"
        size="2xl"
        className="text-balance mb-4 max-w-2xl"
        data-tina-field={tinaFields?.title}
      >
        {title}
      </DisplayHeading>
      {subtitle && (
        <p 
          className="mb-4 text-lg text-sea-ink-soft"
          data-tina-field={tinaFields?.subtitle}
        >
          {subtitle}
        </p>
      )}
      <p 
        className="max-w-xl text-sea-ink-soft leading-relaxed"
        data-tina-field={tinaFields?.description}
      >
        {description}
      </p>
    </section>
  );
};

export default PageHeader;
