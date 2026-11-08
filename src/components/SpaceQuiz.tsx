import React, { useState } from 'react';
import { Award, CheckCircle2, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';
import { SPACE_BADGES } from '../data/spaceData';
import { cosmicAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface QuizItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const GENERAL_QUIZ: QuizItem[] = [
  {
    id: 1,
    question: 'Benda langit apa yang menjadi pusat dari seluruh tata surya kita?',
    options: ['Bulan', 'Matahari', 'Bumi', 'Komet'],
    correctIndex: 1,
    explanation: 'Hebat! Matahari adalah bintang induk raksasa di pusat yang dikelilingi oleh semua planet.'
  },
  {
    id: 2,
    question: 'Planet manakah yang terkenal dengan cincin esnya yang sangat indah?',
    options: ['Saturnus', 'Mars', 'Merkurius', 'Venus'],
    correctIndex: 0,
    explanation: 'Tepat sekali! Saturnus adalah ratu cincin megah yang terbentuk dari serpihan es dan debu.'
  },
  {
    id: 3,
    question: 'Mengapa di Bulan manusia bisa melompat jauh lebih tinggi daripada di Bumi?',
    options: ['Karena memakai sepatu pegas', 'Karena gravitasinya lebih ringan', 'Karena udaranya sangat berangin', 'Karena tanahnya terbuat dari karet'],
    correctIndex: 1,
    explanation: 'Luar biasa! Gravitasi Bulan hanya 1/6 dari Bumi, jadi kita merasa sangat ringan bagai melayang.'
  },
  {
    id: 4,
    question: 'Tempat ajaib di luar angkasa tempat bayi-bayi bintang baru lahir disebut apa?',
    options: ['Kawah Bulan', 'Nebula', 'Gua Kosmik', 'Puncak Gunung'],
    correctIndex: 1,
    explanation: 'Benar! Nebula adalah awan gas dan debu warna-warni yang menjadi tempat lahirnya bintang-bintang baru.'
  },
  {
    id: 5,
    question: 'Apa nama galaksi spiral raksasa tempat tinggal tata surya dan Bumi kita?',
    options: ['Galaksi Andromeda', 'Galaksi Bima Sakti (Milky Way)', 'Galaksi Segitiga', 'Galaksi Kupu-kupu'],
    correctIndex: 1,
    explanation: 'Sempurna! Bima Sakti adalah rumah raksasa kita bersama lebih dari 100 miliar bintang lainnya.'
  }
];

interface SpaceQuizProps {
  unlockedBadgeIds: string[];
  onUnlockBadge: (badgeId: string) => void;
}

export const SpaceQuiz: React.FC<SpaceQuizProps> = ({
  unlockedBadgeIds,
  onUnlockBadge
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = GENERAL_QUIZ[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    cosmicAudio.playPop();
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQ.correctIndex) {
      setScore((s) => s + 1);
      cosmicAudio.playSuccess();
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 }
      });
    } else {
      cosmicAudio.playPop();
    }
  };

  const handleNextQuestion = () => {
    cosmicAudio.playWhoosh();
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (currentIdx + 1 < GENERAL_QUIZ.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      // If perfect score, unlock badge
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 1 : 0);
      if (finalScore === GENERAL_QUIZ.length) {
        onUnlockBadge('quiz-perfect');
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    }
  };

  const handleRestart = () => {
    cosmicAudio.playPop();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="space-y-8">
      {/* Quiz Section Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Kuis Petualang Bintang & Lencana</span>
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Uji pengetahuan antariksamu dan kumpulkan lencana penjelajah kosmos sejati!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Quiz Area (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6">
          {!isCompleted ? (
            <>
              {/* Progress Bar & Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>
                    Pertanyaan {currentIdx + 1} dari {GENERAL_QUIZ.length}
                  </span>
                  <span className="text-cyan-400 font-mono">
                    Skor Sementara: {score} Poin
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                    style={{
                      width: `${((currentIdx + 1) / GENERAL_QUIZ.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="pt-2">
                <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let styleClass = 'bg-slate-800/50 border-slate-700/80 text-slate-200 hover:bg-slate-800';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      styleClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      styleClass = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      styleClass = 'bg-slate-800/30 border-slate-800 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    styleClass = 'bg-cyan-950/60 border-cyan-400 text-cyan-200 font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-xs md:text-sm transition-all cursor-pointer flex items-center justify-between ${styleClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-300">
                          {['A', 'B', 'C', 'D'][idx]}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit or Next Button */}
              <div className="flex items-center justify-between pt-2">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs md:text-sm cursor-pointer transition-all shadow"
                  >
                    Kunci Jawaban 🎯
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs md:text-sm cursor-pointer transition-all shadow flex items-center gap-1.5"
                  >
                    <span>
                      {currentIdx + 1 < GENERAL_QUIZ.length ? 'Pertanyaan Berikutnya ➔' : 'Lihat Hasil Akhir 🎉'}
                    </span>
                  </button>
                )}
              </div>

              {/* Fact Explanation */}
              {isAnswerSubmitted && (
                <div
                  className={`p-4 rounded-xl border text-xs md:text-sm leading-relaxed ${
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                      : 'bg-amber-950/40 border-amber-800/60 text-amber-200'
                  }`}
                >
                  <strong>
                    {selectedOption === currentQ.correctIndex ? '🎉 Hebat Banget! ' : '💡 Fakta Seru: '}
                  </strong>
                  {currentQ.explanation}
                </div>
              )}
            </>
          ) : (
            /* Completed Screen */
            <div className="text-center py-8 space-y-5">
              <div className="text-5xl">🏆</div>
              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Petualangan Kuis Selesai!
                </h3>
                <p className="text-sm text-slate-300">
                  Kamu berhasil menjawab dengan benar{' '}
                  <strong className="text-cyan-400 font-mono text-base">{score}</strong> dari{' '}
                  <strong className="font-mono text-base">{GENERAL_QUIZ.length}</strong> pertanyaan!
                </p>
              </div>

              {score === GENERAL_QUIZ.length ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-700/60 text-emerald-200 text-xs md:text-sm max-w-md mx-auto">
                  🌟 Luar Biasa! Nilai sempurna! Kamu telah membuka lencana <strong>&ldquo;Kapten Bintang&rdquo;</strong>!
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-300 text-xs md:text-sm max-w-md mx-auto">
                  Usaha yang sangat bagus! Kamu sudah menjadi calon astronot yang cerdas. Ingin coba lagi untuk meraih nilai 100%?
                </div>
              )}

              <button
                onClick={handleRestart}
                className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs md:text-sm cursor-pointer transition-all shadow inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>
            </div>
          )}
        </div>

        {/* Space Badges Showcase (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Koleksi Lencana Kosmos</span>
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              {unlockedBadgeIds.length} / {SPACE_BADGES.length}
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Jelajahi fitur di web ini untuk membuka semua lencana antariksamu:
          </p>

          <div className="space-y-2.5">
            {SPACE_BADGES.map((badge) => {
              const isUnlocked = unlockedBadgeIds.includes(badge.unlockedBy);

              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-cyan-950/30 border-cyan-500/40 shadow-sm'
                      : 'bg-slate-800/20 border-slate-800/80 opacity-60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      isUnlocked
                        ? 'bg-cyan-500/20 border border-cyan-400/30'
                        : 'bg-slate-800 border border-slate-700 grayscale'
                    }`}
                  >
                    {badge.icon}
                  </div>

                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{badge.name}</span>
                      {isUnlocked && (
                        <span className="text-[10px] text-emerald-400 font-semibold">
                          ✓ Terbuka
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      {badge.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
            <span>Tips: Coba dengarkan suara cerita planet dan coba timbangan antariksa!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
