PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  brand TEXT NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  badge TEXT,
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1))
);

CREATE TABLE IF NOT EXISTS variants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  storage TEXT NOT NULL,
  color TEXT NOT NULL,
  color_hex TEXT NOT NULL,
  mrp INTEGER NOT NULL CHECK (mrp > 0),
  price INTEGER NOT NULL CHECK (price > 0 AND price <= mrp),
  is_default INTEGER NOT NULL DEFAULT 0 CHECK (is_default IN (0, 1)),
  UNIQUE(product_id, label)
);

CREATE TABLE IF NOT EXISTS emi_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  variant_id INTEGER NOT NULL REFERENCES variants(id) ON DELETE CASCADE,
  tenure_months INTEGER NOT NULL CHECK (tenure_months > 0),
  monthly_payment INTEGER NOT NULL CHECK (monthly_payment > 0),
  interest_rate REAL NOT NULL CHECK (interest_rate >= 0),
  cashback INTEGER NOT NULL DEFAULT 0 CHECK (cashback >= 0),
  recommended INTEGER NOT NULL DEFAULT 0 CHECK (recommended IN (0, 1)),
  UNIQUE(variant_id, tenure_months)
);

CREATE INDEX IF NOT EXISTS idx_variants_product ON variants(product_id);
CREATE INDEX IF NOT EXISTS idx_plans_variant ON emi_plans(variant_id);
