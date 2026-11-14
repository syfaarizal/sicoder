import type { ArtFn } from './types';

/** Bingkai standar semua ilustrasi: viewBox sama, mode terang/gelap lewat CSS variable. */
function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 180"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

/** Label teks biasa (bukan kode). */
function Label(props: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  size?: number;
  fill?: string;
  weight?: number;
}) {
  return (
    <text
      x={props.x}
      y={props.y}
      textAnchor={props.anchor ?? 'middle'}
      fontSize={props.size ?? 11}
      fontFamily="inherit"
      fontWeight={props.weight}
      fill={props.fill ?? 'var(--mute)'}
    >
      {props.children}
    </text>
  );
}

/** Label berisi kode. */
function Code(props: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  size?: number;
  fill?: string;
}) {
  return (
    <text
      x={props.x}
      y={props.y}
      textAnchor={props.anchor ?? 'middle'}
      fontSize={props.size ?? 11}
      fontFamily="var(--font-mono)"
      fill={props.fill ?? 'var(--mute)'}
    >
      {props.children}
    </text>
  );
}

export const ART_JS: Record<string, ArtFn> = {
  'w-log': () => (
    <Frame title="Mencetak teks ke console">
      <rect x={40} y={28} width={240} height={118} rx={8} fill="var(--cbg)" stroke="var(--cline)" />
      <circle cx={58} cy={44} r={4} fill="var(--mute)" fillOpacity={0.5} />
      <circle cx={72} cy={44} r={4} fill="var(--mute)" fillOpacity={0.5} />
      <circle cx={86} cy={44} r={4} fill="var(--mute)" fillOpacity={0.5} />
      <Code x={60} y={76} anchor="start" fill="var(--ac)">
        console.log
      </Code>
      <path d="M120 86 L120 104" stroke="var(--ac)" />
      <path d="M114 100 L120 108 L126 100" stroke="var(--ac)" />
      <Code x={60} y={128} anchor="start" fill="var(--mute)">
        Halo, dunia!
      </Code>
      <Label x={276} y={128} anchor="end" size={10}>
        output
      </Label>
    </Frame>
  ),

  'w-variabel': () => (
    <Frame title="Variabel menyimpan nilai yang bisa diganti">
      <rect x={22} y={26} width={112} height={46} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={78} y={54} fill="var(--ac)">
        nama
      </Code>
      <path d="M78 72 L78 96" stroke="var(--ac)" />
      <path d="M72 92 L78 100 L84 92" stroke="var(--ac)" />
      <rect x={33} y={100} width={90} height={38} rx={6} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={78} y={124} fill="var(--ac)">
        Sari
      </Code>
      <rect x={176} y={100} width={62} height={38} rx={6} stroke="var(--line)" strokeWidth={1.5} opacity={0.55} />
      <Code x={207} y={124} fill="var(--mute)" >
        Sari
      </Code>
      <path d="M240 119 L264 119" stroke="var(--line)" strokeWidth={1.5} />
      <path d="M260 114 L268 119 L260 124" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={272} y={100} width={44} height={38} rx={6} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={294} y={124} fill="var(--ac)">
        Rani
      </Code>
      <Label x={207} y={156} size={10}>
        nilai lama pudar
      </Label>
    </Frame>
  ),

  'w-tipe': () => (
    <Frame title="Lima tipe data di JavaScript">
      <rect x={14} y={26} width={92} height={56} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={60} y={48} fill="var(--ac)">
        number
      </Code>
      <Code x={60} y={68} fill="var(--mute)">
        42
      </Code>
      <rect x={114} y={26} width={92} height={56} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={160} y={48} fill="var(--ac)">
        string
      </Code>
      <Code x={160} y={68} fill="var(--mute)">
        &quot;halo&quot;
      </Code>
      <rect x={214} y={26} width={92} height={56} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={260} y={48} fill="var(--ac)">
        boolean
      </Code>
      <Code x={260} y={68} fill="var(--mute)">
        true
      </Code>
      <rect x={64} y={100} width={92} height={56} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={110} y={122} fill="var(--ac)">
        array
      </Code>
      <Code x={110} y={142} fill="var(--mute)">
        [1,2]
      </Code>
      <rect x={164} y={100} width={92} height={56} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={210} y={122} fill="var(--ac)">
        object
      </Code>
      <Code x={210} y={142} fill="var(--mute)">
        {'{a:1}'}
      </Code>
    </Frame>
  ),

  'w-io': () => (
    <Frame title="Dialog browser alert, prompt, confirm">
      <Label x={56} y={26} fill="var(--ac)">
        alert
      </Label>
      <rect x={10} y={38} width={92} height={100} rx={8} stroke="var(--line)" strokeWidth={1.5} />
      <Label x={56} y={66} size={10}>
        Halo!
      </Label>
      <Label x={56} y={82} size={10}>
        Apa kabar?
      </Label>
      <rect x={40} y={104} width={34} height={20} rx={5} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={57} y={118} size={10} fill="var(--ac)">
        OK
      </Code>
      <Label x={160} y={26} fill="var(--ac)">
        prompt
      </Label>
      <rect x={114} y={38} width={92} height={100} rx={8} stroke="var(--line)" strokeWidth={1.5} />
      <Label x={160} y={60} size={10}>
        Nama kamu?
      </Label>
      <rect x={124} y={70} width={72} height={20} rx={5} stroke="var(--ac)" strokeWidth={1.5} />
      <rect x={124} y={104} width={30} height={20} rx={5} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={139} y={118} size={10}>
        OK
      </Code>
      <rect x={162} y={104} width={34} height={20} rx={5} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={179} y={118} size={10}>
        Batal
      </Code>
      <Label x={264} y={26} fill="var(--ac)">
        confirm
      </Label>
      <rect x={218} y={38} width={92} height={100} rx={8} stroke="var(--line)" strokeWidth={1.5} />
      <Label x={264} y={66} size={10}>
        Lanjut?
      </Label>
      <rect x={228} y={104} width={30} height={20} rx={5} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={243} y={118} size={10} fill="var(--ac)">
        Ya
      </Code>
      <rect x={266} y={104} width={34} height={20} rx={5} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={283} y={118} size={10}>
        Batal
      </Code>
    </Frame>
  ),

  'w-banding': () => (
    <Frame title="Membandingkan 10 dan 5 lebih besar">
      <path d="M50 58 L270 98" stroke="var(--ac)" />
      <path d="M50 58 L38 78 M50 58 L62 78" stroke="var(--line)" strokeWidth={1.5} />
      <path d="M30 78 L70 78" stroke="var(--line)" strokeWidth={1.5} />
      <Code x={50} y={98} fill="var(--ac)" size={13}>
        10
      </Code>
      <path d="M270 98 L258 118 M270 98 L282 118" stroke="var(--line)" strokeWidth={1.5} />
      <path d="M250 118 L290 118" stroke="var(--line)" strokeWidth={1.5} />
      <Code x={270} y={138} fill="var(--mute)" size={13}>
        5
      </Code>
      <Code x={160} y={48} size={22} fill="var(--mute)">
        {'>'}
      </Code>
      <rect x={132} y={88} width={56} height={26} rx={6} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={160} y={106} fill="var(--ac)">
        true
      </Code>
      <Label x={160} y={132} size={10}>
        hasil
      </Label>
    </Frame>
  ),

  'w-logika': () => (
    <Frame title="Operator AND dan OR">
      <circle cx={26} cy={72} r={4} stroke="var(--mute)" strokeWidth={1.5} />
      <path d="M30 72 L62 72" stroke="var(--line)" strokeWidth={1.5} />
      <circle cx={26} cy={94} r={4} stroke="var(--mute)" strokeWidth={1.5} />
      <path d="M30 94 L62 94" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={62} y={58} width={54} height={50} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={89} y={89} size={15} fill="var(--ac)">
        {'&&'}
      </Code>
      <path d="M116 83 L142 83" stroke="var(--ac)" strokeWidth={1.5} />
      <circle cx={148} cy={83} r={5} stroke="var(--ac)" />
      <Label x={89} y={126} size={10} fill="var(--ac)">
        AND
      </Label>
      <circle cx={182} cy={72} r={4} stroke="var(--mute)" strokeWidth={1.5} />
      <path d="M186 72 L218 72" stroke="var(--line)" strokeWidth={1.5} />
      <circle cx={182} cy={94} r={4} stroke="var(--mute)" strokeWidth={1.5} />
      <path d="M186 94 L218 94" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={218} y={58} width={54} height={50} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={245} y={89} size={15} fill="var(--ac)">
        {'||'}
      </Code>
      <path d="M272 83 L298 83" stroke="var(--ac)" strokeWidth={1.5} />
      <circle cx={304} cy={83} r={5} stroke="var(--ac)" />
      <Label x={245} y={126} size={10} fill="var(--ac)">
        OR
      </Label>
    </Frame>
  ),

  'w-if': () => (
    <Frame title="Percabangan ifElse">
      <polygon points="90,18 142,54 90,90 38,54" stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Label x={90} y={58} size={10} fill="var(--ac)">
        kondisi
      </Label>
      <path d="M142 54 L196 54" stroke="var(--ac)" />
      <path d="M192 49 L200 54 L192 59" stroke="var(--ac)" />
      <Code x={168} y={44} size={10} fill="var(--ac)">
        ya
      </Code>
      <rect x={200} y={34} width={98} height={40} rx={6} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={249} y={59} fill="var(--ac)">
        aksi A
      </Code>
      <path d="M90 90 L90 122" stroke="var(--mute)" strokeWidth={1.5} />
      <path d="M85 118 L90 126 L95 118" stroke="var(--mute)" strokeWidth={1.5} />
      <Code x={116} y={112} size={10}>
        tidak
      </Code>
      <rect x={42} y={126} width={98} height={40} rx={6} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={91} y={151}>
        aksi B
      </Code>
    </Frame>
  ),

  'w-loop': () => (
    <Frame title="Loop mengulang blok kode">
      <ellipse cx={160} cy={90} rx={106} ry={50} stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M262 82 L272 90 L262 98" stroke="var(--ac)" strokeWidth={1.5} />
      <rect x={124} y={50} width={72} height={28} rx={6} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={160} y={69} fill="var(--ac)">
        isi
      </Code>
      <rect x={118} y={88} width={84} height={24} rx={6} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={160} y={104} size={10}>
        ulangi 5x
      </Code>
      <Label x={160} y={162} size={10}>
        kembali ke awal
      </Label>
    </Frame>
  ),

  'w-error': () => (
    <Frame title="Error ditangkap dengan try catch">
      <rect x={22} y={40} width={112} height={72} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={78} y={66} fill="var(--ac)">
        try
      </Code>
      <Code x={78} y={92} fill="var(--mute)" size={10}>
        hitung()
      </Code>
      <path d="M134 76 L178 76" stroke="var(--ac)" />
      <path d="M172 70 L182 76 L172 82" stroke="var(--ac)" />
      <rect x={182} y={40} width={116} height={72} rx={8} stroke="var(--ac)" strokeWidth={1.5} />
      <Code x={240} y={66} fill="var(--ac)">
        catch
      </Code>
      <Code x={240} y={92} fill="var(--mute)" size={10}>
        (error)
      </Code>
      <polygon
        points="237,121 240,128 247,129 242,134 243,141 237,137 227,141 232,134 227,129 234,128"
        stroke="var(--ac)"
        fill="var(--ac)"
        fillOpacity={0.15}
        strokeWidth={1.5}
      />
      <Label x={237} y={158} size={10} fill="var(--ac)">
        ledakan
      </Label>
    </Frame>
  ),

  'w-fungsi': () => (
    <Frame title="Fungsi menerima bahan dan mengembalikan hasil">
      <circle cx={34} cy={56} r={6} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <circle cx={34} cy={104} r={6} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <path d="M40 56 L96 76" stroke="var(--line)" strokeWidth={1.5} />
      <path d="M40 104 L96 84" stroke="var(--line)" strokeWidth={1.5} />
      <Label x={34} y={38} size={10}>
        bahan
      </Label>
      <rect x={96} y={40} width={112} height={80} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={152} y={72} fill="var(--ac)">
        fungsi
      </Code>
      <Code x={152} y={98} size={10} fill="var(--mute)">
        hitung()
      </Code>
      <path d="M208 80 L252 80" stroke="var(--ac)" />
      <path d="M246 74 L256 80 L246 86" stroke="var(--ac)" />
      <circle cx={266} cy={80} r={9} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Label x={266} y={112} size={10} fill="var(--ac)">
        hasil
      </Label>
    </Frame>
  ),

  'w-parameter': () => (
    <Frame title="Parameter fungsi menerima nilai">
      <Label x={200} y={26} size={10}>
        fungsi
      </Label>
      <rect x={130} y={34} width={140} height={112} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <rect x={144} y={48} width={112} height={28} rx={6} stroke="var(--ac)" strokeWidth={1.5} />
      <Code x={200} y={66} size={10} fill="var(--ac)">
        panjang
      </Code>
      <rect x={144} y={88} width={112} height={28} rx={6} stroke="var(--ac)" strokeWidth={1.5} />
      <Code x={200} y={106} size={10} fill="var(--ac)">
        lebar
      </Code>
      <Code x={112} y={66} size={12} fill="var(--mute)">
        8
      </Code>
      <path d="M120 62 L140 62" stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M135 57 L143 62 L135 67" stroke="var(--ac)" strokeWidth={1.5} />
      <Code x={112} y={106} size={12} fill="var(--mute)">
        3
      </Code>
      <path d="M120 102 L140 102" stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M135 97 L143 102 L135 107" stroke="var(--ac)" strokeWidth={1.5} />
    </Frame>
  ),

  'w-return': () => (
    <Frame title="Return mengembalikan nilai ke pemanggil">
      <rect x={152} y={52} width={124} height={72} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={214} y={94} size={13} fill="var(--ac)">
        return
      </Code>
      <path d="M152 88 C 118 88 116 122 82 120" stroke="var(--ac)" />
      <path d="M92 113 L78 119 L88 128" stroke="var(--ac)" />
      <Label x={70} y={144} size={11} fill="var(--ac)">
        hasil
      </Label>
      <Label x={214} y={142} size={10}>
        nilai dikembalikan ke pemanggil
      </Label>
    </Frame>
  ),

  'w-scope': () => (
    <Frame title="Scope global fungsi dan blok">
      <rect x={26} y={22} width={268} height={138} rx={10} stroke="var(--line)" strokeWidth={1.5} />
      <Label x={40} y={40} size={10}>
        global
      </Label>
      <rect x={74} y={52} width={192} height={94} rx={8} stroke="var(--ac)" strokeWidth={1.5} />
      <Label x={88} y={70} size={10} fill="var(--ac)">
        fungsi
      </Label>
      <rect x={120} y={84} width={104} height={50} rx={6} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Label x={134} y={102} size={10} fill="var(--ac)">
        blok
      </Label>
      <Code x={172} y={124} size={12} fill="var(--ac)">
        x
      </Code>
    </Frame>
  ),

  'w-array': () => (
    <Frame title="Array menyimpan nilai berurutan dengan indeks">
      <rect x={40} y={58} width={240} height={62} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <path d="M120 58 L120 120" stroke="var(--line)" strokeWidth={1.5} />
      <path d="M200 58 L200 120" stroke="var(--line)" strokeWidth={1.5} />
      <Code x={80} y={50} size={10}>
        [0]
      </Code>
      <Code x={160} y={50} size={10}>
        [1]
      </Code>
      <Code x={240} y={50} size={10}>
        [2]
      </Code>
      <Code x={80} y={96} fill="var(--ac)">
        apel
      </Code>
      <Code x={160} y={96} fill="var(--ac)">
        jeruk
      </Code>
      <Code x={240} y={96} fill="var(--ac)">
        mangga
      </Code>
      <Label x={160} y={142} size={10}>
        indeks
      </Label>
    </Frame>
  ),

  'w-array-lanjut': () => (
    <Frame title="Method array push pop dan map">
      <rect x={54} y={58} width={126} height={44} rx={6} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <path d="M96 58 L96 102 M138 58 L138 102" stroke="var(--line)" strokeWidth={1.5} />
      <Code x={75} y={85} fill="var(--ac)">
        1
      </Code>
      <Code x={117} y={85} fill="var(--ac)">
        2
      </Code>
      <Code x={159} y={85} fill="var(--ac)">
        3
      </Code>
      <path d="M212 44 L186 66" stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M186 56 L182 70 L194 68" stroke="var(--ac)" strokeWidth={1.5} />
      <Code x={228} y={42} size={10} fill="var(--ac)">
        push
      </Code>
      <path d="M180 92 L214 116" stroke="var(--mute)" strokeWidth={1.5} />
      <path d="M210 108 L219 118 L207 120" stroke="var(--mute)" strokeWidth={1.5} />
      <Code x={242} y={118} size={10}>
        pop
      </Code>
      <path d="M117 102 L117 130" stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M112 126 L117 134 L122 126" stroke="var(--ac)" strokeWidth={1.5} />
      <Code x={140} y={124} size={10} fill="var(--ac)">
        map
      </Code>
      <rect x={54} y={138} width={126} height={32} rx={6} stroke="var(--ac)" strokeWidth={1.5} />
      <Code x={117} y={158} size={10} fill="var(--mute)">
        array baru
      </Code>
    </Frame>
  ),

  'w-object': () => (
    <Frame title="Object menyimpan pasangan kunci dan nilai">
      <Label x={160} y={28} size={10}>
        object
      </Label>
      <rect x={54} y={40} width={212} height={104} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <path d="M54 92 L266 92" stroke="var(--line)" strokeWidth={1.5} />
      <Code x={128} y={72} anchor="end" fill="var(--ac)">
        nama
      </Code>
      <Code x={138} y={72} anchor="start" fill="var(--mute)">
        :
      </Code>
      <Code x={152} y={72} anchor="start">
        Sari
      </Code>
      <Code x={128} y={120} anchor="end" fill="var(--ac)">
        umur
      </Code>
      <Code x={138} y={120} anchor="start" fill="var(--mute)">
        :
      </Code>
      <Code x={152} y={120} anchor="start">
        17
      </Code>
    </Frame>
  ),

  'w-dom': () => (
    <Frame title="Pohon DOM document html head body">
      <rect x={124} y={6} width={72} height={22} rx={5} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={160} y={21} size={10} fill="var(--ac)">
        document
      </Code>
      <path d="M160 28 L160 42" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={134} y={42} width={52} height={22} rx={5} stroke="var(--ac)" />
      <Code x={160} y={57} size={10} fill="var(--ac)">
        html
      </Code>
      <path d="M160 64 L160 76 M90 76 L230 76 M90 76 L90 90 M230 76 L230 90" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={60} y={90} width={60} height={20} rx={5} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={90} y={104} size={10}>
        head
      </Code>
      <rect x={200} y={90} width={60} height={20} rx={5} stroke="var(--ac)" />
      <Code x={230} y={104} size={10} fill="var(--ac)">
        body
      </Code>
      <path d="M230 110 L230 122" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={204} y={122} width={52} height={20} rx={5} stroke="var(--ac)" />
      <Code x={230} y={136} size={10} fill="var(--ac)">
        div
      </Code>
      <path d="M230 142 L230 150 M194 150 L266 150 M194 150 L194 156 M266 150 L266 156" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={174} y={156} width={40} height={18} rx={5} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={194} y={169} size={10} fill="var(--ac)">
        h1
      </Code>
      <rect x={246} y={156} width={40} height={18} rx={5} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={266} y={169} size={10} fill="var(--ac)">
        p
      </Code>
    </Frame>
  ),

  'w-dom-select': () => (
    <Frame title="querySelector memilih satu node DOM">
      <rect x={126} y={8} width={72} height={22} rx={5} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={162} y={23} size={10}>
        document
      </Code>
      <path d="M162 30 L162 40" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={132} y={40} width={60} height={22} rx={5} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={162} y={55} size={10}>
        html
      </Code>
      <path d="M162 62 L162 72" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={132} y={72} width={60} height={22} rx={5} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={162} y={87} size={10}>
        body
      </Code>
      <path d="M162 94 L162 106 M100 106 L224 106 M100 106 L100 116 M224 106 L224 116" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={70} y={116} width={60} height={22} rx={5} stroke="var(--line)" strokeWidth={1.5} opacity={0.45} />
      <Code x={100} y={131} size={10} fill="var(--mute)">
        p
      </Code>
      <rect x={194} y={116} width={60} height={22} rx={5} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={224} y={131} size={10} fill="var(--ac)">
        h1
      </Code>
      <rect x={22} y={118} width={116} height={34} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={80} y={139} size={10} fill="var(--ac)">
        querySelector
      </Code>
      <path d="M140 130 C 162 120 178 122 192 126" stroke="var(--ac)" />
      <path d="M184 118 L196 126 L183 130" stroke="var(--ac)" />
    </Frame>
  ),

  'w-dom-manipulasi': () => (
    <Frame title="Manipulasi DOM menambah dan menghapus node">
      <Label x={84} y={24} size={10}>
        sebelum
      </Label>
      <Label x={236} y={24} size={10}>
        sesudah
      </Label>
      <rect x={58} y={34} width={52} height={22} rx={5} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={84} y={49} size={10}>
        html
      </Code>
      <path d="M84 56 L84 70" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={58} y={70} width={52} height={22} rx={5} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={84} y={85} size={10}>
        body
      </Code>
      <path d="M84 92 L84 108" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={58} y={108} width={52} height={22} rx={5} stroke="var(--line)" strokeWidth={1.5} opacity={0.5} />
      <Code x={84} y={123} size={10}>
        li
      </Code>
      <path d="M56 119 L112 119" stroke="var(--mute)" strokeWidth={1.5} />
      <Code x={160} y={112} size={22} fill="var(--ac)">
        {'→'}
      </Code>
      <rect x={210} y={34} width={52} height={22} rx={5} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={236} y={49} size={10}>
        html
      </Code>
      <path d="M236 56 L236 70" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={210} y={70} width={60} height={22} rx={5} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={240} y={85} size={10}>
        body
      </Code>
      <path d="M240 92 L240 104 M217 104 L263 104 M217 104 L217 108 M263 104 L263 108" stroke="var(--line)" strokeWidth={1.5} />
      <rect x={196} y={108} width={42} height={22} rx={5} stroke="var(--line)" strokeWidth={1.5} />
      <Code x={217} y={123} size={10}>
        li
      </Code>
      <rect x={242} y={108} width={42} height={22} rx={5} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={263} y={123} size={10} fill="var(--ac)">
        p
      </Code>
      <Label x={263} y={146} size={10} fill="var(--ac)">
        baru
      </Label>
    </Frame>
  ),

  'w-event': () => (
    <Frame title="Klik memicu listener dan mengubah tampilan">
      <polygon
        points="38,34 38,66 48,56 54,70 60,67 54,54 66,53"
        stroke="var(--ac)"
        fill="var(--ac)"
        fillOpacity={0.15}
        strokeWidth={1.5}
      />
      <Label x={48} y={88} size={10} fill="var(--ac)">
        klik
      </Label>
      <path d="M78 50 L110 50" stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M104 44 L114 50 L104 56" stroke="var(--ac)" strokeWidth={1.5} />
      <rect x={118} y={30} width={104} height={44} rx={8} stroke="var(--ac)" fill="var(--ac)" fillOpacity={0.12} />
      <Code x={170} y={50} fill="var(--ac)">
        listener
      </Code>
      <Code x={170} y={66} size={10} fill="var(--mute)">
        onclick
      </Code>
      <path d="M222 52 L252 52" stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M246 46 L256 52 L246 58" stroke="var(--ac)" strokeWidth={1.5} />
      <rect x={258} y={28} width={56} height={50} rx={8} stroke="var(--line)" strokeWidth={1.5} />
      <Label x={286} y={50} size={10}>
        teks
      </Label>
      <Code x={286} y={68} size={10} fill="var(--ac)">
        berubah
      </Code>
    </Frame>
  ),

  'w-event-lanjut': () => (
    <Frame title="Empat jenis event DOM yang sering dipakai">
      <polygon
        points="42,44 42,72 50,63 55,76 61,73 56,61 67,60"
        stroke="var(--ac)"
        fill="var(--ac)"
        fillOpacity={0.15}
        strokeWidth={1.5}
      />
      <Code x={45} y={98} size={10} fill="var(--ac)">
        click
      </Code>
      <rect x={98} y={46} width={34} height={20} rx={3} stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M104 56 L110 56 M116 56 L124 56" stroke="var(--ac)" strokeWidth={1.5} />
      <Code x={115} y={98} size={10} fill="var(--ac)">
        keydown
      </Code>
      <rect x={182} y={44} width={26} height={24} rx={3} stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M210 56 L226 56" stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M220 50 L230 56 L220 62" stroke="var(--ac)" strokeWidth={1.5} />
      <Code x={196} y={98} size={10} fill="var(--ac)">
        submit
      </Code>
      <path d="M266 44 L266 76" stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M260 50 L266 42 L272 50" stroke="var(--ac)" strokeWidth={1.5} />
      <path d="M260 70 L266 78 L272 70" stroke="var(--ac)" strokeWidth={1.5} />
      <Code x={266} y={98} size={10} fill="var(--ac)">
        scroll
      </Code>
    </Frame>
  ),
};

export default ART_JS;
