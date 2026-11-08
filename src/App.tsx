import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { CosmicCanvas } from './components/CosmicCanvas';
import { CelestialInspectorModal } from './components/CelestialInspectorModal';
import { CosmicCardsGrid } from './components/CosmicCardsGrid';
import { GravityLab } from './components/GravityLab';
import { SpaceQuiz } from './components/SpaceQuiz';
import { AstroGuide } from './components/AstroGuide';
import { CELESTIAL_BODIES, CelestialBody } from './data/spaceData';
import { cosmicAudio } from './utils/audio';
import { Sparkles, Compass, Rocket } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('tata-surya');
  const [selectedBody, setSelectedBody] = useState<CelestialBody | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>([]);
  const [exploredBodyIds, setExploredBodyIds] = useState<Set<string>>(new Set());

  const orreryRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const labRef = useRef<HTMLDivElement | null>(null);
  const quizRef = useRef<HTMLDivElement | null>(null);

  // Handle Tab navigation & smooth scroll
  const handleSelectTab = (tab: string) => {
    cosmicAudio.playPop();
    setActiveTab(tab);
    if (tab === 'tata-surya' && orreryRef.current) {
      orreryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'galaksi' && cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'lab-gravitasi' && labRef.current) {
      labRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'kuis' && quizRef.current) {
      quizRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleMute = () => {
    const muted = cosmicAudio.toggleMute();
    setIsMuted(muted);
  };

  // Inspect celestial object & track badge progress
  const handleSelectBody = (body: CelestialBody) => {
    setSelectedBody(body);
    setExploredBodyIds((prev) => {
      const next = new Set(prev);
      next.add(body.id);
      if (next.size >= 5 && !unlockedBadgeIds.includes('explore-5')) {
        handleUnlockBadge('explore-5');
      }
      if (next.size >= CELESTIAL_BODIES.length && !unlockedBadgeIds.includes('explore-all')) {
        handleUnlockBadge('explore-all');
      }
      return next;
    });
  };

  const handleUnlockBadge = (badgeId: string) => {
    if (!unlockedBadgeIds.includes(badgeId)) {
      setUnlockedBadgeIds((prev) => [...prev, badgeId]);
      cosmicAudio.playSuccess();
    }
  };

  // Previous & Next navigation in modal
  const handleSelectPrevBody = () => {
    if (!selectedBody) return;
    const currentIndex = CELESTIAL_BODIES.findIndex((b) => b.id === selectedBody.id);
    const prevIndex = (currentIndex - 1 + CELESTIAL_BODIES.length) % CELESTIAL_BODIES.length;
    handleSelectBody(CELESTIAL_BODIES[prevIndex]);
  };

  const handleSelectNextBody = () => {
    if (!selectedBody) return;
    const currentIndex = CELESTIAL_BODIES.findIndex((b) => b.id === selectedBody.id);
    const nextIndex = (currentIndex + 1) % CELESTIAL_BODIES.length;
    handleSelectBody(CELESTIAL_BODIES[nextIndex]);
  };

  const handleStartExplore = () => {
    cosmicAudio.playWhoosh();
    if (orreryRef.current) {
      orreryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#03050C] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* 3-Zone Top Bar */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onStartExplore={handleStartExplore}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 space-y-16">
        {/* HERO SECTION */}
        <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
          {/* Hero Astrophotography Banner */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/hero_cosmic_universe_1794125482808.jpg"
              alt="Keindahan Alam Semesta Kosmik"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-35 object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03050C] via-[#03050C]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#03050C] via-[#03050C]/60 to-transparent" />
          </div>

          <div className="relative z-10 p-6 md:p-12 lg:p-14 max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Petualangan Edukasi Sains Antariksa Cilik</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
              Jelajahi Keindahan & Rahasia Alam Semesta
            </h1>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Ayo meluncur ke luar angkasa bersama Astro Kiki! Temukan bagaimana planet-planet menari mengitari Matahari, mengapa Saturnus memiliki cincin berkilauan, dan uji berat badanmu di Bulan dan Mars dengan fakta seru yang mudah dipahami.
            </p>

            {/* Hero Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleStartExplore}
                className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs md:text-sm shadow-lg shadow-cyan-500/20 cursor-pointer transition-all flex items-center gap-2"
              >
                <Rocket className="w-4 h-4" />
                <span>Buka Simulasi Tata Surya</span>
              </button>

              <button
                onClick={() => handleSelectTab('lab-gravitasi')}
                className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs md:text-sm cursor-pointer transition-colors flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Coba Timbangan Planet</span>
              </button>
            </div>

            {/* Clean Unboxed Editorial Stats Strip */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 md:gap-10 text-xs text-slate-400">
              <div>
                <span className="text-lg md:text-xl font-bold font-mono text-white block tabular-nums">
                  8 Planet
                </span>
                <span>Mengelilingi Matahari</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">/</span>
              <div>
                <span className="text-lg md:text-xl font-bold font-mono text-white block tabular-nums">
                  100+ Miliar
                </span>
                <span>Bintang di Galaksi Kita</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">/</span>
              <div>
                <span className="text-lg md:text-xl font-bold font-mono text-cyan-400 block tabular-nums">
                  100% Ramah Anak
                </span>
                <span>Bahasa & Konsep Simpel</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: INTERACTIVE SOLAR SYSTEM ORRERY */}
        <section ref={orreryRef} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Simulasi Interaktif Tata Surya</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                Putar, perbesar, dan ketuk planet untuk melihat animasi dan mendengarkan suaranya
              </p>
            </div>
          </div>

          <CosmicCanvas
            planets={CELESTIAL_BODIES}
            onSelectBody={handleSelectBody}
            selectedBodyId={selectedBody?.id}
          />
        </section>

        {/* SECTION 2: COSMIC SHOWCASE & WONDERS GRID */}
        <section ref={cardsRef}>
          <CosmicCardsGrid
            bodies={CELESTIAL_BODIES}
            onSelectBody={handleSelectBody}
          />
        </section>

        {/* SECTION 3: GRAVITY & SCALE LAB */}
        <section ref={labRef}>
          <GravityLab
            onTriggerAchievement={() => handleUnlockBadge('gravity-test')}
          />
        </section>

        {/* SECTION 4: SPACE QUIZ & BADGES */}
        <section ref={quizRef}>
          <SpaceQuiz
            unlockedBadgeIds={unlockedBadgeIds}
            onUnlockBadge={handleUnlockBadge}
          />
        </section>
      </main>

      {/* Astro Guide Mascot */}
      <AstroGuide />

      {/* Full Modal Inspector */}
      {selectedBody && (
        <CelestialInspectorModal
          body={selectedBody}
          onClose={() => setSelectedBody(null)}
          onSelectPrev={handleSelectPrevBody}
          onSelectNext={handleSelectNextBody}
          onUnlockBadge={handleUnlockBadge}
        />
      )}

      {/* Quiet Footer */}
      <footer className="mt-20 border-t border-slate-900 bg-slate-950/80 px-4 md:px-8 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <span>🪐</span>
            <span>Kosmos Cilik - Eksplorasi Alam Semesta untuk Anak-anak</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Sains Populer & Ramah Anak</span>
            <span>·</span>
            <span>Simulasi Tata Surya</span>
            <span>·</span>
            <span>Eksplorasi Kosmik</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
