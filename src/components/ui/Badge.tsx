import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "outline";
}

export const Badge = ({
  variant = "default",
  className,
  ...props
}: BadgeProps) => {
  const variants = {
    default: "bg-surface text-text-secondary border-border-aurora",
    success: "bg-accent-primary/10 text-accent-primary border-accent-primary/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
    outline: "bg-transparent text-text-muted border-border-aurora",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold border tabular-nums",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
