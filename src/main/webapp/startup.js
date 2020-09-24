import Renderer from './Renderer.js';
import addEventToLocalStorage from './popup.js';
import EventManager from './utilities/EventManager.js';

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

/**
 * Imports events
 */
function importEvents() {
    const eventManager = new EventManager();
    for (let event of events) {
        eventManager.addEvent(event)
    }

    let container = document.getElementsByClassName('list')[0];
    const eventRenderer = new Renderer(container);
    eventRenderer.render(eventManager.getEvents());

    // Show NEXT button only if there are at least 2 events
    if (eventManager.getEvents().length > 1) {
        document.getElementById('to-step2').style.display = 'block';
    }
}

/**
 * Empties the event list
 */
function startup() {
    const eventManager = new EventManager();
    eventManager.deleteAllEvents();
}

/**
 * Create the window.itnerary object only once
 */
if (window.itnerary == null) {
    window.itnerary = {};
}

window.itnerary.importEvents = importEvents;


/**
 * Startup() function is used every time the window refreshes
 */
window.onload = startup;
