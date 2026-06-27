import React from 'react';
import { motion } from 'framer-motion';

interface StarDisplayProps {
  count: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function StarDisplay({ count, max = 3, size = 'md', className = '' }: StarDisplayProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: i * 0.1, 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className={sizeClasses[size]}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-full h-full drop-shadow-sm transition-colors duration-300 ${
              i < count 
                ? 'fill-[#FFD700] stroke-[#DAA520]' 
                : 'fill-muted stroke-muted-foreground/30'
            }`}
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
