const currentHour = new Date().getHours();


if (hour >= 23 || hour < 5) {
	document.getElementById('greetings').innerText = "Hello, good morning";
} else if (hour >= 6 && hour < 12) {
	document.getElementById('greetings').innerText = "Hello, good afternoon";
} else if (hour >= 12 && hour < 17) {
	document.getElementById('greetings').innerText = "Hello, good evening";
} else {
	document.getElementById('greetings').innerText = gree4_english + name;
}