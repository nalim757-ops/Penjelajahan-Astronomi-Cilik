import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onStartExplore: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  isMuted,
  onToggleMute,
  onStartExplore
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#050713]/85 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone - Single text element wordmark */}
        <button
          onClick={() => onSelectTab('tata-surya')}
          className="text-lg md:text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span className="text-xl">🪐</span>
          <span>Kosmos Cilik</span>
        </button>

        {/* Zone 2: 4 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('tata-surya')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'tata-surya'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Tata Surya
          </button>
          <button
            onClick={() => onSelectTab('galaksi')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'galaksi'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Galaksi & Nebula
          </button>
          <button
            onClick={() => onSelectTab('lab-gravitasi')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'lab-gravitasi'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Lab Gravitasi
          </button>
          <button
            onClick={() => onSelectTab('kuis')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'kuis'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Kuis Bintang
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            title={isMuted ? 'Nyalakan Audio' : 'Matikan Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
          <button
            onClick={onStartExplore}
            className="px-4 py-2 text-xs md:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm hover:shadow-cyan-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mulai Jelajah</span>
          </button>
        </div>
      </div>

      {/* Mobile nav sub-bar */}
      <div className="flex md:hidden items-center justify-around pt-2.5 mt-2 border-t border-slate-800/60 text-xs font-medium">
        <button
          onClick={() => onSelectTab('tata-surya')}
          className={`py-1 ${activeTab === 'tata-surya' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          Tata Surya
        </button>
        <button
          onClick={() => onSelectTab('galaksi')}
          className={`py-1 ${activeTab === 'galaksi' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          Galaksi
        </button>
        <button
          onClick={() => onSelectTab('lab-gravitasi')}
          className={`py-1 ${activeTab === 'lab-gravitasi' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          Gravitasi
        </button>
        <button
          onClick={() => onSelectTab('kuis')}
          className={`py-1 ${activeTab === 'kuis' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          Kuis
        </button>
      </div>
    </header>
  );
};
