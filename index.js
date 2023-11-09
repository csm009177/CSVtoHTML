document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.getElementById("cpu-search");
  const resultsElement = document.getElementById("results");

  function searchCPU() {
      const searchKeyword = inputElement.value.trim().toLowerCase();

      if (searchKeyword === "") {
          resultsElement.innerHTML = "검색어를 입력하세요.";
          return;
      }

      fetch("cpu.csv") // CPU 정보가 포함된 CSV 파일
          .then(response => response.text())
          .then(data => {
              // CSV 데이터 파싱
              Papa.parse(data, {
                  header: true,
                  skipEmptyLines: true,
                  complete: function (results) {
                      const cpuData = results.data;

                      // CPU 정보 검색
                      const matchingCPUs = cpuData.filter(cpu => {
                          return cpu["CPU Name"].toLowerCase().includes(searchKeyword);
                      });

                      if (matchingCPUs.length > 0) {
                          const resultHTML = matchingCPUs.map(cpu => {
                              return `<p>${cpu["CPU Name"]}: ${cpu["Price"]}</p>`;
                          }).join("");
                          resultsElement.innerHTML = resultHTML;
                      } else {
                          resultsElement.innerHTML = "일치하는 CPU를 찾을 수 없습니다.";
                      }
                  }
              });
          })
          .catch(error => {
              console.error("CSV 파일을 읽어오는 중 오류 발생:", error);
              resultsElement.innerHTML = "데이터를 가져오는 중 오류가 발생했습니다.";
          });
  }

  window.searchCPU = searchCPU;
});
