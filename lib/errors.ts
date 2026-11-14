// Penjelasan error dalam bahasa Indonesia yang santai, supaya pemula tahu apa yang harus dicek.
type Rule = [RegExp, (m: RegExpExecArray) => string];

const PY: Rule[] = [
  [
    /IndentationError: unexpected indent/,
    () => 'Baris ini maju-undur padahal engga perlu. Samain aja sama baris di atasnya.',
  ],
  [
    /(IndentationError|SyntaxError): expected an indented block/,
    () =>
      'Baris yang berakhir dengan titik dua (:) wajib punya isi, dan isinya itu masuk ke dalam (indentasi). Jangan sampe bloknya kosong.',
  ],
  [
    /IndentationError: unindent does not match/,
    () =>
      'Indentasi baris ini nggak sama dengan blok manapun di atasnya. Cek jumlah spasinya, harus sama persis.',
  ],
  [
    /SyntaxError: expected ':'/,
    () => 'Baris if, for, while, def, atau class wajib diakhiri titik dua (:).',
  ],
  [
    /SyntaxError: '\(' was never closed|was never closed/,
    () => 'Ada kurung (, [ atau { yang udah dibuka tapi belum ditutup.',
  ],
  [
    /unterminated string literal/,
    () => 'Tanda kutip pembuka belum ketemu penutupnya di baris yang sama.',
  ],
  [
    /Missing parentheses in call to 'print'/,
    () => 'Di Python 3, print wajib pakai kurung. Contoh: print("halo").',
  ],
  [
    /SyntaxError: invalid syntax/,
    () =>
      'Python nggak kenali penulisan di baris ini. Cek kurung, kutip, titik dua, atau kata yang salah ketik.',
  ],
  [
    /SyntaxError: cannot assign to/,
    () => 'Sisi kiri tanda = harus nama variabel. Kalau mau bandingin, pakai ==.',
  ],
  [/SyntaxError/, () => 'Ada yang salah nulis di baris ini. Cek tanda baca sama ejaannya.'],
  [
    /NameError: name '(.+?)' is not defined/,
    (m) =>
      `Nama "${m[1]}" belum pernah dibuat. Cek salah ketik, dan pastikan variabel atau fungsimu udah ada sebelum dipakai.`,
  ],
  [
    /TypeError: .*(unsupported operand|can only concatenate|must be str, not|not supported between)/,
    () =>
      'Ada dua nilai beda jenis yang lagi digabung atau dihitung (mis. teks sama angka). Ubah dulu pakai int(), float(), atau str().',
  ],
  [
    /TypeError: .*takes \d+ positional argument/,
    () => 'Jumlah nilai yang kamu kirim ke fungsi nggak sama sama jumlah parameternya.',
  ],
  [
    /TypeError: '(.+?)' object is not callable/,
    (m) =>
      `Kamu manggil sesuatu bertipe ${m[1]} kayak fungsi. Mungkin nama variabelmu kebetulan sama sama nama fungsinya.`,
  ],
  [/ZeroDivisionError/, () => 'Ada pembagian sama nol. Pastikan yang buat bagi bukan 0.'],
  [
    /IndexError/,
    () =>
      'Index yang kamu minta lebih besar dari isi list-nya. Ingat, index mulai dari 0 ya.',
  ],
  [/KeyError/, () => 'Kunci itu nggak ada di dictionary. Cek ejaan kuncinya.'],
  [
    /ValueError: invalid literal for int/,
    () => 'Teks itu nggak bisa diubah jadi angka. Pastikan isinya emang cuma angka.',
  ],
  [
    /AttributeError: .*has no attribute '(.+?)'/,
    (m) => `Objek ini nggak punya "${m[1]}". Cek ejaan nama method atau atributnya.`,
  ],
  [
    /ModuleNotFoundError: No module named '(.+?)'/,
    (m) =>
      `Modul "${m[1]}" nggak ketemu. Kalau ini file buatanmu, bikin file ${m[1]}.py lewat tombol +.`,
  ],
  [/EOFError/, () => 'Program nanya masukan tapi nggak ada yang jawab.'],
  [
    /Layanan input belum aktif/,
    () =>
      'input() butuh service worker yang jalan. Muat ulang halaman pakai Ctrl+Shift+R, lalu coba lagi.',
  ],
];

const JS: Rule[] = [
  [
    /ReferenceError: (.+?) is not defined/,
    (m) =>
      `Nama "${m[1]}" belum pernah dibuat. Cek salah ketik, dan pastikan udah dibuat pakai let atau const sebelum dipakai.`,
  ],
  [
    /TypeError: Cannot read propert(?:y|ies) of (null|undefined)/,
    (m) =>
      `Kamu nulis ke sesuatu yang nilainya ${m[1]} (kosong). Biasanya elemennya nggak ketemu: cek id-nya, atau pastikan elemennya udah ada sebelum JS jalan.`,
  ],
  [
    /TypeError: Cannot set propert(?:y|ies) of (null|undefined)/,
    (m) =>
      `Elemen yang kamu tuju nggak ada (nilainya ${m[1]}), jadi isinya nggak bisa diubah. Cek id atau class-nya, dan pastikan elemennya udah ada di HTML sebelum JS jalan.`,
  ],
  [
    /TypeError: (.+?) is not a function/,
    (m) => `${m[1]} bukan fungsi. Cek ejaan namanya dan cara manggilnya.`,
  ],
  [
    /TypeError: Assignment to constant variable/,
    () => 'Variabel const nggak boleh diganti nilainya. Pakai let kalau nilainya perlu berubah.',
  ],
  [
    /SyntaxError: Identifier '(.+?)' has already been declared/,
    (m) => `Nama "${m[1]}" udah kepake. Pilih nama lain, atau hapus deklarasi gandanya.`,
  ],
  [
    /SyntaxError: missing \) after argument list/,
    () => 'Ada tanda kurung ) atau koma yang kurang pas waktu manggil fungsi.',
  ],
  [
    /SyntaxError: Unexpected end of input/,
    () => 'Kodenya berhenti di tengah jalan. Biasanya ada kurung { ( atau [ yang belum ditutup.',
  ],
  [
    /SyntaxError: Unexpected token/,
    () =>
      'Ada tanda yang lagi ngadong di tempat yang nggak bener. Cek baris ini sama baris sebelumnya: koma, kurung, atau kutip yang kurang atau kebanyakan.',
  ],
  [
    /SyntaxError: (Invalid or unexpected token|Unexpected identifier|Unexpected string)/,
    () =>
      'Ada karakter atau kata yang lagi ngadong di tempat yang nggak bener. Biasanya kutip yang nggak berpasangan atau tanda baca yang kurang.',
  ],
  [/SyntaxError/, () => 'Ada yang salah nulis di baris ini. Cek tanda baca sama ejaannya.'],
  [
    /RangeError: Maximum call stack/,
    () => 'Fungsi itu manggil dirinya sendiri terus tanpa berhenti. Kasih kondisi biar bisa berhenti.',
  ],
  [/TypeError/, () => 'Nilai ini dipakai dengan cara yang nggak cocok sama jenisnya.'],
];

export function explainError(lang: 'python' | 'js', message: string): string | undefined {
  const msg = message.replace(/^Uncaught\s+/, '');
  for (const [re, fn] of lang === 'python' ? PY : JS) {
    const m = re.exec(msg);
    if (m) return fn(m);
  }
}
