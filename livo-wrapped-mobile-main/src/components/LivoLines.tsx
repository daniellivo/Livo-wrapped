interface LivoLinesProps {
  className?: string;
}

const LivoLines = ({ className = '' }: LivoLinesProps) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 2628 1893" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <g opacity="0.5">
        <path 
          d="M162.44 1622.55C1084.29 1814.8 1112.39 904.853 917.34 1001.63C722.287 1098.4 896.904 1506.91 1190.74 1489.07C1413.23 1475.56 1550.64 1238.67 1566.48 1083.27C1600.43 750.196 1340 595.409 1168 646.743C963 707.925 1220.57 895.243 1382.5 700.743C1544.43 506.243 1551.96 168.016 1404.51 28.0001" 
          stroke="#36C3A0" 
          strokeWidth="56" 
          strokeLinecap="round"
        />
        <path 
          d="M874.965 696.196C798.431 854.64 621.965 945.695 464.996 885.704C308.027 825.713 330.965 613.695 419.465 490.196C507.965 366.696 677.525 279.312 799.465 306.695C921.404 334.079 951.499 537.752 874.965 696.196Z" 
          stroke="#36C3A0" 
          strokeWidth="56" 
          strokeLinecap="round"
        />
        <path 
          d="M2097.78 381.185C1639.19 629.983 1724.67 1119.66 2111.01 1105.33C2260.7 1099.78 2325.7 950.369 2202.44 869.111C2006.14 739.714 1569.32 1192.91 1894.61 1452.72C2219.89 1712.52 2465.32 1367.33 2297.79 1333.18C2130.26 1299.03 2131.78 1842.42 2599.89 1703.64" 
          stroke="#36C3A0" 
          strokeWidth="56" 
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default LivoLines;

