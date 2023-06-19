
var ctx = document.getElementById("inicanvas").getContext("2d");
var piechart = new Chart(ctx,{type: 'pie', data : {
labels:[
          'Workout',
          'Learning',
          'Dancing Class',
          'Break Time',
          'Mediate',   

],
datasets: [{
   data:[25,35,15,20,5],

backgroundColor:[
         '#85c946','#46c9a2','#46c0c9','#468ac9','#b346c9'
]
}],
}
});