let map;
const key = ''; // please use your own Maps API key

const addMarker = (map, position) => {
    const newMarker = new google.maps.Marker({
        position
    });

    newMarker.setMap(map);
    return true;
}

async function addMarkerFromPlaceName(map, name) {
    const position = await convertToCoordinates(name);

    if(!position) {
        return false;
    }

    return addMarker(map, position);
}

async function convertToCoordinates(name) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${name}`; // Maps JS API can also be used

    const res = await fetch(url);
    const json = await res.json();

    if(json.status !== "OK") {
        return false;
    }

    const coords = json.results[0].geometry.location;
    return coords;
};

function coordsToString(coords) {
    return `${coords.lat}, ${coords.lng}`;
}

const travelModes = {
    driving: 'DRIVING',
    bicycling: 'BICYCLING',
    transit: 'TRANSIT',
    walking: 'WALKING'
};

function printDirectionsOnMap(map, from, to, travelMode) {
    const directionsService = new google.maps.DirectionsService(),
        directionsRenderer = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });

    directionsRenderer.setMap(map);

    directionsService.route({
        origin: from,
        destination: to,
        travelMode
    }, (result, status) => {
        if(status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 48.7842313,
            lng: 9.1760491
        },
        zoom: 15
    });
}

const handleGoClick = () => {
    const fromName = document.getElementsByName('from')[0].value,
        toName = document.getElementsByName('to')[0].value;

    if(!addMarkerFromPlaceName(map, fromName)) {
        alert('Please check your arrival name!');
    } else if(!addMarkerFromPlaceName(map, toName)) {
        alert('Please check your destination name!')
    } else {
        printDirectionsOnMap(map, fromName, toName, travelModes.transit);
    }
}
