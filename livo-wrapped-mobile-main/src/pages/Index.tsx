import { useState, useRef } from 'react';
import Slider from '@/components/Slider';
import SlideContent from '@/components/SlideContent';
import SlideCard from '@/components/SlideCard';
import LivoLogo from '@/components/LivoLogo';
import ProgressDots from '@/components/ProgressDots';
import StatCard from '@/components/StatCard';
import ShareButtons from '@/components/ShareButtons';
import { IconChartBar, IconFlame, IconBuilding, IconHeart } from '@tabler/icons-react';
import enfermeraNoctambula from '@/assets/enfermera-noctambula.png';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const totalSlides = 10;

  return (
    <div className="w-screen h-screen bg-background overflow-hidden">
      <LivoLogo />
      <ProgressDots total={totalSlides} current={currentSlide} />
      
      <Slider onSlideChange={setCurrentSlide}>
        {/* Slide 1 - Welcome */}
        <SlideContent linesPosition={0}>
          <SlideCard>
            <h2 className="text-2xl font-semibold text-center mb-4">Maria</h2>
            <p className="text-center text-base leading-relaxed">
              Este año has cuidado, has corrido, has aprendido... y has brillado más de lo que imaginas.
            </p>
            <p className="text-center text-base leading-relaxed mt-4">
              Así que, antes de que empiece el próximo turno, toca mirar atrás.
            </p>
            <p className="text-center text-base font-medium mt-4">
              Este es tu Livo Wrapped.
            </p>
          </SlideCard>
          <div className="mt-6 flex items-center gap-2 text-sm text-white/80">
            <span>Desliza para descubrirlo</span>
            <span>→</span>
          </div>
        </SlideContent>

        {/* Slide 2 - Final Stats */}
        <SlideContent linesPosition={1}>
          <div className="space-y-4 w-full max-w-sm">
            <SlideCard className="text-center">
              <p className="text-base">Te uniste a Livo en Diciembre</p>
            </SlideCard>
            <SlideCard className="text-center">
              <p className="text-base">Has completado <span className="font-semibold">12 turnos</span></p>
            </SlideCard>
            <SlideCard className="text-center">
              <p className="text-base">Has hecho <span className="font-semibold">182 horas</span> con Livo</p>
            </SlideCard>
            <SlideCard className="text-center">
              <p className="text-base">Visitaste <span className="font-semibold">5 centros</span> diferentes</p>
            </SlideCard>
            <SlideCard className="text-center">
              <p className="text-base"><span className="font-semibold">Hemodiálisis</span> es tu ámbito estrella</p>
            </SlideCard>
          </div>
        </SlideContent>

        {/* Slide 3 - Journey Quote */}
        <SlideContent linesPosition={2}>
          <p className="text-center text-xl leading-relaxed max-w-md px-4 text-white">
            "Y eso fue solo el calentamiento... porque tu año te llevó a conocer nuevos equipos, nuevas rutinas y nuevos pasillos."
          </p>
        </SlideContent>

        {/* Slide 4 - Impact */}
        <SlideContent linesPosition={3}>
          <p className="text-center text-lg mb-6 max-w-md text-white">
            Lo mejor, es el impacto que tienes
          </p>
          <SlideCard className="text-center">
            <p className="text-base leading-relaxed">
              Este año, solo con Livo, has cuidado, al menos,{' '}
              <span className="font-semibold text-xl">360 pacientes.</span>
            </p>
          </SlideCard>
        </SlideContent>

        {/* Slide 5 - Different Centers */}
        <SlideContent linesPosition={4}>
          <p className="text-center text-xl leading-relaxed max-w-md px-4 text-white">
            "Cada centro fue diferente... y cada especialidad, un nuevo escenario."
          </p>
        </SlideContent>

        {/* Slide 6 - Specialization */}
        <SlideContent linesPosition={5}>
          <div className="space-y-4 w-full max-w-sm">
            <SlideCard className="text-center">
              <p className="text-base">Has estado en <span className="font-semibold">4 ámbitos</span> diferentes.</p>
            </SlideCard>
            <SlideCard className="text-center">
              <p className="text-base">Pero tu especialidad es <span className="font-semibold">Hemodiálisis</span></p>
            </SlideCard>
            <SlideCard className="text-center">
              <p className="text-base">Has hecho <span className="font-semibold">16 turnos en Hemodiálisis</span></p>
            </SlideCard>
          </div>
        </SlideContent>

        {/* Slide 7 - Expert Mode */}
        <SlideContent linesPosition={6}>
          <p className="text-center text-xl leading-relaxed max-w-md px-4 text-white">
            "Y sí, cuando hablamos de turnos, tú siempre juegas en modo experto."
          </p>
        </SlideContent>

        {/* Slide 8 - Shift Stats */}
        <SlideContent linesPosition={7}>
          <div className="space-y-4 w-full max-w-sm">
            <SlideCard className="text-center">
              <p className="text-base">Has hecho 12 turnos de noche</p>
            </SlideCard>
            <SlideCard className="text-center">
              <p className="text-base">10 turnos de fin de semana.</p>
            </SlideCard>
            <SlideCard className="text-center">
              <p className="text-base">Tu día con más turnos es el Sábado.</p>
            </SlideCard>
            <SlideCard className="text-center">
              <p className="text-base">El horario que más eliges es el Turno de Noche</p>
            </SlideCard>
          </div>
        </SlideContent>

        {/* Slide 9 - Consideration */}
        <SlideContent linesPosition={8}>
          <p className="text-center text-xl leading-relaxed max-w-md px-4 text-white">
            Por eso, consideramos que eres...
          </p>
        </SlideContent>

        {/* Slide 10 - Final Summary Card */}
        <SlideContent linesPosition={9}>
          <div ref={cardRef} className="bg-card rounded-3xl shadow-lg p-6 max-w-sm mx-auto">
            <img 
              src={enfermeraNoctambula} 
              alt="Enfermera noctámbula" 
              className="w-48 h-48 object-contain mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold text-center mb-1 text-card-foreground">María</h2>
            <h3 className="text-xl font-semibold text-center mb-2 text-primary">Enfermera noctámbula</h3>
            <p className="text-center text-sm mb-6 text-card-foreground/70">
              Cuando la ciudad duerme, tú sostienes la guardia.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <StatCard 
                icon={<IconChartBar size={20} />}
                value="Top 4%"
                label="Ranking"
              />
              <StatCard 
                icon={<IconFlame size={20} />}
                value="180"
                label="Turnos"
              />
              <StatCard 
                icon={<IconBuilding size={20} />}
                value="3"
                label="Centros diferentes"
              />
              <StatCard 
                icon={<IconHeart size={20} />}
                value="4"
                label="Especialidades"
              />
            </div>
          </div>
          
          <ShareButtons cardRef={cardRef} />
        </SlideContent>
      </Slider>
    </div>
  );
};

export default Index;
