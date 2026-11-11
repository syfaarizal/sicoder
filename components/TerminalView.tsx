'use client';
import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';
import type { Style, Terminal } from '@/lib/ansi';

const css = (s: Style): CSSProperties => ({
  color: s.fg,
  background: s.bg,
  fontWeight: s.bold ? 700 : undefined,
  fontStyle: s.italic ? 'italic' : undefined,
  textDecoration: s.underline ? 'underline' : undefined,
  opacity: s.dim ? 0.65 : undefined,
});

/** Tampilan terminal: output berwarna + kolom input inline saat program memanggil input(). */
export default function TerminalView({
  term,
  version,
  waiting,
  onSubmit,
  boxRef,
  style,
  empty,
}: {
  term: Terminal;
  version: number;
  waiting: boolean;
  onSubmit: (v: string) => void;
  boxRef: RefObject<HTMLPreElement | null>;
  style?: CSSProperties;
  empty: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    boxRef.current?.scrollTo(0, 1e9);
  }, [version, waiting, boxRef]);
  useEffect(() => {
    if (waiting) input.current?.focus();
  }, [waiting]);
  const blank = term.lines.length === 1 && term.lines[0].length === 0 && !waiting;
  return (
    <pre
      ref={boxRef}
      className="term"
      role="log"
      aria-live="polite"
      style={style}
      onClick={() => input.current?.focus()}
    >
      {blank && <span className="d">{empty}</span>}
      {term.lines.map((line, i) => (
        <span key={i}>
          {line.map((sp, j) => (
            <span key={j} style={css(sp.style)}>
              {sp.text}
            </span>
          ))}
          {waiting && i === term.lines.length - 1 && (
            <input
              ref={input}
              className="term-in"
              aria-label="Masukan untuk program"
              autoComplete="off"
              spellCheck={false}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const v = e.currentTarget.value;
                  e.currentTarget.value = '';
                  onSubmit(v);
                }
              }}
            />
          )}
          {i < term.lines.length - 1 ? '\n' : ''}
        </span>
      ))}
    </pre>
  );
}
