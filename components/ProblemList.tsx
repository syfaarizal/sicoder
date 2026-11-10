export interface Problem {
  id: number;
  file: string;
  line?: number;
  message: string;
}

/** Daftar masalah (error) hasil Run. Klik satu item untuk melompat ke barisnya. */
export default function ProblemList({
  problems,
  onGo,
  style,
}: {
  problems: Problem[];
  onGo?: (p: Problem) => void;
  style?: React.CSSProperties;
}) {
  return (
    <div className="term" role="list" style={style}>
      {problems.length === 0 && <span className="d">Tidak ada masalah. Bagus!</span>}
      {problems.map((p) => (
        <button
          key={p.id}
          role="listitem"
          className="problem"
          onClick={() => onGo?.(p)}
          disabled={!onGo || !p.line}
        >
          <span className="e">●</span>{' '}
          <b>
            {p.file}
            {p.line ? ':' + p.line : ''}
          </b>{' '}
          <span>{p.message}</span>
        </button>
      ))}
    </div>
  );
}
