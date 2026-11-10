// Runner Python bersama untuk contoh kode di halaman materi. Terpisah dari workspace utama,
// jadi menjalankan contoh tidak mengganggu kode di editor.
type Kind = '' | 'e' | 'd';
interface Cb {
  out: (t: string, k: Kind) => void;
  done: (code: number) => void;
}
let worker: Worker | null = null;
let cur: Cb | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
const TIMEOUT_MS = 15000;

function finish(code: number) {
  clearTimeout(timer);
  const c = cur;
  cur = null;
  c?.done(code);
}

export function runPython(code: string, cb: Cb) {
  if (cur) {
    cb.out('Tunggu contoh lain selesai dulu ya.\n', 'd');
    cb.done(-1);
    return;
  }
  cur = cb;
  if (!worker) {
    worker = new Worker('/py-worker.js');
    worker.onmessage = (e) => {
      const m = e.data;
      if (m.type === 'out') cur?.out(m.text, '');
      else if (m.type === 'err') cur?.out(m.text, 'e');
      else if (m.type === 'status') cur?.out(m.text, 'd');
      else if (m.type === 'done') finish(m.code);
    };
    worker.onerror = () => {
      cur?.out('Runtime Python gagal dimuat. Cek koneksi internet lalu coba lagi.\n', 'e');
      worker = null;
      finish(1);
    };
  }
  timer = setTimeout(() => {
    worker?.terminate();
    worker = null;
    cur?.out('Dihentikan: program berjalan lebih dari ' + TIMEOUT_MS / 1000 + ' detik.\n', 'e');
    finish(1);
  }, TIMEOUT_MS);
  worker.postMessage({ type: 'run', code });
}
