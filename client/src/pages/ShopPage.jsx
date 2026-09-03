import { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
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
      <div className="hero-copy"><span><Sparkles size={15}/> 1Fi Marketplace</span><h1>Shop today.<br/><em>Stay invested.</em></h1><p>Buy premium products on flexible EMIs<br/>backed by your mutual funds.</p><a href="#marketplace">Explore products <ArrowRight size={16}/></a></div>
      <div className="hero-art" aria-hidden="true">
        <i className="hero-orbit orbit-one"/><i className="hero-orbit orbit-two"/>
        <div className="hero-finance-card">
          <div className="finance-card-top"><span><ShieldCheck size={17}/> Secured by investments</span><Logo compact/></div>
          <p>Available shopping power</p><strong>₹1,50,000</strong>
          <div className="finance-progress"><i/></div>
          <div className="finance-stats"><span><small>Interest</small><b>0%</b></span><span><small>Tenure</small><b>Up to 24 months</b></span></div>
          <div className="finance-status"><span><TrendingUp size={15}/> Mutual funds stay invested</span><i><Check size={12}/></i></div>
        </div>
      </div>
    </header>
    <div className="shop-content"><div className="tabs" role="tablist" aria-label="Shop sections">{tabs.map(([value,label]) => <button key={value} role="tab" aria-selected={tab === value} className={tab === value ? 'selected' : ''} onClick={() => setTab(value)}>{label}</button>)}</div>
      <div id="marketplace"/>
      {tab === 'marketplace' ? <Marketplace/> : <EmptyState type={tab}/>}</div>
  </main><BottomNav/></div>;
}
