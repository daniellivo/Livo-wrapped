interface ProgressDotsProps {
  total: number;
  current: number;
}

const ProgressDots = ({ total, current }: ProgressDotsProps) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-1">
      {/* Progress indicator with glassmorphism */}
      <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/10 shadow-lg">
        <span className="text-sm font-bold text-primary tabular-nums">{current + 1}</span>
        <span className="text-sm text-white/40 font-medium">/</span>
        <span className="text-sm text-white/40 tabular-nums">{total}</span>
      </div>
    </div>
  );
};

export default ProgressDots;
