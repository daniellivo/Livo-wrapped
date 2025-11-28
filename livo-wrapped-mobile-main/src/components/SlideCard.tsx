import { ReactNode } from 'react';

interface SlideCardProps {
  children: ReactNode;
  className?: string;
}

const SlideCard = ({ children, className = '' }: SlideCardProps) => {
  return (
    <div className={`bg-card text-card-foreground rounded-3xl shadow-sm px-8 py-6 max-w-sm mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default SlideCard;
