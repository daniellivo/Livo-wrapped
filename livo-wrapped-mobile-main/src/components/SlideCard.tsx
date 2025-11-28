import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SlideCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'highlight' | 'stat' | 'featured';
  animate?: boolean;
  delay?: number;
  hover?: boolean;
}

const SlideCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  animate = true,
  delay = 0,
  hover = true
}: SlideCardProps) => {
  const baseStyles = "rounded-3xl px-6 py-5 max-w-sm mx-auto w-full transition-all duration-300";
  
  const variants = {
    default: "glass-card text-card-foreground",
    glass: "glass-card-dark text-white",
    highlight: "glass-card-highlight text-white",
    stat: "glass-card-stat text-card-foreground",
    featured: cn(
      "bg-gradient-to-br from-[#114454] via-[#0D3540] to-[#114454]",
      "border border-primary/30",
      "shadow-[0_8px_32px_-8px_rgba(54,195,160,0.4),0_4px_16px_-4px_rgba(0,0,0,0.2)]",
      "text-white"
    )
  };

  const hoverStyles = hover ? "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]" : "";
  const animationClass = animate ? "opacity-0 animate-slide-up-fade" : "";
  const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return (
    <div 
      className={cn(baseStyles, variants[variant], hoverStyles, animationClass, className)}
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default SlideCard;
