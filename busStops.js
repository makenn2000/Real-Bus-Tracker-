//[-71.093729, 42.359244]
const dataArray = [];

  // TODO: add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoidGVzdHVzZXIxMDAwIiwiYSI6ImNraDkzZ2pkMzAzMHoycnBmMXpvZ3UwZnMifQ.jAE4YsPeAJv50VK92NSpOQ';

let startLat = 42.359244;
let startLng = -71.093729;
let radius = '0.02'; // 0.01 = half a mile
let url = 'https://api-v3.mbta.com/stops?filter%5Blatitude%5D=' + String(startLat) + '&filter%5Blongitude%5D=' + String(startLng) + '&filter%5Bradius%5D=' + radius;

  // This is the map instance
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [startLng, startLat],
    zoom: 14,
});

// TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"
  // Create a new marker.
const personMarker = new mapboxgl.Marker()
  .setLngLat([startLng, startLat])
  .addTo(map);

async function makeRequest(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
};

// counter here represents the index of the current bus stop
let counter = 0;
function getStops() {
  // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
  // Use counter to access bus stops in the array busStops
  // Make sure you call move() after you increment the counter.  
    makeRequest(url).then(function(result) {
        dataArray.push(result);
        let x = JSON.parse(dataArray);
        for (let i = 0; i < x.data.length; i++){
            let busMarker = new mapboxgl.Marker()
                .setLngLat([x.data[i].attributes.longitude, x.data[i].attributes.latitude])
                .addTo(map);
        }
    })
}

// Do not edit code past this point
if (typeof module !== 'undefined') {
  module.exports = { getStops };
}