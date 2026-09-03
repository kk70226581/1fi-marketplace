export default function Logo({ compact = false }) {
  return <img className={`logo ${compact ? 'compact' : ''}`} src="/brand/1fi-mark.svg" alt="1Fi"/>;
}
