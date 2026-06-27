import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useGameStore } from '../hooks/useGameStore';
import { PageWrapper } from '../components/PageWrapper';
import { ChrysCharacter } from '../components/ChrysCharacter';
import { AlyseCharacter, AlyseMood } from '../components/AlyseCharacter';
import { ProgressBar } from '../components/ProgressBar';
import { PracticeSession } from '../components/PracticeSession';
import { REAL_WORLD_QUESTIONS } from '../lib/gameData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Dumbbell } from 'lucide-react';

const TOTAL_SLIDES = 2;

function SpeechBubble({ children, pose = 'teaching' }: { children: React.ReactNode; pose?: AlyseMood }) {
  return (
    <div className="flex items-start gap-3 bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-pink-200 p-4 shadow-md">
      <AlyseCharacter mood={pose} size="sm" bounce={false} className="shrink-0 -mt-2" />
      <p className="font-bold text-gray-800 text-base md:text-lg leading-snug pt-1">{children}</p>
    </div>
  );
}

function SlideIndicator({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-7 bg-pink-500' : 'w-2 bg-pink-200'}`} />
      ))}
    </div>
  );
}

function NextButton({ onNext, isLast, label }: { onNext: () => void; isLast: boolean; label?: string }) {
  return (
    <button
      onClick={onNext}
      data-testid="button-next"
      className="w-full px-8 py-4 rounded-[2rem] font-display font-black text-xl bg-pink-500 text-white shadow-[0_6px_0_0_#9d174d] hover:bg-pink-400 hover:translate-y-1 hover:shadow-[0_3px_0_0_#9d174d] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-2"
    >
      {label ?? (isLast
        ? <><Dumbbell size={20} strokeWidth={3} /> Let's Practice!</>
        : <>Next → <ArrowRight size={20} strokeWidth={3} /></>
      )}
    </button>
  );
}

/* ─── Slide 1 (g5): Real World intro ─── */
function Slide_g5({ onNext, isLast }: { onNext: () => void; isLast: boolean }) {
  const activities = [
    { icon: '🌴', text: 'Chrys walks through the jungle counting bananas on trees' },
    { icon: '🎒', text: 'He counts how many bags the students have' },
    { icon: '🏖️', text: 'At the beach, he counts sharks and coconuts!' },
  ];
  return (
    <div className="space-y-5 text-center">
      <SpeechBubble pose="excited">
        Now, after learning numbers and + and −, we will apply our knowledge in <strong>real life!</strong>
      </SpeechBubble>

      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl border-2 border-pink-200 p-5 space-y-3">
        {activities.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-pink-100"
          >
            <span className="text-3xl">{item.icon}</span>
            <p className="font-bold text-gray-700 text-sm text-left">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <NextButton onNext={onNext} isLast={isLast} />
    </div>
  );
}

/* ─── Slide 2 (y5): Example problem 4+3=7 ─── */
function Slide_y5({ onNext, isLast }: { onNext: () => void; isLast: boolean }) {
  const [step, setStep] = useState(0);
  const storyItems = [
    { n: 1, bg: 'bg-pink-100', text: 'Chrys had 4 bananas 🍌🍌🍌🍌' },
    { n: 2, bg: 'bg-green-100', text: 'She found 3 more bananas 🍌🍌🍌' },
    { n: 3, bg: 'bg-yellow-100', text: '4 + 3 = ?' },
  ];

  return (
    <div className="space-y-4 text-center">
      <SpeechBubble>
        {step === 0 && "Chris sees 10 bags filled with bananas. Each bag has a different number!"}
        {step === 1 && "Read the story step by step, then solve the maths!"}
        {step === 2 && "You're ready! Let's solve real-life puzzles with Chrys! 🎉"}
      </SpeechBubble>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-100 p-4 space-y-3">
        {step === 0 && (
          <div className="space-y-3">
            <p className="font-black text-gray-800">Example:</p>
            {storyItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`${item.bg} rounded-2xl p-3 flex items-center gap-3 border border-white`}
              >
                <span className="bg-blue-500 text-white font-black text-sm rounded-full w-7 h-7 flex items-center justify-center shrink-0">{item.n}</span>
                <span className="font-bold text-gray-700 text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {[...Array(4)].map((_, i) => <span key={i} className="text-2xl">🍌</span>)}
              <span className="text-3xl font-black text-green-500">+</span>
              {[...Array(3)].map((_, i) => <span key={i} className="text-2xl">🍌</span>)}
              <span className="text-3xl font-black text-gray-300">=</span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                className="text-4xl font-black text-green-600"
              >7!</motion.span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white rounded-2xl border-2 border-gray-100 px-5 py-3 shadow-md text-4xl font-display font-black">
              <span className="text-primary">4</span>
              <span className="text-green-500">+</span>
              <span className="text-primary">3</span>
              <span className="text-gray-300">=</span>
              <span className="text-green-600">7</span>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-2">
            <p className="text-5xl">🌴🐒🍌</p>
            <p className="font-bold text-gray-700">Read the story, use the ten-frame, find the answer!</p>
          </motion.div>
        )}
      </div>

      {step < 2 ? (
        <button
          onClick={() => setStep(s => s + 1)}
          data-testid="button-story-next"
          className="w-full px-8 py-4 rounded-[2rem] font-display font-black text-xl bg-blue-500 text-white shadow-[0_5px_0_0_#1e3a8a] hover:bg-blue-400 hover:translate-y-1 active:translate-y-2 transition-all"
        >
          {step === 0 ? "Let's solve it! →" : "I'm ready! →"}
        </button>
      ) : (
        <NextButton onNext={onNext} isLast={isLast} />
      )}
    </div>
  );
}

/* ─── Main Component ─── */
export default function LearnRealWorld() {
  const [, setLocation] = useLocation();
  const { currentPlayer, updateProgress } = useGameStore();
  const [slideIndex, setSlideIndex] = useState(0);
  const [mode, setMode] = useState<'lesson' | 'practice'>('lesson');

  useEffect(() => {
    if (!currentPlayer) setLocation('/');
  }, [currentPlayer, setLocation]);

  if (!currentPlayer) return null;

  const isLast = slideIndex === TOTAL_SLIDES - 1;

  const handleNext = () => {
    if (!isLast) {
      setSlideIndex(s => s + 1);
    } else {
      setMode('practice');
    }
  };

  const handlePracticeFinish = () => {
    updateProgress('realworld', {
      completed: true,
      stars: 3,
      lessonsCompleted: [0, 1],
    });
    setLocation('/celebrate?stars=3&next=/learn');
  };

  const progress = mode === 'practice' ? 100 : ((slideIndex + 1) / TOTAL_SLIDES) * 100;

  const slides = [
    <Slide_g5 key={0} onNext={handleNext} isLast={isLast} />,
    <Slide_y5 key={1} onNext={handleNext} isLast={isLast} />,
  ];

  return (
    <PageWrapper backTo="/learn" title="Real World Math" stars={currentPlayer.starsTotal}>
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
                className="bg-white/80 backdrop-blur-md rounded-[2rem] border-2 border-pink-200 p-5 md:p-6 shadow-xl"
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
              questions={REAL_WORLD_QUESTIONS}
              onFinish={handlePracticeFinish}
              accentColor="pink"
              title="Real World Practice"
            />
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
}
