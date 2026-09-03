import { Search, ShieldCheck, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../api';
import ProductCard from './ProductCard';

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('loading');
      api.products(search).then(({ products: rows }) => { setProducts(rows); setStatus('ready'); })
        .catch(() => setStatus('error'));
    }, search ? 250 : 0);
    return () => clearTimeout(timer);
  }, [search]);

  return <section className="marketplace-pane">
    <label className="search-box"><Search size={18}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." /></label>
    <div className="market-heading"><div><span className="mini-label"><Sparkles size={13}/> 1Fi Marketplace</span><h2>Keep investing.<br/>Start shopping.</h2></div><span className="zero-badge"><b>0%</b> interest</span></div>
    <div className="trust-strip"><ShieldCheck size={17}/><span>Mutual fund-backed</span><i/><span>No credit score needed</span></div>
    <div className="section-title"><h2>Explore products</h2><span>{products.length} products</span></div>
    {status === 'loading' && <div className="product-grid" aria-label="Loading products">{[1,2,3].map(i => <div className="product-card skeleton" key={i}/>)}</div>}
    {status === 'error' && <div className="message-card"><h3>Couldn’t load products</h3><p>Check that the API server is running and try again.</p></div>}
    {status === 'ready' && products.length === 0 && <div className="message-card"><h3>No products found</h3><p>Try another product or brand name.</p></div>}
    {status === 'ready' && <div className="product-grid">{products.map(p => <ProductCard key={p.id} product={p}/>)}</div>}
  </section>;
}
