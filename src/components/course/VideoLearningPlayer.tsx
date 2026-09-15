import React, { useState } from 'react';
import { SectionVideo } from '../../types';
import { Badge } from '../ui/Badge';
import { Play, ExternalLink, Globe, CheckCircle2, Sparkles, Volume2 } from 'lucide-react';

function YoutubeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

interface VideoLearningPlayerProps {
  videos: {
    fr: SectionVideo;
    en: SectionVideo;
  };
}

export function VideoLearningPlayer({ videos }: VideoLearningPlayerProps) {
  const [activeLang, setActiveLang] = useState<'fr' | 'en'>('fr');
  const [isPlaying, setIsPlaying] = useState(false);

  const currentVideo = videos[activeLang];

  return (
    <div className="my-8 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-card">
      {/* Header with Language Selector Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 shadow-sm shrink-0">
            <YoutubeIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                Vidéo d’Explication & Cas Réels
              </span>
              <Badge variant="outline" size="sm">
                YouTube HD
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Sélection pédagogique recommandée pour réussir l'examen
            </p>
          </div>
        </div>

        {/* Dual Language Switcher */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs">
          <button
            onClick={() => { setActiveLang('fr'); setIsPlaying(false); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeLang === 'fr'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>🇲🇦 / 🇫🇷</span>
            <span>Français · Maroc</span>
          </button>
          <button
            onClick={() => { setActiveLang('en'); setIsPlaying(false); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeLang === 'en'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>🇬🇧</span>
            <span>English</span>
          </button>
        </div>
      </div>

      {/* Video Player or Thumbnail Card */}
      <div className="mt-5 relative overflow-hidden rounded-2xl border border-slate-200 aspect-video bg-slate-900 shadow-inner">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0`}
            title={currentVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900">
            {/* Background Thumbnail preview */}
            <img
              src={`https://img.youtube.com/vi/${currentVideo.youtubeId}/hqdefault.jpg`}
              alt={currentVideo.title}
              className="absolute inset-0 w-full h-full object-cover opacity-35 filter blur-[1px]"
            />

            <div className="relative z-10 flex flex-col items-center max-w-lg">
              <button
                onClick={() => setIsPlaying(true)}
                className="group flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
                aria-label="Lancer la vidéo"
              >
                <Play className="h-7 w-7 sm:h-8 sm:w-8 fill-white ml-1 transition-transform group-hover:scale-105" />
              </button>

              <h4 className="mt-4 text-base sm:text-xl font-bold text-white line-clamp-2">
                {currentVideo.title}
              </h4>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-slate-200">{currentVideo.channel}</span>
                <span>•</span>
                <span>Durée : {currentVideo.duration}</span>
                <span>•</span>
                <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  {currentVideo.language === 'fr' ? 'Français / Darija' : 'English Masterclass'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Details and Key Takeaways */}
      <div className="mt-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-slate-900">
            {currentVideo.title}
          </h4>

          <a
            href={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            <span>Ouvrir dans YouTube</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {currentVideo.summary}
        </p>

        {/* Pedagogical Key Takeaways */}
        {currentVideo.keyPoints && currentVideo.keyPoints.length > 0 && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Points essentiels expliqués dans cette vidéo :</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {currentVideo.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
