import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import alyseNormal from "@assets/alyse_normal_nobg.png";
import alyseExcited from "@assets/alyse_excited_nobg.png";
import alyseThinking from "@assets/alyse_thinking_nobg.png";
import alyseTeaching from "@assets/alyse_teaching_nobg.png";

export type AlyseMood = 'normal' | 'excited' | 'thinking' | 'teaching';

interface AlyseCharacterProps {
  mood?: AlyseMood;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bounce?: boolean;
}

const IMAGES: Record<AlyseMood, string> = {
  normal:   alyseNormal,
  excited:  alyseExcited,
  thinking: alyseThinking,
  teaching: alyseTeaching,
};

const SIZES = {
  sm: 'w-20 h-20',
  md: 'w-36 h-36',
  lg: 'w-52 h-52',
  xl: 'w-72 h-72',
};

const IMG_STYLE: React.CSSProperties = {
  filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.18)) saturate(1.15)',
};

export function AlyseCharacter({ mood = 'teaching', className = '', size = 'md', bounce = false }: AlyseCharacterProps) {
  return (
    <div className={`relative ${SIZES[size]} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={mood}
          className="w-full h-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            bounce
              ? {
                  scale: 1,
                  opacity: 1,
                  y: [0, -8, 0, -4, 0],
                  transition: {
                    scale: { type: 'spring', stiffness: 300, damping: 20 },
                    opacity: { duration: 0.2 },
                    y: { delay: 0.25, duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                  },
                }
              : { scale: 1, opacity: 1 }
          }
          exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.15 } }}
        >
          <img
            src={IMAGES[mood]}
            alt={`Alyse ${mood}`}
            className="w-full h-full object-contain"
            style={IMG_STYLE}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
