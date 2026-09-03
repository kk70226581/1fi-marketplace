# 1Fi Marketplace

A mobile-first full-stack marketplace concept for the 1Fi Shop experience. It adds a third **1Fi Marketplace** entry alongside **Top Brands** and **Nearby Stores**, then lets customers browse products, select a variant, compare mutual-fund-backed EMI plans, and proceed with a selected plan.

The interface follows the current 1Fi app language: a compact 500px mobile canvas, `#712CDC` purple, lavender surfaces, large rounded cards, pill controls, and a floating five-item navigation bar.

## Tech stack

- Frontend: React 19, React Router, Vite, CSS
- Backend: Node.js, Express 5
- Database: SQLite via `better-sqlite3`
- Tests: Node test runner, Supertest

## Setup and run

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run setup
npm run seed
npm run dev
```

Open `http://localhost:5173`. The frontend development server proxies `/api` requests to the API at `http://localhost:4000`.

For a production-style run:

```bash
npm run build
npm start
```

Then open `http://localhost:4000`. Express serves both the API and the built React app.

Run verification with:

```bash
npm test
```

## Main routes

- `/shop` — Shop page with Top Brands, Nearby Stores, and 1Fi Marketplace
- `/products/iphone-17-pro`
- `/products/samsung-galaxy-s25-ultra`
- `/products/google-pixel-10-pro`

## API endpoints

### `GET /api/health`

```json
{ "status": "ok" }
```

### `GET /api/products`

Returns marketplace cards with each product's starting price and EMI. Optional search: `/api/products?search=apple`.

```json
{
  "products": [
    {
      "id": 1,
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "name": "iPhone 17 Pro",
      "imageUrl": "/products/iphone.svg",
      "startingPrice": 129900,
      "startingEmi": 10609
    }
  ]
}
```

### `GET /api/products/:slug`

Returns one product with all variants and nested EMI plans. Each plan includes tenure, monthly payment, interest rate, cashback, and recommendation status.

### `POST /api/checkout`

Validates that the selected product, variant, and plan belong together and creates a demo checkout handoff.

```json
{
  "productSlug": "iphone-17-pro",
  "variantId": 1,
  "planId": 3
}
```

## Database schema

```text
products 1 ─── * variants 1 ─── * emi_plans
```

- `products`: slug, brand, product copy, category, image URL, badge, featured status
- `variants`: product reference, storage, color, color token, MRP, selling price, default status
- `emi_plans`: variant reference, tenure, monthly payment, interest rate, cashback, recommendation status

The complete schema is in `server/db/schema.sql`; repeatable seed data is in `server/db/seed.js`. The database file is generated at `server/data/marketplace.db` and intentionally excluded from Git.

## Deployment

`render.yaml` contains a Render web-service configuration. Connect the repository in Render, use the Blueprint, and the service will build the client and serve it from Express. Seed data is generated automatically on the first start if the SQLite file does not exist.

## Demo checklist

For the requested 2–5 minute walkthrough, show:

1. The three Shop options and blank states for Top Brands/Nearby Stores.
2. Marketplace search and API-loaded product cards.
3. A product URL, variant changes, EMI selection, cashback and 0% interest.
4. The successful Proceed flow.
5. The SQLite schema/seed and both API responses.
