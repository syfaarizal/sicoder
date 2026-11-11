'use client';
import { useState } from 'react';
import LessonView from './LessonView';
import {
  getLesson,
  groupsOf,
  lessonNo,
  searchLessons,
  type Lang,
  type Snippet,
} from '@/lib/content';
import type { Settings } from '@/lib/usePersistent';

/** Sidebar materi: cari topik (mis. "padding"), baca penjelasan, coba contoh langsung di sini. Bisa ditutup. */
export default function LearningPanel({
  lang,
  settings,
  activeId,
  onActive,
  onLoad,
  onClose,
}: {
  lang: Lang;
  settings: Settings;
  activeId: string | null;
  onActive: (id: string | null) => void;
  onLoad: (s: Snippet, lessonId: string) => void;
  onClose: () => void;
}) {
  const [q, setQ] = useState('');
  const active = getLesson(activeId);
  const results = searchLessons(lang, q);
  return (
    <aside
      aria-label="Materi"
      className="absolute inset-0 z-10 overflow-auto p-3 md:static md:w-[var(--pw)] md:flex-none"
      style={{ background: 'var(--sf)', borderColor: 'var(--line)' }}
    >
      <div className="mb-3 flex items-center gap-2">
        {active ? (
          <button className="btn" onClick={() => onActive(null)}>
            Semua materi
          </button>
        ) : (
          <input
            className="inp"
            type="search"
            autoFocus
            placeholder="Cari materi, mis. padding"
            aria-label="Cari materi"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        )}
        <div className="flex-1" />
        <button className="btn" onClick={onClose}>
          Tutup
        </button>
      </div>
      {active ? (
        <LessonView
          lesson={active}
          settings={settings}
          onLoad={(s, id) => {
            if (confirm('Kode di editor utama akan diganti dengan contoh ini. Lanjut?'))
              onLoad(s, id);
          }}
        />
      ) : q.trim() ? (
        <>
          <div className="materi-list">
            {results.map((l) => (
              <button key={l.id} className="materi-card" onClick={() => onActive(l.id)}>
                <b>
                  <span className="no">{lessonNo(l)}.</span> {l.title}
                </b>
                <small>{l.desc}</small>
              </button>
            ))}
          </div>
          {results.length === 0 && (
            <p className="materi-empty">Belum ada materi untuk &quot;{q}&quot;. Coba kata lain.</p>
          )}
        </>
      ) : (
        groupsOf(lang).map((g) => (
          <div key={g}>
            <h2 className="materi-cat">
              <b>{g}</b>
            </h2>
            <div className="materi-list">
              {results
                .filter((l) => l.group === g)
                .map((l) => (
                  <button key={l.id} className="materi-card" onClick={() => onActive(l.id)}>
                    <b>
                      <span className="no">{lessonNo(l)}.</span> {l.title}
                    </b>
                    <small>{l.desc}</small>
                  </button>
                ))}
            </div>
          </div>
        ))
      )}
    </aside>
  );
}
