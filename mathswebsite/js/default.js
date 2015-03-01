var tpop = 0;
var apop = 0;
var cpop = 0;
var ipop = 0;
var cstored = 0;
var died = 0; //Unused now
var currentCrop = 100;
var acres = 0;

function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
}

function start() {
	toggle_visibility('title');
	toggle_visibility('pop');
	toggle_visibility('titlebutton');
	toggle_visibility('input');
	toggle_visibility('nextyear');
	workpop();
	startingValues();
}

function workpop() {
		console.group();
	tpop = document.getElementById('InputPop').value;
		console.info("Starting Population: " + tpop);
	apop = Math.round(parseInt(tpop) / 2);
		console.info("Starting Adult Population: " + apop);
	cpop = Math.round(parseInt(tpop) / 3);
		console.info("Starting Child Population: " + cpop);
	ipop = Math.round(parseInt(tpop) / 6);
		console.info("Starting Infant Population: " + ipop);
	tpop = apop + cpop + ipop;
		console.info("Ending Population on WorkPop: " + tpop);
		console.groupEnd();
}

function startingValues() {
	document.getElementById("tpop").innerHTML = tpop;
	document.getElementById("apop").innerHTML = apop;
	document.getElementById("cpop").innerHTML = cpop;
	document.getElementById("ipop").innerHTML = ipop;
	document.getElementById("cash").innerHTML = "£0";
	document.getElementById("crop").innerHTML = "0";
	document.getElementById("well").innerHTML = "1";
	document.getElementById("birth").innerHTML = "0";
	document.getElementById("death").innerHTML = "0";
	cstored = document.getElementById("InputCrop").value;
	document.getElementById("cropstored").innerHTML = cstored;
	currentCrop = document.getElementById("cropstored");
}

function newYear() {
	plantCrops();
	buildWells();
}

function plantCrops() {
		console.group();
	acres = document.getElementById("acreplant").value;
		console.info("Acres to plant: " + acres);
	currentCrop = currentCrop - acres * (12/1000);
		console.info("currentCrop after planting crops: " + currentCrop);
		console.groupEnd();
	if (currentCrop < 0){ 
		alert("You have not got enough corn to plant that many acres - you have none left over to feed your people."); 
		CurrentCrop = 0;}}

function buildWells() {
		console.group();
	costwell = document.getElementById("welldig").value * 60;
		console.info("Cost of well: " + costwell);
	currentCrop = currentCrop - ((costwell / 0.2) / 220);
		console.info("currentCrop after building wells: " + currentCrop);
	wells = document.getElementById("welldig").value + document.getElementById("well").value;
		console.info("Current Wells are: " + wells);
		console.groupEnd();
	document.getElementById("well").innerHTML = wells;
	if (currentCrop < 0) {
		alert("You cannot afford that many wells.  You have no food left to feed your people."); 
		CurrentCrop = 0;}}











		
















