'use strict';

// Use vanilla JS only in case jQuery doesn't load

var mapError = function() {

    document.getElementById('map-error').style.display = 'block';

    document.getElementById('map-error').innerHTML = 'Sorry, something is not ok. Please try again later.';

};