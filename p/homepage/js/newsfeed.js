function getURL(){
  var URL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fworld%2Frss.xml%3Fedition%3Duk%0A%22&diagnostics=true";
  var json;
  $.get( URL, function( data ) {
    $( ".result" ).html( data );
    //console.log(data);
    //alert( "Load was performed." );
    json = xmlToJson(data);
    //console.log(json)
    var items = json["query"]["results"]["item"];
    //console.log(items);
    for(i=0;i<3;i++){
      console.groupCollapsed("News Item: " + items[i]['title']['#text']);
      console.log(items[i]['title']['#text']);
      console.log(items[i]['description']['#text']);
      console.log(items[i]['link']['#text']);
      console.groupEnd();
      appendToDiv(items[i]['title']['#text'], items[i]['description']['#text'], items[i]['link']['#text']);
    }
  })
  .fail(function() {getURL();});
}
// Changes XML to JSON - Noone likes XML, credit to David Walsh.
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}
	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
function appendToDiv(title, description, link){
  var firstWord = title.split(" ")[0];
  var otherWord = title.substr(title.indexOf(" ") + 1);
  var inner = "<a style='text-decoration: none;' href='" + link + "'><h1><strong>" + firstWord + "</strong> " + otherWord +"</h1><h2>" + description + "</h2></a>";
  $( ".newsfeed" ).append( inner );
}
getURL();
//http://feeds.bbci.co.uk/news/world/rss.xml?edition=uk