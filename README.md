# 1Fi Marketplace - SDE1 Assignment

A responsive full-stack marketplace for the 1Fi Shop experience. The Shop page contains the three requested options: **Top Brands**, **Nearby Stores**, and **1Fi Marketplace**. The marketplace is database-driven and lets a customer browse products, choose a variant, compare mutual-fund-backed EMI plans, and create a demo checkout intent.

## Live application

- Frontend: [GitHub Pages deployment](https://kk70226581.github.io/1fi-marketplace/#/shop)
- Previous Vercel deployment: [1fi-marketplace.vercel.app](https://1fi-marketplace.vercel.app/shop)
- Backend: [API health endpoint](https://onefi-marketplace-api-kmx6.onrender.com/api/health)
- Repository: [kk70226581/1fi-marketplace](https://github.com/kk70226581/1fi-marketplace)

## Assignment requirements covered

- Product information, pricing, images, variants, and EMI plans are stored in MongoDB and returned through Express APIs. The React UI fetches this data; product data is not hard-coded in the interface.
- Ten seed products are available. Every product has a unique `/products/:slug` URL, and more than three products provide two or more purchasable variants.
- Every variant has seven selectable EMI plans showing monthly payment, tenure, interest rate, cashback, and a recommended plan.
- The **Proceed** action validates the selected product, variant, and plan, then stores a demo checkout intent in MongoDB.
- **Top Brands** and **Nearby Stores** are separate Shop options with intentionally blank placeholder states, as requested. **1Fi Marketplace** contains the complete implementation.
- The responsive layout supports mobile and desktop, including the campaign carousel, product catalogue, filters, search, product gallery, variants, and EMI selector.

## Stack

- Frontend: React 19, React Router, Vite, CSS
- Backend: Node.js, Express 5
- Database: MongoDB and Mongoose
- Testing: Node test runner and Supertest
- Hosting: Vercel (frontend) and Render (API)

## Run locally

Prerequisites: Node.js 20+, npm, and either local MongoDB or a MongoDB Atlas connection string.

```bash
git clone https://github.com/kk70226581/1fi-marketplace.git
cd 1fi-marketplace
npm run setup
```

Create `server/.env` from [`server/.env.example`](server/.env.example). For local MongoDB, use:

```text
MONGODB_URI=mongodb://127.0.0.1:27017/onefi_marketplace
PORT=4000
```

Seed and run the application:

```bash
npm run seed
npm run dev
```

Open `http://localhost:5173/shop`. Vite proxies `/api` requests to the API at `http://localhost:4000`.

For a production-style local run:

```bash
npm run build
npm start
```

Run the automated checks with:

```bash
npm test
```

## API endpoints and example responses

### `GET /api/health`

```json
{
  "status": "ok",
  "database": "mongodb"
}
```

### `GET /api/products`

Returns all product cards. It supports an optional search, for example `/api/products?search=apple`.

```json
{
  "products": [
    {
      "id": "...",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "name": "iPhone 17 Pro",
      "startingPrice": 127400,
      "mrp": 134900,
      "startingEmi": 2842,
      "variantCount": 3
    }
  ]
}
```

### `GET /api/products/:slug`

Returns a product, gallery, specifications, variants, and their embedded EMI plans. Example: `/api/products/iphone-17-pro`.

```json
{
  "product": {
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "variants": [
      {
        "id": "...",
        "label": "Cosmic Orange - 256 GB",
        "price": 127400,
        "emiPlans": [
          {
            "id": "...",
            "tenureMonths": 12,
            "monthlyPayment": 11242,
            "interestRate": 0,
            "cashback": 7500,
            "recommended": true
          }
        ]
      }
    ]
  }
}
```

### `POST /api/checkout`

Validates the selected product, variant, and plan before storing a demo checkout intent.

```json
{
  "productSlug": "iphone-17-pro",
  "variantId": "<variant ObjectId>",
  "planId": "<plan ObjectId>"
}
```

```json
{
  "checkout": {
    "id": "1FI-...",
    "status": "ready"
  }
}
```

## Database

The Mongoose models are implemented in [`server/db/database.js`](server/db/database.js). Repeatable MongoDB seed data lives in [`server/db/seed.js`](server/db/seed.js), and the submission-ready schema reference is in [`docs/database-schema.md`](docs/database-schema.md).

```text
products -> variants[] -> emiPlans[]
checkout_intents -> selected product, variant, and plan ObjectIds
```

## Required demo video

The assignment requires a public 2-5 minute demonstration video. A timed recording script is available at [`docs/demo-video-script.md`](docs/demo-video-script.md). Record it, upload it to Google Drive or YouTube with public link access, and submit that URL together with the GitHub repository and deployed frontend link.
