'use client';
import { useRef, useState } from 'react';
import Splitter from './Splitter';
import { usePersistent, type Layout } from '@/lib/usePersistent';

/** Dua panel (editor dan hasil) dengan 3 tata letak: tabbed, stacked, side by side. Ukuran diingat per workspace. */
export default function SplitView({
  layout,
  storageKey,
  labels,
  a,
  b,
  defaultPct = 50,
}: {
  layout: Layout;
  storageKey: string;
  labels: [string, string];
  a: React.ReactNode;
  b: React.ReactNode;
  defaultPct?: number;
}) {
  const [size, setSize] = usePersistent(storageKey, { pct: defaultPct });
  const [which, setWhich] = useState<0 | 1>(0);
  const [drag, setDrag] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const tabbed = layout === 'tabbed',
    side = layout === 'side';
  const common = {
    container: box,
    value: size.pct,
    onChange: (pct: number) => setSize({ pct }),
    onReset: () => setSize({ pct: defaultPct }),
    onDragChange: setDrag,
  };
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      {tabbed && (
        <div
          className="tb"
          role="tablist"
          style={{
            background: 'var(--sf)',
            color: 'var(--ink)',
            ['--cline' as string]: 'var(--line)',
          }}
        >
          {labels.map((l, i) => (
            <button
              key={l}
              role="tab"
              className="btn"
              aria-pressed={which === i}
              onClick={() => setWhich(i as 0 | 1)}
            >
              {l}
            </button>
          ))}
        </div>
      )}
      <div
        ref={box}
        className={
          'flex min-h-0 flex-1 ' +
          (side ? 'flex-col md:flex-row' : 'flex-col') +
          (drag ? ' select-none [&_iframe]:pointer-events-none' : '')
        }
      >
        <div
          className={
            'flex min-h-0 min-w-0 ' + (tabbed ? (which === 0 ? 'flex-1' : 'hidden') : 'flex-none')
          }
          style={tabbed ? undefined : { flexBasis: size.pct + '%' }}
        >
          {a}
        </div>
        {!tabbed && !side && (
          <Splitter
            {...common}
            orientation="horizontal"
            label={'Ubah ukuran ' + labels[0] + ' dan ' + labels[1]}
          />
        )}
        {side && (
          <>
            <Splitter
              {...common}
              orientation="horizontal"
              className="md:hidden"
              label={'Ubah ukuran ' + labels[0] + ' dan ' + labels[1]}
            />
            <Splitter
              {...common}
              orientation="vertical"
              className="hidden md:block"
              label={'Ubah ukuran ' + labels[0] + ' dan ' + labels[1]}
            />
          </>
        )}
        <div className={'flex min-h-0 min-w-0 flex-1 ' + (tabbed && which === 0 ? 'hidden' : '')}>
          {b}
        </div>
      </div>
    </div>
  );
}
