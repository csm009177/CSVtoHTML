// http
const http = require('http');
const fs = require('fs');
const parse = require('csv-parse');

// port
const port = 3000;

// server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // read index.html file and response
    fs.readFile('index.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'GET' && req.url === '/data.csv') {
    // read CSV file and send to client as text
    fs.readFile('data.csv', 'utf8', (err, csvData) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      // split CSV data into lines and send as JSON array
      const lines = csvData.split('\n');
      const data = lines.map(line => line.split(','));
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});
// listen
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});