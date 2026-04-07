const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8788;

http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'loyalty-widget.js' : req.url);
  const ext = path.extname(filePath);
  const contentType = ext === '.js' ? 'application/javascript' : 'text/html';

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'no-cache');

  if (req.url === '/preview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Loyalty Widget Preview</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0a0b0e;
      padding: 24px;
    }
  </style>
</head>
<body>
  <joy-loyalty-widget></joy-loyalty-widget>
  <script type="module">
    import LoyaltyWidget from './loyalty-widget.js';
    customElements.define('joy-loyalty-widget', LoyaltyWidget);
  </script>
</body>
</html>`);
    return;
  }

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
  console.log(`Preview at http://127.0.0.1:${PORT}/preview`);
});
