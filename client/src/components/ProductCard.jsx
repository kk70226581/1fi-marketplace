import { ArrowRight, BadgeCheck, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export default function ProductCard({ product }) {
  const saving = product.mrp - product.startingPrice;
  const discount = Math.round((saving / product.mrp) * 100);

  return <Link className="product-card" data-brand={product.brand.toLowerCase()} to={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
    <div className="product-image-wrap">
      <img src={product.imageUrl} alt={product.name} loading="lazy" decoding="async"/>
      <span className="product-badge"><BadgeCheck size={12}/>{product.badge}</span>
      <span className="product-like" aria-hidden="true"><Heart size={15}/></span>
    </div>
    <div className="product-card-body">
      <div className="card-meta"><p className="eyebrow">{product.brand}</p><span><Star size={11} fill="currentColor"/> {product.rating}</span></div>
      <h3>{product.name}</h3>
      <p className="tagline">{product.tagline}</p>
      <div className="price-row"><strong>{money(product.startingPrice)}</strong><s>{money(product.mrp)}</s><b>{discount}% off</b></div>
      <div className="emi-row"><span><small>EMI from</small><strong>{money(product.startingEmi)}<i>/month</i></strong><em>0% interest up to 24 months</em></span><span className="round-arrow">View <ArrowRight size={14}/></span></div>
    </div>
  </Link>;
}
