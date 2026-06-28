import { useState } from 'react'
import { GROUPS, FLAGS, getGroupMatches, FINAL_STANDINGS, calcStandingPoints } from '../data'
import { saveResult, supabase } from '../db'
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
    try {
      const { error } = await supabase.from('users').select('id').limit(1)
      if (error) throw error

      // Direkt SQL ile tüm puanları hesapla
      const { data: allUsers } = await supabase.from('users').select('id')
      for (const user of allUsers || []) {
        const { data: preds } = await supabase
          .from('match_predictions')
          .select('match_key, home_score, away_score')
          .eq('user_id', user.id)

        const { data: standPreds } = await supabase
          .from('standing_predictions')
          .select('grp, rank1, rank2, rank3, rank4')
          .eq('user_id', user.id)

        const { data: results } = await supabase
          .from('match_results')
          .select('match_key, home_score, away_score')

        const resultsMap = {}
        ;(results || []).forEach(r => { resultsMap[r.match_key] = r })

        let score = 0

        // Maç tahmini puanları
        ;(preds || []).forEach(p => {
          const r = resultsMap[p.match_key]
          if (!r || p.home_score == null || p.away_score == null) return
          if (p.home_score === r.home_score && p.away_score === r.away_score) {
            score += 5
          } else {
            const pw = p.home_score > p.away_score ? 'h' : p.home_score < p.away_score ? 'a' : 'd'
            const rw = r.home_score > r.away_score ? 'h' : r.home_score < r.away_score ? 'a' : 'd'
            if (pw === rw) score += 3
          }
        })

        // Grup sıralaması tahmini puanları
        ;(standPreds || []).forEach(sp => {
          const actual = FINAL_STANDINGS[sp.grp]
          if (!actual) return
          const pred = { 1: sp.rank1, 2: sp.rank2, 3: sp.rank3, 4: sp.rank4 }
          score += calcStandingPoints(pred, actual)
        })

        await supabase.from('users').update({ score }).eq('id', user.id)
      }
      setCalcMsg('✓ Tüm puanlar güncellendi! (maç + grup sıralaması)')
    } catch (e) {
      setCalcMsg('Hata: ' + e.message)
    }
    setSaving(false)
    setTimeout(() => setCalcMsg(''), 4000)
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

      <div className="card" style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>📋 Kesin Grup Sıralamaları (referans)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
          {Object.entries(FINAL_STANDINGS).map(([g, st]) => (
            <div key={g} style={{ fontSize: 11, color: '#666' }}>
              <b style={{ color: '#1a1a1a' }}>Grup {g}</b><br />
              1. {st[1]}<br />2. {st[2]}<br />3. {st[3]}<br />4. {st[4]}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
