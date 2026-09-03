import { MapPin, Sparkles } from 'lucide-react';

export default function EmptyState({ type }) {
  const nearby = type === 'nearby';
  const Icon = nearby ? MapPin : Sparkles;
  return <section className="empty-state">
    <span className="empty-icon"><Icon size={25}/></span>
    <h2>{nearby ? 'Nearby stores coming soon' : 'Top brands coming soon'}</h2>
    <p>{nearby ? 'We’re getting trusted local partners ready for you.' : 'Your favourite brands will appear here.'}</p>
  </section>;
}
