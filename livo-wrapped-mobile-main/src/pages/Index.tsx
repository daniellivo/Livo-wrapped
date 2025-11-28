import { useState, useRef } from 'react';
import Slider from '@/components/Slider';
import SlideContent from '@/components/SlideContent';
import SlideCard from '@/components/SlideCard';
import LivoLogo from '@/components/LivoLogo';
import LivoLines from '@/components/LivoLines';
import ProgressDots from '@/components/ProgressDots';
import StatCard from '@/components/StatCard';
import ShareButtons from '@/components/ShareButtons';
import { IconChartBar, IconFlame, IconBuilding, IconHeart, IconStethoscope } from '@tabler/icons-react';
import enfermeraNoctambula from '@/assets/enfermera-noctambula.png';
import livoLogo from '@/assets/livo-logo.svg';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const totalSlides = 10;

  return (
    <div className="w-screen h-screen bg-background overflow-hidden relative">
      {/* Fixed background with LivoLines - continuous across all slides */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* First SVG - left side */}
        <div 
          className="absolute"
          style={{
            top: '-10%',
            left: '-20%',
            width: '140%',
            height: '120%',
          }}
        >
          <LivoLines className="w-full h-full opacity-50" />
        </div>
        {/* Second SVG - right side, offset */}
        <div 
          className="absolute"
          style={{
            top: '20%',
            left: '30%',
            width: '140%',
            height: '120%',
            transform: 'rotate(15deg)',
          }}
        >
          <LivoLines className="w-full h-full opacity-30" />
        </div>
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />
      </div>

      <LivoLogo />
      <ProgressDots total={totalSlides} current={currentSlide} />
      
      <Slider onSlideChange={setCurrentSlide}>
        {/* Slide 1 - Welcome */}
        <SlideContent>
          <div className="flex flex-col items-center gap-6">
            <SlideCard variant="default" delay={200} hover={false}>
              <h2 className="text-2xl font-bold text-center mb-3 gradient-text">María</h2>
              <p className="text-center text-base leading-relaxed text-card-foreground/80">
                Este año has cuidado, has corrido, has aprendido... y has brillado más de lo que imaginas.
              </p>
              <p className="text-center text-sm leading-relaxed mt-4 text-card-foreground/50 italic">
                Antes de que empiece el próximo turno, toca mirar atrás.
              </p>
            </SlideCard>
            
            <p className="text-center font-semibold text-white mt-2 opacity-0 animate-fade-up text-lg" style={{ animationDelay: '500ms' }}>
              Este es tu <span className="gradient-text font-bold">Livo Wrapped</span> ✨
            </p>
            
            <div className="flex items-center gap-2 text-sm text-white/50 mt-6 opacity-0 animate-fade-in" style={{ animationDelay: '900ms' }}>
              <span className="animate-swipe-hint">Desliza para descubrirlo</span>
              <span className="text-primary animate-swipe-hint">→</span>
            </div>
          </div>
        </SlideContent>

        {/* Slide 2 - Stats Overview */}
        <SlideContent>
          <div className="space-y-3 w-full">
            <p className="text-center text-white/50 text-sm mb-4 opacity-0 animate-fade-in font-medium tracking-wide uppercase">Tu año en números</p>
            
            <SlideCard delay={100}>
              <p className="text-base text-card-foreground">
                Te uniste a Livo en <span className="font-bold text-primary">Diciembre</span>
              </p>
            </SlideCard>
            
            <SlideCard delay={200}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Turnos completados</p>
                <span className="number-stat gradient-text">12</span>
              </div>
            </SlideCard>
            
            <SlideCard delay={300}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Horas con Livo</p>
                <span className="number-stat gradient-text">182h</span>
              </div>
            </SlideCard>
            
            <SlideCard delay={400}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Centros visitados</p>
                <span className="number-stat gradient-text">5</span>
              </div>
            </SlideCard>
            
            <SlideCard delay={500}>
              <div className="flex items-center gap-3">
                <IconStethoscope size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-card-foreground/60 font-medium">Tu ámbito estrella</p>
                  <p className="text-lg font-bold text-card-foreground">Hemodiálisis</p>
                </div>
              </div>
            </SlideCard>
          </div>
        </SlideContent>

        {/* Slide 3 - Transition Quote */}
        <SlideContent>
          <div className="flex flex-col items-center gap-8">
            <span className="text-6xl opacity-0 animate-bounce-in">🚀</span>
            <p className="text-center text-2xl font-light leading-relaxed text-white opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
              Y eso fue solo el <span className="font-bold text-primary">calentamiento</span>...
            </p>
            <p className="text-center text-base leading-relaxed text-white/70 opacity-0 animate-fade-up max-w-xs" style={{ animationDelay: '400ms' }}>
              Tu año te llevó a conocer nuevos equipos, nuevas rutinas y nuevos pasillos.
            </p>
          </div>
        </SlideContent>

        {/* Slide 4 - Impact */}
        <SlideContent>
          <div className="flex flex-col items-center gap-6">
            <p className="text-white text-lg opacity-0 animate-fade-in font-semibold tracking-wide">El impacto que tienes</p>
            
            <div className="text-center opacity-0 animate-bounce-in" style={{ animationDelay: '200ms' }}>
              <span className="text-7xl animate-float-gentle">❤️‍🩹</span>
            </div>
            
            <SlideCard variant="default" delay={400} hover={false}>
              <p className="text-center text-lg leading-relaxed text-card-foreground/80">
                Este año, solo con Livo, has cuidado al menos
              </p>
              <p className="text-center number-highlight my-4 opacity-0 animate-number-pop" style={{ animationDelay: '600ms' }}>
                360
              </p>
              <p className="text-center text-xl font-semibold text-card-foreground">
                pacientes
              </p>
            </SlideCard>
            
            <p className="text-white text-base text-center opacity-0 animate-fade-up max-w-xs" style={{ animationDelay: '900ms' }}>
              Cada uno de ellos, una historia de cuidado 💚
            </p>
          </div>
        </SlideContent>

        {/* Slide 5 - Centers Quote */}
        <SlideContent>
          <div className="flex flex-col items-center gap-8">
            <span className="text-6xl opacity-0 animate-bounce-in">🏥</span>
            <p className="text-center text-2xl font-light leading-relaxed text-white opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
              Cada centro fue <span className="font-bold text-primary">diferente</span>...
            </p>
            <p className="text-center text-lg leading-relaxed text-white opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
              Y cada especialidad, un nuevo escenario donde brillar.
            </p>
          </div>
        </SlideContent>

        {/* Slide 6 - Specialization */}
        <SlideContent>
          <div className="space-y-3 w-full">
            <p className="text-center text-white text-base mb-4 opacity-0 animate-fade-in font-semibold">Tu versatilidad</p>
            
            <SlideCard delay={100}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Ámbitos diferentes</p>
                <span className="text-3xl font-bold gradient-text">4</span>
              </div>
            </SlideCard>
            
            <SlideCard delay={200}>
              <div className="text-center">
                <p className="text-sm text-card-foreground/60 mb-1">Tu especialidad favorita</p>
                <p className="text-2xl font-bold text-card-foreground">Hemodiálisis</p>
                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-card-foreground/60">
                  <IconStethoscope size={16} className="text-primary" />
                  <span>16 turnos realizados</span>
                </div>
              </div>
            </SlideCard>
            
            <SlideCard delay={300}>
              <p className="text-center text-sm text-card-foreground/80">
                Eres una profesional polivalente que se adapta a todo
              </p>
            </SlideCard>
          </div>
        </SlideContent>

        {/* Slide 7 - Expert Mode Quote */}
        <SlideContent>
          <div className="flex flex-col items-center gap-8">
            <p className="text-center text-2xl font-light leading-relaxed text-white opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
              Y cuando hablamos de turnos...
            </p>
            <p className="text-center text-xl leading-relaxed text-white opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
              Tú siempre juegas en <span className="font-bold text-primary">modo experto</span>
            </p>
          </div>
        </SlideContent>

        {/* Slide 8 - Shift Stats */}
        <SlideContent>
          <div className="space-y-3 w-full">
            <p className="text-center text-white/60 text-sm mb-4 opacity-0 animate-fade-in">Tus turnos</p>
            
            <SlideCard delay={100}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Turnos de noche</p>
                <span className="text-3xl font-bold gradient-text">12</span>
              </div>
            </SlideCard>
            
            <SlideCard delay={200}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Turnos de fin de semana</p>
                <span className="text-3xl font-bold gradient-text">10</span>
              </div>
            </SlideCard>
            
            <SlideCard variant="highlight" delay={300}>
              <div className="text-center">
                <p className="text-sm opacity-80">Tu día favorito</p>
                <p className="text-2xl font-bold mt-1">Sábado</p>
              </div>
            </SlideCard>
            
            <SlideCard delay={400}>
              <div>
                <p className="text-sm text-card-foreground/60">Horario preferido</p>
                <p className="text-base font-semibold text-card-foreground">Turno de Noche</p>
              </div>
            </SlideCard>
          </div>
        </SlideContent>

        {/* Slide 9 - Build Up */}
        <SlideContent>
          <div className="flex flex-col items-center gap-10">
            <div className="flex gap-3 opacity-0 animate-fade-in">
              <span className="text-4xl">✨</span>
              <span className="text-4xl">✨</span>
              <span className="text-4xl">✨</span>
            </div>
            <div className="text-center space-y-4">
              <p className="text-2xl font-light leading-relaxed text-white opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
                Por todo esto...
              </p>
              <p className="text-xl leading-relaxed text-white/90 opacity-0 animate-fade-up" style={{ animationDelay: '700ms' }}>
                consideramos que eres...
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary mt-6 opacity-0 animate-fade-in" style={{ animationDelay: '1100ms' }}>
              <span className="text-sm font-medium animate-swipe-hint">Desliza para descubrirlo</span>
              <span className="animate-swipe-hint">→</span>
            </div>
          </div>
        </SlideContent>

        {/* Slide 10 - Final Result Card (Optimized for Instagram Stories 9:16) */}
        <SlideContent>
          <div 
            ref={cardRef} 
            className="w-full max-w-[320px] mx-auto rounded-[2rem] overflow-hidden shadow-2xl relative"
            style={{
              background: '#F6F5F4',
              padding: '1.75rem 1.5rem',
              aspectRatio: '9/16',
              maxHeight: '70vh',
            }}
          >
            {/* Logo top left */}
            <img 
              src={livoLogo} 
              alt="Livo" 
              className="absolute top-4 left-4 h-5 w-auto opacity-0 animate-fade-in z-20" 
            />
            
            {/* Inner content for sharing */}
            <div className="relative flex flex-col items-center h-full justify-between">
              {/* Spacer for logo */}
              <div className="h-4" />
              
              {/* Middle section: Character + Title */}
              <div className="flex flex-col items-center flex-1 justify-center py-4">
                {/* Character illustration */}
                <div className="relative mb-4 opacity-0 animate-bounce-in" style={{ animationDelay: '200ms' }}>
                  <img 
                    src={enfermeraNoctambula} 
                    alt="Enfermera noctámbula" 
                    className="w-44 h-44 object-contain relative z-10"
                  />
                </div>
                
                {/* Name */}
                <h2 className="text-lg font-semibold text-[#114454] mb-1 opacity-0 animate-fade-up tracking-wide" style={{ animationDelay: '400ms' }}>
                  María
                </h2>
                
                {/* Title with gradient */}
                <h3 className="text-xl font-bold gradient-text mb-2 opacity-0 animate-fade-up text-center" style={{ animationDelay: '500ms' }}>
                  Enfermera Noctámbula 🌙
                </h3>
                
                {/* Quote */}
                <p className="text-center text-xs text-[#114454]/60 px-6 opacity-0 animate-fade-up italic" style={{ animationDelay: '600ms' }}>
                  "Cuando la ciudad duerme, tú sostienes la guardia"
                </p>
              </div>
              
              {/* Bottom section: Stats grid */}
              <div className="w-full">
                <div className="grid grid-cols-2 gap-2 w-full opacity-0 animate-scale-in" style={{ animationDelay: '700ms' }}>
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
          
          {/* Share buttons (not included in screenshot) */}
          <ShareButtons cardRef={cardRef} />
        </SlideContent>
      </Slider>

      {/* Bottom progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div 
          className="h-full progress-gradient transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Index;
