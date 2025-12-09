import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Slider from '@/components/Slider';
import SlideContent from '@/components/SlideContent';
import SlideCard from '@/components/SlideCard';
import LivoLogo from '@/components/LivoLogo';
import LivoLines from '@/components/LivoLines';
import ProgressDots from '@/components/ProgressDots';
import StatCard from '@/components/StatCard';
import ShareButtons from '@/components/ShareButtons';
import { IconChartBar, IconFlame, IconBuilding, IconHeart, IconHeartbeat } from '@tabler/icons-react';
import enfermeraNoctambula from '@/assets/enfermera-noctambula.png';
import livoLogo from '@/assets/livo-logo.svg';

const WEBHOOK_URL = 'https://livomarketing.app.n8n.cloud/webhook/e1c955cd-b1a5-4d0c-a023-a876f9a648c3';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const totalSlides = 10;
  const [searchParams] = useSearchParams();
  
  // Estados para el webhook
  const [isLoading, setIsLoading] = useState(false);
  const [encodedUserId, setEncodedUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Función para llamar al webhook
  const callWebhook = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ENCODED_USER_ID: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }

      const data = await response.json();
      
      // El webhook devuelve el mismo ENCODED_USER_ID validado
      if (data.ENCODED_USER_ID) {
        setEncodedUserId(data.ENCODED_USER_ID);
      } else {
        setEncodedUserId(userId);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al llamar al webhook';
      setError(errorMessage);
      console.error('Error al llamar al webhook:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Ejecutar llamada al webhook cuando se carga la página
  useEffect(() => {
    const userId = searchParams.get('ENCODED_USER_ID');
    
    if (userId) {
      callWebhook(userId);
    }
  }, [searchParams]);

  return (
    <div className="w-screen h-screen bg-background overflow-hidden relative">
      {/* Fixed background with LivoLines - continuous across all slides */}
      {/* Fixed background with LivoLines - continuous moving background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute inset-0 flex h-full w-max transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: `translateX(-${currentSlide * 50}vw)`, // Move 50vw per slide
          }}
        >
          {/* Continuous background with multiple SVGs */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-screen h-full flex-shrink-0 relative">
              <LivoLines className="w-full h-full opacity-40" />
            </div>
          ))}
        </div>

        {/* Gradient overlay for depth - stays fixed */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 z-10" />
      </div>

      <div className={`transition-opacity duration-500 ${currentSlide === 9 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <LivoLogo />
      </div>
      <ProgressDots total={totalSlides} current={currentSlide} />

      <Slider onSlideChange={setCurrentSlide}>
        {/* Slide 1 - Welcome */}
        <SlideContent>
          <div className="flex flex-col items-center gap-6">
            <SlideCard variant="default" delay={200} hover={false}>
              <h2 className="text-2xl font-bold text-center mb-3 gradient-text">María</h2>
              <p className="text-center text-base leading-relaxed text-card-foreground/80">
                Este año has estado donde más se necesitaba: has cuidado, has aprendido y has dejado un gran impacto como enfermera.
              </p>
              <p className="text-center text-sm leading-relaxed mt-4 text-card-foreground/50 italic">
                Ahora toca mirar atrás y reconocer todo lo que has conseguido.
              </p>
            </SlideCard>

            <p className="text-center font-semibold text-white mt-2 opacity-0 animate-fade-up text-lg" style={{ animationDelay: '500ms' }}>
              ¡Este es tu <span className="gradient-text font-bold">Livo Wrapped</span>!
            </p>
            
            <p className="text-center text-white/70 opacity-0 animate-fade-up text-sm" style={{ animationDelay: '700ms' }}>
              Lo más destacado de tu 2025
            </p>

            <div className="flex items-center gap-2 text-sm text-white/50 mt-4 opacity-0 animate-fade-in" style={{ animationDelay: '900ms' }}>
              <span className="animate-swipe-hint">Desliza para descubrirlo</span>
              <span className="text-primary animate-swipe-hint">→</span>
            </div>
          </div>
        </SlideContent>

        {/* Slide 2 - Stats Overview */}
        <SlideContent>
          <div className="space-y-3 w-full">
            <p className="text-center text-white/50 text-sm mb-4 opacity-0 animate-fade-in font-medium tracking-wide uppercase">Tu año en cifras</p>

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
                <IconHeartbeat size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-card-foreground/60 font-medium">Tu especialidad</p>
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
              Y eso fue solo el <span className="font-bold text-primary">principio</span>...
            </p>
            <p className="text-center text-base leading-relaxed text-white/70 opacity-0 animate-fade-up max-w-xs" style={{ animationDelay: '400ms' }}>
              Este año has compartido tu día a día con nuevos equipos, ampliando tu impacto profesional y demostrando tu capacidad para garantizar la continuidad asistencial donde más se te necesita.
            </p>
          </div>
        </SlideContent>

        {/* Slide 4 - Impact */}
        <SlideContent>
          <div className="flex flex-col items-center gap-6">
            <p className="text-white text-lg opacity-0 animate-fade-in font-semibold tracking-wide">Lo que haces posible cada día</p>

            <div className="text-center opacity-0 animate-bounce-in" style={{ animationDelay: '200ms' }}>
              <span className="text-7xl animate-float-gentle">❤️‍🩹</span>
            </div>

            <SlideCard variant="default" delay={400} hover={false}>
              <p className="text-center text-lg leading-relaxed text-card-foreground/80">
                Este año, solo con Livo, has cuidado a
              </p>
              <p className="text-center number-highlight my-4 opacity-0 animate-number-pop" style={{ animationDelay: '600ms' }}>
                360
              </p>
              <p className="text-center text-xl font-semibold text-card-foreground">
                pacientes
              </p>
            </SlideCard>

            <p className="text-white text-base text-center opacity-0 animate-fade-up max-w-xs" style={{ animationDelay: '900ms' }}>
              Cada uno de ellos es una persona que recibió la atención que necesitaba gracias a tu compromiso.
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
              Y cada especialidad, una oportunidad para seguir creciendo profesionalmente.
            </p>
          </div>
        </SlideContent>

        {/* Slide 6 - Specialization */}
        <SlideContent>
          <div className="space-y-3 w-full">
            <p className="text-center text-white/50 text-sm mb-4 opacity-0 animate-fade-in font-medium tracking-wide uppercase">Tu impacto profesional</p>

            <SlideCard delay={100}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Ámbitos diferentes</p>
                <span className="text-3xl font-bold gradient-text">4</span>
              </div>
            </SlideCard>

            <SlideCard delay={150}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Unidades</p>
                <span className="text-3xl font-bold gradient-text">3</span>
              </div>
            </SlideCard>

            <SlideCard delay={200}>
              <div className="text-center">
                <p className="text-sm text-card-foreground/60 mb-1">Tu especialidad favorita</p>
                <p className="text-2xl font-bold text-card-foreground">Hemodiálisis</p>
                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-card-foreground/60">
                  <IconHeartbeat size={16} className="text-primary" />
                  <span>16 turnos realizados</span>
                </div>
              </div>
            </SlideCard>

            <SlideCard delay={300}>
              <p className="text-center text-sm text-card-foreground/80">
                Tu forma de adaptarte hace que cualquier equipo funcione mejor cuando tú estás.
              </p>
            </SlideCard>
          </div>
        </SlideContent>

        {/* Slide 7 - Expert Mode Quote */}
        <SlideContent>
          <div className="flex flex-col items-center gap-8">
            <p className="text-center text-2xl font-light leading-relaxed text-white opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
              En cada turno que has completado...
            </p>
            <p className="text-center text-xl leading-relaxed text-white opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
              Has aportado <span className="font-bold text-primary">calma, orden y claridad</span> cuando más hacía falta.
            </p>
          </div>
        </SlideContent>

        {/* Slide 8 - Shift Stats */}
        <SlideContent>
          <div className="space-y-3 w-full">
            <p className="text-center text-white/50 text-sm mb-4 opacity-0 animate-fade-in font-medium tracking-wide uppercase">Tus turnos</p>

            <SlideCard delay={100}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Turnos de noche</p>
                <span className="text-3xl font-bold gradient-text">12</span>
              </div>
            </SlideCard>

            <SlideCard delay={200}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Turnos de día</p>
                <span className="text-3xl font-bold gradient-text">10</span>
              </div>
            </SlideCard>

            <SlideCard variant="highlight" delay={300}>
              <div className="text-center">
                <p className="text-sm opacity-80">Tu día favorito</p>
                <p className="text-2xl font-bold mt-1">sábado</p>
              </div>
            </SlideCard>

            <SlideCard delay={400}>
              <div>
                <p className="text-sm text-card-foreground/60">Horario preferido</p>
                <p className="text-base font-semibold text-card-foreground">turno de noche</p>
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
                Tu año habla por si solo...
              </p>
              <p className="text-xl leading-relaxed text-white/90 opacity-0 animate-fade-up" style={{ animationDelay: '700ms' }}>
                Y así es cómo te vemos desde Livo
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
          {/* Wrapper para captura - dimensiones fijas para exportación */}
          <div
            ref={cardRef}
            style={{
              background: '#F6F5F4',
              padding: '16px',
              borderRadius: '2rem',
              width: '352px', // 320px card + 32px padding (16px cada lado)
              height: '720px', // Altura fija para aspect ratio ~9:18
            }}
          >
            <div
              className="rounded-[2rem] overflow-hidden shadow-2xl relative"
              style={{
                background: '#F6F5F4',
                padding: '1.25rem',
                width: '320px',
                height: '688px', // 720px - 32px padding
              }}
            >
              {/* Logo top left */}
              <img
                src={livoLogo}
                alt="Livo"
                className="absolute top-3 left-3 h-4 w-auto z-20"
                style={{ opacity: 1 }}
              />

              {/* Inner content for sharing */}
              <div className="relative flex flex-col items-center h-full justify-between">
                {/* Spacer for logo - más espacio arriba */}
                <div className="h-8" />

                {/* Middle section: Character + Title */}
                <div className="flex flex-col items-center flex-1 justify-center py-4">
                  {/* Character illustration */}
                  <div className="relative mb-3" style={{ opacity: 1 }}>
                    <img
                      src={enfermeraNoctambula}
                      alt="Enfermera noctámbula"
                      style={{
                        width: '160px',
                        height: '160px',
                        objectFit: 'contain',
                        position: 'relative',
                        zIndex: 10,
                      }}
                    />
                  </div>

                  {/* Name */}
                  <h2 className="text-base font-semibold text-[#114454] mb-0.5 tracking-wide" style={{ opacity: 1 }}>
                    María
                  </h2>

                  {/* Title - color sólido para compatibilidad con html2canvas */}
                  <h3 
                    className="text-lg font-bold mb-1.5 text-center" 
                    style={{ opacity: 1, color: '#36C3A0' }}
                  >
                    Enfermera Noctámbula 🌙
                  </h3>

                  {/* Quote */}
                  <p className="text-center text-xs text-[#114454]/60 px-4 italic" style={{ opacity: 1 }}>
                    "Cuando la ciudad duerme, tú sostienes la guardia del cuidado."
                  </p>
                </div>

                {/* Bottom section: Stats grid */}
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-2 w-full" style={{ opacity: 1 }}>
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
