import type { ArtFn } from './types';

/**
 * Ilustrasi SVG untuk topik HTML/CSS dasar.
 * Semua ilustrasi memakai viewBox 320x180 dan warna dari CSS variable
 * supaya otomatis cocok di mode terang dan gelap.
 */
export const ART_HTML: Record<string, ArtFn> = {
  'w-struktur': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Tag pembuka dan penutup bersarang</title>
      <rect
        x={20}
        y={16}
        width={280}
        height={148}
        rx={6}
        fill="none"
        stroke="var(--ac)"
        strokeWidth={2}
      />
      <text x={32} y={36} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<html>'}
      </text>
      <text x={288} y={36} textAnchor="end" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'</html>'}
      </text>
      <rect
        x={40}
        y={46}
        width={240}
        height={100}
        rx={5}
        fill="var(--ac)"
        fillOpacity={0.08}
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <text x={52} y={64} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<body>'}
      </text>
      <text x={268} y={64} textAnchor="end" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'</body>'}
      </text>
      <rect
        x={58}
        y={74}
        width={204}
        height={54}
        rx={5}
        fill="none"
        stroke="var(--ac)"
        strokeWidth={1.5}
      />
      <text x={70} y={92} fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        {'<p>'}
      </text>
      <text x={250} y={92} textAnchor="end" fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        {'</p>'}
      </text>
      <text x={70} y={116} fill="var(--mute)" fontSize={12}>
        Teks ada di sini
      </text>
    </svg>
  ),

  'w-teks': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Perbedaan ukuran dan gaya teks</title>
      <text x={20} y={34} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<h1>'}
      </text>
      <text x={92} y={38} fill="var(--ac)" fontSize={20} fontWeight={700}>
        Judul Besar
      </text>
      <line x1={20} y1={50} x2={300} y2={50} stroke="var(--line)" strokeWidth={1} />
      <text x={20} y={70} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<p>'}
      </text>
      <text x={92} y={72} fill="var(--mute)" fontSize={12}>
        Paragraf biasa
      </text>
      <line x1={20} y1={86} x2={300} y2={86} stroke="var(--line)" strokeWidth={1} />
      <text x={20} y={106} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<strong>'}
      </text>
      <text x={92} y={108} fill="var(--ac)" fontSize={12} fontWeight={700}>
        Ini tebal
      </text>
      <text x={20} y={132} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<em>'}
      </text>
      <text x={92} y={134} fill="var(--mute)" fontSize={12} fontStyle="italic">
        Ini miring
      </text>
      <text x={20} y={158} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<h6>'}
      </text>
      <text x={92} y={158} fill="var(--mute)" fontSize={9}>
        Ini kecil
      </text>
    </svg>
  ),

  'w-daftar': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Daftar tak terurut dan terurut</title>
      <rect
        x={18}
        y={22}
        width={132}
        height={132}
        rx={6}
        fill="none"
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <text x={30} y={44} fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        {'<ul>'}
      </text>
      <circle cx={38} cy={68} r={3.5} fill="var(--ac)" />
      <text x={50} y={72} fill="var(--mute)" fontSize={11}>
        Apel
      </text>
      <circle cx={38} cy={96} r={3.5} fill="var(--ac)" />
      <text x={50} y={100} fill="var(--mute)" fontSize={11}>
        Jeruk
      </text>
      <circle cx={38} cy={124} r={3.5} fill="var(--ac)" />
      <text x={50} y={128} fill="var(--mute)" fontSize={11}>
        Mangga
      </text>
      <rect
        x={170}
        y={22}
        width={132}
        height={132}
        rx={6}
        fill="none"
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <text x={182} y={44} fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        {'<ol>'}
      </text>
      <text x={186} y={72} fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        1.
      </text>
      <text x={204} y={72} fill="var(--mute)" fontSize={11}>
        Bakar
      </text>
      <text x={186} y={100} fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        2.
      </text>
      <text x={204} y={100} fill="var(--mute)" fontSize={11}>
        Kukus
      </text>
      <text x={186} y={128} fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        3.
      </text>
      <text x={204} y={128} fill="var(--mute)" fontSize={11}>
        Goreng
      </text>
    </svg>
  ),

  'w-link': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Link teks dan link gambar</title>
      <text x={24} y={40} fill="var(--ac)" fontSize={13} textDecoration="underline">
        Klik di sini
      </text>
      <path
        d="M96 36 L 150 30"
        fill="none"
        stroke="var(--ac)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path d="M150 30 l -7 -1 l 3 5 z" fill="var(--ac)" />
      <rect
        x={156}
        y={16}
        width={146}
        height={30}
        rx={5}
        fill="var(--ac)"
        fillOpacity={0.12}
        stroke="var(--ac)"
        strokeWidth={1.5}
      />
      <text x={229} y={35} textAnchor="middle" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'href="sicoder.id"'}
      </text>
      <rect
        x={24}
        y={92}
        width={84}
        height={62}
        rx={5}
        fill="none"
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <circle cx={44} cy={110} r={6} fill="var(--ac)" fillOpacity={0.35} />
      <polygon points="36,144 66,114 92,144" fill="var(--ac)" fillOpacity={0.2} stroke="var(--ac)" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M108 123 L 150 123" fill="none" stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M150 123 l -7 -4 l 0 8 z" fill="var(--ac)" />
      <rect
        x={156}
        y={108}
        width={146}
        height={30}
        rx={5}
        fill="var(--ac)"
        fillOpacity={0.12}
        stroke="var(--ac)"
        strokeWidth={1.5}
      />
      <text x={229} y={127} textAnchor="middle" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'src="logo.png"'}
      </text>
    </svg>
  ),

  'w-form': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Label, input, dan tombol</title>
      <text x={34} y={52} fill="var(--mute)" fontSize={11}>
        Nama
      </text>
      <rect
        x={30}
        y={60}
        width={150}
        height={36}
        rx={5}
        fill="var(--ac)"
        fillOpacity={0.08}
        stroke="var(--ac)"
        strokeWidth={1.5}
      />
      <text x={42} y={83} fill="var(--mute)" fontSize={11}>
        Aldo
      </text>
      <line x1={74} y1={68} x2={74} y2={88} stroke="var(--ac)" strokeWidth={1.5} strokeLinecap="round" />
      <rect
        x={198}
        y={60}
        width={92}
        height={36}
        rx={5}
        fill="var(--ac)"
        fillOpacity={0.15}
        stroke="var(--ac)"
        strokeWidth={2}
      />
      <text x={244} y={83} textAnchor="middle" fill="var(--ac)" fontSize={12} fontWeight={600}>
        Kirim
      </text>
      <text x={34} y={124} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<label> <input> <button>'}
      </text>
    </svg>
  ),

  'w-div': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Div dan span di dalam teks</title>
      <rect
        x={24}
        y={26}
        width={272}
        height={128}
        rx={6}
        fill="var(--ac)"
        fillOpacity={0.08}
        stroke="var(--ac)"
        strokeWidth={2}
      />
      <text x={36} y={48} fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        {'<div>'}
      </text>
      <text x={284} y={48} textAnchor="end" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'</div>'}
      </text>
      <text x={44} y={80} fill="var(--mute)" fontSize={13}>
       Halo
      </text>
      <rect
        x={80}
        y={66}
        width={78}
        height={20}
        rx={4}
        fill="var(--ac)"
        fillOpacity={0.15}
        stroke="var(--ac)"
        strokeWidth={1.5}
      />
      <text x={119} y={81} textAnchor="middle" fill="var(--ac)" fontSize={12}>
        Indonesia
      </text>
      <text x={164} y={80} fill="var(--mute)" fontSize={13}>
        !
      </text>
      <text x={44} y={112} fill="var(--mute)" fontSize={12}>
        Baris lain di dalam div
      </text>
      <text x={44} y={140} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<span> di dalam teks'}
      </text>
    </svg>
  ),

  'w-tabel': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Tabel dengan baris kepala dan sel</title>
      <rect
        x={34}
        y={38}
        width={252}
        height={30}
        fill="var(--ac)"
        fillOpacity={0.15}
        stroke="var(--ac)"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <line x1={118} y1={38} x2={118} y2={138} stroke="var(--line)" strokeWidth={1.5} />
      <line x1={202} y1={38} x2={202} y2={138} stroke="var(--line)" strokeWidth={1.5} />
      <line x1={34} y1={68} x2={286} y2={68} stroke="var(--line)" strokeWidth={1.5} />
      <line x1={34} y1={103} x2={286} y2={103} stroke="var(--line)" strokeWidth={1.5} />
      <text x={76} y={58} textAnchor="middle" fill="var(--ac)" fontSize={11} fontWeight={700} fontFamily="var(--font-mono)">
        {'<th>'}
      </text>
      <text x={160} y={58} textAnchor="middle" fill="var(--ac)" fontSize={11} fontWeight={700} fontFamily="var(--font-mono)">
        {'<th>'}
      </text>
      <text x={244} y={58} textAnchor="middle" fill="var(--ac)" fontSize={11} fontWeight={700} fontFamily="var(--font-mono)">
        {'<th>'}
      </text>
      <text x={76} y={91} textAnchor="middle" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<td>'}
      </text>
      <text x={160} y={91} textAnchor="middle" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<td>'}
      </text>
      <text x={244} y={91} textAnchor="middle" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<td>'}
      </text>
      <text x={76} y={126} textAnchor="middle" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<td>'}
      </text>
      <text x={160} y={126} textAnchor="middle" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<td>'}
      </text>
      <text x={244} y={126} textAnchor="middle" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<td>'}
      </text>
    </svg>
  ),

  'w-semantik': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Denah blok halaman semantik</title>
      <rect
        x={38}
        y={20}
        width={244}
        height={40}
        rx={5}
        fill="var(--ac)"
        fillOpacity={0.12}
        stroke="var(--ac)"
        strokeWidth={2}
      />
      <text x={50} y={44} fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        {'<header>'}
      </text>
      <rect
        x={188}
        y={28}
        width={82}
        height={24}
        rx={4}
        fill="none"
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <text x={229} y={44} textAnchor="middle" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<nav>'}
      </text>
      <rect
        x={38}
        y={70}
        width={244}
        height={62}
        rx={5}
        fill="none"
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <text x={50} y={90} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'<main>'}
      </text>
      <rect
        x={56}
        y={98}
        width={102}
        height={26}
        rx={4}
        fill="var(--ac)"
        fillOpacity={0.12}
        stroke="var(--ac)"
        strokeWidth={1.5}
      />
      <text x={107} y={115} textAnchor="middle" fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        {'<section>'}
      </text>
      <rect
        x={166}
        y={98}
        width={102}
        height={26}
        rx={4}
        fill="var(--ac)"
        fillOpacity={0.12}
        stroke="var(--ac)"
        strokeWidth={1.5}
      />
      <text x={217} y={115} textAnchor="middle" fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        {'<section>'}
      </text>
      <rect
        x={38}
        y={142}
        width={244}
        height={30}
        rx={5}
        fill="var(--ac)"
        fillOpacity={0.12}
        stroke="var(--ac)"
        strokeWidth={2}
      />
      <text x={50} y={161} fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        {'<footer>'}
      </text>
    </svg>
  ),

  'w-atribut': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Atribut menempel pada tag</title>
      <rect
        x={22}
        y={26}
        width={52}
        height={22}
        rx={11}
        fill="var(--ac)"
        fillOpacity={0.15}
        stroke="var(--ac)"
        strokeWidth={1.5}
      />
      <text x={48} y={41} textAnchor="middle" fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        href
      </text>
      <rect
        x={94}
        y={26}
        width={48}
        height={22}
        rx={11}
        fill="var(--ac)"
        fillOpacity={0.15}
        stroke="var(--ac)"
        strokeWidth={1.5}
      />
      <text x={118} y={41} textAnchor="middle" fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        src
      </text>
      <rect
        x={162}
        y={26}
        width={46}
        height={22}
        rx={11}
        fill="var(--ac)"
        fillOpacity={0.15}
        stroke="var(--ac)"
        strokeWidth={1.5}
      />
      <text x={185} y={41} textAnchor="middle" fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        alt
      </text>
      <rect
        x={228}
        y={26}
        width={58}
        height={22}
        rx={11}
        fill="var(--ac)"
        fillOpacity={0.15}
        stroke="var(--ac)"
        strokeWidth={1.5}
      />
      <text x={257} y={41} textAnchor="middle" fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        title
      </text>
      <line x1={48} y1={48} x2={120} y2={92} stroke="var(--line)" strokeWidth={1.5} />
      <line x1={118} y1={48} x2={150} y2={92} stroke="var(--line)" strokeWidth={1.5} />
      <line x1={185} y1={48} x2={185} y2={92} stroke="var(--line)" strokeWidth={1.5} />
      <line x1={257} y1={48} x2={205} y2={92} stroke="var(--line)" strokeWidth={1.5} />
      <rect
        x={70}
        y={92}
        width={180}
        height={44}
        rx={6}
        fill="none"
        stroke="var(--ac)"
        strokeWidth={2}
      />
      <text x={160} y={119} textAnchor="middle" fill="var(--ac)" fontSize={12} fontFamily="var(--font-mono)">
        {'<a href="...">'}
      </text>
    </svg>
  ),

  'w-form-input': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Macam-macam input pada form</title>
      <text x={18} y={24} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        text
      </text>
      <rect x={18} y={30} width={128} height={26} rx={4} fill="none" stroke="var(--line)" strokeWidth={1.5} />
      <text x={28} y={47} fill="var(--mute)" fontSize={11}>
        halo
      </text>
      <text x={166} y={24} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        password
      </text>
      <rect x={166} y={30} width={136} height={26} rx={4} fill="none" stroke="var(--line)" strokeWidth={1.5} />
      <text x={176} y={47} fill="var(--mute)" fontSize={11}>
        ••••
      </text>
      <text x={18} y={76} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        number
      </text>
      <rect x={18} y={82} width={128} height={26} rx={4} fill="none" stroke="var(--line)" strokeWidth={1.5} />
      <text x={28} y={99} fill="var(--mute)" fontSize={11}>
        42
      </text>
      <text x={166} y={76} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        textarea
      </text>
      <rect x={166} y={82} width={136} height={38} rx={4} fill="none" stroke="var(--line)" strokeWidth={1.5} />
      <line x1={176} y1={94} x2={250} y2={94} stroke="var(--line)" strokeWidth={1} />
      <line x1={176} y1={106} x2={250} y2={106} stroke="var(--line)" strokeWidth={1} />
      <text x={18} y={140} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        radio
      </text>
      <circle cx={26} cy={152} r={6} fill="none" stroke="var(--ac)" strokeWidth={1.5} />
      <circle cx={26} cy={152} r={2.5} fill="var(--ac)" />
      <circle cx={58} cy={152} r={6} fill="none" stroke="var(--line)" strokeWidth={1.5} />
      <text x={166} y={140} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        select
      </text>
      <rect x={166} y={146} width={136} height={26} rx={4} fill="none" stroke="var(--line)" strokeWidth={1.5} />
      <path d="M286 156 l 5 5 l 5 -5" fill="none" stroke="var(--mute)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  'w-button-submit': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Tombol submit, reset, dan button</title>
      <rect
        x={12}
        y={36}
        width={296}
        height={104}
        rx={8}
        fill="none"
        stroke="var(--line)"
        strokeWidth={1.5}
        strokeDasharray="5 5"
      />
      <rect
        x={26}
        y={52}
        width={82}
        height={38}
        rx={6}
        fill="var(--ac)"
        fillOpacity={0.15}
        stroke="var(--ac)"
        strokeWidth={2}
      />
      <text x={67} y={76} textAnchor="middle" fill="var(--ac)" fontSize={12} fontWeight={600}>
        Kirim
      </text>
      <text x={67} y={106} textAnchor="middle" fill="var(--ac)" fontSize={11} fontFamily="var(--font-mono)">
        submit
      </text>
      <rect
        x={119}
        y={52}
        width={82}
        height={38}
        rx={6}
        fill="none"
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <text x={160} y={76} textAnchor="middle" fill="var(--mute)" fontSize={12}>
        Reset
      </text>
      <text x={160} y={106} textAnchor="middle" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        reset
      </text>
      <rect
        x={212}
        y={52}
        width={82}
        height={38}
        rx={6}
        fill="none"
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <text x={253} y={76} textAnchor="middle" fill="var(--mute)" fontSize={12}>
        Batal
      </text>
      <text x={253} y={106} textAnchor="middle" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        button
      </text>
      <text x={160} y={132} textAnchor="middle" fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        {'type="..."'}
      </text>
    </svg>
  ),

  'w-audio-video': () => (
    <svg viewBox="0 0 320 180" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Bar pemutar media audio video</title>
      <rect
        x={22}
        y={46}
        width={276}
        height={82}
        rx={12}
        fill="var(--ac)"
        fillOpacity={0.08}
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <circle cx={58} cy={82} r={18} fill="var(--ac)" fillOpacity={0.15} stroke="var(--ac)" strokeWidth={2} />
      <polygon points="53,73 53,91 70,82" fill="var(--ac)" />
      <rect x={92} y={78} width={168} height={8} rx={4} fill="none" stroke="var(--line)" strokeWidth={1.5} />
      <line x1={92} y1={82} x2={152} y2={82} stroke="var(--ac)" strokeWidth={8} strokeLinecap="round" />
      <text x={92} y={104} fill="var(--mute)" fontSize={11} fontFamily="var(--font-mono)">
        00:12 / 03:40
      </text>
      <polygon points="258,72 258,92 270,92 280,102 280,62 270,72" fill="var(--mute)" />
      <path d="M286 72 q 6 10 0 20" fill="none" stroke="var(--mute)" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M292 66 q 9 16 0 32" fill="none" stroke="var(--mute)" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  ),
};
