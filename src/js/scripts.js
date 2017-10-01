google.maps.event.addDomListener(window, 'load', init);

function init() {
  var mapOptions = {
    key: 'AIzaSyBzCaMXsWRSJe4gMDZkxG9n9tLqTyxl',
    zoom: 15,

    center: new google.maps.LatLng(52.401070, 16.893598),

    styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#193341"
        }]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "color": "#202a6b"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
            "color": "#29768a"
          },
          {
            "lightness": -37
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#3241a6"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
          "color": "#3241a6"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "on"
          },
          {
            "color": "#3241a6"
          },
          {
            "weight": 2
          },
          {
            "gamma": 0.84
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#ffffff"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{
            "weight": 0.6
          },
          {
            "color": "#1a3541"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#3241a6"
        }]
      }
    ]
  };

  var mapElement = document.getElementById('map');

  var map = new google.maps.Map(mapElement, mapOptions);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(52.401070, 16.893598),
    map: map,
    title: 'Hacktoberfest Poznań'
  });
}

$(function () {
  $('.nav-toggle').on('click', function () {
    var navigationTriggers = $('.nav-toggle, .nav-menu');
    navigationTriggers.toggleClass('is-active');
  });
});
