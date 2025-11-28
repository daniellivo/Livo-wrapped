interface ProgressDotsProps {
  total: number;
  current: number;
}

const ProgressDots = ({ total, current }: ProgressDotsProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === current
              ? 'bg-primary w-6'
              : 'bg-white/30 w-2'
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
