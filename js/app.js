// Variables declarations
// ----------------------------------------------------------------
// --- Store map instance
var map;

// --- Store API link
var epCityBike = "https://api.citybik.es/v2/networks";          // CityBikes API
var epBikeWise = "https://bikewise.org:443/api/v2/incidents";   // BikeWise API


// Data source of CityBike API
function getDataFromCityBikeAsync(callback) {
    axios.get(epCityBike)
        .then(function(response) {
            let fbCityBike = response.data.networks;
            // console.log(fbCityBike);
            callback(fbCityBike);
            
        });
}

// Data source of BikeWise API
function getDataFromBikeWiseAsync(callback) {
    axios.get(epBikeWise)
        .then(function(response){
            
            // let fbBikeWise = response.data.incidents;
            // callback(fbBikeWise);
            // console.log(fbBikeWise);
            console.log(response);
            
        });
}


// === Calling data retrieval function ===

// Retrieve data from CityBike API
// getDataFromCityBikeAsync();
// Retrieve data from BikeWise API
// getDataFromBikeWiseAsync();


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
                
                console.log(bikePosition);
                
                // Drop maker for each bike's location
                new google.maps.Marker({
                    position: bikePosition,
                    map: map
                })
                
            }
            
        });
        
    })
});