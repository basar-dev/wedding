/******************************************************************************************************************************
COMMING SOON PAGE
*******************************************************************************************************************************/
(function($) {

  new WOW().init();

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

  function initMuglaMap() {
      var mapOptions = {
          zoom: 15,
          center: new google.maps.LatLng(37.264466, 28.230149)
      };
      var mapElement = document.getElementById('mugla-map');
      var map = new google.maps.Map(mapElement, mapOptions);
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(37.264466, 28.219892),
          icon: 'images/custom-map-marker.png',
          map: map,
          title: 'Simge-Erkan-Mugla-Wedding!'
      });
  }

  function initManisaMap() {
      var mapOptions = {
          zoom: 13,
          center: new google.maps.LatLng(38.590497, 27.354718)
      };
      var mapElement = document.getElementById('manisa-map');
      var map = new google.maps.Map(mapElement, mapOptions);
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(38.590497, 27.354718),
          icon: 'images/custom-map-marker.png',
          map: map,
          title: 'Simge-Erkan-Manisa-Wedding!'
      });
  }

  google.maps.event.addDomListener(window, 'load', initMuglaMap);
  google.maps.event.addDomListener(window, 'load', initManisaMap);

  $('input[name=location]').on('change', function() {
    var loc = $(this).val();
    $('#' + loc + '-map-wrapper').show();
    if (loc == "manisa") {
      $('#mugla-map-wrapper').hide();
      $('#mugla-map-label').removeClass('active');
      $('#manisa-map-label').addClass('active');
    } else if (loc == "mugla") {
      $('#manisa-map-wrapper').hide();
      $('#manisa-map-label').removeClass('active');
      $('#mugla-map-label').addClass('active');
    }
  });

})(jQuery);
