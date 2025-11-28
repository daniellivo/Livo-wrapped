import { ReactNode } from 'react';
import LivoLines from './LivoLines';

interface SlideContentProps {
  children: ReactNode;
  className?: string;
  linesPosition?: number; // 0-9 for different positions
}

// Different transform configurations for each slide to create movement effect
const linesTransforms = [
  'translate(-20%, -10%) rotate(-5deg) scale(1.3)',
  'translate(10%, -30%) rotate(15deg) scale(1.4)',
  'translate(-30%, 20%) rotate(-20deg) scale(1.2)',
  'translate(20%, 10%) rotate(10deg) scale(1.5)',
  'translate(-10%, -20%) rotate(-15deg) scale(1.3)',
  'translate(30%, -10%) rotate(25deg) scale(1.4)',
  'translate(-25%, 30%) rotate(-10deg) scale(1.2)',
  'translate(15%, 25%) rotate(5deg) scale(1.5)',
  'translate(-15%, -15%) rotate(-25deg) scale(1.3)',
  'translate(25%, 15%) rotate(20deg) scale(1.4)',
];

const SlideContent = ({ children, className = '', linesPosition = 0 }: SlideContentProps) => {
  const transform = linesTransforms[linesPosition % linesTransforms.length];
  
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center px-6 relative overflow-hidden ${className}`}>
      {/* Background lines */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ transform }}
      >
        <LivoLines className="w-full h-full" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default SlideContent;
