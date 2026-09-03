import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCheckout, getProduct, listProducts } from './db/database.js';

const here = path.dirname(fileURLToPath(import.meta.url));
export const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: 'mongodb' }));
app.get('/api/products', async (req, res, next) => {
  try {
    const products = await listProducts(String(req.query.search || ''));
    return res.json({ products });
  } catch (error) {
    return next(error);
  }
});
app.get('/api/products/:slug', async (req, res, next) => {
  try {
    const product = await getProduct(req.params.slug);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    return res.json({ product });
  } catch (error) {
    return next(error);
  }
});
app.post('/api/checkout', async (req, res, next) => {
  const { productSlug, variantId, planId } = req.body || {};
  if (!productSlug || typeof variantId !== 'string' || typeof planId !== 'string') {
    return res.status(400).json({ error: 'productSlug, variantId and planId are required' });
  }
  try {
    const product = await getProduct(productSlug);
    const variant = product?.variants.find((item) => item.id === variantId);
    const plan = variant?.emiPlans.find((item) => item.id === planId);
    if (!product || !variant || !plan) return res.status(400).json({ error: 'Invalid product selection' });
    const reference = await createCheckout(product.id, variant.id, plan.id);
    return res.status(201).json({
      checkout: {
        id: reference,
        product: product.name,
        variant: variant.label,
        monthlyPayment: plan.monthlyPayment,
        tenureMonths: plan.tenureMonths,
        status: 'ready'
      }
    });
  } catch (error) {
    return next(error);
  }
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
