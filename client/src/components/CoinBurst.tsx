import { motion, AnimatePresence } from 'framer-motion';

const PARTICLES = [
  { id: 0,  angle: 0,    dist: 90,  emoji: '⭐', size: 26 },
  { id: 1,  angle: 40,   dist: 75,  emoji: '🪙', size: 22 },
  { id: 2,  angle: 80,   dist: 95,  emoji: '⭐', size: 24 },
  { id: 3,  angle: 120,  dist: 68,  emoji: '🪙', size: 20 },
  { id: 4,  angle: 162,  dist: 84,  emoji: '⭐', size: 26 },
  { id: 5,  angle: 200,  dist: 78,  emoji: '🪙', size: 22 },
  { id: 6,  angle: 242,  dist: 92,  emoji: '⭐', size: 24 },
  { id: 7,  angle: 282,  dist: 72,  emoji: '🪙', size: 20 },
  { id: 8,  angle: 322,  dist: 82,  emoji: '✨', size: 18 },
  { id: 9,  angle: 58,   dist: 55,  emoji: '✨', size: 18 },
  { id: 10, angle: 178,  dist: 50,  emoji: '✨', size: 16 },
  { id: 11, angle: 298,  dist: 58,  emoji: '✨', size: 16 },
];

export function CoinBurst({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible z-50">
          {PARTICLES.map(p => {
            const rad = (p.angle * Math.PI) / 180;
            const dx = Math.cos(rad) * p.dist;
            const dy = Math.sin(rad) * p.dist;
            return (
              <motion.span
                key={p.id}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: dx, y: dy, scale: [0, 1.4, 0.9], opacity: [1, 1, 0] }}
                transition={{ duration: 0.72, ease: [0.15, 0.85, 0.3, 1], delay: p.id * 0.018 }}
                className="absolute select-none leading-none"
                style={{ fontSize: p.size }}
              >
                {p.emoji}
              </motion.span>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
