var q = document.getElementById("q");
$("#q").keypress(function(e) {
    var textVal = $(this).val();
    if(e.which === 13 && e.shiftKey) {
    	wolfram(e);
    } else if (e.which === 10) {
    	wikipedia(e);
    } else if (e.which === 13) {
    	validate(e);
    }
});

function validate(e) {
    var text = q.value;
    window.location.href = "https://www.google.co.uk?#safe=strict&q=" + encodeURIComponent(text);
}

function wolfram(e) {
	var text = q.value;
	window.location.href = "http://www.wolframalpha.com/input/?i=" + encodeURIComponent(text);
}

function wikipedia(e) {
	var text = q.value;
	window.location.href = "https://en.wikipedia.org/wiki/Special:Search?go=Go&search=" + encodeURIComponent(text);
}