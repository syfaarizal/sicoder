/** Teks dengan penanda {{kode}} yang ditampilkan sebagai <code>. */
export default function RichText({ text }: { text: string }) {
  return <>{text.split(/\{\{(.+?)\}\}/g).map((p, i) => (i % 2 ? <code key={i}>{p}</code> : p))}</>;
}
