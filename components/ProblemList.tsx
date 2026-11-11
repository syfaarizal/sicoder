import { explainError } from '@/lib/errors';

export interface Problem {
  id: number;
  file: string;
  line?: number;
  message: string;
}

/** Daftar masalah (error). Tiap item: lokasi, pesan asli, baris kode yang bermasalah, dan penjelasan sederhana. */
export default function ProblemList({
  problems,
  onGo,
  style,
  lang,
  source,
}: {
  problems: Problem[];
  onGo?: (p: Problem) => void;
  style?: React.CSSProperties;
  lang?: 'python' | 'js';
  source?: (p: Problem) => string | undefined;
}) {
  return (
    <div className="term" role="list" style={style}>
      {problems.length === 0 && <span className="d">Tidak ada masalah. Bagus!</span>}
      {problems.map((p) => {
        const hint = lang ? explainError(lang, p.message) : undefined;
        const src = source?.(p)?.trimEnd();
        return (
          <button
            key={p.id}
            role="listitem"
            className="problem"
            onClick={() => onGo?.(p)}
            disabled={!onGo || !p.line}
          >
            <div>
              <span className="e">●</span>{' '}
              <b>
                {p.file}
                {p.line ? ':' + p.line : ''}
              </b>{' '}
              <span>{p.message}</span>
            </div>
            {src && (
              <div className="psrc">
                {p.line} │ {src}
              </div>
            )}
            {hint && <div className="phint">{hint}</div>}
          </button>
        );
      })}
    </div>
  );
}
