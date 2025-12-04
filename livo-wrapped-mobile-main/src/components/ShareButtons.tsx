import { IconBrandInstagram, IconDownload, IconBrandWhatsapp, IconLoader2 } from '@tabler/icons-react';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import { useState } from 'react';

interface ShareButtonsProps {
  cardRef: React.RefObject<HTMLDivElement>;
}

const ShareButtons = ({ cardRef }: ShareButtonsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async (): Promise<Blob | null> => {
    if (!cardRef.current) {
      console.error('Ref not found');
      return null;
    }

    try {
      console.log('Starting image generation...');
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#F6F5F4',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true, // Important for external images
        allowTaint: true,
      });

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            console.log('Blob generated successfully', blob.size);
            resolve(blob);
          } else {
            console.error('Blob generation failed');
            resolve(null);
          }
        }, 'image/png', 1.0);
      });
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  };

  const downloadDirectly = (blob: Blob) => {
    try {
      const link = document.createElement('a');
      link.download = 'livo-wrapped.png';
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link); // Append to body to ensure click works in some browsers
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      toast.success('¡Imagen guardada en tu dispositivo!');
    } catch (e) {
      console.error('Direct download failed:', e);
      toast.error('No se pudo guardar la imagen');
    }
  };

  const handleSaveImage = async () => {
    if (isLoading) return;
    setIsLoading(true);
    console.log('Handling Save Image...');

    try {
      const blob = await generateImage();
      if (!blob) {
        toast.error('Error al generar la imagen');
        return;
      }

      const file = new File([blob], 'livo-wrapped.png', { type: 'image/png' });

      // Try Web Share API first (for mobile "Save to Photos")
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          console.log('Attempting Web Share API for save...');
          await navigator.share({
            files: [file],
            // No title/text to encourage "Save Image" option appearance
          });
          toast.success('¡Imagen lista para guardar!');
        } catch (shareError) {
          if ((shareError as Error).name !== 'AbortError') {
            console.warn('Web Share API failed, falling back to download:', shareError);
            downloadDirectly(blob);
          } else {
            // User cancelled, do nothing
            console.log('User cancelled share');
          }
        }
      } else {
        // Fallback to direct download
        console.log('Web Share API not supported, downloading directly...');
        downloadDirectly(blob);
      }
    } catch (error) {
      console.error('Critical error in handleSaveImage:', error);
      toast.error('Error inesperado al guardar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async (platform: 'instagram' | 'whatsapp') => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const blob = await generateImage();
      if (!blob) {
        throw new Error('No se pudo generar la imagen');
      }

      const file = new File([blob], 'livo-wrapped.png', { type: 'image/png' });
      const shareData: ShareData = {
        files: [file],
        title: 'Mi Livo Wrapped',
        text: '¡Mira mi año con Livo! ✨',
      };

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share(shareData);
          toast.success('¡Compartido con éxito!');
        } catch (shareError) {
          if ((shareError as Error).name !== 'AbortError') {
            throw shareError;
          }
        }
      } else {
        // Fallbacks
        if (platform === 'whatsapp') {
          window.open('https://wa.me/?text=¡Mira mi año con Livo! ✨', '_blank');
          toast.info('La imagen se ha descargado. ¡Puedes adjuntarla manualmente!');
          downloadDirectly(blob);
        } else {
          toast.info('Imagen guardada. ¡Súbela a tus Stories!');
          downloadDirectly(blob);
        }
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      toast.error('Hubo un error al procesar la imagen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-6">
      <button
        onClick={() => handleShare('instagram')}
        disabled={isLoading}
        className="flex flex-col items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <IconLoader2 size={24} className="text-white animate-spin" />
        ) : (
          <IconBrandInstagram size={24} className="text-white" />
        )}
        <span className="text-xs text-white">Stories</span>
      </button>

      <button
        onClick={handleSaveImage}
        disabled={isLoading}
        className="flex flex-col items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <IconLoader2 size={24} className="text-white animate-spin" />
        ) : (
          <IconDownload size={24} className="text-white" />
        )}
        <span className="text-xs text-white">Guardar</span>
      </button>

      <button
        onClick={() => handleShare('whatsapp')}
        disabled={isLoading}
        className="flex flex-col items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <IconLoader2 size={24} className="text-white animate-spin" />
        ) : (
          <IconBrandWhatsapp size={24} className="text-white" />
        )}
        <span className="text-xs text-white">WhatsApp</span>
      </button>
    </div>
  );
};

export default ShareButtons;
