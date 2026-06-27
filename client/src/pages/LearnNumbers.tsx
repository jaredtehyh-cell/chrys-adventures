import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useGameStore } from '../hooks/useGameStore';
import { PageWrapper } from '../components/PageWrapper';
import { ChrysCharacter } from '../components/ChrysCharacter';
import { AlyseCharacter, AlyseMood } from '../components/AlyseCharacter';
import { BananaCounter } from '../components/BananaCounter';
import { ProgressBar } from '../components/ProgressBar';
import { PracticeSession } from '../components/PracticeSession';
import { NUMBER_NAMES, NUMBERS_QUESTIONS } from '../lib/gameData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Dumbbell } from 'lucide-react';

const TOTAL_SLIDES = 4;

function SpeechBubble({ children, pose = 'teaching' }: { children: React.ReactNode; pose?: AlyseMood }) {
  return (
    <div className="flex items-start gap-3 bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-yellow-200 p-4 shadow-md">
      <AlyseCharacter mood={pose} size="sm" bounce={false} className="shrink-0 -mt-2" />
      <p className="font-bold text-gray-800 text-base md:text-lg leading-snug pt-1">{children}</p>
    </div>
  );
}

function SlideIndicator({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-7 bg-yellow-500' : 'w-2 bg-yellow-200'}`}
        />
      ))}
    </div>
  );
}

interface NavButtonsProps {
  onNext: () => void;
  onPrev: () => void;
  canGoBack: boolean;
  isLast: boolean;
  label?: string;
}

function NavButtons({ onNext, onPrev, canGoBack, isLast, label }: NavButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {canGoBack && (
        <button
          onClick={onPrev}
          data-testid="button-prev"
          className="px-6 py-4 rounded-[2rem] font-display font-black text-xl bg-white border-2 border-yellow-300 text-yellow-700 shadow-[0_4px_0_0_#d97706] hover:bg-yellow-50 hover:translate-y-1 hover:shadow-[0_2px_0_0_#d97706] active:translate-y-2 active:shadow-none transition-all flex items-center gap-2"
        >
          <ArrowLeft size={20} strokeWidth={3} />
          Previous
        </button>
      )}
      <button
        onClick={onNext}
        data-testid="button-next"
        className="px-10 py-4 rounded-[2rem] font-display font-black text-xl bg-yellow-400 text-yellow-900 shadow-[0_6px_0_0_#b45309] hover:bg-yellow-300 hover:translate-y-1 hover:shadow-[0_3px_0_0_#b45309] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-2"
      >
        {label ?? (isLast ? (
          <><Dumbbell size={20} strokeWidth={3} /> Let's Practice!</>
        ) : (
          <>Next <ArrowRight size={20} strokeWidth={3} /></>
        ))}
      </button>
    </div>
  );
}

/* ─── Slide 0: Zero Concept ─── */
function Slide0({ onNext, canGoBack, onPrev, isLast }: { onNext: () => void; onPrev: () => void; canGoBack: boolean; isLast: boolean }) {
  const [step, setStep] = useState(0);

  return (
    <div className="space-y-5 text-center">
      <SpeechBubble pose="excited">
        {step === 0 && <>Before we count, let's learn a very special number — <strong>ZERO [<span style={{ letterSpacing: '0.15em' }}>ZERO</span>]</strong>!</>}
        {step === 1 && <>Zero means <strong>NOTHING</strong> — not even one! If Chrys has no bananas at all, that is <strong>ZERO</strong>!</>}
        {step === 2 && <>Zero is written as <strong>0</strong>. It looks like an egg — perfectly round, because it holds nothing inside! 🥚</>}
      </SpeechBubble>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="zero-intro"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl px-10 py-5 shadow-xl border-4 border-gray-300/40 inline-block">
              <span className="text-8xl leading-none drop-shadow-md block" style={{ fontFamily: 'var(--app-font-number)', color: '#9ca3af' }}>0</span>
              <p className="text-2xl font-black text-gray-400 capitalize mt-1">Zero</p>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="zero-empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-5 space-y-3"
          >
            <p className="font-black text-amber-700 text-sm uppercase tracking-widest">Chrys's basket</p>
            <div className="text-6xl">🧺</div>
            <p className="text-3xl text-gray-400 font-black">← empty! Nothing inside</p>
            <div className="flex items-center justify-center gap-3 bg-white rounded-2xl border-2 border-gray-100 px-5 py-3 shadow-md">
              <span className="text-5xl" style={{ fontFamily: 'var(--app-font-number)', color: '#9ca3af' }}>0</span>
              <span className="text-2xl font-black text-gray-300">=</span>
              <span className="text-xl font-black text-gray-400">no bananas</span>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="zero-compare"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-4 justify-center"
          >
            {[
              { n: 0, label: 'Zero — empty!', bg: 'from-gray-100 to-gray-200', color: '#9ca3af', border: 'border-gray-300' },
              { n: 1, label: 'One — something!', bg: 'from-yellow-200 to-orange-300', color: 'white', border: 'border-yellow-400' },
            ].map(({ n, label, bg, color, border }) => (
              <motion.div
                key={n}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: n * 0.2 }}
                className="flex-1 bg-white rounded-3xl border-4 border-yellow-200 p-4 flex flex-col items-center gap-2 shadow-lg"
              >
                <div className={`bg-gradient-to-br ${bg} rounded-2xl w-16 h-16 flex items-center justify-center border-2 ${border}`}>
                  <span className="text-4xl leading-none" style={{ fontFamily: 'var(--app-font-number)', color }}>{n}</span>
                </div>
                <p className="text-xs font-black text-gray-500">{label}</p>
                {n === 0
                  ? <span className="text-2xl">🫙</span>
                  : <span className="text-2xl">🍌</span>
                }
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {step < 2 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            {(canGoBack || step > 0) && (
              <button
                onClick={() => step > 0 ? setStep(s => s - 1) : onPrev()}
                data-testid="button-prev"
                className="px-6 py-4 rounded-[2rem] font-display font-black text-xl bg-white border-2 border-yellow-300 text-yellow-700 shadow-[0_4px_0_0_#d97706] hover:bg-yellow-50 hover:translate-y-1 active:translate-y-2 transition-all flex items-center gap-2"
              >
                <ArrowLeft size={20} strokeWidth={3} />
                Previous
              </button>
            )}
            <button
              onClick={() => setStep(s => s + 1)}
              data-testid="button-story-next"
              className="px-10 py-4 rounded-[2rem] font-display font-black text-xl bg-yellow-400 text-yellow-900 shadow-[0_6px_0_0_#b45309] hover:bg-yellow-300 hover:translate-y-1 active:translate-y-2 transition-all flex items-center gap-2"
            >
              {step === 0 ? 'Show me! →' : 'Compare! →'}
            </button>
          </div>
          <div className="text-center">
            <button
              onClick={onNext}
              data-testid="button-skip"
              className="text-sm font-bold text-gray-400 hover:text-gray-600 hover:underline underline-offset-2 transition-all"
            >
              Skip this intro →
            </button>
          </div>
        </div>
      ) : (
        <NavButtons onNext={onNext} onPrev={() => setStep(s => s - 1)} canGoBack={true} isLast={isLast} />
      )}
    </div>
  );
}

/* ─── Slide 1: Auto-counting 1→5 ─── */
function Slide1({ onNext, onPrev, canGoBack, isLast }: { onNext: () => void; onPrev: () => void; canGoBack: boolean; isLast: boolean }) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (count >= 5) return;
    const t = setTimeout(() => setCount(c => c + 1), 1800);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="space-y-5 text-center">
      <SpeechBubble pose="excited">
        Here {count === 1 ? 'is' : 'are'} <strong>{count} [<span style={{ letterSpacing: '0.15em' }}>{NUMBER_NAMES[count]?.toUpperCase()}</span>]</strong> {count === 1 ? 'banana' : 'bananas'}! This is called <strong>{count} [<span style={{ letterSpacing: '0.15em' }}>{NUMBER_NAMES[count]?.toUpperCase()}</span>]</strong>.
      </SpeechBubble>

      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl px-10 py-5 shadow-xl border-4 border-yellow-500/30 inline-block"
        >
          <span className="text-8xl leading-none drop-shadow-md block" style={{ fontFamily: 'var(--app-font-number)', color: 'white' }}>{count}</span>
          <p className="text-2xl font-black text-white/90 capitalize mt-1">{NUMBER_NAMES[count]}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center">
        <BananaCounter count={count} size="md" />
      </div>
      <p className="text-sm font-bold text-gray-500">{count < 5 ? 'Counting up…' : 'Counted to 5! 🎉'}</p>
      <NavButtons onNext={onNext} onPrev={onPrev} canGoBack={canGoBack} isLast={isLast} />
      {count < 5 && (
        <div className="text-center">
          <button
            onClick={onNext}
            data-testid="button-skip"
            className="text-sm font-bold text-gray-400 hover:text-gray-600 hover:underline underline-offset-2 transition-all"
          >
            Skip counting →
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Slide 2: Number grid 0–9 ─── */
function Slide2({ onNext, onPrev, canGoBack, isLast }: { onNext: () => void; onPrev: () => void; canGoBack: boolean; isLast: boolean }) {
  return (
    <div className="space-y-4 text-center">
      <SpeechBubble>
        Numbers go all the way from <strong>0 to 9</strong>! Each number has a special word name!
      </SpeechBubble>

      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }, (_, n) => (
          <motion.div
            key={n}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: n * 0.06, type: 'spring' }}
            className="bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-2xl p-2 pb-3 flex flex-col items-center shadow-md gap-0.5"
          >
            <span className="text-3xl text-yellow-600 leading-none" style={{ fontFamily: 'var(--app-font-number)' }}>{n}</span>
            <span className="text-xs font-semibold text-gray-500 capitalize leading-tight">{NUMBER_NAMES[n]}</span>
            <div className="flex flex-wrap justify-center gap-0.5 mt-1">
              {n === 0
                ? <span className="text-sm text-gray-400 font-bold">—</span>
                : Array.from({ length: n }, (_, i) => (
                  <span key={i} className="text-xl leading-none">🍌</span>
                ))
              }
            </div>
          </motion.div>
        ))}
      </div>

      <NavButtons onNext={onNext} onPrev={onPrev} canGoBack={canGoBack} isLast={isLast} />
    </div>
  );
}

/* ─── Slide 3: Counting pairs ─── */
function Slide3({ onNext, onPrev, canGoBack, isLast }: { onNext: () => void; onPrev: () => void; canGoBack: boolean; isLast: boolean }) {
  const pairs: [number, number][] = [[1, 2], [3, 4], [5, 6], [7, 8]];
  const [pairIdx, setPairIdx] = useState(0);
  const [a, b] = pairs[Math.min(pairIdx, pairs.length - 1)];
  const isLastPair = pairIdx >= pairs.length - 1;

  const handlePrev = () => {
    if (pairIdx > 0) {
      setPairIdx(p => p - 1);
    } else {
      onPrev();
    }
  };
  const canGoBackHere = pairIdx > 0 || canGoBack;

  return (
    <div className="space-y-5 text-center">
      <SpeechBubble pose="excited">
        Let's count pairs! <strong>{a} and {b}</strong> — two numbers next to each other!
      </SpeechBubble>

      <div className="flex gap-4 justify-center">
        {[a, b].map((num, i) => (
          <motion.div
            key={`${num}-${pairIdx}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            className="bg-white rounded-3xl border-4 border-yellow-200 p-4 flex flex-col items-center gap-2 shadow-lg flex-1"
          >
            <span className="text-5xl text-yellow-500" style={{ fontFamily: 'var(--app-font-number)' }}>{num}</span>
            <span className="text-base font-semibold text-gray-500 capitalize">{NUMBER_NAMES[num]}</span>
            <BananaCounter count={num} size="sm" />
          </motion.div>
        ))}
      </div>

      {!isLastPair ? (
        <div className="flex items-center justify-center gap-3">
          {canGoBackHere && (
            <button
              onClick={handlePrev}
              data-testid="button-prev"
              className="px-6 py-4 rounded-[2rem] font-display font-black text-xl bg-white border-2 border-yellow-300 text-yellow-700 shadow-[0_4px_0_0_#d97706] hover:bg-yellow-50 hover:translate-y-1 active:translate-y-2 active:shadow-none transition-all flex items-center gap-2"
            >
              <ArrowLeft size={20} strokeWidth={3} />
              Previous
            </button>
          )}
          <button
            onClick={() => setPairIdx(p => p + 1)}
            data-testid="button-next-pair"
            className="px-10 py-4 rounded-[2rem] font-display font-black text-xl bg-yellow-400 text-yellow-900 shadow-[0_6px_0_0_#b45309] hover:bg-yellow-300 hover:translate-y-1 active:translate-y-2 active:shadow-none transition-all flex items-center gap-2"
          >
            Next pair <ArrowRight size={20} strokeWidth={3} />
          </button>
        </div>
      ) : (
        <NavButtons onNext={onNext} onPrev={handlePrev} canGoBack={canGoBackHere} isLast={isLast} />
      )}
    </div>
  );
}

/* ─── Main Component ─── */
export default function LearnNumbers() {
  const [, setLocation] = useLocation();
  const { currentPlayer, updateProgress } = useGameStore();
  const [slideIndex, setSlideIndex] = useState(0);
  const [mode, setMode] = useState<'lesson' | 'practice'>('lesson');

  useEffect(() => {
    if (!currentPlayer) setLocation('/');
  }, [currentPlayer, setLocation]);

  if (!currentPlayer) return null;

  const isLast = slideIndex === TOTAL_SLIDES - 1;
  const canGoBack = slideIndex > 0 && mode === 'lesson';

  const handleNext = () => {
    if (!isLast) {
      setSlideIndex(s => s + 1);
    } else {
      setMode('practice');
    }
  };

  const handlePrev = () => {
    if (slideIndex > 0) setSlideIndex(s => s - 1);
  };

  const handlePracticeFinish = () => {
    updateProgress('numbers', { completed: true, stars: 3, lessonsCompleted: [0, 1, 2, 3] });
    setLocation('/celebrate?stars=3&next=/learn');
  };

  const progress = mode === 'practice' ? 100 : ((slideIndex + 1) / TOTAL_SLIDES) * 100;

  const slides = [
    <Slide0 key={0} onNext={handleNext} onPrev={handlePrev} canGoBack={canGoBack} isLast={isLast} />,
    <Slide1 key={1} onNext={handleNext} onPrev={handlePrev} canGoBack={canGoBack} isLast={isLast} />,
    <Slide2 key={2} onNext={handleNext} onPrev={handlePrev} canGoBack={canGoBack} isLast={isLast} />,
    <Slide3 key={3} onNext={handleNext} onPrev={handlePrev} canGoBack={canGoBack} isLast={isLast} />,
  ];

  return (
    <PageWrapper backTo="/learn" title="Numbers" stars={currentPlayer.starsTotal}>
      <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
        {mode === 'lesson' && (
          <>
            <SlideIndicator total={TOTAL_SLIDES} current={slideIndex} />
            <ProgressBar progress={progress} className="w-full" />
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.22 }}
                className="bg-white/80 backdrop-blur-md rounded-[2rem] border-2 border-yellow-200 p-5 md:p-6 shadow-xl"
              >
                {slides[slideIndex]}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {mode === 'practice' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PracticeSession
              questions={NUMBERS_QUESTIONS}
              onFinish={handlePracticeFinish}
              accentColor="yellow"
              title="Numbers Practice"
            />
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
}
