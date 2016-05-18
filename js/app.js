'use strict';
// ** The model for app **

var model = [
{lat: 48.8493, lng: 2.3451824},
{lat: 48.8502448, lng: 2.3411619},
{lat: 48.8613581, lng: 2.3472089},
{lat: 48.8422202, lng: 2.3476437},
{lat: 48.8575513, lng: 2.3318454},
{lat: 48.867844, lng: 2.349622}
];

var ViewModel = function () {
  var self = this;
 // Elements for Google maps


}

var markers = [];


var map = map;


function initializeMap() {
  // var myLatLng = {lat: 48.8566, lng: 2.3522};
  // var mapDiv = d;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.855188, lng: 2.348058},
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    mapTypeControlOptions: {
    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    }
  });

}

function drop() {
  clearMarkers();
  for (var i = 0; i < model.length; i++) {
    addMarkerWithTimeout(model[i], i * 200);
  }
}

function addMarkerWithTimeout(position, timeout) {
  window.setTimeout(function() {
    markers.push(new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.DROP
    }));
  }, timeout);
}


function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

//initializeMap();
