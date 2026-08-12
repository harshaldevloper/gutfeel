-- Gutfeel Supabase schema (idempotent — safe to re-run)
-- Run in: https://supabase.com/dashboard/project/njnluxdbvpccsawgdzxw/sql/new

-- ─── Tables ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  name TEXT,
  country TEXT DEFAULT 'IN',
  ibs_type TEXT,
  allergies TEXT[] DEFAULT '{}',
  dietary_preference TEXT[] DEFAULT '{}',
  cooking_skill TEXT DEFAULT 'beginner',
  household_size INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS symptoms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  severity INTEGER NOT NULL CHECK (severity >= 1 AND severity <= 5),
  symptoms TEXT[] DEFAULT '{}',
  bowel_movement TEXT DEFAULT 'normal',
  stress_level INTEGER DEFAULT 3,
  foods TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fingerprint (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  food_name TEXT NOT NULL,
  status TEXT CHECK (status IN ('safe', 'likely-safe', 'unknown', 'likely-trigger', 'confirmed-trigger')),
  confidence INTEGER DEFAULT 0,
  test_count INTEGER DEFAULT 0,
  last_tested TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, food_name)
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  dodo_subscription_id TEXT UNIQUE,
  dodo_customer_id TEXT,
  plan TEXT CHECK (plan IN ('premium', 'annual')),
  status TEXT CHECK (status IN ('active', 'on_hold', 'cancelled', 'expired', 'failed')) DEFAULT 'active',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: log raw Dodo webhook events for debugging
CREATE TABLE IF NOT EXISTS dodo_webhook_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  dodo_event_id TEXT,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── RLS ──────────────────────────────────────────────────────────────────

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE fingerprint ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dodo_webhook_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first (fixes "policy already exists" on re-run)
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

DROP POLICY IF EXISTS "Users can view own symptoms" ON symptoms;
DROP POLICY IF EXISTS "Users can insert own symptoms" ON symptoms;

DROP POLICY IF EXISTS "Users can view own fingerprint" ON fingerprint;
DROP POLICY IF EXISTS "Users can insert own fingerprint" ON fingerprint;
DROP POLICY IF EXISTS "Users can update own fingerprint" ON fingerprint;

DROP POLICY IF EXISTS "Users can view own subscription" ON subscriptions;

-- Recreate policies
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own symptoms" ON symptoms
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own symptoms" ON symptoms
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own fingerprint" ON fingerprint
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own fingerprint" ON fingerprint
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own fingerprint" ON fingerprint
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- webhook log: service role only (no client policies)
