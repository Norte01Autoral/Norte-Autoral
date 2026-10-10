import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { chromium } from 'playwright';

const qaRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(qaRoot, '../..');
const publicRoot = resolve(projectRoot, 'public');
const output = resolve(projectRoot, 'public/assets/norte-autoral/og-norte-autoral.jpg');
const html = await readFile(resolve(qaRoot, 'og-preview.html'), 'utf8');
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe' });
try {
  const context = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  const failedRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
  await page.route('http://127.0.0.1:4173/**', async route => {
    const pathname = decodeURIComponent(new URL(route.request().url()).pathname);
    if (pathname === '/__og-preview') return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: html });
    const file = resolve(publicRoot, '.' + pathname);
    if (!file.startsWith(publicRoot + '\\')) return route.fulfill({ status: 403, body: 'Forbidden' });
    const contentType = file.endsWith('.css') ? 'text/css' : file.endsWith('.woff2') ? 'font/woff2' : file.endsWith('.woff') ? 'font/woff' : file.endsWith('.png') ? 'image/png' : 'application/octet-stream';
    try {
      return await route.fulfill({ status: 200, contentType, body: await readFile(file) });
    } catch {
      return route.fulfill({ status: 404, body: 'Not found' });
    }
  });
  await page.goto('http://127.0.0.1:4173/__og-preview', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const fit = await page.evaluate(() => ({
    viewport: { width: innerWidth, height: innerHeight },
    scroll: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
    images: [...document.images].map(image => ({ src: image.getAttribute('src'), width: image.naturalWidth, height: image.naturalHeight, loaded: image.complete && image.naturalWidth > 0 })),
    boxes: [...document.querySelectorAll('.brand,.eyebrow,h1,.services,.footer')].map(element => {
      const rect = element.getBoundingClientRect();
      return { selector: element.className || element.tagName, x: rect.x, y: rect.y, width: rect.width, height: rect.height, right: rect.right, bottom: rect.bottom };
    }),
    fontsReady: [...document.fonts].some(font => font.family.includes('Space Grotesk') && font.status === 'loaded'),
  }));
  await page.screenshot({ path: output, type: 'jpeg', quality: 88, scale: 'css' });
  const result = { file: output, errors, failedRequests, ...fit };
  await writeFile(resolve(qaRoot, 'OG-IMAGE-QA.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result, null, 2));
  if (errors.length || failedRequests.length || !fit.fontsReady || fit.images.some(image => !image.loaded) || fit.boxes.some(box => box.x < 0 || box.y < 0 || box.right > 1200 || box.bottom > 630)) throw new Error('A imagem social contém recurso inválido ou conteúdo fora do quadro.');
} finally {
  await browser.close();
}
