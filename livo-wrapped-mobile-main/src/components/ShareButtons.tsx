import { IconShare, IconLoader2 } from '@tabler/icons-react';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import { useState } from 'react';

interface ShareButtonsProps {
  cardRef: React.RefObject<HTMLDivElement>;
  referralCode: string;
}

const ShareButtons = ({ cardRef, referralCode }: ShareButtonsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async (): Promise<Blob | null> => {
    if (!cardRef.current) {
      console.error('Ref not found');
      toast.error('Error: No se encontró la card para capturar');
      return null;
    }

    try {
      console.log('Starting image generation...');
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#F6F5F4',
        scale: 3, // Alta resolución para Stories de Instagram
        logging: false,
        useCORS: true, // Importante para imágenes externas
        allowTaint: true,
        width: 320,  // Ancho fijo
        height: 580, // Alto fijo (mismo que la card)
      });

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            console.log('Blob generated successfully', blob.size);
            resolve(blob);
          } else {
            console.error('Blob generation failed');
            toast.error('Error al generar la imagen');
            resolve(null);
          }
        }, 'image/png', 1.0);
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Error al generar la imagen');
      return null;
    }
  };

  const downloadDirectly = (blob: Blob) => {
    try {
      const link = document.createElement('a');
      link.download = 'livo-wrapped.png';
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      toast.success('¡Imagen guardada en tu dispositivo!');
    } catch (e) {
      console.error('Direct download failed:', e);
      toast.error('No se pudo guardar la imagen');
    }
  };

  const getShareText = () => {
    return `Este es mi Livo Wrapped ✨

Un año lleno de turnos, aprendizaje y personas que lo hacen todo posible.

Si tú también quieres elegir dónde y cuándo trabajar 👉 https://campaigns.getlivo.com/mgm/${referralCode}?campaign_id=MGM_2025`;
  };

  const shareImage = async (blob: Blob) => {
    try {
      // Convertimos el Blob en un File
      const file = new File([blob], 'livo-wrapped.png', { type: 'image/png' });

      // Verificamos si el navegador soporta compartir archivos
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Mi Livo Wrapped',
          text: getShareText(),
        });
        toast.success('¡Imagen compartida!');
      } else {
        // Fallback: descargar directamente si no soporta Web Share API
        downloadDirectly(blob);
      }
    } catch (error) {
      // Si el usuario cancela el share o hay un error, hacer fallback a descarga
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing image:', error);
      }
      downloadDirectly(blob);
    }
  };

  const handleShareImage = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const blob = await generateImage();
      if (!blob) {
        return; // Error ya manejado en generateImage
      }

      await shareImage(blob);
    } catch (error) {
      console.error('Critical error in handleShareImage:', error);
      toast.error('Error inesperado al compartir');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full max-w-sm mt-6">
      <button
        onClick={handleShareImage}
        disabled={isLoading}
        className="flex flex-row items-center gap-3 px-5 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <IconLoader2 size={20} className="text-white animate-spin" />
        ) : (
          <IconShare size={20} className="text-white" />
        )}
        <span className="text-sm text-white font-medium">Comparte tu Wrapped</span>
      </button>
    </div>
  );
};

export default ShareButtons;
