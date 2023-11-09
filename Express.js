const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// 서버의 CSV 파일 경로
const csvFilePath = 'cpu.csv';

app.get('/get-csv', (req, res) => {
  // CSV 파일을 읽어와서 클라이언트에 제공
  fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading CSV file:', err);
      res.status(500).send('Error reading CSV file');
    } else {
      res.setHeader('Content-Type', 'text/csv');
      res.send(data);
    }
  });
});



app.listen(port, () => {
  console.log(`
  Server is running on port 
  http://localhost:${port}`);
});