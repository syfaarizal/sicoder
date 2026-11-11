export default function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`brand-wordmark ${className}`} aria-label="SICODER">
      <span>SICO</span>
      <span className="brand-wordmark-accent">DER</span>
    </span>
  );
}
