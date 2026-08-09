import { cn } from "#/lib/utils";

type IslandKickerProps = {
  children: React.ReactNode;
  className?: string;
};

const IslandKicker = ({
  children,
  className,
  ...props
}: IslandKickerProps & React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={cn(
        "tracking-[0.16em] uppercase font-bold text-[0.69rem] text-kicker",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default IslandKicker;
