import { useState } from 'react';
import BottomNav from '../components/BottomNav';
import EmptyState from '../components/EmptyState';
import Logo from '../components/Logo';
import Marketplace from '../components/Marketplace';

const tabs = [['brands', 'Top Brands'], ['nearby', 'Nearby Stores'], ['marketplace', '1Fi Marketplace']];

export default function ShopPage() {
  const [tab, setTab] = useState('marketplace');
  return <div className="app-shell"><main className="shop-main">
    <header className="shop-hero"><div className="hero-glow"/><div className="hero-top"><Logo compact/><span className="demo-pill">SHOP</span></div>
      <p>NEW WAY TO OWN WHAT YOU LOVE</p><h1>Shop today.<br/>Pay with your <em>funds.</em></h1><div className="hero-orb"><span>₹</span></div>
    </header>
    <div className="shop-content"><div className="tabs" role="tablist" aria-label="Shop sections">{tabs.map(([value,label]) => <button key={value} role="tab" aria-selected={tab === value} className={tab === value ? 'selected' : ''} onClick={() => setTab(value)}>{label}</button>)}</div>
      {tab === 'marketplace' ? <Marketplace/> : <EmptyState type={tab}/>}</div>
  </main><BottomNav/></div>;
}
