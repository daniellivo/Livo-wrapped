import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Slider from '@/components/Slider';
import SlideContent from '@/components/SlideContent';
import SlideCard from '@/components/SlideCard';
import LivoLogo from '@/components/LivoLogo';
import LivoLines from '@/components/LivoLines';
import ProgressDots from '@/components/ProgressDots';
import StatCard from '@/components/StatCard';
import ShareButtons from '@/components/ShareButtons';
import { IconChartBar, IconFlame, IconBuilding, IconHeart } from '@tabler/icons-react';
import livoLogo from '@/assets/livo-logo.svg';
import { UserData } from '@/types/user';

const WEBHOOK_URL = 'https://livomarketing.app.n8n.cloud/webhook/e1c955cd-b1a5-4d0c-a023-a876f9a648c3';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const totalSlides = 10;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Estado para la variante de enfermera (1-4)
  const [nurseVariant, setNurseVariant] = useState(1);
  
  // Estados para el webhook
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
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
          encoded_user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }

      const data: UserData = await response.json();
      setUserData(data);
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
    const encodedId = searchParams.get('encodedId');
    
    if (!encodedId) {
      navigate('/invalid');
      return;
    }
    
    callWebhook(encodedId);
  }, [searchParams, navigate]);

  // Función para obtener la URL de la enfermera con la variante actual
  const getNurseImageUrl = (originalUrl: string, variant: number): string => {
    // Extraer el número del bucket del URL original (ej: "6.1.png" -> "6")
    const match = originalUrl.match(/\/(\d+)\.\d+\.png$/);
    if (match) {
      const bucketNumber = match[1];
      return `https://raw.githubusercontent.com/daniellivo/Livo-wrapped/refs/heads/main/livo-wrapped-mobile-main/Wrapped-Characters/${bucketNumber}.${variant}.png`;
    }
    return originalUrl;
  };

  // Función para cambiar la variante de enfermera (cicla 1 -> 2 -> 3 -> 4 -> 1)
  const handleChangeNurse = () => {
    setNurseVariant((prev) => (prev % 4) + 1);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-background overflow-hidden relative flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Línea superior derecha */}
          <div className="absolute -top-20 -right-20 w-80 h-96 opacity-50">
            <LivoLines variant={1} className="w-full h-full" />
          </div>
          {/* Línea inferior izquierda */}
          <div className="absolute bottom-20 -left-16 w-56 h-56 opacity-40">
            <LivoLines variant={2} className="w-full h-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 z-10" />
        </div>
        <LivoLogo />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white/70">Cargando tu Livo Wrapped...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !userData) {
    return (
      <div className="w-screen h-screen bg-background overflow-hidden relative flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Línea superior derecha */}
          <div className="absolute -top-20 -right-20 w-80 h-96 opacity-50">
            <LivoLines variant={1} className="w-full h-full" />
          </div>
          {/* Línea inferior izquierda */}
          <div className="absolute bottom-20 -left-16 w-56 h-56 opacity-40">
            <LivoLines variant={2} className="w-full h-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 z-10" />
        </div>
        <LivoLogo />
        <div className="relative z-10 text-center max-w-md px-6">
          <img
            src="https://raw.githubusercontent.com/daniellivo/Livo-wrapped/refs/heads/main/livo-wrapped-mobile-main/Wrapped-Characters/7.1.png"
            alt="Enfermera confusa"
            className="w-40 h-40 mx-auto mb-6 object-contain"
          />
          <p className="text-white text-xl mb-4">Oops, algo salió mal</p>
          <p className="text-white/70 mb-6">{error || 'No se pudieron cargar tus datos'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-background overflow-hidden relative">
      {/* Fixed background with LivoLines - optimizado para móvil */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Línea 1 - Superior derecha, se mueve hacia arriba */}
        <div
          className="absolute w-80 h-[500px] opacity-50 transition-transform duration-700 ease-out will-change-transform"
          style={{
            top: '-80px',
            right: '-60px',
            transform: `translateY(-${currentSlide * 15}px) rotate(${currentSlide * 2}deg)`,
          }}
        >
          <LivoLines variant={1} className="w-full h-full" />
        </div>

        {/* Línea 2 - Forma ovalada, centro izquierda */}
        <div
          className="absolute w-48 h-48 opacity-40 transition-transform duration-700 ease-out will-change-transform"
          style={{
            top: '35%',
            left: '-40px',
            transform: `translateY(${currentSlide * 20}px) scale(${1 + currentSlide * 0.02})`,
          }}
        >
          <LivoLines variant={2} className="w-full h-full" />
        </div>

        {/* Línea 3 - Inferior derecha, se mueve con el scroll */}
        <div
          className="absolute w-72 h-[450px] opacity-45 transition-transform duration-700 ease-out will-change-transform"
          style={{
            bottom: '-100px',
            right: '-30px',
            transform: `translateY(${currentSlide * 25}px) rotate(-${currentSlide * 3}deg)`,
          }}
        >
          <LivoLines variant={3} className="w-full h-full" />
        </div>

        {/* Línea 2 extra - Superior izquierda pequeña */}
        <div
          className="absolute w-32 h-32 opacity-30 transition-transform duration-700 ease-out will-change-transform"
          style={{
            top: '15%',
            left: '10%',
            transform: `translateX(-${currentSlide * 10}px) rotate(${currentSlide * 5}deg)`,
          }}
        >
          <LivoLines variant={2} className="w-full h-full" />
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
              <h2 className="text-2xl font-bold text-center mb-3 gradient-text">{userData.first_name}</h2>
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
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Te uniste a Livo en</p>
                <span className="text-xl font-bold gradient-text">Diciembre</span>
              </div>
            </SlideCard>

            <SlideCard delay={200}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Turnos completados</p>
                <span className="number-stat gradient-text">{userData.total_shifts}</span>
              </div>
            </SlideCard>

            <SlideCard delay={300}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Horas con Livo</p>
                <span className="number-stat gradient-text">{userData.total_hours_worked}h</span>
              </div>
            </SlideCard>

            <SlideCard delay={400}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Centros visitados</p>
                <span className="number-stat gradient-text">{userData.different_facilities}</span>
              </div>
            </SlideCard>

            <SlideCard delay={500}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Tu especialidad</p>
                <span className="text-xl font-bold gradient-text">{userData.most_common_specialization}</span>
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
                {userData.total_patients_impacted}
              </p>
              <p className="text-center text-xl font-semibold text-card-foreground">
                pacientes
              </p>
            </SlideCard>

            <p className="text-white text-base text-center opacity-0 animate-fade-up max-w-xs" style={{ animationDelay: '900ms' }}>
              {userData.patients_impact_description}
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
                <span className="text-3xl font-bold gradient-text">{userData.different_specializations}</span>
              </div>
            </SlideCard>

            <SlideCard delay={150}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Centros</p>
                <span className="text-3xl font-bold gradient-text">{userData.different_facilities}</span>
              </div>
            </SlideCard>

            <SlideCard delay={200}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Tu especialidad favorita</p>
                <span className="text-xl font-bold gradient-text">{userData.most_common_specialization}</span>
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
                <p className="text-base text-card-foreground">Turnos de mañana</p>
                <span className="text-3xl font-bold gradient-text">{userData.morning_shifts}</span>
              </div>
            </SlideCard>

            <SlideCard delay={200}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Turnos de tarde</p>
                <span className="text-3xl font-bold gradient-text">{userData.evening_shifts}</span>
              </div>
            </SlideCard>

            <SlideCard delay={300}>
              <div className="flex items-center justify-between">
                <p className="text-base text-card-foreground">Turnos de noche</p>
                <span className="text-3xl font-bold gradient-text">{userData.night_shifts}</span>
              </div>
            </SlideCard>

            <SlideCard variant="highlight" delay={400}>
              <div className="text-center">
                <p className="text-sm opacity-80">Tu día favorito</p>
                <p className="text-2xl font-bold mt-1">{userData.most_common_day.toLowerCase()}</p>
              </div>
            </SlideCard>

            <SlideCard delay={500}>
              <div>
                <p className="text-sm text-card-foreground/60">Horario preferido</p>
                <p className="text-base font-semibold text-card-foreground">{userData.preferred_time.toLowerCase()}</p>
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

        {/* Slide 10 - Final Result Card (Optimized for Mobile) */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          <div className="min-h-full flex flex-col items-center justify-start px-4 py-6 pb-20">
            {/* Card exportable - 80% del alto de pantalla */}
            <div
              ref={cardRef}
              className="w-[85vw] max-w-[360px] rounded-[2rem] shadow-2xl flex-shrink-0"
              style={{
                background: '#F6F5F4',
                height: '80vh',
                maxHeight: '720px',
                minHeight: '500px',
              }}
            >
              <div className="relative w-full h-full p-4 flex flex-col">
                {/* Logo top left */}
                <img
                  src={livoLogo}
                  alt="Livo"
                  className="absolute top-4 left-4 h-5 w-auto z-20"
                  style={{ opacity: 1 }}
                />

                {/* Inner content for sharing */}
                <div className="flex flex-col items-center h-full justify-between pt-8">
                  {/* Middle section: Character + Title */}
                  <div className="flex flex-col items-center flex-1 justify-center">
                    {/* Character illustration - tamaño responsive */}
                    <div className="relative mb-2" style={{ opacity: 1 }}>
                      <img
                        src={getNurseImageUrl(userData.bucket_image_url, nurseVariant)}
                        alt={userData.bucket}
                        className="w-[30vw] h-[30vw] max-w-[140px] max-h-[140px] min-w-[100px] min-h-[100px] object-contain relative z-10"
                      />
                    </div>

                    {/* Name */}
                    <h2 className="text-base font-semibold text-[#114454] mb-0.5 tracking-wide" style={{ opacity: 1 }}>
                      {userData.first_name}
                    </h2>

                    {/* Title - color sólido para compatibilidad con html2canvas */}
                    <h3 
                      className="text-lg font-bold mb-1 text-center px-2" 
                      style={{ opacity: 1, color: '#36C3A0' }}
                    >
                      {userData.bucket}
                    </h3>

                    {/* Quote */}
                    <p className="text-center text-xs text-[#114454]/60 px-3 italic leading-relaxed" style={{ opacity: 1 }}>
                      {userData.bucket_description}
                    </p>
                  </div>

                  {/* Bottom section: Stats grid */}
                  <div className="w-full mt-auto pt-3">
                    <div className="grid grid-cols-2 gap-2 w-full" style={{ opacity: 1 }}>
                      <StatCard
                        icon={<IconChartBar size={14} />}
                        value={`${userData.total_shifts}`}
                        label="Turnos"
                        highlight
                        animate={false}
                        compact
                      />
                      <StatCard
                        icon={<IconFlame size={14} />}
                        value={`${userData.total_hours_worked}h`}
                        label="Horas"
                        animate={false}
                        compact
                      />
                      <StatCard
                        icon={<IconBuilding size={14} />}
                        value={`${userData.different_facilities}`}
                        label="Centros"
                        animate={false}
                        compact
                      />
                      <StatCard
                        icon={<IconHeart size={14} />}
                        value={`${userData.different_specializations}`}
                        label="Especialidades"
                        animate={false}
                        compact
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicador de scroll */}
            <div className="flex flex-col items-center mt-4 text-white/50 text-xs animate-bounce">
              <span>↓ Desliza para compartir</span>
            </div>

            {/* Botón para cambiar variante de enfermera */}
            <button
              onClick={handleChangeNurse}
              className="mt-4 mb-3 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-full text-sm font-medium transition-all duration-200 border border-white/20 hover:border-white/40"
            >
              ✨ Cambiar enfermera
            </button>

            {/* Share buttons (not included in screenshot) */}
            <ShareButtons cardRef={cardRef} />
            
            {/* Spacer para el progress bar */}
            <div className="h-4" />
          </div>
        </div>
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
