// Wandelt die TTF-Originale aus assets-original/fonts/ (OFL, Google Fonts) in
// woff2 um und legt sie unter public/fonts/ ab.
import { mkdir, readFile, writeFile } from 'node:fs/promises';

import { compress } from 'wawoff2';

const FAMILIE = 'TitilliumWeb';
const SCHNITTE = ['Regular', 'Bold', 'Italic'];

const quelle =
  process.argv[2] ??
  new URL('../assets-original/fonts/', import.meta.url).pathname;
const ziel = new URL('../public/fonts/', import.meta.url).pathname;

await mkdir(ziel, { recursive: true });

for (const schnitt of SCHNITTE) {
  const ttf = await readFile(`${quelle}/${FAMILIE}-${schnitt}.ttf`);
  const woff2 = await compress(ttf);
  await writeFile(`${ziel}${FAMILIE}-${schnitt}.woff2`, woff2);
  console.log(`${schnitt}: ${ttf.length} -> ${woff2.length} Byte`);
}
