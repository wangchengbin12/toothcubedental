import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../dist/', import.meta.url);
const port = Number(process.env.PORT || 3000);
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/privacy-practices.html', ['privacy-practices.html', 'text/html; charset=utf-8']],
  ['/website-privacy.html', ['website-privacy.html', 'text/html; charset=utf-8']],
  ['/good-faith-estimate.html', ['good-faith-estimate.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/assets/toothcube-logo.jpg', ['assets/toothcube-logo.jpg', 'image/jpeg']],
]);
const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  try {
    const route = new URL(request.url, 'http://localhost').pathname;
    const entry = files.get(route);
    if (!entry) { response.writeHead(404).end('Not found'); return; }
    const body = await readFile(new URL(entry[0], root));
    response.writeHead(200, { 'Content-Type': entry[1], 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(500).end('Unable to serve this page.');
  }
});
server.on('error', (error) => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Tooth Cube Dental: http://localhost:${port}\nServing ${fileURLToPath(root)}`));
