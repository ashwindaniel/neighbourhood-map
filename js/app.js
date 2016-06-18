/* The model for app. These are the coworking spaces listings that will be shown to the user.*/

var initialSpaces = [
{
  name: 'Hubsy',
  address: '41 Rue Réaumur, 75003 Paris',
  fee: '5 € /first hour then 2 € / every half-an-hour, 20 € /day',
  location: {lat: 48.8657378, lng: 2.3541439},
  url: 'http://www.hubsy.fr',
  type: 'Co-working café',
  info: 'Meeting rooms for 6 persons'
},
{
  name: 'Nuage Café',
  address: '14 Rue des Carmes, 75005 Paris',
  fee: '4 €/hour, 16 €/day',
  location: {lat: 48.8492626, lng: 2.3473711},
  url: 'https://nuagecafe.fr',
  type: 'Co-working café',
  info: 'Possibility to privatize the space and meeting room for up to six persons'
},
{
  name: 'Anticafé Louvre',
  address: '10 Rue de Richelieu, 75001 Paris',
  fee: '5 €/hour, 24 €/day',
  location: {lat: 48.8641804, lng: 2.3362479},
  url: 'http://www.anticafe.eu/louvre/',
  type: 'Co-working café',
  info: 'For more than four persons possibility to reserve a table or part of Anticafé any time except between 1pm and 6pm.'
},
{
  name: 'Anticafé Beaubourg',
  address: '79 Rue Quincampoix, 75003 Paris',
  fee: '5 €/hour, 24 €/day',
  location: {lat: 48.862592, lng: 2.3512},
  url: 'http://www.anticafe.eu/beaubourg/',
  type: 'Co-working café',
  info: 'For 4-15 persons possibility to reserve a table or part of Anticafé any time except between 1pm and 6pm.'
},
{
  name: 'Le 10h10 Coworking Café',
  address: '19 Rue de Cléry, 75002 Paris',
  fee: '4.5 €/hour, 20 €/day',
  location: {lat: 48.8680272, lng: 2.3459806},
  url: 'http://www.le10h10.com/fr/coworking-cafe/',
  type: 'Co-working café',
  info: 'Three meeting room options, from 6 to 50 persons'
},
{
  name: 'NUMA Cowork',
  address: '39 Rue du Caire, 75002 Paris',
  fee: 'free',
  location: {lat: 48.8676305, lng: 2.3495396},
  url: 'https://paris.numa.co/Cowork-Accueil',
  type: 'Co-working space',
  info: 'Numa Cowork space can be hired for events.',
},
{
  name: 'Cool and Workers',
  address: '30-34 Rue du Chemin Vert, 75011 Paris',
  fee: '4 €/hour, 20 €/day',
  location: {lat: 48.8580496, lng: 2.3733548},
  url: 'http://www.coolandworkers.com',
  type: 'Co-working café',
  info: 'Meeting rooms.'
},
{
  name: "L'Archipel",
  address: '26 Rue de Saint-Pétersbourg, 75008 Paris',
  fee: 'Monthly subscription only: from 170 to H330HT €/month',
  location: {lat: 48.8817333, lng: 2.3256582},
  url: 'http://www.larchipel.paris/coworking/',
  type: 'Co-working space',
  info: 'Privatization of space is possible according to your needs.'
},
{
  name: "Café Craft",
  address: '24 rue des Vinaigriers, 75010 Paris',
  fee: '3 €/hour',
  location: {lat: 48.8732358, lng: 2.3630581},
  url: 'http://cafe-craft.com/home/',
  type: 'Co-working café',
  info: 'Free wi-fi'
},
{
  name: "Draft Atelier",
  address: '12 Esplanade Nathalie Sarraute, 75018 Paris',
  fee: 'Co-working: from 8€ up',
  location: {lat: 48.8879932, lng: 2.3627147},
  url: 'http://www.ateliers-draft.com',
  type: 'Co-working space and atelier',
  info: ''
},
{
  name: 'Le laptop',
  address: '6 rue Arthur Rozier, 75009 Paris',
  fee: '25€ / day',
  location: {lat: 48.877313, lng: 2.3911639},
  url: 'http://www.lelaptop.com',
  type: 'Co-working space',
  info: 'Meeting rooms for four, six or 15 persons.'
},
{
  name: "Coutume Instituutti",
  address: '60 rue des Écoles ou 33 rue Sommerard, 75005 Paris',
  fee: "Your coffee's worth",
  location: {lat: 48.8502448, lng: 2.3433506},
  url: 'http://coutumecafe.com/s/3231/Coutume+Instituutti',
  type: 'Café with free wi-fi access',
  info: ''
},
{
  name: "Café Coutume",
  address: '47 Rue de Babylnge, 75007, Paris',
  fee: "Your coffee's worth",
  location: {lat: 48.8516345, lng: 2.3183272},
  url: 'http://coutumecafe.com/s/3214/Coutume+Babylnge',
  type: 'Café with free wi-fi access',
  info: 'Possibility to reserve a meeting space from Finnish Institute'
}
];

/*Create global variables to use in google maps*/
var map;
/* Creat a new blak array for all the listing markers*/
var markers = [];

/*initializeMap() is called when page is loaded*/
function initializeMap() {
  'use strict';
  /*Create styles arrays to use with the map*/
var styles = [
  {
    "featureType": "landscape",
    "stylers": [
      { "hue": "#FFBB00"},
      {"saturation": 43.400000000000006},
      {"lightness": 37.599999999999994},
      {"gamma": 1}
    ]
  },{
    "featureType": "road.highway",
    "stylers": [
      {"hue": "#FFC200"},
      {"saturation": -61.8},
      {"lightness": 45.599999999999994},
      {"gamma": 1}
    ]
  },{
    "featureType": "road.arterial",
    "stylers": [
      {"hue": "#FF0300"},
      {"saturation": -100},
      {"lightness": 51.19999999999999},
      {"gamma": 1}
    ]
  },{
    "featureType": "road.local",
    "stylers": [
      {"hue": "#FF0300"},
      {"saturation": -100},
      {"lightness": 52},
      {"gamma": 1}
    ]
  },{
    "featureType": "water",
    "stylers": [
      {"hue": "#0078FF"},
      {"saturation": -13.200000000000003},
      {"lightness": 2.4000000000000057},
      {"gamma": 1}
    ]
  },{
    "featureType": "poi",
    "stylers": [
      {"hue": "#00FF6A"},
      {"saturation": -1.0989010989011234},
      {"lightness": 11.200000000000017},
      {"gamma": 1}
    ]
  }
]
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.8676305, lng: 2.3495396},
    zoom: 13,
    styles: styles,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    mapTypeControlOptions: {
    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    }
  });
  var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  /*Set custom map marker*/

  var image = {
    url: 'img/32x32.png',
    // This marker is 32 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };


  /* The following group uses location array to create an array of markers to initialize*/
  for (var i = 0; i < initialSpaces.length; i++) {
    // Get a position from the arrays
    var position = initialSpaces[i].location;
    var title = initialSpaces[i].name;
    // Create a marker per location, and put into markers array
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      icon: image,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // Push the marker to array of markers
    markers.push(marker);
    // Extend the boundaries of the mqp for each marker
    bounds.extend(marker.position);

    // Creat an onclick event to open an infowindow at each marker
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfoWindow);
    });
  }

  map.fitBounds(bounds);

  /* This fucntion populates the infowindow when the marker ic clicked.
  We'll only allow one infowindow which will open at the marker that is
  clicked, and populate based on that markers position*/
  function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed
      infowindow.addListener('closeclick', function() {
        infowindow.close;
      });
    }
  }


//Creating Knockout bindings

var Space = function (data) {
  this.name = ko.observable(data.name);

};

var ViewModel = function () {
  var self = this;

  // List elements
  this.spaceList = ko.observableArray([]);

  initialSpaces.forEach(function(spaceItem){
    self.spaceList.push( new Space(spaceItem) );
  });

  this.currentSpace = ko.observable( this.spaceList()[0] );

  this.setSpace = function(clickedSpace) {
     self.currentSpace(clickedSpace)
   };
};

 // Activates knockout.js
ko.applyBindings(new ViewModel());
}

