import MonkeyDecor from '../common/MonkeyDecor'
import JungleDecor from '../common/JungleDecor'
import AuthForm from './AuthForm'

const jungleBg = [
  'radial-gradient(ellipse at 18% 28%, rgba(255, 220, 80, 0.07) 0%, transparent 45%)',
  'radial-gradient(ellipse at 82% 72%, rgba(255, 220, 80, 0.05) 0%, transparent 40%)',
  'linear-gradient(155deg, #092e15 0%, #0f4a24 22%, #165e2e 45%, #1e7a40 68%, #2d9958 88%, #3daa6a 100%)',
].join(', ')

export default function AuthPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: jungleBg }}
    >
      <JungleDecor />

      <div className="relative z-10 flex flex-col items-center w-full px-4 py-10">

        <MonkeyDecor />

        <h1
          className="mt-4 mb-2 text-4xl md:text-5xl font-black text-center"
          style={{
            color: '#ffffff',
            fontFamily: 'Nunito, sans-serif',
            textShadow: '0 2px 16px rgba(0,0,0,0.55)',
            letterSpacing: '-0.01em',
          }}
        >
          Chrys's Adventures
        </h1>

        <p
          className="mb-8 text-base md:text-lg font-semibold text-center"
          style={{ color: 'rgba(180, 230, 195, 0.92)', letterSpacing: '0.01em' }}
        >
          Count and learn with Chrys the monkey! 🌿
        </p>

        {/* Auth card */}
        <div
          className="w-full max-w-md"
          style={{
            background: '#fefcf7',
            borderRadius: '24px',
            boxShadow: '0 30px 70px rgba(0,0,0,0.5), 0 8px 28px rgba(9,46,21,0.35)',
            overflow: 'hidden',
          }}
        >
          {/* Top accent bar */}
          <div style={{
            height: '6px',
            background: 'linear-gradient(90deg, #092e15 0%, #2d9958 45%, #3daa6a 55%, #092e15 100%)',
          }} />

          <div style={{ padding: '2.25rem 2.5rem 2.5rem' }}>
            <p
              className="text-center font-extrabold mb-6"
              style={{
                color: '#0f4a24',
                fontSize: '1.35rem',
                fontFamily: 'Nunito, sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              Welcome, Explorer! 🐒
            </p>

            <AuthForm />
          </div>
        </div>

        <p
          className="mt-5 text-sm font-medium text-center"
          style={{ color: 'rgba(180, 230, 195, 0.7)' }}
        >
          🗝️ Your passkey is provided by your teacher
        </p>

      </div>
    </div>
  )
}
