# MongoDB schema

The API uses MongoDB through Mongoose. The implementation is in `server/db/database.js`; this document is the submission-friendly schema reference.

```text
products
  _id: ObjectId
  slug: string, unique, indexed
  brand, name, tagline, description, category: string
  imageUrl, badge, seller: string
  rating: number (0–5)
  soldCount: number
  featured: boolean
  images[]
    imageUrl, alt: string
  specifications[]
    label, value: string
  variants[]
    _id: ObjectId
    label, storage, color, colorHex, imageUrl: string
    mrp, price: number
    isDefault: boolean
    emiPlans[]
      _id: ObjectId
      tenureMonths: number
      monthlyPayment: number
      interestRate: number
      cashback: number
      recommended: boolean

checkout_intents
  _id: ObjectId
  reference: string, unique, indexed
  productId: ObjectId → products._id
  variantId: ObjectId → products.variants._id
  planId: ObjectId → products.variants.emiPlans._id
  status: string
  createdAt: date
```

Seed data is repeatable and stored in `server/db/seed.js`. It creates ten products, including at least three products with two or more variants and seven selectable EMI plans per variant.
