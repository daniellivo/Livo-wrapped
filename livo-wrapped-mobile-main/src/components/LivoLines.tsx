import { useMemo } from 'react';

interface LivoLinesProps {
  className?: string;
  variant?: 1 | 2 | 3 | 'random';
}

// Línea 1 - Curva en S grande
const Line1 = () => (
  <svg
    viewBox="0 0 1464 1678"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      opacity="0.5"
      d="M28.0039 1622.55C949.854 1814.8 977.954 904.853 782.904 1001.63C587.851 1098.4 762.468 1506.91 1056.3 1489.07C1278.79 1475.56 1416.2 1238.67 1432.04 1083.27C1465.99 750.196 1205.56 595.409 1033.56 646.743C828.564 707.925 1086.13 895.243 1248.06 700.743C1409.99 506.243 1417.52 168.016 1270.07 28"
      stroke="#51D0AC"
      strokeWidth="56"
      strokeLinecap="round"
    />
  </svg>
);

// Línea 2 - Forma ovalada
const Line2 = () => (
  <svg
    viewBox="0 0 623 659"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      opacity="0.5"
      d="M552.982 422.547C476.448 580.991 299.982 672.046 143.013 612.055C-13.9563 552.064 8.98174 340.047 97.4817 216.548C185.982 93.0475 355.542 5.66349 477.482 33.0465C599.421 60.4305 629.516 264.103 552.982 422.547Z"
      stroke="#51D0AC"
      strokeWidth="56"
      strokeLinecap="round"
    />
  </svg>
);

// Línea 3 - Curva compleja
const Line3 = () => (
  <svg
    viewBox="0 0 879 1402"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      opacity="0.5"
      d="M347.978 28.0039C-110.612 276.802 -25.1319 766.479 361.208 752.149C510.898 746.599 575.898 597.188 452.638 515.93C256.338 386.533 -180.482 839.729 144.808 1099.54C470.088 1359.34 715.518 1014.15 547.988 979.999C380.458 945.849 381.978 1489.24 850.088 1350.46"
      stroke="#51D0AC"
      strokeWidth="56"
      strokeLinecap="round"
    />
  </svg>
);

const LivoLines = ({ className = '', variant = 'random' }: LivoLinesProps) => {
  // Selecciona una variante aleatoria al montar el componente
  const selectedVariant = useMemo(() => {
    if (variant === 'random') {
      return (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3;
    }
    return variant;
  }, [variant]);

  return (
    <div className={className}>
      {selectedVariant === 1 && <Line1 />}
      {selectedVariant === 2 && <Line2 />}
      {selectedVariant === 3 && <Line3 />}
    </div>
  );
};

export default LivoLines;
