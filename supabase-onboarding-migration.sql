-- ═══════════════════════════════════════════════════════════════
-- NAILDESK — ONBOARDING INTAKE MIGRATION
-- Run this in Supabase SQL Editor → New Query → Run
-- (Adds to the schema in naildesk-supabase-schema.sql — run that first
--  if you haven't already.)
-- ═══════════════════════════════════════════════════════════════

-- ── ONBOARDING SUBMISSIONS ─────────────────────────────────────────
-- One row per client who fills in the post-payment setup form.
-- Kept as its own table (not written straight into studios/services/
-- booking_settings) so every submission is reviewable before you
-- manually provision the client's real studio — safer than auto-
-- creating live rows from unverified form input.
CREATE TABLE onboarding_submissions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Purchase context
  tier                  TEXT CHECK (tier IN ('basic','pro','studio')),
  stripe_session_id     TEXT,

  -- Business + contact details
  studio_name           TEXT NOT NULL,
  owner_name            TEXT NOT NULL,
  owner_email           TEXT NOT NULL,
  owner_phone           TEXT,
  address               TEXT,
  timezone              TEXT DEFAULT 'Australia/Sydney',
  instagram             TEXT,

  -- Branding
  logo_url              TEXT,

  -- Operating hours — [{day:"Mon", is_open:true, start:"09:00", end:"18:00"}, ...]
  hours                 JSONB,

  -- Services & pricing — [{name:"Gel Manicure", duration_mins:60, price:80}, ...]
  services              JSONB,

  -- Deposit / bank details
  require_deposit       BOOLEAN DEFAULT FALSE,
  deposit_amount        NUMERIC(10,2),
  bank_account_name     TEXT,
  bank_bsb              TEXT,
  bank_account_number   TEXT,

  special_requests      TEXT,

  -- Your side: track where each submission is up to
  status                TEXT DEFAULT 'new' CHECK (status IN ('new','in_progress','live')),

  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Locked down by default: RLS is on with NO policies, so it's
-- reachable only via the service-role key from the serverless
-- function (never from the browser). Contains bank details —
-- never add a public policy to this table.
ALTER TABLE onboarding_submissions ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_onboarding_status ON onboarding_submissions(status);
CREATE INDEX idx_onboarding_created ON onboarding_submissions(created_at DESC);

-- ── LOGO STORAGE BUCKET ───────────────────────────────────────────
-- Public read (so the logo can be shown in the client's future app)
-- but uploads only happen server-side via the service-role key —
-- no public insert/update/delete policy is created.
INSERT INTO storage.buckets (id, name, public)
VALUES ('studio-logos', 'studio-logos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_read_studio_logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'studio-logos');
