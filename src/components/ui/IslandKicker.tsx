import { cn } from "#/lib/utils";

const IslandKicker = ({ children, className, props }: { children: React.ReactNode; className?: string; props?: any }) => {
  return (
    <p
      className={cn("tracking-[0.16em] uppercase font-bold text-[0.69rem] text-kicker", className)}
      {...props}
    >
      {children}
    </p>
  );
};

export default IslandKicker;
