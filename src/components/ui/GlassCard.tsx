import { cn } from "../../lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive";
  children: React.ReactNode;
}

export const GlassCard = ({
  variant = "default",
  className,
  children,
  ...props
}: GlassCardProps) => {
  const variants = {
    default: "bg-surface/40 backdrop-blur-md border-border-aurora/50",
    elevated: "bg-elevated/60 backdrop-blur-lg border-border-aurora shadow-2xl",
    interactive: "bg-surface/40 backdrop-blur-md border-border-aurora/50 hover:border-accent-primary/30 hover:bg-surface/60 transition-all duration-300 cursor-pointer",
  };

  return (
    <div
      className={cn(
        "rounded-aurora border p-6",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
