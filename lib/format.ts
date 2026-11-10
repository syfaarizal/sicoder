/** Format kode dengan Prettier (dimuat lazy). Python belum didukung Prettier, jadi mengembalikan null. */
export async function formatCode(
  code: string,
  lang: 'html' | 'css' | 'js' | 'py',
): Promise<string | null> {
  if (lang === 'py') return null;
  const prettier = await import('prettier/standalone');
  const plugins = await Promise.all([
    import('prettier/plugins/babel'),
    import('prettier/plugins/estree'),
    import('prettier/plugins/html'),
    import('prettier/plugins/postcss'),
  ]);
  const parser = { html: 'html', css: 'css', js: 'babel' }[lang];
  return prettier.format(code, {
    parser,
    plugins: plugins.map((p) => p.default ?? p) as never[],
    singleQuote: true,
    printWidth: 80,
  });
}
