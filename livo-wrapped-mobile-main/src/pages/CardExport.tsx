import { IconChartBar, IconFlame, IconBuilding, IconHeart } from '@tabler/icons-react';
import StatCard from '@/components/StatCard';
import enfermeraNoctambula from '@/assets/enfermera-noctambula.png';
import livoLogo from '@/assets/livo-logo.svg';

const CardExport = () => {
  // Esta página está optimizada para ser capturada por un servicio de servidor
  // Dimensiones fijas: 1080x1920px (aspect ratio 9:16 para Instagram Stories)
  return (
    <div 
      className="w-full h-screen flex items-center justify-center"
      style={{
        background: '#114454',
      }}
    >
      {/* Card container - dimensiones exactas para exportación */}
      <div
        className="rounded-[2rem] overflow-hidden shadow-2xl relative"
        style={{
          background: '#F6F5F4',
          padding: '1.25rem',
          width: '1080px',
          height: '1920px',
          maxWidth: '100vw',
          maxHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo top left */}
        <img
          src={livoLogo}
          alt="Livo"
          className="absolute top-3 left-3 h-4 w-auto z-20"
          style={{ opacity: 1 }}
        />

        {/* Inner content */}
        <div className="relative flex flex-col items-center h-full justify-between">
          {/* Spacer for logo */}
          <div className="h-2" />

          {/* Middle section: Character + Title */}
          <div className="flex flex-col items-center flex-1 justify-center py-2">
            {/* Character illustration */}
            <div className="relative mb-3">
              <img
                src={enfermeraNoctambula}
                alt="Enfermera noctámbula"
                className="w-40 h-40 object-contain relative z-10"
              />
            </div>

            {/* Name */}
            <h2 className="text-base font-semibold text-[#114454] mb-0.5 tracking-wide">
              María
            </h2>

            {/* Title with gradient */}
            <h3 className="text-lg font-bold gradient-text mb-1.5 text-center">
              Enfermera Noctámbula 🌙
            </h3>

            {/* Quote */}
            <p className="text-center text-xs text-[#114454]/60 px-4 italic">
              "Cuando la ciudad duerme, tú sostienes la guardia del cuidado."
            </p>
          </div>

          {/* Bottom section: Stats grid */}
          <div className="w-full">
            <div className="grid grid-cols-2 gap-2 w-full">
              <StatCard
                icon={<IconChartBar size={16} />}
                value="Top 4%"
                label="Ranking"
                highlight
                animate={false}
                compact
              />
              <StatCard
                icon={<IconFlame size={16} />}
                value="180"
                label="Turnos"
                animate={false}
                compact
              />
              <StatCard
                icon={<IconBuilding size={16} />}
                value="3"
                label="Centros"
                animate={false}
                compact
              />
              <StatCard
                icon={<IconHeart size={16} />}
                value="4"
                label="Especialidades"
                animate={false}
                compact
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardExport;

