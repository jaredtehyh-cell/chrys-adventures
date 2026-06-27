import React, { useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useGameStore } from '../hooks/useGameStore';
import { PageWrapper } from '../components/PageWrapper';
import { StarDisplay } from '../components/StarDisplay';
import { motion } from 'framer-motion';

const TEST_STAGES = [
  {
    href: '/test/numbers',
    stageLabel: 'STAGE 1',
    title: 'Numbers Quiz',
    subtitle: '10 questions · Count & identify',
    emoji: '🔢',
    bg: 'from-sky-400 to-blue-500',
    shadow: '#1e40af',
    progressKey: 'testNumbers' as const,
    isFinal: false,
  },
  {
    href: '/test/operations',
    stageLabel: 'STAGE 2',
    title: 'Operations Quiz',
    subtitle: '10 questions · Add & subtract',
    emoji: '➕',
    bg: 'from-emerald-400 to-green-500',
    shadow: '#065f46',
    progressKey: 'testOperations' as const,
    isFinal: false,
  },
  {
    href: '/test/realworld',
    stageLabel: 'STAGE 3',
    title: 'Real World Quiz',
    subtitle: '10 questions · Word problems',
    emoji: '🌍',
    bg: 'from-purple-400 to-violet-500',
    shadow: '#4c1d95',
    progressKey: 'testRealworld' as const,
    isFinal: false,
  },
  {
    href: '/test/final',
    stageLabel: '🏆 BOSS',
    title: 'Final Challenge',
    subtitle: '15 questions · Everything!',
    emoji: '🏆',
    bg: 'from-red-500 to-rose-600',
    shadow: '#991b1b',
    progressKey: 'testFinal' as const,
    isFinal: true,
  },
];

export default function TestMenu() {
  const [, setLocation] = useLocation();
  const { currentPlayer } = useGameStore();

  useEffect(() => {
    if (!currentPlayer) setLocation('/');
  }, [currentPlayer, setLocation]);

  if (!currentPlayer) return null;

  return (
    <PageWrapper backTo="/menu" title="⭐ WORLD 2" stars={currentPlayer.starsTotal}>
      <div className="flex flex-col w-full max-w-xl mx-auto gap-4">

        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-base font-black"
          style={{ color: '#0A5299', textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}
        >
          Pick your challenge! 🎯
        </motion.p>

        <div className="flex flex-col gap-3">
          {TEST_STAGES.map((stage, i) => {
            const prog = currentPlayer.progress[stage.progressKey];
            const starsEarned = prog?.stars ?? 0;
            const completed = prog?.completed ?? false;

            return (
              <motion.div
                key={stage.href}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.09, type: 'spring', stiffness: 280, damping: 24 }}
              >
                <Link href={stage.href}>
                  <motion.div
                    whileHover={{ y: -4, scale: stage.isFinal ? 1.03 : 1.02 }}
                    whileTap={{ y: 4, scale: 0.97 }}
                    className={`relative bg-white overflow-hidden cursor-pointer ${stage.isFinal ? 'rounded-[2rem] border-4 border-red-400' : 'rounded-[1.75rem]'}`}
                    style={{
                      boxShadow: stage.isFinal
                        ? `0 10px 0 ${stage.shadow}, 0 14px 28px rgba(220,38,38,0.22)`
                        : `0 7px 0 ${stage.shadow}, 0 10px 22px rgba(0,0,0,0.09)`,
                    }}
                  >
                    {/* Top colored bar */}
                    <div className={`${stage.isFinal ? 'h-3.5' : 'h-2.5'} w-full bg-gradient-to-r ${stage.bg}`} />

                    <div className="flex items-center gap-4 p-4 pr-5">
                      {/* Stage icon */}
                      <motion.div
                        animate={{ y: [0, stage.isFinal ? -10 : -7, 0] }}
                        transition={{ duration: stage.isFinal ? 2 : 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                        className={`relative rounded-2xl bg-gradient-to-br ${stage.bg} flex items-center justify-center shrink-0 ${stage.isFinal ? 'w-[80px] h-[80px] text-5xl' : 'w-[68px] h-[68px] text-4xl'}`}
                        style={{ boxShadow: `0 4px 0 ${stage.shadow}` }}
                      >
                        {stage.emoji}
                        {/* Stage badge */}
                        <div className={`absolute -top-2 -left-2 border-2 rounded-full px-1.5 py-0.5 text-[10px] font-black shadow-sm ${stage.isFinal ? 'bg-red-500 border-red-600 text-white' : 'bg-white border-gray-200 text-gray-600'}`}>
                          {stage.stageLabel}
                        </div>
                        {/* Completion tick */}
                        {completed && (
                          <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-black shadow">
                            ✓
                          </div>
                        )}
                      </motion.div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h2 className={`font-display font-black text-gray-800 leading-tight ${stage.isFinal ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
                          {stage.title}
                        </h2>
                        <p className="text-sm font-bold text-gray-400">{stage.subtitle}</p>
                      </div>

                      {/* Stars */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <StarDisplay count={starsEarned} max={3} size={stage.isFinal ? 'md' : 'sm'} />
                        {!completed && (
                          <span className={`text-xs font-black rounded-full px-2 py-0.5 border ${stage.isFinal ? 'text-red-700 bg-red-50 border-red-200' : 'text-blue-600 bg-blue-50 border-blue-200'}`}>
                            {stage.isFinal ? 'Challenge!' : 'Play!'}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Stars system explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/70 border-2 border-yellow-200 rounded-2xl p-4"
        >
          <p className="text-sm font-black text-yellow-800 text-center mb-2">⭐ Star Rewards</p>
          <div className="flex justify-around text-xs font-bold text-gray-600">
            <span>⭐ 1 star: any score</span>
            <span>⭐⭐ 60%+</span>
            <span>⭐⭐⭐ 80%+</span>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
