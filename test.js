const csvUrl = 'http://localhost:3000/get-csv'; // 서버 URL로 변경해야 합니다.

fetch(csvUrl)
  .then((response) => response.text())
  .then((csvData) => {
    // CSV 데이터를 처리
    console.log(csvData);
    // 이곳에서 CSV 데이터를 파싱하거나 원하는 방식으로 사용할 수 있습니다.
  })
  .catch((error) => {
    console.error('Error fetching CSV file:', error);
  });