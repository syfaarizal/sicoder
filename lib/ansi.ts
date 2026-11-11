// Model terminal mini: mengerti warna ANSI (SGR), clear screen, dan carriage return (\r).
// Cukup untuk program belajar seperti animasi teks, progress bar, dan output berwarna.
export interface Style {
  fg?: string;
  bg?: string;
  bold?: boolean;
  dim?: boolean;
  italic?: boolean;
  underline?: boolean;
}
export interface Span {
  text: string;
  style: Style;
}

const PAL16 = [
  '#000000',
  '#cd3131',
  '#0dbc79',
  '#e5e510',
  '#2472c8',
  '#bc3fbc',
  '#11a8cd',
  '#e5e5e5',
  '#666666',
  '#f14c4c',
  '#23d18b',
  '#f5f543',
  '#3b8eea',
  '#d670d6',
  '#29b8db',
  '#ffffff',
];
function c256(n: number): string | undefined {
  if (n < 0 || n > 255) return undefined;
  if (n < 16) return PAL16[n];
  if (n < 232) {
    const k = n - 16,
      v = (x: number) => (x === 0 ? 0 : 55 + 40 * x);
    return `rgb(${v(Math.floor(k / 36))},${v(Math.floor(k / 6) % 6)},${v(k % 6)})`;
  }
  const g = 8 + 10 * (n - 232);
  return `rgb(${g},${g},${g})`;
}

export class Terminal {
  lines: Span[][] = [[]];
  style: Style = {};
  version = 0;
  private cr = false;
  private carry = '';
  private readonly max = 3000;

  clear() {
    this.lines = [[]];
    this.style = {};
    this.cr = false;
    this.carry = '';
    this.version++;
  }

  /** Tulis teks. `base` = gaya dasar (mis. merah untuk error) yang kalah oleh warna dari kode ANSI. */
  write(chunk: string, base?: Style) {
    const s = this.carry + chunk;
    this.carry = '';
    let buf = '';
    const flush = () => {
      if (!buf) return;
      if (this.cr) {
        this.lines[this.lines.length - 1] = [];
        this.cr = false;
      }
      this.push(buf, base);
      buf = '';
    };
    let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (ch === '\x1b') {
        if (i + 1 >= s.length) {
          flush();
          this.carry = s.slice(i);
          break;
        }
        if (s[i + 1] === '[') {
          const m = /^\x1b\[([0-9;?]*)([A-Za-z])/.exec(s.slice(i, i + 40));
          if (!m) {
            if (s.length - i < 40) {
              flush();
              this.carry = s.slice(i);
              break;
            }
            i++;
            continue;
          }
          flush();
          this.csi(m[1], m[2]);
          i += m[0].length;
          continue;
        }
        if (s[i + 1] === 'c') {
          flush();
          this.clearScreen();
          i += 2;
          continue;
        }
        i += 2;
        continue; // escape lain diabaikan
      }
      if (ch === '\n') {
        flush();
        this.cr = false;
        this.lines.push([]);
        if (this.lines.length > this.max) this.lines.splice(0, this.lines.length - this.max);
      } else if (ch === '\r') {
        flush();
        this.cr = true;
      } else if (ch === '\t') buf += '    ';
      else buf += ch;
      i++;
    }
    flush();
    this.version++;
  }

  private clearScreen() {
    this.lines = [[]];
    this.cr = false;
  }
  private push(text: string, base?: Style) {
    const style = base ? { ...base, ...this.style } : this.style;
    const line = this.lines[this.lines.length - 1],
      last = line[line.length - 1];
    if (last && JSON.stringify(last.style) === JSON.stringify(style)) last.text += text;
    else line.push({ text, style: { ...style } });
  }
  private csi(params: string, cmd: string) {
    if (cmd === 'J') {
      if (params === '2' || params === '3') this.clearScreen();
      return;
    }
    if (cmd !== 'm') return; // gerak kursor, hapus baris, dll. diabaikan
    const p = params === '' ? [0] : params.split(';').map((x) => parseInt(x || '0', 10));
    for (let k = 0; k < p.length; k++) {
      const n = p[k],
        st = this.style;
      if (n === 0) this.style = {};
      else if (n === 1) st.bold = true;
      else if (n === 2) st.dim = true;
      else if (n === 3) st.italic = true;
      else if (n === 4) st.underline = true;
      else if (n === 22) {
        st.bold = false;
        st.dim = false;
      } else if (n === 23) st.italic = false;
      else if (n === 24) st.underline = false;
      else if (n >= 30 && n <= 37) st.fg = PAL16[n - 30];
      else if (n >= 90 && n <= 97) st.fg = PAL16[n - 90 + 8];
      else if (n === 39) st.fg = undefined;
      else if (n >= 40 && n <= 47) st.bg = PAL16[n - 40];
      else if (n >= 100 && n <= 107) st.bg = PAL16[n - 100 + 8];
      else if (n === 49) st.bg = undefined;
      else if (n === 38 || n === 48) {
        let c: string | undefined;
        if (p[k + 1] === 5) {
          c = c256(p[k + 2]);
          k += 2;
        } else if (p[k + 1] === 2) {
          c = `rgb(${p[k + 2]},${p[k + 3]},${p[k + 4]})`;
          k += 4;
        }
        if (n === 38) st.fg = c;
        else st.bg = c;
      }
    }
  }
}

/** Buang kode ANSI dari teks (untuk output polos, mis. di contoh materi). */
export const stripAnsi = (t: string) =>
  t.replace(/\x1b\[[0-9;?]*[A-Za-z]/g, '').replace(/\x1bc/g, '');
