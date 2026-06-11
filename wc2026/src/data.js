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

// Kaynak: Al Jazeera / FIFA resmi fikstür — UTC saatleri
export const MATCH_TIMES = {
  // Grup A
  'Meksika_Güney Afrika':              '2026-06-11T19:00:00Z', // 22:00 TR
  'Güney Kore_Çekya':                  '2026-06-12T02:00:00Z', // 05:00 TR
  'Çekya_Güney Afrika':                '2026-06-18T16:00:00Z', // 19:00 TR
  'Meksika_Güney Kore':                '2026-06-19T01:00:00Z', // 04:00 TR
  'Meksika_Çekya':                     '2026-06-25T01:00:00Z', // 04:00 TR
  'Güney Kore_Güney Afrika':           '2026-06-25T01:00:00Z', // 04:00 TR

  // Grup B
  'Kanada_Bosna-Hersek':               '2026-06-12T19:00:00Z', // 22:00 TR
  'Katar_İsviçre':                     '2026-06-13T19:00:00Z', // 22:00 TR
  'İsviçre_Bosna-Hersek':              '2026-06-18T19:00:00Z', // 22:00 TR
  'Kanada_Katar':                      '2026-06-18T22:00:00Z', // 01:00 TR
  'Kanada_İsviçre':                    '2026-06-24T19:00:00Z', // 22:00 TR
  'Bosna-Hersek_Katar':                '2026-06-24T19:00:00Z', // 22:00 TR

  // Grup C
  'Brezilya_Fas':                      '2026-06-13T22:00:00Z', // 01:00 TR
  'Haiti_İskoçya':                     '2026-06-14T01:00:00Z', // 04:00 TR
  'ABD_Avustralya':                    '2026-06-19T19:00:00Z', // 22:00 TR — not: D grubu ama slot aynı
  'Brezilya_Haiti':                    '2026-06-20T00:30:00Z', // 03:30 TR
  'İskoçya_Fas':                       '2026-06-19T22:00:00Z', // 01:00 TR
  'Brezilya_İskoçya':                  '2026-06-24T22:00:00Z', // 01:00 TR
  'Fas_Haiti':                         '2026-06-24T22:00:00Z', // 01:00 TR

  // Grup D
  'ABD_Paraguay':                      '2026-06-13T01:00:00Z', // 04:00 TR
  'Avustralya_Türkiye':                '2026-06-14T04:00:00Z', // 07:00 TR
  'Türkiye_Paraguay':                  '2026-06-20T03:00:00Z', // 06:00 TR
  'Türkiye_ABD':                       '2026-06-26T02:00:00Z', // 05:00 TR
  'Paraguay_Avustralya':               '2026-06-26T02:00:00Z', // 05:00 TR

  // Grup E
  'Almanya_Curaçao':                   '2026-06-14T17:00:00Z', // 20:00 TR
  'Fildişi Sahili_Ekvador':            '2026-06-14T23:00:00Z', // 02:00 TR
  'Hollanda_İsveç':                    '2026-06-20T17:00:00Z', // 20:00 TR
  'Almanya_Fildişi Sahili':            '2026-06-20T20:00:00Z', // 23:00 TR
  'Ekvador_Curaçao':                   '2026-06-21T03:00:00Z', // 06:00 TR (grup E 3.maç)
  'Almanya_Ekvador':                   '2026-06-25T20:00:00Z', // 23:00 TR
  'Curaçao_Fildişi Sahili':            '2026-06-25T20:00:00Z', // 23:00 TR

  // Grup F
  'Hollanda_Japonya':                  '2026-06-14T20:00:00Z', // 23:00 TR
  'İsveç_Tunus':                       '2026-06-15T02:00:00Z', // 05:00 TR
  'Japonya_İsveç':                     '2026-06-25T23:00:00Z', // 02:00 TR
  'Tunus_Hollanda':                    '2026-06-25T23:00:00Z', // 02:00 TR
  'Tunus_Japonya':                     '2026-06-21T04:00:00Z', // 07:00 TR

  // Grup G
  'Belçika_Mısır':                     '2026-06-15T19:00:00Z', // 22:00 TR
  'İran_Yeni Zelanda':                 '2026-06-16T01:00:00Z', // 04:00 TR
  'Belçika_İran':                      '2026-06-21T19:00:00Z', // 22:00 TR
  'Yeni Zelanda_Mısır':                '2026-06-22T01:00:00Z', // 04:00 TR
  'Belçika_Yeni Zelanda':              '2026-06-26T22:00:00Z', // 01:00 TR
  'Mısır_İran':                        '2026-06-26T22:00:00Z', // 01:00 TR

  // Grup H
  'İspanya_Yeşil Burun Adaları':       '2026-06-15T16:00:00Z', // 19:00 TR
  'Suudi Arabistan_Uruguay':           '2026-06-15T22:00:00Z', // 01:00 TR
  'İspanya_Suudi Arabistan':           '2026-06-21T16:00:00Z', // 19:00 TR
  'Uruguay_Yeşil Burun Adaları':       '2026-06-21T22:00:00Z', // 01:00 TR
  'Uruguay_İspanya':                   '2026-06-27T00:00:00Z', // 03:00 TR
  'Yeşil Burun Adaları_Suudi Arabistan': '2026-06-27T00:00:00Z', // 03:00 TR

  // Grup I
  'Fransa_Senegal':                    '2026-06-16T19:00:00Z', // 22:00 TR
  'Irak_Norveç':                       '2026-06-16T22:00:00Z', // 01:00 TR
  'Fransa_Irak':                       '2026-06-22T21:00:00Z', // 00:00 TR
  'Norveç_Senegal':                    '2026-06-23T00:00:00Z', // 03:00 TR
  'Norveç_Fransa':                     '2026-06-26T19:00:00Z', // 22:00 TR
  'Senegal_Irak':                      '2026-06-26T19:00:00Z', // 22:00 TR

  // Grup J
  'Arjantin_Cezayir':                  '2026-06-17T01:00:00Z', // 04:00 TR
  'Avusturya_Ürdün':                   '2026-06-17T04:00:00Z', // 07:00 TR
  'Arjantin_Avusturya':                '2026-06-22T17:00:00Z', // 20:00 TR
  'Ürdün_Cezayir':                     '2026-06-23T03:00:00Z', // 06:00 TR
  'Arjantin_Ürdün':                    '2026-06-27T22:00:00Z', // 01:00 TR
  'Avusturya_Cezayir':                 '2026-06-27T22:00:00Z', // 01:00 TR

  // Grup K
  'Portekiz_Kongo KDC':               '2026-06-17T17:00:00Z', // 20:00 TR
  'Özbekistan_Kolombiya':             '2026-06-18T02:00:00Z', // 05:00 TR
  'Portekiz_Özbekistan':              '2026-06-23T17:00:00Z', // 20:00 TR
  'Kolombiya_Kongo KDC':              '2026-06-24T02:00:00Z', // 05:00 TR
  'Kolombiya_Portekiz':               '2026-06-28T02:00:00Z', // 05:00 TR
  'Kongo KDC_Özbekistan':             '2026-06-28T02:00:00Z', // 05:00 TR

  // Grup L
  'İngiltere_Hırvatistan':            '2026-06-17T20:00:00Z', // 23:00 TR
  'Gana_Panama':                      '2026-06-17T23:00:00Z', // 02:00 TR
  'İngiltere_Gana':                   '2026-06-23T20:00:00Z', // 23:00 TR
  'Hırvatistan_Panama':               '2026-06-23T23:00:00Z', // 02:00 TR
  'Panama_İngiltere':                 '2026-06-27T23:00:00Z', // 02:00 TR
  'Hırvatistan_Gana':                 '2026-06-27T23:00:00Z', // 02:00 TR
}

// Maç 1 saat önce kilitlenir
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
