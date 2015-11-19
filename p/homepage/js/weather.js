function getWeather(){
  var URL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22woodbridge%2C%20suffolk%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  var json = "";
  var betterData = {};
  $.get( URL, function( data ) {
    json = data.query.results.channel;
    betterData['sunrise'] = json.astronomy.sunrise;
    betterData['sunset'] = json.astronomy.sunset;
    betterData['humidity'] = json.atmosphere.humidity;
    betterData['units'] = json.units;
    betterData['temp'] = json.item.condition.temp;
    betterData['temptext'] = json.item.condition.text;
    betterData['code'] = json.item.condition.code;
    betterData['windchill'] = json.wind.chill;
    betterData['winddirection'] = json.wind.direction;
    betterData['windspeed'] = json.wind.speed;
    //console.log(betterData);
    consoleWeather(betterData);
    editWeather(betterData);
  })
  .fail(function() {getWeather();});
}

function consoleWeather(data) {
  console.groupCollapsed("Weather Conditions")
    console.log("Sunrise: " + data["sunrise"]);
    console.log("Sunset: " + data["sunset"]);
    console.log("Humidity: " + data["humidity"]);
    console.log("Units: " + JSON.stringify(data["units"]));
    console.log("Temperature: " + data["temp"]);
    console.log("Temperature Text: " + data["temptext"]);
    console.log("Wind Chill: " + data["windchill"]);
    console.log("Wind Direction: " + data["winddirection"]);
    console.log("Wind Speed: " + data["windspeed"]);
    console.log("Weather Code: " + data["code"]);
  console.groupEnd();
}

function editWeather(data) {
  celsius = Math.round((data["temp"] - 32) * (5/9));
  document.getElementById("temp").innerHTML = celsius;
  document.getElementById("humidity").innerHTML = data["humidity"];
  document.getElementById("windspeed").innerHTML = data["windspeed"];
}

getWeather();