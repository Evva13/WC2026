import { useState } from 'react'
import { GROUPS, FLAGS, getGroupMatches, calcMatchPoints } from '../data'
import { saveResult, loadLeaderboard, updateAllScores } from '../db'
import GroupTabs from './GroupTabs'

export default function AdminTab({ results, setResults }) {
  const [activeGroup, setActiveGroup] = useState('A')
  const [saving, setSaving] = useState(false)
  const [calcMsg, setCalcMsg] = useState('')

  const handleResult = async (key, side, val) => {
    const v = val === '' ? null : parseInt(val)
    if (val !== '' && (isNaN(v) || v < 0)) return
    const updated = { ...(results[key] || {}) }
    if (v == null) delete updated[side]
    else updated[side] = v
    setResults(prev => ({ ...prev, [key]: updated }))
    if (updated.home != null && updated.away != null) {
      await saveResult(key, updated.home, updated.away)
    }
  }

  const handleCalcAll = async () => {
    setSaving(true)
    setCalcMsg('')
    await updateAllScores(results, calcMatchPoints, () => 0)
    setSaving(false)
    setCalcMsg('✓ Tüm puanlar güncellendi!')
    setTimeout(() => setCalcMsg(''), 3000)
  }

  const enteredCount = Object.values(results).filter(r => r.home != null && r.away != null).length
  const matches = getGroupMatches(activeGroup)

  const groupsWithResults = Object.keys(GROUPS).filter(g =>
    getGroupMatches(g).some(([h, a]) => {
      const r = results[`${h}_${a}`]
      return r?.home != null && r?.away != null
    })
  )

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">Admin Paneli</div>
          <div className="section-sub">
            Maç sonuçlarını gir → Puanları Hesapla → Kullanıcı puanları güncellenir
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {calcMsg && <span className="ok-msg">{calcMsg}</span>}
          <button className="btn" onClick={handleCalcAll} disabled={saving}>
            {saving ? 'Hesaplanıyor…' : '⚡ Puanları Hesapla'}
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div className="card card-sm" style={{ flex: 1, minWidth: 120, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{enteredCount}</div>
          <div style={{ fontSize: 12, color: '#888' }}>/ 72 sonuç girildi</div>
        </div>
        <div className="card card-sm" style={{ flex: 1, minWidth: 120, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{groupsWithResults.length}</div>
          <div style={{ fontSize: 12, color: '#888' }}>/ 12 grup başladı</div>
        </div>
      </div>

      <GroupTabs active={activeGroup} onSelect={setActiveGroup} completedGroups={groupsWithResults} />

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: '#888' }}>
          Grup {activeGroup} — Gerçek Sonuçlar
        </div>
        {matches.map(([home, away]) => {
          const key = `${home}_${away}`
          const r = results[key] || {}
          const isEntered = r.home != null && r.away != null

          return (
            <div key={key} className="match-row">
              <span className="match-team right">{FLAGS[home]} {home}</span>
              <input
                className={`num-in${isEntered ? ' locked' : ''}`}
                type="number" min="0" max="30" placeholder="–"
                value={r.home != null ? r.home : ''}
                onChange={e => handleResult(key, 'home', e.target.value)}
              />
              <span style={{ color: '#ccc', fontSize: 20, fontWeight: 300, flexShrink: 0 }}>:</span>
              <input
                className={`num-in${isEntered ? ' locked' : ''}`}
                type="number" min="0" max="30" placeholder="–"
                value={r.away != null ? r.away : ''}
                onChange={e => handleResult(key, 'away', e.target.value)}
              />
              <span className="match-team">{FLAGS[away]} {away}</span>
              <span style={{ minWidth: 80, textAlign: 'right' }}>
                {isEntered
                  ? <span className="pill pill-g">✓ Girildi</span>
                  : <span className="pill" style={{ color: '#bbb' }}>Bekliyor</span>
                }
              </span>
            </div>
          )
        })}
      </div>

      <div className="card" style={{ marginTop: 20, background: '#fafaf8' }}>
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>
          <b>Puan sistemi:</b><br />
          Tam skor <b>+5 puan</b> · Doğru sonuç (kazanan/beraberlik) <b>+3 puan</b><br />
          Grup sıralaması 1. veya 2. doğru <b>+5 puan</b> · 3. veya 4. doğru <b>+2 puan</b>
        </p>
      </div>
    </div>
  )
}
