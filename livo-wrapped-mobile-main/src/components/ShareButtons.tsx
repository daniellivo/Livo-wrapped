import { IconBrandInstagram, IconDownload, IconBrandWhatsapp } from '@tabler/icons-react';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

interface ShareButtonsProps {
  cardRef: React.RefObject<HTMLDivElement>;
}

const ShareButtons = ({ cardRef }: ShareButtonsProps) => {
  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#F6F5F4',
        scale: 2,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = 'livo-wrapped.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast.success('¡Imagen guardada!');
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      toast.error('Error al guardar la imagen');
    }
  };

  const handleShareWhatsApp = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#F6F5F4',
        scale: 2,
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (!blob) return;

        const file = new File([blob], 'livo-wrapped.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          navigator.share({
            files: [file],
            title: 'Mi Livo Wrapped',
            text: '¡Mira mi año con Livo!',
          });
        } else {
          // Fallback: abrir WhatsApp Web
          window.open('https://wa.me/?text=¡Mira mi Livo Wrapped!', '_blank');
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error al compartir en WhatsApp:', error);
      toast.error('Error al compartir');
    }
  };

  const handleShareInstagram = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#F6F5F4',
        scale: 2,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], 'livo-wrapped.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Mi Livo Wrapped',
            text: '¡Mira mi año con Livo!',
          });
        } else {
          toast.info('Descarga la imagen y compártela en Instagram Stories');
          handleDownload();
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error al compartir en Instagram:', error);
      toast.error('Error al compartir');
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-6">
      <button
        onClick={handleShareInstagram}
        className="flex flex-col items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
      >
        <IconBrandInstagram size={24} className="text-white" />
        <span className="text-xs text-white">Compartir en Instagram</span>
      </button>
      <button
        onClick={handleDownload}
        className="flex flex-col items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
      >
        <IconDownload size={24} className="text-white" />
        <span className="text-xs text-white">Guardar como imagen</span>
      </button>
      <button
        onClick={handleShareWhatsApp}
        className="flex flex-col items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
      >
        <IconBrandWhatsapp size={24} className="text-white" />
        <span className="text-xs text-white">Compartir en WhatsApp</span>
      </button>
    </div>
  );
};

export default ShareButtons;
