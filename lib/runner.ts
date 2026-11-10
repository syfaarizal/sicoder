const CAPTURE =
  'var f=function(l){return function(){parent.postMessage({sl:[l,[].map.call(arguments,function(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}).join(" ")]},"*")}};' +
  'console.log=f("log");console.error=f("error");console.warn=f("warn");' +
  'window.onerror=function(m,u,l){f("error")(m+(l?" (baris "+l+")":""));return true};';

/** Bangun dokumen untuk iframe sandbox. Satu workspace: HTML, CSS, JS otomatis tersambung. */
export function buildSrcDoc({ html, css, js }: { html: string; css: string; js: string }) {
  const end = '</' + 'script>';
  return (
    '<!doctype html><html><head><meta charset="utf-8"><style>' +
    css.split('</style').join('<\\/style') +
    '</style>' +
    '<script>' +
    CAPTURE +
    end +
    '</head><body>' +
    html +
    '<script>' +
    js.split('</script').join('<\\/script') +
    end +
    '</body></html>'
  );
}

export interface Extra {
  name: string;
  content: string;
}
/** Gabungkan file tambahan: .css ditaruh setelah style utama, .js ditaruh sebelum script utama (semua berbagi scope global). */
export function composeWeb(c: { html: string; css: string; js: string; extra: Extra[] }) {
  const x = c.extra;
  return {
    html: c.html,
    css: [c.css, ...x.filter((f) => f.name.endsWith('.css')).map((f) => f.content)].join('\n'),
    js: [...x.filter((f) => f.name.endsWith('.js')).map((f) => f.content), c.js].join('\n;\n'),
  };
}
