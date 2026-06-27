import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useGameStore } from '../hooks/useGameStore';
import { PageWrapper } from '../components/PageWrapper';
import { ChrysCharacter } from '../components/ChrysCharacter';
import { AlyseCharacter, AlyseMood } from '../components/AlyseCharacter';
import { BananaCounter } from '../components/BananaCounter';
import { ProgressBar } from '../components/ProgressBar';
import { PracticeSession } from '../components/PracticeSession';
import { OPERATIONS_QUESTIONS } from '../lib/gameData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Dumbbell } from 'lucide-react';

const TOTAL_SLIDES = 7;

function SpeechBubble({ children, pose = 'teaching' }: { children: React.ReactNode; pose?: AlyseMood }) {
  return (
    <div className="flex items-start gap-3 bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-orange-200 p-4 shadow-md">
      <AlyseCharacter mood={pose} size="sm" bounce={false} className="shrink-0 -mt-2" />
      <p className="font-bold text-gray-800 text-base md:text-lg leading-snug pt-1">{children}</p>
    </div>
  );
}

function SlideIndicator({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex justify-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-orange-500' : 'w-2 bg-orange-200'}`} />
      ))}
    </div>
  );
}

function NextButton({ onNext, isLast, label }: { onNext: () => void; isLast: boolean; label?: string }) {
  return (
    <button
      onClick={onNext}
      data-testid="button-next"
      className="w-full px-8 py-4 rounded-[2rem] font-display font-black text-xl bg-orange-500 text-white shadow-[0_6px_0_0_#c2410c] hover:bg-orange-400 hover:translate-y-1 hover:shadow-[0_3px_0_0_#c2410c] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-2"
    >
      {label ?? (isLast
        ? <><Dumbbell size={20} strokeWidth={3} /> Let's Practice!</>
        : <>Next → <ArrowRight size={20} strokeWidth={3} /></>
      )}
    </button>
  );
}

function EmojiRow({ emojis, delay = 0 }: { emojis: string[]; delay?: number }) {
  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {emojis.map((e, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + i * 0.06, type: 'spring' }}
          className="text-3xl"
        >{e}</motion.span>
      ))}
    </div>
  );
}

function EquationDisplay({ lhs, op, rhs, result }: { lhs: number; op: string; rhs: number; result: number }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center justify-center gap-3 bg-white rounded-2xl border-2 border-gray-100 px-5 py-3 shadow-md text-4xl font-display font-black"
    >
      <span className="text-primary">{lhs}</span>
      <span className={op === '+' ? 'text-green-500' : 'text-red-500'}>{op}</span>
      <span className="text-primary">{rhs}</span>
      <span className="text-gray-300">=</span>
      <span className="text-green-600">{result}</span>
    </motion.div>
  );
}

/* ─── Slide 1 (c5): Chrys collects bananas 2+3=5 ─── */
function Slide_c5({ onNext, isLast }: { onNext: () => void; isLast: boolean }) {
  const [step, setStep] = useState(0);
  const texts = [
    'Chrys the monkey is collecting bananas! She first finds 2 bananas.',
    'Then Chrys finds 3 more bananas!',
    'How many bananas does Chrys have now? Count them ALL together!',
  ];
  return (
    <div className="space-y-4 text-center">
      <SpeechBubble pose="excited">{texts[step]}</SpeechBubble>
      <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 space-y-4">
        <div>
          <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-2">First group (2)</p>
          <EmojiRow emojis={['🍌','🍌']} />
        </div>
        {step >= 1 && (
          <div>
            <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-2">Plus 3 more</p>
            <EmojiRow emojis={['🍌','🍌','🍌']} delay={0.1} />
          </div>
        )}
        {step >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="text-xs font-black text-amber-700 uppercase tracking-widest">All together</p>
            <BananaCounter count={5} size="md" />
            <EquationDisplay lhs={2} op="+" rhs={3} result={5} />
          </motion.div>
        )}
      </div>
      {step < 2 ? (
        <button
          onClick={() => setStep(s => s + 1)}
          data-testid="button-story-next"
          className="w-full px-8 py-4 rounded-[2rem] font-display font-black text-xl bg-green-500 text-white shadow-[0_5px_0_0_#166534] hover:bg-green-400 hover:translate-y-1 active:translate-y-2 transition-all"
        >
          {step === 0 ? 'Then what? →' : 'Count them! →'}
        </button>
      ) : (
        <NextButton onNext={onNext} isLast={isLast} />
      )}
    </div>
  );
}

/* ─── Slide 2 (u5): Addition concept ─── */
function Slide_u5({ onNext, isLast }: { onNext: () => void; isLast: boolean }) {
  return (
    <div className="space-y-4 text-center">
      <SpeechBubble pose="excited">
        <strong>Addition means the number becomes BIGGER!</strong> We count all the objects together to find the answer!
      </SpeechBubble>
      <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-5 space-y-4">
        <p className="font-black text-lg text-green-700">Example 1</p>
        <p className="font-bold text-gray-700 text-sm">Chrys has 1 banana. Her friend gives her 2 more bananas.</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            { emojis: ['🍌'], label: 'Chrys has 1', delay: 0 },
            { emojis: ['🍌','🍌'], label: 'Friend gives 2', delay: 0.2 },
            { emojis: ['🍌','🍌','🍌'], label: '3 bananas! 🎉', delay: 0.4 },
          ].map(({ emojis, label, delay }, i) => (
            <React.Fragment key={i}>
              {i === 1 && <span className="text-3xl font-black text-green-500">+</span>}
              {i === 2 && <span className="text-3xl font-black text-gray-300">=</span>}
              <div className="flex flex-col items-center gap-1">
                <EmojiRow emojis={emojis} delay={delay} />
                <span className={`text-xs font-bold ${i === 2 ? 'text-green-600' : 'text-gray-400'}`}>{label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <EquationDisplay lhs={1} op="+" rhs={2} result={3} />
        <p className="text-sm font-bold text-green-700">Chrys now has 3 bananas! 🎉</p>
      </div>
      <NextButton onNext={onNext} isLast={isLast} />
    </div>
  );
}

/* ─── Slide 3 (f5): Books on table 4+1=5 ─── */
function Slide_f5({ onNext, isLast }: { onNext: () => void; isLast: boolean }) {
  const [step, setStep] = useState(0);
  return (
    <div className="space-y-4 text-center">
      <SpeechBubble>Let's try another one! Chrys has 4 bananas in a basket. She finds 1 more banana!</SpeechBubble>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 space-y-3">
        <p className="font-black text-lg text-blue-700">Example 2</p>
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">Chrys has 4 bananas in a basket:</p>
          <EmojiRow emojis={['🍌','🍌','🍌','🍌']} />
        </div>
        {step >= 1 && (
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">She finds 1 more banana:</p>
            <EmojiRow emojis={['🍌']} delay={0.1} />
          </div>
        )}
        {step >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <p className="text-sm font-bold text-gray-700">Count all the bananas together:</p>
            <EmojiRow emojis={['🍌','🍌','🍌','🍌','🍌']} delay={0.12} />
            <EquationDisplay lhs={4} op="+" rhs={1} result={5} />
            <p className="text-sm font-bold text-blue-700">Chrys now has <strong>5</strong> bananas! 🍌</p>
          </motion.div>
        )}
      </div>
      {step < 2 ? (
        <button
          onClick={() => setStep(s => s + 1)}
          data-testid="button-story-next"
          className="w-full px-8 py-4 rounded-[2rem] font-display font-black text-xl bg-blue-500 text-white shadow-[0_5px_0_0_#1d4ed8] hover:bg-blue-400 hover:translate-y-1 active:translate-y-2 transition-all"
        >
          {step === 0 ? 'She finds one more →' : 'Count them! →'}
        </button>
      ) : (
        <NextButton onNext={onNext} isLast={isLast} />
      )}
    </div>
  );
}

/* ─── Slide 4 (d5): Number line 6+3=9 ─── */
function Slide_d5({ onNext, isLast }: { onNext: () => void; isLast: boolean }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="space-y-4 text-center">
      <SpeechBubble>
        You can also hop along a <strong>Number Line</strong> to add! Watch Chrys jump forward!
      </SpeechBubble>
      <div className="bg-white/80 rounded-3xl border-2 border-gray-200 p-4 shadow-md space-y-4">
        <p className="font-black text-gray-800">6 + 3 = ?</p>
        {revealed ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="flex items-end gap-1 justify-center overflow-x-auto py-2">
              {Array.from({ length: 10 }, (_, n) => (
                <div key={n} className="flex flex-col items-center gap-1 shrink-0">
                  {n === 6 && <span className="text-lg">🐒</span>}
                  {n > 6 && n <= 9 && <span className="text-lg">→</span>}
                  {n === 9 && <span className="text-lg">🎯</span>}
                  {n < 6 || n > 9 ? <span className="w-1 h-1" /> : null}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm border-2
                      ${n === 6 ? 'bg-blue-400 border-blue-500 text-white' :
                        n >= 7 && n <= 9 ? 'bg-green-400 border-green-500 text-white' :
                        'bg-gray-100 border-gray-200 text-gray-600'}`}
                  >{n}</div>
                </div>
              ))}
            </div>
            <p className="text-green-600 font-black text-lg">6 + 3 = 9 ✅</p>
          </motion.div>
        ) : (
          <button
            onClick={() => setRevealed(true)}
            data-testid="button-reveal-numberline"
            className="px-6 py-3 rounded-2xl border-2 border-gray-300 font-bold text-gray-700 hover:bg-gray-50 transition-all"
          >
            Watch Chrys jump! 🐒
          </button>
        )}
      </div>
      <NextButton onNext={onNext} isLast={isLast} />
    </div>
  );
}

/* ─── Slide 5 (h5): Subtraction intro 5-2=3 ─── */
function Slide_h5({ onNext, isLast }: { onNext: () => void; isLast: boolean }) {
  const [step, setStep] = useState(0);
  const poses: AlyseMood[] = ['teaching', 'thinking', 'thinking'];
  const texts = [
    'Chrys has 5 bananas. 🍌🍌🍌🍌🍌',
    'Chrys eats 2 bananas. Now some bananas are gone!',
    'Count what\'s LEFT! Subtraction means the number becomes SMALLER!',
  ];
  return (
    <div className="space-y-4 text-center">
      <SpeechBubble pose={poses[step]}>{texts[step]}</SpeechBubble>
      <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-5 space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-3xl transition-all ${step >= 1 && i >= 3 ? 'opacity-25 line-through' : ''}`}>🍌</span>
          ))}
        </div>
        {step >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <EquationDisplay lhs={5} op="−" rhs={2} result={3} />
            <p className="text-sm font-bold text-red-700">Chrys has <strong>3</strong> bananas left!</p>
          </motion.div>
        )}
      </div>
      {step < 2 ? (
        <button
          onClick={() => setStep(s => s + 1)}
          data-testid="button-story-next"
          className="w-full px-8 py-4 rounded-[2rem] font-display font-black text-xl bg-red-400 text-white shadow-[0_5px_0_0_#991b1b] hover:bg-red-300 hover:translate-y-1 active:translate-y-2 transition-all"
        >
          {step === 0 ? 'She eats 2 →' : 'Count what\'s left! →'}
        </button>
      ) : (
        <NextButton onNext={onNext} isLast={isLast} />
      )}
    </div>
  );
}

/* ─── Slide 6 (m5): Balloons 6-2=4 ─── */
function Slide_m5({ onNext, isLast }: { onNext: () => void; isLast: boolean }) {
  return (
    <div className="space-y-4 text-center">
      <SpeechBubble pose="thinking">
        <strong>Subtraction means the number becomes SMALLER.</strong> We count what is LEFT to find the answer!
      </SpeechBubble>
      <div className="bg-orange-50 border-2 border-orange-200 rounded-3xl p-5 space-y-4">
        <p className="font-black text-lg text-orange-700">Example 1</p>
        <p className="text-sm font-bold text-gray-700">Chrys has 6 bananas. She eats 2 of them!</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            { emojis: ['🍌','🍌','🍌','🍌','🍌','🍌'], label: 'Start with 6' },
            { emojis: ['🍌','🍌'], label: '2 eaten' },
            { emojis: ['🍌','🍌','🍌','🍌'], label: '4 left!' },
          ].map(({ emojis, label }, i) => (
            <React.Fragment key={i}>
              {i === 1 && <span className="text-3xl font-black text-red-500">−</span>}
              {i === 2 && <span className="text-3xl font-black text-gray-300">=</span>}
              <div className="flex flex-col items-center gap-1">
                <EmojiRow emojis={emojis} delay={i * 0.15} />
                <span className={`text-xs font-bold ${i === 2 ? 'text-red-600' : 'text-gray-400'}`}>{label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <EquationDisplay lhs={6} op="−" rhs={2} result={4} />
        <p className="text-sm font-bold text-orange-700">Chrys has <strong>4</strong> bananas left! 🍌</p>
      </div>
      <NextButton onNext={onNext} isLast={isLast} />
    </div>
  );
}

/* ─── Slide 7 (p5): Oranges 7-3=4 ─── */
function Slide_p5({ onNext, isLast }: { onNext: () => void; isLast: boolean }) {
  const [step, setStep] = useState(0);
  return (
    <div className="space-y-4 text-center">
      <SpeechBubble pose="thinking">Chrys has 7 bananas. He gives 3 bananas to his friends. Count the bananas left!</SpeechBubble>
      <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 space-y-3">
        <p className="font-black text-lg text-amber-700">Example 2</p>
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">Chrys has 7 bananas:</p>
          <EmojiRow emojis={['🍌','🍌','🍌','🍌','🍌','🍌','🍌']} />
        </div>
        {step >= 1 && (
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">He gives away 3:</p>
            <EmojiRow emojis={['🍌','🍌','🍌']} delay={0.1} />
          </div>
        )}
        {step >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <p className="text-sm font-bold text-gray-700">Count what's left:</p>
            <EmojiRow emojis={['🍌','🍌','🍌','🍌']} delay={0.12} />
            <EquationDisplay lhs={7} op="−" rhs={3} result={4} />
            <p className="text-sm font-bold text-amber-700">Chrys has <strong>4</strong> bananas left! 🍌</p>
          </motion.div>
        )}
      </div>
      {step < 2 ? (
        <button
          onClick={() => setStep(s => s + 1)}
          data-testid="button-story-next"
          className="w-full px-8 py-4 rounded-[2rem] font-display font-black text-xl bg-amber-500 text-white shadow-[0_5px_0_0_#92400e] hover:bg-amber-400 hover:translate-y-1 active:translate-y-2 transition-all"
        >
          {step === 0 ? 'He gives 3 away →' : 'Count what\'s left! →'}
        </button>
      ) : (
        <NextButton onNext={onNext} isLast={isLast} />
      )}
    </div>
  );
}

/* ─── Main Component ─── */
export default function LearnOperations() {
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
    updateProgress('operations', {
      completed: true,
      stars: 3,
      lessonsCompleted: [0, 1, 2, 3, 4, 5, 6],
    });
    setLocation('/celebrate?stars=3&next=/learn');
  };

  const progress = mode === 'practice' ? 100 : ((slideIndex + 1) / TOTAL_SLIDES) * 100;

  const slides = [
    <Slide_c5 key={0} onNext={handleNext} isLast={isLast} />,
    <Slide_u5 key={1} onNext={handleNext} isLast={isLast} />,
    <Slide_f5 key={2} onNext={handleNext} isLast={isLast} />,
    <Slide_d5 key={3} onNext={handleNext} isLast={isLast} />,
    <Slide_h5 key={4} onNext={handleNext} isLast={isLast} />,
    <Slide_m5 key={5} onNext={handleNext} isLast={isLast} />,
    <Slide_p5 key={6} onNext={handleNext} isLast={isLast} />,
  ];

  return (
    <PageWrapper backTo="/learn" title="Operations" stars={currentPlayer.starsTotal}>
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
                className="bg-white/80 backdrop-blur-md rounded-[2rem] border-2 border-orange-200 p-5 md:p-6 shadow-xl"
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
              questions={OPERATIONS_QUESTIONS}
              onFinish={handlePracticeFinish}
              accentColor="green"
              title="Operations Practice"
            />
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
}
