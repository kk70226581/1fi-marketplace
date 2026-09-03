import { useState } from 'react';
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
    <header className="shop-hero"><span className="mobile-hero-brand"><Logo compact/></span><img src="https://cdn.1fi.in/banners/shop-page%201536x1024.webp" alt="Shop today, pay later using mutual funds"/></header>
    <div className="shop-content"><div className="tabs" role="tablist" aria-label="Shop sections">{tabs.map(([value,label]) => <button key={value} role="tab" aria-selected={tab === value} className={tab === value ? 'selected' : ''} onClick={() => setTab(value)}>{label}</button>)}</div>
      {tab === 'marketplace' ? <Marketplace/> : <EmptyState type={tab}/>}</div>
  </main><BottomNav/></div>;
}
