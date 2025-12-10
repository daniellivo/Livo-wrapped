import { useState, useRef, useEffect, ReactNode } from 'react';

interface SliderProps {
  children: ReactNode[];
  onSlideChange?: (index: number) => void;
}

const Slider = ({ children, onSlideChange }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState<boolean | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideCount = children.length;
  const isLastSlide = currentSlide === slideCount - 1;

  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentSlide);
    }
  }, [currentSlide, onSlideChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setIsHorizontalSwipe(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;

    // Determinar dirección del swipe si aún no se ha determinado
    if (isHorizontalSwipe === null && (Math.abs(diffX) > 10 || Math.abs(diffY) > 10)) {
      const isHorizontal = Math.abs(diffX) > Math.abs(diffY);
      setIsHorizontalSwipe(isHorizontal);
      
      // Si es la última slide y es scroll vertical, permitir scroll nativo
      if (isLastSlide && !isHorizontal) {
        setIsDragging(false);
        return;
      }
    }

    // Solo manejar swipe horizontal
    if (isHorizontalSwipe === true) {
      setTranslateX(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging && isHorizontalSwipe !== true) {
      setIsHorizontalSwipe(null);
      return;
    }
    
    setIsDragging(false);
    
    const threshold = 80;
    
    if (isHorizontalSwipe === true) {
      if (translateX > threshold && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (translateX < -threshold && currentSlide < slideCount - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }
    
    setTranslateX(0);
    setIsHorizontalSwipe(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setIsHorizontalSwipe(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const currentY = e.clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;

    // Determinar dirección si aún no se ha determinado
    if (isHorizontalSwipe === null && (Math.abs(diffX) > 10 || Math.abs(diffY) > 10)) {
      setIsHorizontalSwipe(Math.abs(diffX) > Math.abs(diffY));
    }

    if (isHorizontalSwipe === true) {
      setTranslateX(diffX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    const threshold = 80;
    
    if (isHorizontalSwipe === true) {
      if (translateX > threshold && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (translateX < -threshold && currentSlide < slideCount - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }
    
    setTranslateX(0);
    setIsHorizontalSwipe(null);
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
