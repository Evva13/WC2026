import { useState, useCallback } from 'react'
import { GROUPS, FLAGS, getGroupMatches, getAllMatches, calcMatchPoints, isMatchOpen, MATCH_TIMES } from '../data'
import { saveMatchPrediction } from '../db'
import GroupTabs from './GroupTabs'

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
        if (isMatchOpen(home, away) && p.home != null && p.away != null && p.home !== '' && p.away !== '') {
          return saveMatchPrediction(userId, key, parseInt(p.home), parseInt(p.away))
        }
        return Promise.resolve()
      })
    )
    setSaving(false)
    setSavedOk(true)
    setTimeout(() => setSavedOk(false), 2000)
  }

  // Türkiye saatiyle kickoff göster
  const formatKickoff = (isoStr) => {
    if (!isoStr) return null
    const d = new Date(isoStr)
    return d.toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const matches = getGroupMatches(activeGroup)
  const groupHasOpenMatch = matches.some(([h, a]) => isMatchOpen(h, a))

  return (
    <div>
      <div style={{ background: '#e6f1fb', border: '0.5px solid #b2d0f0', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#185fa5', lineHeight: 1.6 }}>
        ⏰ <b>Hatırlatma:</b> Her maç başlamadan <b>1 saat önce</b> o maçın tahmini otomatik kilitlenir. Tahminlerini zamanında gir!
      </div>

      {!groupHasOpenMatch && (
        <div style={{ background: '#fceaea', border: '0.5px solid #f0b8b8', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#a32d2d', fontWeight: 500 }}>
          🔒 Bu grubun tüm maçları başladı — tahmin girilemez.
        </div>
      )}

      <div className="section-header">
        <div>
          <div className="section-title">Maç Tahminleri</div>
          <div className="section-sub">Her maç için skoru gir, maç başlamadan 1 saat önce kilitlenir</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {savedOk && <span className="ok-msg">✓ Kaydedildi</span>}
          {groupHasOpenMatch && (
            <button className="btn" onClick={handleSave} disabled={saving}>
              {saving ? 'Kaydediliyor…' : 'Kaydet'}
            </button>
          )}
        </div>
      </div>

      <GroupTabs active={activeGroup} onSelect={setActiveGroup} completedGroups={completedGroups} />

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
          const open = isMatchOpen(home, away)
          const locked = !!result || !open
          const hv = pred.home != null ? pred.home : ''
          const av = pred.away != null ? pred.away : ''
          const kickoff = formatKickoff(MATCH_TIMES[key])

          let outcomePill = null
          if (!result && hv !== '' && av !== '') {
            const h = parseInt(hv), a = parseInt(av)
            if (h > a) outcomePill = <span className="pill pill-g">{home.split(' ')[0]}</span>
            else if (h < a) outcomePill = <span className="pill pill-r">{away.split(' ')[0]}</span>
            else outcomePill = <span className="pill">Beraberlik</span>
          }

          let ptsPill = null
          if (result && hv !== '') {
            const pts = calcMatchPoints(pred, result)
            if (pts === 5) ptsPill = <span className="pill pill-g">+5 ✓</span>
            else if (pts === 3) ptsPill = <span className="pill pill-b">+3</span>
            else if (pts === 0) ptsPill = <span className="pill pill-r">0p</span>
          }

          return (
            <div key={key} className="match-row">
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div className="match-team right">{FLAGS[home]} {home}</div>
                {kickoff && !result && (
                  <div style={{ fontSize: 10, color: open ? '#27ae60' : '#e07000', marginTop: 1 }}>
                    {open ? `⏰ ${kickoff}` : `🔒 ${kickoff}`}
                  </div>
                )}
              </div>
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
              <div style={{ flex: 1 }}>
                <div className="match-team">{FLAGS[away]} {away}</div>
              </div>
              <span style={{ minWidth: 90, textAlign: 'right' }}>
                {outcomePill}
                {ptsPill}
                {result && (
                  <span style={{ fontSize: 11, color: '#aaa', marginLeft: 4 }}>
                    ⚽ {result.home}:{result.away}
                  </span>
                )}
              </span>
            </div>
          )
        })}
      </div>

      <div className="progress-wrap">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${Math.round(enteredCount / 72 * 100)}%` }} />
        </div>
        <span style={{ fontSize: 12, color: '#888', whiteSpace: 'nowrap' }}>
          {enteredCount}/72 maç girildi
        </span>
      </div>

      <p className="tip">
        Tam skor <b>+5 puan</b> · Doğru sonuç <b>+3 puan</b> · Her maç başlamadan <b>1 saat önce</b> kilitlenir
      </p>
    </div>
  )
}
