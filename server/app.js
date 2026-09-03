import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getProduct, listProducts } from './db/database.js';

const here = path.dirname(fileURLToPath(import.meta.url));
export const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/api/products', (req, res) => res.json({ products: listProducts(String(req.query.search || '')) }));
app.get('/api/products/:slug', (req, res) => {
  const product = getProduct(req.params.slug);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  return res.json({ product });
});
app.post('/api/checkout', (req, res) => {
  const { productSlug, variantId, planId } = req.body || {};
  if (!productSlug || !Number.isInteger(variantId) || !Number.isInteger(planId)) {
    return res.status(400).json({ error: 'productSlug, variantId and planId are required' });
  }
  const product = getProduct(productSlug);
  const variant = product?.variants.find((item) => item.id === variantId);
  const plan = variant?.emiPlans.find((item) => item.id === planId);
  if (!product || !variant || !plan) return res.status(400).json({ error: 'Invalid product selection' });
  return res.status(201).json({
    checkout: {
      id: `1FI-${Date.now().toString(36).toUpperCase()}`,
      product: product.name,
      variant: variant.label,
      monthlyPayment: plan.monthlyPayment,
      tenureMonths: plan.tenureMonths,
      status: 'ready'
    }
  });
});

const clientDist = path.resolve(here, '../client/dist');
app.use(express.static(clientDist));
app.get('/{*splat}', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  return res.sendFile(path.join(clientDist, 'index.html'), (error) => error && next());
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: 'Something went wrong' });
});
