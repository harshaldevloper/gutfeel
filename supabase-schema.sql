-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/njnluxdbvpccsawgdzxw/sql/new

-- Users table (managed by Supabase Auth, but we can extend profiles)
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

-- Symptom entries
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

-- FODMAP fingerprint (user's personal trigger profile)
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

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE fingerprint ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own symptoms" ON symptoms FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own symptoms" ON symptoms FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own fingerprint" ON fingerprint FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own fingerprint" ON fingerprint FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own fingerprint" ON fingerprint FOR UPDATE USING (auth.uid() = user_id);
