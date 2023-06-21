function showTask() {
    const container = document.getElementById("containerHabit");
    var habits = JSON.parse(localStorage.getItem("myValue"));

    habits.forEach(habit => {
        var html = document.createElement('div');
        html.innerHTML = `<div id="cardtrack">
            <div class="card `+habit.color+`">
                <div class="bagikiri">
                    <i class="material-symbols-outlined imgcard" style="font-size: 85px;">`+habit.icon+`</i>
                </div>
                <div class="bagitengah1">
                    <h3 class="titlecard">`+habit.activity+`</h3>
                    <p class="cardtime">`+habit.time+`</p>
                </div>
                <div class="bagitengah2">
                    <select class="combo" disabled>  
                        <p name="time" value="15 menit">`+habit.duration+`</p>
                        <option name="time" value="15 menit">`+habit.duration+` </option>
                    </select>
                </div>
                <div class="bagikanan">
                    <span onclick="removeTask(`+habit.id+`)">x</span>
                </div>
            </div>
        </div>`;
        container.appendChild(html);
    });
}

function removeTask(id) {
    var habits = JSON.parse(localStorage.getItem("myValue"));
    habits.forEach(habit => {
        if (habit.id == id) {
            habits.splice(habits.indexOf(habit), 1);
        }
    });
    localStorage.setItem("myValue", JSON.stringify(habits));
    window.location.href = 'tracker.html';
}

showTask();