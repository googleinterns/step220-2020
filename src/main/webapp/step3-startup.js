import Step3Renderer from './renderers/Step3Renderer.js';
import MapsInterface from './utilities/MapsInterface.js';
import DateManager from './utilities/DateManager.js';

// TODO(tzavidas): replace this array with the event management class, as discussed with remusn
const events = [{
        name: 'Breakfast',
        location: 'Google Zurich',
        startingTime: '09:30',
        endingTime: '10:00',
        travelMode: 'TRANSIT',
    }, {
        name: 'Lunch',
        location: 'Zurich Main Station',
        startingTime: '13:30',
        endingTime: '14:30',
        travelMode: 'TRANSIT',
    }, {
        name: 'Dinner',
        location: 'Bar am Wasser',
        startingTime: '19:30',
        endingTime: '20:30',
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

/**
 * Creates the template Date object (without the time), by extracting the reference date from the LocalStorage
 * @return {Date} template Date object with only the date set
 */
function prepareDateObjectForAPI() {
    const dateManager = new DateManager();

    const { year, month, date } = dateManager.getDate();

    const dateObj = new Date(year, month, date);
    dateObj.setDate(dateObj.getDate() + 7); // set the day 7 days to the future (needed by the API)

    return dateObj;
}

/**
 * Gets the date object from prepareDateObjectForAPI() and updates it with the given time string
 * @param time string on the form HH:MM
 * @return {Date} the finalized Date object that can be used on the API
 */
function getDateForAPI(time) {
    const dateObj = prepareDateObjectForAPI();

    const [ hour, minute ] = time.split(':');

    dateObj.setHours(hour);
    dateObj.setMinutes(minute);

    return dateObj;
}

// Draws the routes between each adjacent event
function drawRoutes(eventsList, mapsInterface) {
    for(let i = 0; i < eventsList.length - 1; i++) { // ommitting the last entry
        const currCoordinates = eventsList[i].coordinates,
            nextCoordinates = eventsList[i + 1].coordinates;

        if(currCoordinates !== null && nextCoordinates !== null && eventsList[i].location !== eventsList[i + 1].location) {
            mapsInterface.drawRoute(currCoordinates, nextCoordinates, eventsList[i].travelMode, {
                drivingOptions: {
                    departureTime: getDateForAPI(eventsList[i].endingTime),
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
