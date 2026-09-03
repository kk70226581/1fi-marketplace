import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, '../data');
fs.mkdirSync(dataDir, { recursive: true });
const dbPath = process.env.DB_PATH || path.join(dataDir, 'marketplace.db');
const db = new Database(dbPath);

db.pragma('foreign_keys = OFF');
db.exec(`
  DROP TABLE IF EXISTS checkout_intents;
  DROP TABLE IF EXISTS emi_plans;
  DROP TABLE IF EXISTS variants;
  DROP TABLE IF EXISTS product_images;
  DROP TABLE IF EXISTS product_specifications;
  DROP TABLE IF EXISTS products;
`);
db.pragma('foreign_keys = ON');
db.exec(fs.readFileSync(path.join(here, 'schema.sql'), 'utf8'));

const products = [
  {
    slug: 'iphone-17-pro', brand: 'Apple', name: 'iPhone 17 Pro',
    tagline: 'Pro power. Effortlessly yours.',
    description: 'A premium smartphone with a pro camera system, all-day battery and a brilliant edge-to-edge display.',
    category: 'Smartphones', imageUrl: '/products/iphone-orange.svg', badge: 'NEW', rating: 4.8, soldCount: 120, seller: '1Fi Select', featured: 1,
    images: ['/products/iphone-orange.svg', '/products/iphone-silver.svg', '/products/iphone-blue.svg'],
    specs: [['Display', '6.3-inch Super Retina XDR'], ['Processor', 'A19 Pro chip'], ['Rear camera', '48MP Pro camera system'], ['Front camera', '18MP Center Stage'], ['Battery', 'All-day battery life'], ['In the box', 'Handset, USB-C cable, documentation']],
    variants: [
      ['256 GB · Cosmic Orange', '256 GB', 'Cosmic Orange', '#e46f34', '/products/iphone-orange.svg', 134900, 127400],
      ['256 GB · Silver', '256 GB', 'Silver', '#deded9', '/products/iphone-silver.svg', 134900, 127400],
      ['256 GB · Deep Blue', '256 GB', 'Deep Blue', '#354663', '/products/iphone-blue.svg', 134900, 127400]
    ]
  },
  {
    slug: 'samsung-galaxy-s25-ultra', brand: 'Samsung', name: 'Galaxy S25 Ultra',
    tagline: 'Galaxy AI meets Ultra.',
    description: 'An ultra-capable flagship with a precision stylus, intelligent camera tools and a vivid immersive display.',
    category: 'Smartphones', imageUrl: '/products/galaxy-gray.svg', badge: 'BESTSELLER', rating: 4.7, soldCount: 94, seller: '1Fi Select', featured: 1,
    images: ['/products/galaxy-gray.svg', '/products/galaxy-black.svg'],
    specs: [['Display', '6.9-inch Dynamic AMOLED 2X'], ['Processor', 'Snapdragon 8 Elite'], ['Rear camera', '200MP quad camera'], ['Front camera', '12MP'], ['Battery', '5000 mAh'], ['In the box', 'Handset, S Pen, USB-C cable, documentation']],
    variants: [
      ['256 GB · Titanium Gray', '256 GB', 'Titanium Gray', '#989792', '/products/galaxy-gray.svg', 129999, 119999],
      ['512 GB · Titanium Black', '512 GB', 'Titanium Black', '#343434', '/products/galaxy-black.svg', 141999, 131999]
    ]
  },
  {
    slug: 'google-pixel-10-pro', brand: 'Google', name: 'Pixel 10 Pro',
    tagline: 'Helpful by design.',
    description: 'A refined AI-first phone with intelligent photography, clean software and a polished all-day experience.',
    category: 'Smartphones', imageUrl: '/products/pixel-porcelain.svg', badge: 'NEW LAUNCH', rating: 4.6, soldCount: 61, seller: '1Fi Select', featured: 0,
    images: ['/products/pixel-porcelain.svg', '/products/pixel-obsidian.svg'],
    specs: [['Display', '6.3-inch Super Actua display'], ['Processor', 'Google Tensor G5'], ['Rear camera', 'Pro triple camera system'], ['Front camera', '42MP'], ['Battery', '24+ hour battery'], ['In the box', 'Handset, USB-C cable, documentation']],
    variants: [
      ['256 GB · Porcelain', '256 GB', 'Porcelain', '#eee9df', '/products/pixel-porcelain.svg', 109999, 99999],
      ['256 GB · Obsidian', '256 GB', 'Obsidian', '#292929', '/products/pixel-obsidian.svg', 109999, 99999]
    ]
  }
];

const insertProduct = db.prepare(`INSERT INTO products
  (slug, brand, name, tagline, description, category, image_url, badge, rating, sold_count, seller, featured)
  VALUES (@slug, @brand, @name, @tagline, @description, @category, @imageUrl, @badge, @rating, @soldCount, @seller, @featured)`);
const insertImage = db.prepare('INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES (?, ?, ?, ?)');
const insertSpec = db.prepare('INSERT INTO product_specifications (product_id, label, value, sort_order) VALUES (?, ?, ?, ?)');
const insertVariant = db.prepare(`INSERT INTO variants
  (product_id, label, storage, color, color_hex, image_url, mrp, price, is_default)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
const insertPlan = db.prepare(`INSERT INTO emi_plans
  (variant_id, tenure_months, monthly_payment, interest_rate, cashback, recommended)
  VALUES (?, ?, ?, ?, ?, ?)`);

function monthlyPayment(principal, months, annualRate) {
  if (annualRate === 0) return Math.ceil(principal / months);
  const rate = annualRate / 1200;
  return Math.ceil(principal * rate * ((1 + rate) ** months) / (((1 + rate) ** months) - 1));
}

const seed = db.transaction(() => {
  for (const product of products) {
    const { variants, images, specs, ...data } = product;
    const productId = Number(insertProduct.run(data).lastInsertRowid);
    images.forEach((imageUrl, index) => insertImage.run(productId, imageUrl, `${product.name} view ${index + 1}`, index));
    specs.forEach(([label, value], index) => insertSpec.run(productId, label, value, index));
    variants.forEach((variant, index) => {
      const variantId = Number(insertVariant.run(productId, ...variant, index === 0 ? 1 : 0).lastInsertRowid);
      const mrp = variant[5];
      const cashback = mrp - variant[6];
      const referencePayments = { 3: 44967, 6: 22483, 12: 11242, 24: 5621, 36: 4297, 48: 3385, 60: 2842 };
      [3, 6, 12, 24, 36, 48, 60].forEach((months) => {
        const rate = months <= 24 ? 0 : 10.5;
        const payment = product.slug === 'iphone-17-pro' ? referencePayments[months] : monthlyPayment(mrp, months, rate);
        insertPlan.run(variantId, months, payment, rate, cashback, months === 12 ? 1 : 0);
      });
    });
  }
});

seed();
console.log(`Seeded ${products.length} products into ${dbPath}`);
db.close();
