import Event from './Event.js';
import EventManager from './utilities/EventManager.js';
import Renderer from './Renderer.js';
import DateManager from './utilities/DateManager.js';

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
        // Show warning message to user
        document.getElementById('check-addevent').style.display = 'block';
        return;
    }

    // Clear the fields after submit
    document.getElementById('title').value = "";
    document.getElementById('location').value = "";
    document.getElementById('start-time').value = "";
    document.getElementById('end-time').value = "";

    // Remove warning message
    document.getElementById('check-addevent').style.display = 'none';

    const event = {
        'title': title,
        'location': location,
        'startTime': startTime,
        'endTime': endTime
    }

    addEventToLocalStorage(event);

    // close popup window after submited
    document.getElementById('add-event').style.display = 'none';
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

function selectDate() {
    const date = document.getElementById('calendar-date').value;
    const year = date.substring(0,4);
    const month = date.substring(5,7);
    const day = date.substring(8,10);

    const dateManager = new DateManager();
    dateManager.setDate(year, month, day);
}

window.selectDate = selectDate;
