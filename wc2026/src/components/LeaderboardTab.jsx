import { useState, useEffect } from 'react'
import { loadLeaderboard } from '../db'

const MEDALS = ['🥇', '🥈', '🥉']
const BG = ['#c9a227', '#9e9e9e', '#a0522d']

export default function LeaderboardTab({ currentUser }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatedAt, setUpdatedAt] = useState(null)

  const load = async () => {
    setLoading(true)
    const data = await loadLeaderboard()
    setRows(data)
    setLoading(false)
    setUpdatedAt(new Date())
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">Puan Tablosu</div>
          {updatedAt && (
            <div className="section-sub">
              Son güncelleme: {updatedAt.toLocaleTimeString('tr-TR')}
            </div>
          )}
        </div>
        <button className="btn-outline" onClick={load}>↻ Yenile</button>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading">Yükleniyor…</div>
        ) : rows.length === 0 ? (
          <div className="loading">Henüz kayıtlı katılımcı yok.</div>
        ) : (
          <>
            {/* Admin en üstte sabit */}
            {rows.filter(r => r.isAdmin).map(row => (
              <div key={row.username} className="lb-row" style={{ background: '#fafaf8', borderRadius: 8, padding: '4px 0' }}>
                <div className="rank-c" style={{ background: '#1a1a1a', color: '#fff' }}>⚙</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {row.username}
                    {row.username === currentUser?.username && <span className="pill pill-p">Sen</span>}
                    <span className="pill" style={{ background: '#1a1a1a', color: '#fff' }}>Yönetici</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1 }}>{row.score}</div>
                  <div style={{ fontSize: 11, color: '#aaa' }}>puan</div>
                </div>
              </div>
            ))}
            {/* Normal kullanıcılar */}
            {rows.filter(r => !r.isAdmin).map((row, i) => {
              const isMe = row.username === currentUser?.username
              return (
                <div key={row.username} className="lb-row">
                  <div className="rank-c" style={{ background: i < 3 ? BG[i] : '#e0e0d8', color: i < 3 ? '#fff' : '#888' }}>
                    {i < 3 ? MEDALS[i] : i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                      {row.username}
                      {isMe && <span className="pill pill-p">Sen</span>}
                    </div>
                    <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>
                      {row.matchCount != null ? `${row.matchCount}/72 maç` : ''}{' '}
                      {row.standCount != null ? `· ${row.standCount}/12 grup sıralaması` : ''}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1 }}>{row.score}</div>
                    <div style={{ fontSize: 11, color: '#aaa' }}>puan</div>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>

      <p className="tip" style={{ textAlign: 'center', marginTop: 10 }}>
        Admin maç sonuçlarını girdikçe puanlar otomatik güncellenir
      </p>
    </div>
  )
}
