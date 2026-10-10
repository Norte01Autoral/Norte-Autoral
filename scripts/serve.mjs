import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../public');
const port = Number(process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.mp3': 'audio/mpeg', '.pdf': 'application/pdf',
};

async function findFile(pathname) {
  const target = resolve(root, '.' + pathname);
  if (target !== root && !target.startsWith(root + sep)) return null;
  const candidates = [target];
  if (!extname(target)) candidates.push(target + '.html');
  candidates.push(resolve(target, 'index.html'));
  for (const file of candidates) {
    try {
      const info = await stat(file);
      if (info.isFile()) return { file, size: info.size };
    } catch {}
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname); }
  catch { res.writeHead(400).end('Endereço inválido'); return; }
  if (pathname === '/api/lead') {
    // A cópia local nunca envia mensagens para a conta do site original.
    req.resume();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: false, code: 'LOCAL_FORM_NOT_CONFIGURED', message: 'Configure seu serviço de envio antes de publicar.' }));
    return;
  }
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
  const asset = await findFile(pathname);
  if (!asset) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Página não encontrada'); return; }
  const headers = { 'Content-Type': types[extname(asset.file).toLowerCase()] || 'application/octet-stream', 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' };
  let start = 0, end = asset.size - 1;
  if (req.headers.range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    if (!match) { res.writeHead(416, { 'Content-Range': `bytes */${asset.size}` }).end(); return; }
    if (!match[1]) start = Math.max(0, asset.size - Number(match[2]));
    else start = Number(match[1]);
    if (match[1] && match[2]) end = Math.min(end, Number(match[2]));
    if (start > end || start >= asset.size) { res.writeHead(416, { 'Content-Range': `bytes */${asset.size}` }).end(); return; }
    headers['Content-Range'] = `bytes ${start}-${end}/${asset.size}`;
  }
  headers['Content-Length'] = end - start + 1;
  res.writeHead(req.headers.range ? 206 : 200, headers);
  if (req.method === 'HEAD') { res.end(); return; }
  const stream = createReadStream(asset.file, { start, end });
  stream.on('error', () => res.destroy());
  stream.pipe(res);
});

server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `A porta ${port} já está em uso. Defina PORT para escolher outra.` : error.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => console.log(`Clone v1 disponível em http://127.0.0.1:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
