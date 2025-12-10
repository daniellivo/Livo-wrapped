import { Button } from '@/components/ui/button';
import LivoLogo from '@/components/LivoLogo';
import LivoLines from '@/components/LivoLines';

const InvalidLink = () => {
  return (
    <div className="w-screen h-screen bg-background overflow-hidden relative">
      {/* Fixed background with LivoLines - optimizado para móvil */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Línea superior derecha */}
        <div className="absolute -top-20 -right-20 w-80 h-96 opacity-50">
          <LivoLines variant={1} className="w-full h-full" />
        </div>
        {/* Línea inferior izquierda */}
        <div className="absolute bottom-20 -left-16 w-56 h-56 opacity-40">
          <LivoLines variant={2} className="w-full h-full" />
        </div>
        {/* Línea inferior derecha */}
        <div className="absolute -bottom-24 -right-10 w-64 h-80 opacity-45">
          <LivoLines variant={3} className="w-full h-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 z-10" />
      </div>

      <LivoLogo />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="text-center max-w-md space-y-6">
          {/* Confused nurse image */}
          <div className="flex justify-center mb-6">
            <img
              src="https://raw.githubusercontent.com/daniellivo/Livo-wrapped/refs/heads/main/livo-wrapped-mobile-main/Wrapped-Characters/7.1.png"
              alt="Enfermera confusa"
              className="w-48 h-48 object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Tu Livo Wrapped aún no está disponible
          </h1>

          <p className="text-lg text-white/80 leading-relaxed mb-6">
            Al no haber hecho turnos este año, tu Livo Wrapped no está disponible.
          </p>

          <p className="text-base text-white/70 leading-relaxed mb-8">
            Si haces turnos, al siguiente sí que le contabilizarán.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-base"
          >
            <a
              href="https://livo-385512.web.app/app/ShiftStack/Feed?tab=SHIFTS"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver turnos disponibles en Livo
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvalidLink;

