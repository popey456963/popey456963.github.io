$(function(){
  
  $('.menu').on('change', function changeOption() {
    var spinner = $('#spinner'),
        val = $(this).val();
    spinner[0].className = '';
    setTimeout(function(){
      spinner.addClass('sequence'+val);
    },50);
  });
  
});