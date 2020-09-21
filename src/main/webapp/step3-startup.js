import Step3Renderer from './renderers/Step3Renderer.js';
import MapsInterface from './utilities/MapsInterface.js';

// TODO(tzavidas): replace this array with the event management class, as discussed with remusn
const events = [{
        name: 'Breakfast',
        location: 'Google Zurich',
        startingTime: new Date('2020-09-22T09:30:00'),
        endingTime: new Date('2020-09-22T10:00:00'),
        travelMode: 'TRANSIT',
    }, {
        name: 'Lunch',
        location: 'Zurich Main Station',
        startingTime: new Date('2020-09-22T13:30:00'),
        endingTime: new Date('2020-09-22T14:30:00'),
        travelMode: 'TRANSIT',
    }, {
        name: 'Dinner',
        location: 'Bar am Wasser',
        startingTime: new Date('2020-09-22T19:30:00'),
        endingTime: new Date('2020-09-22T20:30:00'),
    }
];

// For each event, it gets the location, converts it into coordinates and adds it to the object
async function getLocationsInCoordinates(eventsList, mapsInterface) {
    const locationsConverted = [];
    let hasErrors = false;

    for(const event of eventsList) {
        const { status: reqStatus, coordinates } = await mapsInterface.convertToCoordinates(event.location);

        if(reqStatus === 'OK') {
            event.coordinates = coordinates;
        } else {
            event.coordinates = null;

            hasErrors = true;
        }
    }

    if(hasErrors) {
        alert('Warning: Some locations could not be converted to coordinates! Those locations will be ommitted!');
    }
}

// Adds the pins on the map for each event
function addMarkers(eventsList, mapsInterface) {
    for(const { coordinates: currCoordinates } of eventsList) {
        if(currCoordinates !== null) {
            mapsInterface.addMarker(currCoordinates);
        }
    }
}

// Draws the routes between each adjacent event
function drawRoutes(eventsList, mapsInterface) {
    for(let i = 0; i < eventsList.length - 1; i++) { // ommitting the last entry
        const currCoordinates = eventsList[i].coordinates,
            nextCoordinates = eventsList[i + 1].coordinates;

        if(currCoordinates !== null && nextCoordinates !== null && eventsList[i].location !== eventsList[i + 1].location) {
            mapsInterface.drawRoute(currCoordinates, nextCoordinates, eventsList[i].travelMode, {
                drivingOptions: {
                    departureTime: eventsList[i].endingTime,
                }
            });
        }
    }
}

// Entry point for the business logic for the MapView
async function setupMap(eventsList, mapsInterface) {
    await getLocationsInCoordinates(eventsList, mapsInterface);

    addMarkers(eventsList, mapsInterface);
    drawRoutes(eventsList, mapsInterface);
}

// Function that gets called when the Maps API loads
// It's the entry point of JavaScript and it generates the dynamic HTML code and sets up the MapView
function startup() {
    const container = document.getElementsByClassName('main-interface')[0];

    const renderer = new Step3Renderer(container);
    renderer.render(events);

    const mapView = document.getElementsByClassName('map-view')[0];
    const mapsInterface = new MapsInterface(mapView, { lat: 0, lng: 0 });

    setupMap(events, mapsInterface);
}

// Global reference to be called by the Maps JS API (when it loads)
window.startup = startup;
