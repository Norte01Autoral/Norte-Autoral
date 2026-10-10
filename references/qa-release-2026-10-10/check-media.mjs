import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';
const reportDir = dirname(fileURLToPath(import.meta.url));
const project = resolve(reportDir, '../..');
const { chromium } = createRequire(join(project, 'package.json'))('playwright');
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe' });
const results = [];
try {
  for (const slug of ['dentista-clinica-vertice', 'aureo-arquitetura', 'confeitaria-margo', 'instituto-liminar', 'verene-odontologia', 'arquitetura-estudio-linha']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage(); const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:4173/marketing/portfolio/${slug}/index.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2300);
    async function videoState() {
      return page.evaluate(() => { const v = document.querySelector('video'); const r = v.getBoundingClientRect(); return {
        paused: v.paused, loop: v.loop, autoplay: v.autoplay, time: v.currentTime, readyState: v.readyState,
        top: r.top, bottom: r.bottom, vw: innerWidth, docw: document.documentElement.scrollWidth,
        helper: Boolean(document.querySelector('script[src="/assets/media-performance.js"]')) }; });
    }
    const initial = await videoState();
    const bounds = await page.locator('video').boundingBox();
    await page.mouse.wheel(0, Math.ceil(bounds.y + bounds.height + 350)); await page.waitForTimeout(1400);
    const offscreen = await videoState();
    await page.mouse.wheel(0, -10000); await page.waitForTimeout(1400);
    const returned = await videoState();
    results.push({ slug, initial, offscreen, returned, errors });
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(2300);
  const b = await page.locator('.mq-track').boundingBox();
  await page.mouse.wheel(0, b.y - 420); await page.waitForTimeout(1400);
  const visible = await page.locator('.mq-track').evaluate(e => ({ state: e.style.animationPlayState, transform: getComputedStyle(e).transform, top: e.getBoundingClientRect().top }));
  await page.waitForTimeout(400);
  const advanced = await page.locator('.mq-track').evaluate(e => getComputedStyle(e).transform !== e.dataset.previous);
  const second = await page.locator('.mq-track').evaluate(e => getComputedStyle(e).transform);
  await page.mouse.wheel(0, 1400); await page.waitForTimeout(1400);
  const outside = await page.locator('.mq-track').evaluate(e => ({ state: e.style.animationPlayState, top: e.getBoundingClientRect().top }));
  results.push({ slug: 'main-marquee', visible, transformAfter400ms: second, transformChanged: visible.transform !== second, outside });
  await context.close();
  await writeFile(join(reportDir, 'media-checks.json'), JSON.stringify(results, null, 2) + '\n');
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
