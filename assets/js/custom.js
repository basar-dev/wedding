/******************************************************************************************************************************
COMMING SOON PAGE
*******************************************************************************************************************************/
(function($) {

  // Set timer to a date
  var launch = new Date(2018, 07, 28, 20, 00);

  var mapConfig = {
    mugla: {
      options:  {
        zoom: 15,
        center: new google.maps.LatLng(37.264466, 28.21300)
      },
      marker: {
        'lat': 37.264466,
        'long': 28.219892,
        'title': 'Simge-Erkan-Mugla-Wedding!'
      },
    },
    manisa: {
      options:  {
        zoom: 14,
        center: new google.maps.LatLng(38.590497, 27.3400)
      },
      marker: {
        'lat': 38.590497,
        'long': 27.354718,
        'title': 'Simge-Erkan-Manisa-Wedding!'
      }
    }
  };

  // Init animations
  new WOW().init();

  /******************************************************************/
  /*  COUNTDOWN TIMER
  /******************************************************************/
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

  /******************************************************************/
  /*  GOOGLE MAPS
  /******************************************************************/

  function initMap (locId) {
    var mapElement = document.getElementById('wedding-map');
    var map = new google.maps.Map(mapElement, mapConfig[locId].options);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(mapConfig[locId].marker.lat, mapConfig[locId].marker.long),
        title: mapConfig[locId].marker.title,
        icon: 'assets/images/custom-map-marker.png',
        map: map
    });
  }

  google.maps.event.addDomListener(window, 'load', initMap('mugla'));

  $('.seeWeddingLocation').on('click', function() {
    var loc = $(this).data('location');
    initMap(loc);
    $('#mugla-map-label').toggleClass('active');
    $('#manisa-map-label').toggleClass('active');
    $('#mugla-info').toggleClass('hidden');
    $('#manisa-info').toggleClass('hidden');
  });

})(jQuery);
