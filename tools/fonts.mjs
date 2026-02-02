// Turns the TTF originals in assets-original/fonts/ (OFL, Google Fonts) into
// woff2 and writes them to public/fonts/.
import { mkdir, readFile, writeFile } from 'node:fs/promises';

import { compress } from 'wawoff2';

const FAMILY = 'TitilliumWeb';
const STYLES = ['Regular', 'Bold', 'Italic'];

const source =
  process.argv[2] ??
  new URL('../assets-original/fonts/', import.meta.url).pathname;
const target = new URL('../public/fonts/', import.meta.url).pathname;

await mkdir(target, { recursive: true });

for (const style of STYLES) {
  const ttf = await readFile(`${source}/${FAMILY}-${style}.ttf`);
  const woff2 = await compress(ttf);
  await writeFile(`${target}${FAMILY}-${style}.woff2`, woff2);
  console.log(`${style}: ${ttf.length} -> ${woff2.length} bytes`);
}
