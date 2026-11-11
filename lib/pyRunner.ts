import { stripAnsi } from './ansi';
import { inputReady, sendInput } from './pyInput';

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
const TIMEOUT_MS = 60000;

function arm() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    worker?.terminate();
    worker = null;
    cur?.out('Dihentikan: program berjalan lebih dari ' + TIMEOUT_MS / 1000 + ' detik.\n', 'e');
    finish(1);
  }, TIMEOUT_MS);
}
function finish(code: number) {
  clearTimeout(timer);
  const c = cur;
  cur = null;
  c?.done(code);
}

export async function runPython(code: string, cb: Cb) {
  if (cur) {
    cb.out('Tunggu contoh lain selesai dulu ya.\n', 'd');
    cb.done(-1);
    return;
  }
  cur = cb;
  await inputReady(); // service worker untuk input() harus aktif sebelum worker dibuat
  if (!worker) {
    worker = new Worker('/py-worker.js');
    worker.onmessage = (e) => {
      const m = e.data;
      if (m.type === 'out') cur?.out(stripAnsi(m.text), '');
      else if (m.type === 'err') cur?.out(stripAnsi(m.text), 'e');
      else if (m.type === 'status') cur?.out(m.text, 'd');
      else if (m.type === 'input') {
        // Contoh di materi memakai kotak dialog sederhana untuk input().
        clearTimeout(timer);
        const v = window.prompt('Program meminta masukan:') ?? '';
        cur?.out(v + '\n', '');
        sendInput(m.id, v);
        arm();
      } else if (m.type === 'done') finish(m.code);
    };
    worker.onerror = () => {
      cur?.out('Runtime Python gagal dimuat. Cek koneksi internet lalu coba lagi.\n', 'e');
      worker = null;
      finish(1);
    };
  }
  arm();
  worker.postMessage({ type: 'run', code });
}
