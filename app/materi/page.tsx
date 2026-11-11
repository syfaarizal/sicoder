'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import LessonView from '@/components/LessonView';
import {
  getLesson,
  groupsOf,
  lessonNo,
  lessons,
  searchLessons,
  type Lang,
  type Lesson,
} from '@/lib/content';
import { useSettings } from '@/lib/usePersistent';

export default function MateriPage() {
  const [settings] = useSettings();
  const [lang, setLang] = useState<Lang>('web');
  const [q, setQ] = useState('');
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    if (new URLSearchParams(location.search).get('lang') === 'python') setLang('python');
  }, []);

  const list = searchLessons(lang, q);
  const all = lessons.filter((l) => l.lang === lang);
  const picked = getLesson(id);
  // Tanpa topik terpilih: tampilkan daftar isi per kategori.
  // Saat searching, daftar hasil ditampilkan (tidak auto-lompat ke lesson pertama).
  const current: Lesson | null = picked && picked.lang === lang ? picked : null;
  const pos = current ? all.indexOf(current) : -1;
  const prev = pos > 0 ? all[pos - 1] : null;
  const next = pos >= 0 && pos < all.length - 1 ? all[pos + 1] : null;
  const open = (l: Lesson) => {
    setId(l.id);
  };
  const item = (l: Lesson) => (
    <button
      key={l.id}
      className="materi-card"
      aria-current={current?.id === l.id}
      onClick={() => open(l)}
    >
      <b>
        <span className="no">{lessonNo(l)}.</span> {l.title}
      </b>
      <small>{l.desc}</small>
    </button>
  );

  const groups = groupsOf(lang);
  const searching = q.trim().length > 0;

  return (
    <div className="materi-shell flex min-h-dvh flex-col md:h-dvh">
      <div className="header-sticky">
        <Header />
      </div>
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <aside
          className="w-full flex-none border-b p-3 md:w-72 md:overflow-y-auto md:border-b-0 md:border-r md:p-4"
          style={{ background: 'var(--sf)', borderColor: 'var(--line)' }}
        >
          <div className="materi-bar">
            {(['web', 'python'] as Lang[]).map((l) => (
              <button
                key={l}
                className="btn"
                aria-pressed={lang === l}
                onClick={() => {
                  setLang(l);
                  setId(null);
                }}
              >
                {l === 'web' ? 'Web' : 'Python'}
              </button>
            ))}
          </div>
          <div className="materi-bar">
            <input
              className="inp"
              type="search"
              placeholder="Cari materi, mis. padding"
              aria-label="Cari materi"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <nav className="materi-nav" aria-label="Kategori materi">
            {groups.map((g) => (
              <button
                key={g}
                className="materi-nav-item"
                aria-current={current?.group === g}
                onClick={() => {
                  const first = all.find((l) => l.group === g);
                  if (first) open(first);
                }}
              >
                <span>{g}</span>
                <small>{all.filter((l) => l.group === g).length}</small>
              </button>
            ))}
          </nav>        </aside>
        <article className="min-w-0 flex-1 px-4 py-6 md:overflow-y-auto md:px-8 md:py-10">
          {current ? (
            <div className="mx-auto max-w-[70ch]">
              <button
                className="btn mb-4"
                onClick={() => {
                  setId(null);
                  setQ('');
                }}
              >
                ← Daftar isi
              </button>
              <LessonView
                key={current.id}
                lesson={current}
                settings={settings}
                footer={
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <Link
                      className="btn btn-pri"
                      href={'/workspace/' + current.lang + '?lesson=' + current.id}
                    >
                      Buka di code editor
                    </Link>
                    <div className="flex-1" />
                    {prev && (
                      <button className="btn" onClick={() => open(prev)}>
                        ← {lessonNo(prev)}. {prev.title}
                      </button>
                    )}
                    {next && (
                      <button className="btn" onClick={() => open(next)}>
                        {lessonNo(next)}. {next.title} →
                      </button>
                    )}
                  </div>
                }
              />
            </div>
          ) : (
            <div className="mx-auto max-w-5xl">
              <p className="kicker">// PILIH MATERI YANG PENGEN LO BACA</p>
              <h1 className="home-title" style={{ fontSize: 'clamp(28px, 5vw, 44px)' }}>
                Materi {lang === 'web' ? 'Web Development' : 'Python'}
              </h1>
              <p className="home-intro" style={{ marginBottom: 32 }}>
                Pilih topik. Tiap topik ada penjelasan singkat dan contoh yang bisa langsung kamu
                ubah dan jalankan.
              </p>
              {searching ? (
                list.length === 0 ? (
                  <p className="materi-empty">
                    Belum ada materi untuk &quot;{q}&quot;. Coba kata lain.
                  </p>
                ) : (
                  <div className="materi-grid">
                    {list.map(item)}
                  </div>
                )
              ) : (
                groups.map((g) => (
                  <section key={g}>
                    <h2 className="materi-cat">
                      <b>{g}</b>
                    </h2>
                    <div className="materi-grid">
                      {all.filter((l) => l.group === g).map(item)}
                    </div>
                  </section>
                ))
              )}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
