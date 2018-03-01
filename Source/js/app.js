/*jshint esversion: 6 */
var definedPlaces = [
  {
    "name": "Aspire Systems",
    "location": { "lat": 12.8370922, "lng": 80.2200543 },
    "fs_id": "4cac25192f08236a4a7d8961"
  },
  {
    "name": "Chennai Central",
    "location": { "lat": 13.0834352, "lng": 80.2739593 },
    "fs_id": "5624c11e498eec470ec9d53e"
  },
  {
    "name": "ITC Grand Chola",
    "location": { "lat": 13.0105896, "lng": 80.2185199 },
    "fs_id": "4d848e465ad3a0932c8dd1fd"
  },
  {
    "name": "Phoenix Marketcity",
    "location": { "lat": 12.992312, "lng": 80.2148427 },
    "fs_id": "4fe16257e4b0e4cc311bb9ab"
  },
  {
    "name": "Radiance Shine",
    "location": { "lat": 12.821473, "lng": 80.2278703 },
    "fs_id": "55b7676d498e4a3a0deab767"
  },
  {
    "name": "Marina Beach",
    "location": { "lat": 13.0515508, "lng": 80.2747073 },
    "fs_id": "4d046ec926adb1f721c3d270"
  },
  {
    "name": "SRM Institute of Science And Technology",
    "location": { "lat": 12.822947, "lng": 80.0457755 },
    "fs_id": "4e12c7047d8b4d5613e67466"
  },
  {
    "name": "MGM Dizzee World",
    "location": { "lat": 12.8477897, "lng": 80.2026093 },
    "fs_id": "4d3fd175cb84b60c2a9680ab"
  }
];

// Foursquare API Url parameters in global scope
var BaseUrl = "https://api.foursquare.com/v2/venues/",
  fsClient_id = "client_id=J4JTA0KKSKB50R1ONPYB3W4H532SPS403IHJKL4VQMNMNKT0",
  fsClient_secret = "&client_secret=W5FBT3FTE1X4RVJXPSJJDNNXCYHXL0OMH1TPVINZ40NO0LX5",
  fsVersion = "&v=20161507";


// Create global variables to use in google maps
var map,
  popUpInformation,
  bounds;

let PAN_BY_INIT_RANGE = 0;
let PAN_BY_FINAL_RANGE = -200;

//googleSuccess() is called when page is loaded
function googleSuccess() {
  "use strict";

  //Google map elements - set custom map marker
  var image = {
    "url": "img/32x32.png",
    // This marker is 32 pixels wide by 32 pixels high.
    "size": new google.maps.Size(32, 32),
    // The origin for this image is (0, 0) .
    "origin": new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    "anchor": new google.maps.Point(0, 32)
  };


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

  //Configuration for the google map
  var landscape = getStyle("landscape", "#0044ff", 73.40, 37.59, 1);
  var roadHighway = getStyle("road.highway", "#ff4300", -70.8, 45.59, 1);
  var roadArterial = getStyle("road.arterial", "#00fcff", -100, 51.19, 1);
  var roadLocal = getStyle("road.local", "#FF0300", -100, 52, 1);
  var water = getStyle("water", "#0054b3", -5.20, 2.40, 1);

  var poi = {
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  };

  var mapOptions = {
    "center": {
      "lat": 12.9999459,
      "lng": 80.2003777
    },
    zoom: 11,
    styles: [landscape, roadHighway, roadArterial, roadLocal, water, poi],
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    }
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  popUpInformation = new google.maps.InfoWindow({
    maxWidth: 150,
    content: ""
  });
  bounds = new google.maps.LatLngBounds();


  map.addListener("click", () => popUpInformation.close(popUpInformation));
  window.onresize = () => map.fitBounds(bounds);




  var Place = function (data, id, map) {
    var self = this;
    this.name = ko.observable(data.name);
    this.location = data.location;
    this.marker = "";
    this.markerId = id;
    this.fs_id = data.fs_id;
    this.shortUrl = "";
    this.photoUrl = "";
  };


  function getContent(place) {
    var contentString = "<h3>" + place.name +
      "</h3><br><div style='width:200px;min-height:120px'><img src=" + '"' +
      place.photoUrl + '"></div><div><a href="' + place.shortUrl +
      '" target="_blank">More info in Foursquare</a><img src="img/foursquare_150.png">';
    var errorString = "Oops, Foursquare content not available.";
    if (place.name.length > 0) {
      return contentString;
    } else {
      return errorString;
    }
  }


  function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () {
        marker.setAnimation(null);
      }, 700);
    }
  }

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
      bounds.extend(marker.position);

      marker.addListener("click", (e) => {
        markerListener(place, marker);
      });
    });


    function markerListener(place, marker) {
      map.panBy(PAN_BY_INIT_RANGE, PAN_BY_FINAL_RANGE);
      popUpInformation.setContent(getContent(place));
      popUpInformation.open(map, marker);
      toggleBounce(marker);
    }



    function makePlaceMarker(place) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.location,
        animation: google.maps.Animation.DROP
      });
      return marker;
    }


    self.getFoursquareData = ko.computed(function () {
      self.places().forEach(function (place) {
        var venueId = place.fs_id + "/?";
        var foursquareUrl = BaseUrl + venueId + fsClient_id + fsClient_secret + fsVersion;

        $.ajax({
          type: "GET",
          url: foursquareUrl,
          dataType: "json",
          cache: false,
          success: function (data) {
            var response = data.response ? data.response : "";
            var venue = response.venue ? data.venue : "";
            place.name = response.venue["name"];
            place.shortUrl = response.venue["shortUrl"];
            if (response.venue.bestPhoto != null)
              place.photoUrl = response.venue.bestPhoto["prefix"] + "height150" +
                response.venue.bestPhoto["suffix"];
            else
              place.photoUrl = "img/pic404.jpg";
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

        return ko.utils.arrayFilter(self.places(), function (item) {
          item.marker.setVisible(true);
          return true;
        });
      } else {
        return ko.utils.arrayFilter(this.places(), function (item) {
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