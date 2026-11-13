import { GOALS, LESSON_ORDER, PY_CATEGORIES, PY_LESSONS } from './content-python';

export type Lang = 'web' | 'python';
export type Snippet = { html?: string; css?: string; js?: string; py?: string };
export interface Example {
  title: string;
  note?: string;
  snippet: Snippet;
}
export interface Lesson {
  id: string;
  lang: Lang;
  group: string;
  title: string;
  desc: string;
  keywords: string[];
  text: string;
  tip?: string;
  goal?: string; // "Setelah ini kamu bisa ...": kemampuan yang dibangun topik ini
  examples: Example[];
  snippet: Snippet; // snippet = contoh pertama
}

type Ex = { t: string; n?: string; h?: string; c?: string; j?: string; p?: string };
// Cara menambah materi: panggil mk(...) di bawah. id berawalan "p-" = Python, selain itu Web.
const mk = (
  id: string,
  group: string,
  title: string,
  desc: string,
  kw: string,
  text: string,
  ex: Ex[],
  tip?: string,
): Lesson => {
  const examples = ex.map((e) => ({
    title: e.t,
    note: e.n,
    snippet: (e.p !== undefined ? { py: e.p } : { html: e.h, css: e.c, js: e.j }) as Snippet,
  }));
  return {
    id,
    lang: id.startsWith('p-') ? 'python' : 'web',
    group,
    title,
    desc,
    keywords: kw.split(',').map((s) => s.trim()),
    text,
    tip,
    examples,
    snippet: examples[0].snippet,
  };
};

export const lessons: Lesson[] = [
  // ---------- HTML ----------
  mk(
    'w-struktur',
    'HTML',
    'Struktur dasar HTML',
    'Tag pembuka dan penutup',
    'html,tag,elemen,dasar,pembuka,penutup,h1,p',
    `HTML itu kerangka halaman web. Isinya tersusun dari tag yang ditulis pakai tanda < dan >. Kebanyakan tag punya pembuka dan penutup, misalnya <p> sampai </p>. Teks di tengahnya yang tampil di halaman.`,
    [
      {
        t: 'Judul dan paragraf',
        h: '<h1>Halo, dunia</h1>\n<p>Ini paragraf pertamaku.</p>',
        c: 'body {\n  font-family: sans-serif;\n  padding: 16px;\n}',
        j: '',
      },
      {
        t: 'Tag di dalam tag',
        n: 'Tag boleh ditaruh di dalam tag lain. Ini namanya nesting.',
        h: '<div>\n  <h2>Kotak pertama</h2>\n  <p>Aku ada di dalam div.</p>\n</div>',
      },
    ],
    'Di editor ini kamu cukup menulis isi halaman. Tag <html>, <head>, dan <body> sudah diurus otomatis.',
  ),
  mk(
    'w-teks',
    'HTML',
    'Teks: judul, tebal, miring',
    'h1 sampai h6, p, strong, em, br',
    'heading,judul,paragraf,bold,tebal,miring,italic,strong,em,br,baris baru,teks',
    `Ada 6 tingkat judul: h1 paling besar sampai h6 paling kecil. Untuk teks biasa pakai p. Mau menebalkan pakai strong, mau memiringkan pakai em, mau pindah baris tanpa paragraf baru pakai br.`,
    [
      {
        t: 'Judul dan penekanan',
        h: '<h1>Judul utama</h1>\n<h2>Sub judul</h2>\n<p>Kata ini <strong>tebal</strong>, kata ini <em>miring</em>.</p>\n<p>Baris satu<br>Baris dua</p>',
      },
    ],
  ),
  mk(
    'w-daftar',
    'HTML',
    'Daftar (list)',
    'ul, ol, dan li',
    'list,daftar,ul,ol,li,bullet,nomor,urutan',
    `ul dibuat untuk daftar bertitik, ol untuk daftar bernomor. Setiap itemnya ditulis pakai li.`,
    [
      {
        t: 'Daftar bertitik dan bernomor',
        h: '<ul>\n  <li>Apel</li>\n  <li>Jeruk</li>\n</ul>\n\n<ol>\n  <li>Bangun tidur</li>\n  <li>Sarapan</li>\n  <li>Coding</li>\n</ol>',
      },
    ],
  ),
  mk(
    'w-link',
    'HTML',
    'Link dan gambar',
    'a href dan img src',
    'link,tautan,a,href,gambar,img,src,alt,target',
    `Link dibuat pakai a, alamat tujuannya ditulis di href. Gambar pakai img, lokasi gambarnya di src, dan alt berisi deskripsi singkat (berguna kalau gambar gagal tampil).`,
    [
      {
        t: 'Link',
        h: '<a href="https://example.com" target="_blank">Buka example.com</a>',
        n: 'Di preview, link mungkin tidak terbuka. Itu normal, preview ini terisolasi.',
      },
      {
        t: 'Gambar',
        h: `<img alt="Kotak biru" width="120" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' fill='%232347e8'/%3E%3C/svg%3E">`,
      },
    ],
  ),
  mk(
    'w-form',
    'HTML',
    'Tombol dan input',
    'button, input, label',
    'tombol,button,input,form,isian,label,placeholder,type',
    `button membuat tombol. input membuat kotak isian, jenisnya diatur lewat type (text, number, password, dan lain-lain). label adalah teks penjelas untuk input.`,
    [
      {
        t: 'Isian dan tombol',
        h: '<label>Nama kamu:\n  <input type="text" placeholder="Ketik di sini">\n</label>\n<br><br>\n<button>Kirim</button>',
      },
    ],
  ),
  mk(
    'w-div',
    'HTML',
    'div, span, class, dan id',
    'Pembungkus dan nama elemen',
    'div,span,class,id,atribut,pembungkus,container',
    `div adalah kotak pembungkus (satu baris penuh), span pembungkus kecil di dalam teks. Supaya CSS dan JavaScript bisa menemukan elemen tertentu, kasih nama lewat class (boleh dipakai banyak elemen) atau id (unik, satu elemen saja).`,
    [
      {
        t: 'Class dan id',
        h: '<div class="kartu" id="utama">\n  <p>Aku <span class="penting">penting</span>.</p>\n</div>',
        c: '.kartu {\n  border: 2px solid #2347e8;\n  padding: 8px;\n}\n.penting {\n  background: gold;\n}',
      },
    ],
  ),
  mk(
    'w-tabel',
    'HTML',
    'Tabel',
    'table, tr, th, td',
    'tabel,table,tr,td,th,baris,kolom',
    `Tabel dibuat dari table. Tiap baris pakai tr, sel judul pakai th, sel biasa pakai td.`,
    [
      {
        t: 'Tabel sederhana',
        h: '<table border="1">\n  <tr><th>Nama</th><th>Umur</th></tr>\n  <tr><td>Sari</td><td>17</td></tr>\n  <tr><td>Budi</td><td>18</td></tr>\n</table>',
      },
    ],
  ),
  mk(
    'w-semantik',
    'HTML',
    'Semantic HTML',
    'header, nav, main, section, footer',
    'semantik,semantic,header,nav,main,section,footer,article,aside,struktur,layout,aksesibilitas,seo',
    `HTML semantik pakai tag yang menjelaskan isinya, bukan cuma kelihatan bagus. header buat bagian atas halaman, nav buat menu navigasi, main buat isi utama, section buat pengelompokan konten, footer buat bagian bawah. Browser, mesin pencari, dan pembaca layar jadi lebih paham bagian-bagian halaman.`,
    [
      {
        t: 'Kerangka halaman',
        n: 'Bagian-bagian halaman pakai tag-nya masing-masing, bukan div semua.',
        h: `<header>
  <h1>Situsku</h1>
  <nav>
    <a href="#">Beranda</a>
    <a href="#">Artikel</a>
    <a href="#">Kontak</a>
  </nav>
</header>

<main>
  <section>
    <h2>Artikel terbaru</h2>
    <p>Bagian ini isinya konten utama halaman.</p>
  </section>
  <section>
    <h2>Kontak</h2>
    <p>Bagian ini isinya informasi kontak.</p>
  </section>
</main>

<footer>
  <p>Dibuat dengan SICODER</p>
</footer>`,
      },
      {
        t: 'article dan aside',
        n: 'article untuk konten yang berdiri sendiri, aside untuk konten sampingan seperti sidebar.',
        h: `<article>
  <h2>Belajar HTML semantik</h2>
  <p>Artikel ini berdiri sendiri, bukan bagian dari artikel lain.</p>
</article>

<aside>
  <h3>Baca juga</h3>
  <ul>
    <li>Belajar CSS</li>
    <li>Belajar JavaScript</li>
  </ul>
</aside>`,
      },
    ],
    'Pakai tag semantik buat kerangka halaman. Kalau cuma mau bikin kotak, div masih aman.',
  ),
  mk(
    'w-atribut',
    'HTML',
    'Atribut HTML',
    'nilai tambahan di dalam tag',
    'atribut,attribute,href,src,alt,target,type,id,class,title,lang,value,required,disabled,rel,button,div',
    `Atribut adalah informasi tambahan yang ditulis di dalam tag pembuka, formatnya nama="nilai". Tiap tag punya atribut sendiri: link pakai href buat alamat tujuan, gambar pakai src buat lokasi file dan alt buat deskripsi, tombol pakai type buat menentukan perilakunya. Ada juga atribut global yang bisa dipakai di tag mana saja, dan atribut boolean yang cukup ditulis namanya saja tanpa tanda sama dengan.`,
    [
      {
        t: 'Atribut pada link dan gambar',
        n: 'Atribut ditulis di dalam tag pembuka, setelah nama tag.',
        h: `<a href="https://example.com" target="_blank" rel="noopener">Buka example.com</a>

<img
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' fill='%232347e8'/%3E%3C/svg%3E"
  alt="Kotak biru"
  width="120"
  height="60"
>`,
      },
      {
        t: 'Atribut global dan atribut boolean',
        n: 'required dan disabled cukup ditulis namanya, tanpa tanda sama dengan.',
        h: `<div id="kartu" class="kotak" title="Kotak contoh" lang="id" data-label="demo">
  <p>Kotak ini punya id, class, title, lang, dan data-label.</p>
</div>

<form>
  <input type="text" placeholder="Nama" required>
  <input type="text" value="Tidak bisa diedit" disabled>
  <button type="submit">Kirim</button>
</form>`,
      },
    ],
    'alt di img itu bukan opsional. Kalau gambar gagal dimuat, alt yang menjelaskan isi gambarnya.',
  ),
  mk(
    'w-form-input',
    'HTML',
    'Form dan Input',
    'form, input, textarea, select',
    'form,input,textarea,select,option,label,name,required,value,placeholder,email,password,number,date,checkbox,radio,type,button',
    `Semua isian dikumpulkan di dalam satu tag form. input untuk isian satu baris, textarea buat teks panjang, select buat memilih dari daftar pilihan (satuannya option). Tiap isian butuh name supaya jelas data mana yang dikirim, dan label buat ngasih tahu ke orang yang isi form isian itu buat apa.`,
    [
      {
        t: 'Form lengkap',
        h: `<form>
  <label for="nama">Nama</label>
  <input id="nama" name="nama" type="text" placeholder="Nama lengkap">

  <label for="pesan">Pesan</label>
  <textarea id="pesan" name="pesan" rows="3" placeholder="Tulis pesanmu"></textarea>

  <label for="jurusan">Jurusan</label>
  <select id="jurusan" name="jurusan">
    <option>IPA</option>
    <option>IPS</option>
    <option>Bahasa</option>
  </select>

  <button type="submit">Kirim</button>
</form>`,
      },
      {
        t: 'Macam-macam tipe input',
        n: 'Tipe input mengatur tampilan dan cara isian itu diperiksa.',
        h: `<p>
  <input type="text" placeholder="teks">
  <input type="email" placeholder="email">
  <input type="password" placeholder="password">
  <input type="number" placeholder="angka">
  <input type="date">
</p>

<p>
  <label><input type="checkbox" checked> Setuju</label>
  <label><input type="radio" name="pilihan" value="a"> Pilihan A</label>
  <label><input type="radio" name="pilihan" value="b"> Pilihan B</label>
</p>`,
      },
    ],
    'Pakai label untuk setiap input. Selain menulis lebih jelas, klik teksnya langsung memcursor ke isian.',
  ),
  mk(
    'w-button-submit',
    'HTML',
    'Button dan Form Submission',
    'jenis tombol dan cara menangkap submit',
    'button,submit,reset,type,form,action,method,event,addeventlistener,preventdefault,input,formdata',
    `button punya beberapa type. Yang paling sering dipakai type="submit" buat mengirim form, type="reset" buat mengembalikan isian ke awal, dan type="button" buat tombol biasa yang nggak ngirim apa-apa. Tombol yang nggak di dalam form nggak akan ngirim form, walau type-nya submit. Biar bisa ngolah datanya sendiri, tangkap event submit pakai addEventListener.`,
    [
      {
        t: 'Tiga jenis tombol',
        n: 'type="submit" mengirim form, type="reset" mengembalikan isian awal, type="button" tidak melakukan apa-apa.',
        h: `<form id="form-demo">
  <input type="text" name="nama" value="Sari">
  <button type="submit">Kirim</button>
  <button type="reset">Reset</button>
  <button type="button">Biasanya</button>
</form>`,
      },
      {
        t: 'Menangkap event submit',
        n: 'addEventListener("submit", ...) dipanggil tepat saat form mau dikirim, sebelum halamannya berubah.',
        h: `<form id="form">
  <input type="text" name="nama" placeholder="Ketik nama">
  <button type="submit">Kirim</button>
</form>
<p id="hasil">Belum ada hasil.</p>`,
        j: `const form = document.getElementById("form");
const hasil = document.getElementById("hasil");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = form.elements.nama.value;
  hasil.textContent = "Halo, " + nama + "! Form kamu tertangkap.";
  console.log("Data:", Object.fromEntries(new FormData(form)));
});`,
      },
    ],
    'type="button" buat tombol yang cuma pemicu JavaScript. Kalau dibiarkan submit, form-nya keburu terkirim.',
  ),
  mk(
    'w-audio-video',
    'HTML',
    'Audio dan Video',
    'audio, video, controls',
    'audio,video,controls,source,autoplay,loop,muted,preload,type,width',
    `audio buat memutar suara, video buat memutar video. Setelahnya dikasih atribut controls biar muncul tombol play, pause, sama pengatur volume. Kalau formatnya bisa lebih dari satu, taruh beberapa tag source di dalam: browser otomatis pilih yang cocok.`,
    [
      {
        t: 'Pemutar audio',
        n: 'Atribut controls memunculkan tombol play, pause, dan pengatur volume.',
        h: `<audio controls src="/media/contoh-audio.wav">
  Browser kamu belum mendukung pemutar audio.
</audio>`,
      },
      {
        t: 'Pemutar video dengan beberapa format',
        n: 'Tag source dipakai supaya browser bisa pilih format yang didukung.',
        h: `<video controls width="320">
  <source src="/media/contoh-video.webm" type="video/webm">
  <source src="/media/contoh-video.mp4" type="video/mp4">
  Browser kamu belum mendukung pemutar video.
</video>`,
      },
    ],
    'Taruh video atau audio di server sendiri supaya file-nya nggak hilang.',
  ),

  // ---------- CSS ----------
  mk(
    'w-selector',
    'CSS',
    'Selector: memilih elemen',
    'Tag, class (.), dan id (#)',
    'css,selector,class,id,titik,pagar,memilih,target',
    `CSS bekerja dengan dua bagian: selector (siapa yang dipilih) dan isi di dalam kurung kurawal (apa yang diubah). Pilih berdasarkan nama tag (p), class (.nama), atau id (#nama).`,
    [
      {
        t: 'Tiga cara memilih',
        h: '<p>Paragraf biasa</p>\n<p class="biru">Paragraf biru</p>\n<p id="spesial">Paragraf spesial</p>',
        c: 'p {\n  font-size: 20px;\n}\n.biru {\n  color: royalblue;\n}\n#spesial {\n  background: gold;\n}',
      },
    ],
  ),
  mk(
    'w-warna',
    'CSS',
    'Warna dan background',
    'color dan background',
    'warna,color,background,hex,rgb,latar,teks',
    `color mengubah warna teks, background mengubah warna latar. Warna bisa ditulis pakai nama (red), kode hex (#2347e8), atau rgb(35, 71, 232).`,
    [
      {
        t: 'Warna teks dan latar',
        h: '<h1>Warna-warni</h1>\n<p>Teks ini ikut berubah.</p>',
        c: 'h1 {\n  color: #2347e8;\n}\np {\n  color: white;\n  background: tomato;\n}',
      },
    ],
  ),
  mk(
    'w-font',
    'CSS',
    'Font dan teks',
    'font-size, font-weight, text-align',
    'font,ukuran huruf,font-size,font-weight,tebal,text-align,rata,tengah,line-height,huruf',
    `font-size mengatur ukuran huruf, font-weight ketebalan, font-family jenis huruf, text-align posisi teks (left, center, right), dan line-height jarak antar baris.`,
    [
      {
        t: 'Mengatur teks',
        h: '<h1>Judul</h1>\n<p>Paragraf ini punya jarak antar baris yang lebih lega supaya enak dibaca. Coba ubah angka line-height.</p>',
        c: 'h1 {\n  font-size: 40px;\n  text-align: center;\n}\np {\n  font-size: 18px;\n  line-height: 1.8;\n  font-weight: 500;\n}',
      },
    ],
  ),
  mk(
    'w-unit',
    'CSS Dasar',
    'Satuan CSS (units)',
    'px, %, rem, em, vh, vw',
    'unit,satuan,px,piksel,persen,rem,em,vh,vw,viewport,ukuran,length,relative,relatif',
    `Setiap ukuran di CSS perlu satuan: px (piksel, ukuran tetap), % (persen dari induknya), rem (relatif ke ukuran huruf elemen paling atas, yaitu html), em (relatif ke ukuran huruf elemen induknya sendiri), vh dan vw (persen dari tinggi dan lebar area tampilan). Kalau lupa menulis satuan, aturan itu diabaikan.`,
    [
      {
        t: 'px, persen, dan rem',
        n: 'rem ikut ukuran huruf html, jadi 2rem = dua kali ukuran huruf bawaan browser.',
        h: '<div class="a">Lebar 200px</div>\n<div class="b">Lebar 50%</div>\n<p class="c">Teks dengan font-size 2rem</p>',
        c: '.a {\n  width: 200px;\n  background: lightblue;\n  padding: 8px;\n}\n.b {\n  width: 50%;\n  background: lightgreen;\n  padding: 8px;\n}\n.c {\n  font-size: 2rem;\n}',
      },
      {
        t: 'em, vh, dan vw',
        n: 'vh dan vw mengikuti ukuran area preview, bukan ukuran monitor. Coba di editor utama lalu perkecil jendela.',
        h: '<div class="induk">Teks induk 20px <span class="anak">anak pakai em</span></div>\n<div class="layar">tinggi 40vh</div>',
        c: '.induk {\n  font-size: 20px;\n}\n.anak {\n  font-size: 1.5em;\n}\n.layar {\n  height: 40vh;\n  background: gold;\n  padding: 8px;\n}',
      },
    ],
    'Pakai px untuk yang harus pas (tebal garis, ukuran ikon). Pakai rem atau % untuk yang ikut menyesuaikan tampilan.',
  ),
  mk(
    'w-specificity',
    'CSS Dasar',
    'Specificity: siapa yang menang',
    'Aturan CSS yang bertabrakan',
    'specificity,spesifikitas,prioritas,menang,tabrak,bentrok,urutan,important,inline,cascade,id,class',
    `Semua aturan CSS yang cocok dengan sebuah elemen tetap dikumpulkan, lalu browser memilih satu yang menang. Urutannya dari yang paling kuat: inline style (style="..." di dalam tag HTML), id (#nama), class (.nama), nama tag (p), lalu universal (*). Kalau tingkatnya sama, aturan yang ditulis belakangan yang menang.`,
    [
      {
        t: 'Tiga tingkat aturan',
        n: 'Hanya aturan dengan id yang benar-benar dipakai. Kelas kalah dari id, dan tag kalah dari kelas.',
        h: '<p class="teks" id="tunggal">Teks ini punya tiga aturan yang bertabrakan.</p>',
        c: 'p {\n  color: gray;\n}\n.teks {\n  color: teal;\n}\n#tunggal {\n  color: tomato;\n}',
      },
      {
        t: 'Tingkat sama, yang terakhir menang',
        n: 'Dua aturan dengan class yang sama: urutan penulisan yang menentukan.',
        h: '<p class="gaya">Warnaku datang dari aturan terakhir.</p>',
        c: '.gaya {\n  color: teal;\n}\n.gaya {\n  color: tomato;\n}',
      },
    ],
    '!important memaksa sebuah aturan menang apa pun saingannya. Simpan untuk keadaan mendesak saja, karena susah dibalik.',
  ),
  mk(
    'w-css-variabel',
    'CSS Dasar',
    'CSS Variables',
    'Menyimpan nilai dengan --nama lalu dipakai dengan var()',
    'variabel,variable,custom property,--primary-color,var(),warna,reuse,pakai ulang,nilai',
    `CSS Variables dipakai untuk menyimpan satu nilai lalu memakainya di banyak tempat. Namanya diawali dua tanda strip (--) dan ditulis di dalam selector :root, lalu dipakai lewat var(). Karena disimpan di satu tempat, mengubah warnanya cukup di satu baris dan semua pemakaian ikut berubah.`,
    [
      {
        t: 'Satu warna untuk semua',
        n: 'Ganti nilai --warna-utama di baris :root, semua tombol dan teks ikut berubah.',
        h: '<button class="tombol">Tombol utama</button>\n<p class="teks">Teks yang warnanya sama dengan tombol.</p>\n<div class="kotak">Kotak dengan warna latar sama.</div>',
        c: ':root {\n  --warna-utama: #2347e8;\n}\n.tombol {\n  background: var(--warna-utama);\n  color: white;\n  border: 0;\n  padding: 10px 18px;\n  border-radius: 8px;\n}\n.teks {\n  color: var(--warna-utama);\n}\n.kotak {\n  background: var(--warna-utama);\n  color: white;\n  padding: 12px;\n  margin-top: 10px;\n}',
      },
      {
        t: 'Variabel dengan nilai cadangan',
        n: 'Kalau --warna-utama belum ada, var() memakai nilai setelah koma.',
        h: '<p class="cadangan">Warna ini punya nilai cadangan.</p>',
        c: '.cadangan {\n  color: var(--warna-utama, tomato);\n}',
      },
    ],
    'Variabel juga bisa dipakai untuk hal lain: {{--jarak: 12px}} lalu dipakai di banyak property {{padding}} dan {{margin}}.',
  ),
  mk(
    'w-padding',
    'CSS',
    'Padding (jarak di dalam)',
    'Ruang antara isi dan tepi kotak',
    'padding,spasi dalam,jarak dalam,ruang,box model,kotak,isi',
    `Padding itu jarak di DALAM kotak, antara isi (teks) dan tepi kotak. Makin besar padding, makin lega isinya. Warna background ikut melebar sampai area padding, jadi gampang dilihat.`,
    [
      {
        t: 'Tanpa dan dengan padding',
        n: 'Coba ganti angka 24px dan lihat kotak biru melebar.',
        h: '<p class="a">Tanpa padding</p>\n<p class="b">Dengan padding</p>',
        c: 'p {\n  background: lightblue;\n}\n.b {\n  padding: 24px;\n}',
      },
      {
        t: 'Padding beda tiap sisi',
        n: 'Dua nilai: atas-bawah lalu kiri-kanan. Empat nilai: atas, kanan, bawah, kiri (searah jarum jam).',
        h: '<p class="a">padding: 10px 40px</p>\n<p class="b">padding: 5px 10px 20px 40px</p>',
        c: 'p {\n  background: lightgreen;\n}\n.a {\n  padding: 10px 40px;\n}\n.b {\n  padding: 5px 10px 20px 40px;\n}',
      },
    ],
    'Cara ingat: padding = jarak di DALAM kotak, margin = jarak di LUAR kotak.',
  ),
  mk(
    'w-margin',
    'CSS',
    'Margin (jarak di luar)',
    'Ruang antara satu kotak dan kotak lain',
    'margin,jarak luar,spasi luar,auto,tengah,center,kotak',
    `Margin itu jarak di LUAR kotak, yang memisahkan satu kotak dari kotak lain. Margin tidak ikut berwarna background. Trik populer: margin: 0 auto membuat kotak yang punya lebar tetap berada di tengah.`,
    [
      {
        t: 'Jarak antar kotak',
        h: '<div class="kotak">Kotak 1</div>\n<div class="kotak">Kotak 2</div>',
        c: '.kotak {\n  background: lightcoral;\n  padding: 12px;\n  margin: 24px;\n}',
      },
      {
        t: 'Kotak di tengah',
        h: '<div class="tengah">Aku di tengah</div>',
        c: '.tengah {\n  width: 200px;\n  background: gold;\n  padding: 12px;\n  margin: 0 auto;\n  text-align: center;\n}',
      },
    ],
  ),
  mk(
    'w-border',
    'CSS',
    'Border dan sudut membulat',
    'border dan border-radius',
    'border,garis tepi,radius,melengkung,membulat,bulat,outline',
    `border membuat garis di tepi kotak: tebal, jenis garis, lalu warna. border-radius membuat sudutnya membulat. Kalau nilainya 50% pada kotak persegi, hasilnya lingkaran.`,
    [
      {
        t: 'Garis dan sudut bulat',
        h: '<div class="kartu">Kartu</div>\n<div class="lingkaran"></div>',
        c: '.kartu {\n  border: 3px solid #2347e8;\n  border-radius: 12px;\n  padding: 16px;\n}\n.lingkaran {\n  width: 80px;\n  height: 80px;\n  margin-top: 12px;\n  background: tomato;\n  border-radius: 50%;\n}',
      },
    ],
  ),
  mk(
    'w-size',
    'CSS',
    'Lebar dan tinggi',
    'width, height, max-width',
    'width,height,lebar,tinggi,ukuran,max-width,persen,px',
    `width mengatur lebar dan height tinggi. Satuannya bisa px (piksel tetap) atau % (persen dari pembungkusnya). max-width berguna supaya kotak tidak lebih lebar dari batas tertentu.`,
    [
      {
        t: 'Atur ukuran',
        h: '<div class="a">200px x 80px</div>\n<div class="b">50% lebar</div>',
        c: 'div {\n  background: lightblue;\n  margin-bottom: 8px;\n}\n.a {\n  width: 200px;\n  height: 80px;\n}\n.b {\n  width: 50%;\n}',
      },
    ],
  ),
  mk(
    'w-overflow',
    'Kotak (Box Model)',
    'Overflow: isi yang meluber',
    'overflow, hidden, auto, scroll',
    'overflow,hidden,auto,scroll,visible,meluber,klip,gulir,scrollbar,potong',
    `Kalau isi lebih besar dari kotaknya, isi itu bisa meluber keluar. Ada empat cara mengatur overflow: visible (bawaan, isi boleh keluar), hidden (dipotong, tidak ada scrollbar), auto (scrollbar muncul kalau memang perlu), dan scroll (scrollbar selalu ada). overflow-x dan overflow-y bisa diatur terpisah.`,
    [
      {
        t: 'Tiga cara menangani luapan',
        n: 'Kotak pertama dipotong, kotak kedua bisa digulir.',
        h: '<div class="a">Isi yang panjang sekali supaya keluar dari kotaknya dan buktiin apa yang terjadi.</div>\n<div class="b">Isi yang panjang sekali supaya keluar dari kotaknya dan buktiin apa yang terjadi.</div>',
        c: '.a,\n.b {\n  height: 60px;\n  background: lightblue;\n  margin-bottom: 8px;\n}\n.a {\n  overflow: hidden;\n}\n.b {\n  overflow: auto;\n}',
      },
      {
        t: 'Gulir mendatar',
        n: 'Kotak lebarnya dibatasi, isinya melebihi itu lalu digulir ke samping.',
        h: '<div class="lebar">Kotak ini lebarnya cuma 200px tapi isinya panjang sekali sehingga harus digulir ke samping.</div>',
        c: '.lebar {\n  width: 200px;\n  overflow-x: auto;\n  white-space: nowrap;\n  background: lightgreen;\n  padding: 8px;\n}',
      },
    ],
    'Overflow: hidden sering dipakai bareng border-radius supaya isi tidak keluar dari sudut yang membulat.',
  ),
  mk(
    'w-display',
    'CSS',
    'Display: block, inline, none',
    'Cara elemen menempati ruang',
    'display,block,inline,inline-block,none,sembunyi,hilang',
    `display menentukan perilaku elemen. block menempati satu baris penuh (contoh: div, p). inline cuma selebar isinya dan sejajar dengan teks (contoh: span). none menyembunyikan elemen sepenuhnya.`,
    [
      {
        t: 'Block, inline, none',
        h: '<span class="x">Satu</span>\n<span class="x">Dua</span>\n<span class="x blok">Tiga (block)</span>\n<span class="x hilang">Empat (hilang)</span>',
        c: '.x {\n  background: gold;\n  padding: 4px;\n}\n.blok {\n  display: block;\n}\n.hilang {\n  display: none;\n}',
      },
    ],
  ),
  mk(
    'w-flex',
    'CSS',
    'Flexbox: menyusun sejajar',
    'display flex, justify-content, align-items, gap',
    'flex,flexbox,sejajar,tengah,center,justify-content,align-items,gap,susun,baris,kolom',
    `Flexbox memudahkan menyusun elemen. Beri display: flex pada pembungkusnya, maka anak-anaknya berjajar. justify-content mengatur arah mendatar, align-items mengatur arah menurun, gap memberi jarak antar item.`,
    [
      {
        t: 'Berjajar dengan jarak',
        h: '<div class="baris">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n</div>',
        c: '.baris {\n  display: flex;\n  gap: 12px;\n}\n.baris div {\n  background: lightblue;\n  padding: 16px;\n}',
      },
      {
        t: 'Taruh di tengah',
        n: 'Ini cara paling gampang membuat sesuatu pas di tengah.',
        h: '<div class="box"><div class="isi">Tengah!</div></div>',
        c: '.box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 140px;\n  background: #eee;\n}\n.isi {\n  background: tomato;\n  color: white;\n  padding: 12px 20px;\n}',
      },
    ],
  ),
  mk(
    'w-flex-lanjut',
    'Layout',
    'Flexbox lanjutan',
    'flex-direction, flex-wrap, flex',
    'flex,flexbox,lanjutan,direction,wrap,grow,shrink,basis,column,row,reverse,menyebar,memperkecil',
    `Topik Flexbox dasar memakai display: flex, justify-content, dan align-items. Sekarang kita atur arah dan ukuran itemnya. flex-direction menentukan arah aliran (row mendatar, column menurun, dan versi reverse-nya). flex-wrap menentukan apakah item boleh turun ke baris berikutnya saat tidak cukup ruang. Property flex dipakai sekaligus untuk mengatur grow (tumbuh), shrink (menyusut), dan basis (ukuran dasar).`,
    [
      {
        t: 'Arah dan pembungkusan',
        n: 'flex-wrap: wrap membuat item turun ke baris baru, bukan meluber keluar kotak.',
        h: '<div class="bungkus">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n</div>',
        c: '.bungkus {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  background: #eee;\n  padding: 8px;\n}\n.item {\n  flex: 1 1 120px;\n  background: lightblue;\n  padding: 16px;\n  text-align: center;\n}',
      },
      {
        t: 'Menyusun ke bawah',
        n: 'Ganti flex-direction jadi column, itemnya jadi berurutan ke bawah.',
        h: '<div class="tumpuk">\n  <div class="kotak">Kiri</div>\n  <div class="kotak">Kanan</div>\n</div>',
        c: '.tumpuk {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.kotak {\n  background: lightgreen;\n  padding: 16px;\n}',
      },
    ],
    'flex: 1 artinya grow 1, shrink 1, basis 0. Semua item dengan flex: 1 membagi ruang sama rata.',
  ),
  mk(
    'w-grid',
    'Layout',
    'CSS Grid',
    'grid-template-columns, gap, fr',
    'grid,css grid,grid-template-columns,gap,fr,kolom,baris,template,area,grid-template-rows',
    `Grid dipakai untuk menyusun elemen dalam baris dan kolom sekaligus. Beri display: grid pada pembungkusnya, lalu tentukan kolomnya dengan grid-template-columns. Satuan fr (fraction) membagi ruang yang tersisa secara proporsional: 1fr 2fr berarti kolom pertama seperempat dan kolom kedua setengah dari ruang yang ada. gap mengatur jarak antar sel.`,
    [
      {
        t: 'Grid tiga kolom',
        n: 'Ubah 1fr 1fr 1fr jadi 2fr 1fr 1fr untuk melihat perbedaannya.',
        h: '<div class="grid">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n  <div>4</div>\n  <div>5</div>\n  <div>6</div>\n</div>',
        c: '.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 8px;\n}\n.grid div {\n  background: lightblue;\n  padding: 20px;\n  text-align: center;\n}',
      },
      {
        t: 'Lebar kolom tidak sama',
        n: 'Kolom pertama diberi 2fr, jadi lebarnya dua kali kolom lain.',
        h: '<div class="grid2">\n  <div>Lebar</div>\n  <div>Kecil</div>\n</div>',
        c: '.grid2 {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 8px;\n}\n.grid2 div {\n  background: lightgreen;\n  padding: 16px;\n}',
      },
    ],
    'Butuh jumlah kolom banyak? Tulis {{repeat(3, 1fr)}} sebagai gantinya menulis {{1fr 1fr 1fr}}.',
  ),
  mk(
    'w-position',
    'CSS',
    'Position',
    'relative dan absolute',
    'position,relative,absolute,posisi,top,left,right,bottom,tumpuk',
    `position mengatur cara elemen diposisikan. relative berarti elemen tetap di tempatnya, tapi jadi patokan. absolute berarti elemen dilepas dari alur dan ditaruh pakai top, left, right, bottom relatif terhadap patokan terdekat.`,
    [
      {
        t: 'Lencana di pojok',
        h: '<div class="kartu">\n  Kartu\n  <span class="lencana">Baru</span>\n</div>',
        c: '.kartu {\n  position: relative;\n  width: 160px;\n  padding: 30px 16px;\n  background: lightblue;\n}\n.lencana {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n  background: tomato;\n  color: white;\n  font-size: 12px;\n  padding: 2px 6px;\n}',
      },
    ],
  ),
  mk(
    'w-responsive',
    'Layout',
    'Responsive: menyesuaikan layar',
    'Media queries dan breakpoint',
    'responsive,responsif,media query,media,breakpoint,layar,mobile,desktop,tablet,max-width,min-width,query',
    `Media query (@media) dipakai untuk menulis aturan CSS yang hanya berlaku pada kondisi tertentu, biasanya ukuran layar. Bentuknya: @media (max-width: 600px) lalu di dalam kurung kurawal ditulis aturan yang hanya berlaku kalau layar selebar 600px atau kurang. Titik ukuran yang dipakai untuk menentukan tata letak disebut breakpoint.`,
    [
      {
        t: 'Beralih dari satu kolom ke dua',
        n: 'Di preview materi lebarnya sempit, jadi aturan max-width ikut berlaku. Coba di editor utama lalu perkecil jendela browsermu.',
        h: '<div class="wrap">\n  <div class="kolom">Kiri</div>\n  <div class="kolom">Kanan</div>\n</div>',
        c: '.wrap {\n  display: flex;\n  gap: 12px;\n}\n.kolom {\n  flex: 1;\n  background: lightblue;\n  padding: 16px;\n}\n@media (max-width: 600px) {\n  .wrap {\n    flex-direction: column;\n  }\n}',
      },
      {
        t: 'Ubah ukuran huruf sesuai layar',
        n: 'min-width berlaku saat layar lebar, max-width saat layar sempit.',
        h: '<p class="teks">Teks ini ukurannya menyesuaikan layar.</p>',
        c: '.teks {\n  font-size: 14px;\n}\n@media (min-width: 700px) {\n  .teks {\n    font-size: 28px;\n  }\n}',
      },
    ],
    'Praktik umum: tulis gaya dasar dulu untuk semua layar, lalu tambahkan @media (min-width: ...) untuk layar besar.',
  ),
  mk(
    'w-hover',
    'CSS',
    'Hover dan transition',
    'Efek saat kursor di atas elemen',
    'hover,transition,animasi,efek,transform,kursor,halus',
    `:hover dipakai untuk gaya yang aktif saat kursor ada di atas elemen. Tambahkan transition supaya perubahannya halus, bukan loncat. transform dipakai untuk menggeser, memutar, atau membesarkan elemen.`,
    [
      {
        t: 'Tombol yang bereaksi',
        n: 'Arahkan kursor ke tombol.',
        h: '<button class="tombol">Sentuh aku</button>',
        c: '.tombol {\n  background: #2347e8;\n  color: white;\n  border: 0;\n  padding: 12px 20px;\n  border-radius: 8px;\n  transition: transform 0.2s;\n}\n.tombol:hover {\n  background: tomato;\n  transform: scale(1.1);\n}',
      },
    ],
  ),
  mk(
    'w-pseudo-class',
    'Efek dan Animasi',
    'Pseudo-class',
    ':hover, :focus, :active',
    'pseudo-class,pseudo,hover,focus,active,kursor,fokus,klik,state,keadaan',
    `Pseudo-class menggabungkan selector dengan tanda titik dua untuk kondisi tertentu: :hover saat kursor ada di atas elemen, :focus saat elemen mendapat fokus (klik atau tekan Tab), :active saat elemen sedang ditekan. Topik "Hover dan transition" sudah membahas :hover dan transform, di sini kita lengkapi dengan :focus dan :active.`,
    [
      {
        t: 'Tombol dengan beberapa kondisi',
        n: 'Arahkan kursor, lalu klik dan tahan tombolnya.',
        h: '<button class="tombol">Klik aku</button>\n<input class="isian" placeholder="Klik atau tekan Tab di sini">',
        c: '.tombol {\n  background: #2347e8;\n  color: white;\n  border: 0;\n  padding: 10px 18px;\n  border-radius: 8px;\n}\n.tombol:hover {\n  background: teal;\n}\n.tombol:active {\n  background: tomato;\n}\n.tombol:focus-visible {\n  outline: 3px solid gold;\n  outline-offset: 2px;\n}\n.isian {\n  display: block;\n  margin-top: 12px;\n  padding: 8px;\n}\n.isian:focus {\n  border: 2px solid #2347e8;\n  outline: none;\n}',
      },
      {
        t: 'Status elemen lain',
        n: ':first-child untuk elemen pertama, :disabled untuk yang tidak bisa dipakai.',
        h: '<ul class="daftar">\n  <li>Yang pertama</li>\n  <li>Yang kedua</li>\n</ul>\n<button class="mati" disabled>Tidak bisa diklik</button>',
        c: '.daftar li:first-child {\n  color: tomato;\n  font-weight: bold;\n}\n.mati:disabled {\n  background: #ddd;\n  color: #888;\n  border: 0;\n  padding: 8px 14px;\n}',
      },
    ],
    'Pseudo-element (dua tanda titik dua) berbeda: ::before dan ::after menyisipkan isi tiruan, misalnya untuk ikon.',
  ),

  // ---------- JavaScript ----------
  mk(
    'w-log',
    'JavaScript',
    'console.log',
    'Mengintip nilai di Console',
    'console,log,print,tampil,debug,cek,output',
    `console.log() menampilkan sesuatu di Console, tempat kamu mengintip isi variabel atau mengecek apakah kodemu jalan. Hasilnya tidak muncul di halaman, tapi di panel Console.`,
    [
      {
        t: 'Menulis ke Console',
        j: 'console.log("Halo dari JavaScript");\nconsole.log(2 + 3);\nconsole.log("Umur:", 17);',
      },
    ],
    'Kalau kodemu terasa tidak jalan, taruh console.log di beberapa tempat untuk melihat nilainya.',
  ),
  mk(
    'w-variabel',
    'JavaScript',
    'Variabel: let dan const',
    'Menyimpan nilai',
    'variabel,let,const,var,simpan,nilai,nama',
    `Variabel adalah wadah bernama untuk menyimpan nilai. Pakai const untuk nilai yang tidak akan diganti, dan let untuk nilai yang bisa berubah. Tanda = berarti simpan nilai di kanan ke nama di kiri.`,
    [
      {
        t: 'const dan let',
        j: 'const nama = "Sari";\nlet umur = 17;\n\numur = umur + 1; // ulang tahun!\n\nconsole.log(nama, "umurnya", umur);',
      },
    ],
  ),
  mk(
    'w-tipe',
    'JavaScript',
    'Tipe data dan operator',
    'String, number, boolean, dan hitung-hitungan',
    'tipe data,string,number,angka,boolean,operator,tambah,kurang,kali,bagi,typeof,teks,gabung',
    `Nilai punya jenis. String itu teks (pakai tanda kutip), number itu angka, boolean itu true atau false. Operator + - * / dipakai untuk menghitung. Kalau + dipakai pada teks, hasilnya menggabungkan teks.`,
    [
      {
        t: 'Jenis-jenis nilai',
        j: 'console.log(typeof "halo");   // string\nconsole.log(typeof 42);       // number\nconsole.log(typeof true);     // boolean',
      },
      {
        t: 'Hitung dan gabung',
        j: 'console.log(10 + 5);\nconsole.log(10 / 4);\nconsole.log("Hai " + "dunia");\nconsole.log("5" + 5);  // hasilnya teks, hati-hati!',
      },
    ],
  ),
  mk(
    'w-io',
    'JavaScript Dasar',
    'Input dan Output',
    'alert(), prompt(), confirm()',
    'io,input,output,alert,prompt,confirm,pesan,masukan,kotak isian,jawab',
    `alert() menampilkan pesan singkat di layar untuk memberi tahu hasil atau kesalahan. prompt() membuka kotak isian dan mengembalikan teks yang diketik pengguna, atau null kalau dibatalkan. confirm() menampilkan tombol Ya dan Tidak, lalu mengembalikan true atau false. Ketiganya enak dipakai di program kecil, tapi untuk tampilan yang lebih rapi hasilnya biasanya ditulis ke halaman.`,
    [
      {
        t: 'alert: menampilkan pesan',
        n: 'Klik tombolnya, lalu lihat pesan yang muncul di area preview.',
        h: '<button id="btn-alert">Tampilkan pesan</button>',
        j: `document.getElementById("btn-alert").addEventListener("click", () => {
  alert("Halo! Pesan ini muncul lewat alert().");
});`,
      },
      {
        t: 'prompt: meminta input',
        n: 'Klik tombolnya, lalu ketik sesuatu di kotak isian yang muncul.',
        h: '<button id="btn-prompt">Minta nama</button>\n<p id="hasil">Belum ada jawaban.</p>',
        j: `const tombol = document.getElementById("btn-prompt");
const hasil = document.getElementById("hasil");

tombol.addEventListener("click", () => {
  const nama = prompt("Siapa namamu?");

  if (nama === null) {
    hasil.textContent = "Kamu membatalkan input.";
  } else {
    hasil.textContent = "Halo, " + nama + "!";
  }
});`,
      },
      {
        t: 'confirm: pilihan Ya atau Tidak',
        h: '<button id="btn-confirm">Hapus file</button>\n<p id="status">Belum ada keputusan.</p>',
        j: `const tombol = document.getElementById("btn-confirm");
const status = document.getElementById("status");

tombol.addEventListener("click", () => {
  const setuju = confirm("Yakin mau hapus file?");

  if (setuju) {
    status.textContent = "File dihapus.";
  } else {
    status.textContent = "Batal, file tetap aman.";
  }
});`,
      },
    ],
    'prompt() mengembalikan null kalau kotak isiannya ditutup, jadi cek dulu sebelum memakainya.',
  ),
  mk(
    'w-banding',
    'Alur Program',
    'Operator Perbandingan',
    '===, !==, >, <, >=, <=',
    'perbandingan,banding,comparator,sama dengan,lebih besar,lebih kecil,boolean,operator',
    `Perbandingan membandingkan dua nilai dan hasilnya selalu boolean: true atau false. Operator yang paling sering dipakai: === untuk sama persis termasuk tipenya, !== untuk tidak sama persis, > untuk lebih besar, < untuk lebih kecil, >= untuk lebih besar atau sama, dan <= untuk lebih kecil atau sama. Kalau dibandingkan dengan tanda = biasa, hasilnya true, bukan angka 1 atau 0.`,
    [
      {
        t: 'Sama atau tidak sama',
        j: `console.log(5 === 5);   // true
console.log("5" === 5);  // false, tipe datanya beda
console.log("5" == 5);   // true, ini yang perlu diwaspadai`,
      },
      {
        t: 'Besar dan kecil',
        j: `const nilai = 78;

console.log(nilai > 70);   // true
console.log(nilai >= 85);  // false
console.log(nilai < 100);  // true
console.log(nilai <= 78);  // true
console.log(nilai != 78);  // false`,
      },
    ],
    'Selalu pakai === dan !==. Dua tanda sama dengan sering bikin bug yang susah dicari.',
  ),
  mk(
    'w-logika',
    'Alur Program',
    'Operator Logika',
    '&&, ||, dan !',
    'logika,logical,and,or,not,kondisi,boolean,gabungan',
    `Operator logika menggabungkan beberapa kondisi. && berarti dan, jadi kedua sisi harus benar. || berarti atau, jadi cukup satu sisi benar. ! berarti bukan, yaitu membalik nilai boolean. Hasilnya juga boolean, jadi true atau false.`,
    [
      {
        t: '&&: dua-duanya harus benar',
        j: `const umur = 20;
const punyaKtp = true;

if (umur >= 17 && punyaKtp) {
  console.log("Boleh masuk.");
} else {
  console.log("Belum boleh masuk.");
}`,
      },
      {
        t: '|| dan !',
        j: `const username = "";
const password = "rahasia123";

if (username || password) {
  console.log("Isi form dulu.");
} else {
  console.log("Form masih kosong.");
}

console.log(!username);   // true, username memang kosong
console.log(!(20 > 17));  // kebalikan dari hasil perbandingan`,
      },
    ],
    '&& dipakai buat menggabungkan dua syarat yang keduanya wajib terpenuhi.',
  ),
  mk(
    'w-if',
    'JavaScript',
    'if / else',
    'Mengambil keputusan',
    'if,else,kondisi,percabangan,keputusan,jika,sama dengan,lebih besar',
    `if menjalankan kode hanya kalau kondisinya benar. else dijalankan kalau tidak. Perbandingan yang sering dipakai: === (sama persis), !== (tidak sama), >, <, >=, <=.`,
    [
      {
        t: 'Cek nilai',
        j: 'const nilai = 78;\n\nif (nilai >= 85) {\n  console.log("A");\n} else if (nilai >= 70) {\n  console.log("B");\n} else {\n  console.log("Belajar lagi ya");\n}',
      },
    ],
  ),
  mk(
    'w-loop',
    'JavaScript',
    'Perulangan: for dan while',
    'Mengulang kode',
    'loop,for,perulangan,ulang,while,iterasi,of,break,continue',
    `Perulangan menjalankan kode berkali-kali. for klasik punya tiga bagian: awal, syarat lanjut, dan langkah. while mengulang selama kondisinya masih benar, dipakai saat banyaknya perulangan tidak diketahui dari awal. for...of lebih enak untuk menelusuri isi array. break menghentikan perulangan, continue melewati sisa badan perulangan lalu lanjut ke giliran berikutnya.`,
    [
      { t: 'for klasik', j: 'for (let i = 0; i < 5; i++) {\n  console.log("Putaran", i);\n}' },
      {
        t: 'for...of pada array',
        j: 'const buah = ["apel", "jeruk", "mangga"];\n\nfor (const b of buah) {\n  console.log(b.toUpperCase());\n}',
      },
      {
        t: 'while dan break',
        n: 'Jaga supaya variabel penghitungnya benar-benar berubah, kalau tidak while akan berjalan selamanya.',
        j: `let sisa = 3;

while (sisa > 0) {
  console.log("Sisa " + sisa);
  sisa = sisa - 1;

  if (sisa === 1) {
    break;
  }
}

console.log("Selesai");`,
      },
    ],
    'for untuk jumlah perulangan yang sudah jelas, while untuk yang bergantung pada kondisi.',
  ),
  mk(
    'w-error',
    'Alur Program',
    'Error Handling: try dan catch',
    'Menangani error agar program tidak berhenti',
    'error,handling,try,catch,finally,throw,exception,galat,kesalahan',
    `Kalau ada baris kode yang gagal, biasanya program langsung berhenti di situ. try dan catch dipakai untuk menangkap error itu supaya program tetap lanjut. Kode di dalam try dicoba, dan kalau gagal, error-nya ditangkap di catch. finally selalu dijalankan baikpun terjadi error atau tidak. Error juga bisa dibuat sendiri dengan throw.`,
    [
      {
        t: 'Menangkap error',
        j: `try {
  const data = JSON.parse("{ ini bukan JSON }");
  console.log(data);
} catch (error) {
  console.log("Gagal membaca data:", error.message);
}

console.log("Program tetap jalan.");`,
      },
      {
        t: 'finally dan throw',
        j: `function bagi(a, b) {
  if (b === 0) {
    throw new Error("Pembagian dengan nol tidak boleh");
  }
  return a / b;
}

try {
  console.log(bagi(10, 2));
  console.log(bagi(10, 0));
} catch (error) {
  console.log("Error tertangkap:", error.message);
} finally {
  console.log("Blok finally selalu jalan.");
}`,
      },
    ],
    'Error yang belum tertangkap akan muncul di panel Problems, lengkap dengan nomor barisnya.',
  ),
  // ---------- Python ----------
  mk(
    'w-fungsi',
    'JavaScript',
    'Fungsi: membuat dan memanggil',
    'Kode yang bisa dipakai berulang',
    'fungsi,function,panggil,memanggil,arrow,nama,resep',
    `Fungsi itu resep yang diberi nama. Kamu tulis sekali, lalu panggil kapan saja dengan menulis namanya dan tanda kurung. Topik terpisah membahas dua hal penting dari fungsi: parameter (topik "Parameter dan Argumen") dan return (topik "Return: mengembalikan nilai").`,
    [
      {
        t: 'Membuat dan memanggil',
        j: 'function sapa() {\n  console.log("Halo!");\n}\n\nsapa();\nsapa();\n\nconst kali = (a, b) => a * b;\nconsole.log(kali(3, 4));',
      },
      {
        t: 'Fungsi sebagai nilai',
        n: 'Fungsi juga bisa disimpan di variabel atau dikirim sebagai argumen.',
        j: `function sapa(nama) {
  return "Halo, " + nama + "!";
}

const pesan = sapa;   // fungsi disimpan di variabel
console.log(pesan("Sari"));`,
      },
    ],
    'Arrow function (a, b) => a * b adalah cara penulisan singkat untuk function dengan satu return.',
  ),
  mk(
    'w-parameter',
    'Fungsi dan Data',
    'Parameter dan Argumen',
    'Nilai yang diterima fungsi saat dipanggil',
    'parameter,argumen,argumen,default,nilai,wajib,fungsi,parameter wajib',
    `Parameter adalah nama variabel yang ditulis di dalam kurung kurung saat fungsi dibuat. Argumen adalah nilai yang kamu berikan saat fungsi itu dipanggil. Jumlah parameter dan argumen boleh beda: argumen yang kurang akan bernilai undefined, dan argumen yang lebih akan diabaikan. Parameter juga bisa punya nilai bawaan (default) yang dipakai kalau argumennya tidak diberikan.`,
    [
      {
        t: 'Parameter menerima argumen',
        j: `function sapa(nama, salam) {
  return salam + ", " + nama + "!";
}

console.log(sapa("Sari", "Halo"));  // "Halo, Sari!"
console.log(sapa("Budi"));          // "undefined, Budi!"`,
      },
      {
        t: 'Nilai bawaan (default parameter)',
        n: 'Kalau argumennya tidak diberikan, yang dipakai adalah nilai bawaannya.',
        j: `function greet(nama = "Teman") {
  return "Halo, " + nama + "!";
}

console.log(greet("Sari"));  // "Halo, Sari!"
console.log(greet());        // "Halo, Teman!"`,
      },
    ],
    'Beri nilai bawaan untuk parameter yang jarang diisi, supaya pemanggil tidak perlu mengingat urutan argumen.',
  ),
  mk(
    'w-return',
    'Fungsi dan Data',
    'Return: mengembalikan nilai',
    'Nilai yang dikirim balik dari fungsi',
    'return,mengembalikan,nilai balik,kirim balik,fungsi,hasil',
    `return dipakai di dalam fungsi untuk mengembalikan nilai ke tempat pemanggil. Begitu return dijalankan, baris kode di bawahnya di fungsi itu dilewati, dan nilai tersebut bisa langsung dipakai untuk perhitungan atau disimpan di variabel. Fungsi yang tidak punya return akan mengembalikan undefined.`,
    [
      {
        t: 'Mengembalikan nilai',
        j: `function luas(panjang, lebar) {
  return panjang * lebar;
}

const luasKamar = luas(4, 5);
console.log(luasKamar);          // 20
console.log("Luasnya " + luas(2, 3) + " meter persegi");`,
      },
      {
        t: 'Return menghentikan fungsi',
        n: 'Kode di bawah return tidak dijalankan.',
        j: `function cekUmur(umur) {
  if (umur < 0) {
    return "Umur tidak valid";
  }
  if (umur < 17) {
    return "Masih anak";
  }
  return "Dewasa";
}

console.log(cekUmur(-1));  // "Umur tidak valid"
console.log(cekUmur(15));  // "Masih anak"
console.log(cekUmur(20));  // "Dewasa"`,
      },
    ],
    'Satu fungsi idealnya punya satu jalur return. Kalau butuh beberapa, pisahkan fungsinya.',
  ),
  mk(
    'w-scope',
    'Fungsi dan Data',
    'Scope: cakupan variabel',
    'Global, lokal, dan scope blok',
    'scope,cakupan,global,lokal,local,blok,block,var,let,const,shadowing,akses',
    `Scope menentukan di mana sebuah variabel bisa dibaca. Variabel yang dibuat di luar fungsi punya scope global dan bisa diakses dari mana saja. Variabel yang dibuat di dalam fungsi punya scope lokal dan hanya hidup di fungsi itu. Karena itu, fungsi biasanya menulis variabel dengan let atau const di dalam dirinya sendiri, bukan var, supaya tidak menimpa variabel global.`,
    [
      {
        t: 'Global dan lokal',
        j: `let pengumuman = "Selamat datang";

function tampil() {
  const pesan = "Ini hanya di dalam fungsi";
  console.log(pengumuman);  // bisa diakses
  console.log(pesan);       // juga bisa diakses
}

tampil();
console.log(typeof pesan);  // "undefined", di luar fungsi`,
      },
      {
        t: 'Scope blok dengan let',
        n: 'let di dalam kurung kurawal if atau for hanya hidup di dalam blok itu.',
        j: `if (true) {
  let khusus = "hanya di dalam blok";
  console.log(khusus);
}

console.log(typeof khusus);  // "undefined", sudah di luar blok`,
      },
    ],
    'Kalau variabel dalam fungsi dan variabel global punya nama sama, yang di dalam fungsi yang menang.',
  ),
  mk(
    'w-array',
    'JavaScript',
    'Array: membuat dan mengakses',
    'Daftar nilai dalam kurung siku',
    'array,daftar,list,kurung siku,index,indeks,length,urutan,isi,elemen',
    `Array adalah daftar nilai dalam kurung siku. Nomor urutannya (index) mulai dari 0, jadi elemen pertama dibaca dengan tanda kurung siku dan angka 0. Panjang array dicek dengan length. Array juga bisa berisi nilai campuran, dan nilai di dalam array bisa diubah langsung lewat nomor urutnya.`,
    [
      {
        t: 'Membuat dan mengakses array',
        j: `const buah = ["apel", "jeruk", "mangga"];

console.log(buah[0]);     // "apel"
console.log(buah[2]);     // "mangga"
console.log(buah.length); // 3
console.log(buah[10]);    // undefined, nomor urutnya tidak ada`,
      },
      {
        t: 'Mengubah isi array',
        n: 'Nilai di dalam array bisa diganti lewat nomor urutnya.',
        j: `const angka = [10, 20, 30];

angka[1] = 25;
console.log(angka);   // [10, 25, 30]

const campuran = ["apel", 5, true, null];
console.log(campuran[2]);  // true`,
      },
    ],
    'Index dimulai dari 0, jadi elemen terakhir dari array sepanjang 5 ada di index 4.',
  ),
  mk(
    'w-array-lanjut',
    'Fungsi dan Data',
    'Array Methods',
    'push, pop, shift, unshift, slice, splice, find, forEach',
    'array methods,metode array,push,pop,shift,unshift,slice,splice,find,foreach,includes,join,reverse',
    `Array punya banyak method bawaan untuk mengolah isinya. push menambah item di belakang, pop mengambil lalu menghapus item terakhir, shift menghapus item pertama, unshift menyisipkan item di depan. slice mengambil potongan array tanpa mengubah aslinya, splice memotong array dan bisa menyisipkan item baru. find mencari satu item pertama yang cocok, forEach menjalankan fungsi untuk tiap item, dan join menggabungkan semua isi array jadi teks.`,
    [
      {
        t: 'Menambah dan menghapus item',
        j: `const buah = ["apel", "jeruk"];

buah.push("mangga");   // tambah di belakang
buah.unshift("anggur"); // tambah di depan

console.log(buah);      // ["anggur", "apel", "jeruk", "mangga"]
console.log(buah.pop()); // "mangga", lalu dihapus dari array
console.log(buah.shift()); // "anggur", lalu dihapus dari depan
console.log(buah);      // ["apel", "jeruk"]`,
      },
      {
        t: 'Mencari dan mengolah tiap item',
        j: `const angka = [3, 8, 12, 5, 20];

console.log(angka.find((n) => n > 10)); // 12
console.log(angka.includes(8));         // true

const kaliDua = angka.map((n) => n * 2);
console.log(kaliDua);`,
      },
    ],
    'map, filter, dan forEach selalu mengembalikan array baru, jadi array aslinya tidak berubah.',
  ),
  mk(
    'w-object',
    'Fungsi dan Data',
    'Object',
    'Key-value dan properti objek',
    'object,objek,kurung kurawal,key,nilai,properti,property,member,this',
    `Object menyimpan data berpasangan: kunci dan nilainya, ditulis di dalam kurung kurawal. Kalau array memakai nomor urut sebagai kunci, object memakai nama. Properti object bisa dibaca pakai titik (objek.nama) atau kurung siku (objek["nama"]). Nilai di dalam object bisa berupa teks, angka, array, atau object lain, dan object juga bisa punya method, yaitu fungsi yang disimpan sebagai propertinya.`,
    [
      {
        t: 'Membuat dan membaca object',
        j: `const siswa = {
  nama: "Sari",
  umur: 17,
  hobbi: ["baca", "coding"],
};

console.log(siswa.nama);        // "Sari"
console.log(siswa["umur"]);    // 17
console.log(siswa.hobbi[1]);   // "coding"`,
      },
      {
        t: 'Menambah, mengubah, dan method',
        j: `const siswa = {
  nama: "Sari",
  sapa() {
    return "Halo, " + this.nama + "!";
  },
};

siswa.kelas = "XI";        // menambah properti baru
siswa.nama = "Putri";      // mengubah nilai properti

console.log(siswa.kelas);
console.log(siswa.sapa());`,
      },
    ],
    'this di dalam method berarti object itu sendiri, jadi this.nama adalah nilai properti nama.',
  ),
  mk(
    'w-dom',
    'JavaScript',
    'DOM: perkenalan',
    'Cara JavaScript melihat halaman',
    'dom,document,element,elemen,halaman,node,struktur,pohon',
    `DOM adalah singkatan dari Document Object Model, yaitu cara JavaScript melihat isi halaman sebagai objek-objek yang bisa diubah. Setiap tag HTML di halaman dianggap satu elemen, dan elemen itu punya properti (teks, atribut, gaya) serta method. document adalah objek yang mewakili seluruh halaman, dan di bawahnya elemen-elemen halaman bisa dicari lalu diubah.`,
    [
      {
        t: 'Melihat isi halaman dari Console',
        n: 'Jalankan kodenya, lalu intip panel Console.',
        h: '<h1 id="judul">Judul halaman</h1>\n<p class="deskripsi">Teks deskripsi.</p>',
        j: 'console.log(document.title);\nconsole.log(document.querySelectorAll("p").length);\nconsole.log(document.body.innerText);',
      },
    ],
    'Topik berikutnya membahas cara mencari elemen dan cara mengubah teks, atribut, class, serta gayanya.',
  ),
  mk(
    'w-dom-select',
    'Interaksi Halaman',
    'DOM: memilih elemen',
    'getElementById, querySelector, querySelectorAll',
    'dom,getelementbyid,queryselector,queryselectorall,memilih,elemen,selector,class,id',
    `DOM memberi JavaScript cara menemukan elemen di halaman. document.getElementById("nama") mencari elemen berdasarkan id-nya, hasilnya satu elemen. document.querySelector("selector") juga mengembalikan satu elemen, yaitu yang pertama cocok, dan selector-nya bisa nama tag, class, atau id. document.querySelectorAll("selector") mengembalikan semua elemen yang cocok, dan hasilnya berupa array-like yang bisa dilalui pakai forEach.`,
    [
      {
        t: 'getElementById dan querySelector',
        h: '<p id="salam">Halo</p>\n<p class="catatan">Catatan pertama</p>\n<p class="catatan">Catatan kedua</p>',
        j: `const salam = document.getElementById("salam");
console.log(salam.textContent);

const catatan = document.querySelector(".catatan");
console.log(catatan.textContent);`,
      },
      {
        t: 'querySelectorAll untuk banyak elemen',
        h: '<ul id="daftar">\n  <li>Apel</li>\n  <li>Jeruk</li>\n  <li>Mangga</li>\n</ul>',
        j: `const semua = document.querySelectorAll("#daftar li");

console.log(semua.length); // 3

semua.forEach((item, i) => {
  console.log(i + ": " + item.textContent);
});`,
      },
    ],
    'Selector querySelectorAll memakai cara penulisan yang sama dengan CSS: tag, .class, atau #id.',
  ),
  mk(
    'w-dom-manipulasi',
    'Interaksi Halaman',
    'DOM: mengubah elemen',
    'Teks, atribut, class, dan style',
    'dom,textcontent,innerhtml,setattribute,getattribute,classlist,classname,style,mengubah,atribut',
    `Setelah elemen ketemu, isinya bisa diubah. textContent mengganti isi teks element dan selalu aman karena isinya diperlakukan sebagai teks biasa, sedangkan innerHTML bisa memasukkan HTML baru, jadi jangan dipakai kalau datanya berasal dari pengguna. Atribut diubah dengan setAttribute dan dibaca dengan getAttribute. Untuk class, pakai classList.add dan classList.remove, dan untuk gaya langsung tulis lewat properti style.`,
    [
      {
        t: 'Mengubah teks, atribut, dan class',
        h: '<h1 id="judul">Judul lama</h1>\n<a id="tautan" href="#" class="aktif">Klik</a>',
        j: `const judul = document.getElementById("judul");
judul.textContent = "Judul baru";

const tautan = document.getElementById("tautan");
tautan.setAttribute("href", "https://example.com");
tautan.setAttribute("target", "_blank");
tautan.classList.remove("aktif");
tautan.classList.add("dinonaktifkan");

console.log(tautan.getAttribute("href"));`,
      },
      {
        t: 'Mengubah style langsung',
        h: '<div id="kotak">Kotak ini</div>',
        j: `const kotak = document.getElementById("kotak");

kotak.style.backgroundColor = "lightblue";
kotak.style.padding = "16px";
kotak.style.borderRadius = "8px";`,
      },
    ],
    'Kotak yang dibuat JavaScript bisa dihapus dengan remove(), dan ditambahkan ke halaman dengan append().',
  ),
  mk(
    'w-event',
    'JavaScript',
    'Event: addEventListener dasar',
    'Bereaksi saat diklik',
    'event,click,klik,addeventlistener,tombol,interaktif,listener,menunggu,aksi',
    `addEventListener membuat elemen menunggu sebuah aksi, misalnya klik, lalu menjalankan fungsi saat aksi itu terjadi. Elemennya dituliskan, nama aksinya, lalu fungsi yang dijalankan saat aksi itu terjadi. Topik berikutnya membahas jenis event lainnya dan objek event.`,
    [
      {
        t: 'Penghitung klik',
        n: 'Klik tombolnya, lalu intip juga tab Console.',
        h: '<button id="btn">Klik aku</button>\n<p id="out">Belum diklik.</p>',
        j: 'const btn = document.getElementById("btn");\nconst out = document.getElementById("out");\nlet n = 0;\n\nbtn.addEventListener("click", () => {\n  n = n + 1;\n  out.textContent = "Diklik " + n + " kali";\n  console.log("klik ke-" + n);\n});',
      },
    ],
    'Satu elemen bisa punya beberapa listener, satu untuk tiap jenis event.',
  ),

  mk(
    'w-event-lanjut',
    'Interaksi Halaman',
    'Event: berbagai jenis dan event object',
    'input, change, keydown, submit, preventDefault',
    'event,addeventlistener,event object,preventdefault,keydown,input,change,submit,blur,target,currenttarget',
    `addEventListener bukan cuma untuk klik. Nama event bisa berupa input (setiap ketikan), change (nilai akhirnya berubah), keydown (tombol ditekan), submit (form dikirim), atau focus dan blur. Fungsi yang dibuat bisa menerima satu objek event, isinya antara lain event.target (elemen yang dikenai) dan event.preventDefault() untuk membatalkan perilaku bawaan, misalnya supaya halaman tidak berpindah saat form dikirim. Listener juga bisa dihapus dengan removeEventListener.`,
    [
      {
        t: 'Event input dan keydown',
        h: '<input id="nama" placeholder="Ketik nama">\n<p id="out">Belum diisi.</p>',
        j: `const nama = document.getElementById("nama");
const out = document.getElementById("out");

nama.addEventListener("input", () => {
  out.textContent = "Halo, " + nama.value + "!";
});

nama.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("Kamu menekan Enter");
  }
});`,
      },
      {
        t: 'preventDefault pada form',
        h: '<form id="form">\n  <input type="text" name="nama" placeholder="Nama">\n  <button type="submit">Kirim</button>\n</form>\n<p id="hasil">Belum ada.</p>',
        j: `const form = document.getElementById("form");
const hasil = document.getElementById("hasil");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = form.elements.nama.value;
  hasil.textContent = "Form tertangkap, nama: " + nama;
});`,
      },
    ],
    'Gunakan e.target.value buat mengambil isi input, dan e.preventDefault() buat menahan submit bawaan.',
  ),
  mk(
    'p-print',
    'Dasar Python',
    'print: menampilkan teks',
    'Cara paling dasar melihat hasil',
    'print,tampil,output,cetak,teks,hello,komentar',
    `print() menampilkan sesuatu ke terminal. Teks ditulis dalam tanda kutip. Baris yang diawali # adalah komentar, diabaikan Python dan dipakai untuk catatan.`,
    [
      {
        t: 'Hello, Python',
        p: '# ini komentar\nprint("Halo, dunia!")\nprint("Aku belajar Python")\nprint(2 + 3)',
      },
    ],
  ),
  mk(
    'p-variabel',
    'Dasar Python',
    'Variabel',
    'Nama yang menunjuk ke nilai',
    'variabel,nama,simpan,nilai,assign',
    `Variabel adalah nama yang menunjuk ke sebuah nilai. Tanda = berarti simpan nilai ini, bukan sama dengan seperti di matematika. Nilainya boleh diganti kapan saja.`,
    [
      {
        t: 'Menyimpan nilai',
        p: 'nama = "Udin"\numur = 10\n\nprint(nama)\nprint(umur)\nprint(nama, "berumur", umur, "tahun")\n\numur = umur + 1\nprint("Setahun lagi:", umur)',
      },
    ],
  ),
  mk(
    'p-tipe',
    'Dasar Python',
    'Tipe data dan operator',
    'int, float, str, bool dan hitungan',
    'tipe data,int,float,str,bool,angka,teks,operator,tambah,bagi,modulo,type,pangkat',
    `Nilai punya jenis: int (bilangan bulat), float (desimal), str (teks), dan bool (True atau False). Operator hitungnya + - * /, lalu ** untuk pangkat, // untuk bagi bulat, dan % untuk sisa bagi.`,
    [
      {
        t: 'Cek jenis nilai',
        p: 'print(type(7))\nprint(type(3.14))\nprint(type("halo"))\nprint(type(True))',
      },
      {
        t: 'Hitung-hitungan',
        p: 'print(10 + 3)\nprint(10 / 4)    # 2.5\nprint(10 // 4)   # 2\nprint(10 % 4)    # 2 (sisa bagi)\nprint(2 ** 5)    # 32',
      },
    ],
  ),
  mk(
    'p-string',
    'Dasar Python',
    'String dan f-string',
    'Mengolah teks',
    'string,teks,f-string,format,upper,lower,len,panjang,gabung,huruf besar',
    `String adalah teks. Beberapa trik umum: upper() jadi huruf besar, lower() huruf kecil, len() menghitung panjang. f-string (diawali f) membolehkan menyisipkan variabel ke dalam teks dengan kurung kurawal.`,
    [
      {
        t: 'Trik string',
        p: 'kata = "Python"\nprint(kata.upper())\nprint(kata.lower())\nprint(len(kata))\nprint(kata[0])   # huruf pertama',
      },
      { t: 'f-string', p: 'nama = "Sari"\numur = 17\nprint(f"{nama} berumur {umur} tahun")' },
    ],
  ),
  mk(
    'p-kondisi',
    'Dasar Python',
    'if / elif / else',
    'Mengambil keputusan',
    'if,elif,else,kondisi,percabangan,jika,indentasi,bandingkan',
    `Python memeriksa kondisi dari atas ke bawah dan menjalankan blok pertama yang benar. Perhatikan indentasi (geser ke dalam) di blok. Itu bukan hiasan, itu aturan Python.`,
    [
      {
        t: 'Cek nilai',
        p: 'nilai = 78\n\nif nilai >= 85:\n    print("A")\nelif nilai >= 70:\n    print("B")\nelse:\n    print("Perlu belajar lagi")',
      },
    ],
    'Perbandingan sama dengan ditulis ==, bukan =. Satu = itu untuk menyimpan nilai.',
  ),
  mk(
    'p-list',
    'Dasar Python',
    'List',
    'Daftar nilai',
    'list,daftar,array,append,len,index,isi,urutan',
    `List adalah daftar nilai dalam kurung siku. Nomor urutannya (index) mulai dari 0. append menambah item di belakang, len memberi jumlah item.`,
    [
      {
        t: 'Dasar list',
        p: 'buah = ["apel", "jeruk"]\nbuah.append("mangga")\n\nprint(buah[0])\nprint(len(buah))\nprint(buah)',
      },
    ],
  ),
  mk(
    'p-loop',
    'Dasar Python',
    'Perulangan for dan while',
    'Mengulang kode',
    'for,while,loop,perulangan,range,ulang,iterasi',
    `for mengulang blok kode untuk setiap item. range(n) menghasilkan angka dari 0 sampai n-1. while mengulang selama kondisinya masih benar.`,
    [
      {
        t: 'for dan range',
        p: 'for i in range(5):\n    print("Putaran", i)\n\nbuah = ["apel", "jeruk", "mangga"]\nfor b in buah:\n    print(b.upper())',
      },
      {
        t: 'while',
        p: 'hitung = 3\nwhile hitung > 0:\n    print(hitung)\n    hitung = hitung - 1\nprint("Selesai!")',
      },
    ],
  ),
  mk(
    'p-dict',
    'Dasar Python',
    'Dictionary',
    'Data berpasangan kunci dan nilai',
    'dictionary,dict,kamus,kunci,nilai,key,value,pasangan,kurung kurawal',
    `Dictionary menyimpan data berpasangan: kunci dan nilainya, ditulis dalam kurung kurawal. Ambil nilai lewat kuncinya, mirip membuka kamus.`,
    [
      {
        t: 'Menyimpan dan membaca',
        p: 'siswa = {"nama": "Sari", "umur": 17}\n\nprint(siswa["nama"])\nsiswa["kelas"] = "XI"\nprint(siswa)\n\nfor kunci in siswa:\n    print(kunci, "=", siswa[kunci])',
      },
    ],
  ),
  mk(
    'p-fungsi',
    'Dasar Python',
    'Fungsi (def)',
    'Kode yang bisa dipakai berulang',
    'fungsi,def,return,parameter,argumen,panggil,function',
    `Fungsi itu resep yang diberi nama. Tulis sekali pakai def, panggil kapan saja. Fungsi bisa menerima bahan (parameter) dan mengembalikan hasil lewat return.`,
    [
      {
        t: 'Membuat fungsi',
        p: 'def sapa(nama):\n    return "Halo, " + nama + "!"\n\nprint(sapa("Sari"))\nprint(sapa("Budi"))',
      },
      {
        t: 'Dua parameter',
        p: 'def luas(panjang, lebar):\n    return panjang * lebar\n\nprint(luas(4, 5))',
      },
    ],
  ),
];

// Materi Python tambahan ada di lib/content-python.ts
for (const l of PY_LESSONS)
  lessons.push(mk(l.id, l.group, l.title, l.desc, l.kw, l.text, l.ex, l.tip));

// Penanda kode di dalam penjelasan: istilah di daftar ini otomatis tampil sebagai `kode` (ditulis {{istilah}}).
const CODE_TERMS: Record<string, string[]> = {
  'w-struktur': ['<p>', '</p>', '<html>', '<head>', '<body>', '<', '>'],
  'w-teks': ['h1', 'h6', 'p', 'strong', 'em', 'br'],
  'w-daftar': ['ul', 'ol', 'li'],
  'w-link': ['a', 'href', 'img', 'src', 'alt'],
  'w-form': ['button', 'input', 'type', 'text', 'number', 'password', 'label'],
  'w-div': ['div', 'span', 'class', 'id'],
  'w-tabel': ['table', 'tr', 'th', 'td'],
  'w-semantik': ['header', 'nav', 'main', 'section', 'footer', 'article', 'aside'],
  'w-atribut': ['href', 'src', 'alt', 'target', 'type', 'value', 'required', 'disabled'],
  'w-form-input': ['form', 'input', 'textarea', 'select', 'option', 'label', 'name', 'required', 'placeholder'],
  'w-button-submit': ['button', 'submit', 'reset', 'type', 'form', 'action', 'method', 'addEventListener', 'preventDefault'],
  'w-audio-video': ['audio', 'video', 'controls', 'source', 'autoplay', 'loop', 'muted'],
  'w-selector': ['p', '.nama', '#nama', 'class', 'id'],
  'w-warna': ['color', 'background', 'red', '#2347e8', 'rgb(35, 71, 232)'],
  'w-font': [
    'font-size',
    'font-weight',
    'font-family',
    'text-align',
    'line-height',
    'left',
    'center',
    'right',
  ],
  'w-unit': ['px', '%', 'rem', 'em', 'vh', 'vw', 'font-size', 'html'],
  'w-specificity': [
    '!important',
    'inline style',
    'id',
    'class',
    'universal',
    'specificity',
    '#nama',
    '.nama',
  ],
  'w-css-variabel': ['var()', ':root', 'CSS Variables'],
  'w-padding': ['padding', 'margin', 'background'],
  'w-margin': ['margin: 0 auto', 'margin', 'background'],
  'w-border': ['border-radius', 'border', '50%'],
  'w-size': ['width', 'height', 'max-width', 'px', '%'],
  'w-overflow': [
    'overflow',
    'overflow-x',
    'overflow-y',
    'hidden',
    'auto',
    'scroll',
    'visible',
    'border-radius',
  ],
  'w-display': ['display', 'block', 'inline', 'none', 'div', 'p', 'span'],
  'w-flex': ['display: flex', 'justify-content', 'align-items', 'gap'],
  'w-flex-lanjut': [
    'flex-direction',
    'flex-wrap',
    'display: flex',
    'justify-content',
    'align-items',
    'flex',
    'gap',
    'grow',
    'shrink',
    'basis',
  ],
  'w-grid': ['grid-template-columns', 'grid-template-rows', 'display: grid', 'gap', 'fr'],
  'w-responsive': ['@media', 'media query', 'max-width', 'min-width', 'breakpoint'],
  'w-position': ['position', 'relative', 'absolute', 'top', 'left', 'right', 'bottom'],
  'w-hover': [':hover', 'transition', 'transform'],
  'w-pseudo-class': [
    ':hover',
    ':focus',
    ':active',
    ':first-child',
    ':disabled',
    '::before',
    '::after',
    'pseudo-class',
    'pseudo-element',
  ],
  'w-log': ['console.log()'],
  'w-variabel': ['const', 'let', '='],
  'w-tipe': ['+ - * /', '+', 'true', 'false'],
  'w-io': ['alert()', 'prompt()', 'confirm()', 'null', 'true', 'false'],
  'w-banding': ['===', '!==', '>=', '<=', 'true', 'false'],
  'w-logika': ['&&', '||', '!', 'true', 'false'],
  'w-if': ['if', 'else', '===', '!==', '>=', '<=', '>', '<'],
  'w-error': ['try', 'catch', 'finally', 'throw'],
  'w-fungsi': ['function', 'return'],
  'w-parameter': ['parameter', 'argumen', 'undefined'],
  'w-return': ['return', 'undefined'],
  'w-scope': ['scope', 'global', 'let', 'const'],
  'w-array': ['length', 'index'],
  'w-array-lanjut': ['push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'find', 'forEach', 'includes'],
  'w-object': ['this', 'object'],
  'w-loop': ['for...of', 'for', 'while', 'break', 'continue'],
  'w-dom': ['DOM'],
  'w-dom-select': [
    'getElementById',
    'querySelector',
    'querySelectorAll',
    'class',
    'id',
  ],
  'w-dom-manipulasi': [
    'textContent',
    'innerHTML',
    'setAttribute',
    'getAttribute',
    'classList',
    'style',
  ],
  'w-event': ['addEventListener', 'click'],
  'w-event-lanjut': [
    'addEventListener',
    'preventDefault',
    'event.target',
    'input',
    'change',
    'keydown',
    'submit',
  ],
  'p-print': ['print()', '#'],
  'p-variabel': ['='],
  'p-tipe': ['int', 'float', 'str', 'bool', 'True', 'False', '+ - * /', '**', '//', '%'],
  'p-string': ['upper()', 'lower()', 'len()', 'f-string', 'f'],
  'p-kondisi': ['if', 'elif', 'else', '==', '='],
  'p-list': ['append', 'len'],
  'p-loop': ['range(n)', 'n-1', 'for', 'while'],
  'p-fungsi': ['def', 'return'],
};
const reEsc = (t: string) => t.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
function mark(text: string | undefined, terms: string[] = []) {
  if (!text || !terms.length) return text;
  const re = new RegExp(
    '(?<![\\w])(' +
      [...terms]
        .sort((a, b) => b.length - a.length)
        .map(reEsc)
        .join('|') +
      ')(?![\\w])',
    'gi',
  );
  return text.replace(re, '{{$1}}');
}
for (const l of lessons) {
  l.text = mark(l.text, CODE_TERMS[l.id])!;
  l.tip = mark(l.tip, CODE_TERMS[l.id]);
}

// Kategori tiap topik (urutan kategori mengikuti CATEGORY_ORDER, urutan topik mengikuti urutan array lessons).
const CATEGORY_ORDER: Record<Lang, string[]> = {
  web: [
    'HTML Dasar',
    'HTML Lanjutan',
    'CSS Dasar',
    'Kotak (Box Model)',
    'Layout',
    'Efek dan Animasi',
    'JavaScript Dasar',
    'Alur Program',
    'Fungsi dan Data',
    'Interaksi Halaman',
  ],
  python: PY_CATEGORIES,
};
const CATEGORY: Record<string, string> = {
  'w-struktur': 'HTML Dasar',
  'w-teks': 'HTML Dasar',
  'w-daftar': 'HTML Dasar',
  'w-link': 'HTML Dasar',
  'w-form': 'HTML Lanjutan',
  'w-div': 'HTML Lanjutan',
  'w-tabel': 'HTML Lanjutan',
  'w-semantik': 'HTML Dasar',
  'w-atribut': 'HTML Dasar',
  'w-form-input': 'HTML Lanjutan',
  'w-button-submit': 'HTML Lanjutan',
  'w-audio-video': 'HTML Lanjutan',
  'w-selector': 'CSS Dasar',
  'w-warna': 'CSS Dasar',
  'w-font': 'CSS Dasar',
  'w-unit': 'CSS Dasar',
  'w-specificity': 'CSS Dasar',
  'w-css-variabel': 'CSS Dasar',
  'w-padding': 'Kotak (Box Model)',
  'w-margin': 'Kotak (Box Model)',
  'w-border': 'Kotak (Box Model)',
  'w-size': 'Kotak (Box Model)',
  'w-overflow': 'Kotak (Box Model)',
  'w-display': 'Layout',
  'w-flex': 'Layout',
  'w-flex-lanjut': 'Layout',
  'w-grid': 'Layout',
  'w-position': 'Layout',
  'w-responsive': 'Layout',
  'w-hover': 'Efek dan Animasi',
  'w-pseudo-class': 'Efek dan Animasi',
  'w-log': 'JavaScript Dasar',
  'w-variabel': 'JavaScript Dasar',
  'w-tipe': 'JavaScript Dasar',
  'w-io': 'JavaScript Dasar',
  'w-banding': 'Alur Program',
  'w-logika': 'Alur Program',
  'w-if': 'Alur Program',
  'w-loop': 'Alur Program',
  'w-error': 'Alur Program',
  'w-fungsi': 'Fungsi dan Data',
  'w-parameter': 'Fungsi dan Data',
  'w-return': 'Fungsi dan Data',
  'w-scope': 'Fungsi dan Data',
  'w-array': 'Fungsi dan Data',
  'w-array-lanjut': 'Fungsi dan Data',
  'w-object': 'Fungsi dan Data',
  'w-dom': 'Interaksi Halaman',
  'w-dom-select': 'Interaksi Halaman',
  'w-dom-manipulasi': 'Interaksi Halaman',
  'w-event': 'Interaksi Halaman',
  'w-event-lanjut': 'Interaksi Halaman',
  'p-print': 'Dasar Python',
  'p-variabel': 'Dasar Python',
  'p-tipe': 'Dasar Python',
  'p-string': 'Dasar Python',
  'p-kondisi': 'Operator dan Kondisi',
  'p-loop': 'Perulangan',
  'p-list': 'Koleksi Data',
  'p-dict': 'Koleksi Data',
  'p-fungsi': 'Fungsi',
};
for (const l of lessons) l.group = CATEGORY[l.id] ?? l.group;
const rank = (l: Lesson) => CATEGORY_ORDER[l.lang].indexOf(l.group);
const ord = (l: Lesson) => {
  const i = LESSON_ORDER.indexOf(l.id);
  return i < 0 ? 999 : i;
};
lessons.sort((a, b) =>
  a.lang === b.lang ? rank(a) - rank(b) || ord(a) - ord(b) : a.lang === 'web' ? -1 : 1,
);
for (const l of lessons) l.goal = GOALS[l.id];
export const lessonNo = (l: Lesson) => lessons.filter((x) => x.lang === l.lang).indexOf(l) + 1;

export const getLesson = (id: string | null | undefined) =>
  lessons.find((l) => l.id === id) ?? null;
export const groupsOf = (lang: Lang) =>
  CATEGORY_ORDER[lang].filter((g) => lessons.some((l) => l.lang === lang && l.group === g));

// Normalisasi snippet agar aman dimuat ke editor utama (bagian yang kosong jadi string kosong)
export const toWebCode = (s: Snippet) => ({ html: s.html ?? '', css: s.css ?? '', js: s.js ?? '' });
export const toPyCode = (s: Snippet) => ({ py: s.py ?? '' });

const byId = (id: string) => lessons.find((l) => l.id === id)!;
export const DEFAULT_WEB = { ...toWebCode(byId('w-struktur').snippet) };
export const DEFAULT_PY = { ...toPyCode(byId('p-variabel').snippet) };

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
/** Cari materi: judul > kata kunci > penjelasan > isi kode. Semua kata pencarian harus cocok. */
export function searchLessons(lang: Lang, q: string): Lesson[] {
  const all = lessons.filter((l) => l.lang === lang);
  const words = norm(q.trim()).split(/\s+/).filter(Boolean);
  if (!words.length) return all;
  const scored: { l: Lesson; sc: number }[] = [];
  for (const l of all) {
    const t = norm(l.title),
      k = norm(l.keywords.join(' ')),
      d = norm(l.desc + ' ' + l.text + ' ' + (l.goal ?? ''));
    const c = norm(l.examples.map((e) => Object.values(e.snippet).join(' ')).join(' '));
    let sc = 0,
      ok = true;
    for (const w of words) {
      const m = t.includes(w)
        ? 100
        : k.includes(w)
          ? 60
          : d.includes(w)
            ? 30
            : c.includes(w)
              ? 10
              : 0;
      if (!m) {
        ok = false;
        break;
      }
      sc += m;
    }
    if (ok) scored.push({ l, sc });
  }
  return scored.sort((a, b) => b.sc - a.sc).map((x) => x.l);
}
