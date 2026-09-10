import { cn } from "../../lib/utils";

interface SliderProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  showValue?: boolean;
  valueSuffix?: string;
}

export const Slider = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className,
  showValue = true,
  valueSuffix = "",
}: SliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center px-1">
          {label && (
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-widest">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-bold text-accent-primary tabular-nums">
              {value}{valueSuffix}
            </span>
          )}
        </div>
      )}
      <div className="relative h-6 flex items-center group">
        {/* Track */}
        <div className="absolute h-1.5 w-full bg-surface rounded-full overflow-hidden border border-border-aurora/30">
          <div
            className="absolute h-full bg-accent-primary transition-all duration-150 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Actual Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10 accent-accent-primary"
          aria-label={label}
        />
        
        {/* Visual Thumb */}
        <div
          className="absolute w-5 h-5 bg-text-primary rounded-full shadow-xl pointer-events-none transition-all duration-150 ease-out border-2 border-accent-primary ring-0 group-hover:ring-4 group-hover:ring-accent-primary/20"
          style={{ 
            left: `${percentage}%`,
            transform: 'translateX(-50%)'
          }}
        />
      </div>
    </div>
  );
};
