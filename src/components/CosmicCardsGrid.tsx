import React, { useState } from 'react';
import { CelestialBody } from '../data/spaceData';
import { cosmicAudio } from '../utils/audio';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface CosmicCardsGridProps {
  bodies: CelestialBody[];
  onSelectBody: (body: CelestialBody) => void;
}

export const CosmicCardsGrid: React.FC<CosmicCardsGridProps> = ({
  bodies,
  onSelectBody
}) => {
  const [filter, setFilter] = useState<'all' | 'tata-surya' | 'galaksi-nebula' | 'misteri'>('all');

  const filteredBodies = bodies.filter((b) => {
    if (filter === 'all') return true;
    if (filter === 'tata-surya') return b.category === 'tata-surya' || b.id === 'matahari';
    if (filter === 'galaksi-nebula') return b.category === 'galaksi-nebula' || b.category === 'bintang';
    if (filter === 'misteri') return b.category === 'misteri';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filter and Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Koleksi Keajaiban Alam Semesta</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Pilih dan ketuk objek langit mana pun untuk membaca fakta ajaibnya
          </p>
        </div>

        {/* Functional filter segmented control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => {
              cosmicAudio.playPop();
              setFilter('all');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Semua ({bodies.length})
          </button>
          <button
            onClick={() => {
              cosmicAudio.playPop();
              setFilter('tata-surya');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'tata-surya'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tata Surya
          </button>
          <button
            onClick={() => {
              cosmicAudio.playPop();
              setFilter('galaksi-nebula');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'galaksi-nebula'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Galaksi & Nebula
          </button>
          <button
            onClick={() => {
              cosmicAudio.playPop();
              setFilter('misteri');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'misteri'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Misteri Angkasa
          </button>
        </div>
      </div>

      {/* Grid of Celestial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filteredBodies.map((body) => {
          return (
            <div
              key={body.id}
              onClick={() => {
                cosmicAudio.playChime(600);
                cosmicAudio.playWhoosh();
                onSelectBody(body);
              }}
              className="group relative bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Background Ambient Glow */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-15 blur-2xl group-hover:opacity-35 transition-opacity pointer-events-none"
                style={{ backgroundColor: body.color }}
              />

              <div>
                {/* Visual Asset or Stylized Planet Sphere */}
                {body.image ? (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4 bg-slate-950 border border-slate-800">
                    <img
                      src={body.image}
                      alt={body.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 text-xl drop-shadow">
                      {body.badgeEmoji}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/10 transition-transform group-hover:scale-110"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${body.color} 50%, ${body.accentColor} 90%)`
                      }}
                    >
                      {body.badgeEmoji}
                    </div>

                    <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-700 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* Clean unboxed metadata with bullet separators (Zero-Pill Discipline) */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                  <span className="font-medium text-cyan-400/90">{body.category.toUpperCase()}</span>
                  <span aria-hidden="true">·</span>
                  <span>{body.actualDiameterKm}</span>
                </div>

                {/* Card Title */}
                <h3 className="text-base md:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {body.name}
                </h3>
                <div className="text-xs text-slate-400 font-medium mt-0.5 line-clamp-1">
                  {body.title}
                </div>

                {/* Kid-friendly summary */}
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-2">
                  {body.summaryKid}
                </p>
              </div>

              {/* Bottom Analogy Ribbon */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate pr-2 text-[11px] text-cyan-200/80 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">{body.kidAnalogy}</span>
                </span>
                <span className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 text-[11px] font-semibold">
                  Lihat ➔
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
