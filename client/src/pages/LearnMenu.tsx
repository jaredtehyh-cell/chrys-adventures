import React, { useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useGameStore } from '../hooks/useGameStore';
import { PageWrapper } from '../components/PageWrapper';
import { StarDisplay } from '../components/StarDisplay';
import { motion } from 'framer-motion';

const LEARN_LEVELS = [
  {
    href: '/learn/numbers',
    worldNum: '1-1',
    title: 'Numbers',
    subtitle: 'Count 0 to 9',
    emoji: '🔢',
    bg: 'from-sky-400 to-blue-500',
    shadow: '#1e40af',
    progressKey: 'numbers' as const,
  },
  {
    href: '/learn/operations',
    worldNum: '1-2',
    title: 'Operations',
    subtitle: 'Add & Subtract',
    emoji: '➕',
    bg: 'from-emerald-400 to-green-500',
    shadow: '#065f46',
    progressKey: 'operations' as const,
  },
  {
    href: '/learn/realworld',
    worldNum: '1-3',
    title: 'Real World',
    subtitle: 'Story problems',
    emoji: '🌍',
    bg: 'from-purple-400 to-violet-500',
    shadow: '#4c1d95',
    progressKey: 'realworld' as const,
  },
];

export default function LearnMenu() {
  const [, setLocation] = useLocation();
  const { currentPlayer } = useGameStore();

  useEffect(() => {
    if (!currentPlayer) setLocation('/');
  }, [currentPlayer, setLocation]);

  if (!currentPlayer) return null;

  return (
    <PageWrapper backTo="/menu" title="📚 WORLD 1" stars={currentPlayer.starsTotal}>
      <div className="flex flex-col w-full max-w-xl mx-auto gap-4">

        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-base font-black"
          style={{ color: '#0A5299', textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}
        >
          Choose your lesson! 🗺️
        </motion.p>

        <div className="flex flex-col gap-3">
          {LEARN_LEVELS.map((level, i) => {
            const prog = currentPlayer.progress[level.progressKey];
            const starsEarned = prog?.stars ?? 0;
            const completed = prog?.completed ?? false;

            return (
              <motion.div
                key={level.href}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 280, damping: 24 }}
              >
                <Link href={level.href}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ y: 4, scale: 0.97 }}
                    className="relative bg-white rounded-[1.75rem] overflow-hidden cursor-pointer"
                    style={{ boxShadow: `0 7px 0 ${level.shadow}, 0 10px 22px rgba(0,0,0,0.1)` }}
                  >
                    {/* Top bar */}
                    <div className={`h-2.5 w-full bg-gradient-to-r ${level.bg}`} />

                    <div className="flex items-center gap-4 p-4 pr-5">
                      {/* Level icon */}
                      <motion.div
                        animate={{ y: [0,-7,0] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                        className={`relative w-18 h-18 rounded-2xl bg-gradient-to-br ${level.bg} flex items-center justify-center text-4xl shrink-0 w-[72px] h-[72px]`}
                        style={{ boxShadow: `0 4px 0 ${level.shadow}` }}
                      >
                        {level.emoji}
                        {/* World badge */}
                        <div className="absolute -top-2 -left-2 bg-white border-2 border-gray-200 rounded-full px-1.5 py-0.5 text-[10px] font-black text-gray-600 shadow-sm">
                          {level.worldNum}
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
                        <h2 className="text-xl md:text-2xl font-display font-black text-gray-800 leading-tight">{level.title}</h2>
                        <p className="text-sm font-bold text-gray-400">{level.subtitle}</p>
                      </div>

                      {/* Stars */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <StarDisplay count={starsEarned} max={3} size="sm" />
                        {!completed && (
                          <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5">
                            Play!
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

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="bg-white/70 border-2 border-blue-100 rounded-2xl p-4 text-center"
        >
          <p className="text-sm font-bold text-blue-800">
            🌟 Complete all 3 lessons to unlock the Test Challenge!
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
