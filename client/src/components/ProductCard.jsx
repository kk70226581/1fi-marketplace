import { ArrowRight, BadgeCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export default function ProductCard({ product }) {
  return <Link className="product-card" to={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
    <div className="product-image-wrap"><img src={product.imageUrl} alt={product.name}/><span className="product-badge"><BadgeCheck size={12}/>{product.badge}</span></div>
    <div className="product-card-body">
      <div className="card-meta"><p className="eyebrow">{product.brand}</p><span><Star size={10} fill="currentColor"/> {product.rating}</span></div><h3>{product.name}</h3><p className="tagline">{product.tagline}</p>
      <div className="price-row"><strong>{money(product.startingPrice)}</strong><s>{money(product.mrp)}</s></div>
      <div className="emi-row"><span>EMI from <strong>{money(product.startingEmi)}/mo</strong><small>0% up to 24 months</small></span><span className="round-arrow"><ArrowRight size={16}/></span></div>
    </div>
  </Link>;
}
