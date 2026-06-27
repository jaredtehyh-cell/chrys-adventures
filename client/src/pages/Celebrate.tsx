import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useGameStore } from '../hooks/useGameStore';
import { PageWrapper } from '../components/PageWrapper';
import { ChrysCharacter } from '../components/ChrysCharacter';
import { PRAISE_MESSAGES } from '../lib/gameData';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const STAR_LABELS = ['', '🌟 Nice Try!', '⭐⭐ Well Done!', '⭐⭐⭐ Amazing!'];

export default function Celebrate() {
  const [, setLocation] = useLocation();
  const { currentPlayer } = useGameStore();
  const { width, height } = useWindowSize();

  const searchParams = new URLSearchParams(window.location.search);
  const earnedStars = parseInt(searchParams.get('stars') || '0', 10);
  const nextPath = searchParams.get('next') || '/menu';

  const randomPraise = React.useMemo(
    () => PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)],
    []
  );

  useEffect(() => {
    if (!currentPlayer) setLocation('/');
  }, [currentPlayer, setLocation]);

  if (!currentPlayer) return null;

  return (
    <PageWrapper>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={520}
        gravity={0.18}
        colors={['#FFD700', '#FF8C00', '#FF6B6B', '#5EC8F5', '#4CAF50', '#FF69B4', '#A855F7']}
      />

      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-2xl mx-auto py-6 z-10 gap-5">

        {/* LEVEL CLEAR banner */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.05 }}
          className="text-center"
        >
          <div
            className="inline-block px-7 py-2 rounded-2xl text-white font-display font-black text-2xl md:text-3xl tracking-widest uppercase mb-1"
            style={{
              background: 'linear-gradient(135deg, #FF6B35, #FF3E9A, #A855F7)',
              boxShadow: '0 6px 0 rgba(0,0,0,0.28), 0 8px 20px rgba(168,85,247,0.35)',
              textShadow: '0 2px 6px rgba(0,0,0,0.3)',
            }}
          >
            🏆 LEVEL CLEAR! 🏆
          </div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 260 }}
            className="text-4xl md:text-5xl font-display font-black text-center mt-2"
            style={{
              color: '#1A4A6E',
              textShadow: '0 3px 0 rgba(255,255,255,0.9), 0 5px 12px rgba(0,0,100,0.15)',
            }}
          >
            {randomPraise}
          </motion.h1>
        </motion.div>

        {/* Chrys celebrating */}
        <motion.div
          initial={{ scale: 0, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 240, damping: 18 }}
        >
          <ChrysCharacter mood="celebrating" size="xl" bounce />
        </motion.div>

        {/* Stars + score card */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 220, damping: 20 }}
          className="bg-white rounded-[2rem] p-6 md:p-8 border-4 border-yellow-400 w-full max-w-sm z-20"
          style={{ boxShadow: '0 10px 0 #B45309, 0 14px 32px rgba(0,0,0,0.15)' }}
        >
          {/* Star label */}
          <p className="text-center font-display font-black text-lg text-yellow-700 mb-3">
            {STAR_LABELS[Math.min(earnedStars, 3)]}
          </p>

          {/* Stars */}
          <div className="flex justify-center gap-3 mb-5">
            {Array.from({ length: 3 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.65 + i * 0.18, type: 'spring', stiffness: 420, damping: 16 }}
              >
                <svg viewBox="0 0 24 24" className={`w-16 h-16 md:w-20 md:h-20 ${i < earnedStars ? 'drop-shadow-lg' : 'opacity-12 grayscale'}`}
                  style={i < earnedStars ? { filter: 'drop-shadow(0 4px 6px rgba(255,180,0,0.6))' } : {}}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    fill={i < earnedStars ? '#FFD700' : '#e5e7eb'} stroke={i < earnedStars ? '#DAA520' : '#d1d5db'} strokeWidth="1.5" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Coin count */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, type: 'spring' }}
            className="flex items-center justify-center gap-2 bg-yellow-50 border-2 border-yellow-200 rounded-2xl py-3 px-4 mb-5"
          >
            <span className="text-3xl">🪙</span>
            <div>
              <p className="text-xs font-black text-yellow-700 opacity-70">TOTAL COINS</p>
              <p className="text-3xl font-display font-black text-yellow-700 leading-none">{currentPlayer.starsTotal}</p>
            </div>
          </motion.div>

          {/* Continue button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25 }}
            onClick={() => setLocation(nextPath)}
            className="w-full py-4 px-8 rounded-2xl font-display font-black text-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 border-2 border-yellow-500 game-btn"
          >
            Continue ▶
          </motion.button>
        </motion.div>

        {/* Floating coins above */}
        {['🪙', '⭐', '🪙', '⭐', '🪙'].map((emoji, i) => (
          <motion.span
            key={i}
            className="fixed pointer-events-none text-3xl"
            initial={{ opacity: 0, x: `${10 + i * 20}vw`, y: '50vh' }}
            animate={{ opacity: [0, 1, 0], y: '-10vh' }}
            transition={{ duration: 2.5, delay: 0.6 + i * 0.2, ease: 'easeOut' }}
            style={{ zIndex: 60 }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </PageWrapper>
  );
}
