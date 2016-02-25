// Carousel Auto-Cycle
$(document).ready(function () {
    $('.carousel').carousel({
        interval: 6000
    })
});

var parameters = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();
try {
    var background = parameters.background;
    if (background.substring(0, 4) == "hex:") {
        background = "#" + background.substring(4)
    }
    document.getElementById("body").style.background = background;
} catch (err) {
    var hello = null;
}
try {
    var blarg = parameters.text;
    if (blarg.substring(0, 4) == "hex:") {
        blarg = "#" + blarg.substring(4)
    }
    var x = document.getElementsByClassName("color");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.color = blarg;
    }
} catch (err) {
    var hello = null;
}
try {
    var color = parameters.color;
    if (color.substring(0, 4) == "hex:") {
        color = "#" + color.substring(4)
    }
    document.getElementById("body").style.background = color;
    var x = document.getElementsByClassName("color");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.color = color;
    }
} catch (err) {
    var hello = null;
}