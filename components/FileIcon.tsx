const ICONS = {
  py: ['linear-gradient(135deg,#3776ab 50%,#ffd43b 50%)', '#fff', 'Py'],
  html: ['#e44d26', '#fff', 'H'],
  css: ['#2965f1', '#fff', 'C'],
  js: ['#f7df1e', '#222', 'JS'],
} as const;
export type FileKind = keyof typeof ICONS;
export const kindOf = (name: string): FileKind =>
  name.endsWith('.py')
    ? 'py'
    : name.endsWith('.css')
      ? 'css'
      : name.endsWith('.js')
        ? 'js'
        : 'html';

export default function FileIcon({ kind }: { kind: FileKind }) {
  const [bg, fg, t] = ICONS[kind];
  return (
    <span
      aria-hidden
      style={{
        background: bg,
        color: fg,
        fontSize: 9,
        fontWeight: 700,
        width: 18,
        height: 18,
        borderRadius: 4,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
        flex: 'none',
      }}
    >
      {t}
    </span>
  );
}
