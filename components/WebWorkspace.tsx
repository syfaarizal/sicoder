'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import CodeEditor, { type EditorLang } from './CodeEditor';
import { kindOf } from './FileIcon';
import FileTabs from './FileTabs';
import ProblemList from './ProblemList';
import SplitView from './SplitView';
import WorkspaceFrame from './WorkspaceFrame';
import { DEFAULT_WEB, getLesson, toWebCode, type Snippet } from '@/lib/content';
import { formatCode } from '@/lib/format';
import { buildSrcDoc, composeWeb, type Extra } from '@/lib/runner';
import { FONTS, TERMINAL_DEFAULT, getTheme, themeVars } from '@/lib/themes';
import { usePersistent, useSettings } from '@/lib/usePersistent';

type Line = { level: string; text: string };
const INITIAL = { ...DEFAULT_WEB, extra: [] as Extra[] };
const MAIN = ['html', 'css', 'js'] as const;
type Main = (typeof MAIN)[number];
const isMain = (t: string): t is Main => (MAIN as readonly string[]).includes(t);

export default function WebWorkspace() {
  const [code, setCode, ready] = usePersistent('sicoder:web', INITIAL);
  const [settings, setSettings] = useSettings();
  const [tab, setTab] = useState('html');
  const [view, setView] = useState<'out' | 'con' | 'prob'>('out');
  const [lines, setLines] = useState<Line[]>([]);
  const [srcDoc, setSrcDoc] = useState('');
  const [panel, setPanel] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const frame = useRef<HTMLIFrameElement>(null);

  // Tab aktif: file utama, atau file tambahan (id "x:nama")
  const extraName = tab.startsWith('x:') ? tab.slice(2) : null;
  const extra = extraName ? code.extra.find((f) => f.name === extraName) : undefined;
  const cur = isMain(tab) ? tab : extra ? tab : 'html';
  const curLang: EditorLang = isMain(cur) ? cur : cur.endsWith('.css') ? 'css' : 'js';
  const curValue = isMain(cur) ? code[cur] : (extra?.content ?? '');
  const setValue = (v: string) =>
    isMain(cur)
      ? setCode((c) => ({ ...c, [cur]: v }))
      : setCode((c) => ({
          ...c,
          extra: c.extra.map((f) => (f.name === extraName ? { ...f, content: v } : f)),
        }));

  const run = useCallback(() => {
    setLines([]);
    setSrcDoc(buildSrcDoc(composeWeb(code)));
  }, [code]);

  // Buka dari materi: ?lesson=id memuat snippet dan membuka panel yang terkait
  useEffect(() => {
    const l = getLesson(new URLSearchParams(location.search).get('lesson'));
    if (l && l.lang === 'web') {
      setCode({ ...toWebCode(l.snippet), extra: [] });
      setActiveId(l.id);
      setPanel(true);
    }
  }, [setCode]);
  useEffect(() => {
    if (ready) run(); /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [ready]);
  useEffect(() => {
    if (!settings.autoRun || !ready) return;
    const t = setTimeout(run, 600);
    return () => clearTimeout(t);
  }, [code, settings.autoRun, ready, run]);
  useEffect(() => {
    const h = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow || !e.data?.sl) return;
      const [level, text] = e.data.sl as [string, string];
      setLines((p) => [...p, { level, text }]);
    };
    addEventListener('message', h);
    return () => removeEventListener('message', h);
  }, []);

  const format = async () => {
    try {
      const out = await formatCode(curValue, curLang);
      if (out !== null) {
        setValue(out);
        setNote('');
      }
    } catch {
      setNote('Format gagal: ada kesalahan sintaks di file ini.');
    }
  };
  const addFile = (name: string) => {
    if (!/^[\w-]+\.(css|js)$/i.test(name)) return 'Pakai nama seperti tema.css atau helper.js';
    if (
      ['style.css', 'script.js', 'index.html'].includes(name.toLowerCase()) ||
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
    if (tab === id) setTab('html');
  };
  const load = (sn: Snippet, id: string) => {
    setCode({ ...toWebCode(sn), extra: [] });
    setActiveId(id);
    setTab('html');
    setTimeout(() => setLines([]), 0);
    if (innerWidth < 768) setPanel(false);
  };
  const errors = lines.filter((l) => l.level === 'error');
  const edTheme = getTheme(settings.theme);
  const termStyle = themeVars(settings.matchTerminal ? edTheme : TERMINAL_DEFAULT);
  const termFont = { fontSize: settings.fontSize, fontFamily: FONTS[settings.fontFamily] };
  const tabs = [
    { id: 'html', label: 'HTML', kind: 'html' as const },
    { id: 'css', label: 'CSS', kind: 'css' as const },
    { id: 'js', label: 'JS', kind: 'js' as const },
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
          placeholder="nama.css atau nama.js"
          menu={[
            { label: 'Format kode (Prettier)', onClick: format },
            {
              label: 'Reset semua kode',
              onClick: () => {
                if (
                  confirm('Kembalikan semua kode ke contoh pertama? File tambahan ikut dihapus.')
                ) {
                  setCode(INITIAL);
                  setTab('html');
                }
              },
            },
          ]}
        />
      </div>
      <CodeEditor
        key={cur}
        lang={curLang}
        value={curValue}
        label={'Kode ' + cur.replace('x:', '')}
        settings={settings}
        onChange={setValue}
        onRun={run}
        onFormat={format}
      />
      {note && (
        <div
          role="status"
          className="tb"
          style={{ color: '#ff6b6b', borderTop: '1px solid var(--cline)', borderBottom: 0 }}
        >
          {note}
        </div>
      )}
    </section>
  );
  const outPane = (
    <section className="pane" style={termStyle} aria-label="Hasil">
      <div className="tb">
        <button
          className="tab"
          role="tab"
          aria-selected={view === 'out'}
          onClick={() => setView('out')}
        >
          Hasil
        </button>
        <button
          className="tab"
          role="tab"
          aria-selected={view === 'con'}
          onClick={() => setView('con')}
        >
          Console
        </button>
        <button
          className="tab"
          role="tab"
          aria-selected={view === 'prob'}
          onClick={() => setView('prob')}
        >
          Problems{errors.length > 0 && <span className="badge">{errors.length}</span>}
        </button>
        <div className="flex-1" />
        <button className="btn" onClick={() => setLines([])}>
          Clear
        </button>
        <button className="btn btn-run" onClick={run} title="Ctrl/Cmd+Enter">
          Run
        </button>
      </div>
      <iframe
        ref={frame}
        title="Hasil kode"
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        className={'min-h-0 w-full flex-1 border-0 bg-white ' + (view === 'out' ? '' : 'hidden')}
      />
      <div className={'con ' + (view === 'con' ? '' : 'hidden')} role="log" style={termFont}>
        {lines.length === 0 && (
          <span className="d">Belum ada output. Coba console.log(&quot;halo&quot;).</span>
        )}
        {lines.map((l, i) => (
          <div key={i} className={l.level}>
            {l.text}
          </div>
        ))}
      </div>
      {view === 'prob' && (
        <ProblemList
          style={termFont}
          problems={errors.map((l, i) => ({ id: i, file: 'JavaScript', message: l.text }))}
        />
      )}
    </section>
  );

  return (
    <WorkspaceFrame
      lang="web"
      settings={settings}
      onSettings={setSettings}
      panel={panel}
      onPanel={setPanel}
      activeId={activeId}
      onActive={setActiveId}
      onLoad={load}
    >
      <SplitView
        layout={settings.layout}
        storageKey="sicoder:split:web"
        labels={['Editor', 'Hasil']}
        a={editorPane}
        b={outPane}
      />
    </WorkspaceFrame>
  );
}
