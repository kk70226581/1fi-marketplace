export default function Logo({ compact = false }) {
  const logoUrl = `${import.meta.env.BASE_URL}brand/1fi-mark.svg`;
  return <img className={`logo ${compact ? 'compact' : ''}`} src={logoUrl} alt="1Fi"/>;
}
