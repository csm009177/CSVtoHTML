const fs = require('fs');

function handleRequest(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    serveHTML(res);
  } else if (req.method === 'GET' && req.url === '/data.csv') {
    serveCSV(res);
  } else {
    serveNotFound(res);
  }
}

function serveHTML(res) {
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

function serveCSV(res) {
  fs.readFile('data.csv', 'utf8', (err, csvData) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    const lines = csvData.split('\n');
    const data = lines.map(line => line.split(','));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  });
}

function serveNotFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}

module.exports = {
  handleRequest,
};
