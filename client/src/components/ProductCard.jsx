import { ArrowRight, BadgeCheck, Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const saving = product.mrp - product.startingPrice;
  const discount = Math.round((saving / product.mrp) * 100);

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
  };

  return (
    <Link
      className="product-card"
      data-brand={product.brand.toLowerCase()}
      data-category={product.category.toLowerCase()}
      data-product={product.slug}
      to={`/products/${product.slug}`}
      aria-label={`View ${product.name}`}
    >
      <div className="product-image-wrap">
        <img src={product.imageUrl} alt={product.name} loading="lazy" decoding="async" />
        {product.badge && (
          <span className="product-badge">
            <BadgeCheck size={13} />
            {product.badge}
          </span>
        )}
        <button
          type="button"
          className={`product-like ${liked ? 'liked' : ''}`}
          onClick={toggleLike}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-card-body">
        <div className="card-meta">
          <p className="eyebrow">{product.brand}</p>
          <span className="rating-pill">
            <Star size={12} fill="currentColor" /> {product.rating}
          </span>
        </div>
        <h3>{product.name}</h3>
        <p className="tagline">{product.tagline}</p>
        <div className="price-row">
          <strong>{money(product.startingPrice)}</strong>
          <s>{money(product.mrp)}</s>
          <b className="discount-badge">Save {discount}%</b>
        </div>
        <div className="emi-row">
          <span>
            <small>EMI from</small>
            <strong>{money(product.startingEmi)}<i>/mo</i></strong>
            <em>0% interest up to 24 mos</em>
          </span>
          <span className="round-arrow">
            View details <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
