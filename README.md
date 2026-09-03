# 1Fi Marketplace

A mobile-first marketplace concept for the 1Fi Shop experience. It adds a third **1Fi Marketplace** entry alongside **Top Brands** and **Nearby Stores**, then lets customers browse products, select a variant, compare mutual-fund-backed EMI plans, and proceed with a selected plan.

The marketplace includes a five-slide campaign carousel, ten catalogue products, category and search controls, full product pages, and responsive layouts for mobile and desktop.

## Tech stack

- Frontend: React 19, React Router, Vite, CSS
- Backend: Node.js, Express 5
- Database: MongoDB with Mongoose
- Tests: Node test runner and Supertest

## Setup and run

Requirements: Node.js 20+, npm, and a running MongoDB server.

1. Install dependencies:

   ```bash
   npm run setup
   ```

2. Copy `server/.env.example` to `server/.env` if a different MongoDB connection string or port is required. By default, the app uses:

   ```text
   mongodb://127.0.0.1:27017/onefi_marketplace
   ```

3. Seed the catalogue and start the app:

   ```bash
   npm run seed
   npm run dev
   ```

Open `http://localhost:5173`. The frontend development server proxies `/api` requests to the API at `http://localhost:4000`.

For a production-style run:

```bash
npm run build
npm start
```

Then open `http://localhost:4000`.

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
{ "status": "ok", "database": "mongodb" }
```

### `GET /api/products`

Returns ten marketplace cards with each product's starting price and EMI. Optional search: `/api/products?search=apple`.

### `GET /api/products/:slug`

Returns one product with its image gallery, specifications, variants, and embedded EMI plans. Each plan includes tenure, monthly payment, interest rate, cashback, and recommendation status.

### `POST /api/checkout`

Validates that the selected product, variant, and plan belong together, then persists a demo checkout intent in MongoDB.

```json
{
  "productSlug": "iphone-17-pro",
  "variantId": "<MongoDB ObjectId>",
  "planId": "<MongoDB ObjectId>"
}
```

## MongoDB data model

```text
products
  ├── images[]
  ├── specifications[]
  └── variants[]
       └── plans[]

checkout_intents → selected product, variant, and plan ObjectIds
```

`products` contains product copy, category, media, availability, specifications, and nested variant/EMI-plan data. `checkout_intents` stores validated selections and a unique demo reference. The repeatable catalogue seed is in `server/db/seed.js`.

## Demo checklist

1. Show the three Shop options and the blank Top Brands/Nearby Stores states.
2. Open **1Fi Marketplace**, browse the campaign carousel, filter categories, and search products.
3. Open a product, switch its variant, and choose an EMI plan.
4. Complete the demo Proceed flow.
5. Show the MongoDB `onefi_marketplace` database and API responses.
