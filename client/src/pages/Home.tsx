import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../hooks/useGameStore';
import { ChrysCharacter, ChrysМood } from '../components/ChrysCharacter';
import { PageWrapper } from '../components/PageWrapper';
import { UserPlus, Play } from 'lucide-react';

const AVATAR_STYLES: Record<string, { bg: string; border: string; shadow: string; icon: string }> = {
  monkey: { bg: 'bg-orange-100', border: 'border-orange-400', shadow: '0_5px_0_#c2410c', icon: '🐵' },
  lion:   { bg: 'bg-yellow-100', border: 'border-yellow-400', shadow: '0_5px_0_#B45309', icon: '🦁' },
  rabbit: { bg: 'bg-pink-100',   border: 'border-pink-400',   shadow: '0_5px_0_#9d174d', icon: '🐰' },
  dog:    { bg: 'bg-blue-100',   border: 'border-blue-400',   shadow: '0_5px_0_#1e40af', icon: '🐶' },
};

function Avatar({ type, size = 'md' }: { type: string; size?: 'sm' | 'md' }) {
  const s = AVATAR_STYLES[type] ?? AVATAR_STYLES.monkey;
  const sz = size === 'sm' ? 'w-10 h-10 text-2xl' : 'w-16 h-16 text-4xl';
  return (
    <div className={`${sz} ${s.bg} rounded-full flex items-center justify-center border-4 ${s.border} shadow-inner shrink-0`}>
      {s.icon}
    </div>
  );
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { players, createPlayer, selectPlayer } = useGameStore();
  const [chrysMood] = useState<ChrysМood>(() => {
    const moods: ChrysМood[] = ['happy', 'excited', 'celebrating', 'running', 'swinging'];
    return moods[Math.floor(Math.random() * moods.length)];
  });
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState<'monkey' | 'lion' | 'rabbit' | 'dog'>('monkey');

  const handleSelectPlayer = (id: string) => {
    selectPlayer(id);
    setLocation('/menu');
  };

  const handleCreatePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    createPlayer(newName.trim(), newAvatar);
    setLocation('/menu');
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-2xl mx-auto pb-10 pt-2">

        {/* ── Hero ── */}
        <motion.div
          className="flex flex-col items-center mb-6 w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="relative flex flex-col items-center mb-3">
            {/* Glow halo under character */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-14 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(255,215,0,0.55) 0%, transparent 68%)' }}
            />
            {/* Floating decorations */}
            <motion.span className="absolute -left-6 top-10 text-3xl select-none" animate={{ y: [0,-12,0] }} transition={{ duration: 2.4, repeat: Infinity, delay: 0 }}>🪙</motion.span>
            <motion.span className="absolute -right-6 top-6 text-2xl select-none" animate={{ y: [0,-14,0] }} transition={{ duration: 2.9, repeat: Infinity, delay: 0.7 }}>⭐</motion.span>
            <motion.span className="absolute -left-2 top-32 text-xl select-none" animate={{ y: [0,-9,0] }} transition={{ duration: 3.3, repeat: Infinity, delay: 1.3 }}>✨</motion.span>
            <motion.span className="absolute -right-2 top-32 text-xl select-none" animate={{ y: [0,-10,0] }} transition={{ duration: 2.7, repeat: Infinity, delay: 1.8 }}>🌟</motion.span>
            <ChrysCharacter mood={chrysMood} size="xl" className="relative z-10" />
          </div>

          {/* Title */}
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.18, type: 'spring', stiffness: 200 }} className="text-center">
            <h1 className="font-display font-black leading-none text-center">
              <motion.span
                className="block text-5xl md:text-6xl"
                animate={{ y: [0,-4,0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ color: '#0A5299', textShadow: '0 4px 0 rgba(255,255,255,0.85), 0 6px 14px rgba(0,80,180,0.18)' }}
              >
                Chrys's
              </motion.span>
              <motion.span
                className="block text-6xl md:text-7xl mt-[-3px]"
                animate={{ y: [0,-5,0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.18 }}
                style={{ color: '#FFB800', textShadow: '0 5px 0 #A86000, 0 8px 16px rgba(255,140,0,0.28)' }}
              >
                Adventures
              </motion.span>
            </h1>

            <motion.div className="flex items-center justify-center gap-2 mt-4 flex-wrap" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              {['🔢 0–19', '➕ Add & Subtract', '🌍 Real World'].map((f, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.55 + i * 0.09, type: 'spring', stiffness: 300 }}
                  className="inline-flex items-center bg-white/90 border-2 border-blue-200 rounded-full px-3 py-1 text-xs font-black text-blue-800 shadow-[0_3px_0_rgba(0,0,0,0.1)]">
                  {f}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Player select / create ── */}
        <AnimatePresence mode="wait">
          {!isCreating ? (
            <motion.div key="select" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }}
              transition={{ delay: 0.08, type: 'spring', stiffness: 255, damping: 22 }} className="w-full">
              <div className="flex items-center gap-3 mb-4 px-1">
                <div className="flex-1 h-0.5 bg-white/50 rounded" />
                <h2 className="text-lg font-display font-black text-blue-900 whitespace-nowrap"
                  style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}>
                  👾 Choose Your Player!
                </h2>
                <div className="flex-1 h-0.5 bg-white/50 rounded" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full mb-5">
                {players.map((player, i) => (
                  <motion.button key={player.id} data-testid={`player-card-${player.id}`}
                    onClick={() => handleSelectPlayer(player.id)}
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07, type: 'spring', stiffness: 300 }}
                    whileHover={{ y: -5, scale: 1.04 }} whileTap={{ scale: 0.93 }}
                    className="flex flex-col items-center p-4 bg-white rounded-[1.75rem] border-4 border-yellow-300 shadow-[0_7px_0_#B45309,0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_0_#B45309,0_14px_24px_rgba(0,0,0,0.12)] transition-shadow group"
                  >
                    <div className="mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <Avatar type={player.avatar} />
                    </div>
                    <span className="font-display font-black text-xl truncate w-full text-center text-blue-900">{player.name}</span>
                    <div className="flex items-center gap-1 mt-2 bg-yellow-400 border-2 border-yellow-500 shadow-[0_3px_0_#A86000] px-3 py-1 rounded-full text-sm font-black text-yellow-900">
                      🪙 {player.starsTotal}
                    </div>
                  </motion.button>
                ))}

                {players.length < 6 && (
                  <motion.button data-testid="new-player-button" onClick={() => setIsCreating(true)}
                    whileHover={{ y: -5, scale: 1.04 }} whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-4 bg-white/70 rounded-[1.75rem] border-4 border-dashed border-blue-300/70 text-blue-600/70 hover:border-blue-400 hover:text-blue-700 hover:bg-white/90 transition-all min-h-[148px] group">
                    <motion.div whileHover={{ rotate: 90 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <UserPlus size={40} className="mb-2" />
                    </motion.div>
                    <span className="font-display font-black text-lg">New Player</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.form key="create" data-testid="create-player-form"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              onSubmit={handleCreatePlayer}
              className="w-full max-w-md bg-white p-6 md:p-8 rounded-[2rem] border-4 border-yellow-400 flex flex-col gap-5"
              style={{ boxShadow: '0 8px 0 #B45309, 0 12px 28px rgba(0,0,0,0.12)' }}>

              <h2 className="text-2xl font-display font-black text-center text-blue-900">Create Your Player! 🎮</h2>

              <div>
                <label className="block text-base font-black text-blue-800 mb-2">Your Name</label>
                <input data-testid="input-player-name" type="text" value={newName}
                  onChange={(e) => setNewName(e.target.value)} placeholder="Enter your name..."
                  className="w-full text-xl font-display font-bold p-4 bg-sky-50 border-3 border-sky-200 rounded-2xl focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200/40 transition-all text-blue-900 placeholder:text-gray-400"
                  maxLength={12} autoFocus />
              </div>

              <div>
                <label className="block text-base font-black text-blue-800 mb-3">Choose Your Avatar</label>
                <div className="flex justify-around">
                  {(['monkey', 'lion', 'rabbit', 'dog'] as const).map(avatar => (
                    <motion.button key={avatar} type="button" data-testid={`avatar-${avatar}`}
                      onClick={() => setNewAvatar(avatar)}
                      whileHover={{ scale: 1.14 }} whileTap={{ scale: 0.88 }}
                      className={`p-2 rounded-2xl transition-all ${
                        newAvatar === avatar ? 'bg-yellow-100 scale-110 shadow-md ring-4 ring-yellow-400' : 'opacity-50 hover:opacity-90 hover:bg-yellow-50'
                      }`}>
                      <Avatar type={avatar} />
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-1">
                <button type="button" data-testid="button-cancel" onClick={() => setIsCreating(false)}
                  className="flex-1 py-4 rounded-2xl font-display font-black text-lg bg-gray-100 text-gray-500 border-2 border-gray-200 shadow-[0_5px_0_#d1d5db] hover:-translate-y-0.5 hover:shadow-[0_7px_0_#d1d5db] active:translate-y-1 active:shadow-none transition-all">
                  Cancel
                </button>
                <button type="submit" data-testid="button-start" disabled={!newName.trim()}
                  className="flex-1 py-4 rounded-2xl font-display font-black text-lg bg-yellow-400 text-yellow-900 border-2 border-yellow-500 shadow-[0_7px_0_#B45309] hover:-translate-y-0.5 hover:shadow-[0_9px_0_#B45309] active:translate-y-1.5 active:shadow-[0_1px_0_#B45309] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2">
                  Let's Go! <Play fill="currentColor" size={18} />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </PageWrapper>
  );
}
