import { ChartNoAxesCombined, House, ReceiptIndianRupee, Store, UserRound } from 'lucide-react';

const items = [
  [House, 'Home'], [Store, 'Shop'], [ReceiptIndianRupee, 'EMI Dues'],
  [ChartNoAxesCombined, 'Limit'], [UserRound, 'Profile']
];

export default function BottomNav() {
  return <nav className="bottom-nav" aria-label="Primary navigation"><div className="bottom-nav-inner">
    {items.map(([Icon, label]) => <button className={`nav-item ${label === 'Shop' ? 'active' : ''}`} key={label} type="button">
      <Icon size={22} strokeWidth={label === 'Shop' ? 2.1 : 1.75}/><span>{label}</span>
    </button>)}
  </div></nav>;
}
