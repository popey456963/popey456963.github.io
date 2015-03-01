jQuery(function(){
  function spline( $el ) {
    this.$el = $el;
    this.cursor = { x: 0, y: 0 };
    this.elPos();
  }
  spline.prototype.elPos = function() {
    this.x = this.$el.offset().left;
    this.y = this.$el.offset().top;
  }
  spline.prototype.setCursorPos = function(x, y) {
    this.cursor.x = x;
    this.cursor.y = y;
    return this;
  }
  spline.prototype.align = function() {
    var k1 = this.cursor.y - this.y;
    var k2 = this.cursor.x - this.x;
    
    var rad = Math.atan(
      Math.abs(k2) / Math.abs(k1)
    );
    var deg = rad * (180/Math.PI);
    
    if ( k1 > 0 && k2 > 0 )
      deg = 360 - deg;
    else if ( k1 <= 0 && k2 > 0 )
      deg = 180 + deg;
    else if ( k1 <= 0 && k2 <= 0 )
      deg = 180 - deg;
    
    if ( typeof deg != 'undefined' ) {
      this.$el.css( 
        'transform', 'rotate('+deg+'deg)'
      )
    }
  }
  
  function alignAll( x, y ) {
    for ( var i in sp )
      sp[i].setCursorPos( x, y ).align();
  }
  
  var sp = [];
  for ( var i = 0; i < 180; i++ )
    sp.push(
      new spline( 
        $('<div />').addClass('i'+i).appendTo( $('.w') ) 
      )
    );
  
  $(window).mousemove(function(ev){
    alignAll( ev.clientX, ev.clientY );
  });
  
  $('html').on( 'touchmove', function(ev){
    ev.preventDefault();
   
    if ( ev.originalEvent ) {
      ev = ev.originalEvent;
      
      if ( ev.changedTouches && ev.changedTouches.length > 0 )
        alignAll( ev.changedTouches[0].clientX, ev.changedTouches[0].clientY )
    }
  } )
  
  var s = 0;
  $(window).resize(function(){
    window.clearTimeout( s );
    window.setTimeout( function(){
      for ( var i in sp )
        sp[i].elPos();  
    }, 200 );
  })
})