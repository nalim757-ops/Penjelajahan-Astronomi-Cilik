import React, { useState } from 'react';
import { X, Volume2, VolumeX, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Info, Sparkles, Scale, Thermometer } from 'lucide-react';
import { CelestialBody } from '../data/spaceData';
import { cosmicAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CelestialInspectorModalProps {
  body: CelestialBody;
  onClose: () => void;
  onSelectPrev: () => void;
  onSelectNext: () => void;
  onUnlockBadge?: (badgeId: string) => void;
}

export const CelestialInspectorModal: React.FC<CelestialInspectorModalProps> = ({
  body,
  onClose,
  onSelectPrev,
  onSelectNext,
  onUnlockBadge
}) => {
  const [activeTab, setActiveTab] = useState<'fakta' | 'struktur' | 'kuis'>('fakta');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Handle Speech Narration
  const handleToggleSpeak = () => {
    if (isSpeaking) {
      cosmicAudio.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = `${body.name}. ${body.title}. ${body.summaryKid} Analogi seru: ${body.kidAnalogy} Fakta seru: ${body.funFacts.join('. ')}`;
      cosmicAudio.speak(textToRead, () => {
        setIsSpeaking(false);
      });
      if (onUnlockBadge) {
        onUnlockBadge('speech-used');
      }
    }
  };

  // Handle Quiz selection
  const handleQuizOption = (index: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswer(index);
    cosmicAudio.playPop();
  };

  const handleQuizSubmit = () => {
    if (selectedQuizAnswer === null) return;
    setQuizSubmitted(true);
    if (selectedQuizAnswer === body.quizQuestion.correctIndex) {
      cosmicAudio.playSuccess();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      cosmicAudio.playPop();
    }
  };

  const handleResetQuiz = () => {
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Modal Card Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Top Header Banner */}
        <div
          className="relative px-6 py-5 flex items-center justify-between border-b border-slate-800"
          style={{
            background: `linear-gradient(135deg, ${body.color}22 0%, #0f172a 100%)`
          }}
        >
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-white/20"
              style={{ backgroundColor: `${body.color}33` }}
            >
              {body.badgeEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  {body.name}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/80 text-cyan-400 border border-cyan-500/30">
                  {body.category.toUpperCase()}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-300">
                {body.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Voice Narration Button */}
            <button
              onClick={handleToggleSpeak}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                isSpeaking
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40'
              }`}
              title={isSpeaking ? 'Hentikan Suara' : 'Dengarkan Cerita Ini'}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Hentikan' : 'Dengarkan'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                cosmicAudio.stopSpeaking();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigator */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/60 px-6 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => {
              cosmicAudio.playPop();
              setActiveTab('fakta');
            }}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'fakta'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fakta Seru & Analogi</span>
          </button>

          {body.layers && body.layers.length > 0 && (
            <button
              onClick={() => {
                cosmicAudio.playPop();
                setActiveTab('struktur');
              }}
              className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'struktur'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Struktur Lapisan</span>
            </button>
          )}

          <button
            onClick={() => {
              cosmicAudio.playPop();
              setActiveTab('kuis');
            }}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'kuis'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Kuis Cepat</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
          {activeTab === 'fakta' && (
            <div className="space-y-6">
              {/* Summary Hero Card */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 md:p-5 flex flex-col md:flex-row gap-5 items-center">
                {/* 3D-like Glowing Ball representation */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <div
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden transition-transform duration-500 hover:scale-105"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${body.color} 45%, ${body.accentColor} 90%)`,
                      boxShadow: `0 0 35px ${body.color}55`
                    }}
                  >
                    {/* Ring indicator for Saturn */}
                    {body.id === 'saturnus' && (
                      <div className="absolute inset-0 border-4 border-amber-300/80 rounded-full scale-125 rotate-45 pointer-events-none" />
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-center md:text-left flex-1">
                  <div className="text-xs uppercase tracking-wider font-semibold text-cyan-400">
                    Mengenal {body.name}
                  </div>
                  <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                    {body.summaryKid}
                  </p>
                  <div className="pt-1 bg-cyan-950/40 border border-cyan-800/40 rounded-lg p-2.5 text-xs text-cyan-200 flex items-start gap-2">
                    <span className="text-base shrink-0">💡</span>
                    <span>
                      <strong>Bayangkan ini: </strong>
                      {body.kidAnalogy}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Science Telemetry for Kids */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                    <Thermometer className="w-3 h-3 text-rose-400" />
                    <span>Suhu Permukaan</span>
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-white">
                    {body.temperature}
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                    <Scale className="w-3 h-3 text-cyan-400" />
                    <span>Gravitasi Relatif</span>
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-white">
                    {body.gravityRatio}x gravitasi Bumi
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] text-slate-400 mb-1">Diameter Ukuran</div>
                  <div className="text-xs md:text-sm font-semibold text-white font-mono tabular-nums">
                    {body.actualDiameterKm}
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3">
                  <div className="text-[11px] text-slate-400 mb-1">Lama 1 Hari</div>
                  <div className="text-xs md:text-sm font-semibold text-white">
                    {body.dayLength}
                  </div>
                </div>
              </div>

              {/* 3 Fun Facts */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <span>3 Fakta Menakjubkan untuk Kamu Ketahui</span>
                </h3>

                <div className="space-y-2.5">
                  {body.funFacts.map((fact, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-slate-800/30 border border-slate-800 rounded-xl p-3.5 text-xs md:text-sm text-slate-300 leading-relaxed"
                    >
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0 text-xs">
                        {idx + 1}
                      </span>
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'struktur' && body.layers && (
            <div className="space-y-5">
              <div className="text-xs text-slate-300">
                Ayo kita bedah apa yang ada di dalam tubuh {body.name}! Seperti kue lapis, benda langit juga memiliki berbagai lapisan unik:
              </div>

              {/* Visual Layered Cross-section */}
              <div className="space-y-3">
                {body.layers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-800 bg-slate-800/40 flex items-start gap-4 transition-all hover:bg-slate-800/70"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-950 shrink-0 text-xs shadow"
                      style={{ backgroundColor: layer.color }}
                    >
                      {layer.thickness}
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{layer.name}</span>
                        <span className="text-[11px] font-mono text-slate-400">
                          ({layer.thickness} volume)
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'kuis' && (
            <div className="space-y-5">
              <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 space-y-4">
                <div className="text-xs font-semibold uppercase text-cyan-400 tracking-wider">
                  Tantangan Cilik: Pertanyaan {body.name}
                </div>
                <div className="text-sm md:text-base font-bold text-white leading-relaxed">
                  {body.quizQuestion.question}
                </div>

                {/* Option Buttons */}
                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  {body.quizQuestion.options.map((opt, idx) => {
                    const isSelected = selectedQuizAnswer === idx;
                    const isCorrect = idx === body.quizQuestion.correctIndex;

                    let btnClass = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      } else {
                        btnClass = 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60';
                      }
                    } else if (isSelected) {
                      btnClass = 'bg-cyan-950/60 border-cyan-400 text-cyan-200 font-semibold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizOption(idx)}
                        disabled={quizSubmitted}
                        className={`text-left px-4 py-3 rounded-xl border text-xs md:text-sm transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                        )}
                        {quizSubmitted && isSelected && !isCorrect && (
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit / Retry Actions */}
                <div className="pt-2 flex items-center justify-between">
                  {!quizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={selectedQuizAnswer === null}
                      className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs md:text-sm cursor-pointer transition-all shadow"
                    >
                      Periksa Jawabanku! ✨
                    </button>
                  ) : (
                    <button
                      onClick={handleResetQuiz}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Coba Jawab Lagi
                    </button>
                  )}
                </div>

                {/* Explanation Feedback */}
                {quizSubmitted && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs md:text-sm leading-relaxed ${
                      selectedQuizAnswer === body.quizQuestion.correctIndex
                        ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                        : 'bg-amber-950/40 border-amber-800/60 text-amber-200'
                    }`}
                  >
                    <strong>
                      {selectedQuizAnswer === body.quizQuestion.correctIndex ? '🎉 Jawaban Tepat! ' : '💡 Penjelasan: '}
                    </strong>
                    {body.quizQuestion.explanation}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Navigation Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              cosmicAudio.playWhoosh();
              onSelectPrev();
            }}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <span className="text-[11px] text-slate-500">
            Jelajah Kosmos Cilik
          </span>

          <button
            onClick={() => {
              cosmicAudio.playWhoosh();
              onSelectNext();
            }}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
