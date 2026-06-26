import { useState } from 'react'

export default function Button({ children, onClick, type = 'button', disabled = false }) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: '100%',
        padding: '15px 24px',
        background: disabled
          ? '#a0b8a8'
          : 'linear-gradient(135deg, #28a85c 0%, #1a7340 55%, #0f4d28 100%)',
        color: '#ffffff',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 800,
        fontSize: '1.1rem',
        borderRadius: '14px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled
          ? 'none'
          : hovered
            ? '0 10px 28px rgba(15,77,40,0.55)'
            : '0 5px 18px rgba(15,77,40,0.4)',
        transform: pressed ? 'translateY(1px) scale(0.985)' : hovered ? 'translateY(-2px)' : 'none',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        letterSpacing: '0.03em',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  )
}
