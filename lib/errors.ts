// Penjelasan error dalam bahasa Indonesia yang sederhana, supaya pemula tahu apa yang harus dicek.
type Rule = [RegExp, (m: RegExpExecArray) => string];

const PY: Rule[] = [
  [
    /IndentationError: unexpected indent/,
    () => 'Baris ini menjorok ke dalam padahal tidak perlu. Sejajarkan dengan baris di atasnya.',
  ],
  [
    /(IndentationError|SyntaxError): expected an indented block/,
    () =>
      'Setelah baris yang berakhir dengan titik dua (:), isi blok harus dimiringkan (indentasi) ke dalam. Jangan biarkan blok kosong.',
  ],
  [
    /IndentationError: unindent does not match/,
    () =>
      'Indentasi baris ini tidak sejajar dengan blok mana pun di atasnya. Samakan jumlah spasinya.',
  ],
  [
    /SyntaxError: expected ':'/,
    () => 'Di akhir baris if, for, while, def, atau class harus ada titik dua (:).',
  ],
  [
    /SyntaxError: '\(' was never closed|was never closed/,
    () => 'Ada tanda kurung atau kurung siku yang dibuka tapi belum ditutup.',
  ],
  [
    /unterminated string literal/,
    () => 'Tanda kutip pembuka belum punya penutup di baris yang sama.',
  ],
  [
    /Missing parentheses in call to 'print'/,
    () => 'Di Python 3, print harus pakai kurung. Contoh: print("halo").',
  ],
  [
    /SyntaxError: invalid syntax/,
    () =>
      'Penulisan di baris ini tidak dikenali Python. Cek tanda kurung, kutip, titik dua, atau kata yang salah ketik.',
  ],
  [
    /SyntaxError: cannot assign to/,
    () => 'Sisi kiri tanda = harus nama variabel. Kalau ingin membandingkan, pakai ==.',
  ],
  [/SyntaxError/, () => 'Ada penulisan yang salah di baris ini. Cek tanda baca dan ejaannya.'],
  [
    /NameError: name '(.+?)' is not defined/,
    (m) =>
      `Nama "${m[1]}" belum dibuat. Cek salah ketik, dan pastikan variabel atau fungsinya dibuat sebelum dipakai.`,
  ],
  [
    /TypeError: .*(unsupported operand|can only concatenate|must be str, not|not supported between)/,
    () =>
      'Dua nilai yang berbeda jenis sedang digabung atau dihitung (mis. teks dengan angka). Ubah dulu dengan int(), float(), atau str().',
  ],
  [
    /TypeError: .*takes \d+ positional argument/,
    () => 'Jumlah nilai yang kamu kirim ke fungsi tidak sama dengan jumlah parameternya.',
  ],
  [
    /TypeError: '(.+?)' object is not callable/,
    (m) =>
      `Kamu memanggil sesuatu bertipe ${m[1]} seperti fungsi. Mungkin nama variabelnya sama dengan nama fungsi.`,
  ],
  [/ZeroDivisionError/, () => 'Ada pembagian dengan nol. Pastikan pembaginya tidak 0.'],
  [
    /IndexError/,
    () =>
      'Nomor urutan (index) yang diminta lebih besar dari jumlah isi list. Ingat index mulai dari 0.',
  ],
  [/KeyError/, () => 'Kunci itu tidak ada di dictionary. Cek ejaan kuncinya.'],
  [
    /ValueError: invalid literal for int/,
    () => 'Teks itu tidak bisa diubah jadi angka. Pastikan isinya hanya angka.',
  ],
  [
    /AttributeError: .*has no attribute '(.+?)'/,
    (m) => `Objek ini tidak punya "${m[1]}". Cek ejaan nama method atau atributnya.`,
  ],
  [
    /ModuleNotFoundError: No module named '(.+?)'/,
    (m) =>
      `Modul "${m[1]}" tidak ditemukan. Kalau ini file buatanmu, buat file ${m[1]}.py lewat tombol +.`,
  ],
  [/EOFError/, () => 'Program meminta masukan tapi tidak ada yang diberikan.'],
  [
    /Layanan input belum aktif/,
    () =>
      'input() butuh service worker yang aktif. Muat ulang halaman dengan Ctrl+Shift+R, lalu coba lagi.',
  ],
];

const JS: Rule[] = [
  [
    /ReferenceError: (.+?) is not defined/,
    (m) =>
      `Nama "${m[1]}" belum dibuat. Cek salah ketik, dan pastikan dibuat pakai let atau const sebelum dipakai.`,
  ],
  [
    /TypeError: Cannot read propert(?:y|ies) of (null|undefined)/,
    (m) =>
      `Kamu memakai sesuatu yang ${m[1]} (kosong). Biasanya elemennya tidak ketemu: cek id-nya, atau pastikan elemen sudah ada sebelum JS berjalan.`,
  ],
  [
    /TypeError: Cannot set propert(?:y|ies) of (null|undefined)/,
    (m) =>
      `Elemen yang kamu tuju tidak ada (nilainya ${m[1]}), jadi isinya tidak bisa diubah. Cek id atau class-nya, dan pastikan elemennya ada di HTML sebelum JS berjalan.`,
  ],
  [
    /TypeError: (.+?) is not a function/,
    (m) => `${m[1]} bukan fungsi. Cek ejaan namanya dan cara memanggilnya.`,
  ],
  [
    /TypeError: Assignment to constant variable/,
    () => 'Variabel const tidak boleh diganti nilainya. Pakai let kalau nilainya perlu berubah.',
  ],
  [
    /SyntaxError: Identifier '(.+?)' has already been declared/,
    (m) => `Nama "${m[1]}" sudah dipakai. Pakai nama lain, atau hapus deklarasi gandanya.`,
  ],
  [
    /SyntaxError: missing \) after argument list/,
    () => 'Ada tanda kurung ) atau koma yang kurang di pemanggilan fungsi.',
  ],
  [
    /SyntaxError: Unexpected end of input/,
    () => 'Kodenya berhenti di tengah jalan. Biasanya ada kurung { ( atau [ yang belum ditutup.',
  ],
  [
    /SyntaxError: Unexpected token/,
    () =>
      'Ada tanda yang tidak pada tempatnya. Cek baris ini dan baris sebelumnya: koma, kurung, atau kutip yang kurang atau berlebih.',
  ],
  [
    /SyntaxError: (Invalid or unexpected token|Unexpected identifier|Unexpected string)/,
    () =>
      'Ada karakter atau kata yang tidak pada tempatnya. Biasanya kutip yang tidak berpasangan atau tanda baca yang kurang.',
  ],
  [/SyntaxError/, () => 'Ada penulisan yang salah di baris ini. Cek tanda baca dan ejaannya.'],
  [
    /RangeError: Maximum call stack/,
    () => 'Sebuah fungsi memanggil dirinya terus tanpa berhenti. Beri kondisi untuk berhenti.',
  ],
  [/TypeError/, () => 'Sebuah nilai dipakai dengan cara yang tidak cocok dengan jenisnya.'],
];

export function explainError(lang: 'python' | 'js', message: string): string | undefined {
  const msg = message.replace(/^Uncaught\s+/, '');
  for (const [re, fn] of lang === 'python' ? PY : JS) {
    const m = re.exec(msg);
    if (m) return fn(m);
  }
}
