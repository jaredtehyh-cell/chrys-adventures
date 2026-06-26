const bananas = [
  { top: '8%',  left: '3%',  size: '4rem',  rotate: '-20deg', opacity: 0.85 },
  { top: '25%', left: '1%',  size: '3rem',  rotate: '15deg',  opacity: 0.7  },
  { top: '55%', left: '4%',  size: '5rem',  rotate: '-10deg', opacity: 0.9  },
  { top: '75%', left: '2%',  size: '3.5rem',rotate: '25deg',  opacity: 0.75 },
  { top: '90%', left: '6%',  size: '4rem',  rotate: '-30deg', opacity: 0.8  },
  { top: '8%',  right: '3%', size: '4rem',  rotate: '20deg',  opacity: 0.85 },
  { top: '30%', right: '1%', size: '3.5rem',rotate: '-15deg', opacity: 0.7  },
  { top: '50%', right: '4%', size: '5rem',  rotate: '10deg',  opacity: 0.9  },
  { top: '70%', right: '2%', size: '3rem',  rotate: '-25deg', opacity: 0.75 },
  { top: '88%', right: '5%', size: '4.5rem',rotate: '35deg',  opacity: 0.8  },
]

export default function BananaDecor() {
  return (
    <>
      {bananas.map((b, i) => (
        <span
          key={i}
          className="fixed pointer-events-none select-none"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            fontSize: b.size,
            transform: `rotate(${b.rotate})`,
            opacity: b.opacity,
            lineHeight: 1,
          }}
        >
          🍌
        </span>
      ))}
    </>
  )
}
