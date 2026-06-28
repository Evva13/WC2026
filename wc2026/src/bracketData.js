// 2026 Dünya Kupası Eleme Aşaması — Round of 32 Bracket
// Grup aşaması tamamlandı, 32 takım netleşti! (28 Haziran)

export const ROUND_ORDER = ['ro32', 'ro16', 'qf', 'sf', 'final', 'third']

export const ROUND_LABELS = {
  ro32: 'Son 32',
  ro16: 'Son 16',
  qf: 'Çeyrek Final',
  sf: 'Yarı Final',
  final: 'Final',
  third: '3.lük Maçı',
}

// Round of 32 — 16 maç, gerçek takımlarla (UTC saatleri)
export const RO32_MATCHES = [
  { id: 'm73', home: 'Güney Afrika', away: 'Kanada', kickoff: '2026-06-28T19:00:00Z' },
  { id: 'm76', home: 'Brezilya', away: 'Japonya', kickoff: '2026-06-29T17:00:00Z' },
  { id: 'm74', home: 'Almanya', away: 'Paraguay', kickoff: '2026-06-29T20:30:00Z' },
  { id: 'm75', home: 'Hollanda', away: 'Fas', kickoff: '2026-06-30T01:00:00Z' },
  { id: 'm78', home: 'Fildişi Sahili', away: 'Norveç', kickoff: '2026-06-30T17:00:00Z' },
  { id: 'm77', home: 'Fransa', away: 'İsveç', kickoff: '2026-06-30T21:00:00Z' },
  { id: 'm79', home: 'Meksika', away: 'Ekvador', kickoff: '2026-07-01T01:00:00Z' },
  { id: 'm80', home: 'İngiltere', away: 'Kongo KDC', kickoff: '2026-07-01T16:00:00Z' },
  { id: 'm81', home: 'Belçika', away: 'Senegal', kickoff: '2026-07-01T20:00:00Z' },
  { id: 'm82', home: 'ABD', away: 'Bosna-Hersek', kickoff: '2026-07-02T00:00:00Z' },
  { id: 'm83', home: 'İspanya', away: 'Avusturya', kickoff: '2026-07-02T19:00:00Z' },
  { id: 'm84', home: 'Portekiz', away: 'Hırvatistan', kickoff: '2026-07-02T23:00:00Z' },
  { id: 'm85', home: 'İsviçre', away: 'Cezayir', kickoff: '2026-07-03T03:00:00Z' },
  { id: 'm88', home: 'Avustralya', away: 'Mısır', kickoff: '2026-07-03T18:00:00Z' },
  { id: 'm86', home: 'Arjantin', away: 'Yeşil Burun Adaları', kickoff: '2026-07-03T22:00:00Z' },
  { id: 'm87', home: 'Kolombiya', away: 'Gana', kickoff: '2026-07-04T01:30:00Z' },
]

export const KNOCKOUT_ROUND_POINTS = {
  ro32: 3,
  ro16: 5,
  qf: 7,
  sf: 10,
  final: 15,
}

export const CHAMPION_BONUS_POINTS = 20
export const EXACT_SCORE_BONUS = 2

export function calcKnockoutPoints(round, predictedWinner, actualWinner, predScore, actualScore) {
  if (!actualWinner || !predictedWinner) return null
  let points = 0
  if (predictedWinner === actualWinner) {
    points += KNOCKOUT_ROUND_POINTS[round] || 0
    if (predScore && actualScore &&
        predScore.home === actualScore.home && predScore.away === actualScore.away) {
      points += EXACT_SCORE_BONUS
    }
  }
  return points
}

// Son 32 galipleri belirlenince Son 16 eşleşmelerini otomatik kur
export function buildRo16FromWinners(winners) {
  // m73 vs m75 kazananı, m74 vs m77 kazananı, m76 vs m78 kazananı, m79 vs m80 kazananı,
  // m81 vs m82 kazananı, m83 vs m84 kazananı, m85 vs m88 kazananı, m86 vs m87 kazananı
  const pairs = [
    ['m73', 'm75'], ['m74', 'm77'], ['m76', 'm78'], ['m79', 'm80'],
    ['m81', 'm82'], ['m83', 'm84'], ['m85', 'm88'], ['m86', 'm87'],
  ]
  return pairs.map(([a, b], i) => ({
    id: `ro16_${i + 1}`,
    home: winners[a] || null,
    away: winners[b] || null,
  }))
}

export function buildQfFromWinners(ro16Winners) {
  const pairs = [['ro16_1', 'ro16_2'], ['ro16_3', 'ro16_4'], ['ro16_5', 'ro16_6'], ['ro16_7', 'ro16_8']]
  return pairs.map(([a, b], i) => ({
    id: `qf_${i + 1}`,
    home: ro16Winners[a] || null,
    away: ro16Winners[b] || null,
  }))
}

export function buildSfFromWinners(qfWinners) {
  const pairs = [['qf_1', 'qf_2'], ['qf_3', 'qf_4']]
  return pairs.map(([a, b], i) => ({
    id: `sf_${i + 1}`,
    home: qfWinners[a] || null,
    away: qfWinners[b] || null,
  }))
}
