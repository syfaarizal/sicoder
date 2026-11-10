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
  // Tanpa topik terpilih dan tanpa pencarian: tampilkan daftar isi per kategori
  const current: Lesson | null =
    picked && picked.lang === lang ? picked : q.trim() ? (list[0] ?? null) : null;
  const pos = current ? all.indexOf(current) : -1;
  const prev = pos > 0 ? all[pos - 1] : null;
  const next = pos >= 0 && pos < all.length - 1 ? all[pos + 1] : null;
  const open = (l: Lesson) => {
    setId(l.id);
  };
  const item = (l: Lesson) => (
    <button key={l.id} className="li" aria-current={current?.id === l.id} onClick={() => open(l)}>
      <span className="no">{lessonNo(l)}.</span>
      {l.title}
      <small>{l.desc}</small>
    </button>
  );

  return (
    <div className="flex h-dvh flex-col">
      <Header />
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <aside
          className="max-h-[40vh] overflow-auto border-b p-3 md:max-h-none md:w-72 md:flex-none md:border-b-0 md:border-r"
          style={{ background: 'var(--sf)', borderColor: 'var(--line)' }}
        >
          <div className="mb-2 flex gap-1.5">
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
          <input
            className="inp"
            type="search"
            placeholder="Cari materi, mis. padding"
            aria-label="Cari materi"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q.trim()
            ? list.map(item)
            : groupsOf(lang).map((g) => (
                <div key={g}>
                  <div className="sec">{g}</div>
                  {all.filter((l) => l.group === g).map(item)}
                </div>
              ))}
          {list.length === 0 && (
            <p style={{ color: 'var(--mute)' }}>Belum ada materi untuk kata itu.</p>
          )}
        </aside>
        <article className="min-w-0 flex-1 overflow-auto px-5 py-6">
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
              <h1 className="m-0 mb-1 text-3xl font-bold tracking-tight">
                Materi {lang === 'web' ? 'Web Development' : 'Python'}
              </h1>
              <p className="mb-6" style={{ color: 'var(--mute)' }}>
                Pilih topik. Tiap topik ada penjelasan singkat dan contoh yang bisa langsung kamu
                ubah dan jalankan.
              </p>
              <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
                {groupsOf(lang).map((g) => (
                  <div key={g}>
                    <div className="sec" style={{ color: 'var(--ac)' }}>
                      {g}
                    </div>
                    {all.filter((l) => l.group === g).map(item)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
