'use client';
import { useEffect, useRef, useState } from 'react';
import CodeEditor from './CodeEditor';
import { kindOf } from './FileIcon';
import FileTabs from './FileTabs';
import ProblemList, { type Problem } from './ProblemList';
import SplitView from './SplitView';
import WorkspaceFrame from './WorkspaceFrame';
import { DEFAULT_PY, getLesson, toPyCode, type Snippet } from '@/lib/content';
import type { Extra } from '@/lib/runner';
import { FONTS, TERMINAL_DEFAULT, getTheme, themeVars } from '@/lib/themes';
import { usePersistent, useSettings } from '@/lib/usePersistent';

type Seg = { text: string; kind: '' | 'e' | 'd' };
const TIMEOUT_MS = 15000;
const INITIAL = { ...DEFAULT_PY, extra: [] as Extra[] };

export default function PythonWorkspace() {
  const [code, setCode] = usePersistent('sicoder:python', INITIAL);
  const [settings, setSettings] = useSettings();
  const [tab, setTab] = useState('main');
  const [out, setOut] = useState<Seg[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [runProblems, setRunProblems] = useState<Problem[]>([]);
  const [bottom, setBottom] = useState<'term' | 'prob'>('term');
  const [goto, setGoto] = useState<{ line: number; n: number } | null>(null);
  const [running, setRunning] = useState(false);
  const [panel, setPanel] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const worker = useRef<Worker | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const term = useRef<HTMLPreElement>(null);
  const lintId = useRef(0);
  const lintWaiters = useRef(new Map<string, (ps: Problem[]) => void>());

  const extraName = tab.startsWith('x:') ? tab.slice(2) : null;
  const extra = extraName ? code.extra.find((f) => f.name === extraName) : undefined;
  const cur = tab === 'main' || extra ? tab : 'main';
  const curValue = cur === 'main' ? code.py : (extra?.content ?? '');
  const setValue = (v: string) =>
    cur === 'main'
      ? setCode((c) => ({ ...c, py: v }))
      : setCode((c) => ({
          ...c,
          extra: c.extra.map((f) => (f.name === extraName ? { ...f, content: v } : f)),
        }));

  useEffect(() => {
    const l = getLesson(new URLSearchParams(location.search).get('lesson'));
    if (l && l.lang === 'python') {
      setCode({ ...toPyCode(l.snippet), extra: [] });
      setActiveId(l.id);
      setPanel(true);
    }
  }, [setCode]);
  useEffect(() => () => worker.current?.terminate(), []);
  useEffect(() => {
    term.current?.scrollTo(0, 1e9);
  }, [out]);

  // Linting berjalan langsung saat kode berubah: semua baris bermasalah
  // ditampilkan sekaligus, dan menghilang begitu baris itu diperbaiki.
  const requestLint = (mainCode: string, extra: Extra[]) => {
    const w = ensureWorker();
    const id = 'lint-' + ++lintId.current;
    // Worker hanya menjawab lint terbaru, jadi waiter lama dibuang.
    lintWaiters.current.clear();
    lintWaiters.current.set(id, (ps) => {
      // Hasil lint lama bisa tiba belakangan; abaikan supaya tidak menimpa
      // hasil lint yang lebih baru.
      if (id !== 'lint-' + lintId.current) return;
      setProblems(ps);
    });
    w.postMessage({ type: 'lint', id, code: mainCode, files: extra });
  };

  useEffect(() => {
    const t = setTimeout(() => requestLint(code.py, code.extra), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code.py, code.extra]);

  const add = (text: string, kind: Seg['kind'] = '') => setOut((o) => [...o, { text, kind }]);
  const stop = (msg?: string) => {
    clearTimeout(timer.current);
    worker.current?.terminate();
    worker.current = null;
    setRunning(false);
    if (msg) add(msg, 'e');
  };

  // Satu worker dipakai untuk Run sekaligus linting, jadi Pyodide hanya
  // diunduh sekali.
  const ensureWorker = () => {
    if (worker.current) return worker.current;
    const w = new Worker('/py-worker.js');
    worker.current = w;
    w.onmessage = (e) => {
      const m = e.data;
      if (m.type === 'out') add(m.text);
      else if (m.type === 'err') add(m.text, 'e');
      else if (m.type === 'status') add(m.text, 'd');
      else if (m.type === 'problem')
        setRunProblems((p) => [
          ...p,
          { id: Date.now(), file: m.file, line: m.line, message: m.message },
        ]);
      else if (m.type === 'lint') {
        const cb = lintWaiters.current.get(m.id);
        if (!cb) return;
        lintWaiters.current.delete(m.id);
        cb(
          (m.problems || []).map(
            (p: { file: string; line?: number; message: string }, i: number) => ({
              id: i,
              file: p.file,
              line: p.line,
              message: p.message,
            }),
          ),
        );
      } else if (m.type === 'done') {
        clearTimeout(timer.current);
        setRunning(false);
        add('\n** Process exited - Return Code: ' + m.code + ' **\n', 'd');
      }
    };
    w.onerror = () => stop('Runtime Python gagal dimuat. Cek koneksi internet lalu coba lagi.\n');
    return w;
  };
  const run = () => {
    if (running) return;
    setOut([]);
    setRunProblems([]); // error runtime Run sebelumnya dihapus, diganti hasil yang baru
    setBottom('term');
    setRunning(true);
    const w = ensureWorker();
    timer.current = setTimeout(
      () => stop('\nDihentikan: program berjalan lebih dari ' + TIMEOUT_MS / 1000 + ' detik.\n'),
      TIMEOUT_MS,
    );
    w.postMessage({ type: 'run', code: code.py, files: code.extra });
  };
  const goProblem = (p: Problem) => {
    setTab(p.file === 'main.py' ? 'main' : 'x:' + p.file);
    if (p.line) setGoto({ line: p.line, n: Date.now() });
  };
  const addFile = (name: string) => {
    if (!/^[a-z_][a-z0-9_]*\.py$/i.test(name))
      return 'Pakai nama seperti alat.py (huruf, angka, _)';
    if (
      name.toLowerCase() === 'main.py' ||
      code.extra.some((f) => f.name.toLowerCase() === name.toLowerCase())
    )
      return 'Nama itu sudah dipakai.';
    setCode((c) => ({ ...c, extra: [...c.extra, { name, content: '' }] }));
    setTab('x:' + name);
    return null;
  };
  const removeFile = (id: string) => {
    const n = id.slice(2);
    if (!confirm('Hapus ' + n + '? Isinya akan hilang.')) return;
    setCode((c) => ({ ...c, extra: c.extra.filter((f) => f.name !== n) }));
    if (tab === id) setTab('main');
  };
  const load = (sn: Snippet, id: string) => {
    setCode({ ...toPyCode(sn), extra: [] });
    setActiveId(id);
    setTab('main');
    if (innerWidth < 768) setPanel(false);
  };

  const edTheme = getTheme(settings.theme);
  const tvars = themeVars(settings.matchTerminal ? edTheme : TERMINAL_DEFAULT);
  // Error sintaks (dari linting) dan error runtime (dari Run) digabung, lalu
  // diurutkan per file dan baris.
  const allProblems = [...problems, ...runProblems]
    .map((p, i) => ({ ...p, id: i }))
    .sort((a, b) =>
      a.file === b.file ? (a.line ?? 0) - (b.line ?? 0) : a.file.localeCompare(b.file),
    );
  const tabs = [
    { id: 'main', label: 'main.py', kind: 'py' as const },
    ...code.extra.map((f) => ({
      id: 'x:' + f.name,
      label: f.name,
      kind: kindOf(f.name),
      removable: true,
    })),
  ];
  const editorPane = (
    <section className="pane" style={themeVars(edTheme)} aria-label="Editor">
      <div className="tb">
        <FileTabs
          tabs={tabs}
          active={cur}
          onSelect={setTab}
          onAdd={addFile}
          onRemove={removeFile}
          placeholder="nama_file.py"
          menu={[
            {
              label: 'Reset semua kode',
              onClick: () => {
                if (confirm('Kembalikan semua kode ke contoh awal? File tambahan ikut dihapus.')) {
                  setCode(INITIAL);
                  setTab('main');
                }
              },
            },
          ]}
        />
      </div>
      <CodeEditor
        key={cur}
        lang="py"
        value={curValue}
        label={'Kode ' + (cur === 'main' ? 'main.py' : cur.slice(2))}
        settings={settings}
        goto={goto}
        onChange={setValue}
        onRun={run}
      />
    </section>
  );
  const font = { fontSize: settings.fontSize, fontFamily: FONTS[settings.fontFamily] };
  const termPane = (
    <section className="pane" style={tvars} aria-label="Terminal">
      <div className="tb">
        <div role="tablist" aria-label="Panel bawah" className="flex">
          <button
            role="tab"
            className="tab tab-up"
            aria-selected={bottom === 'term'}
            onClick={() => setBottom('term')}
          >
            Terminal
          </button>
          <button
            role="tab"
            className="tab tab-up"
            aria-selected={bottom === 'prob'}
            onClick={() => setBottom('prob')}
          >
            Problems{allProblems.length > 0 && <span className="badge">{allProblems.length}</span>}
          </button>
        </div>
        <div className="flex-1" />
        <button
          className="btn"
          onClick={() => {
            setOut([]);
            setRunProblems([]);
          }}
        >
          Clear
        </button>
        {running ? (
          <button className="btn" onClick={() => stop('\nDihentikan.\n')}>
            Stop
          </button>
        ) : (
          <button
            className="btn btn-run"
            onClick={run}
            title="Menjalankan main.py (Ctrl/Cmd+Enter)"
          >
            Run
          </button>
        )}
      </div>
      {bottom === 'term' ? (
        <pre ref={term} className="term" role="log" aria-live="polite" style={font}>
          {out.length === 0 && (
            <span className="d">
              Tekan Run untuk menjalankan main.py. File lain bisa dipakai lewat import, misalnya
              import alat.
            </span>
          )}
          {out.map((s, i) => (
            <span key={i} className={s.kind}>
              {s.text}
            </span>
          ))}
        </pre>
      ) : (
        <ProblemList problems={allProblems} onGo={goProblem} style={font} />
      )}
    </section>
  );
  return (
    <WorkspaceFrame
      lang="python"
      settings={settings}
      onSettings={setSettings}
      panel={panel}
      onPanel={setPanel}
      activeId={activeId}
      onActive={setActiveId}
      onLoad={load}
    >
      <SplitView
        layout={settings.pyLayout}
        storageKey="sicoder:split:python"
        labels={['Editor', 'Terminal']}
        a={editorPane}
        b={termPane}
        defaultPct={55}
      />
    </WorkspaceFrame>
  );
}
