import { supabase } from './supabase'

const useSupabase = !!supabase

// ─── localStorage helpers ───────────────────────────────────────────────────
function ls(key, fallback = null) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
function lsSet(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

// ─── AUTH ────────────────────────────────────────────────────────────────────
export async function register(username, password) {
  if (useSupabase) {
    const { data: existing } = await supabase
      .from('users').select('id').eq('username', username).single()
    if (existing) return { error: 'Bu kullanıcı adı alınmış.' }
    const id = crypto.randomUUID()
    const { error } = await supabase.from('users').insert({
      id, username, password_hash: password,
      is_admin: username === 'admin', score: 0,
    })
    if (error) return { error: error.message }
    return { user: { id, username, isAdmin: username === 'admin', score: 0 } }
  } else {
    const users = ls('wc_users', {})
    if (users[username]) return { error: 'Bu kullanıcı adı alınmış.' }
    const user = { id: username, username, password, isAdmin: username === 'admin', score: 0 }
    users[username] = user
    lsSet('wc_users', users)
    return { user }
  }
}

export async function login(username, password) {
  if (useSupabase) {
    const { data, error } = await supabase
      .from('users').select('*').eq('username', username).single()
    if (error || !data) return { error: 'Kullanıcı bulunamadı.' }
    if (data.password_hash !== password) return { error: 'Şifre hatalı.' }
    return { user: { id: data.id, username: data.username, isAdmin: data.is_admin, score: data.score } }
  } else {
    const users = ls('wc_users', {})
    const user = users[username]
    if (!user) return { error: 'Kullanıcı bulunamadı.' }
    if (user.password !== password) return { error: 'Şifre hatalı.' }
    return { user: { id: user.id, username: user.username, isAdmin: user.isAdmin, score: user.score || 0 } }
  }
}

// ─── PREDICTIONS ─────────────────────────────────────────────────────────────
export async function loadPredictions(userId) {
  if (useSupabase) {
    const [{ data: matches }, { data: standings }] = await Promise.all([
      supabase.from('match_predictions').select('*').eq('user_id', userId),
      supabase.from('standing_predictions').select('*').eq('user_id', userId),
    ])
    const matchMap = {}
    ;(matches || []).forEach(m => { matchMap[m.match_key] = { home: m.home_score, away: m.away_score } })
    const standMap = {}
    ;(standings || []).forEach(s => {
      standMap[s.grp] = { 1: s.rank1, 2: s.rank2, 3: s.rank3, 4: s.rank4 }
    })
    return { matches: matchMap, standings: standMap }
  } else {
    const users = ls('wc_users', {})
    return users[userId]?.predictions || { matches: {}, standings: {} }
  }
}

export async function saveMatchPrediction(userId, matchKey, home, away) {
  if (useSupabase) {
    await supabase.from('match_predictions').upsert({
      user_id: userId, match_key: matchKey,
      home_score: home, away_score: away,
    }, { onConflict: 'user_id,match_key' })
  } else {
    const users = ls('wc_users', {})
    if (!users[userId]) return
    if (!users[userId].predictions) users[userId].predictions = { matches: {}, standings: {} }
    users[userId].predictions.matches[matchKey] = { home, away }
    lsSet('wc_users', users)
  }
}

export async function saveStandingPrediction(userId, grp, ranks) {
  if (useSupabase) {
    await supabase.from('standing_predictions').upsert({
      user_id: userId, grp,
      rank1: ranks[1] || null, rank2: ranks[2] || null,
      rank3: ranks[3] || null, rank4: ranks[4] || null,
    }, { onConflict: 'user_id,grp' })
  } else {
    const users = ls('wc_users', {})
    if (!users[userId]) return
    if (!users[userId].predictions) users[userId].predictions = { matches: {}, standings: {} }
    users[userId].predictions.standings[grp] = ranks
    lsSet('wc_users', users)
  }
}

// ─── RESULTS (admin) ─────────────────────────────────────────────────────────
export async function loadResults() {
  if (useSupabase) {
    const { data } = await supabase.from('match_results').select('*')
    const map = {}
    ;(data || []).forEach(r => { map[r.match_key] = { home: r.home_score, away: r.away_score } })
    return map
  } else {
    return ls('wc_results', {})
  }
}

export async function saveResult(matchKey, home, away) {
  if (useSupabase) {
    await supabase.from('match_results').upsert({
      match_key: matchKey, home_score: home, away_score: away,
    }, { onConflict: 'match_key' })
  } else {
    const results = ls('wc_results', {})
    results[matchKey] = { home, away }
    lsSet('wc_results', results)
  }
}

// ─── LEADERBOARD ─────────────────────────────────────────────────────────────
export async function loadLeaderboard() {
  if (useSupabase) {
    const { data } = await supabase
      .from('users').select('username, score, is_admin')
      .eq('is_admin', false).order('score', { ascending: false })
    return (data || []).map(u => ({
      username: u.username, score: u.score,
    }))
  } else {
    const users = ls('wc_users', {})
    return Object.values(users)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .map(u => ({
        username: u.username, score: u.score || 0,
        matchCount: Object.keys(u.predictions?.matches || {})
          .filter(k => { const p = u.predictions.matches[k]; return p?.home != null && p?.away != null }).length,
        standCount: Object.values(u.predictions?.standings || {})
          .filter(g => Object.keys(g).length === 4).length,
      }))
  }
}

export async function updateAllScores(results, calcMatchPoints, calcStandingPoints) {
  if (useSupabase) {
    const { data: users } = await supabase.from('users').select('id').eq('is_admin', false)
    for (const user of users || []) {
      const preds = await loadPredictions(user.id)
      let score = 0
      Object.entries(preds.matches).forEach(([key, pred]) => {
        const pts = calcMatchPoints(pred, results[key])
        if (pts != null) score += pts
      })
      await supabase.from('users').update({ score }).eq('id', user.id)
    }
  } else {
    const users = ls('wc_users', {})
    Object.values(users).forEach(user => {
      if (user.isAdmin) return
      let score = 0
      Object.entries(user.predictions?.matches || {}).forEach(([key, pred]) => {
        const pts = calcMatchPoints(pred, results[key])
        if (pts != null) score += pts
      })
      users[user.username].score = score
    })
    lsSet('wc_users', users)
  }
}
