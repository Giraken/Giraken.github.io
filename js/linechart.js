var lineCanvas = document.getElementById("linechart");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

var lineData = {
  labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
  datasets: [{
    label: "Habbit Streak per day",
    data: [50, 60, 80, 50, 70, 40, 30],
    lineTension: 0,
    fill: false,
    borderColor: 'orange',
    backgroundColor: 'transparent',
    borderDash: [5, 5],
    pointBorderColor: 'orange',
    pointBackgroundColor: 'rgba(255,150,0,0.5)',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 10,
    pointBorderWidth: 2,
    pointStyle: 'rectRounded'
  }]
};

var chartOptions = {
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
  }
};

var lineChart = new Chart(lineCanvas, {
  type: 'line',
  data: lineData,
  options: chartOptions
});