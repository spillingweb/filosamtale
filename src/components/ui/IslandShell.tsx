import { cn } from "#/lib/utils";
import type { ComponentProps } from "react";

interface IslandShellProps extends ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
  isFeature?: boolean; // Optional prop to indicate if this is a feature card
}

const IslandShell = ({
  children,
  className,
  isFeature,
  ...props
}: IslandShellProps) => {
  return (
    <div
      className={cn(
        "border border-line rounded-2xl bg-[linear-gradient(165deg,var(--card),var(--surface))] shadow-[0_1px_0_var(--inset-glint)_inset,0_22px_44px_oklch(35%_0.04_150/0.09),0_6px_18px_oklch(35%_0.04_150/0.06)] backdrop-blur-sm",
        isFeature &&
          "bg-[linear-gradient(165deg,color-mix(in_oklab,var(--card)_95%,oklch(99%_0.01_80)_5%),var(--surface))] shadow-[0_1px_0_var(--inset-glint)_inset,0_18px_34px_oklch(35%_0.04_150/0.08),0_4px_14px_oklch(35%_0.04_150/0.05)] hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--lagoon-deep)_38%,var(--line))] transition-all duration-200",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default IslandShell;
