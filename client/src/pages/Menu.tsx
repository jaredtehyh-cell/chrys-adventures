import React, { useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useGameStore } from '../hooks/useGameStore';
import { PageWrapper } from '../components/PageWrapper';
import { ChrysCharacter } from '../components/ChrysCharacter';
import { motion } from 'framer-motion';

const WORLDS = [
  {
    href: '/learn',
    label: 'WORLD 1',
    title: 'Learning\nAdventure',
    emoji: '📚',
    description: 'Lessons & guided practice',
    bg: 'from-sky-400 to-blue-500',
    border: 'border-sky-500',
    shadow: '#1e40af',
    pillBg: 'bg-sky-100',
    pillText: 'text-sky-800',
    pillBorder: 'border-sky-300',
    worldNum: '1',
    worldColor: '#0A5299',
  },
  {
    href: '/test',
    label: 'WORLD 2',
    title: 'Test\nChallenge',
    emoji: '⭐',
    description: 'Quiz mode — earn stars!',
    bg: 'from-orange-400 to-amber-500',
    border: 'border-orange-500',
    shadow: '#B45309',
    pillBg: 'bg-orange-100',
    pillText: 'text-orange-800',
    pillBorder: 'border-orange-300',
    worldNum: '2',
    worldColor: '#92400e',
  },
];

export default function Menu() {
  const [, setLocation] = useLocation();
  const { currentPlayer } = useGameStore();

  useEffect(() => {
    if (!currentPlayer) setLocation('/');
  }, [currentPlayer, setLocation]);

  if (!currentPlayer) return null;

  return (
    <PageWrapper backTo="/" stars={currentPlayer.starsTotal}>
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-2xl mx-auto gap-5 py-4">

        {/* Player greeting */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          <ChrysCharacter mood="excited" size="lg" bounce />
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-display font-black"
              style={{ color: '#0A5299', textShadow: '0 3px 0 rgba(255,255,255,0.85)' }}>
              Hi, {currentPlayer.name}! 👋
            </h1>
            <p className="text-sm font-black mt-1" style={{ color: '#0A5299', opacity: 0.7 }}>
              Where are you adventuring today?
            </p>
          </div>
        </motion.div>

        {/* World select */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-3 px-1">
            <div className="flex-1 h-0.5 bg-white/50 rounded" />
            <span className="text-sm font-black text-blue-900/70 tracking-widest uppercase whitespace-nowrap"
              style={{ textShadow: '0 1px 0 rgba(255,255,255,0.7)' }}>
              🗺️ World Select
            </span>
            <div className="flex-1 h-0.5 bg-white/50 rounded" />
          </div>

          {WORLDS.map((w, i) => (
            <motion.div
              key={w.href}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 260, damping: 24 }}
            >
              <Link href={w.href}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ y: 4, scale: 0.97 }}
                  className={`relative bg-white rounded-[1.75rem] border-4 ${w.border} overflow-hidden cursor-pointer`}
                  style={{ boxShadow: `0 8px 0 ${w.shadow}, 0 12px 24px rgba(0,0,0,0.1)` }}
                >
                  {/* Colored top bar */}
                  <div className={`h-3 w-full bg-gradient-to-r ${w.bg}`} />

                  {/* World badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`bg-gradient-to-br ${w.bg} text-white font-display font-black text-xs px-3 py-1.5 rounded-full shadow-[0_3px_0_rgba(0,0,0,0.2)] tracking-widest uppercase`}>
                      {w.label}
                    </div>
                  </div>

                  <div className="flex items-center gap-5 p-5 pr-20">
                    {/* Icon block */}
                    <motion.div
                      animate={{ y: [0,-8,0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${w.bg} flex items-center justify-center text-5xl shrink-0`}
                      style={{ boxShadow: `0 5px 0 ${w.shadow}, 0 7px 14px rgba(0,0,0,0.1)` }}
                    >
                      {w.emoji}
                    </motion.div>

                    {/* Text */}
                    <div>
                      <h2 className="text-2xl md:text-3xl font-display font-black text-gray-800 leading-tight whitespace-pre-line">
                        {w.title}
                      </h2>
                      <p className="text-sm font-bold text-gray-400 mt-1">{w.description}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Coin display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="flex items-center gap-3 bg-white/90 border-4 border-yellow-400 rounded-2xl px-6 py-3 shadow-[0_6px_0_#B45309]"
        >
          <span className="text-3xl">🪙</span>
          <div>
            <p className="text-xs font-black text-yellow-700 opacity-70 leading-none">YOUR COINS</p>
            <p className="text-3xl font-display font-black text-yellow-700 leading-none">{currentPlayer.starsTotal}</p>
          </div>
          <span className="text-2xl ml-2">✨</span>
        </motion.div>

      </div>
    </PageWrapper>
  );
}
