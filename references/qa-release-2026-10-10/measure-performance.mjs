import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';
const reportDir = dirname(fileURLToPath(import.meta.url));
const project = resolve(reportDir, '../..');
const { chromium } = createRequire(join(project, 'package.json'))('playwright');
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe' });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.addInitScript(() => {
  window.perfObservations = { lcp: [], cls: [], longtasks: [] };
  ['largest-contentful-paint', 'layout-shift', 'longtask'].forEach(type => {
    try { new PerformanceObserver(list => list.getEntries().forEach(entry =>
      window.perfObservations[type === 'largest-contentful-paint' ? 'lcp' : type === 'layout-shift' ? 'cls' : 'longtasks']
        .push({ start: entry.startTime, duration: entry.duration, value: entry.value || 0,
          hadRecentInput: entry.hadRecentInput || false, url: entry.url || '', tag: entry.element?.tagName || '' })))
      .observe({ type, buffered: true }); } catch {}
  });
  window.perfDraws = 0;
  const original = WebGLRenderingContext.prototype.drawArrays;
  WebGLRenderingContext.prototype.drawArrays = function (...args) { window.perfDraws++; return original.apply(this, args); };
});
try {
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);
  const after = await page.evaluate(() => ({
    nav: performance.getEntriesByType('navigation')[0].toJSON(),
    resources: performance.getEntriesByType('resource').map(entry => ({ name: entry.name.replace(location.origin, ''),
      bytes: entry.transferSize, encoded: entry.encodedBodySize, duration: entry.duration })),
    observations: window.perfObservations, canvas: [...document.querySelectorAll('canvas')].map(element => ({ id: element.id, w: element.width, h: element.height })),
    viewport: innerWidth, documentWidth: document.documentElement.scrollWidth,
    logo: { src: document.querySelector('.brand-lockup img').getAttribute('src'), naturalWidth: document.querySelector('.brand-lockup img').naturalWidth }, errors: []
  }));
  after.errors = errors;
  await writeFile(join(reportDir, 'performance-after.json'), JSON.stringify(after, null, 2) + '\n');
  const states = [];
  async function count(label) {
    const before = await page.evaluate(() => window.perfDraws);
    await page.waitForTimeout(600);
    const result = await page.evaluate(() => ({ draws: window.perfDraws, heroTop: document.getElementById('topo').getBoundingClientRect().top,
      marquee: document.querySelector('.mq-track').style.animationPlayState }));
    states.push({ label, delta: result.draws - before, ...result });
  }
  await count('visible hero');
  await page.mouse.wheel(0, 1400); await page.waitForTimeout(1800);
  await count('hero outside viewport');
  await page.evaluate(() => { window.perfHidden = true; Object.defineProperty(document, 'hidden', { configurable: true, get: () => window.perfHidden }); document.dispatchEvent(new Event('visibilitychange')); });
  await count('synthetic hidden outside hero');
  await page.evaluate(() => { window.perfHidden = false; document.dispatchEvent(new Event('visibilitychange')); });
  await count('synthetic visible outside hero');
  await page.mouse.wheel(0, -2000); await page.waitForTimeout(1800);
  await count('return to hero');
  await page.evaluate(() => { window.perfHidden = true; document.dispatchEvent(new Event('visibilitychange')); });
  await count('synthetic hidden on hero');
  await page.evaluate(() => { window.perfHidden = false; document.dispatchEvent(new Event('visibilitychange')); });
  await count('synthetic visible on hero');
  await writeFile(join(reportDir, 'media-states.json'), JSON.stringify(states, null, 2) + '\n');
  console.log(JSON.stringify({ encodedAssetsBytes: after.resources.reduce((sum, entry) => sum + entry.encoded, 0),
    htmlBytes: after.nav.encodedBodySize, logo: after.logo, errors, states }, null, 2));
} finally { await browser.close(); }
