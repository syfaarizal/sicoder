"""Pengumpul banyak kesalahan sintaks Python.

CPython hanya melaporkan satu SyntaxError pertama lalu berhenti, padahal panel
Problems perlu menampilkan semua baris yang bermasalah sekaligus. Strateginya:
compile() berulang pada salinan kode yang baris errornya diganti, sehingga
error berikutnya bisa ditemukan. Kode asli tidak pernah diubah; penggantian
hanya untuk keperluan analisis.

Dijalankan di dalam Pyodide (public/py-worker.js).
"""

import json

MAX_ERRORS = 40
_TAB = 8


def _indent_of(line):
    stripped = line.lstrip()
    return len(line) - len(stripped)


def _is_blank(line):
    return not line.strip()


def _continuation_end(lines, i):
    """Batas akhir (exclusive) baris lanjutan milik baris ke-i.

    Baris berikutnya yang lebih indentatif masih bagian dari statement yang
    sama, jadi ikut diganti supaya tidak menyisakan error turunan.
    """
    base = _indent_of(lines[i])
    j = i + 1
    n = len(lines)
    while j < n:
        s = lines[j]
        if _is_blank(s):
            j += 1
            continue
        if _indent_of(s) > base:
            j += 1
            continue
        break
    return j


def _lint_one(name, content):
    lines = content.replace('\r\n', '\n').split('\n')
    n = len(lines)
    repl = [None] * n  # None = pakai baris asli
    problems = []
    seen = set()

    for _ in range(MAX_ERRORS + 5):
        if len(problems) >= MAX_ERRORS:
            break
        src = '\n'.join(repl[i] if repl[i] is not None else lines[i] for i in range(n))
        try:
            compile(src, name, 'exec')
            break
        except SyntaxError as e:
            ln = e.lineno
            msg = getattr(e, 'msg', None) or 'invalid syntax'
            kind = type(e).__name__
            if not ln or ln < 1 or ln > n:
                key = (0, msg)
                if key not in seen:
                    seen.add(key)
                    problems.append((None, kind + ': ' + msg))
                break

            i = ln - 1
            key = (ln, msg)
            if key in seen:
                # error yang sama muncul lagi: masking sebelumnya tidak menyelesaikannya
                break
            seen.add(key)

            # "expected an indented block" menunjuk ke baris yang harus punya isi,
            # bukan ke isi blok itu sendiri. Baris itu jadi puncak masalah, dan
            # blok di bawahnya dibuang supaya tidak dilaporkan berulang.
            if msg.startswith('expected an indented block'):
                problems.append((ln, kind + ': ' + msg))
                head = i - 1
                while head >= 0 and not lines[head].strip():
                    head -= 1
                if head >= 0:
                    for j in range(head + 1, _continuation_end(lines, head)):
                        repl[j] = ''
                    repl[head] = ' ' * _indent_of(lines[head]) + 'pass'
                break

            problems.append((ln, kind + ': ' + msg))

            end = _continuation_end(lines, i)
            if kind in ('IndentationError', 'TabError'):
                # baris ini karena indentasinya salah; menghapusnya paling aman
                repl[i] = ''
                for j in range(i + 1, end):
                    repl[j] = ''
            else:
                # 'pass' menjaga blok tetap punya isi, jadi tidak memicu
                # error turunan "expected an indented block"
                repl[i] = ' ' * _indent_of(lines[i]) + 'pass'
                for j in range(i + 1, end):
                    repl[j] = ''

    return problems


def lint_files(files):
    """files: [{name, content}] -> [{file, line, message}]"""
    out = []
    for f in files:
        name = f.get('name') or 'main.py'
        content = f.get('content') or ''
        for line, message in _lint_one(name, content):
            out.append({'file': name, 'line': line, 'message': message})
    return out


def lint_files_json(payload):
    """Antarmuka untuk worker: JSON masuk, JSON keluar."""
    return json.dumps(lint_files(json.loads(payload)))
