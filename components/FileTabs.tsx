'use client';
import { useState } from 'react';
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
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = onAdd(name.trim());
    if (r) setErr(r);
    else {
      setAdding(false);
      setName('');
      setErr('');
    }
  };
  return (
    <div className="flex w-full min-w-0 flex-wrap items-center gap-0.5">
      <div role="tablist" aria-label="Berkas" className="flex min-w-0 flex-wrap gap-0.5">
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
      <div className="flex-1" />
      {adding ? (
        <form onSubmit={submit} className="flex flex-wrap items-center gap-1">
          <input
            autoFocus
            className="inp"
            style={{
              width: 150,
              padding: '3px 8px',
              background: 'transparent',
              color: 'inherit',
              borderColor: 'var(--cline)',
            }}
            value={name}
            placeholder={placeholder}
            aria-label="Nama file baru"
            onChange={(e) => {
              setName(e.target.value);
              setErr('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setAdding(false);
                setErr('');
              }
            }}
          />
          <button className="btn" type="submit">
            Tambah
          </button>
          {err && (
            <span role="alert" style={{ color: '#ff6b6b', fontSize: 13 }}>
              {err}
            </span>
          )}
        </form>
      ) : (
        <>
          <Menu
            label="Daftar file"
            trigger="⌄"
            items={tabs.map((t) => ({
              label: t.label,
              active: t.id === active,
              onClick: () => onSelect(t.id),
            }))}
          />
          <button
            className="tab"
            aria-label="Tambah file"
            title="Tambah file"
            onClick={() => setAdding(true)}
          >
            +
          </button>
        </>
      )}
      <Menu label="Menu editor" items={menu} />
    </div>
  );
}
