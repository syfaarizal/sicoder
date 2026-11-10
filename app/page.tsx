import Link from 'next/link';

const envs = [
  {
    id: 'web',
    name: 'Web Development',
    desc: 'HTML, CSS, JavaScript. Hasil dan console dalam satu layar.',
  },
  { id: 'python', name: 'Python', desc: 'Editor di atas, terminal di bawah, tinggal Run.' },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-5 pb-16 pt-10">
      <div className="logo mb-10">
        <span>SI</span>CODER
      </div>
      <h1 className="m-0 mb-4 max-w-[15ch] text-[clamp(32px,7vw,58px)] font-bold leading-[1.05] tracking-tight">
        Pahami kode dengan{' '}
        <mark style={{ background: 'var(--mark)', color: 'inherit', padding: '0 .12em' }}>
          mencobanya
        </mark>
      </h1>
      <p className="mb-8 max-w-[56ch] text-lg" style={{ color: 'var(--mute)' }}>
        Mau belajar apa hari ini? Pilih, lalu langsung buka code editor atau baca materinya dulu.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {envs.map((e) => (
          <section
            key={e.id}
            className="rounded-2xl border p-5"
            style={{ background: 'var(--sf)', borderColor: 'var(--line)' }}
          >
            <h2 className="m-0 text-[22px] font-bold">{e.name}</h2>
            <p className="mb-4 mt-1" style={{ color: 'var(--mute)' }}>
              {e.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link className="btn btn-pri" href={'/workspace/' + e.id}>
                Code editor
              </Link>
              <Link className="btn" href={'/materi?lang=' + e.id}>
                Materi
              </Link>
            </div>
          </section>
        ))}
      </div>
      <p className="mt-5 text-sm" style={{ color: 'var(--mute)' }}>
        Kode tersimpan di browser ini saja dan hilang jika data browser dibersihkan.
      </p>
    </main>
  );
}
