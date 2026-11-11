import Link from 'next/link';
import BrandLogo from '../components/BrandLogo';

const envs = [
  {
    id: 'web',
    name: 'Bikin Web',
    desc: 'Ngulik HTML, CSS, dan JavaScript sambil lihat hasil web lo langsung.',
  },
  {
    id: 'python',
    name: 'Ngulik Python',
    desc: 'Kenalan sama Python, cobain kodenya, dan lihat hasilnya di terminal.',
  },
];

export default function Home() {
  return (
    <main className="home-shell mx-auto max-w-5xl px-5 pb-16 pt-10 sm:pt-16">
      <section className="home-hero">
        <div className="home-brand-row">
          <BrandLogo className="logo-home" />
          <span className="home-status"><i /> SIAP MULAI</span>
        </div>
        <p className="home-kicker">// NGODING PERTAMA LO MULAI DI SINI</p>
        <h1 className="home-title">
          Belajar coding? <span>Yuk, coba.</span>
        </h1>
        <p className="home-intro">
          Mau bikin web atau ngulik Python? Pilih aja, tulis kode, terus lihat hasilnya langsung.
          Kalau error, santai—kita belajar bareng.
        </p>
      </section>

      <section className="track-section" aria-labelledby="track-title">
        <div className="track-heading">
          <div>
            <p className="home-kicker">PILIH YANG PENGEN LO COBA</p>
            <h2 id="track-title">Mau ngulik apa<span>?</span></h2>
          </div>
          <span className="track-count">2 PILIHAN</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {envs.map((e, index) => (
            <article key={e.id} className={`track-card track-card-${e.id}`}>
              <div className="track-card-top">
                <span className="track-index">JALUR 0{index + 1}</span>
                <span className="track-glyph" aria-hidden="true">
                  {e.id === 'web' ? '</>' : 'Py'}
                </span>
              </div>
              <h3>{e.name}</h3>
              <p>{e.desc}</p>
              <div className="track-actions">
                <Link className="btn btn-pri" href={'/workspace/' + e.id}>
                  Mulai ngoding <span aria-hidden="true">↗</span>
                </Link>
                <Link className="track-lessons" href={'/materi?lang=' + e.id}>
                  Belajar dulu <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <p className="home-note">
        <span aria-hidden="true">[i]</span> Kode lo tersimpan di browser ini. Hapus data browser,
        kodenya ikut ke-reset.
      </p>
    </main>
  );
}
