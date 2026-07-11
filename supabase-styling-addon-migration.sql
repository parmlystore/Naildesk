-- ═══════════════════════════════════════════════════════════════
-- NAILDESK — STYLING ADD-ON MIGRATION
-- Run this in Supabase SQL Editor → New Query → Run
-- (Adds to onboarding_submissions from supabase-onboarding-migration.sql —
--  run that one first if you haven't already. Safe to run this even if
--  you're not sure — IF NOT EXISTS means it won't error on a re-run.)
-- ═══════════════════════════════════════════════════════════════

-- Captures whether a client opted into the optional custom style/colour
-- add-on ($149 AUD) on the onboarding form, and which palette they picked.
-- This does NOT charge them — you follow up manually with a separate
-- Stripe payment link once you've confirmed the details with them.
ALTER TABLE onboarding_submissions ADD COLUMN IF NOT EXISTS wants_styling_addon BOOLEAN DEFAULT FALSE;
ALTER TABLE onboarding_submissions ADD COLUMN IF NOT EXISTS style_preference TEXT;
ALTER TABLE onboarding_submissions ADD COLUMN IF NOT EXISTS style_notes TEXT;

CREATE INDEX IF NOT EXISTS idx_onboarding_wants_styling ON onboarding_submissions(wants_styling_addon) WHERE wants_styling_addon = TRUE;
