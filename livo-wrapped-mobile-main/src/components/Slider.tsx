import { useState, useRef, useEffect, ReactNode } from 'react';

interface SliderProps {
  children: ReactNode[];
  onSlideChange?: (index: number) => void;
}

const Slider = ({ children, onSlideChange }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideCount = children.length;

  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentSlide);
    }
  }, [currentSlide, onSlideChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    const threshold = 80;
    
    if (translateX > threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (translateX < -threshold && currentSlide < slideCount - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    
    setTranslateX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    const threshold = 80;
    
    if (translateX > threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (translateX < -threshold && currentSlide < slideCount - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    
    setTranslateX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <div
      ref={sliderRef}
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))`,
          transitionDuration: isDragging ? '0ms' : '300ms',
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="min-w-full h-full flex items-center justify-center"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
