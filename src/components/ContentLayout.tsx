import type { ReactNode } from "react";

interface ContentLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper component for content pages.
 * Provides consistent spacing and max-width for all content pages.
 */
export default function ContentLayout({ children, className = '' }: ContentLayoutProps) {
  return (
    <main className={`page-wrap md:px-4 py-4 md:py-12 ${className}`.trim()}>
      {children}
    </main>
  );
}
