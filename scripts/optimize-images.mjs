/**
 * Creates delivery derivatives; original image assets stay intact.
 * npm's existing Playwright dev dependency and a local Chromium are required.
 * HOSTINGER receives only the generated static assets, never this tooling.
 */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = join(project, 'public');
const executablePath = process.env.CHROMIUM_EXECUTABLE || undefined;
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
const page = await browser.newPage();
const html = await readFile(join(publicRoot, 'index.html'), 'utf8');
const sources = [...new Set([...html.matchAll(/<img\b[^>]*\bsrc="([^"]+\.(?:jpe?g|webp))"/gi)]
  .map(match => match[1].replace(/\.webp$/i, '.jpg')))];
const records = [];

async function derivative(src, target, { width, type = 'image/webp', quality = 0.9 } = {}) {
  const sourcePath = join(publicRoot, src.replace(/^\//, ''));
  const input = await readFile(sourcePath);
  const mime = /\.png$/i.test(src) ? 'image/png' : 'image/jpeg';
  const result = await page.evaluate(async ({ data, width, type, quality }) => {
    const image = new Image(); image.src = data; await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = width || image.naturalWidth;
    canvas.height = Math.round(image.naturalHeight * canvas.width / image.naturalWidth);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return { data: canvas.toDataURL(type, quality).split(',')[1], width: canvas.width, height: canvas.height };
  }, { data: `data:${mime};base64,${input.toString('base64')}`, width, type, quality });
  const output = Buffer.from(result.data, 'base64');
  const outputPath = join(publicRoot, target.replace(/^\//, ''));
  if (output.length < input.length) {
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, output);
  }
  records.push({ source: src, target, originalBytes: input.length, optimizedBytes: output.length,
    width: result.width, height: result.height, quality, useDerivative: output.length < input.length });
}

try {
  await derivative('/assets/norte-autoral/logo-n.png', '/assets/norte-autoral/logo-n-128.png', { width: 128, type: 'image/png', quality: 1 });
  for (const src of sources) {
    try { await stat(join(publicRoot, src.replace(/^\//, ''))); } catch { continue; }
    await derivative(src, src.replace(/\.jpe?g$/i, '.webp'));
  }
  const reportDir = join(project, 'references', 'qa-release-2026-10-10');
  await mkdir(reportDir, { recursive: true });
  await writeFile(join(reportDir, 'image-optimization.json'), JSON.stringify(records, null, 2) + '\n');
  const selected = records.filter(record => record.useDerivative);
  console.log(JSON.stringify({ generated: records.length, selected: selected.length,
    originalBytes: selected.reduce((sum, item) => sum + item.originalBytes, 0),
    optimizedBytes: selected.reduce((sum, item) => sum + item.optimizedBytes, 0) }, null, 2));
} finally { await browser.close(); }
