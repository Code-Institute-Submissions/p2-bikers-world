// Variables declarations
// ----------------------------------------------------------------
// --> Store map instance
var map, infoWindow;

// --> BikeWise API parameters
var bikewise_params = {
    'page': 1,
    // 'per_page': 50,
    // 'incident_type': '',
    // 'proximity': '',
    'proximity_square': 100,
    'query': ''
};
var bikewise_params_2 = {
    'page': 5,
    'per_page': 50,
    // 'incident_type': '',
    // 'proximity': '',
    'proximity_square': 1000,
    'query': ''
};

// --- Store API link
// -----> CityBikes API
var epCityBike = "https://api.citybik.es/v2/networks";
// -----> BikeWise API
var epBikeWise = "https://bikewise.org:443/api/v2/incidents";

// Data source of CityBike API
function getDataFromCityBikeAsync(callback) {
    axios.get(epCityBike)
        .then(function(response) {
            let fbCityBike = response.data.networks;
            console.log(fbCityBike);
            callback(fbCityBike);
        });
}

// Data source of BikeWise API
function getDataFromBikeWiseAsync(params, callback) {
    axios.get(epBikeWise, { params })
        .then(function(response) {

            // let fbBikeWise = response.data.incidents;
            // callback(fbBikeWise);
            // console.log(fbBikeWise);
            console.log(response);

        });
}

// === Function : Retrieve Data ===

// Retrieve data from BikeWise API
getDataFromBikeWiseAsync(bikewise_params);
getDataFromBikeWiseAsync(bikewise_params_2);

// Initialize API call results on Google Map
function initMap() {

    // Render Singapore coordinates on Google Map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 1.35, lng: 103.81 },
        zoom: 3
    });
}

// Load the locations of the data
$(function() {

    $("#get-bike-button").click(function() {

        getDataFromCityBikeAsync(function(data) {

            // for each bike inside the data
            for (let bike of data) {

                // Store each bike's latitude and longitute in bikePostion object
                let bikePosition = {
                    lat: bike.location.latitude,
                    lng: bike.location.longitude
                };

                // Drop maker for each bike's location
                new google.maps.Marker({
                    map: map,
                    position: bikePosition,
                    animation: google.maps.Animation.DROP
                })
            }
        });
    })

    // Get current user's location
    $("#get-current-location").click(function() {
        
        // Initialize Google's infoWindow property
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            
            // Initialize current location's latitude and longitude in object, pos
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            
            // Drop marker on current location
            new google.maps.Marker({
              position: pos,
              map: map,
              animation: google.maps.Animation.DROP,
              title: 'Here I am!'
            });
            
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            
            map.setCenter(pos);
            
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

    });
});

// Google's Geolocation error handler
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
