import React from "react";
import { cn } from "../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-text-secondary ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "bg-background-secondary border border-border-aurora rounded-aurora px-4 py-2.5 text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 disabled:opacity-50",
            error && "border-error focus:border-error focus:ring-error/10",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-error ml-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
