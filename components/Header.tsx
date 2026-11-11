import Link from 'next/link';
import BrandLogo from './BrandLogo';

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header
      className="flex h-14 flex-none items-center gap-2 border-b px-3"
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
