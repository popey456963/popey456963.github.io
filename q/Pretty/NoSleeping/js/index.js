//Pig face position
var elmFace = $("#face").offset();

function snore() {
  //Create Z
  var elm = document.createElement("span");
  //Text
  elm.innerText = "Z";
  //Set attributes
  elm.setAttribute("class", "z");
  //Get positions
  posTop = elmFace.top + 20;
  posLeft = elmFace.left + ($("#face").width()/2) + 35;
  aniTop = posTop - 160;
  aniLeft = (posLeft-40) + Math.round(Math.random()*80);
  //Style/position it
  $(elm).css({
    "top": posTop,
     "left": posLeft
  });
  //Append
  $("body").append(elm);
  //Animate
  $(elm).animate({
    "top": aniTop,
    "left": aniLeft,
    "font-size": "60px",
     "opacity": 0
    },
    5000, //Duration
    function() { //Function
      $(this).remove(); //Remove
  });
}

setInterval(snore, 1000);
snore();