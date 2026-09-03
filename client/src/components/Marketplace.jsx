import { Clock3, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../api';
import ProductCard from './ProductCard';

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('loading');
      api.products(search)
        .then(({ products: rows }) => { setProducts(rows); setStatus('ready'); })
        .catch(() => setStatus('error'));
    }, search ? 250 : 0);
    return () => clearTimeout(timer);
  }, [search]);

  const categories = ['All', 'Smartphones', 'Computers', 'Tablets', 'Audio', 'Gaming', 'Cameras', 'Wearables'];
  const visibleProducts = category === 'All' ? products : products.filter((product) => product.category === category);

  return <section className="marketplace-pane">
    <div className="marketplace-toolbar">
      <div className="marketplace-title"><span className="mini-label"><Sparkles size={13}/> Curated for you</span><h2>1Fi Marketplace</h2><p>Premium devices. Flexible plans. Your investments stay invested.</p></div>
      <label className="search-box"><Search size={18}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products or brands" /></label>
    </div>

    <div className="market-perks">
      <div><span><ShieldCheck size={16}/></span><p><b>MF-backed EMIs</b><small>Your funds stay invested</small></p></div>
      <div><span><Sparkles size={16}/></span><p><b>0% interest plans</b><small>Up to 24 months</small></p></div>
      <div><span><Clock3 size={16}/></span><p><b>Flexible tenures</b><small>Choose 3-60 months</small></p></div>
    </div>

    <div className="catalogue-heading"><div><h2>Explore all products</h2><span>{visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}</span></div>
      <div className="category-chips" aria-label="Filter products by category">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
    </div>
    {status === 'loading' && <div className="product-grid" aria-label="Loading products">{[1,2,3,4,5,6].map((item) => <div className="product-card skeleton" key={item}/>)}</div>}
    {status === 'error' && <div className="message-card"><h3>Could not load products</h3><p>Check that the API server is running and try again.</p></div>}
    {status === 'ready' && visibleProducts.length === 0 && <div className="message-card"><h3>No products found</h3><p>Try another product, brand or category.</p></div>}
    {status === 'ready' && <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product}/>)}</div>}
  </section>;
}
