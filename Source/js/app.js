/** The model for app. These are the coworking spaces listings that will
be shown to the user.*/

var initialSpaces = [
  {
    "name": "Aspire Systems",
    "location": { "lat": 12.8370922, "lng": 80.2200543 },
    "fs_id": "5318c03b498e5ea5cf57b72d"
  },
  {
    "name": "Dosart",
    "location": { "lat": 13.0815222, "lng": 80.2457823 },
    "fs_id": "5318c03b498e5ea5cf57b72d"
  },
  {
    "name": "Chennai Central",
    "location": { "lat": 13.0834352, "lng": 80.2739593 },
    "fs_id": "5318c03b498e5ea5cf57b72d"
  },
  {
    "name": "ITC Grand Chola",
    "location": { "lat": 13.0105896, "lng": 80.2185199 },
    "fs_id": "5318c03b498e5ea5cf57b72d"
  },
  {
    "name": "Phoenix Marketcity",
    "location": { "lat": 12.992312, "lng": 80.2148427 },
    "fs_id": "5318c03b498e5ea5cf57b72d"
  },
  {
    "name": "Radiance Shine",
    "location": { "lat": 12.821473, "lng": 80.2278703 },
    "fs_id": "5318c03b498e5ea5cf57b72d"
  },
  {
    "name": "Marina Beach",
    "location": { "lat": 13.0515508, "lng": 80.2747073 },
    "fs_id": "5318c03b498e5ea5cf57b72d"
  },
  {
    "name": "SRM Institute of Science And Technology",
    "location": { "lat": 12.822947, "lng": 80.0457755 },
    "fs_id": "5318c03b498e5ea5cf57b72d"
  },
  {
    "name": "MGM Dizzee World",
    "location": { "lat": 12.8477897, "lng": 80.2026093 },
    "fs_id": "5318c03b498e5ea5cf57b72d"
  }
];

// Foursquare API Url parameters in global scope
var BaseUrl = "https://api.foursquare.com/v2/venues/",
  fsClient_id = "client_id=J4JTA0KKSKB50R1ONPYB3W4H532SPS403IHJKL4VQMNMNKT0",
  fsClient_secret = "&client_secret=W5FBT3FTE1X4RVJXPSJJDNNXCYHXL0OMH1TPVINZ40NO0LX5",
  fsVersion = "&v=20161507";


// Create global variables to use in google maps
var map,
  infowindow,
  bounds;

//googleSuccess() is called when page is loaded
function googleSuccess() {
  "use strict";

  //Google map elements - set custom map marker
  var image = {
    "url": "img/32x32.png",
    // This marker is 32 pixels wide by 32 pixels high.
    "size": new google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    "origin": new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    "anchor": new google.maps.Point(0, 32)
  };

  //Google map elements - set map options
  // 13.0194459,80.2003777,12z
  var mapOptions = {
    "center": {
      "lat": 12.9999459,
      "lng": 80.2003777
    },
    zoom: 11,
    styles: [
      {
        "featureType": "landscape",
        "stylers": [
          { "hue": "#FFBB00" },
          { "saturation": 43.400000000000006 },
          { "lightness": 37.599999999999994 },
          { "gamma": 1 }
        ]
      }, {
        "featureType": "road.highway",
        "stylers": [
          { "hue": "#FFC200" },
          { "saturation": -61.8 },
          { "lightness": 45.599999999999994 },
          { "gamma": 1 }
        ]
      }, {
        "featureType": "road.arterial",
        "stylers": [
          { "hue": "#FF0300" },
          { "saturation": -100 },
          { "lightness": 51.19999999999999 },
          { "gamma": 1 }
        ]
      }, {
        "featureType": "road.local",
        "stylers": [
          { "hue": "#FF0300" },
          { "saturation": -100 },
          { "lightness": 52 },
          { "gamma": 1 }
        ]
      }, {
        "featureType": "water",
        "stylers": [
          { "hue": "#0078FF" },
          { "saturation": -13.200000000000003 },
          { "lightness": 2.4000000000000057 },
          { "gamma": 1 }
        ]
      }, {
        "featureType": "poi",
        "stylers": [
          { "visibility": "off" }
        ]
      }],
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    }
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  infowindow = new google.maps.InfoWindow({
    maxWidth: 150,
    content: ""
  });
  bounds = new google.maps.LatLngBounds();

  // Close infowindow when clicked elsewhere on the map
  map.addListener("click", function () {
    infowindow.close(infowindow);
  });

  // Recenter map upon window resize
  window.onresize = function () {
    map.fitBounds(bounds);
  };


  //Creating Space object
  var Space = function (data, id, map) {
    var self = this;
    this.name = ko.observable(data.name);
    this.location = data.location;
    this.marker = "";
    this.markerId = id;
    this.fs_id = data.fs_id;
    this.shortUrl = "";
    this.photoUrl = "";
  }

  // Get contect infowindows
  function getContent(space) {
    var contentString = "<h3>" + space.name +
      "</h3><br><div style='width:200px;min-height:120px'><img src=" + '"' +
      space.photoUrl + '"></div><div><a href="' + space.shortUrl +
      '" target="_blank">More info in Foursquare</a><img src="img/foursquare_150.png">';
    var errorString = "Oops, Foursquare content not available."
    if (space.name.length > 0) {
      return contentString;
    } else {
      return errorString;
    }
  }

  // Bounce effect on marker
  function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () {
        marker.setAnimation(null);
      }, 700);
    }
  };

  function ViewModel() {
    var self = this;

    // Nav button control
    this.isNavClosed = ko.observable(true);
    this.navClick = function () {
      this.isNavClosed(!this.isNavClosed());
    };

    // Creating list elements from the spaceList
    this.spaceList = ko.observableArray();
    initialSpaces.forEach(function (item) {
      self.spaceList.push(new Space(item));
    });

    // Create a marker per space item
    this.spaceList().forEach(function (space) {
      var marker = new google.maps.Marker({
        map: map,
        position: space.location,
        // icon: image,
        animation: google.maps.Animation.DROP
      });
      space.marker = marker;
      // Extend the boundaries of the map for each marker
      bounds.extend(marker.position);
      // Create an onclick event to open an infowindow and bounce the marker at each marker
      marker.addListener("click", function (e) {
        map.panTo(this.position);
        //pan down infowindow by 200px to keep whole infowindow on screen
        map.panBy(0, -200)
        infowindow.setContent(getContent(space));
        infowindow.open(map, marker);
        toggleBounce(marker);
      });
    });

    // Foursquare API request
    self.getFoursquareData = ko.computed(function () {
      self.spaceList().forEach(function (space) {

        // Set initail variables to build the correct URL for each space
        var venueId = space.fs_id + "/?";
        var foursquareUrl = BaseUrl + venueId + fsClient_id + fsClient_secret + fsVersion;
        // space.name = "Name given";
        // space.shortUrl = "comeUrl";
        // space.photoUrl = "Pic";
        // AJAX call to Foursquare
        $.ajax({
          type: "GET",
          url: foursquareUrl,
          dataType: "json",
          cache: false,
          success: function (data) {
            var response = data.response ? data.response : "";
            var venue = response.venue ? data.venue : "";
            space.name = response.venue["name"];
            space.shortUrl = response.venue["shortUrl"];
            space.photoUrl = response.venue.bestPhoto["prefix"] + "height150" +
              response.venue.bestPhoto["suffix"];
          }
        });
      });
    });

    // Creating click for the list item
    this.itemClick = function (space) {
      var markerId = space.markerId;
      google.maps.event.trigger(space.marker, "click");
    }

    // Filtering the Space list
    self.filter = ko.observable("");

    this.filteredSpaceList = ko.dependentObservable(function () {
      var q = this.filter().toLowerCase();
      //var self = this;
      if (!q) {
        // Return self.spaceList() the original array;
        return ko.utils.arrayFilter(self.spaceList(), function (item) {
          item.marker.setVisible(true);
          return true;
        });
      } else {
        return ko.utils.arrayFilter(this.spaceList(), function (item) {
          if (item.name.toLowerCase().indexOf(q) >= 0) {
            return true;
          } else {
            item.marker.setVisible(false);
            return false;
          }
        });
      }
    }, this);
  };

  // Activates knockout.js
  ko.applyBindings(new ViewModel());
}