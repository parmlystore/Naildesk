# NailDesk

Nail studio booking and business management app.

## Tech stack
- React 18 + Vite
- Supabase (database + auth + realtime)
- Resend (email confirmations)
- Vercel (hosting + serverless functions)
- PWA (installable on iPhone/Android)

## Setup

### 1. Install
```bash
npm install
```

### 2. Set up Supabase
- Create project at supabase.com (Sydney region recommended)
- Run schema (see /api/booking-logic.js comments for required tables:
  appointments, blocked_dates, studios, studio_hours)
- Copy your URL and anon key

### 3. Set up Resend (email)
- Create account at resend.com
- Verify your sending domain
- Get API key

### 4. Environment variables
```bash
cp .env.example .env
# Fill in your Supabase + Resend keys
```

### 5. Run locally
```bash
npm run dev
```

### 6. Deploy to Vercel
```bash
npm run build
vercel --prod
```
Add environment variables in Vercel dashboard (including server-side only keys).

## Features
- Owner dashboard — appointments, clients, finances, prices, stock/to-do
- Client-facing online booking (4-step flow)
- Double-booking protection (DB-level unique constraint)
- Owner email notification on new booking
- Client email confirmation + 24hr reminder
- Client self-service cancel/reschedule (reference + email lookup)
- Blocked dates / holidays
- Deposit + bank transfer instructions (no Stripe needed)
- Exportable/printable branded price list
- Business Support + IT Support request forms (referral-based, TPB-compliant)
- Bilingual-ready structure

## Pricing tiers
- Basic — AUD $399 (manual calendar only, no online booking)
- Pro — AUD $799 (full online booking system)
- Studio — AUD $1,299 (custom branding + business setup referral)

## Compliance notes
- No direct tax/BAS/GST advice given — Support page refers to registered professionals only
- No Registration/compliance checklist page (removed for TPB compliance)
- Privacy Policy needed before launch (collects client name/phone/health notes)
