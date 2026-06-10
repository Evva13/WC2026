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

// Maç saatleri UTC cinsinden (ISO 8601)
// Kaynak: FIFA resmi fikstür — tüm grup aşaması maçları
export const MATCH_TIMES = {
  // Grup A
  'Meksika_Güney Afrika':       '2026-06-11T19:00:00Z',
  'Güney Kore_Çekya':           '2026-06-12T02:00:00Z',
  'Meksika_Güney Kore':         '2026-06-19T01:00:00Z',
  'Güney Afrika_Çekya':         '2026-06-19T20:00:00Z',
  'Meksika_Çekya':              '2026-06-25T01:00:00Z',
  'Güney Kore_Güney Afrika':    '2026-06-25T01:00:00Z',
  // Grup B
  'Kanada_Bosna-Hersek':        '2026-06-12T19:00:00Z',
  'Katar_İsviçre':              '2026-06-13T19:00:00Z',
  'Kanada_Katar':               '2026-06-19T23:00:00Z',
  'Bosna-Hersek_İsviçre':       '2026-06-20T20:00:00Z',
  'Kanada_İsviçre':             '2026-06-26T23:00:00Z',
  'Bosna-Hersek_Katar':         '2026-06-26T23:00:00Z',
  // Grup C
  'Brezilya_Fas':               '2026-06-13T22:00:00Z',
  'Haiti_İskoçya':              '2026-06-14T01:00:00Z',
  'Brezilya_Haiti':             '2026-06-19T17:00:00Z',
  'Fas_İskoçya':                '2026-06-20T23:00:00Z',
  'Brezilya_İskoçya':           '2026-06-26T01:00:00Z',
  'Fas_Haiti':                  '2026-06-26T01:00:00Z',
  // Grup D
  'ABD_Paraguay':               '2026-06-13T01:00:00Z',
  'Avustralya_Türkiye':         '2026-06-14T16:00:00Z',
  'ABD_Avustralya':             '2026-06-20T17:00:00Z',
  'Paraguay_Türkiye':           '2026-06-21T01:00:00Z',
  'ABD_Türkiye':                '2026-06-26T19:00:00Z',
  'Paraguay_Avustralya':        '2026-06-26T19:00:00Z',
  // Grup E
  'Almanya_Curaçao':            '2026-06-14T17:00:00Z',
  'Fildişi Sahili_Ekvador':     '2026-06-15T01:00:00Z',
  'Almanya_Fildişi Sahili':     '2026-06-20T19:00:00Z',
  'Curaçao_Ekvador':            '2026-06-21T19:00:00Z',
  'Almanya_Ekvador':            '2026-06-25T22:00:00Z',
  'Curaçao_Fildişi Sahili':     '2026-06-25T22:00:00Z',
  // Grup F
  'Hollanda_Japonya':           '2026-06-14T22:00:00Z',
  'İsveç_Tunus':                '2026-06-15T19:00:00Z',
  'Hollanda_İsveç':             '2026-06-21T16:00:00Z',
  'Japonya_Tunus':              '2026-06-21T23:00:00Z',
  'Hollanda_Tunus':             '2026-06-25T19:00:00Z',
  'Japonya_İsveç':              '2026-06-25T19:00:00Z',
  // Grup G
  'Belçika_Mısır':              '2026-06-15T22:00:00Z',
  'İran_Yeni Zelanda':          '2026-06-16T16:00:00Z',
  'Belçika_İran':               '2026-06-21T22:00:00Z',
  'Mısır_Yeni Zelanda':         '2026-06-22T17:00:00Z',
  'Belçika_Yeni Zelanda':       '2026-06-26T22:00:00Z',
  'Mısır_İran':                 '2026-06-26T22:00:00Z',
  // Grup H
  'İspanya_Yeşil Burun Adaları':'2026-06-15T16:00:00Z',
  'Suudi Arabistan_Uruguay':    '2026-06-16T19:00:00Z',
  'İspanya_Suudi Arabistan':    '2026-06-22T16:00:00Z',
  'Yeşil Burun Adaları_Uruguay':'2026-06-22T22:00:00Z',
  'İspanya_Uruguay':            '2026-06-27T01:00:00Z',
  'Yeşil Burun Adaları_Suudi Arabistan': '2026-06-27T01:00:00Z',
  // Grup I
  'Fransa_Senegal':             '2026-06-16T01:00:00Z',
  'Irak_Norveç':                '2026-06-17T01:00:00Z',
  'Fransa_Irak':                '2026-06-22T19:00:00Z',
  'Senegal_Norveç':             '2026-06-23T01:00:00Z',
  'Fransa_Norveç':              '2026-06-27T19:00:00Z',
  'Senegal_Irak':               '2026-06-27T19:00:00Z',
  // Grup J
  'Arjantin_Cezayir':           '2026-06-16T22:00:00Z',
  'Avusturya_Ürdün':            '2026-06-17T19:00:00Z',
  'Arjantin_Avusturya':         '2026-06-23T19:00:00Z',
  'Cezayir_Ürdün':              '2026-06-23T22:00:00Z',
  'Arjantin_Ürdün':             '2026-06-27T22:00:00Z',
  'Avusturya_Cezayir':          '2026-06-27T22:00:00Z',
  // Grup K
  'Portekiz_Kongo KDC':         '2026-06-17T16:00:00Z',
  'Özbekistan_Kolombiya':       '2026-06-18T04:00:00Z',
  'Portekiz_Özbekistan':        '2026-06-23T16:00:00Z',
  'Kongo KDC_Kolombiya':        '2026-06-24T01:00:00Z',
  'Portekiz_Kolombiya':         '2026-06-28T01:00:00Z',
  'Kongo KDC_Özbekistan':       '2026-06-28T01:00:00Z',
  // Grup L
  'Gana_Panama':                '2026-06-18T00:00:00Z',
  'İngiltere_Hırvatistan':      '2026-06-17T22:00:00Z',
  'İngiltere_Gana':             '2026-06-23T22:00:00Z',
  'Hırvatistan_Panama':         '2026-06-24T19:00:00Z',
  'İngiltere_Panama':           '2026-06-27T23:00:00Z',
  'Hırvatistan_Gana':           '2026-06-27T23:00:00Z',
}

// Maç 1 saat önce kilitlenir
export function isMatchOpen(home, away) {
  const key = `${home}_${away}`
  const kickoff = MATCH_TIMES[key]
  if (!kickoff) return true // zamanı bilinmiyorsa açık
  const cutoff = new Date(new Date(kickoff).getTime() - 60 * 60 * 1000)
  return new Date() < cutoff
}

// Grup için herhangi bir maç hâlâ açık mı?
export function isGroupOpen(group) {
  return getGroupMatches(group).some(([h, a]) => isMatchOpen(h, a))
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

export function calcMatchPoints(pred, result) {
  if (!result || result.home == null || result.away == null) return null
  if (pred?.home == null || pred?.away == null) return null
  const ph = parseInt(pred.home), pa = parseInt(pred.away)
  const rh = result.home, ra = result.away
  if (ph === rh && pa === ra) return 5
  const pw = ph > pa ? 'h' : ph < pa ? 'a' : 'd'
  const rw = rh > ra ? 'h' : rh < ra ? 'a' : 'd'
  if (pw === rw) return 3
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
