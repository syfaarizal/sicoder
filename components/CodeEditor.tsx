'use client';
import { useEffect, useRef } from 'react';
import { EditorSelection, EditorState, Prec } from '@codemirror/state';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  drawSelection,
} from '@codemirror/view';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
  toggleLineComment,
} from '@codemirror/commands';
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
  type CompletionContext,
  type CompletionResult,
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
import { html, htmlCompletionSource } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { vim } from '@replit/codemirror-vim';
import { emacs } from '@replit/codemirror-emacs';
import { FONTS, getTheme } from '@/lib/themes';
import type { Settings } from '@/lib/usePersistent';

export type EditorLang = 'html' | 'css' | 'js' | 'py';
const langs = { html: () => html(), css: () => css(), js: () => javascript(), py: () => python() };
const htmlTags = [
  'a',
  'article',
  'aside',
  'button',
  'div',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'img',
  'input',
  'label',
  'li',
  'main',
  'nav',
  'ol',
  'p',
  'section',
  'span',
  'ul',
];
const voidHtmlTags = new Set(['img', 'input']);

// Saat pengguna mulai mengetik nama tag pada baris kosong, sarankan elemen HTML
// dan sisipkan pasangan tag dengan kursor di bagian dalam.
const bareHtmlTagCompletion = (context: CompletionContext): CompletionResult | null => {
  if (context.explicit) return null;
  const word = context.matchBefore(/[\w-]*/);
  if (!word || word.from === word.to) return null;
  const line = context.state.doc.lineAt(context.pos);
  if (
    line.text.slice(0, word.from - line.from).trim() ||
    line.text.slice(context.pos - line.from).trim()
  )
    return null;
  const prefix = word.text.toLowerCase();
  const options = htmlTags
    .filter((tag) => tag.startsWith(prefix))
    .map((tag) => ({
      label: tag,
      detail: voidHtmlTags.has(tag) ? 'Elemen HTML' : 'Elemen HTML berpasangan',
      type: 'keyword',
      apply: (view: EditorView, _completion: unknown, from: number, to: number) => {
        const open = `<${tag}>`;
        const insert = voidHtmlTags.has(tag) ? open : open + `</${tag}>`;
        view.dispatch({
          changes: { from, to, insert },
          selection: { anchor: from + open.length },
        });
      },
    }));
  return options.length ? { from: word.from, options, validFor: /^[\w-]*$/ } : null;
};

function selectNextOccurrence(view: EditorView): boolean {
  const { state } = view;
  const main = state.selection.main;
  let ranges = [...state.selection.ranges];
  let query = main.empty ? '' : state.sliceDoc(main.from, main.to);
  if (!query) {
    const word = state.wordAt(main.head);
    if (!word) return true;
    query = state.sliceDoc(word.from, word.to);
    ranges = [EditorSelection.range(word.from, word.to)];
  }

  const find = (start: number, end: number) => {
    const doc = state.doc.toString();
    let at = doc.indexOf(query, start);
    while (at >= 0 && at + query.length <= end) {
      const overlaps = ranges.some((range) => at < range.to && at + query.length > range.from);
      if (!overlaps) return at;
      at = doc.indexOf(query, at + query.length);
    }
    return -1;
  };
  let found = find(main.to, state.doc.length);
  if (found < 0) found = find(0, main.from);
  if (found < 0) {
    if (ranges.length !== state.selection.ranges.length)
      view.dispatch({ selection: EditorSelection.create(ranges) });
    return true;
  }

  const added = EditorSelection.range(found, found + query.length);
  ranges.push(added);
  ranges.sort((a, b) => a.from - b.from);
  view.dispatch({ selection: EditorSelection.create(ranges, ranges.indexOf(added)) });
  return true;
}

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
          EditorState.allowMultipleSelections.of(true),
          drawSelection(),
          indentOnInput(),
          bracketMatching(),
          highlightActiveLine(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          s.closeBrackets ? closeBrackets() : [],
          autocompletion({
            activateOnTyping: s.suggestions,
            ...(props.lang === 'html'
              ? { override: [bareHtmlTagCompletion, htmlCompletionSource] }
              : {}),
          }), // Ctrl+Space tetap bisa dipakai saat dimatikan
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
              { key: 'Mod-d', run: selectNextOccurrence },
              { key: 'Mod-/', run: toggleLineComment },
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
