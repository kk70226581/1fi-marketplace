import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import EmptyState from '../components/EmptyState';
import Logo from '../components/Logo';
import Marketplace from '../components/Marketplace';

const tabs = [['brands', 'Top Brands'], ['nearby', 'Nearby Stores'], ['marketplace', '1Fi Marketplace']];

const slides = [
  {
    id: 'no-cost', kind: 'campaign',
    image: 'https://cdn.1fi.in/banners/shop-page%201536x1024.webp',
    alt: 'Shop today and pay later using mutual funds with no-cost EMIs'
  },
  {
    id: 'stay-invested', theme: 'blue', eyebrow: 'MF-BACKED SHOPPING',
    title: 'Upgrade today.', accent: 'Keep compounding.',
    description: 'Own the tech you want without redeeming your mutual fund investments.',
    image: 'https://www.apple.com/v/macbook-air/z/images/meta/macbook_air_mx__ez5y0k5yy7au_og.png?202607151829',
    alt: 'MacBook Air shown fully open'
  },
  {
    id: 'zero-interest', theme: 'violet', eyebrow: 'ZERO-COST FLEXIBILITY',
    title: 'Zero interest.', accent: 'Full freedom.',
    description: 'Choose a comfortable 3 to 24-month plan with no credit score required.',
    image: 'https://www.apple.com/v/ipad-air/ah/images/meta/ipad-air_overview__bc2fd15uec0y_og.png?202607290253',
    alt: 'iPad Air shown completely from the front and back'
  },
  {
    id: 'portfolio', theme: 'magenta', eyebrow: 'YOUR MONEY KEEPS WORKING',
    title: 'Your portfolio.', accent: 'Still yours.',
    description: 'Use eligible investments as backing while your funds stay invested.',
    image: 'https://www.apple.com/v/airpods-pro/s/images/meta/og__c0ceegchesom_overview.png?202607310238',
    alt: 'A complete pair of AirPods Pro'
  },
  {
    id: 'more-choice', theme: 'indigo', eyebrow: 'MORE TO LOVE ON 1FI',
    title: 'Phones to gaming.', accent: 'One smart plan.',
    description: 'Explore premium devices across ten curated products and flexible tenures.',
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$',
    alt: 'A complete PlayStation 5 console and controller'
  }
];

export default function ShopPage() {
  const location = useLocation();
  const [tab, setTab] = useState('marketplace');
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    if (location.search || ['#marketplace', '#catalogue', '#benefits', '#product-search'].includes(location.hash)) {
      setTab('marketplace');
    }

    if (!location.hash) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.search]);

  const moveSlide = (direction) => setSlide((current) => (current + direction + slides.length) % slides.length);

  return <div className="app-shell shop-shell">
    <header className="shop-site-header">
      <Link className="shop-brand-link" to="/shop" aria-label="1Fi Marketplace home"><Logo/></Link>
      <nav aria-label="Marketplace navigation">
        <Link to="/shop">Home</Link>
        <a className="active" href="#marketplace" aria-current="page">Shop</a>
        <Link to="/shop?category=Smartphones#catalogue">Smartphones</Link>
        <a href="#benefits">EMI benefits</a>
      </nav>
      <a className="eligibility-link" href="#catalogue">Explore products <ArrowRight size={14}/></a>
    </header>
    <main className="shop-main">
      <header className="shop-hero carousel-hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="hero-slides" aria-live="polite">
          {slides.map((item, index) => <article key={item.id} className={`hero-slide ${item.kind === 'campaign' ? 'campaign-slide' : `designed-slide ${item.theme}`} ${slide === index ? 'active' : ''}`} aria-hidden={slide !== index}>
            {item.kind === 'campaign' ? <img src={item.image} alt={item.alt}/> : <>
              <div className="slide-copy"><span><Sparkles size={14}/>{item.eyebrow}</span><h1>{item.title}<br/><em>{item.accent}</em></h1><p>{item.description}</p><a href="#marketplace">Explore marketplace <ArrowRight size={16}/></a></div>
              <div className="slide-visual"><i/><img src={item.image} alt={item.alt}/><span className="slide-brand"><Logo compact/> <b>1Fi Marketplace</b></span></div>
            </>}
          </article>)}
        </div>
        <button className="carousel-arrow previous" onClick={() => moveSlide(-1)} aria-label="Previous promotion"><ChevronLeft/></button>
        <button className="carousel-arrow next" onClick={() => moveSlide(1)} aria-label="Next promotion"><ChevronRight/></button>
        <div className="carousel-dots" aria-label="Choose promotion">{slides.map((item, index) => <button key={item.id} className={slide === index ? 'active' : ''} onClick={() => setSlide(index)} aria-label={`Show promotion ${index + 1}`} aria-current={slide === index ? 'true' : undefined}/>)}</div>
      </header>
      <div className="shop-content"><div className="tabs" role="tablist" aria-label="Shop sections">{tabs.map(([value,label]) => <button key={value} role="tab" aria-selected={tab === value} className={tab === value ? 'selected' : ''} onClick={() => setTab(value)}>{label}</button>)}</div>
        <div id="marketplace"/>
        {tab === 'marketplace' ? <Marketplace/> : <EmptyState type={tab}/>}</div>
    </main><BottomNav/>
  </div>;
}
