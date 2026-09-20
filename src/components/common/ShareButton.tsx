import React, { useState } from 'react';
import { Share2, Check, MessageCircle, Copy, Smartphone } from 'lucide-react';
import { InstallModal } from './InstallModal';

interface ShareButtonProps {
  variant?: 'minimal' | 'full';
  className?: string;
}

export function ShareButton({ variant = 'minimal', className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);

  const shareData = {
    title: 'Full Stack Web Master · 2ème Année',
    text: 'Salam ! Révisez vos examens Full Stack 2ème Année (Approche Agile, simulateurs PERT interactifs, 200 QCM corrigés et vidéos FR/EN) :',
    url: 'https://fullstack-2a.vercel.app',
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or fallback
      }
    }
    setIsOpen(!isOpen);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setIsOpen(false);
    } catch {
      // Fallback
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareData.text} ${shareData.url}`
  )}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareData.url
  )}`;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleNativeShare}
        className={`inline-flex items-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] px-3 py-1.5 text-xs font-bold text-black dark:text-white hover:border-[#10B981]/50 hover:text-[#10B981] dark:hover:text-[#10B981] transition-all shadow-xs ${className}`}
        title="Partager la plateforme avec vos collègues de classe"
      >
        <Share2 className="h-3.5 w-3.5 text-[#10B981]" />
        {variant === 'full' ? <span>Partager aux collègues</span> : <span className="hidden sm:inline">Partager</span>}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-2 shadow-xl z-40 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-black/10 dark:border-white/10 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50 block">
                Partager la plateforme
              </span>
              <span className="text-xs text-black/70 dark:text-white/70 font-medium">
                Aide tes collègues de promo !
              </span>
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-black dark:text-white hover:bg-[#10B981]/10 transition-colors"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#10B981] text-white shrink-0">
                <MessageCircle className="h-3.5 w-3.5" />
              </div>
              <span>Groupe WhatsApp</span>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-black dark:text-white hover:bg-[#22C55E]/10 transition-colors"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#22C55E] text-white shrink-0">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                </svg>
              </div>
              <span>Partager sur LinkedIn</span>
            </a>

            {/* Copy Link */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-black/10 dark:bg-white/10 text-black dark:text-white shrink-0">
                {copied ? <Check className="h-3.5 w-3.5 text-[#10B981]" /> : <Copy className="h-3.5 w-3.5" />}
              </div>
              <span>{copied ? 'Lien copié !' : 'Copier le lien'}</span>
            </button>

            {/* Add to Home Screen / Install Option */}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsInstallOpen(true);
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#10B981] hover:bg-[#10B981]/10 transition-colors border-t border-black/5 dark:border-white/5 mt-1 pt-2 cursor-pointer"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#10B981]/15 text-[#10B981] shrink-0">
                <Smartphone className="h-3.5 w-3.5" />
              </div>
              <span>Sur l'écran d'accueil (App)</span>
            </button>
          </div>
        </>
      )}

      <InstallModal open={isInstallOpen} onOpenChange={setIsInstallOpen} />
    </div>
  );
}
