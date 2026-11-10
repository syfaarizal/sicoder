'use client';
import { useEffect, useState } from 'react';

/** State yang disimpan di localStorage (per browser). Aman untuk SSR: nilai awal dipakai sampai `ready`. */
export function usePersistent<T extends object>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue({ ...initial, ...JSON.parse(raw) });
    } catch {}
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, ready]);
  return [value, setValue, ready] as const;
}

export type Layout = 'tabbed' | 'stacked' | 'side';
export interface Settings {
  fontSize: number;
  fontFamily: 'default' | 'system' | 'courier';
  lineHeight: number;
  layout: Layout; // Web workspace
  pyLayout: Layout; // Python workspace
  theme: string;
  matchTerminal: boolean;
  keymap: 'default' | 'vim' | 'emacs';
  suggestions: boolean;
  autoRun: boolean;
  wrap: boolean;
  lineNumbers: boolean;
  closeBrackets: boolean;
  tabSize: number;
  indentSpaces: boolean;
}
export const DEFAULT_SETTINGS: Settings = {
  fontSize: 15,
  fontFamily: 'default',
  lineHeight: 1.5,
  layout: 'side',
  pyLayout: 'stacked',
  theme: 'oneDark',
  matchTerminal: true,
  keymap: 'default',
  suggestions: true,
  autoRun: false,
  wrap: true,
  lineNumbers: true,
  closeBrackets: true,
  tabSize: 2,
  indentSpaces: true,
};
export const useSettings = () => usePersistent<Settings>('sicoder:settings', DEFAULT_SETTINGS);
