import { useState, useEffect } from 'react'
import { loadPredictions, loadResults } from './db'
import LoginPage from './components/LoginPage'
import Header from './components/Header'
import MatchesTab from './components/MatchesTab'
import StandingsTab from './components/StandingsTab'
import LeaderboardTab from './components/LeaderboardTab'
import AdminTab from './components/AdminTab'
import { isGroupOpen } from './data'

export default function App() {
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState('matches')
  const [matchPreds, setMatchPreds] = useState({})
  const [standPreds, setStandPreds] = useState({})
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('wc_session')
    if (saved) {
      try { setUser(JSON.parse(saved)) } catch {}
    }
  }, [])

  const handleLogin = async (u) => {
    setLoading(true)
    sessionStorage.setItem('wc_session', JSON.stringify(u))
    setUser(u)
    const preds = await loadPredictions(u.id)
    setMatchPreds(preds.matches || {})
    setStandPreds(preds.standings || {})
    const res = await loadResults()
    setResults(res)
    setLoading(false)
  }

  const handleLogout = () => {
    setUser(null)
    setMatchPreds({})
    setStandPreds({})
    setResults({})
    setTab('matches')
    sessionStorage.removeItem('wc_session')
  }

  if (!user) return <LoginPage onLogin={handleLogin} />

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="loading">Yükleniyor…</div>
    </div>
  )

  return (
    <div className="page">
      <Header user={user} activeTab={tab} onTab={setTab} onLogout={handleLogout} />
      <div className="content">
        {tab === 'matches' && (
          <MatchesTab
            userId={user.id}
            predictions={matchPreds}
            setPredictions={setMatchPreds}
            results={results}
          />
        )}
        {tab === 'standings' && (
          <StandingsTab
            userId={user.id}
            standings={standPreds}
            setStandings={setStandPreds}
          />
        )}
        {tab === 'leaderboard' && (
          <LeaderboardTab currentUser={user} />
        )}
        {tab === 'admin' && user.isAdmin && (
          <AdminTab results={results} setResults={setResults} />
        )}
      </div>
    </div>
  )
}
