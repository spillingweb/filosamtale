import { Link, type LinkProps } from "@tanstack/react-router";
import { cn } from "#/lib/utils";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * NavLink component with animated underline effect for navigation menus.
 * Automatically applies active state styling when the link matches the current route.
 *
 * @example
 * ```tsx
 * <NavLink to="/about">About</NavLink>
 * <NavLink to="/" activeOptions={{ exact: true }}>Home</NavLink>
 * ```
 */
export function NavLink({ children, className, ...props }: NavLinkProps) {
  return (
    <Link
      className={cn(
        // Base styles
        "relative inline-flex items-center text-sea-ink-soft no-underline",
        // After element for underline (applied via group pattern)
        "after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full",
        "after:origin-left after:scale-x-0 after:transition-transform after:duration-170 after:ease-linear",
        "after:bg-linear-to-r after:from-lagoon after:to-[#7ed3bf]",
        // Hover state
        "hover:text-sea-ink hover:after:scale-x-100",
        // Mobile adjustment
        "max-sm:after:-bottom-1",
        className
      )}
      activeProps={{
        className: cn(
          "text-sea-ink after:scale-x-100",
          className
        ),
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
