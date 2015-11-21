var stockURL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22YHOO%22%2C%22AAPL%22%2C%22GOOG%22%2C%22MSFT%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
var savedData = [];


function getStockData() {
	$.getJSON(stockURL, function(data) {
		data = data.query.results.quote;
		console.groupCollapsed("Stocks");
		for (i=0; i<data.length; i++) {
			stockitem = {};
			stockitem.name = data[i].symbol;
			stockitem.change = data[i].Change;
			stockitem.current = data[i].LastTradePriceOnly;
			stockitem.percentchange = ((stockitem.change / stockitem.current) * 100).toFixed(2);
			savedData.push(stockitem);
			console.log(stockitem);
		}
		addStockData();
		console.groupEnd();
	});
}

function addStockData() {
    var toAddHeader = '<table border="0" class="table"><tr class="header"><td class="company">' + savedData[0].name + '</td><td class="company">' + savedData[1].name + '</td><td class="company">' + savedData[2].name + '</td></tr>'
    var toAddBody = '<tr class="prices"><td><span class="price">' + savedData[0].current + '</span> <span class="space"></span> <span class="increaseyear">' + savedData[0].change + '</span> <span class="increaseday">' + savedData[0].percentchange + '</span></td><td><span class="price">' + savedData[1].current + '</span> <span class="space"></span> <span class="increaseyear">' + savedData[1].change + '</span> <span class="increaseday">' + savedData[1].percentchange +'</span></td><td><span class="price">' + savedData[2].current + '</span> <span class="space"></span> <span class="increaseyear">' + savedData[2].change + '</span> <span class="increaseday">' + savedData[2].percentchange + '</span></td></tr>'
    document.getElementById("entry").innerHTML += (toAddHeader + toAddBody);
    //addNewLine();
    document.getElementById("entry").innerHTML += '</table>';
}

function addNewLine() {
	document.getElementById("entry").innerHTML += '<tr class="space"><td></td><td></td><td></td></tr>'
}

getStockData();