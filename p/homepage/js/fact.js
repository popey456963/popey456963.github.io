var d = new Date();
var h = d.getHours();
var m = d.getMinutes();
var time = String(h) + String(m);
var gotData = [];
var firstOne;
var currentFact = 0;

function getFacts(){
	$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'http%3A%2F%2Ffactoclock.com%2FgetFact.php%3Ftime%3D" + time + "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(data) {
		data = data.query.results.json.json;
		console.groupCollapsed("List of Facts");
		for (i=0;i<data.length;i++){
			if (data[i].fact.fact != "null"){
			gotData.push(data[i]);
			console.log(data[i].fact.fact);
			}
			else {
				console.log("A null fact was given")
			}
		}
		console.groupEnd();
		newFact();
	});
}

function setFact(fact) {
	try {
		if (fact.fact.fact!="null"){
		var div = document.getElementById("fact");
		div.innerHTML = fact.fact.fact;
		}
		else {
			var x = null;
			div.innerHTML = "There was an error gathering the fact";
		}
	} catch(err) {
		document.getElementById("fact").innerHTML = "No more facts at the moment, check back later!"
	}
}

function startTimer() {
	// console.log("Testing Start Time, Currently "  + String(d));
	if (d.getSeconds() <= 2) {
		timer();
		clearTimeout(timerStartTimer);
	}
	else {
		d = new Date();
	}
}

var timerStartTimer = setInterval(startTimer, 1000)

function timer() {
	console.log("Started the Timer at " + String(d));
	var minuteTimer = setInterval(newFact, 60000);
}

function newFact() {
	setFact(gotData[currentFact])
	currentFact++;
}

getFacts();