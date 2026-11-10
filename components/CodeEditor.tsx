'use client';
import { useEffect, useRef } from 'react';
import { EditorState, Prec } from '@codemirror/state';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  drawSelection,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete';
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  indentUnit,
  syntaxHighlighting,
} from '@codemirror/language';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { vim } from '@replit/codemirror-vim';
import { emacs } from '@replit/codemirror-emacs';
import { FONTS, getTheme } from '@/lib/themes';
import type { Settings } from '@/lib/usePersistent';

export type EditorLang = 'html' | 'css' | 'js' | 'py';
const langs = { html: () => html(), css: () => css(), js: () => javascript(), py: () => python() };

interface Props {
  value: string;
  lang: EditorLang;
  label: string;
  settings: Settings;
  readOnly?: boolean;
  onChange?: (v: string) => void;
  onRun?: () => void;
  goto?: { line: number; n: number } | null;
  onFormat?: () => void;
}

export default function CodeEditor(props: Props) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);
  const latest = useRef(props);
  latest.current = props;
  const s = props.settings;
  const cfgKey = [
    s.fontSize,
    s.fontFamily,
    s.lineHeight,
    s.theme,
    s.keymap,
    s.suggestions,
    s.wrap,
    s.lineNumbers,
    s.closeBrackets,
    s.tabSize,
    s.indentSpaces,
  ].join('|');

  useEffect(() => {
    const t = getTheme(s.theme);
    const v = new EditorView({
      parent: host.current!,
      state: EditorState.create({
        doc: latest.current.value,
        extensions: [
          s.keymap === 'vim' ? vim() : s.keymap === 'emacs' ? emacs() : [],
          s.lineNumbers ? [lineNumbers(), highlightActiveLineGutter(), foldGutter()] : [],
          history(),
          drawSelection(),
          indentOnInput(),
          bracketMatching(),
          highlightActiveLine(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          s.closeBrackets ? closeBrackets() : [],
          autocompletion({ activateOnTyping: s.suggestions }), // Ctrl+Space tetap bisa dipakai saat dimatikan
          EditorState.tabSize.of(s.tabSize),
          indentUnit.of(s.indentSpaces ? ' '.repeat(s.tabSize) : '\t'),
          langs[props.lang](),
          t.ext,
          Prec.highest(
            keymap.of([
              {
                key: 'Mod-Enter',
                run: () => {
                  latest.current.onRun?.();
                  return true;
                },
              },
              {
                key: 'Shift-Alt-f',
                run: () => {
                  latest.current.onFormat?.();
                  return true;
                },
              },
            ]),
          ),
          keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
            indentWithTab,
          ]),
          EditorView.updateListener.of((u) => {
            if (u.docChanged) latest.current.onChange?.(u.state.doc.toString());
          }),
          EditorView.contentAttributes.of({ 'aria-label': props.label }),
          ...(s.wrap ? [EditorView.lineWrapping] : []),
          ...(props.readOnly ? [EditorState.readOnly.of(true), EditorView.editable.of(false)] : []),
          Prec.highest(
            EditorView.theme({
              '&': { height: '100%', fontSize: s.fontSize + 'px', backgroundColor: 'var(--cbg)' },
              '.cm-gutters': { backgroundColor: 'var(--cbg)', border: 'none' },
              '.cm-scroller': { fontFamily: FONTS[s.fontFamily] },
              '.cm-content': { lineHeight: String(s.lineHeight) },
            }),
          ),
        ],
      }),
    });
    view.current = v;
    return () => v.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.lang, props.label, props.readOnly, cfgKey]);

  // Sinkronkan jika kode diganti dari luar (snippet, reset, format)
  useEffect(() => {
    const v = view.current;
    if (v && v.state.doc.toString() !== props.value)
      v.dispatch({ changes: { from: 0, to: v.state.doc.length, insert: props.value } });
  }, [props.value]);

  // Lompat ke baris tertentu (mis. dari daftar Problems)
  useEffect(() => {
    const v = view.current;
    if (!v || !props.goto) return;
    const l = v.state.doc.line(Math.min(Math.max(props.goto.line, 1), v.state.doc.lines));
    v.dispatch({
      selection: { anchor: l.from },
      effects: EditorView.scrollIntoView(l.from, { y: 'center' }),
    });
    v.focus();
  }, [props.goto]);

  return <div ref={host} className="h-full min-h-0 flex-1 overflow-hidden" />;
}
