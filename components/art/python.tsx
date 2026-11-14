import type { ArtFn } from './types';

export const ART_PY: Record<string, ArtFn> = {
  'p-print': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Mencetak teks ke terminal</title>
      <rect x="50" y="18" width="220" height="72" rx="8" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="66" y="48" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">print("Halo")</text>
      <text x="66" y="72" fontFamily="var(--font-mono)" fontSize={10} fill="var(--mute)"># program</text>
      <path d="M160 92 V114" stroke="var(--ac)" strokeWidth={2} fill="none" strokeLinecap="round" />
      <polyline points="153,107 160,115 167,107" stroke="var(--ac)" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="160" y="146" textAnchor="middle" fontFamily="inherit" fontSize={14} fill="var(--ac)">Halo</text>
      <text x="160" y="165" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">di terminal</text>
    </svg>
  ),

  'p-comment': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Komentar diabaikan saat program jalan</title>
      <text x="30" y="62" fontFamily="var(--font-mono)" fontSize={13} fill="var(--mute)"># catatan</text>
      <line x1="26" y1="55" x2="132" y2="55" stroke="var(--ac)" strokeWidth={2} strokeLinecap="round" />
      <text x="150" y="62" fontFamily="inherit" fontSize={11} fill="var(--mute)">diabaikan</text>
      <text x="30" y="112" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">print("Halo")</text>
      <text x="150" y="112" fontFamily="inherit" fontSize={11} fill="var(--mute)">dijalankan</text>
      <line x1="20" y1="140" x2="300" y2="140" stroke="var(--line)" strokeWidth={1.5} />
    </svg>
  ),

  'p-variabel': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Variabel menyimpan nilai yang bisa diganti</title>
      <rect x="20" y="62" width="85" height="38" rx="6" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={2} />
      <text x="62" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">nama</text>
      <text x="62" y="95" textAnchor="middle" fontFamily="inherit" fontSize={10} fill="var(--mute)">variabel</text>
      <rect x="190" y="32" width="100" height="36" rx="6" stroke="var(--ac)" strokeWidth={1.5} fill="none" />
      <text x="240" y="55" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">Sari</text>
      <path d="M105 74 C140 74 145 52 182 52" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="175,45 183,52 175,59" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="190" y="95" width="100" height="36" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="240" y="118" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--mute)">Budi</text>
      <path d="M105 92 C140 92 145 113 182 113" stroke="var(--line)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="175,106 183,113 175,120" stroke="var(--line)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="240" y="152" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">nilai diganti</text>
    </svg>
  ),

  'p-tipe': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Empat tipe data dasar Python</title>
      <rect x="22" y="30" width="130" height="52" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="40" y="50" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">int</text>
      <text x="40" y="70" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">7</text>
      <rect x="168" y="30" width="130" height="52" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="186" y="50" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">float</text>
      <text x="186" y="70" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">3.14</text>
      <rect x="22" y="98" width="130" height="52" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="40" y="118" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">str</text>
      <text x="40" y="138" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">"halo"</text>
      <rect x="168" y="98" width="130" height="52" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="186" y="118" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">bool</text>
      <text x="186" y="138" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">True</text>
    </svg>
  ),

  'p-string': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>F-string menyisipkan nilai variabel</title>
      <text x="18" y="52" fontFamily="var(--font-mono)" fontSize={12} fill="var(--mute)">{'f"Hello {nama}"'}</text>
      <path d="M160 64 V88" stroke="var(--ac)" strokeWidth={2} fill="none" strokeLinecap="round" />
      <polyline points="153,81 160,89 167,81" stroke="var(--ac)" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="118" y="118" textAnchor="end" fontFamily="inherit" fontSize={16} fill="var(--mute)">Halo</text>
      <rect x="122" y="100" width="46" height="24" rx="4" fill="var(--ac)" fillOpacity={0.15} stroke="none" />
      <text x="145" y="118" textAnchor="middle" fontFamily="inherit" fontSize={16} fill="var(--ac)">Sari</text>
      <text x="290" y="118" textAnchor="end" fontFamily="inherit" fontSize={11} fill="var(--mute)">dari variabel</text>
    </svg>
  ),

  'p-kondisi': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Cabang kondisi benar dan salah</title>
      <polygon points="100,36 148,68 100,100 52,68" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="100" y="73" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">if</text>
      <path d="M148 68 H192" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="185,61 193,68 185,75" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="172" y="56" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--ac)">ya</text>
      <rect x="196" y="48" width="100" height="36" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="246" y="70" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">cetak besar</text>
      <path d="M100 100 V131" stroke="var(--line)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="93,124 100,132 107,124" stroke="var(--line)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="122" y="122" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">tidak</text>
      <rect x="50" y="133" width="100" height="36" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="100" y="155" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">cetak kecil</text>
    </svg>
  ),

  'p-loop': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Perulangan mengulang isi program</title>
      <ellipse cx="160" cy="86" rx="98" ry="58" stroke="var(--ac)" strokeWidth={1.5} fill="none" />
      <polyline points="153,21 162,28 153,35" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="105" y="66" width="110" height="42" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="160" y="92" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">cetak</text>
      <text x="160" y="166" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">ulangi 5x</text>
    </svg>
  ),

  'p-list': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>List berisi beberapa item bernomor indeks</title>
      <text x="95" y="32" fontFamily="inherit" fontSize={11} fill="var(--mute)">list</text>
      <rect x="95" y="42" width="135" height="88" rx="8" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <rect x="105" y="54" width="115" height="28" rx="5" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="162" y="73" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">apel</text>
      <rect x="105" y="92" width="115" height="28" rx="5" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="162" y="111" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">jeruk</text>
      <text x="88" y="73" textAnchor="end" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">0</text>
      <text x="88" y="111" textAnchor="end" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">1</text>
      <text x="262" y="73" fontFamily="inherit" fontSize={11} fill="var(--mute)">indeks</text>
    </svg>
  ),

  'p-dict': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Dict menyimpan pasangan kunci dan nilai</title>
      <text x="30" y="30" fontFamily="inherit" fontSize={11} fill="var(--mute)">dict</text>
      <rect x="30" y="42" width="70" height="32" rx="6" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="65" y="63" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">nama</text>
      <path d="M102 58 H176" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="169,51 177,58 169,65" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="180" y="42" width="110" height="32" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="235" y="63" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--mute)">Sari</text>
      <rect x="30" y="102" width="70" height="32" rx="6" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="65" y="123" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">umur</text>
      <path d="M102 118 H176" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="169,111 177,118 169,125" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="180" y="102" width="110" height="32" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="235" y="123" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--mute)">17</text>
      <text x="30" y="156" fontFamily="inherit" fontSize={11} fill="var(--mute)">kunci</text>
      <text x="180" y="156" fontFamily="inherit" fontSize={11} fill="var(--mute)">nilai</text>
    </svg>
  ),

  'p-fungsi': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Fungsi dipanggil dan mengembalikan hasil</title>
      <rect x="25" y="58" width="112" height="58" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="81" y="83" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">def sapa()</text>
      <text x="81" y="103" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">fungsi</text>
      <path d="M137 78 C155 78 158 50 176 50" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="168,44 177,50 169,57" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="180" y="32" width="100" height="36" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="230" y="55" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--mute)">Halo</text>
      <path d="M137 96 C155 96 158 124 176 124" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="168,118 177,124 169,131" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="180" y="106" width="100" height="36" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="230" y="129" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--mute)">Hai</text>
    </svg>
  ),

  'p-input': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Input pengguna dijawab program</title>
      <rect x="55" y="22" width="210" height="40" rx="8" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="160" y="47" textAnchor="middle" fontFamily="inherit" fontSize={12} fill="var(--mute)">Siapa namamu?</text>
      <text x="62" y="96" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">{'> Sari'}</text>
      <line x1="104" y1="84" x2="104" y2="100" stroke="var(--ac)" strokeWidth={2} strokeLinecap="round" />
      <path d="M160 104 V116" stroke="var(--ac)" strokeWidth={2} fill="none" strokeLinecap="round" />
      <polyline points="153,109 160,117 167,109" stroke="var(--ac)" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="55" y="120" width="210" height="42" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="160" y="146" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">Halo, Sari!</text>
    </svg>
  ),

  'p-konversi': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Konversi teks menjadi angka dengan int</title>
      <rect x="32" y="52" width="100" height="52" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="82" y="84" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ac)">"42"</text>
      <rect x="188" y="52" width="100" height="52" rx="8" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="238" y="84" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--mute)">42</text>
      <path d="M134 78 H182" stroke="var(--ac)" strokeWidth={2} fill="none" strokeLinecap="round" />
      <polyline points="175,71 183,78 175,85" stroke="var(--ac)" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="158" y="66" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">int()</text>
      <text x="82" y="126" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">teks</text>
      <text x="238" y="126" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">angka</text>
    </svg>
  ),

  'p-banding': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Bandingkan nilai versus menyimpan nilai</title>
      <circle cx="45" cy="60" r="18" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="45" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--mute)">5</text>
      <circle cx="133" cy="60" r="18" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="133" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--mute)">5</text>
      <text x="89" y="66" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={15} fill="var(--ac)">==</text>
      <text x="89" y="104" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">True</text>
      <text x="89" y="124" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">membandingkan</text>
      <line x1="168" y1="28" x2="168" y2="132" stroke="var(--line)" strokeWidth={1.5} />
      <rect x="188" y="42" width="110" height="36" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="243" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--mute)">x = 5</text>
      <path d="M243 82 V98" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="236,91 243,99 250,91" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="243" y="118" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">menyimpan</text>
    </svg>
  ),

  'p-logika': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Operator logika and dan or</title>
      <text x="22" y="48" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--mute)">x</text>
      <text x="22" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--mute)">y</text>
      <path d="M32 48 H38 V62 H46 M32 80 H38 V62" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="50" y="40" width="80" height="40" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="90" y="66" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">and</text>
      <path d="M132 60 H160" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="153,53 161,60 153,67" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="168" y="65" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">True</text>
      <text x="22" y="112" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--mute)">x</text>
      <text x="22" y="144" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--mute)">y</text>
      <path d="M32 112 H38 V126 H46 M32 144 H38 V126" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="50" y="104" width="80" height="40" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="90" y="130" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">or</text>
      <path d="M132 124 H160" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="153,117 161,124 153,131" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="168" y="129" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">False</text>
    </svg>
  ),

  'p-list-method': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Metode list append pop dan len</title>
      <rect x="25" y="55" width="80" height="70" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <rect x="36" y="68" width="12" height="16" rx="2" stroke="var(--ac)" strokeWidth={1.5} fill="none" />
      <rect x="54" y="68" width="12" height="16" rx="2" stroke="var(--ac)" strokeWidth={1.5} fill="none" />
      <rect x="72" y="68" width="12" height="16" rx="2" stroke="var(--ac)" strokeWidth={1.5} fill="none" />
      <text x="65" y="118" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">list</text>
      <rect x="160" y="22" width="76" height="28" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="198" y="41" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">append</text>
      <path d="M105 70 C130 70 132 36 155 36" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="148,29 156,36 148,43" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="248" y="41" fontFamily="inherit" fontSize={11} fill="var(--mute)">tambah</text>
      <rect x="160" y="72" width="76" height="28" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="198" y="91" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">pop</text>
      <path d="M105 92 H155" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="148,85 156,92 148,99" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="248" y="91" fontFamily="inherit" fontSize={11} fill="var(--mute)">hapus</text>
      <rect x="160" y="122" width="76" height="28" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="198" y="141" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">len</text>
      <path d="M105 110 C130 110 132 136 155 136" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="148,129 156,136 148,143" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="248" y="141" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">3</text>
    </svg>
  ),

  'p-tuple-set': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Tuple terkunci dan set tanpa urutan</title>
      <text x="88" y="26" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">tuple</text>
      <rect x="22" y="36" width="132" height="92" rx="8" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <rect x="36" y="52" width="24" height="24" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <rect x="68" y="52" width="24" height="24" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <rect x="100" y="52" width="24" height="24" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <rect x="112" y="92" width="18" height="14" rx="3" fill="var(--ac)" fillOpacity={0.15} stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M116 92 V88 a5 5 0 0 1 10 0 V92" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <text x="88" y="148" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">terkunci</text>
      <text x="235" y="26" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">set</text>
      <circle cx="235" cy="82" r="46" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <circle cx="212" cy="66" r="8" fill="var(--ac)" fillOpacity={0.15} stroke="var(--ac)" strokeWidth={1.5} />
      <circle cx="252" cy="72" r="8" fill="var(--ac)" fillOpacity={0.15} stroke="var(--ac)" strokeWidth={1.5} />
      <circle cx="238" cy="100" r="8" fill="var(--ac)" fillOpacity={0.15} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="235" y="148" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">tanpa urutan</text>
    </svg>
  ),

  'p-dict-method': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Metode dict keys values dan get</title>
      <rect x="22" y="58" width="80" height="62" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="62" y="82" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">k:v</text>
      <text x="62" y="102" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">k:v</text>
      <rect x="160" y="20" width="80" height="28" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="200" y="39" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">keys</text>
      <path d="M102 88 C130 88 130 34 155 34" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="148,27 156,34 148,41" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="160" y="70" width="80" height="28" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="200" y="89" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">values</text>
      <path d="M102 89 H155" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="148,82 156,89 148,96" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="160" y="120" width="80" height="28" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="200" y="139" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">get</text>
      <path d="M102 92 C130 92 130 134 155 134" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="148,127 156,134 148,141" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  'p-param': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Argumen masuk ke parameter fungsi</title>
      <rect x="120" y="32" width="112" height="112" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="176" y="50" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">fungsi</text>
      <rect x="132" y="60" width="88" height="26" rx="5" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="176" y="78" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">nama</text>
      <rect x="132" y="98" width="88" height="26" rx="5" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="176" y="116" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">umur</text>
      <rect x="20" y="60" width="70" height="26" rx="5" stroke="var(--ac)" strokeWidth={1.5} fill="none" />
      <text x="55" y="78" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">Sari</text>
      <path d="M92 73 H126" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="119,66 127,73 119,80" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="20" y="98" width="70" height="26" rx="5" stroke="var(--ac)" strokeWidth={1.5} fill="none" />
      <text x="55" y="116" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">17</text>
      <path d="M92 111 H126" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="119,104 127,111 119,118" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="176" y="140" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">parameter</text>
    </svg>
  ),

  'p-return': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Return mengembalikan nilai ke pemanggil</title>
      <rect x="110" y="40" width="120" height="72" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="170" y="72" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">return</text>
      <text x="170" y="94" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">42</text>
      <path d="M110 78 C80 78 74 138 50 138" stroke="var(--ac)" strokeWidth={2} fill="none" strokeLinecap="round" />
      <polyline points="58,131 49,138 58,145" stroke="var(--ac)" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="48" y="162" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">hasil</text>
    </svg>
  ),

  'p-scope': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Cakupan variabel global dan lokal</title>
      <rect x="22" y="34" width="124" height="96" rx="8" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="84" y="55" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">global</text>
      <rect x="38" y="70" width="92" height="28" rx="5" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="84" y="89" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">x = 1</text>
      <text x="84" y="148" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">luar fungsi</text>
      <rect x="174" y="34" width="124" height="96" rx="8" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="236" y="55" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--mute)">local</text>
      <rect x="190" y="70" width="92" height="28" rx="5" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="236" y="89" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">x = 2</text>
      <text x="236" y="148" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">dalam fungsi</text>
    </svg>
  ),

  'p-except': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Except menangkap error yang muncul</title>
      <rect x="18" y="26" width="132" height="126" rx="8" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="30" y="50" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">try:</text>
      <text x="30" y="76" fontFamily="var(--font-mono)" fontSize={10} fill="var(--mute)">print(1/0)</text>
      <path d="M152 92 H186" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="179,85 187,92 179,99" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="190" y="26" width="112" height="126" rx="8" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="202" y="50" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ac)">except:</text>
      <polygon points="246,74 256,80 262,89 256,98 246,104 234,98 228,89 234,80" fill="var(--ac)" fillOpacity={0.15} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="246" y="126" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={9} fill="var(--mute)">errorcaught</text>
    </svg>
  ),

  'p-module': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Modul diimpor oleh beberapa file</title>
      <rect x="115" y="22" width="90" height="46" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="160" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">modul.py</text>
      <path d="M120 68 C110 95 100 105 92 118" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="85,111 91,120 100,114" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M200 68 C210 95 220 105 228 118" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="220,114 229,120 235,111" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="160" y="102" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">import</text>
      <rect x="22" y="122" width="104" height="34" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="74" y="144" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">file1.py</text>
      <rect x="194" y="122" width="104" height="34" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="246" y="144" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">file2.py</text>
    </svg>
  ),

  'p-proj-sapa': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Aplikasi sapa menampilkan sapaan</title>
      <rect x="34" y="22" width="252" height="124" rx="8" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="48" y="50" fontFamily="var(--font-mono)" fontSize={11} fill="var(--mute)">&gt; Halo, siapa namamu?</text>
      <text x="48" y="78" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">&gt; Sari</text>
      <line x1="84" y1="66" x2="84" y2="82" stroke="var(--ac)" strokeWidth={2} strokeLinecap="round" />
      <text x="48" y="110" fontFamily="var(--font-mono)" fontSize={11} fill="var(--ac)">&lt; Halo, Sari!</text>
      <text x="160" y="138" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">sapa.py</text>
    </svg>
  ),

  'p-proj-kalkulator': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Kalkulator sederhana dengan empat tombol</title>
      <rect x="60" y="22" width="200" height="48" rx="6" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="160" y="52" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ac)">12 + 5 = 17</text>
      <rect x="40" y="94" width="56" height="48" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="68" y="126" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fill="var(--mute)">+</text>
      <rect x="108" y="94" width="56" height="48" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="136" y="126" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fill="var(--mute)">-</text>
      <rect x="176" y="94" width="56" height="48" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="204" y="126" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fill="var(--mute)">*</text>
      <rect x="244" y="94" width="56" height="48" rx="6" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="272" y="126" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fill="var(--mute)">/</text>
      <text x="160" y="166" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">kalkulator</text>
    </svg>
  ),

  'p-proj-tebak': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Game tebak angka dengan petunjuk</title>
      <rect x="42" y="22" width="236" height="72" rx="8" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="160" y="48" textAnchor="middle" fontFamily="inherit" fontSize={12} fill="var(--mute)">Tebak angka 1-100</text>
      <text x="160" y="78" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ac)">&gt; 50</text>
      <path d="M108 124 V110" stroke="var(--ac)" strokeWidth={2} fill="none" strokeLinecap="round" />
      <polyline points="101,117 108,109 115,117" stroke="var(--ac)" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="108" y="142" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--ac)">panas</text>
      <path d="M212 110 V124" stroke="var(--line)" strokeWidth={2} fill="none" strokeLinecap="round" />
      <polyline points="205,117 212,125 219,117" stroke="var(--line)" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="212" y="142" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">dingin</text>
      <circle cx="160" cy="146" r="14" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="160" y="151" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--mute)">?</text>
    </svg>
  ),

  'p-proj-nilai': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Kartu nilai siswa dengan predikat</title>
      <rect x="28" y="36" width="170" height="104" rx="8" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="46" y="66" fontFamily="inherit" fontSize={13} fill="var(--mute)">Sari</text>
      <text x="46" y="104" fontFamily="var(--font-mono)" fontSize={18} fill="var(--ac)">85</text>
      <text x="46" y="126" fontFamily="inherit" fontSize={11} fill="var(--mute)">nilai</text>
      <path d="M200 82 H220" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <polyline points="213,75 221,82 213,89" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="224" y="52" width="58" height="58" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={1.5} />
      <text x="253" y="90" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fill="var(--ac)">A</text>
      <text x="253" y="132" textAnchor="middle" fontFamily="inherit" fontSize={11} fill="var(--mute)">predikat</text>
    </svg>
  ),

  'p-proj-todo': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Daftar tugas dengan tanda selesai</title>
      <rect x="32" y="38" width="18" height="18" rx="4" stroke="var(--ac)" strokeWidth={1.5} fill="none" />
      <path d="M36 47 L40 51 L47 43" stroke="var(--ac)" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="64" y="52" fontFamily="inherit" fontSize={13} fill="var(--mute)">belajar</text>
      <line x1="60" y1="45" x2="128" y2="45" stroke="var(--ac)" strokeWidth={2} strokeLinecap="round" />
      <rect x="32" y="82" width="18" height="18" rx="4" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="64" y="96" fontFamily="inherit" fontSize={13} fill="var(--mute)">latihan</text>
      <rect x="32" y="126" width="18" height="18" rx="4" stroke="var(--line)" strokeWidth={1.5} fill="none" />
      <text x="64" y="140" fontFamily="inherit" fontSize={13} fill="var(--mute)">review</text>
      <text x="240" y="52" fontFamily="inherit" fontSize={11} fill="var(--ac)">selesai</text>
      <text x="240" y="96" fontFamily="inherit" fontSize={11} fill="var(--mute)">belum</text>
      <text x="240" y="140" fontFamily="inherit" fontSize={11} fill="var(--mute)">belum</text>
    </svg>
  ),
};
