import livoLogo from '@/assets/livo-logo.svg';

const LivoLogo = () => {
  return (
    <div className="fixed top-6 left-6 z-50">
      <img src={livoLogo} alt="Livo" className="h-8 w-auto" />
    </div>
  );
};

export default LivoLogo;
