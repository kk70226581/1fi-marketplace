import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { app } from './app.js';

test('lists seeded products from SQLite', async () => {
  const response = await request(app).get('/api/products').expect(200);
  assert.equal(response.body.products.length, 3);
  assert.ok(response.body.products.every((product) => product.startingEmi > 0));
});

test('returns variants and plans at a unique product URL', async () => {
  const response = await request(app).get('/api/products/iphone-17-pro').expect(200);
  assert.equal(response.body.product.variants.length, 3);
  assert.ok(response.body.product.variants.every((variant) => variant.emiPlans.length >= 3));
});

test('validates checkout selections', async () => {
  await request(app).post('/api/checkout').send({ productSlug: 'iphone-17-pro' }).expect(400);
  const product = (await request(app).get('/api/products/iphone-17-pro')).body.product;
  const variant = product.variants[0];
  const response = await request(app).post('/api/checkout').send({
    productSlug: product.slug, variantId: variant.id, planId: variant.emiPlans[0].id
  }).expect(201);
  assert.equal(response.body.checkout.status, 'ready');
});
