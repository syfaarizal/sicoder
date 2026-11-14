import type { ArtFn } from './types';

/**
 * Ilustrasi diagram kecil untuk materi CSS.
 * Semua warna memakai CSS variable supaya otomatis cocok di mode terang & gelap.
 * Aturan: viewBox 320x180, tanpa <defs>/gradient/filter/id, max ~28 elemen, satu ide per gambar.
 */
export const ART_CSS: Record<string, ArtFn> = {
  'w-selector': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Selector CSS memilih elemen</title>
      <text x="16" y="28" fontSize={11} fontFamily="var(--font-mono)" fill="var(--ac)">.kartu</text>
      <text x="16" y="72" fontSize={11} fontFamily="var(--font-mono)" fill="var(--ac)">#nama</text>
      <rect x="200" y="8" width="100" height="34" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="250" y="29" textAnchor="middle" fontSize={11} fill="var(--ac)">kartu</text>
      <rect x="200" y="56" width="100" height="34" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="250" y="77" textAnchor="middle" fontSize={11} fill="var(--ac)">kartu</text>
      <rect x="200" y="104" width="100" height="34" rx="4" fill="none" stroke="var(--line)" />
      <text x="250" y="125" textAnchor="middle" fontSize={11} fill="var(--mute)">p</text>
      <path d="M62 24 L192 25" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" />
      <polyline points="196,25 188,21 188,29" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M62 30 L192 68" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" />
      <polyline points="196,68 188,64 188,72" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M62 76 L192 80" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" />
      <polyline points="196,80 188,76 188,84" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  'w-warna': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Palet warna dan properti color</title>
      <circle cx="32" cy="40" r="18" fill="#e5484d" stroke="var(--line)" strokeWidth={1} />
      <circle cx="80" cy="40" r="18" fill="#30a46c" stroke="var(--line)" strokeWidth={1} />
      <circle cx="128" cy="40" r="18" fill="#0091ff" stroke="var(--line)" strokeWidth={1} />
      <circle cx="176" cy="40" r="18" fill="#f5d90a" stroke="var(--line)" strokeWidth={1} />
      <text x="32" y="76" textAnchor="middle" fontSize={10} fill="var(--mute)">merah</text>
      <text x="80" y="76" textAnchor="middle" fontSize={10} fill="var(--mute)">hijau</text>
      <text x="128" y="76" textAnchor="middle" fontSize={10} fill="var(--mute)">biru</text>
      <text x="176" y="76" textAnchor="middle" fontSize={10} fill="var(--mute)">kuning</text>
      <line x1="210" y1="12" x2="210" y2="168" stroke="var(--line)" strokeWidth={1.5} />
      <rect x="224" y="18" width="86" height="38" rx="4" fill="none" stroke="var(--line)" />
      <text x="267" y="43" textAnchor="middle" fontSize={15} fill="var(--ac)">Teks</text>
      <text x="267" y="70" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">color</text>
      <rect x="224" y="80" width="86" height="38" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="267" y="105" textAnchor="middle" fontSize={15} fill="var(--ac)">Teks</text>
      <text x="267" y="132" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">background</text>
    </svg>
  ),

  'w-font': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Properti font pada teks</title>
      <text x="16" y="40" fontSize={24} fill="var(--ac)">Coba lihat</text>
      <text x="16" y="66" fontSize={17} fill="var(--ac)">Coba lihat</text>
      <text x="16" y="86" fontSize={12} fill="var(--ac)">Coba lihat</text>
      <text x="16" y="101" fontSize={9} fill="var(--ac)">Coba lihat</text>
      <text x="126" y="38" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">24px</text>
      <text x="126" y="64" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">17px</text>
      <text x="126" y="84" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">12px</text>
      <text x="126" y="99" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">9px</text>
      <text x="212" y="42" fontSize={14} fontWeight={700} fill="var(--ac)">Tebal</text>
      <text x="212" y="70" fontSize={14} fontStyle="italic" fill="var(--ac)">Miring</text>
      <text x="258" y="102" textAnchor="middle" fontSize={12} fill="var(--mute)">Tengah</text>
      <line x1="206" y1="108" x2="310" y2="108" stroke="var(--line)" strokeWidth={1} />
      <text x="206" y="128" fontSize={12} fill="var(--mute)">Kiri</text>
      <line x1="206" y1="134" x2="310" y2="134" stroke="var(--line)" strokeWidth={1} />
    </svg>
  ),

  'w-unit': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Satuan ukuran CSS px persen rem vw</title>
      <rect x="18" y="14" width="62" height="26" rx="6" fill="none" stroke="var(--line)" />
      <rect x="92" y="14" width="62" height="26" rx="6" fill="none" stroke="var(--line)" />
      <rect x="166" y="14" width="62" height="26" rx="6" fill="none" stroke="var(--line)" />
      <rect x="240" y="14" width="62" height="26" rx="6" fill="none" stroke="var(--line)" />
      <text x="49" y="31" textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">px</text>
      <text x="123" y="31" textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">%</text>
      <text x="197" y="31" textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">rem</text>
      <text x="271" y="31" textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">vw</text>
      <rect x="24" y="62" width="150" height="68" rx="4" fill="none" stroke="var(--line)" strokeDasharray="4 3" />
      <text x="30" y="78" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">induk</text>
      <rect x="99" y="78" width="75" height="36" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="136" y="101" textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--ac)">50%</text>
      <line x1="24" y1="146" x2="174" y2="146" stroke="var(--mute)" strokeWidth={1.5} />
      <line x1="24" y1="139" x2="24" y2="153" stroke="var(--mute)" strokeWidth={1.5} />
      <line x1="174" y1="139" x2="174" y2="153" stroke="var(--mute)" strokeWidth={1.5} />
      <text x="99" y="166" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">100%</text>
      <rect x="200" y="62" width="104" height="68" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <line x1="214" y1="98" x2="290" y2="98" stroke="var(--ac)" strokeWidth={3} strokeLinecap="round" />
      <text x="252" y="84" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">px tetap</text>
    </svg>
  ),

  'w-specificity': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Specificity id class dan tag</title>
      <circle cx="70" cy="66" r="34" fill="var(--ac)" fillOpacity={0.15} stroke="var(--ac)" />
      <text x="70" y="70" textAnchor="middle" fontSize={12} fontFamily="var(--font-mono)" fill="var(--ac)">#id</text>
      <text x="70" y="118" textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">100</text>
      <circle cx="152" cy="92" r="22" fill="var(--mute)" fillOpacity={0.15} stroke="var(--mute)" />
      <text x="152" y="96" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">.class</text>
      <text x="152" y="128" textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">10</text>
      <circle cx="218" cy="100" r="13" fill="none" stroke="var(--mute)" />
      <text x="218" y="78" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">tag</text>
      <text x="218" y="128" textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">1</text>
      <path d="M98 46 L212 52" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" />
      <polyline points="216,52 206,48 209,57" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <text x="232" y="56" fontSize={11} fontFamily="var(--font-mono)" fill="var(--ac)">menang</text>
    </svg>
  ),

  'w-css-variabel': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Variabel CSS dipakai banyak tempat</title>
      <rect x="100" y="14" width="140" height="34" rx="6" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="170" y="35" textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--ac)">--warna-utama</text>
      <line x1="170" y1="48" x2="170" y2="76" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="62" y1="76" x2="278" y2="76" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="62" y1="76" x2="62" y2="98" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="170" y1="76" x2="170" y2="98" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="278" y1="76" x2="278" y2="98" stroke="var(--ac)" strokeWidth={1.5} />
      <polyline points="62,102 57,93 67,93" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="170,102 165,93 175,93" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="278,102 273,93 283,93" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="22" y="102" width="80" height="34" rx="6" fill="none" stroke="var(--line)" />
      <text x="62" y="124" textAnchor="middle" fontSize={11} fill="var(--mute)">tombol</text>
      <rect x="130" y="102" width="80" height="34" rx="6" fill="none" stroke="var(--line)" />
      <text x="170" y="124" textAnchor="middle" fontSize={11} fill="var(--mute)">link</text>
      <rect x="238" y="102" width="80" height="34" rx="6" fill="none" stroke="var(--ac)" strokeWidth={3} />
      <text x="278" y="124" textAnchor="middle" fontSize={11} fill="var(--ac)">border</text>
    </svg>
  ),

  'w-padding': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Box model margin border padding content</title>
      <rect x="24" y="16" width="272" height="140" rx="6" fill="none" stroke="var(--line)" strokeDasharray="4 4" />
      <text x="32" y="32" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">margin</text>
      <rect x="50" y="40" width="220" height="92" rx="4" fill="none" stroke="var(--ac)" strokeWidth={2} />
      <text x="58" y="54" fontSize={11} fontFamily="var(--font-mono)" fill="var(--ac)">border</text>
      <rect x="84" y="62" width="152" height="48" rx="3" fill="none" stroke="var(--mute)" strokeDasharray="3 3" />
      <text x="92" y="74" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">padding</text>
      <rect x="110" y="76" width="100" height="20" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="160" y="90" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">content</text>
      <line x1="84" y1="120" x2="110" y2="120" stroke="var(--mute)" strokeWidth={1.5} />
      <line x1="84" y1="114" x2="84" y2="126" stroke="var(--mute)" strokeWidth={1.5} />
      <line x1="110" y1="114" x2="110" y2="126" stroke="var(--mute)" strokeWidth={1.5} />
      <text x="97" y="138" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">16px</text>
    </svg>
  ),

  'w-margin': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Margin jarak luar padding jarak dalam</title>
      <rect x="8" y="16" width="304" height="130" rx="6" fill="none" stroke="var(--line)" strokeDasharray="4 3" />
      <text x="16" y="32" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">induk</text>
      <rect x="28" y="58" width="92" height="56" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="44" y="72" width="60" height="28" rx="3" fill="none" stroke="var(--mute)" strokeDasharray="3 3" />
      <text x="74" y="91" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">padding</text>
      <rect x="198" y="58" width="92" height="56" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="244" y="91" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">blok</text>
      <line x1="120" y1="86" x2="198" y2="86" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="120" y1="79" x2="120" y2="93" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="198" y1="79" x2="198" y2="93" stroke="var(--ac)" strokeWidth={1.5} />
      <text x="159" y="78" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">margin</text>
    </svg>
  ),

  'w-border': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Border tebal dan border radius</title>
      <text x="30" y="20" fontSize={11} fontFamily="var(--font-mono)" fill="var(--ac)">border</text>
      <rect x="30" y="30" width="110" height="60" rx="12" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={3} />
      <text x="85" y="108" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">radius 12px</text>
      <circle cx="222" cy="60" r="30" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" strokeWidth={3} />
      <text x="222" y="108" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">radius 50%</text>
      <text x="160" y="148" textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">border: 3px solid</text>
    </svg>
  ),

  'w-size': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Lebar dan tinggi elemen CSS</title>
      <rect x="100" y="42" width="120" height="80" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="160" y="86" textAnchor="middle" fontSize={12} fill="var(--ac)">kotak</text>
      <line x1="100" y1="30" x2="220" y2="30" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="100" y1="23" x2="100" y2="37" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="220" y1="23" x2="220" y2="37" stroke="var(--ac)" strokeWidth={1.5} />
      <text x="160" y="16" textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">width</text>
      <text x="230" y="27" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">200px</text>
      <line x1="240" y1="42" x2="240" y2="122" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="233" y1="42" x2="247" y2="42" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="233" y1="122" x2="247" y2="122" stroke="var(--ac)" strokeWidth={1.5} />
      <text x="254" y="78" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">height</text>
      <text x="254" y="94" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">80px</text>
    </svg>
  ),

  'w-overflow': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Konten meluber melewati batas overflow</title>
      <rect x="40" y="38" width="150" height="76" rx="4" fill="none" stroke="var(--line)" strokeDasharray="4 3" />
      <text x="46" y="54" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">batas</text>
      <rect x="55" y="52" width="170" height="48" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="100" y="80" fontSize={11} fill="var(--ac)">konten panjang</text>
      <path d="M228 62 L258 62" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" />
      <polyline points="264,62 255,57 255,67" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <text x="270" y="52" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">overflow</text>
    </svg>
  ),

  'w-display': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Perbandingan display block inline none</title>
      <text x="14" y="44" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">block</text>
      <rect x="66" y="30" width="232" height="24" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="182" y="46" textAnchor="middle" fontSize={11} fill="var(--ac)">Isi blok</text>
      <text x="14" y="102" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">inline</text>
      <text x="66" y="104" fontSize={12} fill="var(--mute)">teks</text>
      <rect x="102" y="90" width="44" height="20" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="152" y="104" fontSize={12} fill="var(--mute)">lanjutan</text>
      <text x="14" y="160" fontSize={11} fontFamily="var(--font-mono)" fill="var(--mute)">none</text>
      <rect x="66" y="138" width="232" height="28" rx="3" fill="none" stroke="var(--line)" strokeDasharray="4 3" />
      <line x1="76" y1="144" x2="104" y2="160" stroke="var(--mute)" strokeWidth={1.5} />
      <line x1="104" y1="144" x2="76" y2="160" stroke="var(--mute)" strokeWidth={1.5} />
      <text x="182" y="157" textAnchor="middle" fontSize={10} fill="var(--mute)">hilang</text>
    </svg>
  ),

  'w-flex': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="45" width="220" height="100" rx="4" fill="none" stroke="var(--ac)" />
      <rect x="85" y="78" width="52" height="44" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="145" y="78" width="52" height="44" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="205" y="78" width="52" height="44" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <line x1="62" y1="32" x2="278" y2="32" stroke="var(--ac)" strokeWidth={1.5} />
      <polyline points="62,32 71,27 71,37" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="278,32 269,27 269,37" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <text x="170" y="20" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">justify-content</text>
      <line x1="40" y1="55" x2="40" y2="135" stroke="var(--ac)" strokeWidth={1.5} />
      <polyline points="40,55 35,64 45,64" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="40,135 35,126 45,126" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <text x="26" y="95" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)" transform="rotate(-90 26 95)">align-items</text>
    </svg>
  ),

  'w-flex-lanjut': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <text x="94" y="24" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">column</text>
      <rect x="24" y="30" width="140" height="120" rx="4" fill="none" stroke="var(--ac)" />
      <rect x="40" y="42" width="56" height="26" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="40" y="74" width="56" height="26" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="40" y="106" width="56" height="26" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <line x1="110" y1="66" x2="110" y2="76" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="104" y1="66" x2="116" y2="66" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="104" y1="76" x2="116" y2="76" stroke="var(--ac)" strokeWidth={1.5} />
      <text x="122" y="74" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">gap</text>
      <text x="243" y="24" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">row</text>
      <rect x="188" y="30" width="110" height="120" rx="4" fill="none" stroke="var(--ac)" />
      <rect x="200" y="42" width="42" height="26" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="248" y="42" width="42" height="26" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="200" y="74" width="42" height="26" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <path d="M272 72 Q286 96 268 108" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeDasharray="3 3" />
      <text x="243" y="128" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">wrap</text>
    </svg>
  ),

  'w-grid': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <text x="58" y="36" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">kolom</text>
      <rect x="58" y="44" width="56" height="40" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="122" y="44" width="56" height="40" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="186" y="44" width="56" height="40" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="58" y="92" width="56" height="40" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="122" y="92" width="56" height="40" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="186" y="92" width="56" height="40" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <line x1="114" y1="146" x2="122" y2="146" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="114" y1="139" x2="114" y2="153" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="122" y1="139" x2="122" y2="153" stroke="var(--ac)" strokeWidth={1.5} />
      <text x="118" y="166" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">gap</text>
      <text x="250" y="90" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">baris</text>
    </svg>
  ),

  'w-position': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <rect x="58" y="26" width="150" height="110" rx="4" fill="none" stroke="var(--line)" strokeDasharray="4 3" />
      <text x="64" y="42" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">relative</text>
      <rect x="140" y="74" width="80" height="46" rx="4" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="180" y="100" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">absolute</text>
      <line x1="228" y1="28" x2="228" y2="74" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="221" y1="28" x2="235" y2="28" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="221" y1="74" x2="235" y2="74" stroke="var(--ac)" strokeWidth={1.5} />
      <text x="238" y="56" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">top</text>
      <line x1="58" y1="152" x2="140" y2="152" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="58" y1="145" x2="58" y2="159" stroke="var(--ac)" strokeWidth={1.5} />
      <line x1="140" y1="145" x2="140" y2="159" stroke="var(--ac)" strokeWidth={1.5} />
      <text x="99" y="170" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">left</text>
    </svg>
  ),

  'w-responsive': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="22" width="170" height="104" rx="6" fill="none" stroke="var(--line)" />
      <rect x="28" y="44" width="48" height="62" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="82" y="44" width="48" height="62" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <rect x="136" y="44" width="48" height="62" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="101" y="146" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">lebar</text>
      <rect x="236" y="22" width="68" height="120" rx="8" fill="none" stroke="var(--line)" />
      <rect x="248" y="44" width="44" height="80" rx="3" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="270" y="158" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">hp</text>
      <path d="M192 82 L224 82" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" />
      <polyline points="230,82 221,77 221,87" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <text x="211" y="106" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">@media</text>
    </svg>
  ),

  'w-hover': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <polygon points="92,38 92,72 101,64 107,78 113,75 106,62 118,61" fill="var(--ac)" fillOpacity={0.15} stroke="var(--ac)" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M118 58 Q148 46 172 78" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeDasharray="4 3" strokeLinecap="round" />
      <polyline points="178,84 168,80 171,72" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="120" y="84" width="120" height="44" rx="8" fill="var(--ac)" fillOpacity={0.12} stroke="var(--ac)" />
      <text x="180" y="112" textAnchor="middle" fontSize={13} fill="var(--ac)">Klik</text>
      <text x="246" y="66" fontSize={11} fontFamily="var(--font-mono)" fill="var(--ac)">:hover</text>
      <circle cx="258" cy="98" r="12" fill="var(--ac)" fillOpacity={0.15} stroke="var(--ac)" />
      <text x="258" y="128" textAnchor="middle" fontSize={10} fill="var(--mute)">warna</text>
    </svg>
  ),

  'w-pseudo-class': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="64" width="68" height="40" rx="6" fill="none" stroke="var(--line)" />
      <text x="46" y="89" textAnchor="middle" fontSize={12} fill="var(--mute)">Aa</text>
      <rect x="88" y="64" width="68" height="40" rx="6" fill="var(--ac)" fillOpacity={0.15} stroke="var(--ac)" />
      <text x="122" y="89" textAnchor="middle" fontSize={12} fill="var(--ac)">Aa</text>
      <rect x="158" y="58" width="80" height="52" rx="10" fill="none" stroke="var(--ac)" strokeWidth={1.5} />
      <rect x="164" y="64" width="68" height="40" rx="6" fill="none" stroke="var(--ac)" />
      <text x="198" y="89" textAnchor="middle" fontSize={12} fill="var(--ac)">Aa</text>
      <rect x="240" y="68" width="68" height="36" rx="6" fill="var(--ac)" fillOpacity={0.3} stroke="var(--ac)" />
      <text x="274" y="91" textAnchor="middle" fontSize={12} fill="var(--ac)">Aa</text>
      <text x="46" y="124" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--mute)">normal</text>
      <text x="122" y="124" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">:hover</text>
      <text x="198" y="124" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">:focus</text>
      <text x="274" y="124" textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--ac)">:active</text>
    </svg>
  ),
};

export default ART_CSS;
