export default function MonkeyDecor({ src, size = 'large' }) {
  const sizeClass = size === 'large' ? 'text-[9rem]' : 'text-[5rem]'

  if (src) {
    return (
      <img
        src={src}
        alt="Chrys the monkey"
        className="w-44 h-44 object-contain"
        style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.45))' }}
      />
    )
  }

  return (
    <div
      className={`${sizeClass} leading-none select-none animate-float`}
      style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.45))' }}
    >
      🐒
    </div>
  )
}
