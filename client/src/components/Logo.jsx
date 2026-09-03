export default function Logo({ compact = false }) {
  return <div className={`logo ${compact ? 'compact' : ''}`} aria-label="1Fi"><span>1</span><span className="logo-mark">F</span><span>i</span></div>;
}
