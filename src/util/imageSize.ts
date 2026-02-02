import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export type ImageSize = {
  width: number;
  height: number;
};

// Intrinsic size of an asset in public/, read at build time so every <img> can
// declare width and height and the browser can reserve the box.
const cache = new Map<string, ImageSize | null>();

const readPng = (buffer: Buffer): ImageSize | null => {
  // Signature, then the IHDR chunk carries width and height as big-endian u32
  if (buffer.length < 24 || buffer.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
};

const readJpeg = (buffer: Buffer): ImageSize | null => {
  if (buffer.length < 4 || buffer.readUInt16BE(0) !== 0xffd8) return null;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) return null;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    // SOF0-SOF15, minus the four markers in that range that carry no frame
    const isFrame =
      marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isFrame) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }
  return null;
};

const readSvg = (buffer: Buffer): ImageSize | null => {
  const head = buffer.subarray(0, 2048).toString('utf-8');
  const viewBox = head.match(
    /viewBox=["']\s*[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)/
  );
  if (viewBox) {
    return { width: Math.round(+viewBox[1]), height: Math.round(+viewBox[2]) };
  }
  const width = head.match(/\bwidth=["'](\d+)/);
  const height = head.match(/\bheight=["'](\d+)/);
  return width && height ? { width: +width[1], height: +height[1] } : null;
};

export const getImageSize = (publicPath: string): ImageSize | null => {
  const cached = cache.get(publicPath);
  if (cached !== undefined) return cached;

  let size: ImageSize | null = null;
  try {
    const buffer = readFileSync(join('public', publicPath.replace(/^\//, '')));
    if (publicPath.endsWith('.svg')) size = readSvg(buffer);
    else if (/\.jpe?g$/.test(publicPath)) size = readJpeg(buffer);
    else size = readPng(buffer);
  } catch {
    size = null;
  }

  if (!size) console.warn(`[imageSize] no dimensions for ${publicPath}`);
  cache.set(publicPath, size);
  return size;
};
