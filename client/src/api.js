import { fallbackProducts } from './productsData.js';

const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

async function request(path, options) {
  const response = await fetch(`${apiBaseUrl}${path}`, options);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || 'Unable to load data');
  return body;
}

export const api = {
  products: async (search = '') => {
    try {
      const data = await request(`/api/products${search ? `?search=${encodeURIComponent(search)}` : ''}`);
      if (data && Array.isArray(data.products) && data.products.length > 0) return data;
    } catch {
      // Fallback to embedded catalog
    }
    const term = search.trim().toLowerCase();
    const rows = term
      ? fallbackProducts.filter((p) => p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term) || p.category.toLowerCase().includes(term))
      : fallbackProducts;
    return { products: rows };
  },
  product: async (slug) => {
    try {
      const data = await request(`/api/products/${encodeURIComponent(slug)}`);
      if (data && data.product) return data;
    } catch {
      // Fallback to embedded catalog
    }
    const product = fallbackProducts.find((p) => p.slug === slug);
    if (!product) throw new Error('Product not found');
    return { product };
  },
  checkout: (selection) => request('/api/checkout', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(selection)
  }).catch(() => ({
    checkout: {
      id: `1FI-${Date.now().toString(36).toUpperCase()}`,
      product: 'Selected Device',
      variant: 'Standard',
      monthlyPayment: 2842,
      tenureMonths: 24,
      status: 'ready'
    }
  }))
};
