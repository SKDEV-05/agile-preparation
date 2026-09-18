import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import {
  Smartphone,
  Download,
  Share,
  PlusSquare,
  CheckCircle2,
  ExternalLink,
  Zap,
  WifiOff,
  Sparkles,
  Info
} from 'lucide-react';

interface InstallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InstallModal({ open, onOpenChange }: InstallModalProps) {
  const { hasNativePrompt, isIOS, isInstalled, promptInstall } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'phone' | 'apk'>('phone');
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      const accepted = await promptInstall();
      if (accepted) {
        onOpenChange(false);
      }
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-4 sm:p-6 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-black dark:text-white">
        <DialogHeader>
          <div className="flex items-center gap-2.5 sm:gap-3 mb-1 pr-6">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] to-[#22C55E] text-white shadow-md shadow-[#10B981]/25 shrink-0">
              <Smartphone className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-base sm:text-lg font-black truncate text-black dark:text-white">
                  Installer l'Application
                </DialogTitle>
                <Badge variant="success" size="sm" className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5">
                  PWA / APK
                </Badge>
              </div>
              <DialogDescription className="text-[11px] sm:text-xs text-black/60 dark:text-white/60 mt-0.5 truncate">
                Accès plein écran & révisions hors-ligne
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-black/5 dark:bg-white/5 p-1 border border-black/10 dark:border-white/10 my-1">
          <button
            type="button"
            onClick={() => setActiveTab('phone')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'phone'
                ? 'bg-white dark:bg-[#0A0A0A] text-[#10B981] shadow-sm border border-black/10 dark:border-white/10'
                : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Sur mon Téléphone</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('apk')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'apk'
                ? 'bg-white dark:bg-[#0A0A0A] text-[#10B981] shadow-sm border border-black/10 dark:border-white/10'
                : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Fichier .APK Android</span>
          </button>
        </div>

        {/* Content: Phone Tab */}
        {activeTab === 'phone' && (
          <div className="space-y-3.5">
            {isInstalled ? (
              <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-4 text-black dark:text-white text-center">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-[#10B981]" />
                <div className="font-bold text-sm">Application déjà installée !</div>
                <p className="text-xs text-black/70 dark:text-white/70 mt-1">
                  Vous utilisez déjà la version installée sur votre écran d'accueil.
                </p>
              </div>
            ) : hasNativePrompt ? (
              <div className="space-y-3">
                <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-3.5 text-xs text-black dark:text-white space-y-2">
                  <div className="font-bold text-[#10B981] flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-[#10B981]" />
                    Installation directe en 1 clic
                  </div>
                  <p className="text-black/70 dark:text-white/70">
                    Votre navigateur Android supporte l'installation native. Cliquez ci-dessous pour ajouter l'icône directement à vos applications.
                  </p>
                </div>
                <Button
                  onClick={handleInstallClick}
                  disabled={isInstalling}
                  size="lg"
                  className="w-full justify-center bg-[#10B981] hover:bg-[#22C55E] text-white shadow-lg shadow-[#10B981]/25 font-bold"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isInstalling ? 'Installation en cours...' : 'Installer sur mon téléphone'}
                </Button>
              </div>
            ) : isIOS ? (
              /* iOS Instructions */
              <div className="space-y-2.5">
                <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3 text-xs">
                  <div className="font-bold text-black dark:text-white mb-2 flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-[#10B981]" />
                    Sur iPhone / iPad (Safari) :
                  </div>
                  <ol className="space-y-2 text-black/70 dark:text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981] font-bold text-[11px]">
                        1
                      </span>
                      <span>
                        Appuyez sur le bouton <strong>Partager</strong> <Share className="inline h-3.5 w-3.5 mx-1 text-[#10B981]" /> en bas de l'écran Safari.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981] font-bold text-[11px]">
                        2
                      </span>
                      <span>
                        Faites défiler la liste et appuyez sur <strong className="text-black dark:text-white">« Sur l'écran d'accueil »</strong> <PlusSquare className="inline h-3.5 w-3.5 mx-1 text-[#10B981]" />.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981] font-bold text-[11px]">
                        3
                      </span>
                      <span>
                        Touchez <strong>« Ajouter »</strong> en haut à droite. L'icône apparaîtra comme une véritable application native !
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            ) : (
              /* Android Chrome Instructions */
              <div className="space-y-2.5">
                <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3 text-xs">
                  <div className="font-bold text-black dark:text-white mb-2 flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-[#10B981]" />
                    Sur Android (Chrome / Samsung Internet) :
                  </div>
                  <ol className="space-y-2 text-black/70 dark:text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981] font-bold text-[11px]">
                        1
                      </span>
                      <span>
                        Ouvrez le menu du navigateur en appuyant sur les <strong>trois points (⋮)</strong> en haut à droite.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981] font-bold text-[11px]">
                        2
                      </span>
                      <span>
                        Sélectionnez <strong className="text-black dark:text-white">« Installer l'application »</strong> ou <strong>« Ajouter à l'écran d'accueil »</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981] font-bold text-[11px]">
                        3
                      </span>
                      <span>
                        Validez. L'application est installée sans passer par le Play Store !
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* Perks list */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white">
                <Zap className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                <span>Plein écran fluide</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white">
                <WifiOff className="h-3.5 w-3.5 text-[#22C55E] shrink-0" />
                <span>Révisez hors-ligne</span>
              </div>
            </div>
          </div>
        )}

        {/* Content: APK Tab */}
        {activeTab === 'apk' && (
          <div className="space-y-3 text-xs">
            <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-3.5 space-y-2">
              <div className="font-bold text-black dark:text-white flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#10B981]" />
                Comment obtenir le fichier .APK directement ?
              </div>
              <p className="text-black/70 dark:text-white/70">
                Comme cette application est une PWA certifiée avec Manifest et Service Worker, vous pouvez générer un vrai fichier <strong>.APK Android autonome</strong> en 30 secondes grâce à l'outil officiel de Microsoft :
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3 space-y-2.5">
              <div className="font-bold text-black dark:text-white">
                Étapes pour télécharger votre APK :
              </div>
              <ol className="space-y-2 text-black/70 dark:text-white/70 pl-1">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#10B981]">1.</span>
                  <span>Rendez-vous sur le générateur gratuit <strong>PWABuilder.com</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#10B981]">2.</span>
                  <span>Collez l'URL de votre application : <code className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-[11px] font-mono select-all">https://fullstack-2a.vercel.app/</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#10B981]">3.</span>
                  <span>Cliquez sur <strong>« Package for Stores »</strong> puis choisissez <strong>Android</strong> pour télécharger directement votre fichier APK !</span>
                </li>
              </ol>
            </div>

            <a
              href="https://www.pwabuilder.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-90 transition-opacity"
            >
              <span>Ouvrir PWABuilder.com</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        <DialogFooter className="sm:justify-between border-t border-black/10 dark:border-white/10 pt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs text-black dark:text-white"
          >
            Fermer
          </Button>
          <div className="text-[11px] text-black/40 dark:text-white/40 flex items-center self-center">
            ✦ Optimisé pour Android & iOS
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
