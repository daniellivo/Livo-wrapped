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
        className="rounded-2xl p-3 flex flex-col gap-1.5"
        style={{ 
          opacity: 1,
          backgroundColor: highlight ? 'rgba(54, 195, 160, 0.15)' : 'rgba(17, 68, 84, 0.1)',
          border: highlight ? '1px solid rgba(54, 195, 160, 0.3)' : '1px solid rgba(17, 68, 84, 0.1)',
        }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="p-1 rounded-lg"
            style={{
              backgroundColor: highlight ? 'rgba(54, 195, 160, 0.2)' : 'rgba(17, 68, 84, 0.1)',
              color: '#36C3A0',
            }}
          >
            {icon}
          </div>
          <span 
            className="text-lg font-bold"
            style={{ color: highlight ? '#36C3A0' : '#114454' }}
          >
            {value}
          </span>
        </div>
        <p 
          className="text-[10px] font-medium uppercase tracking-wider"
          style={{ color: highlight ? 'rgba(54, 195, 160, 0.7)' : 'rgba(17, 68, 84, 0.5)' }}
        >
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
