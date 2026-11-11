'use client';
import { useRef, useState, type CSSProperties } from 'react';
import Header from './Header';
import LearningPanel from './LearningPanel';
import SettingsDialog from './SettingsDialog';
import Splitter from './Splitter';
import type { Lang, Snippet } from '@/lib/content';
import { usePersistent, type Settings } from '@/lib/usePersistent';

/** Cangkang workspace: header, sidebar materi (lebar bisa digeser), dan dialog pengaturan. */
export default function WorkspaceFrame({
  lang,
  settings,
  onSettings,
  panel,
  onPanel,
  activeId,
  onActive,
  onLoad,
  children,
}: {
  lang: Lang;
  settings: Settings;
  onSettings: (s: Settings) => void;
  panel: boolean;
  onPanel: (o: boolean) => void;
  activeId: string | null;
  onActive: (id: string | null) => void;
  onLoad: (s: Snippet, lessonId: string) => void;
  children: React.ReactNode;
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [pp, setPp] = usePersistent('sicoder:panel', { pct: 32 }); // lebar panel materi (persen)
  const [drag, setDrag] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  return (
    <div
      className="flex h-dvh flex-col"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <Header>
        <button className="btn" aria-pressed={panel} onClick={() => onPanel(!panel)}>
          <span aria-hidden="true">☰</span>
          <span className="hidden sm:inline">Materi di sisi</span>
          <span className="sr-only sm:hidden">Materi di sisi</span>
        </button>
        <button className="btn" onClick={() => setShowSettings(true)}>
          <span aria-hidden="true">⚙</span>
          <span className="hidden sm:inline">Pengaturan</span>
          <span className="sr-only sm:hidden">Pengaturan</span>
        </button>
      </Header>
      <div
        ref={box}
        className={
          'relative flex min-h-0 flex-1' +
          (drag ? ' select-none [&_iframe]:pointer-events-none' : '')
        }
        style={{ ['--pw' as string]: pp.pct + '%' } as CSSProperties}
      >
        <div className="flex min-w-0 flex-1">{children}</div>
        {panel && (
          <>
            <Splitter
              container={box}
              orientation="vertical"
              className="hidden md:block"
              label="Ubah lebar panel materi"
              min={40}
              max={80}
              value={100 - pp.pct}
              onChange={(v) => setPp({ pct: 100 - v })}
              onReset={() => setPp({ pct: 32 })}
              onDragChange={setDrag}
            />
            <LearningPanel
              lang={lang}
              settings={settings}
              activeId={activeId}
              onActive={onActive}
              onLoad={onLoad}
              onClose={() => onPanel(false)}
            />
          </>
        )}
      </div>
      <SettingsDialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onChange={onSettings}
        lang={lang}
      />
    </div>
  );
}
