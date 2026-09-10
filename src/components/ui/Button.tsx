import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-accent-primary text-background hover:bg-accent-soft shadow-lg shadow-accent-primary/10",
    secondary: "bg-surface border border-border-aurora text-text-primary hover:bg-elevated",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface/50",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg font-medium",
  };

  return (
    <button
      className={cn(
        "rounded-aurora transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none font-medium outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
