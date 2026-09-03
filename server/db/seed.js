import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, '../data');
fs.mkdirSync(dataDir, { recursive: true });
const dbPath = process.env.DB_PATH || path.join(dataDir, 'marketplace.db');
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');
db.exec(fs.readFileSync(path.join(here, 'schema.sql'), 'utf8'));

const products = [
  {
    slug: 'iphone-17-pro', brand: 'Apple', name: 'iPhone 17 Pro',
    tagline: 'Pro power. Effortlessly yours.',
    description: 'A premium titanium smartphone with a pro camera system, all-day battery and a brilliant edge-to-edge display.',
    category: 'Smartphones', imageUrl: '/products/iphone.svg', badge: 'Best seller', featured: 1,
    variants: [
      ['256 GB · Silver', '256 GB', 'Silver', '#d8d7d2', 134900, 129900],
      ['512 GB · Cosmic Orange', '512 GB', 'Cosmic Orange', '#d66e3b', 154900, 149900],
      ['512 GB · Deep Blue', '512 GB', 'Deep Blue', '#36445f', 154900, 149900]
    ]
  },
  {
    slug: 'samsung-galaxy-s25-ultra', brand: 'Samsung', name: 'Galaxy S25 Ultra',
    tagline: 'Galaxy AI meets Ultra.',
    description: 'An ultra-capable flagship with a precision stylus, intelligent camera tools and a vivid immersive display.',
    category: 'Smartphones', imageUrl: '/products/galaxy.svg', badge: 'Instant approval', featured: 1,
    variants: [
      ['256 GB · Titanium Gray', '256 GB', 'Titanium Gray', '#989792', 129999, 119999],
      ['512 GB · Titanium Black', '512 GB', 'Titanium Black', '#343434', 141999, 131999]
    ]
  },
  {
    slug: 'google-pixel-10-pro', brand: 'Google', name: 'Pixel 10 Pro',
    tagline: 'Helpful by design.',
    description: 'A refined AI-first phone with intelligent photography, clean software and a polished all-day experience.',
    category: 'Smartphones', imageUrl: '/products/pixel.svg', badge: 'New launch', featured: 0,
    variants: [
      ['256 GB · Porcelain', '256 GB', 'Porcelain', '#eee9df', 109999, 99999],
      ['256 GB · Obsidian', '256 GB', 'Obsidian', '#292929', 109999, 99999]
    ]
  }
];

const clear = db.transaction(() => {
  db.exec('DELETE FROM emi_plans; DELETE FROM variants; DELETE FROM products;');
});
const insertProduct = db.prepare(`INSERT INTO products
  (slug, brand, name, tagline, description, category, image_url, badge, featured)
  VALUES (@slug, @brand, @name, @tagline, @description, @category, @imageUrl, @badge, @featured)`);
const insertVariant = db.prepare(`INSERT INTO variants
  (product_id, label, storage, color, color_hex, mrp, price, is_default)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
const insertPlan = db.prepare(`INSERT INTO emi_plans
  (variant_id, tenure_months, monthly_payment, interest_rate, cashback, recommended)
  VALUES (?, ?, ?, ?, ?, ?)`);

const seed = db.transaction(() => {
  clear();
  for (const product of products) {
    const { variants, ...data } = product;
    const productId = Number(insertProduct.run(data).lastInsertRowid);
    variants.forEach((variant, index) => {
      const variantId = Number(insertVariant.run(productId, ...variant, index === 0 ? 1 : 0).lastInsertRowid);
      const price = variant[5];
      [6, 9, 12].forEach((months) => {
        const cashback = months === 12 ? Math.round(price * 0.02) : 0;
        insertPlan.run(variantId, months, Math.ceil((price - cashback) / months), 0, cashback, months === 12 ? 1 : 0);
      });
    });
  }
});

seed();
console.log(`Seeded ${products.length} products into ${dbPath}`);
db.close();
