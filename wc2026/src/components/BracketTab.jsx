import { useState, useEffect } from 'react'
import { RO32_MATCHES, ROUND_LABELS, ROUND_ORDER, KNOCKOUT_ROUND_POINTS, CHAMPION_BONUS_POINTS } from '../bracketData'
import { saveBracketPrediction } from '../db'

export default function BracketTab({ userId, bracketPreds, setBracketPreds, bracketResults, locked }) {
  const [activeRound, setActiveRound] = useState('ro32')
  const [savedOk, setSavedOk] = useState(false)
  const [saving, setSaving] = useState(false)
  const [championPick, setChampionPick] = useState(bracketPreds?.champion || '')

  useEffect(() => {
    setChampionPick(bracketPreds?.champion || '')
  }, [bracketPreds?.champion])

  // Round of 32 takım isimleri henüz netleşmemişse uyarı göster
  const bracketReady = RO32_MATCHES.every(m => !m.home.match(/^\d/) || bracketResults?.teamsAssigned)

  const handlePick = (matchId, team) => {
    if (locked) return
    setBracketPreds(prev => ({
      ...prev,
      winners: { ...(prev.winners || {}), [matchId]: team }
    }))
  }

  const handleSaveRound = async () => {
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

  if (!bracketReady) {
    return (
      <div>
        <div className="section-header">
          <div>
            <div className="section-title">Eleme Aşaması Tahmini</div>
            <div className="section-sub">Son 32 turu kazananları tahmin et, finale kadar git!</div>
          </div>
        </div>
        <div style={{ background: '#faeeda', border: '0.5px solid #e8c98a', borderRadius: 10, padding: '16px 18px', fontSize: 14, color: '#7a4e00', lineHeight: 1.7 }}>
          ⏳ <b>Grup aşaması henüz tamamlanmadı.</b><br />
          Son 32 takım netleştiğinde (grup maçları bitince) buradan eleme tahminlerini girebileceksin. Az kaldı, biraz sabret! ⚽
        </div>
      </div>
    )
  }

  const winners = bracketPreds?.winners || {}

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">Eleme Aşaması Tahmini</div>
          <div className="section-sub">Her turda kazananı seç, finale ve şampiyona kadar ilerle</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {savedOk && <span className="ok-msg">✓ Kaydedildi</span>}
          {!locked && (
            <button className="btn" onClick={handleSaveRound} disabled={saving}>
              {saving ? 'Kaydediliyor…' : 'Kaydet'}
            </button>
          )}
        </div>
      </div>

      {locked && (
        <div style={{ background: '#fceaea', border: '0.5px solid #f0b8b8', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#a32d2d', fontWeight: 500 }}>
          🔒 Eleme aşaması başladı — tahminler kilitlendi.
        </div>
      )}

      {/* Tur sekmeleri */}
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

      {/* Son 32 maçları */}
      {activeRound === 'ro32' && (
        <div className="card">
          <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>
            Her maç için kazanacağını düşündüğün takımı seç · Doğru bilirsen <b>+{KNOCKOUT_ROUND_POINTS.ro32} puan</b>
          </div>
          {RO32_MATCHES.map(m => {
            const picked = winners[m.id]
            return (
              <div key={m.id} className="match-row">
                <button
                  disabled={locked}
                  onClick={() => handlePick(m.id, m.home)}
                  style={{
                    flex: 1, padding: '8px 12px', borderRadius: 8, border: picked === m.home ? '2px solid #1a1a1a' : '0.5px solid #d0d0c8',
                    background: picked === m.home ? '#1a1a1a' : '#fff', color: picked === m.home ? '#fff' : '#1a1a1a',
                    fontWeight: 600, fontSize: 13, cursor: locked ? 'default' : 'pointer'
                  }}
                >
                  {m.home}
                </button>
                <span style={{ color: '#bbb', fontSize: 12, padding: '0 8px' }}>vs</span>
                <button
                  disabled={locked}
                  onClick={() => handlePick(m.id, m.away)}
                  style={{
                    flex: 1, padding: '8px 12px', borderRadius: 8, border: picked === m.away ? '2px solid #1a1a1a' : '0.5px solid #d0d0c8',
                    background: picked === m.away ? '#1a1a1a' : '#fff', color: picked === m.away ? '#fff' : '#1a1a1a',
                    fontWeight: 600, fontSize: 13, cursor: locked ? 'default' : 'pointer'
                  }}
                >
                  {m.away}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Diğer turlar - galip belirlendikçe açılır */}
      {activeRound !== 'ro32' && (
        <div className="card">
          <div style={{ textAlign: 'center', padding: 30, color: '#aaa', fontSize: 13 }}>
            Bu tur, önceki turun galipleri belirlenince açılacak.
          </div>
        </div>
      )}

      {/* Şampiyon tahmini */}
      <div className="card" style={{ marginTop: 20, background: '#fafaf8' }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>
          🏆 Şampiyon Tahmini <span className="pill pill-gold">+{CHAMPION_BONUS_POINTS} bonus puan</span>
        </div>
        <p style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>
          Turnuvayı kazanacağını düşündüğün takımı yaz. Doğru bilirsen ekstra bonus kazanırsın!
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text" placeholder="Örn: Brezilya, Arjantin, Fransa..."
            value={championPick}
            disabled={locked}
            onChange={e => setChampionPick(e.target.value)}
            style={{ flex: 1 }}
          />
          {!locked && (
            <button className="btn" onClick={handleChampionSave} disabled={saving}>
              Kaydet
            </button>
          )}
        </div>
      </div>

      <p className="tip">
        Son 32: +{KNOCKOUT_ROUND_POINTS.ro32}p · Son 16: +{KNOCKOUT_ROUND_POINTS.ro16}p · Çeyrek: +{KNOCKOUT_ROUND_POINTS.qf}p ·
        Yarı: +{KNOCKOUT_ROUND_POINTS.sf}p · Final: +{KNOCKOUT_ROUND_POINTS.final}p · Şampiyon: +{CHAMPION_BONUS_POINTS}p
      </p>
    </div>
  )
}
