import type { Extension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import {
  dracula,
  githubDark,
  githubLight,
  gruvboxDark,
  gruvboxLight,
  solarizedDark,
  solarizedLight,
  materialDark,
  materialLight,
  xcodeDark,
  xcodeLight,
  tokyoNight,
  nord,
  vscodeDark,
  vscodeLight,
  monokai,
  eclipse,
  quietlight,
} from '@uiw/codemirror-themes-all';
import type { CSSProperties } from 'react';

export interface ThemeDef {
  id: string;
  label: string;
  dark: boolean;
  bg: string;
  fg: string;
  ext: Extension;
}

// bg/fg dipakai untuk mewarnai toolbar dan terminal agar cocok dengan tema editor.
export const THEMES: ThemeDef[] = [
  { id: 'oneDark', label: 'One Dark', dark: true, bg: '#282c34', fg: '#abb2bf', ext: oneDark },
  { id: 'dracula', label: 'Dracula', dark: true, bg: '#282a36', fg: '#f8f8f2', ext: dracula },
  {
    id: 'githubDark',
    label: 'GitHub Dark',
    dark: true,
    bg: '#0d1117',
    fg: '#c9d1d9',
    ext: githubDark,
  },
  {
    id: 'gruvboxDark',
    label: 'Gruvbox Dark',
    dark: true,
    bg: '#282828',
    fg: '#ebdbb2',
    ext: gruvboxDark,
  },
  {
    id: 'solarizedDark',
    label: 'Solarized Dark',
    dark: true,
    bg: '#002b36',
    fg: '#93a1a1',
    ext: solarizedDark,
  },
  {
    id: 'materialDark',
    label: 'Material Dark',
    dark: true,
    bg: '#263238',
    fg: '#eeffff',
    ext: materialDark,
  },
  {
    id: 'xcodeDark',
    label: 'Xcode Dark',
    dark: true,
    bg: '#292a30',
    fg: '#ffffff',
    ext: xcodeDark,
  },
  {
    id: 'tokyoNight',
    label: 'Tokyo Night',
    dark: true,
    bg: '#1a1b26',
    fg: '#a9b1d6',
    ext: tokyoNight,
  },
  { id: 'nord', label: 'Nord', dark: true, bg: '#2e3440', fg: '#d8dee9', ext: nord },
  {
    id: 'vscodeDark',
    label: 'VS Code Dark',
    dark: true,
    bg: '#1e1e1e',
    fg: '#d4d4d4',
    ext: vscodeDark,
  },
  { id: 'monokai', label: 'Monokai', dark: true, bg: '#272822', fg: '#f8f8f2', ext: monokai },
  {
    id: 'githubLight',
    label: 'GitHub Light',
    dark: false,
    bg: '#ffffff',
    fg: '#24292f',
    ext: githubLight,
  },
  {
    id: 'gruvboxLight',
    label: 'Gruvbox Light',
    dark: false,
    bg: '#fbf1c7',
    fg: '#3c3836',
    ext: gruvboxLight,
  },
  {
    id: 'solarizedLight',
    label: 'Solarized Light',
    dark: false,
    bg: '#fdf6e3',
    fg: '#586e75',
    ext: solarizedLight,
  },
  {
    id: 'materialLight',
    label: 'Material Light',
    dark: false,
    bg: '#fafafa',
    fg: '#546e7a',
    ext: materialLight,
  },
  {
    id: 'xcodeLight',
    label: 'Xcode Light',
    dark: false,
    bg: '#ffffff',
    fg: '#262626',
    ext: xcodeLight,
  },
  { id: 'eclipse', label: 'Eclipse', dark: false, bg: '#ffffff', fg: '#000000', ext: eclipse },
  {
    id: 'vscodeLight',
    label: 'VS Code Light',
    dark: false,
    bg: '#ffffff',
    fg: '#383a42',
    ext: vscodeLight,
  },
  {
    id: 'quietlight',
    label: 'Quiet Light',
    dark: false,
    bg: '#f5f5f5',
    fg: '#333333',
    ext: quietlight,
  },
];

export const getTheme = (id: string) => THEMES.find((t) => t.id === id) ?? THEMES[0];
export const themeVars = (t: { bg: string; fg: string }) =>
  ({ '--cbg': t.bg, '--cfg': t.fg }) as CSSProperties;
export const TERMINAL_DEFAULT = { bg: '#1e2430', fg: '#e6eaf2' };

export const FONTS = {
  default: "'JetBrains Mono', ui-monospace, Menlo, monospace",
  system: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  courier: "'Courier New', Courier, monospace",
} as const;
export const FONT_LABELS: Record<keyof typeof FONTS, string> = {
  default: 'Default (JetBrains Mono)',
  system: 'System',
  courier: 'Courier',
};
