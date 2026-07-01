-- ═══════════════════════════════════════════════════════════════
-- NAILDESK — SUPABASE SCHEMA
-- Run this in Supabase SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════

-- ── 1. STUDIOS ───────────────────────────────────────────────────
CREATE TABLE studios (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  owner_email     TEXT NOT NULL,
  owner_phone     TEXT,
  address         TEXT,
  timezone        TEXT DEFAULT 'Australia/Sydney',
  booking_slug    TEXT UNIQUE,  -- e.g. "bloom-nails" for naildesk.au/book/bloom-nails
  unlocked        BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. STUDIO HOURS (weekly recurring) ───────────────────────────
CREATE TABLE studio_hours (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id       UUID REFERENCES studios(id) ON DELETE CASCADE,
  day_of_week     TEXT NOT NULL CHECK (day_of_week IN ('Mon','Tue','Wed','Thu','Fri','Sat','Sun')),
  is_open         BOOLEAN DEFAULT TRUE,
  start_time      TIME,
  end_time        TIME,
  slot_length_mins INT DEFAULT 30,
  UNIQUE(studio_id, day_of_week)
);

-- ── 3. BLOCKED DATES (holidays/days off) ─────────────────────────
CREATE TABLE blocked_dates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id   UUID REFERENCES studios(id) ON DELETE CASCADE,
  date        DATE NOT NULL,
  reason      TEXT,
  all_day     BOOLEAN DEFAULT TRUE,
  start_time  TIME,
  end_time    TIME,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(studio_id, date)
);

-- ── 4. SERVICES / PRICE LIST ──────────────────────────────────────
CREATE TABLE services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id   UUID REFERENCES studios(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  duration_mins INT NOT NULL DEFAULT 60,
  price       NUMERIC(10,2) NOT NULL,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 5. CLIENTS ────────────────────────────────────────────────────
CREATE TABLE clients (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id   UUID REFERENCES studios(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  phone       TEXT,
  email       TEXT,
  dob         DATE,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 6. APPOINTMENTS — with double-booking protection ─────────────
CREATE TABLE appointments (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id         UUID REFERENCES studios(id) ON DELETE CASCADE,
  client_id         UUID REFERENCES clients(id) ON DELETE SET NULL,
  service_id        UUID REFERENCES services(id) ON DELETE SET NULL,
  reference         TEXT UNIQUE NOT NULL,
  appointment_date  DATE NOT NULL,
  appointment_time  TIME NOT NULL,
  duration_mins     INT NOT NULL,
  price             NUMERIC(10,2) NOT NULL,
  service_name      TEXT NOT NULL,  -- denormalized in case service is later deleted/renamed
  client_name       TEXT NOT NULL,
  client_phone      TEXT,
  client_email      TEXT,
  source            TEXT DEFAULT 'manual' CHECK (source IN ('online','manual')),
  status            TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed','cancelled','completed')),
  reminder_sent     BOOLEAN DEFAULT FALSE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),

  -- CRITICAL: prevents double-booking at the database level
  CONSTRAINT unique_studio_slot UNIQUE (studio_id, appointment_date, appointment_time)
);

-- ── 7. INCOME ─────────────────────────────────────────────────────
CREATE TABLE income (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id   UUID REFERENCES studios(id) ON DELETE CASCADE,
  date        DATE NOT NULL,
  client_name TEXT,
  type        TEXT,
  amount      NUMERIC(10,2) NOT NULL,
  method      TEXT DEFAULT 'Card',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 8. EXPENSES ───────────────────────────────────────────────────
CREATE TABLE expenses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id   UUID REFERENCES studios(id) ON DELETE CASCADE,
  date        DATE NOT NULL,
  category    TEXT NOT NULL,
  description TEXT,
  amount      NUMERIC(10,2) NOT NULL,
  receipt     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 9. STOCK ──────────────────────────────────────────────────────
CREATE TABLE stock_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id   UUID REFERENCES studios(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  qty         INT DEFAULT 0,
  reorder_at  INT DEFAULT 0,
  unit        TEXT DEFAULT 'pcs',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 10. TO-DOS ────────────────────────────────────────────────────
CREATE TABLE todos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id   UUID REFERENCES studios(id) ON DELETE CASCADE,
  text        TEXT NOT NULL,
  done        BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 11. BOOKING SETTINGS (deposit/bank details) ──────────────────
CREATE TABLE booking_settings (
  studio_id           UUID PRIMARY KEY REFERENCES studios(id) ON DELETE CASCADE,
  require_deposit     BOOLEAN DEFAULT FALSE,
  deposit_amount      NUMERIC(10,2),
  bank_account_name   TEXT,
  bank_bsb            TEXT,
  bank_account_number TEXT,
  custom_message      TEXT,
  booking_window_days INT DEFAULT 14,
  min_notice_hours    INT DEFAULT 2
);

-- ── 12. SUPPORT REQUESTS (CPA referral + IT support) ─────────────
CREATE TABLE support_requests (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id   UUID REFERENCES studios(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('cpa','it')),
  topics      TEXT[],
  message     TEXT,
  urgent      BOOLEAN DEFAULT FALSE,
  status      TEXT DEFAULT 'open' CHECK (status IN ('open','resolved')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────
ALTER TABLE studios            ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_hours       ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates      ENABLE ROW LEVEL SECURITY;
ALTER TABLE services           ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients            ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE income              ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses           ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_items        ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos              ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_settings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_requests   ENABLE ROW LEVEL SECURITY;

-- Helper: get studio_id for the logged-in owner
CREATE OR REPLACE FUNCTION get_my_studio_id()
RETURNS UUID AS $$
  SELECT id FROM studios WHERE owner_email = auth.jwt() ->> 'email' LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER;

-- Owner-only access policies
DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'studio_hours','blocked_dates','services','clients','appointments',
    'income','expenses','stock_items','todos','booking_settings','support_requests'
  ] LOOP
    EXECUTE format(
      'CREATE POLICY "owner_access_%s" ON %s FOR ALL USING (studio_id = get_my_studio_id())',
      tbl, tbl
    );
  END LOOP;
END $$;

CREATE POLICY "studio_owner_only" ON studios
  FOR ALL USING (owner_email = auth.jwt() ->> 'email');

-- Public can READ studio info + services + availability for booking page
-- (booking page is unauthenticated — clients don't log in)
CREATE POLICY "public_read_studio_for_booking" ON studios
  FOR SELECT USING (true);
CREATE POLICY "public_read_services_for_booking" ON services
  FOR SELECT USING (active = true);
CREATE POLICY "public_read_hours_for_booking" ON studio_hours
  FOR SELECT USING (true);
CREATE POLICY "public_read_blocked_for_booking" ON blocked_dates
  FOR SELECT USING (true);

-- Public can INSERT appointments (the booking action itself)
-- but cannot read/update/delete other people's bookings
CREATE POLICY "public_can_book" ON appointments
  FOR INSERT WITH CHECK (source = 'online');

-- Public can look up their OWN booking via reference + email match
-- (handled in application logic, not RLS, since no auth session exists)

-- ── INDEXES ──────────────────────────────────────────────────────
CREATE INDEX idx_appointments_studio_date ON appointments(studio_id, appointment_date);
CREATE INDEX idx_appointments_reference ON appointments(reference);
CREATE INDEX idx_clients_studio ON clients(studio_id);
CREATE INDEX idx_income_studio_date ON income(studio_id, date);
CREATE INDEX idx_expenses_studio_date ON expenses(studio_id, date);

