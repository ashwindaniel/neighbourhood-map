

// Configuration data for Communication with FourSquare API 
let BaseUrl = "https://api.foursquare.com/v2/venues/";
let fourSquareClientID = "client_id=J4JTA0KKSKB50R1ONPYB3W4H532SPS403IHJKL4VQMNMNKT0";
let fourSquareClientSecret = "&client_secret=W5FBT3FTE1X4RVJXPSJJDNNXCYHXL0OMH1TPVINZ40NO0LX5";
let fsVersion = "&v=20161507";


//Constants for the PAN
let PAN_BY_INIT_RANGE = 0;
let PAN_BY_FINAL_RANGE = -200;

let DEFAULT_LATTITUDE = 12.9999459;
let DEFAULT_LONGITUE = 80.2003777;


//Global variables used for manipulation of Map and Popup Information
var googleMap, popUpInformation, googleMapBounds;

//Generate Popup Information
function getPopupInformation(name, pictureURL, shortURL) {
  var popupContent = "<h3 style='color:red;font-weight:bold;'>" + name +
    "</h3><br><div style='width:200px;min-height:120px'><img src=" + '"' +
    pictureURL + '"></div><div><a href="' + shortURL +
    '" target="_blank">Detailed info in Foursquare</a><img src="img/foursquare_150.png">';
  return popupContent;
}


// Prepare the place for your intrest
function preparePlace(name, lattitude, longitude, fourSquareId) {
  var place = {
    "name": name,
    "location": { "lat": lattitude, "lng": longitude },
    "fs_id": fourSquareId
  }
  return place;
}

//Array of places that should be loaded by default
var definedPlaces = [
  preparePlace("Chennai Central", 13.0834352, 80.2739593, "5624c11e498eec470ec9d53e"),
  preparePlace("ITC Grand Chola", 13.0105896, 80.2185199, "4d848e465ad3a0932c8dd1fd"),
  preparePlace("Phoenix Marketcity", 12.992312, 80.2148427, "4fe16257e4b0e4cc311bb9ab"),
  preparePlace("Radiance Shine", 12.821473, 80.2278703, "4fe16257e4b0e4cc311bb9ab"),  
];



function googleSuccess() {
  "use strict";


  //Custom/Default Marker Image Configuration
  var image = {
    "size": new google.maps.Size(32, 32),
    "origin": new google.maps.Point(0, 0),
    "anchor": new google.maps.Point(0, 32)
  };

  //Function used to generate styles for Map Customization
  function getStyle(type, hue, saturation, lightness, gamma) {
    var style = {
      "featureType": type,
      "stylers": [
        { "hue": hue },
        { "saturation": saturation },
        { "lightness": lightness },
        { "gamma": gamma }
      ]
    };
    return style;
  }

  //Style declaration that should be used in the Google Map Configuration
  var landscape = getStyle("landscape", "#0044ff", 73.40, 37.59, 1);
  var roadHighway = getStyle("road.highway", "#ff4300", -70.8, 45.59, 1);
  var roadArterial = getStyle("road.arterial", "#00fcff", -100, 51.19, 1);
  var roadLocal = getStyle("road.local", "#FF0300", -100, 52, 1);
  var water = getStyle("water", "#0054b3", -5.20, 2.40, 1);
  

  var placeOfInterest = {
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  };

  //Map Options with default Lattitude and Longitude
  function getMapOptions() {
    return {
      "center": {
        "lat": DEFAULT_LATTITUDE,
        "lng": DEFAULT_LONGITUE
      },
      zoom: 11,
      styles: [landscape, roadHighway, roadArterial, roadLocal, water, placeOfInterest],
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      }
    }
  }

  var mapOptions = getMapOptions();

  //Construcating Google Map based on mapOptions Configuration
  googleMap = new google.maps.Map(document.getElementById("map"), mapOptions);
  popUpInformation = new google.maps.InfoWindow({
    maxWidth: 200,
    content: ""
  });
  googleMapBounds = new google.maps.LatLngBounds();


  //Place popup Listener
  googleMap.addListener("click", () => popUpInformation.close(popUpInformation));
  window.onresize = () => googleMap.fitBounds(googleMapBounds);


  //Class for encapsulate the space information
  var Place = function (data, id, googleMap) {
    var self = this;
    this.name = ko.observable(data.name);
    this.location = data.location;
    this.marker = "";
    this.markerId = id;
    this.fs_id = data.fs_id;
    this.shortUrl = "";
    this.photoUrl = "";
  };


  //Getting the Content of the selected place
  function getContent(place) {
    var content = getPopupInformation(place.name, place.photoUrl, place.shortUrl);
    var errorString = "Error In FourSqure, Inforamtion not avilable";
    if (place.name.length > 0) {
      return content;
    } else {
      return content;
    }
  }


  function animateMarker(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () {
        marker.setAnimation(null);
      }, 700);
    }
  }

  //View Model for the Map
  function ViewModel() {
    var self = this;


    this.isNavClosed = ko.observable(true);
    this.navClick = function () {
      this.isNavClosed(!this.isNavClosed());
    };


    this.places = ko.observableArray();

    definedPlaces.forEach((item) => self.places.push(new Place(item)));



    this.places().forEach((place) => {
      var marker = makePlaceMarker(place);
      place.marker = marker;
      googleMapBounds.extend(marker.position);

      marker.addListener("click", (e) => {
        markerListener(place, marker);
      });
    });


    //Listener for marker click
    function markerListener(place, marker) {
      googleMap.panBy(PAN_BY_INIT_RANGE, PAN_BY_FINAL_RANGE);
      popUpInformation.setContent(getContent(place));
      popUpInformation.open(googleMap, marker);
      animateMarker(marker);
    }


    //Making PlaceMarker Tag
    function makePlaceMarker(place) {
      var marker = new google.maps.Marker({        
        map: googleMap,
        position: place.location,
        animation: google.maps.Animation.DROP
      });
      return marker;
    }


    self.getFoursquareData = ko.computed(() => {
      self.places().forEach((place) => {
        var venueId = place.fs_id + "/?";
        var foursquareUrl = BaseUrl + venueId + fourSquareClientID + fourSquareClientSecret + fsVersion;
        //Performing XMLHttp operation to load the marker content partially
        $.ajax({
          type: "GET",
          url: foursquareUrl,
          dataType: "json",
          cache: false,
          success: (data) => {
            var response = data.response ? data.response : "";
            var venue = response.venue ? data.venue : "";
            place.name = response.venue["name"];
            place.shortUrl = response.venue["shortUrl"];
            place.photoUrl = response.venue.bestPhoto["prefix"] + "height150" +
              response.venue.bestPhoto["suffix"];
          }
        });
      });
    });


    this.itemClick = (place) => {
      var markerId = place.markerId;
      google.maps.event.trigger(place.marker, "click");
    };


    self.filter = ko.observable("");

    this.filteredPlaces = ko.dependentObservable(() => {
      var query = this.filter().toLowerCase();
      if (!query) {

        return ko.utils.arrayFilter(self.places(), (item) => {
          item.marker.setVisible(true);
          return true;
        });
      } else {
        return ko.utils.arrayFilter(this.places(), (item) => {
          if (item.name.toLowerCase().indexOf(query) >= 0) {
            return true;
          } else {
            item.marker.setVisible(false);
            return false;
          }
        });
      }
    }, this);
  }


  ko.applyBindings(new ViewModel());
}
'use strict';

var raiseError = function () {

    document.getElementById('map-error').style.display = 'block';

    document.getElementById('map-error').innerHTML = 'Sorry, something went wrong. Please try again later.';

};