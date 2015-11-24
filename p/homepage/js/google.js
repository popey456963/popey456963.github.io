$("#q").keypress(function(e) {
    var textVal = $(this).val();
    if(e.which === 13 && e.shiftKey) {
        window.location.href = "http://www.wolframalpha.com/input/?i=" + encodeURIComponent(textVal);
    } else if (e.which === 10) {
        window.location.href = "https://en.wikipedia.org/wiki/Special:Search?go=Go&search=" + encodeURIComponent(textVal);
    } else if (e.which === 13) {
    	window.location.href = "https://www.google.co.uk?#safe=strict&q=" + encodeURIComponent(textVal);
    }
});