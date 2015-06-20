$("#expandable").hover(function() {
    $(this).stop().animate({"height":"300px"},1000).addClass("dropped");
}, function() {
    $(this).stop().animate({"height":"50px"},1000).removeClass("dropped");
});