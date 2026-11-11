// Service worker kecil untuk Python: membuat input() dan time.sleep() bisa "menunggu" di dalam Web Worker.
// Worker memanggil XMLHttpRequest sinkron ke /__sicoder_input; permintaan itu ditahan di sini sampai
// halaman mengirim teks yang diketik user. Cara ini jalan di semua browser tanpa header COOP/COEP.
const waiting = new Map();
const early = new Map();
const reply = (body) =>
  new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'x-sicoder': '1',
      'cache-control': 'no-store',
    },
  });

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('message', (e) => {
  const d = e.data || {};
  if (typeof d.id !== 'string') return;
  const value = String(d.value == null ? '' : d.value);
  const resolve = waiting.get(d.id);
  if (resolve) {
    waiting.delete(d.id);
    resolve(value);
  } else early.set(d.id, value); // jawaban tiba sebelum worker sempat bertanya
});
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;
  if (u.pathname === '/__sicoder_input') {
    const id = u.searchParams.get('id') || '';
    e.respondWith(
      new Promise((res) => {
        if (early.has(id)) {
          const v = early.get(id);
          early.delete(id);
          res(reply(v));
        } else waiting.set(id, (v) => res(reply(v)));
      }),
    );
  } else if (u.pathname === '/__sicoder_sleep') {
    const ms = Math.min(Math.max(+u.searchParams.get('ms') || 0, 0), 5000);
    e.respondWith(new Promise((res) => setTimeout(() => res(reply('')), ms)));
  }
});
