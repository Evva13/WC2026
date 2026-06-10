import { useState } from 'react'
import { GROUPS, FLAGS, isGroupOpen } from '../data'
import { saveStandingPrediction } from '../db'
import GroupTabs from './GroupTabs'

const RANK_COLORS = ['#1a1a1a', '#4a4a4a', '#888', '#ccc']
const RANK_LABELS = [
  <span className="pill pill-g">Tur atlar</span>,
  <span className="pill pill-g">Tur atlar</span>,
  <span className="pill pill-o">Şansa bağlı</span>,
  <span className="pill pill-r">Elenir</span>,
]

export default function StandingsTab({ userId, standings, setStandings }) {
  const [activeGroup, setActiveGroup] = useState('A')
  const [saving, setSaving] = useState(false)
  const [savedOk, setSavedOk] = useState(false)

  const completedGroups = Object.keys(GROUPS).filter(g =>
    Object.keys(standings[g] || {}).length === 4
  )

  const handleSelect = (grp, rank, team) => {
    if (!isGroupOpen(grp)) return
    setStandings(prev => {
      const cur = { ...(prev[grp] || {}) }
      Object.keys(cur).forEach(r => { if (cur[r] === team) delete cur[r] })
      if (team) cur[rank] = team
      else delete cur[rank]
      return { ...prev, [grp]: cur }
    })
  }

  const handleSave = async () => {
    if (!isGroupOpen(activeGroup)) return
    setSaving(true)
    await saveStandingPrediction(userId, activeGroup, standings[activeGroup] || {})
    setSaving(false)
    setSavedOk(true)
    setTimeout(() => setSavedOk(false), 2000)
  }

  const groupOpen = isGroupOpen(activeGroup)
  const cur = standings[activeGroup] || {}
  const used = Object.values(cur)
  const teams = GROUPS[activeGroup]

  return (
    <div>
      {!groupOpen && (
        <div style={{ background: '#fceaea', border: '0.5px solid #f0b8b8', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#a32d2d', fontWeight: 500 }}>
          🔒 Bu grubun maçları başladı — sıralama tahmini değiştirilemez.
        </div>
      )}

      <div className="section-header">
        <div>
          <div className="section-title">Grup Sıralaması Tahmini</div>
          <div className="section-sub">İlk maç başlamadan 1 saat önce kilitlenir</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {savedOk && <span className="ok-msg">✓ Kaydedildi</span>}
          {groupOpen && (
            <button className="btn" onClick={handleSave} disabled={saving}>
              {saving ? 'Kaydediliyor…' : 'Kaydet'}
            </button>
          )}
        </div>
      </div>

      <GroupTabs active={activeGroup} onSelect={setActiveGroup} completedGroups={completedGroups} />

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Grup {activeGroup}</div>
        {[1, 2, 3, 4].map((rank, idx) => {
          const sel = cur[rank] || ''
          return (
            <div key={rank} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div className="rank-c" style={{ background: RANK_COLORS[idx] }}>{rank}</div>
              <div style={{ flex: 1 }}>
                <select value={sel} disabled={!groupOpen} onChange={e => handleSelect(activeGroup, rank, e.target.value)}>
                  <option value="">— Takım seç —</option>
                  {teams.map(t => (
                    <option key={t} value={t} disabled={used.includes(t) && t !== sel}>
                      {FLAGS[t]} {t}
                    </option>
                  ))}
                </select>
              </div>
              {RANK_LABELS[idx]}
            </div>
          )
        })}
      </div>

      <div className="meta-grid">
        {Object.keys(GROUPS).map(g => {
          const done = Object.keys(standings[g] || {}).length
          const open = isGroupOpen(g)
          return (
            <div key={g} className="meta-c" onClick={() => setActiveGroup(g)}
              style={{ borderColor: done === 4 ? '#b2d8b2' : undefined }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Grup {g}</div>
              <div style={{ fontSize: 11, color: done === 4 ? '#27ae60' : '#aaa', marginTop: 2 }}>
                {done}/4{done === 4 ? ' ✓' : ''}{!open ? ' 🔒' : ''}
              </div>
            </div>
          )
        })}
      </div>

      <p className="tip">
        1. veya 2. doğru bildir <b>+5 puan</b> · 3. veya 4. doğru bildir <b>+2 puan</b>
      </p>
    </div>
  )
}
