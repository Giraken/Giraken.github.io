var barCanvas = document.getElementById("barChart");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

var barData = {
  label: 'Progress per Week',
  backgroundColor:['#85c946','#85c946','#85c946','#85c946','#85c946','#85c946','#85c946'],
  data: [100, 90, 75, 60, 45, 30, 15]
};

var barChart = new Chart(barCanvas, {
  type: 'bar',
  data: {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [barData]
  }
});