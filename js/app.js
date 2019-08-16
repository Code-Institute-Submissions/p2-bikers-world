// Variables declaration
// ----------------------------------------------------------------

/**
 * Google Maps API
 * General variable(s)
 * --> (1) map          === Display map on website
 * --> (2) infoWindow   === Display output message on marker
 * --> (3) marker       === Display marker on google map
 */
var map, infoWindow;    // Store map instance, infowindow from Google
var marker;
var gMarkers = [];
var markerClusterer;

/**
 * API Links
 * --> 1. BikeWise
 * --> 2. CityBike
 */
var epBikeWise = "https://bikewise.org:443/api/v2/incidents";
var epCityBike = "https://api.citybik.es/v2/networks";

/**
 * CityBike API variables
 * Store map locations as objects within array(s)
 * --> (1) mapLocations     === Map locations of registered bicycles
 */
var mapLocations = [];

/**
 * BikeWise API variables
 * --> (1) incident_cate    === Prefixed available incident categories from BikeWise
 * --> (2) bikewise_params  === Insert parameters into API upon request
 */
var incident_cate = ["Crash", "Hazard", "Theft", "Unconfirmed", "Infrastructure issue", "Chop Shop"];
var bikewise_params = {};

/** =======================================================================================================
*   =======================================================================================================
*   =======================================================================================================
*                                                                                       REST OF THE PROGRAM
*   =======================================================================================================
*   =======================================================================================================
*   =======================================================================================================
*/

// CityBike API data source
function getDataFromCityBikeAsync(callback) {
    axios.get(epCityBike)
        .then(function (response) {
            let fbCityBike = response.data.networks;
            callback(fbCityBike);

        });
}

// BikeWise API data source
function getDataFromBikeWiseAsync(params, callback) {
    axios.get(epBikeWise, { params })
        .then(function (response) {
            let fbBikeWise = response.data.incidents;
            callback(fbBikeWise);

        });
}

function checkAndClearMarkers() {

    // Check if array value or length is undefined or 0
    if (!gMarkers || gMarkers.length != 0) {
        
        setMapOnAll(null);
        gMarkers = [];

        // Check if marker clusterer exist
        if (markerClusterer != undefined) {
            // Clear clusterer on Google Map
            markerClusterer.clearMarkers();
        }
    }
}

function setMapOnAll(map) {

    for (var i = 0; i < gMarkers.length; i++) {        
        gMarkers[i].setMap(map);        
    }
}

// Initialize API call results on Google Map
function initMap() {

    checkAndClearMarkers();

    // Render Singapore coordinates on Google Map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 1.35, lng: 103.81 },
        zoom: 10
    });

    var uInput = document.getElementById("pac-input");
    var autocomplete = new google.maps.places.Autocomplete(uInput);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    marker = new google.maps.Marker({
        map: map
        // anchorPoint: new google.maps.Point(0, -29)
    });
    gMarkers.push(marker);

    // Add click event listener to marker
    marker.addListener('click', function () {
        map.setZoom(17);
        map.setCenter(marker.getPosition());
    });

    autocomplete.addListener('place_changed', function () {
        // infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            
            map.fitBounds(place.geometry.viewport);
            map.setZoom(12);
            map.setCenter(place.geometry.location);            

        } else {
            
            map.setCenter(place.geometry.location);
            map.setZoom(15);                        
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        // var address = '';
        // if (place.address_components) {
        //     address = [
        //         (place.address_components[0] && place.address_components[0].short_name || ''),
        //         (place.address_components[1] && place.address_components[1].short_name || ''),
        //         (place.address_components[2] && place.address_components[2].short_name || '')
        //     ].join(' ');
        // }

        // infowindowContent.children['place-icon'].src = place.icon;
        // infowindowContent.children['place-name'].textContent = place.name;
        // infowindowContent.children['place-address'].textContent = address;
        // infowindow.open(map, marker);

    });

}

// Execute code when script is loaded
$(function () {

    // Append latest year to html page footer
    $("#getDate").append(new Date().getFullYear());

    // Hide rows from selected id
    $("#incidents-row").hide();

    // FUNCTION : Retrieve ALL bike locations that is registered worldwide
    $("#get-bike-button").click(function () {

        checkAndClearMarkers();

        /** 
         * Clear array to prevent overlapping of bike locations that will be
         * used later in getDataFromCityBikeAsync() callback
        */
        mapLocations = [];
        getDataFromCityBikeAsync(function (data) {

            for (let bike of data) {
                /**
                 *  Assign bike locations in latitude and longitute and allocate  
                 * them in "bikePostiion" object variable.                                
                */
                let bikePosition = {
                    lat: bike.location.latitude,
                    lng: bike.location.longitude
                };
                mapLocations.push(bikePosition);
            }

            /**
             * Initialize "markers" variable,
             * allocate markers with defined properties
             * --> map
             * --> map position
             * --> map animation
             * and, return the markers for display on map later
             */
            for (var x = 0; x < mapLocations.length; x++) {
                
                // Initialize new marker object into variable          
                marker = new google.maps.Marker({
                    map: map,
                    position: (mapLocations[x]),
                    animation: google.maps.Animation.DROP
                });

                // Initialize click event for per marker location
                google.maps.event.addListener(marker, 'click', (function(marker, x) {
                    return function() {
                        map.setZoom(17);
                        map.setCenter(marker.getPosition()); 
                    }
                })(marker, x));

                // Add marker object into array for later use
                gMarkers.push(marker);
            }                        

            // Add marker clusterer to manage the markers.
            markerClusterer = new MarkerClusterer(map, gMarkers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });

            // Centralized map position            
            map.setZoom(1);
            map.setCenter({ lat: 0, lng: 0 });

        });
    })

    // FUNCTION : Get current user's location
    $("#get-current-location").click(function () {

        checkAndClearMarkers();

        // Initialize Google's infoWindow property
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                // Initialize current location's latitude and longitude in object, pos
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Drop marker on current location
                var currMarker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: 'HERE I AM!'
                });
                gMarkers.push(currMarker);

                // Add click event listener to marker
                currMarker.addListener('click', function () {
                    map.setZoom(17);
                    map.setCenter(currMarker.getPosition());
                })
                // Centralized map position
                map.setCenter(pos);
                map.setZoom(12);

            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });

        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

    });

    // Button action to search for bike incidents
    $("#search-bike-incidents").click(function () {

        // Show rows from selected id
        $("#incidents-row").show();

        // Append cards into id "incident-posts" element
        // -----------------------------------------------

        // Empty child elements of selected id
        $("#incident-posts").empty()

        /**
         * Instatiate "params" object variable for adding key pair value later
         * on for BikeWise API consumption. Comes with default key pair value
         * --> "page" - Results from which page of the forum
         * --> "proximity_square" - Distance between search and incidents location
         */
        var params = {
            'page': 1,
            'proximity_square': 100,
        }

        /**
         * Instantiate variables to retrieve values from
         * --> 1. Incidents search box
         * --> 2. Incidents type select box
         */
        var incident_search_val = $("#incidentSearchInput").val();
        if (incident_search_val) {
            params["incident_search_val"] = incident_search_val;
        }
        
        var incident_type_val = $("#incident-type-selectBox option:selected").val();
        if (incident_type_val) {
            params["incident_type"] = incident_type_val;
        }

        // Initialize bikewise api parameters for API consumption.
        bikewise_params = params;

        // Initialize counter for incidents post. Assign each post for better recognition.
        var incidentPostNo = 1;

        getDataFromBikeWiseAsync(bikewise_params, function (data) {

            for (let bikeInfo in data) {

                // Retrieve values from BikeWise API call
                incident_result_address = data[bikeInfo].address;
                incident_result_title = data[bikeInfo].title;
                incident_result_descript = data[bikeInfo].description;
                incident_result_type = data[bikeInfo].type;

                // Initialize bootstrap variables for both
                // background-color and text-color
                var bs_bgcolor, bs_textcolor = "text-white";

                // Assign bootstrap background color when value equal type
                if (incident_result_type == incident_cate[0]) {
                    bs_bgcolor = "bg-danger";

                } else if (incident_result_type == incident_cate[1]) {
                    bs_bgcolor = "bg-warning";
                    bs_textcolor = "text-dark";

                } else if (incident_result_type == incident_cate[2]) {
                    bs_bgcolor = "bg-dark";

                } else if (incident_result_type == incident_cate[3]) {
                    bs_bgcolor = "bg-light";
                    bs_textcolor = "text-dark";

                } else if (incident_result_type == incident_cate[4]) {
                    bs_bgcolor = "bg-success";

                } else if (incident_result_type == incident_cate[5]) {
                    bs_bgcolor = "bg-primary";

                } else {
                    bs_bgcolor = "bg-light";
                    bs_textcolor = "text-dark";

                }

                var bsCard = "<div class='card " + bs_textcolor + " " + bs_bgcolor + " mb-3'>" +
                    "<div class='card-header'><h4>" + incidentPostNo + ". " + incident_result_title + "</h4></div>" +
                    "<div class='card-body'>" +
                    "<div class='card-title'><p><b>Incident location<br></b> " +
                    incident_result_address + "</p><p><b>Incident details<br></b> " +
                    incident_result_descript +
                    "</p></div>" +
                    "</div>" +
                    "</div>";

                // Append cards into id "incident-posts" element
                $("#incident-posts").append(bsCard);

                // Increment incident post number
                incidentPostNo++;
            }

        });

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