// 2026 Dünya Kupası Eleme Aşaması — Round of 32 Bracket
// NOT: Takım isimleri grup aşaması bitince (bu gece) netleşecek.
// Şimdilik placeholder kodlarla yapı kuruluyor, yarın gerçek isimlerle güncellenecek.

export const ROUND_ORDER = ['ro32', 'ro16', 'qf', 'sf', 'final', 'third']

export const ROUND_LABELS = {
  ro32: 'Son 32',
  ro16: 'Son 16',
  qf: 'Çeyrek Final',
  sf: 'Yarı Final',
  final: 'Final',
  third: '3.lük Maçı',
}

// Round of 32 — 16 maç, placeholder takım kodları
// 1A = A grubu birincisi, 2A = A grubu ikincisi, 3xxx = en iyi 3.lerden biri
export const RO32_MATCHES = [
  { id: 'ro32_m1', home: '1A', away: '3CDEH', slot: 1 },
  { id: 'ro32_m2', home: '2A', away: '2B', slot: 2 },
  { id: 'ro32_m3', home: '1B', away: '3ACDF', slot: 3 },
  { id: 'ro32_m4', home: '1F', away: '2C', slot: 4 },
  { id: 'ro32_m5', home: '1C', away: '2F', slot: 5 },
  { id: 'ro32_m6', home: '1E', away: '3CDFI', slot: 6 },
  { id: 'ro32_m7', home: '1D', away: '2G', slot: 7 },
  { id: 'ro32_m8', home: '2D', away: '2H', slot: 8 },
  { id: 'ro32_m9', home: '1G', away: '3ABFH', slot: 9 },
  { id: 'ro32_m10', home: '1H', away: '3ABFI', slot: 10 },
  { id: 'ro32_m11', home: '2I', away: '2J', slot: 11 },
  { id: 'ro32_m12', home: '1I', away: '3CEHJ', slot: 12 },
  { id: 'ro32_m13', home: '1J', away: '3EHIJ', slot: 13 },
  { id: 'ro32_m14', home: '2K', away: '2L', slot: 14 },
  { id: 'ro32_m15', home: '1K', away: '3DEHJ', slot: 15 },
  { id: 'ro32_m16', home: '1L', away: '3EHIK', slot: 16 },
]

// Sonraki turlar — galip belirlenince otomatik üretilecek (boş başlar)
export function buildNextRoundMatches(roundName, prevRoundWinners) {
  // prevRoundWinners: { 'ro32_m1': 'Brezilya', 'ro32_m2': 'Almanya', ... }
  const pairs = []
  const prevIds = Object.keys(prevRoundWinners).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0])
    const numB = parseInt(b.match(/\d+/)[0])
    return numA - numB
  })
  for (let i = 0; i < prevIds.length; i += 2) {
    pairs.push({
      id: `${roundName}_m${i / 2 + 1}`,
      home: prevRoundWinners[prevIds[i]] || null,
      away: prevRoundWinners[prevIds[i + 1]] || null,
    })
  }
  return pairs
}

// Eleme aşaması puanlama sistemi
export const KNOCKOUT_ROUND_POINTS = {
  ro32: 3,   // doğru kazananı bilmek
  ro16: 5,
  qf: 7,
  sf: 10,
  final: 15, // finalisti doğru bilmek
}

export const CHAMPION_BONUS_POINTS = 20 // şampiyonu doğru bilmek (ekstra bonus)
export const EXACT_SCORE_BONUS = 2 // eleme maçında 90 dakika skoru da tutarsa ekstra

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
