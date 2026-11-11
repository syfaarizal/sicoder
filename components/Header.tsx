import Link from 'next/link';
import BrandLogo from './BrandLogo';

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header
      className="flex min-h-14 flex-none flex-wrap items-center gap-2 border-b px-3 py-1"
      style={{ borderColor: 'var(--line)' }}
    >
      <Link href="/" className="logo" aria-label="SICODER, ke beranda">
        <BrandLogo />
      </Link>
      <div className="flex-1" />
      <Link href="/materi" className="btn">
        Materi
      </Link>
      {children}
    </header>
  );
}
