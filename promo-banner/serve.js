const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8787;

http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'promo-banner.js' : req.url);
  const ext = path.extname(filePath);
  const contentType = ext === '.js' ? 'application/javascript' : 'text/plain';

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'no-cache');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}).listen(PORT, '127.0.0.1', () => {
  console.log(`Serving on http://127.0.0.1:${PORT}`);
});
