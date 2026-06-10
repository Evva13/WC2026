*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: #f7f7f5;
  color: #1a1a1a;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* ── Layout ─────────────────────────────────────────────── */
.page { min-height: 100vh; }
.content { max-width: 880px; margin: 0 auto; padding: 24px 16px; }

/* ── Cards ──────────────────────────────────────────────── */
.card {
  background: #fff;
  border-radius: 14px;
  border: 0.5px solid #e5e5e0;
  padding: 1.5rem;
}
.card-sm { padding: 10px 14px; }

/* ── Header ─────────────────────────────────────────────── */
.hdr {
  position: sticky; top: 0; z-index: 10;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  border-bottom: 0.5px solid #e5e5e0;
  padding: 0 20px;
  height: 56px;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
}
.hdr-logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 16px; }
.hdr-logo img { width: 34px; height: 34px; object-fit: contain; }
.hdr-nav { display: flex; gap: 2px; }
.hdr-user { display: flex; align-items: center; gap: 8px; }

/* ── Buttons ─────────────────────────────────────────────── */
button { font-family: inherit; cursor: pointer; transition: all 0.15s; }

.btn {
  padding: 9px 22px; border-radius: 9px; border: none;
  background: #1a1a1a; color: #fff;
  font-size: 14px; font-weight: 500;
}
.btn:hover { background: #333; }
.btn:active { transform: scale(0.98); }

.btn-sm {
  padding: 6px 14px; border-radius: 7px; border: none;
  background: #1a1a1a; color: #fff; font-size: 13px; font-weight: 500;
}
.btn-outline {
  padding: 7px 16px; border-radius: 8px;
  border: 0.5px solid #d0d0c8; background: #fff; color: #1a1a1a; font-size: 13px;
}
.btn-outline:hover { background: #f5f5f3; }

.tab-btn {
  padding: 7px 15px; border-radius: 8px; border: none;
  background: transparent; color: #666; font-size: 13px;
}
.tab-btn:hover { background: #f5f5f3; color: #1a1a1a; }
.tab-btn.active { background: #1a1a1a; color: #fff; font-weight: 500; }

.grp-btn {
  padding: 5px 12px; border-radius: 6px;
  border: 0.5px solid #e0e0d8; background: #fff; color: #555; font-size: 13px; font-weight: 500;
}
.grp-btn:hover { border-color: #aaa; }
.grp-btn.active { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
.grp-btn.done { border-color: #27ae60; color: #27ae60; }
.grp-btn.active.done { background: #1a1a1a; color: #9fcf7a; }

/* ── Form inputs ─────────────────────────────────────────── */
input[type=text], input[type=password], select {
  width: 100%; padding: 11px 14px;
  border: 0.5px solid #d0d0c8; border-radius: 9px;
  font-size: 15px; outline: none; background: #fff; color: #1a1a1a;
  transition: border-color 0.15s;
}
input:focus, select:focus { border-color: #888; }

.num-in {
  width: 48px; text-align: center; padding: 7px 4px;
  border: 0.5px solid #d0d0c8; border-radius: 7px;
  font-size: 17px; font-weight: 700; outline: none;
  -moz-appearance: textfield;
  transition: border-color 0.15s, background 0.15s;
}
.num-in::-webkit-inner-spin-button { -webkit-appearance: none; }
.num-in:focus { border-color: #888; }
.num-in.locked { background: #f5faf0; border-color: #b2d8a0; color: #3b6d11; }

/* ── Pills / Badges ──────────────────────────────────────── */
.pill {
  font-size: 11px; padding: 2px 8px; border-radius: 20px;
  background: #f0f0ec; color: #666; font-weight: 500; display: inline-block;
  white-space: nowrap;
}
.pill-g { background: #eaf3de; color: #3b6d11; }
.pill-r { background: #fceaea; color: #a32d2d; }
.pill-o { background: #faeeda; color: #854f0b; }
.pill-b { background: #e6f1fb; color: #185fa5; }
.pill-p { background: #eeedfe; color: #534ab7; }
.pill-gold { background: #faeeda; color: #7a4e00; font-weight: 700; }

/* ── Rank circle ─────────────────────────────────────────── */
.rank-c {
  width: 30px; height: 30px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0;
}

/* ── Match rows ──────────────────────────────────────────── */
.match-row {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 0; border-bottom: 0.5px solid #f0f0eb;
}
.match-row:last-child { border-bottom: none; }
.match-team {
  flex: 1; font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden;
  text-overflow: ellipsis;
}
.match-team.right { text-align: right; }

/* ── Progress bar ─────────────────────────────────────────── */
.progress-wrap {
  display: flex; align-items: center; gap: 10px; margin-top: 12px;
}
.progress-bar {
  flex: 1; height: 4px; background: #f0f0ec; border-radius: 4px; overflow: hidden;
}
.progress-fill {
  height: 100%; background: #1a1a1a; border-radius: 4px; transition: width 0.4s ease;
}

/* ── Leaderboard ─────────────────────────────────────────── */
.lb-row {
  display: flex; align-items: center; gap: 12px;
  padding: 13px 0; border-bottom: 0.5px solid #f0f0ec;
}
.lb-row:last-child { border-bottom: none; }

/* ── Login ───────────────────────────────────────────────── */
.login-page {
  min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;
  background: linear-gradient(160deg, #f7f7f5 0%, #eeeeea 100%);
}
.login-box { width: 100%; max-width: 400px; }
.login-logo {
  text-align: center; margin-bottom: 28px;
}
.login-logo img { width: 110px; height: 110px; object-fit: contain; display: block; margin: 0 auto 10px; }

/* ── Misc ────────────────────────────────────────────────── */
.section-header {
  display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px;
}
.section-title { font-size: 18px; font-weight: 700; }
.section-sub { font-size: 12px; color: #888; margin-top: 2px; }
.grp-flex { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.meta-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(88px, 1fr)); gap: 8px; margin-top: 16px; }
.meta-c { background: #fff; border: 0.5px solid #e5e5e0; border-radius: 10px; padding: 10px; text-align: center; cursor: pointer; transition: border-color 0.15s; }
.meta-c:hover { border-color: #aaa; }
.tip { font-size: 12px; color: #aaa; margin-top: 10px; line-height: 1.6; }
.error-msg { color: #c0392b; font-size: 13px; }
.ok-msg { color: #27ae60; font-size: 13px; }
.divider { border: none; border-top: 0.5px solid #f0f0ec; margin: 14px 0; }
.loading { text-align: center; padding: 40px; color: #aaa; font-size: 14px; }

@media (max-width: 600px) {
  .hdr { padding: 0 12px; }
  .hdr-nav .tab-btn { padding: 6px 10px; font-size: 12px; }
  .content { padding: 16px 12px; }
  .match-team { font-size: 12px; }
}
