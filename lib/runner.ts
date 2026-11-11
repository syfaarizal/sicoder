// Script yang disisipkan ke iframe: menangkap console.* dan error (termasuk promise yang ditolak).
// Error dikirim terstruktur ({sp}) dengan nomor baris relatif ke awal JS, supaya bisa dipetakan ke file.
const capture = (jsLine: number) =>
  'var JSL=' +
  jsLine +
  ';' +
  'var f=function(l){return function(){parent.postMessage({sl:[l,[].map.call(arguments,function(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}).join(" ")]},"*")}};' +
  'console.log=f("log");console.error=f("error");console.warn=f("warn");' +
  'window.onerror=function(m,u,l){var n=l?l-JSL+1:0;if(n<1)n=0;f("error")(m+(n?" (baris "+n+")":""));parent.postMessage({sp:{m:String(m),l:n}},"*");return true};' +
  'addEventListener("unhandledrejection",function(e){var r=e.reason,m="Uncaught (in promise) "+(r&&r.message?(r.name||"Error")+": "+r.message:String(r));f("error")(m);parent.postMessage({sp:{m:m,l:0}},"*")});';

/** Bangun dokumen untuk iframe sandbox. Satu workspace: HTML, CSS, JS otomatis tersambung. */
export function buildSrcDoc({ html, css, js }: { html: string; css: string; js: string }) {
  const end = '</' + 'script>';
  const head =
    '<!doctype html><html><head><meta charset="utf-8"><style>' +
    css.split('</style').join('<\\/style') +
    '</style><script>';
  const mid = end + '</head><body>' + html + '<script>';
  // JS dimulai pada baris ini di dokumen; dipakai untuk mengubah nomor baris error jadi relatif ke JS.
  const jsLine = (head + mid).split('\n').length;
  return (
    head + capture(jsLine) + mid + js.split('</script').join('<\\/script') + end + '</body></html>'
  );
}

export interface Extra {
  name: string;
  content: string;
}
export interface JsPart {
  file: string;
  start: number;
  len: number;
}

const lineCount = (s: string) => s.split('\n').length;

/** Gabungkan file tambahan: .css ditaruh setelah style utama, .js ditaruh sebelum script utama (semua berbagi scope global).
 *  `map` mencatat tiap file JS mulai di baris berapa pada JS gabungan, untuk menunjuk lokasi error. */
export function composeWeb(c: { html: string; css: string; js: string; extra: Extra[] }) {
  const x = c.extra;
  const jsFiles = [
    ...x.filter((f) => f.name.endsWith('.js')).map((f) => ({ file: f.name, content: f.content })),
    { file: 'script.js', content: c.js },
  ];
  const map: JsPart[] = [];
  let start = 1;
  for (const f of jsFiles) {
    const len = lineCount(f.content);
    map.push({ file: f.file, start, len });
    start += len + 1; // pemisah "\n;\n" menambah satu baris
  }
  return {
    html: c.html,
    css: [c.css, ...x.filter((f) => f.name.endsWith('.css')).map((f) => f.content)].join('\n'),
    js: jsFiles.map((f) => f.content).join('\n;\n'),
    map,
  };
}

/** Ubah nomor baris pada JS gabungan menjadi file + baris di file itu. */
export function locateJs(map: JsPart[], line: number) {
  const part = map.find((p) => line >= p.start && line < p.start + p.len);
  return part ? { file: part.file, line: line - part.start + 1 } : undefined;
}
