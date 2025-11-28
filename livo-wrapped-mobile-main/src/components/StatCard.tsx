import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  highlight?: boolean;
  animate?: boolean;
  delay?: number;
  compact?: boolean;
}

const StatCard = ({ 
  icon, 
  value, 
  label, 
  highlight = false,
  animate = true,
  delay = 0,
  compact = false
}: StatCardProps) => {
  const animationClass = animate ? "opacity-0 animate-scale-in" : "";
  const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  if (compact) {
    return (
      <div 
        className={cn(
          "rounded-2xl p-3 flex flex-col gap-1.5 transition-all duration-200",
          highlight 
            ? "bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30" 
            : "bg-[#114454]/10 border border-[#114454]/10",
          animationClass
        )}
        style={delayStyle}
      >
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-1 rounded-lg",
            highlight ? "bg-primary/20 text-primary" : "bg-[#114454]/10 text-primary"
          )}>
            {icon}
          </div>
          <span className={cn(
            "text-lg font-bold",
            highlight ? "gradient-text" : "text-[#114454]"
          )}>
            {value}
          </span>
        </div>
        <p className={cn(
          "text-[10px] font-medium uppercase tracking-wider",
          highlight ? "text-primary/70" : "text-[#114454]/50"
        )}>
          {label}
        </p>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "rounded-2xl p-4 flex flex-col items-start gap-2 transition-all duration-200 hover:scale-105",
        highlight 
          ? "bg-gradient-to-br from-primary/25 to-primary/15 border-2 border-primary/40 shadow-[0_0_20px_-5px_rgba(54,195,160,0.4)]" 
          : "bg-white/90 backdrop-blur-sm border border-gray-100/50 shadow-sm",
        animationClass
      )}
      style={delayStyle}
    >
      <div className="flex items-center gap-2">
        <div className={cn(
          "p-1.5 rounded-lg",
          highlight ? "bg-primary/25 text-primary" : "bg-primary/10 text-primary"
        )}>
          {icon}
        </div>
        <span className={cn(
          "text-xl font-bold",
          highlight ? "gradient-text" : "text-card-foreground"
        )}>
          {value}
        </span>
      </div>
      <p className="text-xs font-medium text-card-foreground/60 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
};

export default StatCard;
