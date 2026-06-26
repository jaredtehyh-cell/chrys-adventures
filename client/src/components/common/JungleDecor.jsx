const items = [
  { top: '-2%',  left: '-2%',  emoji: '🌿', size: '10rem', rotate: '20deg',  opacity: 0.9  },
  { top: '4%',   left: '2%',   emoji: '🍃', size: '5.5rem', rotate: '-8deg', opacity: 0.75 },
  { top: '12%',  left: '-1%',  emoji: '🌿', size: '6.5rem', rotate: '55deg', opacity: 0.65 },

  { top: '-2%',  right: '-2%', emoji: '🌿', size: '10rem', rotate: '-20deg', opacity: 0.9  },
  { top: '4%',   right: '2%',  emoji: '🍃', size: '5.5rem', rotate: '8deg',  opacity: 0.75 },
  { top: '12%',  right: '-1%', emoji: '🌿', size: '6.5rem', rotate: '-55deg',opacity: 0.65 },

  { bottom: '-2%', left: '-2%',  emoji: '🌿', size: '9rem', rotate: '-18deg', opacity: 0.85 },
  { bottom: '5%',  left: '1%',   emoji: '🍃', size: '5rem', rotate: '12deg',  opacity: 0.65 },

  { bottom: '-2%', right: '-2%', emoji: '🌿', size: '9rem', rotate: '18deg',  opacity: 0.85 },
  { bottom: '5%',  right: '1%',  emoji: '🍃', size: '5rem', rotate: '-12deg', opacity: 0.65 },

  { top: '36%',  left: '-3%',  emoji: '🌿', size: '7rem', rotate: '12deg',  opacity: 0.55 },
  { top: '56%',  left: '-1%',  emoji: '🍃', size: '4rem', rotate: '-6deg',  opacity: 0.5  },
  { top: '36%',  right: '-3%', emoji: '🌿', size: '7rem', rotate: '-12deg', opacity: 0.55 },
  { top: '56%',  right: '-1%', emoji: '🍃', size: '4rem', rotate: '6deg',   opacity: 0.5  },

  { top: '20%',    left: '7%',   emoji: '🍌', size: '2.5rem', rotate: '-18deg', opacity: 0.45 },
  { top: '24%',    right: '7%',  emoji: '🍌', size: '2rem',   rotate: '22deg',  opacity: 0.4  },
  { bottom: '18%', left: '9%',   emoji: '🍌', size: '2rem',   rotate: '10deg',  opacity: 0.4  },
  { bottom: '22%', right: '8%',  emoji: '🍌', size: '2.5rem', rotate: '-14deg', opacity: 0.45 },
]

export default function JungleDecor() {
  return (
    <>
      {items.map((item, i) => (
        <span
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            fontSize: item.size,
            transform: `rotate(${item.rotate})`,
            opacity: item.opacity,
            lineHeight: 1,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </>
  )
}
