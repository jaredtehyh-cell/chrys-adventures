import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { useGameStore } from '../hooks/useGameStore';
import { PageWrapper } from './PageWrapper';
import { ChrysCharacter } from './ChrysCharacter';
import { CoinBurst } from './CoinBurst';
import type { Question, QuestionVisual } from '../lib/gameData';
import { NUMBER_NAMES } from '../lib/gameData';
import { CheckCircle, Flag, ArrowRight } from 'lucide-react';

interface TestQuestionProps {
  questions: Question[];
  title: string;
  backTo?: string;
  progressKey: 'testNumbers' | 'testOperations' | 'testRealworld' | 'testFinal';
  accentColor: 'sky' | 'orange' | 'emerald' | 'red';
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Coin-style dot array ─── */
function TenFrame({ n }: { n: number }) {
  const rows = Math.ceil(Math.min(n, 20) / 5);
  return (
    <div className="flex flex-col items-center gap-2">
      {Array.from({ length: rows }, (_, row) => (
        <div key={row} className="flex gap-2">
          {Array.from({ length: 5 }, (_, col) => {
            const idx = row * 5 + col;
            const filled = idx < n;
            return (
              <motion.div
                key={col}
                initial={{ scale: 0, rotateY: 90 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ delay: idx * 0.04, type: 'spring', stiffness: 500, damping: 18 }}
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  filled
                    ? 'bg-gradient-to-br from-yellow-300 to-amber-500 border-2 border-yellow-600 shadow-[0_3px_0_#B45309,inset_0_1px_3px_rgba(255,255,200,0.5)]'
                    : 'bg-white/50 border-2 border-white/70'
                }`}
              >
                {filled && (
                  <span className="text-yellow-900 font-black" style={{ fontSize: 13 }}>★</span>
                )}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─── Number line ─── */
function NumberLine({ marked, max }: { marked: number; max: number }) {
  const nums = Array.from({ length: max + 1 }, (_, i) => i);
  return (
    <div className="overflow-x-auto py-1">
      <div className="flex items-end gap-0 min-w-max mx-auto px-2">
        {nums.map((n, i) => (
          <div key={n} className="flex flex-col items-center">
            {n === marked ? (
              <motion.div
                initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 border-2 border-yellow-500 shadow-md flex items-center justify-center mb-1"
              >
                <span className="text-xs font-black text-white">★</span>
              </motion.div>
            ) : (
              <div className="w-7 h-7 mb-1" />
            )}
            <div className={`h-4 w-px ${n === marked ? 'bg-orange-400' : 'bg-gray-300'} ${n === 0 || n === max ? 'h-5' : ''}`} />
            <div className={`h-0.5 ${i < nums.length - 1 ? 'w-9 bg-gray-300' : 'w-0'}`} />
            <span className={`text-xs font-black mt-0.5 ${n === marked ? 'text-orange-600 text-sm' : 'text-gray-400'}`}>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Equation visual ─── */
function EquationVisual({ lhs, op, rhs }: { lhs: number; op: '+' | '−'; rhs: number }) {
  const showDots = lhs <= 10 && rhs <= 10;
  const EMOJI = '🍌';
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
        <span className="text-5xl font-black text-amber-600" style={{ fontFamily: 'var(--app-font-number)' }}>{lhs}</span>
        {showDots && (
          <div className="flex flex-wrap justify-center gap-0.5 max-w-[100px]">
            {Array.from({ length: lhs }, (_, i) => (
              <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }} className="text-xl leading-none">{EMOJI}</motion.span>
            ))}
          </div>
        )}
      </div>
      <span className="text-4xl font-black text-gray-600">{op}</span>
      <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
        <span className="text-5xl font-black text-amber-600" style={{ fontFamily: 'var(--app-font-number)' }}>{rhs}</span>
        {showDots && (
          <div className="flex flex-wrap justify-center gap-0.5 max-w-[100px]">
            {Array.from({ length: rhs }, (_, i) => (
              <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: lhs * 0.05 + i * 0.05 }} className="text-xl leading-none">{EMOJI}</motion.span>
            ))}
          </div>
        )}
      </div>
      <span className="text-4xl font-black text-gray-300">=</span>
      <span className="text-5xl font-black text-gray-200" style={{ fontFamily: 'var(--app-font-number)' }}>?</span>
    </div>
  );
}

/* ─── Missing number visual ─── */
function MissingVisual({ lhs, op, rhs, result }: { lhs: number | null; op: '+' | '−'; rhs: number | null; result: number }) {
  const BOX = (
    <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 border-4 border-dashed border-amber-400 text-3xl font-black text-amber-400" style={{ fontFamily: 'var(--app-font-number)' }}>?</span>
  );
  const NUM = (val: number) => (
    <span className="text-5xl font-black text-amber-600" style={{ fontFamily: 'var(--app-font-number)' }}>{val}</span>
  );
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap py-2">
      {lhs === null ? BOX : NUM(lhs)}
      <span className="text-4xl font-black text-gray-600">{op}</span>
      {rhs === null ? BOX : NUM(rhs)}
      <span className="text-4xl font-black text-gray-400">=</span>
      {NUM(result)}
    </div>
  );
}

/* ─── Split visual ─── */
function SplitVisual({ leftEmoji, leftN, op, rightEmoji, rightN }: { leftEmoji: string; leftN: number; op: '+' | '−'; rightEmoji: string; rightN: number }) {
  const cap = 10;
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <div className="flex flex-col items-center gap-1 bg-amber-50 rounded-2xl px-3 py-2 border border-amber-100">
        <div className="flex flex-wrap justify-center gap-0.5 max-w-[130px]">
          {Array.from({ length: Math.min(leftN, cap) }, (_, i) => (
            <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.04 }} className="text-2xl leading-none">{leftEmoji}</motion.span>
          ))}
        </div>
        <span className="text-2xl font-black text-amber-700" style={{ fontFamily: 'var(--app-font-number)' }}>{leftN}</span>
      </div>
      <span className="text-3xl font-black text-gray-600">{op}</span>
      <div className="flex flex-col items-center gap-1 bg-amber-50 rounded-2xl px-3 py-2 border border-amber-100">
        <div className="flex flex-wrap justify-center gap-0.5 max-w-[130px]">
          {Array.from({ length: Math.min(rightN, cap) }, (_, i) => (
            <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: leftN * 0.04 + i * 0.04 }} className="text-2xl leading-none">{rightEmoji}</motion.span>
          ))}
        </div>
        <span className="text-2xl font-black text-amber-700" style={{ fontFamily: 'var(--app-font-number)' }}>{rightN}</span>
      </div>
      <span className="text-3xl font-black text-gray-300">=</span>
      <span className="text-4xl font-black text-gray-200" style={{ fontFamily: 'var(--app-font-number)' }}>?</span>
    </div>
  );
}

/* ─── Main visual router ─── */
function VisualDisplay({ visual }: { visual: QuestionVisual }) {
  if (visual.kind === 'dot-array') return <div className="flex justify-center py-2"><TenFrame n={visual.n} /></div>;
  if (visual.kind === 'number-line') return <div className="py-2"><NumberLine marked={visual.marked} max={visual.max} /></div>;
  if (visual.kind === 'equation') return <div className="py-2"><EquationVisual lhs={visual.lhs} op={visual.op} rhs={visual.rhs} /></div>;
  if (visual.kind === 'missing') return <div className="py-2"><MissingVisual lhs={visual.lhs} op={visual.op} rhs={visual.rhs} result={visual.result} /></div>;
  if (visual.kind === 'split') return <div className="py-2"><SplitVisual leftEmoji={visual.leftEmoji} leftN={visual.leftN} op={visual.op} rightEmoji={visual.rightEmoji} rightN={visual.rightN} /></div>;

  if (visual.kind === 'count') {
    return (
      <div className="flex flex-wrap justify-center gap-2 py-3 px-2">
        {Array.from({ length: visual.n }, (_, i) => (
          <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 400 }} className="text-3xl leading-none">
            {visual.emoji}
          </motion.span>
        ))}
      </div>
    );
  }

  if (visual.kind === 'sequence') {
    return (
      <div className="flex items-center justify-center gap-2 py-3 flex-wrap">
        {visual.nums.map((n, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-2xl font-black text-orange-400">→</span>}
            <motion.div
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
              className={`min-w-[52px] h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md border-2 px-2 font-black ${
                n === '?' ? 'bg-gray-50 border-dashed border-gray-300 text-gray-300' : 'bg-gradient-to-br from-yellow-100 to-amber-100 border-yellow-300 text-amber-700'
              }`}
              style={{ fontFamily: 'var(--app-font-number)' }}
            >
              {n}
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (visual.kind === 'number') {
    const isZero = visual.value === 0;
    return (
      <div className="flex justify-center py-3">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300 }}
          className={`w-28 h-28 rounded-[2rem] flex flex-col items-center justify-center shadow-xl border-4 ${isZero ? 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300' : 'bg-gradient-to-br from-yellow-300 to-amber-400 border-yellow-500'}`}
          style={{ boxShadow: isZero ? '0 8px 0 #9ca3af' : '0 8px 0 #B45309, 0 10px 20px rgba(0,0,0,0.12)' }}
        >
          <span className="text-6xl leading-none font-black" style={{ fontFamily: 'var(--app-font-number)', color: isZero ? '#9ca3af' : 'white' }}>{visual.value}</span>
          <span className={`text-sm font-black capitalize mt-0.5 ${isZero ? 'text-gray-400' : 'text-yellow-100'}`}>{NUMBER_NAMES[visual.value]}</span>
        </motion.div>
      </div>
    );
  }

  return null;
}

/* ─── Accent configs ─── */
const ACCENT = {
  sky:     { border: 'border-sky-400',     topBar: 'from-sky-400 to-blue-500',     shadow: '#0369a1',  pill: 'bg-sky-100 text-sky-800 border-sky-300',     btn: 'bg-sky-500 text-white border-sky-600 shadow-[0_6px_0_#0369a1]',     optBase: 'border-sky-300 hover:bg-sky-50 hover:border-sky-400'     },
  orange:  { border: 'border-orange-400',  topBar: 'from-orange-400 to-amber-500',  shadow: '#c2410c',  pill: 'bg-orange-100 text-orange-800 border-orange-300',  btn: 'bg-orange-500 text-white border-orange-600 shadow-[0_6px_0_#c2410c]',  optBase: 'border-orange-300 hover:bg-orange-50 hover:border-orange-400'  },
  emerald: { border: 'border-emerald-400', topBar: 'from-emerald-400 to-green-500', shadow: '#065f46',  pill: 'bg-emerald-100 text-emerald-800 border-emerald-300', btn: 'bg-emerald-500 text-white border-emerald-600 shadow-[0_6px_0_#065f46]', optBase: 'border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400' },
  red:     { border: 'border-red-400',     topBar: 'from-red-400 to-rose-500',      shadow: '#991b1b',  pill: 'bg-red-100 text-red-800 border-red-300',     btn: 'bg-red-500 text-white border-red-600 shadow-[0_6px_0_#991b1b]',     optBase: 'border-red-300 hover:bg-red-50 hover:border-red-400'     },
};

function getComboInfo(streak: number) {
  if (streak >= 10) return { icon: '🌟', text: 'UNSTOPPABLE!', bg: 'from-yellow-400 to-orange-500' };
  if (streak >= 7)  return { icon: '⚡', text: 'INCREDIBLE!',  bg: 'from-blue-500 to-purple-600' };
  if (streak >= 5)  return { icon: '🔥', text: 'ON FIRE!',     bg: 'from-orange-400 to-red-500' };
  if (streak >= 3)  return { icon: '✨', text: 'HOT STREAK!',  bg: 'from-emerald-400 to-teal-500' };
  return null;
}

/* ─── Checkpoint screen ─── */
function CheckpointScreen({ answered, correct, onKeepGoing, onFinish, accentColor }: {
  answered: number; correct: number; onKeepGoing: () => void; onFinish: () => void; accentColor: keyof typeof ACCENT;
}) {
  const c = ACCENT[accentColor];
  const pct = correct / answered;
  const stars = pct >= 0.8 ? 3 : pct >= 0.6 ? 2 : 1;
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center gap-5 text-center py-4"
    >
      <ChrysCharacter mood={stars === 3 ? 'celebrating' : stars === 2 ? 'excited' : 'happy'} size="lg" bounce />
      <div className="bg-white rounded-[2rem] border-4 border-yellow-300 p-6 shadow-[0_8px_0_#B45309,0_12px_24px_rgba(0,0,0,0.1)] w-full max-w-sm">
        <h2 className="text-2xl font-display font-black text-gray-800 mb-1">{answered} Questions Done!</h2>
        <p className="text-sm font-bold text-gray-400 mb-4">
          You got <span className="text-green-600 font-black text-lg">{correct}</span> correct out of <span className="font-black text-gray-600">{answered}</span>
        </p>
        <div className="flex justify-center gap-2 mb-5">
          {Array.from({ length: 3 }, (_, i) => (
            <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.15, type: 'spring', stiffness: 400 }}
              className={`text-4xl ${i < stars ? '' : 'opacity-15 grayscale'}`}>⭐</motion.span>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={onFinish}
            className="flex-1 py-3.5 rounded-2xl font-display font-black text-base bg-white border-2 border-gray-200 text-gray-600 shadow-[0_5px_0_#d1d5db] hover:-translate-y-0.5 hover:shadow-[0_7px_0_#d1d5db] active:translate-y-1 active:shadow-[0_1px_0_#d1d5db] transition-all flex items-center justify-center gap-2">
            <Flag size={16} /> Finish
          </button>
          <button onClick={onKeepGoing}
            className={`flex-1 py-3.5 rounded-2xl font-display font-black text-base border-2 hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 ${c.btn}`}>
            Keep Going <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main component ─── */
export function TestQuestion({ questions, title, backTo = '/test', progressKey, accentColor }: TestQuestionProps) {
  const [, setLocation] = useLocation();
  const { currentPlayer, updateProgress } = useGameStore();

  const [queue, setQueue] = useState<Question[]>(() => shuffle(questions));
  const [queueIdx, setQueueIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [history, setHistory] = useState<boolean[]>([]);
  const [phase, setPhase] = useState<'question' | 'checkpoint'>('question');
  const [streak, setStreak] = useState(0);
  const [comboKey, setComboKey] = useState(0);
  const [coinBurst, setCoinBurst] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!currentPlayer) setLocation('/');
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentPlayer, setLocation]);

  if (!currentPlayer) return null;

  const currentQ = queue[queueIdx];
  const c = ACCENT[accentColor];
  const totalAnswered = history.length;
  const totalCorrect = history.filter(Boolean).length;
  const comboInfo = getComboInfo(streak);

  const advanceQueue = () => {
    const nextIdx = queueIdx + 1;
    if (nextIdx >= queue.length) { setQueue(shuffle(questions)); setQueueIdx(0); }
    else setQueueIdx(nextIdx);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleSelect = (answer: number | string) => {
    if (selectedAnswer !== null) return;
    const correct = answer === currentQ.correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    const newHistory = [...history, correct];
    setHistory(newHistory);

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setCoinBurst(true);
      setTimeout(() => setCoinBurst(false), 900);
      if (newStreak >= 3) setComboKey(k => k + 1);
    } else {
      setStreak(0);
    }

    timerRef.current = setTimeout(() => {
      if (newHistory.length > 0 && newHistory.length % 10 === 0) setPhase('checkpoint');
      else advanceQueue();
    }, 1600);
  };

  const finishSession = () => {
    const answered = history.length;
    const correct = history.filter(Boolean).length;
    const pct = answered > 0 ? correct / answered : 0;
    const stars = pct >= 0.8 ? 3 : pct >= 0.6 ? 2 : 1;
    updateProgress(progressKey, { completed: true, stars, score: correct });
    setLocation(`/celebrate?stars=${stars}&next=/test`);
  };

  const chrysMood = isCorrect === true ? 'excited' : isCorrect === false ? 'thinking' : 'thinking';

  if (phase === 'checkpoint') {
    return (
      <PageWrapper backTo={backTo} title={title} stars={currentPlayer.starsTotal}>
        <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
          <CheckpointScreen answered={totalAnswered} correct={totalCorrect} accentColor={accentColor}
            onKeepGoing={() => { setPhase('question'); advanceQueue(); }}
            onFinish={finishSession} />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper backTo={backTo} title={title} stars={currentPlayer.starsTotal}>
      <div className="w-full max-w-xl mx-auto flex flex-col gap-3">

        {/* ── Game HUD ── */}
        <div className="flex items-center gap-2">
          {/* Progress meter */}
          <div className="flex-1 relative h-4 bg-white/60 rounded-full overflow-hidden border-2 border-white/80 shadow-inner">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${c.topBar}`}
              initial={false}
              animate={{ width: `${totalAnswered > 0 ? ((totalAnswered % 10) / 10) * 100 : 0}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          {/* Coin score */}
          <motion.div
            key={totalCorrect}
            animate={isCorrect === true ? { scale: [1, 1.35, 1] } : {}}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-1 bg-white rounded-xl px-3 py-1.5 border-2 border-yellow-400 shadow-[0_4px_0_#B45309] shrink-0"
          >
            <span className="text-base">🪙</span>
            <span className="font-display font-black text-xl text-yellow-700">{totalCorrect}</span>
          </motion.div>
          {/* Finish */}
          {totalAnswered >= 3 && (
            <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              onClick={finishSession}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl font-display font-black text-xs bg-white border-2 border-gray-200 text-gray-500 shadow-[0_3px_0_#d1d5db] hover:-translate-y-0.5 hover:shadow-[0_5px_0_#d1d5db] active:translate-y-1 active:shadow-none transition-all shrink-0"
            >
              <CheckCircle size={12} /> Done
            </motion.button>
          )}
        </div>

        {/* ── Combo badge ── */}
        <div className="relative h-10 overflow-visible">
          <AnimatePresence>
            {comboInfo && streak >= 3 && (
              <motion.div
                key={comboKey}
                initial={{ y: -30, scale: 0.6, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: -20, scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                className="absolute left-1/2 -translate-x-1/2 -top-1 z-20"
              >
                <div className={`flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r ${comboInfo.bg} text-white font-display font-black text-lg shadow-[0_4px_0_rgba(0,0,0,0.22)] border-2 border-white/30 whitespace-nowrap`}>
                  <span className="text-xl">{comboInfo.icon}</span>
                  <span>x{streak} {comboInfo.text}</span>
                  <span className="text-xl">{comboInfo.icon}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Chrys + feedback ── */}
        <div className="flex items-center justify-between gap-3">
          <AnimatePresence mode="wait">
            <motion.div key={chrysMood}
              initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
              <ChrysCharacter mood={isCorrect === true ? 'excited' : isCorrect === false ? 'thinking' : 'happy'} size="md" bounce={false} />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {isCorrect !== null && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                className={`flex flex-col items-center rounded-3xl px-4 py-3 border-2 shadow-lg text-center flex-1 max-w-[160px] ${
                  isCorrect
                    ? 'bg-green-100 border-green-400 text-green-700 shadow-[0_4px_0_#15803d]'
                    : 'bg-orange-100 border-orange-400 text-orange-700 shadow-[0_4px_0_#c2410c]'
                }`}
              >
                <span className="text-2xl">{isCorrect ? '✅' : '🤔'}</span>
                <span className="text-sm font-black mt-1">{isCorrect ? 'CORRECT!' : 'Try again!'}</span>
                {!isCorrect && (
                  <p className="text-xs font-black mt-0.5">
                    Answer: <span className="text-green-700 text-base">{currentQ.correctAnswer}</span>
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col items-end gap-1.5 shrink-0 min-w-[64px]">
            <div className="text-xs font-black text-gray-400/80 text-right">{totalAnswered} done</div>
            <div className={`text-center rounded-2xl px-3 py-2 border-2 shadow-[0_4px_0_rgba(0,0,0,0.15)] ${c.pill}`}>
              <p className="text-2xl font-display font-black leading-none">{totalAnswered - totalCorrect}</p>
              <p className="text-[10px] font-black opacity-60 mt-0.5">missed</p>
            </div>
          </div>
        </div>

        {/* ── Question card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${queueIdx}-${queue.length}`}
            initial={{ opacity: 0, x: 55 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -55 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="relative bg-white rounded-[1.75rem] overflow-hidden"
            style={{ boxShadow: `0 8px 0 ${c.shadow}, 0 12px 28px rgba(0,0,0,0.1)` }}
          >
            {/* Colored top bar */}
            <div className={`h-2.5 w-full bg-gradient-to-r ${c.topBar}`} />

            {/* CoinBurst lives here */}
            <CoinBurst active={coinBurst} />

            <div className="p-5">
              <p className="text-xl md:text-2xl font-display font-black text-gray-800 text-center leading-snug mb-4">
                {currentQ.text}
              </p>

              {currentQ.visual && (
                <div className="bg-sky-50/60 rounded-2xl border border-sky-100 mb-4 overflow-hidden px-2 py-1">
                  <VisualDisplay visual={currentQ.visual} />
                </div>
              )}

              {/* Answer buttons */}
              <div className="grid grid-cols-2 gap-3">
                {currentQ.options.map((option, i) => {
                  const isSelected = selectedAnswer === option;
                  const isActuallyCorrect = option === currentQ.correctAnswer;

                  let btnClass = `bg-white border-3 text-gray-800 answer-btn ${c.optBase}`;
                  if (selectedAnswer !== null) {
                    if (isActuallyCorrect) btnClass = 'bg-green-500 border-2 border-green-600 text-white shadow-[0_5px_0_#15803d]';
                    else if (isSelected)   btnClass = 'bg-orange-400 border-2 border-orange-500 text-white shadow-none';
                    else                   btnClass = 'bg-gray-50 border-2 border-gray-100 text-gray-200 shadow-none';
                  }

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(option)}
                      disabled={selectedAnswer !== null}
                      data-testid={`option-${i}`}
                      animate={
                        selectedAnswer !== null && isActuallyCorrect
                          ? { scale: [1, 1.12, 1.06, 1.04] }
                          : selectedAnswer !== null && isSelected && !isActuallyCorrect
                          ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
                          : {}
                      }
                      transition={{ duration: 0.38 }}
                      className={`min-h-[68px] rounded-2xl font-display font-black text-4xl md:text-5xl transition-colors duration-100 border-2 ${btnClass}`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tap-to-continue hint */}
        <AnimatePresence>
          {isCorrect !== null && (
            <motion.p
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-center text-sm font-black text-white/80 drop-shadow"
            >
              Next question coming up… ✨
            </motion.p>
          )}
        </AnimatePresence>

      </div>
    </PageWrapper>
  );
}
