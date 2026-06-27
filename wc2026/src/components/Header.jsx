const WC_LOGO = 'https://assets.football-logos.cc/logos/tournaments/1500x1500/fifa-world-cup-2026.31d2489d.png'

const TABS = [
  { id: 'matches', label: 'Maçlar' },
  { id: 'standings', label: 'Sıralamalar' },
  { id: 'bracket', label: '🏆 Eleme' },
  { id: 'leaderboard', label: 'Puan Tablosu' },
]

export default function Header({ user, activeTab, onTab, onLogout }) {
  return (
    <div className="hdr">
      <div className="hdr-logo">
        <img src={WC_LOGO} alt="DK 2026" onError={e => { e.target.style.display = 'none' }} />
        <span>DK 2026</span>
      </div>

      <nav className="hdr-nav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab-btn${activeTab === t.id ? ' active' : ''}`}
            onClick={() => onTab(t.id)}
          >
            {t.label}
          </button>
        ))}
        {user?.isAdmin && (
          <button
            className={`tab-btn${activeTab === 'admin' ? ' active' : ''}`}
            onClick={() => onTab('admin')}
          >
            ⚙ Admin
          </button>
        )}
      </nav>

      <div className="hdr-user">
        <span style={{ fontSize: 12, color: '#666' }}>
          👤 <b>{user?.username}</b>
        </span>
        {!user?.isAdmin && (
          <span className="pill pill-p" style={{ fontSize: 12 }}>
            {user?.score || 0} puan
          </span>
        )}
        <button className="btn-outline" onClick={onLogout}>Çıkış</button>
      </div>
    </div>
  )
}
