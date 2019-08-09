// Variables declaration
// ----------------------------------------------------------------

var map, infoWindow; // Store map instance, infowindow from Google
var bikeIncidents = []; // Store bike incidents

// Categories of incident type - BikeWise API
var incident_cate = ["Crash", "Hazard", "Theft", "Unconfirmed", "Infrastructure", "Chop Shop"];                    

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
            callback(fbCityBike);
            
        });
}

// Data source of BikeWise API
function getDataFromBikeWiseAsync(params, callback) {
    axios.get(epBikeWise, { params })
        .then(function(response) {

            let fbBikeWise = response.data.incidents;
            callback(fbBikeWise);
            
        });
}

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
        }
        else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

    });

    // Button action to search for bike incidents
    $("#search-bike-incidents").click(function() {

        $("#incidents-row").show();

        // Append cards into id "incident-posts" element
        // -----------------------------------------------
        
        // Empty child elements of selected id
        $("#incident-posts").empty()
        
        // Initialize counter for incidents post. Assign each post for better recognition.
        var num = 1;
        getDataFromBikeWiseAsync(bikewise_params, function(data) {
            
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
                    
                } else if (incident_result_type == incident_cate[5]){
                    bs_bgcolor = "bg-primary";
                    
                } else {
                    bs_bgcolor = "bg-light";
                    bs_textcolor = "text-dark";
                }
                
                // Test return fields from BikeWise API call ...
                console.log(
                    incident_result_address + "\n" +
                    incident_result_descript + "\n" + 
                    incident_result_title + "\n" +
                    incident_result_type
                );
                
                var bsCard = "<div class='card "+ bs_textcolor + " " + bs_bgcolor + " mb-3'>" +
                            "<div class='card-header'><h4>" + num + ". " + incident_result_title + "</h4></div>" +
                            "<div class='card-body'>" +
                                "<div class='card-title'><p><b>[Address]</b> " +
                                    incident_result_address + "</p><p><b>[Description]</b> " +
                                    incident_result_descript +
                                "</p></div>" +
                            "</div>" +
                        "</div>";
                
                // Append cards into id "incident-posts" element
                $("#incident-posts").append(bsCard);
                
                // Increment incident post number
                num++;
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


$(document).ready(function() {
    // Append latest year to html page footer
    $("#getDate").append(new Date().getFullYear());
    // Hide row with "incidents-row" id
    $("#incidents-row").hide();
});
