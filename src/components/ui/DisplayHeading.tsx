import { cn } from "#/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

interface DisplayHeadingProps<T extends HeadingLevel = "h2"> {
  /**
   * The semantic heading level (h1, h2, h3, etc.)
   * @default "h2"
   */
  as?: T;
  /**
   * Visual size of the heading, independent of semantic level
   * @default "lg"
   */
  size?: HeadingSize;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Heading content
   */
  children: React.ReactNode;
}

const sizeClasses: Record<HeadingSize, string> = {
  xs: "text-lg",
  sm: "text-xl",
  base: "text-2xl",
  lg: "text-2xl sm:text-3xl",
  xl: "text-3xl sm:text-4xl",
  "2xl": "text-3xl sm:text-4xl md:text-5xl",
  "3xl": "text-4xl sm:text-5xl md:text-6xl",
  "4xl": "text-5xl sm:text-6xl md:text-7xl",
};

/**
 * DisplayHeading component for consistent serif display headings throughout the app.
 * Uses the Fraunces font family for elegant, readable headings.
 *
 * @example
 * ```tsx
 * <DisplayHeading as="h1" size="3xl">Page Title</DisplayHeading>
 * <DisplayHeading as="h2" size="xl">Section Heading</DisplayHeading>
 * <DisplayHeading as="h3" size="lg">Subsection</DisplayHeading>
 * ```
 */
export function DisplayHeading<T extends HeadingLevel = "h2">({
  as,
  size = "lg",
  className,
  children,
  ...props
}: DisplayHeadingProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof DisplayHeadingProps<T>>) {
  const Component = (as || "h2") as ElementType;

  return (
    <Component
      className={cn(
        "font-serif font-bold text-foreground",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
