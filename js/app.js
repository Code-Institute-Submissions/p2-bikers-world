// Variables declarations

// --- Store map instance
var map;
// --- Store API link
// CityBikes API 
var epCityBike = "https://api.citybik.es/v2/networks";
var epBikeWise = "https://bikewise.org:443/api/v2/incidents";


// Data source of CityBike API
function getDataFromCityBikeAsync(callback) {
    axios.get(epCityBike)
        .then(function(response) {
            let fbCityBike = response.data.networks;
            console.log(fbCityBike);
            
            // let results = response.data.features[0].geometry.coordinates;
            // // trigger the callback
            // callback(results);
            // console.log(response)
        });
}

// Data source of BikeWise API
function getDataFromBikeWiseAsync(callback) {
    axios.get(epBikeWise)
        .then(function(response){
            let fbBikeWise = response.data.incidents;
            console.log(fbBikeWise);
        });
}


// === Calling data retrieval function ===

// Retrieve data from CityBike API
getDataFromCityBikeAsync();

// Retrieve data from BikeWise API
getDataFromBikeWiseAsync();


// Initialize API call results on Google Map
function initMap() {
    
    // Render Singapore coordinates on Google Map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 1.35, lng: 103.81 },
        zoom: 11
    });
}


// Load the locations of the data
$(function() {
    $("#get-taxi-button").click(function() {
        // async - how do we wait for the data to finish
        // loading before executing the next task?
        getDataFromBikeWiseAsync(function(data) {
            
            // for each taxi inside the data
            for (let taxi of data) {
                let taxiPos = {
                    lat: taxi[1],
                    lng: taxi[0]
                };

                new google.maps.Marker({
                    position: taxiPos,
                    map: map
                })
            }
        });
    })
});


/*
function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 1.35, lng: 103.81 },
        zoom: 12
    });
}


// data source
function getDataFromEndpointAsync(callback) {
    axios.get(endpoint)
        .then(function(response) {
            let results = response.data.features[0].geometry.coordinates;
            // trigger the callback
            callback(results);
            console.log(response)
        });
}

*/
