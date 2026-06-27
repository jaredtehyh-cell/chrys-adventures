import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronLeft } from 'lucide-react';
import { StarDisplay } from './StarDisplay';
import { InstagramButton } from './InstagramButton';

interface PageWrapperProps {
  children: React.ReactNode;
  backTo?: string;
  title?: string;
  stars?: number;
}

function Cloud({ w, top, left, right, delay = 0 }: {
  w: number; top: string; left?: string; right?: string; delay?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left, right, width: w }}
      animate={{ x: [0, 16, 0] }}
      transition={{ duration: 10 + delay * 4, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg viewBox="0 0 130 60" width={w} height={w * 0.46} fill="white" fillOpacity="0.9">
        <ellipse cx="65" cy="48" rx="59" ry="18" />
        <circle cx="38" cy="36" r="23" />
        <circle cx="67" cy="26" r="28" />
        <circle cx="96" cy="36" r="21" />
      </svg>
    </motion.div>
  );
}

function QBlock({ top, left, right, size = 44, delay = 0 }: {
  top: string; left?: string; right?: string; size?: number; delay?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ top, left, right, opacity: 0.62 }}
      animate={{ y: [0, -13, 0] }}
      transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut', delay, repeatType: 'mirror' }}
    >
      <div style={{
        width: size, height: size,
        background: 'linear-gradient(145deg, #FFD93D 0%, #FFA800 100%)',
        borderRadius: 9,
        border: '3px solid rgba(0,0,0,0.12)',
        boxShadow: `0 ${Math.round(size*0.1)}px 0 #A86800, 0 ${Math.round(size*0.17)}px ${Math.round(size*0.24)}px rgba(0,0,0,0.17)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--app-font-display)',
        fontWeight: 900, fontSize: size * 0.5, color: '#7B3A00', userSelect: 'none',
      }}>?</div>
    </motion.div>
  );
}

function Star({ top, left, right, delay = 0 }: { top: string; left?: string; right?: string; delay?: number }) {
  return (
    <motion.span
      className="absolute pointer-events-none select-none"
      style={{ top, left, right, fontSize: 18, color: '#FFE44D' }}
      animate={{ scale: [0.7, 1.7, 0.7], opacity: [0.1, 1, 0.1] }}
      transition={{ duration: 2.8, repeat: Infinity, delay, ease: 'easeInOut' }}
    >★</motion.span>
  );
}

export function PageWrapper({ children, backTo, title, stars }: PageWrapperProps) {
  return (
    <div className="min-h-[100dvh] w-full overflow-hidden relative font-sans page-bg">
      <InstagramButton />

      {/* ── World layers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Clouds */}
        <Cloud w={240} top="2%"  left="-20px" delay={0} />
        <Cloud w={180} top="8%"  left="32%"   delay={1.6} />
        <Cloud w={205} top="13%" right="-15px" delay={0.9} />
        <Cloud w={160} top="20%" left="60%"    delay={2.5} />

        {/* Twinkling stars */}
        <Star top="3%"  left="7%"  delay={0} />
        <Star top="5%"  left="23%" delay={0.6} />
        <Star top="4%"  left="46%" delay={1.4} />
        <Star top="6%"  left="64%" delay={0.3} />
        <Star top="3%"  left="80%" delay={1.9} />
        <Star top="7%"  left="93%" delay={1.0} />
        <Star top="9%"  left="15%" delay={2.2} />
        <Star top="11%" left="55%" delay={0.8} />

        {/* Question-mark blocks */}
        <QBlock top="30%" left="0.6%"  size={44} delay={0} />
        <QBlock top="64%" left="1%"    size={38} delay={1.3} />
        <QBlock top="43%" right="0.6%" size={42} delay={0.7} />
        <QBlock top="76%" right="1.5%" size={35} delay={1.9} />

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-9"
          style={{ background: 'linear-gradient(to top, #3E9A18, #5CB82E)', opacity: 0.78 }} />
        <div className="absolute bottom-8 left-0 right-0 h-3"
          style={{ background: '#7B4820', opacity: 0.26 }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-[100dvh] max-w-5xl mx-auto p-4 md:p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-4 md:mb-5">
          <div className="w-14 md:w-20 flex justify-start">
            {backTo && (
              <Link
                href={backTo}
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white border-2 border-blue-100 text-blue-700 shadow-[0_5px_0_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:shadow-[0_7px_0_rgba(0,0,0,0.2)] active:translate-y-1.5 active:shadow-[0_1px_0_rgba(0,0,0,0.2)] transition-all focus:outline-none"
                data-testid="button-back"
              >
                <ChevronLeft size={24} strokeWidth={3} />
              </Link>
            )}
          </div>

          {title && (
            <h1
              className="text-xl md:text-2xl font-display font-extrabold text-center flex-1 px-2 leading-tight"
              style={{ color: '#0F3A6E', textShadow: '0 2px 0 rgba(255,255,255,0.9), 0 -1px 0 rgba(0,0,80,0.06)' }}
            >
              {title}
            </h1>
          )}

          <div className="w-14 md:w-20 flex justify-end">
            {stars !== undefined && (
              <motion.div
                animate={{ scale: [1, 1.07, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white shadow-[0_4px_0_rgba(0,0,0,0.18)] rounded-xl px-2.5 py-1.5 border-2 border-yellow-300 flex items-center gap-1"
              >
                <StarDisplay count={1} max={1} size="sm" />
                <span className="font-display font-black text-lg text-yellow-600">{stars}</span>
              </motion.div>
            )}
          </div>
        </header>

        <motion.main
          className="flex-1 flex flex-col w-full relative"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ type: 'spring', stiffness: 255, damping: 24 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
