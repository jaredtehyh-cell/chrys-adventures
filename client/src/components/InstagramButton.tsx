import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@assets/chrysalis_logo_nobg.png';

const IG_URL = 'https://www.instagram.com/chs.chrysalisenterprise/';
const IG_HANDLE = '@chs.chrysalisenterprise';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export function InstagramButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed top-4 left-4 z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Button */}
      <a
        href={IG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-md hover:shadow-lg hover:border-purple-400 hover:scale-105 active:scale-95 transition-all text-purple-700 font-bold text-sm"
      >
        <InstagramIcon />
        <span className="hidden sm:inline">Our Instagram</span>
      </a>

      {/* Hover preview card */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className="absolute top-full mt-2 left-0 w-72 rounded-3xl overflow-hidden shadow-2xl border border-purple-100"
          >
            {/* Instagram gradient header */}
            <div
              className="h-20 w-full"
              style={{
                background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
              }}
            />

            {/* Profile info */}
            <div className="bg-white px-4 pb-4 pt-0 relative">
              {/* Logo avatar */}
              <div className="absolute -top-10 left-4 w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                <img
                  src={logo}
                  alt="Chrysalis Enterprise"
                  className="w-full h-full object-contain p-1"
                />
              </div>

              {/* Spacer for avatar overlap */}
              <div className="h-11" />

              <p className="font-black text-gray-900 text-base leading-tight">Chrysalis Enterprise</p>
              <p className="text-purple-600 font-semibold text-sm mt-0.5">{IG_HANDLE}</p>
              <p className="text-gray-500 text-xs mt-2 leading-snug">
                CHS · Chrysalis Enterprise — follow us on Instagram!
              </p>

              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
                }}
              >
                <InstagramIcon />
                View Profile
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
