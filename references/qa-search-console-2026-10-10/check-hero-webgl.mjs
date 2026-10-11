// Execute the real inline hero script with controlled GPU limits. No browser or publication.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const evidenceRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(evidenceRoot, '../..');
const previousPath = path.resolve(projectRoot, '../clone-v1-netlify/index.html');
const currentPath = path.join(projectRoot, 'public/index.html');
const previousHtml = fs.readFileSync(previousPath, 'utf8');
const currentHtml = fs.readFileSync(currentPath, 'utf8');
const heroSource = html => {
  const start = html.indexOf('/* ============ HERO: o feixe (WebGL) ============');
  assert(start >= 0);
  return html.slice(start, html.indexOf('</script>', start)).trim();
};
const previous = heroSource(previousHtml), current = heroSource(currentHtml);
const sha256 = text => crypto.createHash('sha256').update(text).digest('hex').toUpperCase();

function run(source, options = {}) {
  const o = { width: 1440, height: 900, dpr: 1, texture: 8192, viewport: [8192, 8192], ...options };
  const classes = () => {
    const values = new Set();
    return { add: (...items) => items.forEach(item => values.add(item)), remove: (...items) => items.forEach(item => values.delete(item)), toggle: (item, force) => { if (force) values.add(item); else values.delete(item); }, contains: item => values.has(item), values };
  };
  const makeElement = () => ({ classList: classes(), style: {}, events: {}, addEventListener(type, callback) { this.events[type] = callback; } });
  const hero = makeElement(), cursor = makeElement(), canvas = makeElement();
  const state = { uploads: [], uniforms: [], frames: 0, rafRequests: 0, lost: Boolean(o.lost), observers: {}, fontCallbacks: [], pending: new Map(), nextId: 1 };
  hero.getBoundingClientRect = () => ({ width: o.width, height: o.height, left: 0, top: 0 });
  const wordRect = index => ({ left: 80, top: 150 + index * 180, width: 550 - index * 40, height: 160 });
  const words = [0, 1, 2].map(index => ({ querySelector(selector) {
    return selector === '.gt' ? { textContent: ['Sites', 'Ads', 'IA'][index], getBoundingClientRect: () => wordRect(index) }
      : { getBoundingClientRect: () => ({ top: 280 + index * 180 }) };
  } }));
  hero.querySelectorAll = () => words;
  const anchor = { getBoundingClientRect: () => ({ left: 800, top: 150, width: 120, height: 120 }) };
  const ctx2d = { filter: 'none', fillRect() {}, fillText() {}, measureText: text => ({ width: text.length * 70 }) };
  const gl = {
    MAX_TEXTURE_SIZE: 3379, MAX_VIEWPORT_DIMS: 3386, NO_ERROR: 0, COMPILE_STATUS: 1, LINK_STATUS: 2,
    createShader: () => ({}), shaderSource() {}, compileShader() {}, getShaderParameter: () => true,
    createProgram: () => ({}), attachShader() {}, linkProgram() {}, getProgramParameter: () => true,
    useProgram() {}, createBuffer: () => ({}), bindBuffer() {}, bufferData() {}, getAttribLocation: () => 0,
    enableVertexAttribArray() {}, vertexAttribPointer() {}, getUniformLocation: (program, name) => name,
    createTexture: () => ({}), bindTexture() {}, texParameteri() {}, uniform1i() {}, viewport() {},
    getParameter: key => key === 3379 ? o.texture : o.viewport,
    isContextLost: () => state.lost,
    get drawingBufferWidth() { return o.bufferMismatch ? canvas.width - 1 : canvas.width; },
    get drawingBufferHeight() { return canvas.height; },
    getError: () => o.uploadError || 0,
    texImage2D(...args) {
      if (o.uploadThrows) throw new Error('Simulated texture allocation exception');
      const mask = args.at(-1);
      if (mask.width > o.texture || mask.height > o.texture) throw new Error('texImage2D: width or height out of range');
      state.uploads.push([mask.width, mask.height]);
    },
    uniform2f: (...args) => state.uniforms.push(args), uniform1f: (...args) => state.uniforms.push(args),
    drawArrays: () => state.frames++
  };
  canvas.getContext = () => gl;
  const document = makeElement();
  document.hidden = false;
  document.getElementById = id => ({ topo: hero, beam: canvas, cursor, 'prism-anchor': anchor })[id];
  document.createElement = () => ({ getContext: () => o.noMask ? null : ctx2d });
  document.fonts = { ready: { then: callback => state.fontCallbacks.push(callback) }, addEventListener: (name, callback) => state.fontCallbacks.push(callback) };
  const environment = {
    window: { devicePixelRatio: o.dpr, innerWidth: o.width, matchMedia: query => ({ matches: query === '(pointer:fine)' }), addEventListener() {} },
    document, location: { search: '' }, performance: { now: () => 0 },
    getComputedStyle: () => ({ fontWeight: '500', fontSize: '160px', fontFamily: 'sans-serif', letterSpacing: '-8px' }),
    setTimeout() {}, console: { error() {} },
    requestAnimationFrame: callback => { const id = state.nextId++; state.pending.set(id, callback); state.rafRequests++; return id; },
    cancelAnimationFrame: id => state.pending.delete(id),
    ResizeObserver: class { constructor(callback) { state.observers.resize = callback; } observe() {} },
    IntersectionObserver: class { constructor(callback) { state.observers.intersection = callback; } observe() {} }
  };
  environment.window.ResizeObserver = environment.ResizeObserver;
  environment.window.IntersectionObserver = environment.IntersectionObserver;
  vm.runInNewContext(source, environment, { timeout: 1000 });
  return {
    state, hero, cursor, canvas,
    intersect: () => state.observers.intersection([{ isIntersecting: true }]),
    resize: () => state.observers.resize(),
    frame: now => { const [id, callback] = state.pending.entries().next().value || []; if (callback) { state.pending.delete(id); callback(now); } },
    lose: () => { state.lost = true; canvas.events.webglcontextlost({ preventDefault() {} }); }
  };
}

const results = [];
function check(name, callback) { callback(); results.push({ name, passed: true }); }
for (const input of [{ width: 1440, height: 900, dpr: 1 }, { width: 1440, height: 900, dpr: 2 }, { width: 390, height: 844, dpr: 3 }]) {
  check(`normal ${input.width}x${input.height} DPR ${input.dpr}: dimensions and animation uniforms unchanged`, () => {
    const before = run(previous, input), after = run(current, input);
    assert.deepEqual(after.state.uploads, before.state.uploads);
    before.intersect(); after.intersect();
    for (const now of [0, 500, 1200, 1600, 3200]) { before.frame(now); after.frame(now); }
    assert.deepEqual(after.state.uniforms, before.state.uniforms);
    assert.equal(after.state.frames, before.state.frames);
    assert(after.hero.classList.contains('gl'));
    assert(!after.hero.classList.contains('nogl'));
  });
}
for (const input of [
  { name: 'very tall viewport', width: 412, height: 24000, dpr: 1, texture: 8192, viewport: [8192, 8192] },
  { name: 'low texture limit', width: 1440, height: 900, dpr: 2, texture: 1024, viewport: [2048, 2048] },
  { name: 'asymmetric viewport limit', width: 1440, height: 900, dpr: 2, texture: 8192, viewport: [2048, 1024] }
]) {
  check(input.name, () => {
    const after = run(current, input);
    const [width, height] = after.state.uploads[0];
    assert(width <= Math.min(input.texture, input.viewport[0]));
    assert(height <= Math.min(input.texture, input.viewport[1]));
    assert(Math.abs(width / input.width - height / input.height) <= 1 / input.width + 1 / input.height);
    assert(after.hero.classList.contains('gl'));
    assert(!after.hero.classList.contains('nogl'));
  });
}
check('reproduces previous tall-viewport texture failure', () => {
  assert.throws(() => run(previous, { width: 412, height: 24000 }), /width or height out of range/);
});
for (const [name, options] of [
  ['no 2D mask context', { noMask: true }], ['lost GL before layout', { lost: true }],
  ['zero hero height', { height: 0 }], ['nonfinite hero height', { height: Infinity }],
  ['invalid GPU limit', { texture: NaN }], ['missing viewport limits', { viewport: null }],
  ['texture GL error', { uploadError: 1282 }], ['texture allocation exception', { uploadThrows: true }],
  ['drawing buffer allocation mismatch', { bufferMismatch: true }]
]) {
  check(name, () => {
    const after = run(current, options);
    assert(after.hero.classList.contains('nogl'));
    assert(after.hero.classList.contains('on'));
    assert(!after.hero.classList.contains('gl'));
    assert(!after.hero.classList.contains('cur'));
    after.intersect(); after.resize(); after.state.fontCallbacks.forEach(callback => callback());
    after.hero.events.pointerenter?.();
    assert.equal(after.state.rafRequests, 0);
    assert(!after.cursor.classList.contains('show'));
  });
}
check('context loss stops active RAF and cannot restart from observer/fonts/pointer', () => {
  const after = run(current);
  after.intersect(); after.frame(1600);
  assert.equal(after.state.frames, 1);
  after.lose();
  assert(after.hero.classList.contains('nogl'));
  assert(after.hero.classList.contains('on'));
  assert(!after.hero.classList.contains('gl'));
  const requests = after.state.rafRequests, uploads = after.state.uploads.length;
  after.intersect(); after.resize(); after.state.fontCallbacks.forEach(callback => callback());
  after.hero.events.pointerenter(); after.frame(2000);
  assert.equal(after.state.rafRequests, requests);
  assert.equal(after.state.uploads.length, uploads);
  assert.equal(after.state.pending.size, 0);
  assert(!after.cursor.classList.contains('show'));
});

const report = {
  checkedAtUtc: new Date().toISOString(),
  method: 'Node VM execution of the actual inline hero scripts with DOM/WebGL mocks; confirms sizing, failure handling and matching numeric animation uniforms, not a GPU screenshot',
  passed: results.length, failed: 0,
  sourceIndexSha256: sha256(currentHtml),
  heroScriptSha256: sha256(current),
  previousHeroScriptSha256: sha256(previous),
  results
};
fs.writeFileSync(path.join(evidenceRoot, 'hero-webgl-fix.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
