import React, { useState } from 'react';
import { Scale, ArrowUp, Sparkles, Compass } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';

interface PlanetGravity {
  id: string;
  name: string;
  emoji: string;
  ratio: number;
  color: string;
  jumpHeightMultiplier: number;
  feelingDescription: string;
}

const PLANET_GRAVITIES: PlanetGravity[] = [
  { id: 'bulan', name: 'Bulan', emoji: '🌕', ratio: 0.166, color: '#E2E8F0', jumpHeightMultiplier: 6.0, feelingDescription: 'Ringan sekali bagai melayang di udara! Kamu bisa melompat setinggi langit-langit rumah.' },
  { id: 'merkurius', name: 'Merkurius', emoji: '🪨', ratio: 0.38, color: '#94A3B8', jumpHeightMultiplier: 2.6, feelingDescription: 'Lompatanmu tinggi dan langkah kakimu sangat lincah bagai kangguru.' },
  { id: 'mars', name: 'Mars', emoji: '🔴', ratio: 0.38, color: '#EF4444', jumpHeightMultiplier: 2.6, feelingDescription: 'Cukup ringan! Membawa tas ransel besar pun terasa seperti membawa bantal bulu.' },
  { id: 'venus', name: 'Venus', emoji: '✨', ratio: 0.91, color: '#FBBF24', jumpHeightMultiplier: 1.1, feelingDescription: 'Hampir sama persis dengan di Bumi, hanya sedikit lebih enteng.' },
  { id: 'bumi', name: 'Bumi (Rumah Kita)', emoji: '🌍', ratio: 1.0, color: '#38BDF8', jumpHeightMultiplier: 1.0, feelingDescription: 'Gravitasi pas dan nyaman! Kita bisa berjalan, berlari, dan tidur nyenyak.' },
  { id: 'uranus', name: 'Uranus', emoji: '🧊', ratio: 0.89, color: '#2DD4BF', jumpHeightMultiplier: 1.12, feelingDescription: 'Sedikit lebih ringan dari Bumi, seperti berjalan di atas kasur pegas lembut.' },
  { id: 'saturnus', name: 'Saturnus', emoji: '🪐', ratio: 1.07, color: '#FCD34D', jumpHeightMultiplier: 0.93, feelingDescription: 'Meskipun planetnya raksasa, karena terbuat dari gas ringan, gravitasinya mirip Bumi!' },
  { id: 'neptunus', name: 'Neptunus', emoji: '🌊', ratio: 1.14, color: '#3B82F6', jumpHeightMultiplier: 0.87, feelingDescription: 'Sedikit lebih berat, seperti memakai sepatu bot salju yang tebal.' },
  { id: 'jupiter', name: 'Yupiter', emoji: '🌀', ratio: 2.53, color: '#EAB308', jumpHeightMultiplier: 0.4, feelingDescription: 'Sangat berat! Seperti sedang menggendong 2 teman di punggungmu sekaligus.' }
];

interface ScaleItem {
  id: string;
  name: string;
  category: string;
  diameterRatio: number; // relative to Earth = 1
  diameterKm: string;
  color: string;
  emoji: string;
  analogy: string;
}

const SCALE_ITEMS: ScaleItem[] = [
  { id: 'bulan', name: 'Bulan', category: 'Satelit Alami', diameterRatio: 0.27, diameterKm: '3.474 km', color: '#E2E8F0', emoji: '🌕', analogy: 'Seperti kelereng kecil kelereng mini' },
  { id: 'bumi', name: 'Bumi', category: 'Planet Kehidupan', diameterRatio: 1.0, diameterKm: '12.742 km', color: '#38BDF8', emoji: '🌍', analogy: 'Patokan ukuran kita: seperti bola tenis' },
  { id: 'saturnus', name: 'Saturnus', category: 'Planet Gas Bercincin', diameterRatio: 9.1, diameterKm: '116.460 km', color: '#FCD34D', emoji: '🪐', analogy: '9 kali lebih lebar dari Bumi' },
  { id: 'jupiter', name: 'Yupiter', category: 'Raksasa Gas', diameterRatio: 11.0, diameterKm: '139.820 km', color: '#EAB308', emoji: '🌀', analogy: '11 kali lebih lebar dari Bumi' },
  { id: 'matahari', name: 'Matahari', category: 'Bintang Induk', diameterRatio: 109.0, diameterKm: '1.392.700 km', color: '#F59E0B', emoji: '☀️', analogy: '109 kali lebih besar dari Bumi!' },
  { id: 'betelgeuse', name: 'Betelgeuse', category: 'Bintang Super Raksasa', diameterRatio: 760.0, diameterKm: '1 Miliar km', color: '#EF4444', emoji: '🔥', analogy: 'Jika diletakkan di tengah, menelan sampai orbit Jupiter!' }
];

export const GravityLab: React.FC<{ onTriggerAchievement?: () => void }> = ({
  onTriggerAchievement
}) => {
  const [earthWeight, setEarthWeight] = useState<number>(30);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetGravity>(PLANET_GRAVITIES[0]); // Moon default
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'gravity' | 'scale'>('gravity');
  const [selectedScaleItem, setSelectedScaleItem] = useState<ScaleItem>(SCALE_ITEMS[1]); // Earth

  const calculatedWeight = (earthWeight * selectedPlanet.ratio).toFixed(1);
  const baseJumpCm = 40; // 40 cm jump on Earth
  const estimatedJumpCm = Math.round(baseJumpCm * selectedPlanet.jumpHeightMultiplier);

  const handleJumpTest = () => {
    cosmicAudio.playWhoosh();
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
      cosmicAudio.playPop();
    }, 1200);

    if (onTriggerAchievement) {
      onTriggerAchievement();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Sub Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Laboratorium Cilik Kosmos</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Uji berat badanmu di planet lain & bandingkan ukuran alam semesta yang menakjubkan
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => {
              cosmicAudio.playPop();
              setActiveSubTab('gravity');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'gravity'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Timbangan & Gravitasi</span>
          </button>
          <button
            onClick={() => {
              cosmicAudio.playPop();
              setActiveSubTab('scale');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'scale'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Skala Ukuran Semesta</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: GRAVITY CALCULATOR */}
      {activeSubTab === 'gravity' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Input & Planet Selector (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6">
            {/* Weight Input Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs md:text-sm font-semibold text-slate-200">
                  Masukkan Berat Badanmu di Bumi:
                </label>
                <span className="text-base font-mono font-bold text-cyan-400 tabular-nums">
                  {earthWeight} kg
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                step="1"
                value={earthWeight}
                onChange={(e) => {
                  setEarthWeight(Number(e.target.value));
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>15 kg (Adik Cilik)</span>
                <span>30 kg (Anak SD)</span>
                <span>50 kg</span>
                <span>80 kg (Dewasa)</span>
              </div>
            </div>

            {/* Choose Target Planet */}
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-2.5">
                Pilih Tempat Eksplorasi Antariksa:
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                {PLANET_GRAVITIES.map((planet) => {
                  const isSelected = selectedPlanet.id === planet.id;
                  return (
                    <button
                      key={planet.id}
                      onClick={() => {
                        cosmicAudio.playChime(500 + planet.ratio * 100);
                        setSelectedPlanet(planet);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-lg">{planet.emoji}</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {planet.ratio}x
                        </span>
                      </div>
                      <span className="text-xs font-bold text-white truncate">
                        {planet.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scientific Explanation for Kids */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tahukah Kamu? Mengapa berat kita berubah?</span>
              </div>
              <p>
                Massa tubuhmu (isi daging dan tulang) sebenarnya tidak pernah berubah! Yang berubah adalah <strong>gaya tarik gravitasi</strong> dari planet tersebut. Planet yang lebih besar dan padat menarikmu lebih kuat ke tanah.
              </p>
            </div>
          </div>

          {/* Right: Simulation Display & Jump Sandbox (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                Hasil Timbangan di {selectedPlanet.name}
              </div>

              {/* Big Weight Metric Card */}
              <div className="p-5 rounded-2xl bg-slate-850 border border-slate-700/80 shadow-inner flex items-baseline justify-between">
                <div>
                  <div className="text-3xl md:text-4xl font-mono font-bold text-white tabular-nums">
                    {calculatedWeight}
                    <span className="text-sm font-normal text-cyan-400 ml-1.5">kg</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {selectedPlanet.ratio < 1
                      ? `Kamu ${Math.round((1 - selectedPlanet.ratio) * 100)}% lebih enteng!`
                      : selectedPlanet.ratio === 1
                      ? 'Berat normalmu di Bumi'
                      : `Kamu ${Math.round((selectedPlanet.ratio - 1) * 100)}% lebih berat!`}
                  </div>
                </div>
                <span className="text-4xl">{selectedPlanet.emoji}</span>
              </div>

              {/* Jump Height Metric */}
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="text-slate-400">Tinggi Lompatanmu:</div>
                  <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">
                    {estimatedJumpCm >= 100
                      ? `${(estimatedJumpCm / 100).toFixed(1)} Meter!`
                      : `${estimatedJumpCm} cm`}
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  (Di Bumi: 40 cm)
                </div>
              </div>

              {/* Kid Feeling Description */}
              <p className="text-xs text-slate-300 italic leading-relaxed border-l-2 border-cyan-400 pl-3">
                &ldquo;{selectedPlanet.feelingDescription}&rdquo;
              </p>
            </div>

            {/* Astronaut Jump Sandbox Canvas / Animation */}
            <div className="relative h-44 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-end p-4 items-center">
              {/* Sky star speckles */}
              <div className="absolute top-2 left-3 text-[10px] text-slate-500 font-mono">
                Gravitasi: {selectedPlanet.ratio}G
              </div>

              {/* Jumping Astronaut Avatar */}
              <div
                className="text-4xl transition-all duration-700 ease-out select-none"
                style={{
                  transform: isJumping
                    ? `translateY(-${Math.min(100, estimatedJumpCm * 1.5)}px) scale(${1 + selectedPlanet.jumpHeightMultiplier * 0.05})`
                    : 'translateY(0px) scale(1)'
                }}
              >
                🧑‍🚀
              </div>

              {/* Planet Surface Ground */}
              <div
                className="w-full h-3 rounded-full mt-2"
                style={{ backgroundColor: selectedPlanet.color }}
              />

              {/* Jump Button */}
              <button
                onClick={handleJumpTest}
                disabled={isJumping}
                className="mt-3 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs cursor-pointer transition-all shadow flex items-center gap-1.5"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{isJumping ? 'Sedang Melayang! ✨' : 'Uji Coba Melompat!'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SCALE COMPARISON */}
      {activeSubTab === 'scale' && (
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm md:text-base font-bold text-white">
              Bandingkan Ukuran Benda Langit dengan Bumi Kita
            </h3>
            <p className="text-xs text-slate-400">
              Pilih benda langit di bawah untuk melihat betapa kecilnya Bumi dibanding raksasa-raksasa kosmik!
            </p>
          </div>

          {/* Scale Item Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {SCALE_ITEMS.map((item) => {
              const isSelected = selectedScaleItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    cosmicAudio.playChime(440 + item.diameterRatio * 2);
                    setSelectedScaleItem(item);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 shadow'
                      : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div>
                    <div className="text-xs font-bold text-white">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {item.diameterKm}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Scale Visual Comparison Stage */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center min-h-[260px] text-center space-y-4">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {/* Earth Benchmark */}
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full bg-sky-400 border-2 border-white/40 shadow flex items-center justify-center text-sm"
                  title="Bumi (12.742 km)"
                >
                  🌍
                </div>
                <span className="text-xs font-bold text-slate-300 mt-2">Bumi Kita</span>
                <span className="text-[11px] text-slate-500 font-mono">12.742 km</span>
              </div>

              <div className="text-slate-600 font-bold text-sm">VS</div>

              {/* Selected Body Circle Visualization */}
              <div className="flex flex-col items-center">
                <div
                  className="rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 text-2xl relative overflow-hidden"
                  style={{
                    width: `${Math.min(180, Math.max(24, 20 * Math.sqrt(selectedScaleItem.diameterRatio)))}px`,
                    height: `${Math.min(180, Math.max(24, 20 * Math.sqrt(selectedScaleItem.diameterRatio)))}px`,
                    backgroundColor: selectedScaleItem.color,
                    boxShadow: `0 0 30px ${selectedScaleItem.color}44`
                  }}
                >
                  <span className="drop-shadow">{selectedScaleItem.emoji}</span>
                </div>
                <span className="text-xs font-bold text-white mt-2">
                  {selectedScaleItem.name}
                </span>
                <span className="text-[11px] text-cyan-400 font-mono">
                  {selectedScaleItem.diameterKm}
                </span>
              </div>
            </div>

            {/* Analogy Box */}
            <div className="max-w-md p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <strong className="text-cyan-300">Perbandingan Anak: </strong>
              {selectedScaleItem.analogy}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
