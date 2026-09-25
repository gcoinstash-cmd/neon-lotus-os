# Turnkey Database Setup: Neon Lotus OS
Ghost Factory™ 9.0+ Verified Full-Stack System

Deploy this production PostgreSQL database to **Supabase** in less than 3 minutes.

---

### Step 1: Create Supabase Project
1. Log into [supabase.com](https://supabase.com).
2. Click **New Project** and name it `neon-lotus-db`.
3. Choose your nearest hosting region.

---

### Step 2: Run Database Migration
1. Go to the **SQL Editor** in your Supabase project sidebar.
2. Copy and paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and click **Run**.
3. Copy and paste the entire contents of [`supabase/seed.sql`](./supabase/seed.sql) and click **Run**.
4. All 4 tables (`bistro_reservations`, `dim_sum_menu`, `baijiu_cocktails`, `speakeasy_booths`) are now populated with Row Level Security (RLS) policies applied.

---

### Step 3: Wire Frontend Environment Variables
1. In Supabase, navigate to **Project Settings** > **API**.
2. Copy your `Project URL` and `anon public key`.
3. In your project root, create a `.env` file:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
4. Start your local dev server:
```bash
npm install
npm run build
```

---

### Admin Portal Backdoor
- Visit `https://your-domain.com/admin` or click **`[ BISTRO PASS ]`** in the navigation bar.
- Cheat Code Passkey: `lotus2026`
