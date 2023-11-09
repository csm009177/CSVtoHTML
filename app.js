// http
const http = require('http');
// port
const port = 3000; 

// server
const server = http.createServer((req, res) => {
  if()
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

// listen
server.listen(port, () => {
  console.log(`
서버가 http://localhost:${port} 에서 실행 중입니다.`);
});