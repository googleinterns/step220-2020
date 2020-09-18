import Event from './Event.js';
import EventManager from './utilities/EventManager.js';
import Renderer from './Renderer.js';

// TODO(remusn@) Create a class that can manage multiple popup objects

/**
 * Opens a popup window for adding an event when the add-button is pressed
 */
function openEventPopup() {
    document.getElementById('add-event').style.display = 'block';
}

/**
 * Closes the popup window by pressing the "Cancel" button inside that popup
 */
function closeEventPopup() {
    document.getElementById('add-event').style.display = 'none';
}

/**
 * Creates a new Event object and add it to the event list
 */
function createNewEvent() {
    const title = document.getElementById('title').value;
    const location = document.getElementById('location').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    // Proceed only if all the fields are completed
    if (!title || !location || !startTime || !endTime) {
        return;
    }

    const event = {
        "title": title,
        "location": location,
        "startTime": startTime,
        "endTime": endTime
    }

    addEventToLocalStorage(event);
}

// Export functions to global object "window"
window.openEventPopup = openEventPopup;
window.closeEventPopup = closeEventPopup;
window.createNewEvent = createNewEvent;

/**
 * Receives an event in JSON format
 * Add event lo local storage and print the new list of events
 */ 
export default function addEventToLocalStorage(event) {
    const eventManager = new EventManager();
    eventManager.addEvent(event);

    let container = document.getElementsByClassName('list')[0];
    const eventRenderer = new Renderer(container);
    eventRenderer.render(eventManager.getEvents());
}
