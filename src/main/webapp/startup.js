import Renderer from './Renderer.js';
import addEventToLocalStorage from './popup.js';
import EventManager from './utilities/EventManager.js';

// TODO (remusn@) change time format so that it matches Google Maps time format

// Events array for testing
const events = [
    {
        "title": "Breakfast",
        "location": "Zurich",
        "startTime": "9:30AM",
        "endTime": "10:30AM"
    },
    {
        "title": "Lunch",
        "location": "Stuttgart",
        "startTime": "1:30PM",
        "endTime": "2:30PM"
    },
    {
        "title": "Dinner",
        "location": "Bucharest",
        "startTime": "7:30PM",
        "endTime": "8:30PM"
    }
]

// TODO (remusn@) Link Google Calendar with the function

/**
 * Imports events from Google Calendar
 */
function importEvents() {
    const eventManager = new EventManager();
    for (let event of events) {
        eventManager.addEvent(event)
    }

    let container = document.getElementsByClassName('list')[0];
    const eventRenderer = new Renderer(container);
    eventRenderer.render(eventManager.getEvents());
}

// Create the object only once
if (window.itnerary == null) {
    window.itnerary = {};
}

window.itnerary.importEvents = importEvents;

/**
 * Empties the event list
 */
function startup() {
    const eventManager = new EventManager();
    eventManager.deleteAllEvents();
}

/**
 * Startup() function is used every time the window refreshes
 */
window.onload = startup;
