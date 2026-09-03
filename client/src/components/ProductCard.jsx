import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export default function ProductCard({ product }) {
  return <Link className="product-card" to={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
    <div className="product-image-wrap"><img src={product.imageUrl} alt={product.name}/><span className="product-badge"><BadgeCheck size={12}/>{product.badge}</span></div>
    <div className="product-card-body">
      <p className="eyebrow">{product.brand}</p><h3>{product.name}</h3><p className="tagline">{product.tagline}</p>
      <div className="price-row"><strong>{money(product.startingPrice)}</strong><s>{money(product.mrp)}</s></div>
      <div className="emi-row"><span>From <strong>{money(product.startingEmi)}/mo</strong></span><span className="round-arrow"><ArrowRight size={16}/></span></div>
    </div>
  </Link>;
}
