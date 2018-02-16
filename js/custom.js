/******************************************************************************************************************************
COMMING SOON PAGE
*******************************************************************************************************************************/
(function($) {

  var launch = new Date(2018, 07, 28, 11, 00);

  var days = $('#days');
  var hours = $('#hours');
  var minutes = $('#minutes');
  var seconds = $('#seconds');
  setDate();
  function setDate(){
    var now = new Date();
    if( launch < now ){
      days.html('<h1>0</H1><p class="timersub">Day</p>');
      hours.html('<h1>0</h1><p class="timersub">Hour</p>');
      minutes.html('<h1>0</h1><p class="timersub">Minute</p>');
      seconds.html('<h1>0</h1><p class="timersub">Second</p>');
    }
    else{
      var s = -now.getTimezoneOffset()*60 + (launch.getTime() - now.getTime())/1000;
      var d = Math.floor(s/86400);
      days.html('<h1>'+d+'</h1><p class="timersub">Day'+(d>1?'s':''),'</p>');
      s -= d*86400;
      var h = Math.floor(s/3600);
      hours.html('<h1>'+h+'</h1><p class="timersub">Hour'+(h>1?'s':''),'</p>');
      s -= h*3600;
      var m = Math.floor(s/60);
      minutes.html('<h1>'+m+'</h1><p class="timersub">Minute'+(m>1?'s':''),'</p>');
      s = Math.floor(s-m*60);
      seconds.html('<h1>'+s+'</h1><p class="timersub">Second'+(s>1?'s':''),'</p>');
      setTimeout(setDate, 1000);
    }
  }
})(jQuery);
