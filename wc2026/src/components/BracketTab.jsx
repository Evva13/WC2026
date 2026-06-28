import { useState, useEffect } from 'react'
import {
  RO32_MATCHES, ROUND_LABELS, ROUND_ORDER,
  KNOCKOUT_ROUND_POINTS, CHAMPION_BONUS_POINTS,
  buildRo16FromWinners, buildQfFromWinners, buildSfFromWinners,
} from '../bracketData'
import { saveBracketPrediction } from '../db'
import { FLAGS } from '../data'

function isMatchLocked(kickoff) {
  if (!kickoff) return false
  const cutoff = new Date(new Date(kickoff).getTime() - 60 * 60 * 1000)
  return new Date() >= cutoff
}

function formatKickoff(isoStr) {
  if (!isoStr) return null
  const d = new Date(isoStr)
  return d.toLocaleString('tr-TR', {
    timeZone: 'Europe/Istanbul', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
  })
}

export default function BracketTab({ userId, bracketPreds, setBracketPreds }) {
  const [activeRound, setActiveRound] = useState('ro32')
  const [savedOk, setSavedOk] = useState(false)
  const [saving, setSaving] = useState(false)
  const [championPick, setChampionPick] = useState(bracketPreds?.champion || '')

  useEffect(() => {
    setChampionPick(bracketPreds?.champion || '')
  }, [bracketPreds?.champion])

  const winners = bracketPreds?.winners || {}

  const handlePick = (matchId, team, locked) => {
    if (locked || !team) return
    setBracketPreds(prev => ({
      ...prev,
      winners: { ...(prev.winners || {}), [matchId]: team }
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    await saveBracketPrediction(userId, bracketPreds)
    setSaving(false)
    setSavedOk(true)
    setTimeout(() => setSavedOk(false), 2000)
  }

  const handleChampionSave = async () => {
    setSaving(true)
    const updated = { ...bracketPreds, champion: championPick }
    setBracketPreds(updated)
    await saveBracketPrediction(userId, updated)
    setSaving(false)
    setSavedOk(true)
    setTimeout(() => setSavedOk(false), 2000)
  }

  const ro16Matches = buildRo16FromWinners(winners)
  const qfMatches = buildQfFromWinners(winners)
  const sfMatches = buildSfFromWinners(winners)

  const roundMatches = {
    ro32: RO32_MATCHES,
    ro16: ro16Matches,
    qf: qfMatches,
    sf: sfMatches,
    final: sfMatches.length ? [{ id: 'final_1', home: winners['sf_1'] || null, away: winners['sf_2'] || null }] : [],
    third: sfMatches.length ? [{ id: 'third_1', home: null, away: null, isThird: true }] : [],
  }

  const flag = (team) => team ? `${FLAGS[team] || ''} ${team}` : '— Belirlenecek —'

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">🏆 Eleme Aşaması Tahmini</div>
          <div className="section-sub">Her turda kazananı seç, finale ve şampiyona kadar ilerle</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {savedOk && <span className="ok-msg">✓ Kaydedildi</span>}
          <button className="btn" onClick={handleSave} disabled={saving}>
            {saving ? 'Kaydediliyor…' : 'Kaydet'}
          </button>
        </div>
      </div>

      <div className="grp-flex">
        {ROUND_ORDER.map(r => (
          <button
            key={r}
            className={`grp-btn${activeRound === r ? ' active' : ''}`}
            onClick={() => setActiveRound(r)}
          >
            {ROUND_LABELS[r]}
          </button>
        ))}
      </div>

      <div className="card">
        <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>
          {activeRound === 'ro32' && <>Her maç için kazanacağını düşündüğün takımı seç · Doğru bilirsen <b>+{KNOCKOUT_ROUND_POINTS.ro32} puan</b> · Maç başlamadan 1 saat önce kilitlenir</>}
          {activeRound === 'ro16' && <>Doğru bilirsen <b>+{KNOCKOUT_ROUND_POINTS.ro16} puan</b></>}
          {activeRound === 'qf' && <>Doğru bilirsen <b>+{KNOCKOUT_ROUND_POINTS.qf} puan</b></>}
          {activeRound === 'sf' && <>Doğru bilirsen <b>+{KNOCKOUT_ROUND_POINTS.sf} puan</b></>}
          {activeRound === 'final' && <>Finalisti doğru bilirsen <b>+{KNOCKOUT_ROUND_POINTS.final} puan</b></>}
          {activeRound === 'third' && <>3.lük maçı — bonus puan yok, sadece eğlence! 🎉</>}
        </div>

        {roundMatches[activeRound].length === 0 && (
          <div style={{ textAlign: 'center', padding: 30, color: '#aaa', fontSize: 13 }}>
            Bu tur, önceki turun galipleri belirlenince açılacak.
          </div>
        )}

        {roundMatches[activeRound].map(m => {
          const picked = winners[m.id]
          const locked = activeRound === 'ro32' ? isMatchLocked(m.kickoff) : false
          const kickoff = m.kickoff ? formatKickoff(m.kickoff) : null
          const bothKnown = m.home && m.away

          return (
            <div key={m.id} style={{ marginBottom: 14 }}>
              {kickoff && (
                <div style={{ fontSize: 11, color: locked ? '#aaa' : '#27ae60', textAlign: 'center', marginBottom: 4 }}>
                  {locked ? '🔒' : '🗓'} {kickoff}
                </div>
              )}
              <div className="match-row" style={{ borderBottom: 'none', padding: '4px 0' }}>
                <button
                  disabled={locked || !bothKnown}
                  onClick={() => handlePick(m.id, m.home, locked)}
                  style={{
                    flex: 1, padding: '10px 12px', borderRadius: 8,
                    border: picked === m.home ? '2px solid #1a1a1a' : '0.5px solid #d0d0c8',
                    background: picked === m.home ? '#1a1a1a' : '#fff',
                    color: picked === m.home ? '#fff' : bothKnown ? '#1a1a1a' : '#bbb',
                    fontWeight: 600, fontSize: 13, cursor: (locked || !bothKnown) ? 'default' : 'pointer'
                  }}
                >
                  {flag(m.home)}
                </button>
                <span style={{ color: '#bbb', fontSize: 12, padding: '0 8px' }}>vs</span>
                <button
                  disabled={locked || !bothKnown}
                  onClick={() => handlePick(m.id, m.away, locked)}
                  style={{
                    flex: 1, padding: '10px 12px', borderRadius: 8,
                    border: picked === m.away ? '2px solid #1a1a1a' : '0.5px solid #d0d0c8',
                    background: picked === m.away ? '#1a1a1a' : '#fff',
                    color: picked === m.away ? '#fff' : bothKnown ? '#1a1a1a' : '#bbb',
                    fontWeight: 600, fontSize: 13, cursor: (locked || !bothKnown) ? 'default' : 'pointer'
                  }}
                >
                  {flag(m.away)}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card" style={{ marginTop: 20, background: '#fafaf8' }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>
          🏆 Şampiyon Tahmini <span className="pill pill-gold">+{CHAMPION_BONUS_POINTS} bonus puan</span>
        </div>
        <p style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>
          Turnuvayı kazanacağını düşündüğün takımı yaz.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text" placeholder="Örn: Brezilya, Arjantin, Fransa..."
            value={championPick}
            onChange={e => setChampionPick(e.target.value)}
            style={{ flex: 1 }}
          />
          <button className="btn" onClick={handleChampionSave} disabled={saving}>
            Kaydet
          </button>
        </div>
      </div>

      <p className="tip">
        Son 32: +{KNOCKOUT_ROUND_POINTS.ro32}p · Son 16: +{KNOCKOUT_ROUND_POINTS.ro16}p · Çeyrek: +{KNOCKOUT_ROUND_POINTS.qf}p ·
        Yarı: +{KNOCKOUT_ROUND_POINTS.sf}p · Final: +{KNOCKOUT_ROUND_POINTS.final}p · Şampiyon: +{CHAMPION_BONUS_POINTS}p
      </p>
    </div>
  )
}
