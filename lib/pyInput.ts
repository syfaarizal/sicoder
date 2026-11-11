// Menyiapkan service worker untuk input() dan time.sleep() Python, serta mengirim jawaban input ke worker.
let reg: Promise<ServiceWorkerRegistration | null> | null = null;

/** Daftarkan service worker (sekali) dan tunggu sampai aktif. Worker Python harus dibuat SESUDAH ini. */
export function inputReady() {
  if (!reg) {
    reg =
      typeof navigator !== 'undefined' && 'serviceWorker' in navigator
        ? navigator.serviceWorker
            .register('/sw-input.js', { scope: '/' })
            .then(() => navigator.serviceWorker.ready)
            .catch(() => null)
        : Promise.resolve(null);
  }
  return reg;
}

export async function sendInput(id: string, value: string) {
  const r = await inputReady();
  r?.active?.postMessage({ id, value });
}
