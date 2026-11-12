'use client';
import { useEffect, useRef, useState } from 'react';
import CodeEditor from './CodeEditor';
import ProblemList, { type Problem } from './ProblemList';
import type { Lang, Snippet } from '@/lib/content';
import { runPython } from '@/lib/pyRunner';
import { buildSrcDoc } from '@/lib/runner';
import { FONTS, getTheme, themeVars } from '@/lib/themes';
import type { Settings } from '@/lib/usePersistent';

type Part = 'html' | 'css' | 'js' | 'py';
type Seg = { t: string; k: '' | 'e' | 'd' };
const BASE_CSS = 'body{font-family:system-ui,sans-serif;padding:12px}\n';

/**
 * Contoh kode yang bisa diedit dan dijalankan langsung di halaman materi.
 * State-nya lokal: tidak menyentuh kode di editor utama kecuali tombol "Ke editor" ditekan.
 */
export default function MiniPlayground({
  snippet,
  lang,
  settings,
  onLoad,
}: {
  snippet: Snippet;
  lang: Lang;
  settings: Settings;
  onLoad?: (s: Snippet) => void;
}) {
  const web = lang === 'web';
  const parts: Part[] = web
    ? (['html', 'css', 'js'] as const).filter((k) => snippet[k] !== undefined)
    : ['py'];
  const initial = () => ({
    html: snippet.html ?? '',
    css: snippet.css ?? '',
    js: snippet.js ?? '',
    py: snippet.py ?? '',
  });
  const [code, setCode] = useState(initial);
  const [tab, setTab] = useState<Part>(parts[0]);
  const build = (c: ReturnType<typeof initial>) =>
    buildSrcDoc({ html: c.html, css: BASE_CSS + c.css, js: c.js });
  const [srcDoc, setSrcDoc] = useState(() => (web ? build(initial()) : ''));
  const [lines, setLines] = useState<{ level: string; text: string }[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [body, setBody] = useState(''); // isi halaman yang digambar JS (dipakai untuk preview)
  const [goto, setGoto] = useState<{ line: number; n: number } | null>(null);
  const [out, setOut] = useState<Seg[]>([]);
  const [running, setRunning] = useState(false);
  const [runId, setRunId] = useState(0); // iframe dibuat ulang tiap Run, jadi kode yang sama tetap dijalankan lagi
  const frame = useRef<HTMLIFrameElement>(null);
  const first = useRef(true);
  const hasView = snippet.html !== undefined;

  const runWeb = () => {
    setLines([]);
    setProblems([]);
    setBody('');
    setRunId((n) => n + 1);
    setSrcDoc(build(code));
  };
  const run = () => {
    if (web) return runWeb();
    if (running) return;
    setOut([]);
    setRunning(true);
    let got = false;
    runPython(code.py, {
      out: (t, k) => {
        if (k !== 'd') got = true;
        setOut((o) => [...o, { t, k }]);
      },
      done: () => {
        setRunning(false);
        if (!got) setOut((o) => [...o, { t: '(selesai, tidak ada output)', k: 'd' }]);
      },
    });
  };
  // Web: jalan otomatis sebentar setelah berhenti mengetik
  useEffect(() => {
    if (!web) return;
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(runWeb, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
  useEffect(() => {
    const h = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow || !e.data) return;
      if (e.data.sl) {
        const [level, text] = e.data.sl as [string, string];
        setLines((p) => [...p, { level, text }]);
      } else if (e.data.sp) {
        // Error yang tidak tertangkap: nomor barisnya relatif ke blok JS
        const { m, l } = e.data.sp as { m: string; l: number };
        setProblems((p) => [...p, { id: p.length, file: 'JavaScript', line: l || undefined, message: m }]);
      } else if (typeof e.data.bd === 'string') {
        setBody(e.data.bd);
      }
    };
    addEventListener('message', h);
    return () => removeEventListener('message', h);
  }, []);

  const n = Math.min(Math.max(code[tab].split('\n').length, 3), 12);
  const height = Math.round(n * settings.fontSize * settings.lineHeight + 20);
  const mini = { ...settings, lineNumbers: false, keymap: 'default' as const, wrap: true };
  const font = { fontSize: settings.fontSize - 1, fontFamily: FONTS[settings.fontFamily] };
  const current = () => (web ? { html: code.html, css: code.css, js: code.js } : { py: code.py });
  // Preview ditampilkan kalau ada HTML bawaan, atau kalau JS itu sendiri menggambar isi halaman.
  const showView = hasView || body !== '';
  const source = (p: Problem) =>
    p.line ? code.js.split('\n')[p.line - 1] : undefined;
  const goProblem = (p: Problem) => {
    if (!p.line) return;
    setTab('js');
    setGoto({ line: p.line, n: Date.now() });
  };

  return (
    <div className="mini" style={themeVars(getTheme(settings.theme))}>
      <div className="tb">
        {parts.length > 1 ? (
          <div role="tablist" className="flex gap-0.5">
            {parts.map((p) => (
              <button
                key={p}
                role="tab"
                className="tab"
                aria-selected={tab === p}
                onClick={() => {
                  setTab(p);
                  setGoto(null); // goto lama tidak boleh ikut saat tab diganti manual
                }}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        ) : (
          <span className="tab" aria-selected="true">
            {web ? parts[0].toUpperCase() : 'main.py'}
          </span>
        )}
        <div className="flex-1" />
        <button
          className="btn"
          onClick={() => {
            setCode(initial());
            setLines([]);
            setProblems([]);
            setBody('');
            setOut([]);
            if (web) {
              setSrcDoc(build(initial()));
              setRunId((n) => n + 1);
            }
          }}
        >
          Reset
        </button>
        {onLoad && (
          <button
            className="btn"
            onClick={() => onLoad(current())}
            title="Pindahkan ke editor utama"
          >
            Ke editor
          </button>
        )}
        <button className="btn btn-run" onClick={run} disabled={running} title="Ctrl/Cmd+Enter">
          Run
        </button>
      </div>
      <div style={{ height }}>
        <CodeEditor
          key={tab}
          lang={tab}
          value={code[tab]}
          label={'Contoh kode ' + tab}
          settings={mini}
          goto={goto}
          onChange={(v) => setCode((c) => ({ ...c, [tab]: v }))}
          onRun={run}
        />
      </div>
      {web ? (
        <>
          <iframe
            key={runId}
            ref={frame}
            title="Hasil contoh"
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            className={showView ? 'mini-out' : 'hidden'}
          />
          {(lines.length > 0 || !hasView) && (
            <div className="con mini-con" role="log" style={font}>
              {/* {lines.length === 0 && <span className="d">Console kosong. Tekan Run.</span>} */}
              {lines.map((l, i) => (
                <div key={i} className={l.level}>
                  {l.text}
                </div>
              ))}
            </div>
          )}
          {problems.length > 0 && (
            <div className="mini-prob">
              <div className="mini-prob-head">Ada masalah ({problems.length})</div>
              <ProblemList
                problems={problems}
                onGo={goProblem}
                lang="js"
                source={source}
                style={font}
              />
            </div>
          )}
        </>
      ) : (
        <pre className="term mini-con" role="log" aria-live="polite" style={font}>
          {out.length === 0 && <span className="d">Tekan Run untuk melihat hasilnya.</span>}
          {out.map((s, i) => (
            <span key={i} className={s.k}>
              {s.t}
            </span>
          ))}
        </pre>
      )}
    </div>
  );
}
