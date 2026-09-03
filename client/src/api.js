async function request(path, options) {
  const response = await fetch(path, options);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || 'Unable to load data');
  return body;
}

export const api = {
  products: (search = '') => request(`/api/products${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  product: (slug) => request(`/api/products/${encodeURIComponent(slug)}`),
  checkout: (selection) => request('/api/checkout', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(selection)
  })
};
