import { useState, useCallback } from 'react'
import { GROUPS, FLAGS, getGroupMatches, getAllMatches, calcMatchPoints } from '../data'
import { saveMatchPrediction } from '../db'
import GroupTabs from './GroupTabs'

function resultPill(pred, result) {
  if (!result) {
    if (pred?.home == null || pred?.away == null || pred.home === '' || pred.away === '') return null
    const h = parseInt(pred.home), a = parseInt(pred.away)
    if (h > a) return <span className="pill pill-g">{/* winner shown outside */}</span>
    return null
  }
  const pts = calcMatchPoints(pred, result)
  if (pts === 5) return <span className="pill pill-g">+5 ✓</span>
  if (pts === 3) return <span className="pill pill-b">+3</span>
  if (pts === 0) return <span className="pill pill-r">0</span>
  return null
}

export default function MatchesTab({ userId, predictions, setPredictions, results }) {
  const [activeGroup, setActiveGroup] = useState('A')
  const [saving, setSaving] = useState(false)
  const [savedOk, setSavedOk] = useState(false)

  const allMatches = getAllMatches()
  const enteredCount = allMatches.filter(({ key }) => {
    const p = predictions[key]
    return p?.home != null && p?.away != null && p.home !== '' && p.away !== ''
  }).length

  const completedGroups = Object.keys(GROUPS).filter(g =>
    getGroupMatches(g).every(([h, a]) => {
      const p = predictions[`${h}_${a}`]
      return p?.home != null && p?.away != null && p.home !== '' && p.away !== ''
    })
  )

  const handleChange = useCallback((key, side, val) => {
    const v = val === '' ? '' : parseInt(val)
    if (val !== '' && (isNaN(v) || v < 0 || v > 30)) return
    setPredictions(prev => ({
      ...prev,
      [key]: { ...(prev[key] || {}), [side]: val === '' ? '' : v }
    }))
  }, [setPredictions])

  const handleSave = async () => {
    setSaving(true)
    const matches = getGroupMatches(activeGroup)
    await Promise.all(
      matches.map(([home, away]) => {
        const key = `${home}_${away}`
        const p = predictions[key] || {}
        if (p.home != null && p.away != null && p.home !== '' && p.away !== '') {
          return saveMatchPrediction(userId, key, parseInt(p.home), parseInt(p.away))
        }
        return Promise.resolve()
      })
    )
    setSaving(false)
    setSavedOk(true)
    setTimeout(() => setSavedOk(false), 2000)
  }

  const matches = getGroupMatches(activeGroup)

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">Maç Tahminleri</div>
          <div className="section-sub">Her maç için skoru gir, sonuçlar açıklandıkça puanlar gelir</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {savedOk && <span className="ok-msg">✓ Kaydedildi</span>}
          <button className="btn" onClick={handleSave} disabled={saving}>
            {saving ? 'Kaydediliyor…' : 'Kaydet'}
          </button>
        </div>
      </div>

      <GroupTabs active={activeGroup} onSelect={setActiveGroup} completedGroups={completedGroups} />

      {/* Group label */}
      <div style={{ fontSize: 13, color: '#888', marginBottom: 10, lineHeight: 1.7 }}>
        <b style={{ color: '#1a1a1a' }}>Grup {activeGroup}: </b>
        {GROUPS[activeGroup].map(t => `${FLAGS[t]} ${t}`).join('  ·  ')}
      </div>

      <div className="card">
        <div style={{ fontSize: 11, color: '#bbb', textAlign: 'right', marginBottom: 8 }}>
          Ev sahibi — Skor — Deplasman
        </div>
        {matches.map(([home, away]) => {
          const key = `${home}_${away}`
          const pred = predictions[key] || {}
          const result = results[key]
          const hv = pred.home != null ? pred.home : ''
          const av = pred.away != null ? pred.away : ''
          const locked = !!result

          // outcome pill
          let outcomePill = null
          if (!locked && hv !== '' && av !== '') {
            const h = parseInt(hv), a = parseInt(av)
            if (h > a) outcomePill = <span className="pill pill-g">{home.split(' ')[0]}</span>
            else if (h < a) outcomePill = <span className="pill pill-r">{away.split(' ')[0]}</span>
            else outcomePill = <span className="pill">Beraberlik</span>
          }
          const ptsPill = locked ? resultPill(pred, result) : null

          return (
            <div key={key} className="match-row">
              <span className="match-team right">{FLAGS[home]} {home}</span>
              <input
                className={`num-in${locked ? ' locked' : ''}`}
                type="number" min="0" max="30" placeholder="–"
                value={hv} readOnly={locked}
                onChange={e => handleChange(key, 'home', e.target.value)}
              />
              <span style={{ color: '#ccc', fontSize: 20, fontWeight: 300, flexShrink: 0 }}>:</span>
              <input
                className={`num-in${locked ? ' locked' : ''}`}
                type="number" min="0" max="30" placeholder="–"
                value={av} readOnly={locked}
                onChange={e => handleChange(key, 'away', e.target.value)}
              />
              <span className="match-team">{FLAGS[away]} {away}</span>
              <span style={{ minWidth: 90, textAlign: 'right' }}>
                {outcomePill}
                {ptsPill}
                {locked && (
                  <span style={{ fontSize: 11, color: '#aaa', marginLeft: 4 }}>
                    ⚽ {result.home}:{result.away}
                  </span>
                )}
              </span>
            </div>
          )
        })}
      </div>

      {/* Progress */}
      <div className="progress-wrap">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${Math.round(enteredCount / 72 * 100)}%` }} />
        </div>
        <span style={{ fontSize: 12, color: '#888', whiteSpace: 'nowrap' }}>
          {enteredCount}/72 maç girildi
        </span>
      </div>

      <p className="tip">
        Tam skor bildir <b>+5 puan</b> · Doğru sonuç (galibiyet/beraberlik) <b>+3 puan</b>
      </p>
    </div>
  )
}
