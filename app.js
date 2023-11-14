const express = require('express');
const fs = require('fs');
const parse = require('csv-parse');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).type('text/html').send(data);
  });
});

app.get('/data.csv', (req, res) => {
  fs.readFile('data.csv', 'utf8', (err, csvData) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const lines = csvData.split('\n');
    const data = lines.map(line => line.split(','));

    res.status(200).json(data);
  });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
