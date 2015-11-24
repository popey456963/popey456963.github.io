/*
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
				no = false;
				banned = ["sex", "orgasm", "porn", "kiss", "rape"];
				for (j=0;j<banned.length;j++) {
					if (data[i].fact.fact.indexOf(banned[j]) != -1) {
						no = true;
					}
				}
				if (no == false) {
					gotData.push(data[i]);
					console.log(data[i].fact.fact);
				}
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
*/

// TODO - WORK ON A CACHING THINGY

var d = new Date();
cachedFact = "Fact Loading...";

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function changeTimeLeft() {
	d = new Date();
	var s = d.getSeconds();
	document.getElementById("secondsleft").innerHTML = 60-s;
}

function addCache() {
	$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Frandomfactgenerator.net%2Ffactscript.php'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(data) {
		data = data.query.results.body.content.split("$('#randomfactbox').html(")[1].split(');')[0];
		data = data.substring(1, data.length-3)
		cachedFact = capitalise(data);
		setNewFact();
	});
}

function setNewFact(){
	document.getElementById("fact").innerHTML = cachedFact.replace("?","'");
	$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Frandomfactgenerator.net%2Ffactscript.php'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(data) {
		data = data.query.results.body.content.split("$('#randomfactbox').html(")[1].split(');')[0];
		data = data.substring(1, data.length-3)
		console.log(capitalise(data));
		cachedFact = capitalise(data);
	});
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

function timer() {
	console.log("Started the Timer at " + String(d));
	setNewFact();
	var minuteTimer = setInterval(setNewFact, 60000);
}

var timerStartTimer = setInterval(changeTimeLeft, 1000)
var timerStartTimer = setInterval(startTimer, 1000)
addCache();