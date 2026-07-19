import { useState, useEffect, type ReactNode } from "react";
import PageWrap from "./ui/PageWrap";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";

interface ContentLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper component for content pages.
 * Provides consistent spacing and max-width for all content pages.
 */
export default function ContentLayout({
  children,
  className = "",
}: ContentLayoutProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <main className={`py-6 md:py-12 ${className}`.trim()}>
        <PageWrap>{children}</PageWrap>
      </main>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          variant="default"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-lg bounce-in"
          aria-label="Scroll til toppen"
          title="Scroll til toppen"
        >
         <ChevronUp />
        </Button>
      )}
    </>
  );
}
