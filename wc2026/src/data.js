export const GROUPS = {
  A: ['Meksika', 'Güney Afrika', 'Güney Kore', 'Çekya'],
  B: ['Kanada', 'Bosna-Hersek', 'Katar', 'İsviçre'],
  C: ['Brezilya', 'Fas', 'Haiti', 'İskoçya'],
  D: ['ABD', 'Paraguay', 'Avustralya', 'Türkiye'],
  E: ['Almanya', 'Curaçao', 'Fildişi Sahili', 'Ekvador'],
  F: ['Hollanda', 'Japonya', 'İsveç', 'Tunus'],
  G: ['Belçika', 'Mısır', 'İran', 'Yeni Zelanda'],
  H: ['İspanya', 'Yeşil Burun Adaları', 'Suudi Arabistan', 'Uruguay'],
  I: ['Fransa', 'Senegal', 'Irak', 'Norveç'],
  J: ['Arjantin', 'Cezayir', 'Avusturya', 'Ürdün'],
  K: ['Portekiz', 'Kongo KDC', 'Özbekistan', 'Kolombiya'],
  L: ['İngiltere', 'Hırvatistan', 'Gana', 'Panama'],
}

export const FLAGS = {
  Meksika: '🇲🇽', 'Güney Afrika': '🇿🇦', 'Güney Kore': '🇰🇷', Çekya: '🇨🇿',
  Kanada: '🇨🇦', 'Bosna-Hersek': '🇧🇦', Katar: '🇶🇦', İsviçre: '🇨🇭',
  Brezilya: '🇧🇷', Fas: '🇲🇦', Haiti: '🇭🇹', İskoçya: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  ABD: '🇺🇸', Paraguay: '🇵🇾', Avustralya: '🇦🇺', Türkiye: '🇹🇷',
  Almanya: '🇩🇪', Curaçao: '🇨🇼', 'Fildişi Sahili': '🇨🇮', Ekvador: '🇪🇨',
  Hollanda: '🇳🇱', Japonya: '🇯🇵', İsveç: '🇸🇪', Tunus: '🇹🇳',
  Belçika: '🇧🇪', Mısır: '🇪🇬', İran: '🇮🇷', 'Yeni Zelanda': '🇳🇿',
  İspanya: '🇪🇸', 'Yeşil Burun Adaları': '🇨🇻', 'Suudi Arabistan': '🇸🇦', Uruguay: '🇺🇾',
  Fransa: '🇫🇷', Senegal: '🇸🇳', Irak: '🇮🇶', Norveç: '🇳🇴',
  Arjantin: '🇦🇷', Cezayir: '🇩🇿', Avusturya: '🇦🇹', Ürdün: '🇯🇴',
  Portekiz: '🇵🇹', 'Kongo KDC': '🇨🇩', Özbekistan: '🇺🇿', Kolombiya: '🇨🇴',
  İngiltere: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', Hırvatistan: '🇭🇷', Gana: '🇬🇭', Panama: '🇵🇦',
}

export function getGroupMatches(group) {
  const teams = GROUPS[group]
  const matches = []
  for (let i = 0; i < teams.length; i++)
    for (let j = i + 1; j < teams.length; j++)
      matches.push([teams[i], teams[j]])
  return matches
}

export function getAllMatches() {
  return Object.keys(GROUPS).flatMap(g =>
    getGroupMatches(g).map(([h, a]) => ({ group: g, home: h, away: a, key: `${h}_${a}` }))
  )
}

// Puan hesaplama
export function calcMatchPoints(pred, result) {
  if (!result || result.home == null || result.away == null) return null
  if (pred?.home == null || pred?.away == null) return null
  const ph = parseInt(pred.home), pa = parseInt(pred.away)
  const rh = result.home, ra = result.away
  if (ph === rh && pa === ra) return 5   // tam skor
  const pw = ph > pa ? 'h' : ph < pa ? 'a' : 'd'
  const rw = rh > ra ? 'h' : rh < ra ? 'a' : 'd'
  if (pw === rw) return 3                // doğru sonuç
  return 0
}

export function calcStandingPoints(pred, actual) {
  if (!pred || !actual) return 0
  let pts = 0
  ;[1, 2, 3, 4].forEach(rank => {
    if (pred[rank] && pred[rank] === actual[rank]) {
      pts += rank <= 2 ? 5 : 2
    }
  })
  return pts
}
