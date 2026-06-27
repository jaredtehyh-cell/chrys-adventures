import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full h-6 bg-white/60 rounded-full overflow-hidden border-2 border-primary/20 p-1 shadow-inner ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)] relative"
        initial={{ width: 0 }}
        animate={{ width: `${safeProgress}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Shimmer effect */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
      </motion.div>
    </div>
  );
}
