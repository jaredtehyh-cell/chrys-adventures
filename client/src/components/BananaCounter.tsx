import React from 'react';
import { motion } from 'framer-motion';

interface BananaCounterProps {
  count: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BananaCounter({ count, className = '', size = 'md' }: BananaCounterProps) {
  const bananas = Array.from({ length: Math.max(0, count) }, (_, i) => i);

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  return (
    <div className={`flex flex-wrap gap-2 justify-center items-center ${className}`}>
      {bananas.map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 15,
            delay: i * 0.1,
          }}
          className={`${sizeClasses[size]} leading-none select-none`}
        >
          🍌
        </motion.span>
      ))}
      {count === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground font-display font-bold text-2xl"
        >
          No bananas!
        </motion.div>
      )}
    </div>
  );
}
