# 🏆 Dünya Kupası 2026 Tahmin Sitesi — Kurulum Rehberi

## Gereksinimler
- [Node.js](https://nodejs.org) (v18 veya üzeri) — bilgisayarına kur
- [Git](https://git-scm.com) — bilgisayarına kur
- [GitHub](https://github.com) hesabı — ücretsiz
- [Supabase](https://supabase.com) hesabı — ücretsiz
- [Vercel](https://vercel.com) hesabı — ücretsiz

---

## Adım 1 — Supabase kurulumu (veritabanı)

1. [supabase.com](https://supabase.com) adresine git, **Sign Up** ile kayıt ol
2. **New Project** → isim ver (örn: `wc2026`) → şifre belirle → **Create Project**
3. Sol menüde **SQL Editor** → **New Query**
4. `supabase_schema.sql` dosyasının içeriğini yapıştır → **Run** bas
5. Sol menüde **Settings > API** sayfasına git:
   - **Project URL** kopyala → `.env` dosyasına `VITE_SUPABASE_URL` olarak yapıştır
   - **anon public** key kopyala → `.env` dosyasına `VITE_SUPABASE_ANON_KEY` olarak yapıştır

---

## Adım 2 — .env dosyası oluştur

Proje klasöründe `.env.example` dosyasını kopyala, adını `.env` yap:

```bash
cp .env.example .env
```

Sonra `.env` dosyasını bir metin editörüyle aç ve kendi Supabase bilgilerini gir:

```
VITE_SUPABASE_URL=https://abcdefghij.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Adım 3 — Projeyi bilgisayarında test et

Terminal / Komut İstemi'ni aç, proje klasörüne git:

```bash
cd wc2026

# Paketleri yükle (bir kez)
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcında `http://localhost:5173` adresini aç → Site çalışmalı!

---

## Adım 4 — GitHub'a yükle

1. [github.com](https://github.com) → **New repository** → isim ver → **Create**
2. Terminalde:

```bash
git init
git add .
git commit -m "ilk commit"
git remote add origin https://github.com/KULLANICI_ADIN/REPO_ADIN.git
git push -u origin main
```

---

## Adım 5 — Vercel'e deploy et (yayınla)

1. [vercel.com](https://vercel.com) → **Sign Up** → GitHub ile giriş yap
2. **New Project** → GitHub reposunu seç → **Import**
3. **Environment Variables** bölümüne Supabase bilgilerini ekle:
   - `VITE_SUPABASE_URL` → Supabase URL'in
   - `VITE_SUPABASE_ANON_KEY` → anon key'in
4. **Deploy** bas → 1-2 dakika sonra site canlı!

Vercel sana `https://wc2026-tahmin.vercel.app` gibi bir link verecek.
Bu linki arkadaşlarınla paylaş, herkes kaydolup tahmin girebilir.

---

## Admin paneli nasıl çalışır?

1. Sitende **"admin"** kullanıcı adıyla kayıt ol (şifre ne olursa olsun)
2. Giriş yaptığında header'da **⚙ Admin** sekmesi görünür
3. Oynanan maçların sonuçlarını grup grup gir
4. **⚡ Puanları Hesapla** butonuna bas → tüm kullanıcıların puanları güncellenir

---

## Puan sistemi

| Tahmin | Puan |
|--------|------|
| Tam skor doğru (örn: 2-1 → 2-1) | **+5 puan** |
| Sonuç doğru ama skor yanlış (örn: 2-1 → 3-0) | **+3 puan** |
| Grup 1. veya 2.'si doğru | **+5 puan** |
| Grup 3. veya 4.'sü doğru | **+2 puan** |

---

## Sorun giderme

**`npm install` hata verirse:**
- Node.js sürümünü kontrol et: `node --version` → v18+ olmalı

**Supabase bağlanamıyor:**
- `.env` dosyasının proje klasöründe olduğundan emin ol
- URL ve key'i doğru kopyaladığını kontrol et (başında/sonunda boşluk olmasın)

**Vercel'de çalışmıyor:**
- Vercel dashboard > Project > Settings > Environment Variables → bilgileri tekrar ekle
- Redeploy yap

---

Herhangi bir adımda takılırsan, hangi adımda hata aldığını söyle!
