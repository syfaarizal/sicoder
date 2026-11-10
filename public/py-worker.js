// Web Worker untuk Pyodide. Dimuat lazy saat Run pertama.
let py = null;
let written = [];
let lintMod = null;
let busy = false; // sedang menjalankan kode user
const lintQueue = [];
async function init() {
  importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');
  py = await loadPyodide();
  py.setStdout({ batched: (t) => postMessage({ type: 'out', text: t + '\n' }) });
  py.setStderr({ batched: (t) => postMessage({ type: 'err', text: t + '\n' }) });
}
// Modul linter sintaks: mengumpulkan semua error, bukan hanya yang pertama.
async function loadLint() {
  if (lintMod) return lintMod;
  const src = await (await fetch('/py-lint.py')).text();
  py.FS.writeFile('/py-lint.py', src);
  lintMod = py.runPython(
    'import importlib.util\n' +
      "spec = importlib.util.spec_from_file_location('py_lint', '/py-lint.py')\n" +
      'm = importlib.util.module_from_spec(spec)\n' +
      'spec.loader.exec_module(m)\n' +
      'm',
  );
  return lintMod;
}
// Linting memakai interpreter yang sama, jadi harus menunggu kode user selesai.
async function doLint(msg) {
  try {
    if (!py) await init();
    const m = await loadLint();
    const files = [{ name: 'main.py', content: msg.code || '' }].concat(
      (msg.files || []).map((f) => ({ name: f.name, content: f.content })),
    );
    const out = m.lint_files_json(JSON.stringify(files));
    const problems = typeof out === 'string' ? JSON.parse(out) : out.toJs();
    postMessage({ type: 'lint', id: msg.id, problems });
  } catch (err) {
    postMessage({
      type: 'lint',
      id: msg.id,
      problems: [],
      error: String((err && err.message) || err),
    });
  }
}
// Tulis file tambahan ke filesystem Pyodide supaya bisa di-import, dan buang cache modul lama.
function syncFiles(files) {
  const names = files.map((f) => f.name);
  const removed = written.filter((n) => !names.includes(n));
  for (const n of removed) {
    try {
      py.FS.unlink(n);
    } catch (e) {}
  }
  for (const f of files) py.FS.writeFile(f.name, f.content);
  written = names;
  const mods = names.concat(removed).map((n) => n.replace(/\.py$/, ''));
  py.runPython(
    'import sys, importlib\nfor m in ' +
      JSON.stringify(mods) +
      ':\n    sys.modules.pop(m, None)\nimportlib.invalidate_caches()',
  );
}
// Ringkas traceback Pyodide: hanya frame milik user (main.py dan file tambahan) plus baris error terakhir.
function explain(msg) {
  const lines = msg.split('\n');
  const re = /File "(<exec>|\/home\/pyodide\/(\w+)\.py)", line (\d+)/;
  const errIdx = lines.map((l) => !!l.trim()).lastIndexOf(true);
  const out = [];
  let last = null;
  lines.forEach((l, i) => {
    const m = l.match(re);
    if (!m) return;
    const file = m[1] === '<exec>' ? 'main.py' : m[2] + '.py';
    out.push('  File "' + file + '", line ' + m[3]);
    const src = lines[i + 1];
    if (i + 1 !== errIdx && src && src.trim() && !/^\s*(File |Traceback|\^|~)/.test(src))
      out.push('    ' + src.trim());
    last = { file, line: +m[3] };
  });
  const err = lines.filter((l) => l.trim()).pop() || 'Error';
  const syn = /^(SyntaxError|IndentationError|TabError)/.test(err);
  return {
    text:
      (last && !syn ? 'Traceback (most recent call last):\n' : '') +
      out.join('\n') +
      (out.length ? '\n' : '') +
      err +
      '\n',
    problem: {
      file: last ? last.file : 'main.py',
      line: last ? last.line : undefined,
      message: err,
    },
  };
}
onmessage = async (e) => {
  const msg = e.data;
  if (msg.type === 'lint') {
    // Antre: interpreter hanya bisa dipakai satu proses pada satu waktu.
    // Hanya lint terbaru yang penting, jadi yang lama dibuang.
    lintQueue.length = 0;
    lintQueue.push(msg);
    if (!busy) drainLint();
    return;
  }
  if (msg.type !== 'run') return;
  busy = true;
  try {
    if (!py) {
      postMessage({ type: 'status', text: 'Memuat runtime Python...\n' });
      await init();
    }
    syncFiles(msg.files || []);
    // Namespace baru tiap Run: variabel dari Run sebelumnya tidak ikut terbawa
    const ns = py.globals.get('dict')();
    try {
      await py.runPythonAsync(msg.code, { globals: ns });
    } finally {
      ns.destroy();
    }
    postMessage({ type: 'done', code: 0 });
  } catch (err) {
    const x = explain(String((err && err.message) || err));
    postMessage({ type: 'err', text: x.text });
    postMessage({ type: 'problem', ...x.problem });
    postMessage({ type: 'done', code: 1 });
  } finally {
    busy = false;
    drainLint();
  }
};
// Jalankan antrean lint satu per satu; yang terbaru menggantikan yang lama.
async function drainLint() {
  if (busy || !lintQueue.length) return;
  const msg = lintQueue.shift();
  try {
    await doLint(msg);
  } finally {
    if (lintQueue.length) drainLint();
  }
}
