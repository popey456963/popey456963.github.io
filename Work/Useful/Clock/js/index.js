function clock(startAngle){
  var now = new Date(),
      canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      cw = canvas.width,
      ch = canvas.height,
      x = cw / 2,
      y = ch / 2,
      radius = Math.min(x, y),
      rads = Math.PI/180,
      min = now.getMinutes(),
      sec = now.getSeconds(),
      hr  = now.getHours(),
      hr = hr>=12 ? hr-12 : hr;
  
  ctx.clearRect(0,0,cw,cw);
  ctx.fillStyle = 'hsla(0, 50%, 100%, 1)';

  // Seconds
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(sec * Math.PI/30);
  ctx.translate(-x, -y);
  
  for (i = 0; i < 60; i++) {
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.arc(x, y, radius, startAngle, startAngle+(Math.PI*2*(1/60)), false);
    ctx.fill(); 
    ctx.fillStyle = 'hsla('+ i*6 +', 100%, 50%, .375)';
    startAngle = startAngle+(Math.PI*2*(1/60));
  }
  ctx.restore();  
  
  // Minutes
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((Math.PI/30)*min + (Math.PI/1800)*sec);
  ctx.translate(-x, -y);
  ctx.fillStyle = 'hsla(0, 50%, 10%, 1)';
    
  for (i = 0; i < 60; i++) {  
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.arc(x, y, radius/1.1, startAngle, startAngle+(Math.PI*2*(1/60)), false);
    ctx.fill();
    ctx.fillStyle = 'hsla('+ i*6 +', 100%, 50%, .375)';
    startAngle = startAngle+(Math.PI*2*(1/60));
  }
  ctx.restore();  
  
  // Hours
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(hr*(Math.PI/6)+(Math.PI/360)*min+ (Math.PI/21600)*sec);
  ctx.translate(-x, -y);
  ctx.fillStyle = 'hsla(30, 100%, 10%, 1)';
   
  for (i = 0; i < 60; i++) {  
    //if(i%5 === 0) {
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.arc(x, y, radius/1.425, startAngle, startAngle+(Math.PI*2*(1/60)), false);
      ctx.fill();
      ctx.fillStyle = 'hsla('+ i*6 +', 50%, 50%, .5)';         
    //}
    startAngle = startAngle+(Math.PI*2*(1/60));
  }  
  ctx.restore();
}

function init(){
  var startAngle = 36;
  
  clock();
  setInterval(function(){clock(startAngle)},1000);
}

init();