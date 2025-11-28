import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SlideContentProps {
  children: ReactNode;
  className?: string;
}

const SlideContent = ({ 
  children, 
  className = ''
}: SlideContentProps) => {
  return (
    <div className={cn(
      "w-full h-full flex flex-col items-center justify-center px-5 relative overflow-hidden safe-top safe-bottom",
      className
    )}>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm">
        {children}
      </div>
    </div>
  );
};

export default SlideContent;
