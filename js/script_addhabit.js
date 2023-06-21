const cardTrack = document.getElementById("cardtrack");

function submitValue() {
    var id = uniqueID();
    var activity = document.getElementById("activity").value
    var duration = document.querySelector('input[name="duration"]:checked').value
    var time = document.getElementById("time").value
    var icon = document.querySelector('input[name="icon"]:checked').value
    var color = document.querySelector('input[name="color"]:checked').value

    var habits = JSON.parse(localStorage.getItem("myValue")) || [];

    var habit={
            id,
            activity,
            duration,
            time,
            icon,
            color
        }

    habits.push(habit);

    // console.log(habit)
    // localStorage.setItem("myValue", JSON.stringify(habit))
    localStorage.setItem("myValue", JSON.stringify(habits))
    // localStorage.setItem('myValue', habit);
    window.location.href = 'tracker.html';

    // var activity = habit[0];
    // console.log(activity)
}

function uniqueID() {
    return Math.floor(Math.random() * Date.now())
}