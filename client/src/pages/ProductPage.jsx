import { ArrowLeft, BadgeCheck, ChevronRight, CircleCheck, ShieldCheck, Sparkles } from 'lucide-react';
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

  useEffect(() => {
    api.product(slug).then(({ product: item }) => {
      setProduct(item); const variant = item.variants.find(v => v.isDefault) || item.variants[0];
      setVariantId(variant.id); setPlanId((variant.emiPlans.find(p => p.recommended) || variant.emiPlans[0]).id); setStatus('ready');
    }).catch(() => setStatus('error'));
  }, [slug]);
  const variant = useMemo(() => product?.variants.find(v => v.id === variantId), [product, variantId]);
  const plan = variant?.emiPlans.find(p => p.id === planId);

  const selectVariant = (id) => {
    const next = product.variants.find(v => v.id === id); setVariantId(id);
    setPlanId((next.emiPlans.find(p => p.recommended) || next.emiPlans[0]).id);
  };
  const proceed = async () => {
    setSubmitting(true);
    try { const result = await api.checkout({ productSlug: slug, variantId, planId }); setCheckout(result.checkout); }
    finally { setSubmitting(false); }
  };

  if (status === 'loading') return <div className="page-state"><span className="loader"/><p>Finding the best plans…</p></div>;
  if (status === 'error') return <div className="page-state"><h1>Product unavailable</h1><Link to="/shop">Back to Shop</Link></div>;
  return <div className="app-shell product-shell"><header className="detail-bar"><Link to="/shop" aria-label="Back to Shop"><ArrowLeft/></Link><Logo compact/><span/></header>
    <main className="product-main"><section className="product-visual"><span className="floating-badge"><Sparkles size={13}/>{product.badge}</span><img src={product.imageUrl} alt={product.name}/><div className="visual-dots"><i/><i className="active"/><i/></div></section>
      <section className="product-info"><p className="eyebrow">{product.brand} · {product.category}</p><h1>{product.name}</h1><p className="product-tagline">{product.tagline}</p>
        <div className="detail-price"><strong>{money(variant.price)}</strong><s>{money(variant.mrp)}</s><span>{Math.round((1 - variant.price / variant.mrp) * 100)}% off</span></div>
        <p className="tax-note">Inclusive of all taxes</p>
        <hr/><div className="choice-heading"><h2>Choose your variant</h2><span>{variant.storage}</span></div>
        <div className="variant-list">{product.variants.map(v => <button key={v.id} className={variantId === v.id ? 'chosen' : ''} onClick={() => selectVariant(v.id)}><span className="swatch" style={{ background: v.colorHex }}/><span><b>{v.storage}</b><small>{v.color}</small></span>{variantId === v.id && <CircleCheck size={19}/>}</button>)}</div>
        <div className="emi-heading"><div><span className="mini-label"><Sparkles size={13}/> No-cost EMI</span><h2>Pick a monthly plan</h2></div><span className="mutual-label"><ShieldCheck size={15}/> MF-backed</span></div>
        <div className="plan-list">{variant.emiPlans.map(p => <button key={p.id} className={planId === p.id ? 'chosen' : ''} onClick={() => setPlanId(p.id)}>
          {p.recommended && <span className="recommend">BEST VALUE</span>}<span className="radio"/><span className="plan-copy"><b>{p.tenureMonths} months</b><small>{p.interestRate}% interest{p.cashback ? ` · ${money(p.cashback)} cashback` : ''}</small></span><span className="monthly"><b>{money(p.monthlyPayment)}</b><small>/month</small></span>
        </button>)}</div>
        <div className="why"><BadgeCheck/><div><b>Why use mutual funds?</b><p>Your investments stay invested while you repay. No credit score required.</p></div></div>
        <p className="description">{product.description}</p>
      </section>
    </main>
    <aside className="checkout-bar"><div><small>Total plan</small><b>{money(plan.monthlyPayment)} × {plan.tenureMonths} months</b></div><button disabled={submitting} onClick={proceed}>{submitting ? 'Preparing…' : 'Proceed with plan'}<ChevronRight size={19}/></button></aside>
    {checkout && <div className="modal-backdrop" onClick={() => setCheckout(null)}><div className="success-modal" onClick={e => e.stopPropagation()}><span className="success-icon"><CircleCheck/></span><p className="eyebrow">PLAN SELECTED</p><h2>You’re ready to continue</h2><p>{checkout.product}, {checkout.variant}</p><div><span>{money(checkout.monthlyPayment)}/month</span><span>{checkout.tenureMonths} months</span></div><button onClick={() => setCheckout(null)}>Done</button><small>Reference {checkout.id}</small></div></div>}
  </div>;
}
