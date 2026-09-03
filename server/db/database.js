import mongoose from 'mongoose';

const databaseName = process.env.NODE_ENV === 'test' ? 'onefi_marketplace_test' : 'onefi_marketplace';
const mongoUri = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${databaseName}`;

const emiPlanSchema = new mongoose.Schema({
  tenureMonths: { type: Number, required: true, min: 1 },
  monthlyPayment: { type: Number, required: true, min: 1 },
  interestRate: { type: Number, required: true, min: 0 },
  cashback: { type: Number, required: true, min: 0 },
  recommended: { type: Boolean, default: false }
}, { _id: true });

const variantSchema = new mongoose.Schema({
  label: { type: String, required: true },
  storage: { type: String, required: true },
  color: { type: String, required: true },
  colorHex: { type: String, required: true },
  imageUrl: { type: String, required: true },
  mrp: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 1 },
  isDefault: { type: Boolean, default: false },
  emiPlans: { type: [emiPlanSchema], default: [] }
}, { _id: true });

const productSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  brand: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, index: true },
  imageUrl: { type: String, required: true },
  badge: { type: String, default: '' },
  rating: { type: Number, required: true, min: 0, max: 5 },
  soldCount: { type: Number, required: true, min: 0 },
  seller: { type: String, required: true },
  featured: { type: Boolean, default: false },
  images: { type: [{ imageUrl: String, alt: String }], default: [] },
  specifications: { type: [{ label: String, value: String }], default: [] },
  variants: { type: [variantSchema], default: [] }
}, { timestamps: true, versionKey: false });

const checkoutIntentSchema = new mongoose.Schema({
  reference: { type: String, required: true, unique: true, index: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  variantId: { type: mongoose.Schema.Types.ObjectId, required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, default: 'ready' }
}, { timestamps: { createdAt: 'createdAt', updatedAt: false }, versionKey: false });

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export const CheckoutIntent = mongoose.models.CheckoutIntent || mongoose.model('CheckoutIntent', checkoutIntentSchema);

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
  return mongoose.connection;
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
}

const asId = (value) => String(value);
const sortPlans = (plans) => [...plans].sort((a, b) => a.tenureMonths - b.tenureMonths);

function mapVariant(variant) {
  return {
    id: asId(variant._id),
    label: variant.label,
    storage: variant.storage,
    color: variant.color,
    colorHex: variant.colorHex,
    imageUrl: variant.imageUrl,
    mrp: variant.mrp,
    price: variant.price,
    isDefault: Boolean(variant.isDefault),
    emiPlans: sortPlans(variant.emiPlans).map((plan) => ({
      id: asId(plan._id),
      tenureMonths: plan.tenureMonths,
      monthlyPayment: plan.monthlyPayment,
      interestRate: plan.interestRate,
      cashback: plan.cashback,
      recommended: Boolean(plan.recommended)
    }))
  };
}

function mapProduct(product, includeDetails = false) {
  const variants = product.variants.map(mapVariant);
  const prices = variants.map((variant) => variant.price);
  const mrps = variants.map((variant) => variant.mrp);
  const payments = variants.flatMap((variant) => variant.emiPlans.map((plan) => plan.monthlyPayment));
  const result = {
    id: asId(product._id),
    slug: product.slug,
    brand: product.brand,
    name: product.name,
    tagline: product.tagline,
    description: product.description,
    category: product.category,
    imageUrl: product.imageUrl,
    badge: product.badge,
    rating: product.rating,
    soldCount: product.soldCount,
    seller: product.seller,
    featured: Boolean(product.featured),
    startingPrice: Math.min(...prices),
    mrp: Math.min(...mrps),
    startingEmi: Math.min(...payments)
  };
  if (includeDetails) {
    result.images = product.images.map((image) => ({ imageUrl: image.imageUrl, alt: image.alt }));
    result.specifications = product.specifications.map((specification) => ({ label: specification.label, value: specification.value }));
    result.variants = variants.sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
  }
  return result;
}

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export async function listProducts(search = '') {
  const term = search.trim();
  const filter = term ? {
    $or: ['name', 'brand', 'category'].map((field) => ({ [field]: { $regex: escapeRegex(term), $options: 'i' } }))
  } : {};
  const products = await Product.find(filter).sort({ featured: -1, createdAt: 1 }).lean();
  return products.map((product) => mapProduct(product));
}

export async function getProduct(slug) {
  const product = await Product.findOne({ slug }).lean();
  return product ? mapProduct(product, true) : null;
}

export async function createCheckout(productId, variantId, planId) {
  const reference = `1FI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  await CheckoutIntent.create({ reference, productId, variantId, planId });
  return reference;
}
