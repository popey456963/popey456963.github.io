$(document).ready(function() {
            
	var stocks = ['NVDA', 'EBAY', 'INTC', 'APPL', 'MSFT', 'GOOG', 'FB', 'TWTR'];
	var stocksUrl = stocks.join('%20');
            
	var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22' + stocksUrl + '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
                                        
	$.getJSON(url, function(data) {			
		for (var i = 0; i < data.query.results.quote.length; i++) {
			var stockId = '#stock-' + (i + 1);
			var change = data.query.results.quote[i].ChangeinPercent;

			if (change == null) {
				document.getElementById("invis").style.display = 'none';
			}

			if (change.slice(0,-1) < 0) {
				$(stockId).css('background-color', '#db5959');
			}  else if (change.slice(0,-1) > 0) {
				$(stockId).css('background-color', '#68b665');
			} else if (change.slice(0,-1) == 0) {
				$(stockId).css('background-color', '#fdca41');
			}

			//$(stockId).children('.symbol').html(data.query.results.quote[i].symbol);
			$(stockId).children('.change').html(change);
		}
	});

});