'use client';
import { useEffect, useRef, useState } from 'react';
import FileIcon, { type FileKind } from './FileIcon';
import Menu, { type MenuItem } from './Menu';

export interface TabDef {
  id: string;
  label: string;
  kind: FileKind;
  removable?: boolean;
}

/** Header editor: tab file (dengan ikon), dropdown daftar file, tombol +, dan menu ⋮. */
export default function FileTabs({
  tabs,
  active,
  onSelect,
  onAdd,
  onRemove,
  placeholder,
  menu,
}: {
  tabs: TabDef[];
  active: string;
  onSelect: (id: string) => void;
  onAdd: (name: string) => string | null; // mengembalikan pesan error, atau null jika berhasil
  onRemove: (id: string) => void;
  placeholder: string;
  menu: MenuItem[];
}) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const addRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const closeReason = useRef<'cancel' | 'ok'>('cancel');

  const close = (reason: 'cancel' | 'ok') => {
    closeReason.current = reason;
    setAdding(false);
    setName('');
    setErr('');
  };
  const submit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = onAdd(name.trim());
    if (r) setErr(r);
    else close('ok');
  };
  // Setelah form ditutup, fokus pindah: ke tab baru kalau berhasil, ke tombol + kalau dibatalkan.
  useEffect(() => {
    if (wasOpen.current && !adding) {
      if (closeReason.current === 'ok')
        listRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]')?.focus();
      else addRef.current?.focus();
    }
    wasOpen.current = adding;
  }, [adding]);
  return (
    <div className="flex w-full min-w-0 flex-col">
      <div className="flex w-full min-w-0 flex-wrap items-center gap-0.5">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Berkas"
          className="flex min-w-0 flex-wrap gap-0.5"
        >
          {tabs.map((t) => (
            <span key={t.id} className="inline-flex items-center">
              <button
                role="tab"
                className="tab inline-flex items-center"
                aria-selected={active === t.id}
                onClick={() => onSelect(t.id)}
              >
                <FileIcon kind={t.kind} />
                {t.label}
              </button>
              {t.removable && (
                <button
                  className="tab"
                  aria-label={'Hapus ' + t.label}
                  title="Hapus file"
                  onClick={() => onRemove(t.id)}
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        {adding ? (
          <form onSubmit={submit} className="file-tab-add">
            <input autoFocus className="file-tab-input" value={name} placeholder={placeholder} aria-label="Nama file baru"
              onChange={(e) => { setName(e.target.value); setErr(''); }}
              onKeyDown={(e) => { if (e.key === 'Escape') close('cancel'); }} />
            <button className="file-tab-close" type="button" aria-label="Batal tambah file" onClick={() => close('cancel')}>×</button>
          </form>
        ) : (
          <button ref={addRef} className="tab file-tab-plus" aria-label="Tambah file" title="Tambah file" onClick={() => setAdding(true)}>+</button>
        )}
        <div className="flex-1" />
        <Menu
          label="Daftar file"
          trigger="⌄"
          items={tabs.map((t) => ({
            label: t.label,
            active: t.id === active,
            onClick: () => onSelect(t.id),
          }))}
        />
        <Menu label="Menu editor" items={menu} />
      </div>

      {err && adding && <span role="alert" className="tb-add-err">{err}</span>}
    </div>
  );
}
