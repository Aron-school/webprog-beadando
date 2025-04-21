let chartInstance = null;

function createOrUpdateChart(dataArray) {
  const ctx = document.getElementById("goodCanvas1").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy(); 
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataArray.map((_, i) => `${i + 1}`),
      datasets: [{
        label: 'Row Values',
        data: dataArray,
        backgroundColor: 'rgba(5, 5, 5, 0.5)',
        borderColor: 'rgb(74, 243, 7)',
        borderWidth: 1,
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("MyTable");

  for (let row of table.rows) {
    row.addEventListener("click", function () {
        if(document.getElementsByClassName('activeRow')[0]){
            document.getElementsByClassName('activeRow')[0].classList.remove("activeRow")
        }
        this.classList.add("activeRow")
      const values = Array.from(this.cells).map(cell => parseFloat(cell.textContent.trim()));
      createOrUpdateChart(values);
    });
  }
});