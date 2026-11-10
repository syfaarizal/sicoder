'use client';
import { useEffect, useRef, useState } from 'react';

export interface MenuItem {
  label: string;
  onClick: () => void;
  active?: boolean;
}

/** Menu popover kecil (⋮ atau dropdown file). Tutup dengan klik di luar atau Esc. */
export default function Menu({
  items,
  label,
  trigger = '⋮',
}: {
  items: MenuItem[];
  label: string;
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', down);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', down);
      document.removeEventListener('keydown', key);
    };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button
        className="tab"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        title={label}
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </button>
      {open && (
        <div role="menu" className="menu">
          {items.map((it) => (
            <button
              key={it.label}
              role="menuitem"
              className="menu-item"
              aria-current={it.active}
              onClick={() => {
                setOpen(false);
                it.onClick();
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
