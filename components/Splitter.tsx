'use client';
import { useRef, useState, type RefObject } from 'react';

interface Props {
  container: RefObject<HTMLElement | null>;
  orientation: 'vertical' | 'horizontal'; // vertical = garis tegak (geser kiri-kanan)
  value: number; // persen ruang sisi pertama (kiri/atas)
  onChange: (pct: number) => void;
  onReset?: () => void;
  onDragChange?: (dragging: boolean) => void;
  min?: number;
  max?: number;
  label: string;
  className?: string;
}

/** Pembatas yang bisa digeser (mouse, sentuh, dan keyboard: panah, Enter untuk reset). */
export default function Splitter({
  container,
  orientation,
  value,
  onChange,
  onReset,
  onDragChange,
  min = 15,
  max = 85,
  label,
  className = '',
}: Props) {
  const [drag, setDrag] = useState(false);
  const active = useRef(false);
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const state = (v: boolean) => {
    active.current = v;
    setDrag(v);
    onDragChange?.(v);
  };
  const move = (e: React.PointerEvent) => {
    const el = container.current;
    if (!active.current || !el) return;
    const r = el.getBoundingClientRect();
    const p =
      orientation === 'vertical' ? (e.clientX - r.left) / r.width : (e.clientY - r.top) / r.height;
    onChange(clamp(p * 100));
  };
  const key = (e: React.KeyboardEvent) => {
    const back = orientation === 'vertical' ? 'ArrowLeft' : 'ArrowUp',
      fwd = orientation === 'vertical' ? 'ArrowRight' : 'ArrowDown';
    if (e.key === back) {
      e.preventDefault();
      onChange(clamp(value - 2));
    } else if (e.key === fwd) {
      e.preventDefault();
      onChange(clamp(value + 2));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onReset?.();
    }
  };
  return (
    <div
      role="separator"
      tabIndex={0}
      aria-label={label}
      aria-orientation={orientation}
      aria-valuenow={Math.round(value)}
      aria-valuemin={min}
      aria-valuemax={max}
      className={'splitter ' + className}
      data-o={orientation === 'vertical' ? 'v' : 'h'}
      data-drag={drag}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        state(true);
      }}
      onPointerMove={move}
      onPointerUp={() => state(false)}
      onPointerCancel={() => state(false)}
      onDoubleClick={onReset}
      onKeyDown={key}
    />
  );
}
