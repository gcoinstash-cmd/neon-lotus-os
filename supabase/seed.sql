-- NEON LOTUS OS: PRODUCTION SEED DATA
-- Turnkey mock production records for instant validation

-- 1. Seed: speakeasy_booths
INSERT INTO public.speakeasy_booths (booth_code, name, capacity_desc, ambiance_notes, status)
VALUES
    ('BTH-08', 'Imperial Dragon Booth', '6-8 Guests', 'Crimson Neon & Silk Partitions', 'OCCUPIED'),
    ('BTH-02', 'Lantern Room Alcove', '4-6 Guests', 'Amber Hanging Lanterns', 'OCCUPIED'),
    ('CTR-03', 'Chef''s Dumpling Counter', '2 Guests', 'Direct View of Steamer Station', 'SEATED'),
    ('PAV-01', 'Imperial VIP Pavilion', '12-16 Guests', 'Private Soundproof Salon', 'RESERVED')
ON CONFLICT (booth_code) DO NOTHING;

-- 2. Seed: dim_sum_menu
INSERT INTO public.dim_sum_menu (sku, name, category, description, price_usd, kitchen_hearth_temp, in_stock)
VALUES
    ('DS-01', 'Truffle Pork Xiao Long Bao (Soup Dumplings)', 'Steamed Baskets', 'Heritage pork broth, winter black truffle reduction, delicate hand-pinched skins', 24.00, '100°C Steam', true),
    ('DS-02', 'Crispy Wagyu Beef Char Siu Puffs', 'Baked Delicacies', 'Flaky laminated pastry, sweet honey-glazed Australian Wagyu beef, toasted sesame', 28.00, 'Fresh Baked', true),
    ('DS-03', 'Lobster & Tiger Prawn Shumai with Golden Caviar', 'Signature Dim Sum', 'Wild Maine lobster, crisp water chestnuts, open-topped with Siberian sturgeon caviar', 32.00, 'Optimum', true),
    ('DS-04', 'Inferno Wok-Seared Dan Dan Noodles', 'Wok Protocols', 'Hand-pulled wheat noodles, Sichuan chili crisp, fermented mustard greens, crispy minced duck', 22.00, '1,000°C Wok Hei', true)
ON CONFLICT (sku) DO NOTHING;

-- 3. Seed: baijiu_cocktails
INSERT INTO public.baijiu_cocktails (cocktail_code, name, spirit_base, abv, price_usd, cellar_reservoir_level, status)
VALUES
    ('CKT-201', 'The Dragon''s Pearl', 'Kweichow Moutai + Lychee', '22%', 26.00, '88% Full', 'ACTIVE'),
    ('CKT-202', 'Crimson Lantern Highball', 'Infused Baijiu + Plum Vinegar + Tonic', '16%', 20.00, '94% Full', 'ACTIVE'),
    ('CKT-203', 'Jade Empress Negroni', 'Aged Luzhou Laojiao + Campari + Vermouth', '24%', 24.00, '76% Full', 'ACTIVE'),
    ('CKT-204', 'Wuyi Mountain Smoked Tea Zero-Proof', 'Smoked Lapsang Souchong + Citrus Essence', '0% Non-Alc', 15.00, '100% Full', 'ACTIVE')
ON CONFLICT (cocktail_code) DO NOTHING;

-- 4. Seed: bistro_reservations
INSERT INTO public.bistro_reservations (guest_name, guest_email, guest_phone, experience_tier, party_size, reservation_date, reservation_time, table_node, special_requests, status)
VALUES
    ('Marcus Sterling', 'marcus@sterling-capital.com', '+1 415-555-0199', 'Dragon Banquet', 6, CURRENT_DATE, '19:30', 'Booth 08 (Neon Alcove)', 'Celebrating anniversary; pre-order Moutai bottle', 'CONFIRMED'),
    ('Dr. Vivienne Chen', 'vivienne.chen@uchicago.edu', '+1 312-555-0144', 'Chef''s Dim Sum Flight', 2, CURRENT_DATE, '20:15', 'Chef Counter 03', 'Shellfish preference, no cilantro', 'SEATED'),
    ('Alexander Wright', 'wright@apex-ventures.io', '+1 212-555-0182', 'Baijiu Tasting Room', 4, CURRENT_DATE, '21:00', 'Booth 02 (Lantern Room)', 'Highball pairing flight requested', 'CONFIRMED'),
    ('Chloe Laurent', 'chloe@laurent-design.fr', '+33 6-555-0123', 'Bistro Speakeasy Buyout', 12, CURRENT_DATE + INTERVAL '1 day', '22:00', 'Imperial Pavilion', 'Private corporate reception', 'PENDING_DEPOSIT');
