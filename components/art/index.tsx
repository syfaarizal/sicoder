import { ART_HTML } from './web-html';
import { ART_CSS } from './web-css';
import { ART_JS } from './web-js';
import { ART_PY } from './python';
import type { ArtFn } from './types';

export const ART: Record<string, ArtFn> = {
  ...ART_HTML,
  ...ART_CSS,
  ...ART_JS,
  ...ART_PY,
};

/** Ilustrasi SVG kecil untuk sebuah topik. Kalau topiknya belum punya ilustrasi, nggak nampil. */
export default function LessonArt({ id }: { id: string }) {
  const art = ART[id];
  if (!art) return null;
  const Art = art;
  return (
    <figure className="art">
      <Art />
    </figure>
  );
}
