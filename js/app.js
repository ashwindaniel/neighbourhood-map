/* The model for app. These are the coworking spaces listings that will
be shown to the user.*/

var initialSpaces = [
{
  name: "L'Anticafé Louvre",
  location: {lat: 48.864176597929635, lng: 2.336246967315674},
  fs_id: '5318c03b498e5ea5cf57b72d',
  type: 'Co-working café'
},
{
  name: "L'Anticafé Olympiades",
  location: {lat: 48.8256604845249, lng: 2.3664236420115032},
  fs_id: '544f9a0b498ece3f8d42959c',
  type: 'Co-working café'
},
{
  name: 'Coutume Instituutti',
  location: {lat: 48.850272389609614, lng: 2.3434848718922203},
  fs_id: '526282fa11d201a787f28e5d',
  type: 'Café with free wi-fi'
},
{
  name: 'Coworkshop',
  location: {lat: 48.873131, lng: 2.362437},
  fs_id: '5392e19d498eae4bad78b309',
  type: 'Co-working space'
},
{
  name: 'Craft',
  location: {lat: 48.873186908994434, lng: 2.3631128669444834},
  fs_id: '50420756e4b0047a41a495fc',
  type: 'Coffee Shop'
},
{
  name: 'Draft - Les Ateliers Connectés',
  location: {lat: 48.88802088292197, lng: 2.362205516926689},
  fs_id: '537bb0fd498e043d3810ad17',
  type: 'Co-working space'
},
{
  name: 'Hubsy',
  location: {lat: 48.86593774237275, lng: 2.3542838398926906},
  fs_id: '55e80d34498e4e52001fe3b9',
  type: 'Co-working café'
},
{
  name: 'Le Laptop',
  location: {lat: 48.877355, lng: 2.391246},
  fs_id: '4f2bbe9fe4b05a27b99fa265',
  type: 'Co-working space'
},
{
  name: 'Le Tank by Spintank',
  location: {lat: 48.855174511625705, lng: 2.3749271844045627},
  fs_id: '5410960d498e0fbb967291f9',
  type: 'Co-working space'
},
{
  name: 'Le 10h10 Coworking Café',
  location: {lat: 48.86792155932635, lng: 2.3458970554245333},
  fs_id: '553f768a498ea8392e2eb0dc',
  type: 'Co-working café'
},
{
  name: 'Mutinerie',
  location: {lat: 48.8820919, lng: 2.3546844},
  fs_id: '4f043d3029c2b9a3edd1c7f9',
  type: 'Co-working space'
},
{
  name: 'Nuage Café',
  location: {lat: 48.849188518347134, lng: 2.3476003257651215},
  fs_id: '565071c3498e84bcd5ea4e34',
  type: 'Co-working café'
},
{
  name: 'NUMA Cowork',
  location: {lat: 48.867661509436516, lng: 2.349806826122033},
  fs_id: '52663aa3498ebda21a68cb6e',
  type: 'Co-working space'
}
]

//Create global variables to use in google maps
var map;

var mapTimeout = setTimeout(function(){
    alert("sorry, problems loading map...");
}, 5000);

// Create a new blank array for all the listing markers
var markers = [];

//initializeMap() is called when page is loaded
function googleSuccess() {
  'use strict';
  clearTimeout(mapTimeout);

  //Create styles arrays to use with the map
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

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.8676305, lng: 2.3495396},
    zoom: 13,
    styles: styles,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    mapTypeControlOptions: {
    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    }
  });

  var largeInfoWindow = new google.maps.InfoWindow({
    maxWidth: 240
  });

  var bounds = new google.maps.LatLngBounds();

  //Set custom map marker
  var image = {
    url: 'img/32x32.png',
    // This marker is 32 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };

  /* The following group uses location array to create an array of
  markers to initialize*/
  var i;
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
    // Bounce effect on marker
    var toggleBounce = function(marker, infowindow) {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 700);
      }
    };
    // Push the marker to array of markers
    markers.push(marker);
    // Extend the boundaries of the map for each marker
    bounds.extend(marker.position);

    // Create an onclick event to open an infowindow and bounce the marker at each marker
    marker.addListener('click', function(e) {
      map.panTo(this.position);
      populateInfoWindow(this, largeInfoWindow);
      toggleBounce(this, largeInfoWindow);
    });
  }

  // Recenter map upon window resize
  window.onresize = function () {
    map.fitBounds(bounds);
  };


    // function getContent(data) {
//   var contentString;
//   //build the content string
//   //return contentString;
// }
// //Foursquare API Url parameters
   this.BaseUrl = 'https://api.foursquare.com/v2/venues/'
   this.venueId = '565071c3498e84bcd5ea4e34' + '/?';
   this.fsClient_id = 'client_id=J4JTA0KKSKB50R1ONPYB3W4H532SPS403IHJKL4VQMNMNKT0';
   this.fsClient_secret = '&client_secret=W5FBT3FTE1X4RVJXPSJJDNNXCYHXL0OMH1TPVINZ40NO0LX5';
   this.fsVersion = '&v=20161507';
//   // this.fsParams = '&near=Paris&sortByDistance=1&limit=50'
//   // this.fsVenuePhotos = '&venuePhotos=1';
//   // this.fsRadius = '&radius=5000';
//   // this.fsquery = ['&query=coworking+cafe', '&query=coworking+space']
   this.foursquareUrl = this.BaseUrl + this.venueId + this.fsClient_id + this.fsClient_secret + this.fsVersion;

     $.ajax({
       url: this.foursquareUrl,
       dataType: 'json',
       async: true,
       success: function(data) {
         //this.tips = data.response;
         console.log(data.response);
     }
     })



  /* This function populates the infowindow when the marker is clicked.
    We'll only allow one infowindow which will open at the marker
    clicked, and populate based on that markers position*/
  function populateInfoWindow(marker, infowindow) {
    var content = '<div>' + marker.title + '</div>'+
    '<div>' +'<img src = "http://dummyimage.com" alt="venue image from FS">' +'</div>' +
    '<p>' + 'venue description comes here from Foursquare' + '</p>'
    // Check that infowindow is not already opened for this marker
    if (infowindow.marker = marker) {
      infowindow.marker = marker;
      infowindow.setContent(content);
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed
      infowindow.addListener('closeclick', function() {
        infowindow.close();
      });
      map.addListener('click', function(){
        infowindow.close(largeInfoWindow);
      })
    }
  }

  //Creating Space object
  var Space = function (data, id, map) {
    this.name = ko.observable(data.name);
    this.location = location;
    this.marker = marker;
    this.markerId = id;
    this.infowindow = largeInfoWindow;
  }

  var ViewModel = function () {
    var self = this;

    // Nav button control
    this.isNavClosed = ko.observable(false);
    this.navClick = function () {
      this.isNavClosed(!this.isNavClosed());
    };

    // Creating list elements from the spaceList
    this.spaceList = ko.observableArray([]);
    initialSpaces.forEach(function(item, i){
      self.spaceList.push(new Space(item, i));
    });

    // Creating click for the list item
    this.itemClick = function (item) {
      var markerId = item.markerId;
      google.maps.event.trigger(markers[markerId], 'click');
    }

    // Filtering the Coworking cafés list
    self.filter = ko.observable("");
    this.filteredSpaceList = ko.computed(function(item) {
      var q = self.filter().toLowerCase();
      return ko.utils.arrayFilter(self.spaceList(), function(item) {
        var match = item.name().toLowerCase().indexOf(q) >= 0;
        var markerId = item.markerId;
        markers[markerId].setVisible(match);
        return match;
        });
    });
  };

 // Activates knockout.js
ko.applyBindings(new ViewModel());
}

