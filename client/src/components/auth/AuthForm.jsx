import { useState } from 'react'
import Button from '../common/Button'

const labelStyle = {
  display: 'block',
  color: '#1e5c2e',
  fontWeight: 700,
  fontSize: '0.8rem',
  marginBottom: '6px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontFamily: 'Nunito, sans-serif',
}

const inputStyle = {
  width: '100%',
  padding: '14px 18px',
  border: '2px solid #c3dfc9',
  borderRadius: '12px',
  fontSize: '1.05rem',
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 600,
  color: '#1a3d24',
  background: '#f4fbf6',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
}

function Field({ id, label, type, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={labelStyle} htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          ...inputStyle,
          borderColor: focused ? '#1e7a40' : '#c3dfc9',
          boxShadow: focused ? '0 0 0 3px rgba(30,122,64,0.15)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default function AuthForm() {
  const [username, setUsername] = useState('')
  const [passkey, setPasskey]   = useState('')
  const [email, setEmail]       = useState('')

  return (
    <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      <Field
        id="username"
        label="Username"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <Field
        id="passkey"
        label="Passkey"
        type="password"
        placeholder="Enter your passkey"
        value={passkey}
        onChange={e => setPasskey(e.target.value)}
      />
      <Field
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <div style={{ marginTop: '0.5rem' }}>
        <Button type="submit">Proceed</Button>
      </div>
    </form>
  )
}
