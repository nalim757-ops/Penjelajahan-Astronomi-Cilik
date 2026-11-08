import React, { useState } from 'react';
import { Sparkles, X, RefreshCw } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';

const ASTRO_TIPS: string[] = [
  'Bumi kita berputar mengelilingi Matahari dengan kecepatan 107.000 km per jam!',
  'Di Saturnus, cincin indahnya terbuat dari miliaran serpihan es dan debu angkasa!',
  'Cahaya dari Matahari membutuhkan waktu sekitar 8 menit untuk sampai ke matamu.',
  'Di Bulan, kamu bisa melompat 6 kali lebih tinggi seperti pahlawan super!',
  'Yupiter sangat besar sehingga 1.300 planet Bumi bisa dimasukkan ke dalamnya!',
  'Nebula adalah taman kanak-kanak kosmik tempat bayi bintang baru dilahirkan!',
  'Di Mars ada gunung berapi Olympus Mons yang tingginya 3 kali lipat Gunung Everest!'
];

export const AstroGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [tipIndex, setTipIndex] = useState<number>(0);

  const handleNextTip = (e: React.MouseEvent) => {
    e.stopPropagation();
    cosmicAudio.playPop();
    setTipIndex((prev) => (prev + 1) % ASTRO_TIPS.length);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          cosmicAudio.playPop();
          setIsOpen(true);
        }}
        className="fixed bottom-4 right-4 z-30 p-2.5 rounded-full bg-slate-900 border border-cyan-500/50 shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold text-white"
        title="Buka Astro Kiki (Panduan Cilik)"
      >
        <span className="text-xl">🧑‍🚀</span>
        <span className="hidden sm:inline text-cyan-300">Astro Kiki</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-30 max-w-xs sm:max-w-sm bg-slate-900/95 border border-cyan-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-slideUp text-slate-100">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-lg">
            🧑‍🚀
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1">
              <span>Astro Kiki</span>
              <span className="text-[10px] text-cyan-400 font-normal">· Sahabat Cilik</span>
            </div>
            <div className="text-[10px] text-slate-400">Tips Antariksa Hari Ini</div>
          </div>
        </div>

        <button
          onClick={() => {
            cosmicAudio.playPop();
            setIsOpen(false);
          }}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          title="Tutup tips"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-xs text-slate-200 leading-relaxed bg-slate-800/40 border border-slate-800 rounded-xl p-2.5">
        &ldquo;{ASTRO_TIPS[tipIndex]}&rdquo;
      </p>

      <div className="mt-2.5 flex items-center justify-between text-[11px]">
        <button
          onClick={handleNextTip}
          className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Fakta Lainnya</span>
        </button>

        <span className="text-slate-500 text-[10px] font-mono">
          {tipIndex + 1}/{ASTRO_TIPS.length}
        </span>
      </div>
    </div>
  );
};
