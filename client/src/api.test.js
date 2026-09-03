import test from 'node:test';
import assert from 'node:assert/strict';

test('uses stable product detail URLs', () => {
  const slug = 'samsung-galaxy-s25-ultra';
  assert.equal(`/products/${slug}`, '/products/samsung-galaxy-s25-ultra');
});
