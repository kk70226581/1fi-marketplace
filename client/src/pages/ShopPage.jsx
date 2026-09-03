import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import EmptyState from '../components/EmptyState';
import Logo from '../components/Logo';
import Marketplace from '../components/Marketplace';

const tabs = [['brands', 'Top Brands'], ['nearby', 'Nearby Stores'], ['marketplace', '1Fi Marketplace']];

export default function ShopPage() {
  const [tab, setTab] = useState('marketplace');
  return <div className="app-shell shop-shell">
    <header className="shop-site-header"><Logo/><nav><span>Home</span><b>Shop</b><span>EMI Dues</span><span>Limit</span><span>Profile</span></nav><button>Check eligibility</button></header>
    <main className="shop-main">
    <header className="shop-hero">
      <span className="mobile-hero-brand"><Logo compact/></span>
      <img className="hero-mobile-art" src="https://cdn.1fi.in/banners/shop-page%201536x1024.webp" alt="Shop today, pay later using mutual funds"/>
      <div className="hero-copy"><span><Sparkles size={16}/> No-cost EMIs</span><h1>Shop today,<br/><em>Pay later using</em><br/>Mutual funds.</h1><p>No credit score required. No interest.<br/>Backed by your investments.</p></div>
      <div className="hero-art" aria-hidden="true"><i/><img className="hero-phone-main" src="/products/iphone-orange.svg" alt=""/><img className="hero-phone-secondary" src="/products/galaxy-gray.svg" alt=""/></div>
    </header>
    <div className="shop-content"><div className="tabs" role="tablist" aria-label="Shop sections">{tabs.map(([value,label]) => <button key={value} role="tab" aria-selected={tab === value} className={tab === value ? 'selected' : ''} onClick={() => setTab(value)}>{label}</button>)}</div>
      {tab === 'marketplace' ? <Marketplace/> : <EmptyState type={tab}/>}</div>
  </main><BottomNav/></div>;
}
