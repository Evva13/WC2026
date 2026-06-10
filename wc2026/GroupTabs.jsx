import { useState } from 'react'
import { login, register } from '../db'

const WC_LOGO = 'https://assets.football-logos.cc/logos/tournaments/1500x1500/fifa-world-cup-2026.31d2489d.png'

export default function LoginPage({ onLogin }) {
  const [isReg, setIsReg] = useState(false)
  const [form, setForm] = useState({ username: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    setError('')
    const { username, password, confirm } = form
    if (!username.trim() || !password) { setError('Tüm alanları doldur.'); return }
    if (isReg && password !== confirm) { setError('Şifreler eşleşmiyor.'); return }
    setLoading(true)
    const fn = isReg ? register : login
    const { user, error: err } = await fn(username.trim(), password)
    setLoading(false)
    if (err) { setError(err); return }
    onLogin(user)
  }

  const onKey = (e) => e.key === 'Enter' && handleSubmit()

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <img
            src={WC_LOGO}
            alt="FIFA World Cup 2026"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
          />
          <div style={{ display: 'none', fontSize: 64 }}>🏆</div>
          <h1 style={{ fontSize: 21, fontWeight: 700, marginBottom: 4 }}>Dünya Kupası 2026</h1>
          <p style={{ color: '#888', fontSize: 13 }}>Tahmin Yarışması</p>
        </div>

        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
            {isReg ? 'Kayıt Ol' : 'Giriş Yap'}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              type="text" placeholder="Kullanıcı adı"
              value={form.username} onChange={set('username')} onKeyDown={onKey}
              autoComplete="username"
            />
            <input
              type="password" placeholder="Şifre"
              value={form.password} onChange={set('password')} onKeyDown={onKey}
              autoComplete={isReg ? 'new-password' : 'current-password'}
            />
            {isReg && (
              <input
                type="password" placeholder="Şifre tekrar"
                value={form.confirm} onChange={set('confirm')} onKeyDown={onKey}
                autoComplete="new-password"
              />
            )}
            {error && <p className="error-msg">{error}</p>}
            <button
              className="btn" style={{ width: '100%', marginTop: 4 }}
              onClick={handleSubmit} disabled={loading}
            >
              {loading ? 'Bekle…' : isReg ? 'Kayıt Ol' : 'Giriş Yap'}
            </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: '#888' }}>
            {isReg ? 'Zaten hesabın var mı?' : 'Hesabın yok mu?'}{' '}
            <span
              style={{ color: '#1a1a1a', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => { setIsReg(!isReg); setError('') }}
            >
              {isReg ? 'Giriş yap' : 'Kayıt ol'}
            </span>
          </p>

          {isReg && (
            <p style={{ fontSize: 11, color: '#bbb', textAlign: 'center', marginTop: 10 }}>
              Admin paneli için kullanıcı adı olarak <b>admin</b> gir
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
