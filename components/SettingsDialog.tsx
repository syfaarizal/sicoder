'use client';
import { useEffect, useRef, useState } from 'react';
import CodeEditor, { type EditorLang } from './CodeEditor';
import type { Lang } from '@/lib/content';
import { FONT_LABELS, THEMES, getTheme, themeVars } from '@/lib/themes';
import { DEFAULT_SETTINGS, type Layout, type Settings } from '@/lib/usePersistent';

const SAMPLE: Record<'html' | 'css' | 'js', string> = {
  html: '<h1 id="judul">Halo, dunia</h1>\n<p>Selamat datang! <a href="#tautan">Aku tautan</a></p>\n<ul class="daftar">\n  <li>Satu</li>\n</ul>',
  css: '.daftar {\n  color: #2347e8;\n  font-size: 18px;\n}\nh1:hover {\n  background: gold;\n}',
  js: 'const angka = [1, 2, 3];\nconst hasil = angka.filter((n) => n > 1);\nconsole.log(hasil); // [2, 3]',
};
const LAYOUTS: [Layout, string][] = [
  ['tabbed', 'Tabbed'],
  ['stacked', 'Stacked'],
  ['side', 'Side by side'],
];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className="toggle"
      onClick={() => onChange(!checked)}
    />
  );
}
function Row({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="row">
      <div>
        {label}
        {hint && <div style={{ fontSize: 13, color: 'var(--mute)' }}>{hint}</div>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsDialog({
  open,
  onClose,
  settings,
  onChange,
  lang,
}: {
  open: boolean;
  onClose: () => void;
  settings: Settings;
  onChange: (s: Settings) => void;
  lang: Lang;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [adv, setAdv] = useState(false);
  const [pv, setPv] = useState<'html' | 'css' | 'js'>('html');
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setAdv(false);
      d.showModal();
    } else if (!open && d.open) d.close();
  }, [open]);
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => onChange({ ...settings, [k]: v });
  const layoutKey = lang === 'python' ? 'pyLayout' : 'layout';
  const size = (n: number) => set('fontSize', Math.min(28, Math.max(10, n)));
  const fontRow = (
    <Row label="Font family">
      <select
        className="inp"
        value={settings.fontFamily}
        onChange={(e) => set('fontFamily', e.target.value as Settings['fontFamily'])}
      >
        {Object.entries(FONT_LABELS).map(([k, l]) => (
          <option key={k} value={k}>
            {l}
          </option>
        ))}
      </select>
    </Row>
  );
  const sizeRow = (
    <Row label="Font size">
      <div className="flex items-center gap-2">
        <button
          className="btn"
          aria-label="Kecilkan huruf"
          onClick={() => size(settings.fontSize - 1)}
        >
          −
        </button>
        <span style={{ minWidth: 44, textAlign: 'center' }}>{settings.fontSize} px</span>
        <button
          className="btn"
          aria-label="Besarkan huruf"
          onClick={() => size(settings.fontSize + 1)}
        >
          +
        </button>
        <input
          type="range"
          min={10}
          max={28}
          value={settings.fontSize}
          aria-label="Ukuran huruf"
          onChange={(e) => size(+e.target.value)}
          style={{ width: 110 }}
        />
      </div>
    </Row>
  );
  const keysRow = (
    <Row label="Key bindings">
      <select
        className="inp"
        value={settings.keymap}
        onChange={(e) => set('keymap', e.target.value as Settings['keymap'])}
      >
        <option value="default">Default (VS Code)</option>
        <option value="vim">Vim</option>
        <option value="emacs">Emacs</option>
      </select>
    </Row>
  );
  const sugRow = (
    <Row label="Suggestions while typing" hint="Mati: tekan Ctrl+Space untuk memanggil saran">
      <Toggle
        label="Suggestions while typing"
        checked={settings.suggestions}
        onChange={(v) => set('suggestions', v)}
      />
    </Row>
  );

  return (
    <dialog ref={ref} onClose={onClose} aria-label="Pengaturan editor">
      {!adv ? (
        <>
          <h3 style={{ margin: '0 0 6px' }}>Settings</h3>
          <div className="sec">Appearance</div>
          {fontRow}
          {sizeRow}
          <Row label="Layout">
            <div className="seg">
              {LAYOUTS.map(([k, l]) => (
                <button
                  key={k}
                  aria-pressed={settings[layoutKey] === k}
                  onClick={() => set(layoutKey, k)}
                >
                  {l}
                </button>
              ))}
            </div>
          </Row>
          <Row label="Editor theme">
            <select
              className="inp"
              value={settings.theme}
              onChange={(e) => set('theme', e.target.value)}
            >
              {THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </Row>
          <Row label="Terminal theme" hint="Samakan dengan tema editor">
            <Toggle
              label="Samakan tema terminal dengan editor"
              checked={settings.matchTerminal}
              onChange={(v) => set('matchTerminal', v)}
            />
          </Row>
          <div className="sec">Editing</div>
          {keysRow}
          {sugRow}
          <div className="row" style={{ marginTop: 10 }}>
            <button className="btn" onClick={() => setAdv(true)}>
              Advanced editor settings
            </button>
            <div className="flex gap-2">
              <button className="btn" onClick={() => onChange(DEFAULT_SETTINGS)}>
                Reset
              </button>
              <button className="btn btn-pri" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row" style={{ paddingTop: 0 }}>
            <h3 style={{ margin: 0 }}>Advanced editor settings</h3>
            <button className="btn" onClick={() => setAdv(false)}>
              Kembali
            </button>
          </div>
          <div className="sec">Theme &amp; fonts</div>
          <div
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              border: '1px solid var(--line)',
              ...themeVars(getTheme(settings.theme)),
            }}
          >
            <div
              className="tb"
              role="tablist"
              style={{
                background: 'var(--cbg)',
                color: 'var(--cfg)',
                ['--cline' as string]: 'color-mix(in srgb, var(--cfg) 18%, var(--cbg))',
              }}
            >
              {(['html', 'css', 'js'] as const).map((k) => (
                <button
                  key={k}
                  role="tab"
                  className="tab"
                  aria-selected={pv === k}
                  onClick={() => setPv(k)}
                >
                  {k.toUpperCase()}
                </button>
              ))}
            </div>
            <div style={{ height: 150, display: 'flex' }}>
              <CodeEditor
                lang={pv as EditorLang}
                value={SAMPLE[pv]}
                label="Pratinjau tema"
                settings={settings}
                readOnly
              />
            </div>
          </div>
          <fieldset style={{ border: 0, padding: 0, margin: '12px 0 0' }}>
            <legend className="sec" style={{ padding: 0 }}>
              Syntax highlighting theme
            </legend>
            <div className="themes">
              {[true, false].map((dark) => (
                <div
                  key={String(dark)}
                  style={{
                    background: dark ? '#0b0e14' : '#f1f2f4',
                    color: dark ? '#e6eaf2' : '#16202e',
                  }}
                >
                  <b>{dark ? 'Dark themes' : 'Light themes'}</b>
                  {THEMES.filter((t) => t.dark === dark).map((t) => (
                    <label key={t.id}>
                      <input
                        type="radio"
                        name="theme"
                        checked={settings.theme === t.id}
                        onChange={() => set('theme', t.id)}
                      />
                      {t.label}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </fieldset>
          {fontRow}
          {sizeRow}
          <Row label="Line height">
            <select
              className="inp"
              value={settings.lineHeight}
              onChange={(e) => set('lineHeight', +e.target.value)}
            >
              {[1.2, 1.4, 1.5, 1.7, 2].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </Row>
          <div className="sec">Behavior</div>
          <Row label="Auto-run (Web)">
            <Toggle
              label="Auto-run"
              checked={settings.autoRun}
              onChange={(v) => set('autoRun', v)}
            />
          </Row>
          {sugRow}
          {keysRow}
          <Row label="Line numbers">
            <Toggle
              label="Nomor baris"
              checked={settings.lineNumbers}
              onChange={(v) => set('lineNumbers', v)}
            />
          </Row>
          <Row label="Wrap lines">
            <Toggle label="Wrap baris" checked={settings.wrap} onChange={(v) => set('wrap', v)} />
          </Row>
          <Row label="Auto-close brackets and quotes">
            <Toggle
              label="Auto-close"
              checked={settings.closeBrackets}
              onChange={(v) => set('closeBrackets', v)}
            />
          </Row>
          <div className="sec">Code indentation</div>
          <Row label="Indent with spaces">
            <Toggle
              label="Indentasi spasi"
              checked={settings.indentSpaces}
              onChange={(v) => set('indentSpaces', v)}
            />
          </Row>
          <Row label="Indent size">
            <select
              className="inp"
              value={settings.tabSize}
              onChange={(e) => set('tabSize', +e.target.value)}
            >
              {[2, 4, 8].map((n) => (
                <option key={n} value={n}>
                  {n} spaces
                </option>
              ))}
            </select>
          </Row>
          <div style={{ textAlign: 'right', marginTop: 12 }}>
            <button
              className="btn"
              onClick={() => onChange(DEFAULT_SETTINGS)}
              style={{ marginRight: 8 }}
            >
              Reset
            </button>
            <button className="btn btn-pri" onClick={onClose}>
              Close
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
