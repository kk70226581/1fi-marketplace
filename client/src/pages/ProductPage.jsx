import {
  ArrowLeft, ChevronRight, CircleCheck, Heart, LockKeyhole, PackageCheck, RotateCcw,
  ShieldCheck, Sparkles, Star, Truck, WalletCards, Check
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';
import Logo from '../components/Logo';
import { money } from '../components/ProductCard';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [variantId, setVariantId] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [status, setStatus] = useState('loading');
  const [checkout, setCheckout] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setStatus('loading');
    api.product(slug).then(({ product: item }) => {
      const defaultVariant = item.variants.find((variant) => variant.isDefault) || item.variants[0];
      const defaultPlan = defaultVariant.emiPlans.find((plan) => plan.recommended) || defaultVariant.emiPlans[0];
      setProduct(item);
      setVariantId(defaultVariant.id);
      setPlanId(defaultPlan.id);
      setStatus('ready');
    }).catch(() => setStatus('error'));
  }, [slug]);

  const variant = useMemo(() => product?.variants.find((item) => item.id === variantId), [product, variantId]);
  const plan = variant?.emiPlans.find((item) => item.id === planId);

  const selectVariant = (id) => {
    const next = product.variants.find((item) => item.id === id);
    setVariantId(id);
    setPlanId((next.emiPlans.find((item) => item.recommended) || next.emiPlans[0]).id);
  };

  const proceed = async () => {
    setSubmitting(true);
    try {
      const result = await api.checkout({ productSlug: slug, variantId, planId });
      setCheckout(result.checkout);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading') return <div className="page-state"><span className="loader"/><p>Loading product and EMI plans…</p></div>;
  if (status === 'error') return <div className="page-state"><h1>Product unavailable</h1><p>We could not find this product.</p><Link to="/shop">Back to Shop</Link></div>;

  const saving = variant.mrp - variant.price;
  const payable = plan.monthlyPayment * plan.tenureMonths - plan.cashback;

  return <div className="product-site">
    <header className="site-header"><div className="site-header-inner">
      <Link className="mobile-detail-back" to="/shop" aria-label="Back to Shop"><ArrowLeft size={19}/></Link>
      <Link className="brand-link" to="/shop"><Logo/></Link>
      <nav><Link to="/shop">Marketplace</Link><a href="#how-it-works">How it works</a><a href="#details">Product details</a></nav>
      <span className="secure-pill"><LockKeyhole size={14}/> Secure checkout</span>
    </div></header>

    <main className="detail-page">
      <div className="breadcrumbs"><Link to="/shop">Shop</Link><ChevronRight size={13}/><span>{product.category}</span><ChevronRight size={13}/><b>{product.name}</b></div>

      <section className="product-layout">
        <article className="reference-product-panel">
          <div className="product-title-row"><div><span className="new-label">{product.badge}</span><h1>{product.name}</h1><p>{variant.storage}</p></div>
            <button className={liked ? 'heart-button liked' : 'heart-button'} onClick={() => setLiked(!liked)} aria-label="Save product"><Heart size={20} fill={liked ? 'currentColor' : 'none'}/></button>
          </div>
          <div className="rating-row"><span><Star size={13} fill="currentColor"/> {product.rating}</span><b>{product.soldCount}+ sold</b></div>
          <div className="product-showcase" data-brand={product.brand.toLowerCase()} data-product={product.slug}><div className="showcase-ring"/><img key={variant.imageUrl} src={variant.imageUrl} alt={`${product.name} in ${variant.color}`}/></div>
          <div className="finish-area"><span>Available in {product.variants.length} finishes</span><div>{product.variants.map((item) => <button key={item.id} onClick={() => selectVariant(item.id)} className={variantId === item.id ? 'active' : ''} aria-label={item.color}><i style={{ background: item.colorHex }}/></button>)}</div></div>
        </article>

        <article className="reference-emi-panel">
          <div className="price-summary"><div><strong>{money(variant.price)}</strong><span><s>{money(variant.mrp)}</s><b> Save {money(saving)}</b></span></div><span className="zero-interest"><Sparkles size={14}/><b>0%</b> plans</span></div>
          <h2>EMI plans backed by mutual funds</h2>
          <p className="emi-intro">Choose a plan that works for you. Your mutual funds stay invested while you repay.</p>

          <div className="variant-picker"><span>Variant</span><div>{product.variants.map((item) => <button key={item.id} className={variantId === item.id ? 'active' : ''} onClick={() => selectVariant(item.id)}><i style={{ background: item.colorHex }}/><span><b>{item.storage}</b><small>{item.color}</small></span>{variantId === item.id && <Check size={15}/>}</button>)}</div></div>

          <div className="plan-heading"><span>Monthly payment</span><span>Interest</span></div>
          <div className="reference-plan-list">{variant.emiPlans.map((item) => <button key={item.id} className={planId === item.id ? 'selected' : ''} onClick={() => setPlanId(item.id)}>
            <span className="plan-radio">{planId === item.id && <i/>}</span>
            <span className="plan-amount"><strong>{money(item.monthlyPayment)} <small>× {item.tenureMonths} months</small></strong><em>Additional cashback of {money(item.cashback)}</em></span>
            <span className={item.interestRate === 0 ? 'interest free' : 'interest'}>{item.interestRate}% interest</span>
            {item.recommended && <span className="popular-label">POPULAR</span>}
          </button>)}</div>

          <div className="selected-summary"><div><span>Effective payable</span><strong>{money(payable)}</strong></div><div><span>You save</span><strong>{money(plan.cashback)}</strong></div><div><span>Selected tenure</span><strong>{plan.tenureMonths} months</strong></div></div>
          <button className="primary-proceed" disabled={submitting} onClick={proceed}>{submitting ? 'Preparing your plan…' : `Proceed with ${plan.tenureMonths}-month plan`}<ChevronRight size={20}/></button>
          <p className="consent-note"><ShieldCheck size={14}/> No processing fee. Final eligibility is subject to mutual fund holdings.</p>
        </article>
      </section>

      <section className="confidence-row">
        <div><PackageCheck/><span><b>Genuine products</b><small>Sold by trusted partners</small></span></div>
        <div><Truck/><span><b>Free delivery</b><small>Safe doorstep delivery</small></span></div>
        <div><RotateCcw/><span><b>Easy support</b><small>Help throughout your order</small></span></div>
        <div><LockKeyhole/><span><b>Secure transaction</b><small>Your data stays protected</small></span></div>
      </section>

      <section className="below-grid">
        <article className="details-card" id="details"><span className="section-kicker">EVERYTHING YOU NEED</span><h2>Product details</h2><p>{product.description}</p><dl>{product.specifications.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl></article>
        <article className="how-card" id="how-it-works"><span className="section-kicker">SIMPLE & TRANSPARENT</span><h2>How 1Fi EMI works</h2>
          <ol><li><span>1</span><div><b>Choose your plan</b><p>Select a comfortable tenure and monthly payment.</p></div></li><li><span>2</span><div><b>Check eligibility</b><p>Link eligible mutual funds securely—no credit score needed.</p></div></li><li><span>3</span><div><b>Keep funds invested</b><p>Your investments continue to participate in the market.</p></div></li></ol>
          <div className="fund-note"><WalletCards/><span><b>Smart spending, uninterrupted investing</b><small>No need to redeem investments for your purchase.</small></span></div>
        </article>
      </section>
    </main>

    <aside className="mobile-checkout"><div><small>{plan.tenureMonths}-month plan</small><b>{money(plan.monthlyPayment)}/month</b></div><button disabled={submitting} onClick={proceed}>Proceed<ChevronRight size={18}/></button></aside>

    {checkout && <div className="modal-backdrop" onClick={() => setCheckout(null)}><div className="success-modal" onClick={(event) => event.stopPropagation()}>
      <span className="success-icon"><CircleCheck/></span><p className="eyebrow">PLAN SELECTED</p><h2>You’re ready to continue</h2><p>{checkout.product} · {checkout.variant}</p><div><span>{money(checkout.monthlyPayment)}/month</span><span>{checkout.tenureMonths} months</span></div><button onClick={() => setCheckout(null)}>Done</button><small>Reference {checkout.id}</small>
    </div></div>}
  </div>;
}
