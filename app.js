// http
const http = require('http');
const fs = require('fs');
const parse = require('csv-parse');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // index.html 파일 읽어서 응답
    fs.readFile('index.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'GET' && req.url === '/data') {
    // CSV 파일 읽어서 JSON 형태로 클라이언트에 전송
    fs.readFile('data.csv', 'utf8', (err, csvData) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      // CSV 파싱
      parse(csvData, { columns: true }, (err, records) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          return;
        }

        // JSON 형태로 응답
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(records));
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});