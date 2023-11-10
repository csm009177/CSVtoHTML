const http = require('http');
const fs = require('fs');
const { handleRequest } = require('./route');

const port = 3000;

const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});