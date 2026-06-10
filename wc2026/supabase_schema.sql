-- ============================================================
-- Dünya Kupası 2026 Tahmin Yarışması — Supabase SQL Şeması
-- Supabase > SQL Editor'a yapıştır ve "Run" a bas
-- ============================================================

-- Kullanıcılar
create table if not exists users (
  id          text primary key default gen_random_uuid()::text,
  username    text unique not null,
  password_hash text not null,
  score       integer default 0,
  is_admin    boolean default false,
  created_at  timestamptz default now()
);

-- Maç tahminleri
create table if not exists match_predictions (
  id          serial primary key,
  user_id     text references users(id) on delete cascade,
  match_key   text not null,
  home_score  integer,
  away_score  integer,
  created_at  timestamptz default now(),
  unique(user_id, match_key)
);

-- Grup sıralaması tahminleri
create table if not exists standing_predictions (
  id      serial primary key,
  user_id text references users(id) on delete cascade,
  grp     text not null,
  rank1   text,
  rank2   text,
  rank3   text,
  rank4   text,
  unique(user_id, grp)
);

-- Gerçek maç sonuçları (admin girer)
create table if not exists match_results (
  match_key   text primary key,
  home_score  integer not null,
  away_score  integer not null,
  entered_at  timestamptz default now()
);

-- ── RLS (Row Level Security) ──────────────────────────────
-- Geliştirme için RLS'i kapat (sonra güvenlik için açabilirsin)
alter table users disable row level security;
alter table match_predictions disable row level security;
alter table standing_predictions disable row level security;
alter table match_results disable row level security;
