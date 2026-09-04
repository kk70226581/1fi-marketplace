import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

process.env.NODE_ENV = 'test';
process.env.MONGODB_URI ||= 'mongodb://127.0.0.1:27017/onefi_marketplace_test';

const [{ app }, { connectDatabase, disconnectDatabase }, { seedDatabase }] = await Promise.all([
  import('./app.js'),
  import('./db/database.js'),
  import('./db/seed.js')
]);

await connectDatabase();
await seedDatabase();

test.after(async () => {
  await disconnectDatabase();
});

test('lists ten seeded products from MongoDB', async () => {
  const response = await request(app).get('/api/products').expect(200);
  assert.equal(response.body.products.length, 10);
  assert.ok(response.body.products.every((product) => product.startingEmi > 0));
  assert.ok(response.body.products.every((product) => typeof product.id === 'string'));
});

test('provides at least three products with two or more purchasable variants', async () => {
  const productSlugs = ['iphone-17-pro', 'samsung-galaxy-s25-ultra', 'google-pixel-10-pro'];
  const products = await Promise.all(productSlugs.map(async (slug) => (
    (await request(app).get(`/api/products/${slug}`).expect(200)).body.product
  )));
  assert.ok(products.every((product) => product.variants.length >= 2));
  assert.ok(products.every((product) => product.variants.every((variant) => variant.emiPlans.length >= 2)));
});

test('returns embedded variants and plans at a unique product URL', async () => {
  const response = await request(app).get('/api/products/iphone-17-pro').expect(200);
  assert.equal(response.body.product.variants.length, 3);
  assert.ok(response.body.product.variants.every((variant) => variant.emiPlans.length === 7));
  assert.ok(response.body.product.variants[0].emiPlans.some((plan) => plan.interestRate === 10.5));
  assert.equal(new Set(response.body.product.variants.map((variant) => variant.imageUrl)).size, 3);
});

test('persists a valid checkout selection in MongoDB', async () => {
  await request(app).post('/api/checkout').send({ productSlug: 'iphone-17-pro' }).expect(400);
  const product = (await request(app).get('/api/products/iphone-17-pro')).body.product;
  const variant = product.variants[0];
  const response = await request(app).post('/api/checkout').send({
    productSlug: product.slug, variantId: variant.id, planId: variant.emiPlans[0].id
  }).expect(201);
  assert.equal(response.body.checkout.status, 'ready');
});
