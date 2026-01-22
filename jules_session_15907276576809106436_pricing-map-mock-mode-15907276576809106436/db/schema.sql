-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 0. ENUMS
DO $$ BEGIN
    CREATE TYPE da_nang_district AS ENUM ('Hai Chau', 'Son Tra', 'Ngu Hanh Son', 'Lien Chieu', 'Thanh Khe', 'Cam Le');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE property_category AS ENUM ('Villa', 'Apartment');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  is_host BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROPERTIES
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price_vnd BIGINT NOT NULL, -- Renamed from price_per_night to be explicit
  address TEXT NOT NULL,
  district da_nang_district NOT NULL, -- Changed to Enum
  category property_category DEFAULT 'Apartment', -- New field
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing
CREATE INDEX IF NOT EXISTS idx_properties_district ON properties(district);

-- 3. PROPERTY_MEDIA
CREATE TABLE IF NOT EXISTS property_media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  type TEXT CHECK (type IN ('image', 'video')) DEFAULT 'image',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BOOKINGS
DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  guest_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price BIGINT NOT NULL,
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (end_date > start_date)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------------------
-- STRICT ADMIN POLICIES (hello@enspiredvietnam.com)
-- -------------------------------------------------------------------------

-- PROPERTIES
DROP POLICY IF EXISTS "Public read access" ON properties;
DROP POLICY IF EXISTS "Admin only insert" ON properties;
DROP POLICY IF EXISTS "Admin only update" ON properties;
DROP POLICY IF EXISTS "Admin only delete" ON properties;

CREATE POLICY "Public read access" 
ON properties FOR SELECT USING (true);

CREATE POLICY "Admin only insert" 
ON properties FOR INSERT 
WITH CHECK ((auth.jwt() ->> 'email') = 'hello@enspiredvietnam.com');

CREATE POLICY "Admin only update" 
ON properties FOR UPDATE 
USING ((auth.jwt() ->> 'email') = 'hello@enspiredvietnam.com');

CREATE POLICY "Admin only delete" 
ON properties FOR DELETE 
USING ((auth.jwt() ->> 'email') = 'hello@enspiredvietnam.com');

-- PROPERTY_MEDIA
DROP POLICY IF EXISTS "Public read media" ON property_media;
DROP POLICY IF EXISTS "Admin only insert media" ON property_media;
DROP POLICY IF EXISTS "Admin only update media" ON property_media;
DROP POLICY IF EXISTS "Admin only delete media" ON property_media;

CREATE POLICY "Public read media" 
ON property_media FOR SELECT USING (true);

CREATE POLICY "Admin only insert media" 
ON property_media FOR INSERT 
WITH CHECK ((auth.jwt() ->> 'email') = 'hello@enspiredvietnam.com');

CREATE POLICY "Admin only update media" 
ON property_media FOR UPDATE 
USING ((auth.jwt() ->> 'email') = 'hello@enspiredvietnam.com');

CREATE POLICY "Admin only delete media" 
ON property_media FOR DELETE 
USING ((auth.jwt() ->> 'email') = 'hello@enspiredvietnam.com');

-- STORAGE BUCKET
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true) 
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Give public access to property-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin write access to property-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin update access to property-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete access to property-images" ON storage.objects;

CREATE POLICY "Give public access to property-images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'property-images');

CREATE POLICY "Admin write access to property-images" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'property-images' 
  AND (auth.jwt() ->> 'email') = 'hello@enspiredvietnam.com'
);

CREATE POLICY "Admin update access to property-images" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'property-images' 
  AND (auth.jwt() ->> 'email') = 'hello@enspiredvietnam.com'
);

CREATE POLICY "Admin delete access to property-images" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'property-images' 
  AND (auth.jwt() ->> 'email') = 'hello@enspiredvietnam.com'
);

-- -------------------------------------------------------------------------
-- TRIGGERS (CRITICAL FOR NEW USER SIGNUP)
-- -------------------------------------------------------------------------

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
