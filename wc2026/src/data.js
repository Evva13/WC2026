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

// Kaynak: Al Jazeera / FIFA — UTC saatleri (Türkiye = UTC+3)
export const MATCH_TIMES = {
  // ── GRUP A ──────────────────────────────────────────
  'Meksika_Güney Afrika':                '2026-06-11T19:00:00Z', // 11 Haz 22:00
  'Meksika_Güney Kore':                  '2026-06-19T01:00:00Z', // 19 Haz 04:00
  'Meksika_Çekya':                       '2026-06-25T01:00:00Z', // 25 Haz 04:00
  'Güney Afrika_Güney Kore':             '2026-06-25T01:00:00Z', // 25 Haz 04:00
  'Güney Afrika_Çekya':                  '2026-06-18T16:00:00Z', // 18 Haz 19:00
  'Güney Kore_Çekya':                    '2026-06-12T02:00:00Z', // 12 Haz 05:00

  // ── GRUP B ──────────────────────────────────────────
  'Kanada_Bosna-Hersek':                 '2026-06-12T19:00:00Z', // 12 Haz 22:00
  'Kanada_Katar':                        '2026-06-18T22:00:00Z', // 19 Haz 01:00
  'Kanada_İsviçre':                      '2026-06-24T19:00:00Z', // 24 Haz 22:00
  'Bosna-Hersek_Katar':                  '2026-06-24T19:00:00Z', // 24 Haz 22:00
  'Bosna-Hersek_İsviçre':                '2026-06-18T19:00:00Z', // 18 Haz 22:00
  'Katar_İsviçre':                       '2026-06-13T19:00:00Z', // 13 Haz 22:00

  // ── GRUP C ──────────────────────────────────────────
  'Brezilya_Fas':                        '2026-06-13T22:00:00Z', // 14 Haz 01:00
  'Brezilya_Haiti':                      '2026-06-19T21:30:00Z', // 20 Haz 00:30
  'Brezilya_İskoçya':                    '2026-06-24T22:00:00Z', // 25 Haz 01:00
  'Fas_Haiti':                           '2026-06-24T22:00:00Z', // 25 Haz 01:00
  'Fas_İskoçya':                         '2026-06-19T22:00:00Z', // 20 Haz 01:00
  'Haiti_İskoçya':                       '2026-06-14T01:00:00Z', // 14 Haz 04:00

  // ── GRUP D ──────────────────────────────────────────
  'ABD_Paraguay':                        '2026-06-13T01:00:00Z', // 13 Haz 04:00
  'ABD_Avustralya':                      '2026-06-19T19:00:00Z', // 19 Haz 22:00
  'ABD_Türkiye':                         '2026-06-26T02:00:00Z', // 26 Haz 05:00
  'Paraguay_Avustralya':                 '2026-06-26T02:00:00Z', // 26 Haz 05:00
  'Paraguay_Türkiye':                    '2026-06-20T03:00:00Z', // 20 Haz 06:00
  'Avustralya_Türkiye':                  '2026-06-14T04:00:00Z', // 14 Haz 07:00

  // ── GRUP E ──────────────────────────────────────────
  'Almanya_Curaçao':                     '2026-06-14T17:00:00Z', // 14 Haz 20:00
  'Almanya_Fildişi Sahili':              '2026-06-20T20:00:00Z', // 20 Haz 23:00
  'Almanya_Ekvador':                     '2026-06-25T20:00:00Z', // 25 Haz 23:00
  'Curaçao_Fildişi Sahili':              '2026-06-25T20:00:00Z', // 25 Haz 23:00
  'Curaçao_Ekvador':                     '2026-06-21T03:00:00Z', // 21 Haz 06:00
  'Fildişi Sahili_Ekvador':              '2026-06-14T23:00:00Z', // 15 Haz 02:00

  // ── GRUP F ──────────────────────────────────────────
  'Hollanda_Japonya':                    '2026-06-14T20:00:00Z', // 14 Haz 23:00
  'Hollanda_İsveç':                      '2026-06-20T17:00:00Z', // 20 Haz 20:00
  'Hollanda_Tunus':                      '2026-06-25T23:00:00Z', // 26 Haz 02:00
  'Japonya_İsveç':                       '2026-06-25T23:00:00Z', // 26 Haz 02:00
  'Japonya_Tunus':                       '2026-06-21T04:00:00Z', // 21 Haz 07:00
  'İsveç_Tunus':                         '2026-06-15T02:00:00Z', // 15 Haz 05:00

  // ── GRUP G ──────────────────────────────────────────
  'Belçika_Mısır':                       '2026-06-15T19:00:00Z', // 15 Haz 22:00
  'Belçika_İran':                        '2026-06-21T19:00:00Z', // 21 Haz 22:00
  'Belçika_Yeni Zelanda':                '2026-06-26T22:00:00Z', // 27 Haz 01:00
  'Mısır_İran':                          '2026-06-26T22:00:00Z', // 27 Haz 01:00
  'Mısır_Yeni Zelanda':                  '2026-06-22T01:00:00Z', // 22 Haz 04:00
  'İran_Yeni Zelanda':                   '2026-06-16T01:00:00Z', // 16 Haz 04:00

  // ── GRUP H ──────────────────────────────────────────
  'İspanya_Yeşil Burun Adaları':         '2026-06-15T16:00:00Z', // 15 Haz 19:00
  'İspanya_Suudi Arabistan':             '2026-06-21T16:00:00Z', // 21 Haz 19:00
  'İspanya_Uruguay':                     '2026-06-27T00:00:00Z', // 27 Haz 03:00
  'Yeşil Burun Adaları_Suudi Arabistan': '2026-06-27T00:00:00Z', // 27 Haz 03:00
  'Yeşil Burun Adaları_Uruguay':         '2026-06-21T22:00:00Z', // 22 Haz 01:00
  'Suudi Arabistan_Uruguay':             '2026-06-15T22:00:00Z', // 16 Haz 01:00

  // ── GRUP I ──────────────────────────────────────────
  'Fransa_Senegal':                      '2026-06-16T19:00:00Z', // 16 Haz 22:00
  'Fransa_Irak':                         '2026-06-22T21:00:00Z', // 23 Haz 00:00
  'Fransa_Norveç':                       '2026-06-26T19:00:00Z', // 26 Haz 22:00
  'Senegal_Irak':                        '2026-06-26T19:00:00Z', // 26 Haz 22:00
  'Senegal_Norveç':                      '2026-06-23T00:00:00Z', // 23 Haz 03:00
  'Irak_Norveç':                         '2026-06-16T22:00:00Z', // 17 Haz 01:00

  // ── GRUP J ──────────────────────────────────────────
  'Arjantin_Cezayir':                    '2026-06-17T01:00:00Z', // 17 Haz 04:00
  'Arjantin_Avusturya':                  '2026-06-22T17:00:00Z', // 22 Haz 20:00
  'Arjantin_Ürdün':                      '2026-06-27T22:00:00Z', // 28 Haz 01:00
  'Cezayir_Avusturya':                   '2026-06-27T22:00:00Z', // 28 Haz 01:00
  'Cezayir_Ürdün':                       '2026-06-23T03:00:00Z', // 23 Haz 06:00
  'Avusturya_Ürdün':                     '2026-06-17T04:00:00Z', // 17 Haz 07:00

  // ── GRUP K ──────────────────────────────────────────
  'Portekiz_Kongo KDC':                  '2026-06-17T17:00:00Z', // 17 Haz 20:00
  'Portekiz_Özbekistan':                 '2026-06-23T17:00:00Z', // 23 Haz 20:00
  'Portekiz_Kolombiya':                  '2026-06-28T02:00:00Z', // 28 Haz 05:00
  'Kongo KDC_Özbekistan':                '2026-06-28T02:00:00Z', // 28 Haz 05:00
  'Kongo KDC_Kolombiya':                 '2026-06-24T02:00:00Z', // 24 Haz 05:00
  'Özbekistan_Kolombiya':                '2026-06-18T02:00:00Z', // 18 Haz 05:00

  // ── GRUP L ──────────────────────────────────────────
  'İngiltere_Hırvatistan':               '2026-06-17T20:00:00Z', // 17 Haz 23:00
  'İngiltere_Gana':                      '2026-06-23T20:00:00Z', // 23 Haz 23:00
  'İngiltere_Panama':                    '2026-06-27T23:00:00Z', // 28 Haz 02:00
  'Hırvatistan_Gana':                    '2026-06-27T23:00:00Z', // 28 Haz 02:00
  'Hırvatistan_Panama':                  '2026-06-23T23:00:00Z', // 24 Haz 02:00
  'Gana_Panama':                         '2026-06-17T23:00:00Z', // 18 Haz 02:00
}

// Grup aşaması KESİN sonuçları (28 Haziran 2026'da tamamlandı)
// { 1: şampiyon, 2: ikinci, 3: üçüncü, 4: dördüncü }
export const FINAL_STANDINGS = {
  A: { 1: 'Meksika', 2: 'Güney Afrika', 3: 'Güney Kore', 4: 'Çekya' },
  B: { 1: 'İsviçre', 2: 'Kanada', 3: 'Bosna-Hersek', 4: 'Katar' },
  C: { 1: 'Brezilya', 2: 'Fas', 3: 'İskoçya', 4: 'Haiti' },
  D: { 1: 'ABD', 2: 'Avustralya', 3: 'Paraguay', 4: 'Türkiye' },
  E: { 1: 'Almanya', 2: 'Fildişi Sahili', 3: 'Ekvador', 4: 'Curaçao' },
  F: { 1: 'Hollanda', 2: 'Japonya', 3: 'İsveç', 4: 'Tunus' },
  G: { 1: 'Belçika', 2: 'Mısır', 3: 'İran', 4: 'Yeni Zelanda' },
  H: { 1: 'İspanya', 2: 'Yeşil Burun Adaları', 3: 'Uruguay', 4: 'Suudi Arabistan' },
  I: { 1: 'Fransa', 2: 'Norveç', 3: 'Senegal', 4: 'Irak' },
  J: { 1: 'Arjantin', 2: 'Avusturya', 3: 'Cezayir', 4: 'Ürdün' },
  K: { 1: 'Kolombiya', 2: 'Portekiz', 3: 'Kongo KDC', 4: 'Özbekistan' },
  L: { 1: 'İngiltere', 2: 'Hırvatistan', 3: 'Gana', 4: 'Panama' },
}

export function isMatchOpen(home, away) {
  const key = `${home}_${away}`
  const kickoff = MATCH_TIMES[key]
  if (!kickoff) return true
  const cutoff = new Date(new Date(kickoff).getTime() - 60 * 60 * 1000)
  return new Date() < cutoff
}

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
