import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, '../data');
fs.mkdirSync(dataDir, { recursive: true });
const dbPath = process.env.DB_PATH || path.join(dataDir, 'marketplace.db');

if (!fs.existsSync(dbPath)) {
  await import('./seed.js');
}

export const db = new Database(dbPath, { readonly: false });
db.pragma('foreign_keys = ON');

const mapProduct = (row) => ({
  id: row.id,
  slug: row.slug,
  brand: row.brand,
  name: row.name,
  tagline: row.tagline,
  description: row.description,
  category: row.category,
  imageUrl: row.image_url,
  badge: row.badge,
  rating: row.rating,
  soldCount: row.sold_count,
  seller: row.seller,
  featured: Boolean(row.featured)
});

export function listProducts(search = '') {
  const term = `%${search.trim()}%`;
  const rows = db.prepare(`
    SELECT p.*, MIN(v.price) AS starting_price, MIN(v.mrp) AS mrp,
      MIN(ep.monthly_payment) AS starting_emi
    FROM products p
    JOIN variants v ON v.product_id = p.id
    JOIN emi_plans ep ON ep.variant_id = v.id
    WHERE p.name LIKE ? OR p.brand LIKE ? OR p.category LIKE ?
    GROUP BY p.id ORDER BY p.featured DESC, p.id
  `).all(term, term, term);
  return rows.map((row) => ({ ...mapProduct(row), startingPrice: row.starting_price, mrp: row.mrp, startingEmi: row.starting_emi }));
}

export function getProduct(slug) {
  const row = db.prepare('SELECT * FROM products WHERE slug = ?').get(slug);
  if (!row) return null;
  const variants = db.prepare('SELECT * FROM variants WHERE product_id = ? ORDER BY is_default DESC, id').all(row.id);
  const planQuery = db.prepare('SELECT * FROM emi_plans WHERE variant_id = ? ORDER BY tenure_months');
  const images = db.prepare('SELECT image_url, alt_text FROM product_images WHERE product_id = ? ORDER BY sort_order, id').all(row.id);
  const specifications = db.prepare('SELECT label, value FROM product_specifications WHERE product_id = ? ORDER BY sort_order, id').all(row.id);
  return {
    ...mapProduct(row),
    images: images.map((image) => ({ imageUrl: image.image_url, alt: image.alt_text })),
    specifications,
    variants: variants.map((variant) => ({
      id: variant.id,
      label: variant.label,
      storage: variant.storage,
      color: variant.color,
      colorHex: variant.color_hex,
      imageUrl: variant.image_url,
      mrp: variant.mrp,
      price: variant.price,
      isDefault: Boolean(variant.is_default),
      emiPlans: planQuery.all(variant.id).map((plan) => ({
        id: plan.id,
        tenureMonths: plan.tenure_months,
        monthlyPayment: plan.monthly_payment,
        interestRate: plan.interest_rate,
        cashback: plan.cashback,
        recommended: Boolean(plan.recommended)
      }))
    }))
  };
}

export function createCheckout(productId, variantId, planId) {
  const reference = `1FI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  db.prepare(`INSERT INTO checkout_intents (reference, product_id, variant_id, emi_plan_id)
    VALUES (?, ?, ?, ?)`).run(reference, productId, variantId, planId);
  return reference;
}
