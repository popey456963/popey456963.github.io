(function() {
    
    var mX, mY, distance,
        $distance = $('#element span'),
        $element  = $('#element');

    function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
    }

    $(document).mousemove(function(e) {  
        mX = e.pageX;
        mY = e.pageY;
        distance = calculateDistance($element, mX, mY);
        $distance.text(distance);
      
      if (distance > 100) {
        $("#element span").css("color", "#efefef");
        $("#hello").addClass("near");
        
      } else if (distance < 5) {
        $("#element span").css("color", "red");
        $("#element").addClass("big");
      }
      else {
        $("#element span").css("color", "#FC6366");
        $("#hello").removeClass("near");
        $("#element").removeClass("big");
      }
    });
})();