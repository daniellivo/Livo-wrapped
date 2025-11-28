import livoLogo from '@/assets/livo-logo.svg';

const LivoLogo = () => {
  return (
    <div className="fixed top-6 left-6 z-50 flex items-center gap-2.5 opacity-0 animate-fade-in">
      <img 
        src={livoLogo} 
        alt="Livo" 
        className="h-7 w-auto drop-shadow-sm" 
      />
      <div className="flex items-center gap-1.5">
        <div className="w-px h-4 bg-white/20" />
        <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">
          Wrapped 2024
        </span>
      </div>
    </div>
  );
};

export default LivoLogo;
