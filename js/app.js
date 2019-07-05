var map;
var endpoint = "https://api.data.gov.sg/v1/transport/taxi-availability"

$(function(){
    $("#get-taxi-button").click(function(){
      // async - how do we wait for the data to finish
      // loading before executing the next task?
      getDataFromEndpointAsync(function(data){
          
          // for each taxi inside the data
          for (let taxi of data)
          {
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