# SICODER

Browser-based coding & learning environment (PRD v1.0). Next.js (App Router) + TypeScript + Tailwind CSS 3 + CodeMirror 6.

## Jalankan lokal

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # cek build produksi
npm run format   # Prettier untuk seluruh project
```

## Struktur

| Path                                                     | Isi                                                                                                                                                      |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/page.tsx`                                           | Landing: pilih Web / Python, lalu Code editor atau Materi                                                                                                |
| `app/materi/page.tsx`                                    | Halaman materi (daftar + isi, tombol buka di editor)                                                                                                     |
| `app/workspace/{web,python}`                             | Workspace per bahasa                                                                                                                                     |
| `components/WebWorkspace.tsx`                            | Tab HTML/CSS/JS, iframe sandbox, toggle Hasil/Console                                                                                                    |
| `components/PythonWorkspace.tsx`                         | Editor + terminal, Pyodide di Web Worker (timeout 15 detik, tombol Stop)                                                                                 |
| `components/LearningPanel.tsx`                           | Sidebar materi (hybrid: ikut konteks lesson, bisa dicari, bisa ditutup)                                                                                  |
| `components/CodeEditor.tsx`                              | Wrapper CodeMirror 6: tema, key bindings (Default/Vim/Emacs), autocomplete, auto-close, nomor baris                                                      |
| `components/WorkspaceFrame.tsx`                          | Cangkang workspace: header, sidebar materi dengan splitter, dialog pengaturan                                                                            |
| `components/SplitView.tsx`                               | Editor + hasil/terminal: tata letak Tabbed / Stacked / Side by side dengan splitter                                                                      |
| `components/Splitter.tsx`                                | Pembatas yang bisa digeser (mouse, sentuh, keyboard)                                                                                                     |
| `components/SettingsDialog.tsx`                          | Settings ringkas + Advanced editor settings (tema, font, behavior, indentasi)                                                                            |
| `lib/themes.ts`                                          | Daftar tema editor (gelap dan terang), warna toolbar/terminal, pilihan font                                                                              |
| `components/FileTabs.tsx`                                | Header editor: tab file dengan ikon, dropdown daftar file, tombol +, menu ⋮                                                                              |
| `components/Menu.tsx`, `FileIcon.tsx`, `ProblemList.tsx` | Menu popover, ikon file, dan daftar Problems                                                                                                             |
| `components/MiniPlayground.tsx`                          | Contoh kode yang bisa diedit dan dijalankan di dalam materi (state lokal, tidak menyentuh editor utama)                                                  |
| `components/LessonView.tsx`                              | Tampilan satu materi: penjelasan, tip, dan contoh-contoh runnable                                                                                        |
| `lib/content.ts`                                         | Semua materi (36 topik). Tambah materi dengan `mk(...)`, lihat bagian "Menambah materi"                                                                  |
| `lib/pyRunner.ts`                                        | Runner Python bersama untuk contoh di materi (Web Worker terpisah dari workspace)                                                                        |
| `lib/format.ts`                                          | Prettier di browser (HTML, CSS, JS)                                                                                                                      |
| `public/py-worker.js`                                    | Web Worker Pyodide (runtime dimuat dari CDN saat Run pertama)                                                                                            |
| `public/sw-input.js`                                     | Service worker kecil yang membuat `input()` dan `time.sleep()` Python bisa menunggu di dalam Web Worker (jalan di semua browser, tanpa header COOP/COEP) |
| `lib/pyInput.ts`                                         | Mendaftarkan service worker dan mengirim jawaban `input()` ke worker                                                                                     |
| `lib/ansi.ts`, `components/TerminalView.tsx`             | Terminal Python: warna ANSI, clear screen, `\r`, dan kolom input inline                                                                                  |
| `lib/errors.ts`                                          | Penjelasan error (Python dan JavaScript) dalam bahasa Indonesia sederhana untuk tab Problems                                                             |
| `public/py-lint.py`                                      | Pengumpul error sintaks Python: menemukan semua baris bermasalah sekaligus                                                                               |

## Materi

- Cari topik di sidebar atau halaman `/materi`, misalnya "padding", "jarak dalam", "addEventListener". Pencarian mencocokkan judul, kata kunci, penjelasan, bahkan isi kode, dan tidak peduli huruf besar-kecil.
- Setiap topik punya penjelasan singkat dan contoh yang bisa **diedit dan di-Run langsung di materi**. Kode di editor utama tidak berubah. Tombol **Ke editor** memindahkan contoh ke editor utama (dengan konfirmasi).
- Contoh Web berjalan otomatis sebentar setelah berhenti mengetik. Contoh Python dijalankan dengan tombol Run.

### Kategori dan nomor

Topik dikelompokkan per kategori dan diberi nomor berurutan per bahasa (1, 2, 3...). Halaman `/materi` menampilkan daftar isi per kategori, dan tiap topik punya tombol topik sebelumnya/berikutnya. Kategori diatur di `CATEGORY` dan urutannya di `CATEGORY_ORDER` pada `lib/content.ts`.

### Menambah materi

Di `lib/content.ts`, tambahkan satu panggilan `mk(...)` ke array `lessons`:

```ts
mk(
  'w-nama-unik',
  'CSS',
  'Judul topik',
  'Deskripsi singkat',
  'kata,kunci,untuk,pencarian',
  `Penjelasan singkat dengan bahasa santai.`,
  [
    {
      t: 'Judul contoh',
      n: 'Catatan opsional',
      h: '<p>HTML</p>',
      c: 'p { color: red; }',
      j: 'console.log(1)',
    },
  ],
  'Tip opsional',
);
```

`id` yang berawalan `p-` dianggap Python (pakai `p: 'kode python'` pada contoh), selain itu Web. Bagian `h`, `c`, `j` yang tidak ditulis tidak akan punya tab di contoh.

## Splitter

- Garis pemisah antara **materi dan workspace**, serta **editor dan hasil/terminal**, bisa digeser.
- Keyboard: fokus ke garis, lalu panah untuk geser, Enter atau klik ganda untuk reset.
- Ukuran tersimpan di localStorage (`sicoder:split:*`, `sicoder:panel`). Di layar kecil panel materi menutupi layar penuh.

## Pengaturan editor

Font, ukuran huruf, layout (per workspace), tema editor, tema terminal, key bindings, suggestions, line height, auto-run, wrap, nomor baris, auto-close bracket, indentasi. Semua tersimpan di `sicoder:settings`. Tambah tema baru di `lib/themes.ts`.

## Shortcut

- `Ctrl/Cmd + Enter`: Run
- `Shift + Alt + F`: Format dengan Prettier (HTML/CSS/JS)

## Catatan dan TODO

- Persistence memakai localStorage. PRD merekomendasikan IndexedDB untuk dokumen kode; ganti isi `lib/usePersistent.ts` bila perlu.
- Prettier tidak mendukung Python, jadi tombol Format hanya ada di Web workspace.
- `input()` di Python didukung lewat service worker. Posisi kursor lanjutan ANSI (mis. `\033[5;10H`) belum didukung; yang dikenali: warna/gaya, clear screen, dan `\r`.
- `os.system()` hanya mengenali `clear` dan `cls`; perintah shell lain mengembalikan kode 127.
- Konten masih TypeScript biasa; migrasi ke MDX sesuai PRD saat materi bertambah.
- Belum ada: challenge, Library `/library/[language]/[topic]`, learning paths `/paths`.

## File tambahan

- **Python:** tombol **+** di tab menambah file seperti `alat.py`. Run selalu menjalankan `main.py`, dan file lain bisa dipakai lewat `import alat`. Tiap Run memakai namespace baru (variabel Run sebelumnya tidak terbawa), dan output Run sebelumnya dihapus.
- **Web:** tombol **+** menambah file `.css` atau `.js`. File tambahan otomatis tersambung tanpa perlu menulis `<link>` atau `<script>`: `.css` dipasang setelah CSS utama, `.js` dipasang sebelum JS utama (semua berbagi scope global, jadi fungsi di `helper.js` bisa dipakai di JS utama).
- File tambahan tersimpan di localStorage bersama kode utama. Menghapus file memakai tombol × di tab.

## Header editor dan terminal

- **Editor:** tab file (dengan ikon), dropdown ⌄ untuk daftar file, tombol + untuk file baru, dan menu ⋮ (Reset, dan Format untuk Web).
- **Terminal / Output:** tombol **Run** ada di header terminal (Python) atau header hasil (Web), bersama tab **Terminal** dan **Problems**.
- **Problems (Python):** error sintaks terdeteksi langsung saat kode diketik, tanpa perlu Run. Semua baris yang bermasalah ditampilkan sekaligus, bukan hanya error pertama. Kalau sebuah baris diperbaiki, errornya hilang dan yang tersisa tinggal masalah yang belum diperbaiki. Error runtime dari Run juga ikut ditampilkan di sini. Klik item untuk melompat ke barisnya di editor. Traceback di terminal diringkas ke file milik kamu saja.
- **Problems (Web):** menampilkan error JavaScript dari preview (tanpa lompat baris, karena JS utama dan file tambahan digabung).

## Python interaktif (terminal)

- **`input()`** bekerja: saat program meminta masukan, kolom ketik muncul langsung di terminal, di ujung baris prompt. Tekan Enter untuk mengirim. Waktu menunggu ketikan tidak dihitung ke batas waktu program.
- **Warna dan clear screen ANSI** (`\033[1m`, `\033[38;5;203m`, `os.system("clear")`) dirender di terminal. `\r` menimpa baris yang sama (cocok untuk progress bar).
- **`shutil.get_terminal_size()`** mengembalikan ukuran terminal yang sebenarnya (kolom dan baris dihitung dari panel terminal).
- **`time.sleep()`** benar-benar menunggu tanpa membakar CPU, jadi animasi teks huruf demi huruf berjalan semestinya.
- Kode dijalankan seperti `python main.py`: `__name__` bernilai `"__main__"`, jadi blok `if __name__ == "__main__":` jalan.
- Batas waktu program 60 detik (tombol Stop selalu tersedia).
- Service worker perlu aktif. Kalau `input()` menampilkan pesan "Layanan input belum aktif", muat ulang halaman dengan Ctrl+Shift+R.

## Problems yang lebih jelas

Tiap masalah menampilkan: lokasi (`file:baris`), pesan asli, baris kode yang bermasalah, dan penjelasan singkat dalam bahasa Indonesia tentang apa yang harus dicek. Berlaku untuk Python (error sintaks dan runtime) dan JavaScript. Di Web, error JavaScript dipetakan ke file dan baris aslinya (termasuk file `.js` tambahan), dan klik item akan melompat ke barisnya. `console.error()` yang ditulis sendiri tetap hanya muncul di Console, bukan di Problems.

## Changelog

### v0.7

- **Python:** `input()` didukung; terminal memahami warna dan clear screen ANSI, `\r`, dan ukuran terminal; `time.sleep()` dan `os.system("clear")` bekerja; `__name__ == "__main__"` kini jalan; batas waktu 60 detik dan tidak dihitung saat menunggu input.
- **Web:** perbaikan bug Run kedua yang tidak menampilkan output setelah Clear (kode yang sama tidak dimuat ulang oleh iframe). Sekarang tiap Run membuat iframe baru. Berlaku juga untuk contoh di materi.
- **Problems:** penjelasan error berbahasa Indonesia, tampilan baris kode yang bermasalah, dan pemetaan error JavaScript ke file dan baris (klik untuk melompat).
- Contoh Python di materi ikut mendukung `input()` (lewat dialog) dan membuang kode warna ANSI dari output.

### v0.6

- Problems (Python) menampilkan **semua** baris yang bermasalah sekaligus, bukan hanya error pertama. Deteksi berjalan langsung saat mengetik (tanpa Run), dan error hilang otomatis begitu baris itu diperbaiki.
- Error sintaks dikumpulkan dengan cara mengulang `compile()` pada salinan kode yang baris errornya diganti, jadi pesan yang muncul sama persis dengan pesan dari Python aslinya. L awhile tetap ditampung agar tidak bentrok dengan proses Run.
- Error runtime dari Run dan error sintaks sekarang digabung di tab Problems yang sama.

### v0.5

- Header editor dan terminal dirombak (lihat bagian di atas); Run pindah ke header terminal/hasil.
- Tab Problems dengan klik-untuk-lompat ke baris (Python).
- Materi dikelompokkan per kategori dengan nomor, daftar isi di `/materi`, dan navigasi topik sebelumnya/berikutnya.

### v0.4

- Python: output Run sebelumnya dihapus tiap Run; namespace Python direset tiap Run.
- Tambah file (Python `.py`, Web `.css` dan `.js`) dengan tab file dan tombol +.
- Materi: istilah kode di dalam penjelasan (mis. `print()`, `padding`) tampil sebagai kode. Tambahkan istilah baru di `CODE_TERMS` pada `lib/content.ts`, atau tulis langsung `{{istilah}}` di teks.
- Font UI memakai bobot 400 untuk teks biasa (sebelumnya terlalu tebal).

### v0.3

- Materi diperluas jadi 36 topik: HTML (7), CSS (11), JavaScript (9), Python (9), dengan bahasa santai.
- Pencarian materi lebih pintar (judul, kata kunci, penjelasan, isi kode) dan topik dikelompokkan.
- Contoh kode di materi bisa diedit dan dijalankan langsung tanpa mengganggu editor utama.
- `lib/content.ts` dirombak: bentuk `Lesson` kini punya `examples`, `keywords`, `group`. Kalau kamu sudah menambah materi sendiri di file lama, pindahkan manual ke format `mk(...)`.

### v0.2

- Settings baru (Settings + Advanced editor settings) dengan pilihan tema, font, layout, key bindings.
- Splitter untuk materi dan editor/preview.
- Dependensi baru: `@uiw/codemirror-themes-all`, `@replit/codemirror-vim`, `@replit/codemirror-emacs`, `@codemirror/language`, `@codemirror/autocomplete`. Jalankan `npm install` setelah menimpa file.
- Opsi lama `stack` diganti `layout` dan `pyLayout`; pengaturan tersimpan yang lama otomatis memakai nilai default baru.

### v0.1

- Landing, materi, Web workspace, Python workspace (Pyodide + Web Worker), Prettier, autocomplete.
