-- NEON LOTUS OS: PRODUCTION DATABASE SCHEMA
-- Engine: Supabase PostgreSQL (Row Level Security Enabled)
-- Standards: Ghost Factory™ 9.0+ Production Grade

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: bistro_reservations (Guest reservations & private dining salon bookings)
CREATE TABLE IF NOT EXISTS public.bistro_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    experience_tier TEXT NOT NULL CHECK (experience_tier IN ('Dragon Banquet', 'Chef''s Dim Sum Flight', 'Baijiu Tasting Room', 'Bistro Speakeasy Buyout')),
    party_size INTEGER NOT NULL CHECK (party_size > 0 AND party_size <= 24),
    reservation_date DATE NOT NULL,
    reservation_time TEXT NOT NULL,
    table_node TEXT NOT NULL DEFAULT 'Booth 08 (Neon Alcove)',
    special_requests TEXT,
    status TEXT NOT NULL DEFAULT 'CONFIRMED' CHECK (status IN ('CONFIRMED', 'SEATED', 'COMPLETED', 'CANCELLED', 'PENDING_DEPOSIT')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table: dim_sum_menu (Steamer baskets, baked delicacies & wok hei rations)
CREATE TABLE IF NOT EXISTS public.dim_sum_menu (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Steamed Baskets', 'Baked Delicacies', 'Signature Dim Sum', 'Wok Protocols')),
    description TEXT NOT NULL,
    price_usd NUMERIC(10, 2) NOT NULL,
    kitchen_hearth_temp TEXT NOT NULL DEFAULT '100°C Steam',
    in_stock BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table: baijiu_cocktails (Artisanal Chinese liquor infusions & tea craft)
CREATE TABLE IF NOT EXISTS public.baijiu_cocktails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cocktail_code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    spirit_base TEXT NOT NULL,
    abv TEXT NOT NULL,
    price_usd NUMERIC(10, 2) NOT NULL,
    cellar_reservoir_level TEXT NOT NULL DEFAULT '95% Full',
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'MAINTENANCE', 'RESERVE_ONLY')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table: speakeasy_booths (Private dining booths & silk salons)
CREATE TABLE IF NOT EXISTS public.speakeasy_booths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booth_code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    capacity_desc TEXT NOT NULL,
    ambiance_notes TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.bistro_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dim_sum_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.baijiu_cocktails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speakeasy_booths ENABLE ROW LEVEL SECURITY;

-- Anonymous public read access for storefront
CREATE POLICY "Allow public read on dim sum menu" 
    ON public.dim_sum_menu FOR SELECT USING (true);

CREATE POLICY "Allow public read on baijiu cocktails" 
    ON public.baijiu_cocktails FOR SELECT USING (true);

CREATE POLICY "Allow public read on speakeasy booths" 
    ON public.speakeasy_booths FOR SELECT USING (true);

CREATE POLICY "Allow public insert for reservations" 
    ON public.bistro_reservations FOR INSERT WITH CHECK (true);

-- Authenticated operator full access (Bistro Admins)
CREATE POLICY "Allow operator full access to reservations" 
    ON public.bistro_reservations FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow operator full access to dim sum menu" 
    ON public.dim_sum_menu FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow operator full access to baijiu cocktails" 
    ON public.baijiu_cocktails FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow operator full access to speakeasy booths" 
    ON public.speakeasy_booths FOR ALL USING (auth.role() = 'authenticated');
