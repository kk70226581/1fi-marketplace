import { House, Search, Smartphone, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

const items = [
  [House, 'Home', '/shop'],
  [Store, 'Shop', '/shop#marketplace'],
  [Smartphone, 'Phones', '/shop?category=Smartphones#catalogue'],
  [Search, 'Search', '/shop#product-search']
];

export default function BottomNav() {
  return <nav className="bottom-nav" aria-label="Primary navigation"><div className="bottom-nav-inner">
    {items.map(([Icon, label, to]) => <Link className={`nav-item ${label === 'Shop' ? 'active' : ''}`} key={label} to={to} aria-current={label === 'Shop' ? 'page' : undefined}>
      <Icon size={22} strokeWidth={label === 'Shop' ? 2.1 : 1.75}/><span>{label}</span>
    </Link>)}
  </div></nav>;
}
