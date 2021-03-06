import Event from './Event.js';
import EventManager from './utilities/EventManager.js';
import Renderer from './Renderer.js';
import DateManager from './utilities/DateManager.js';

/**
 * Opens a popup window for adding an event when the add-button is pressed
 */
function openEventPopup() {
    document.getElementById('add-event-modal').style.display = 'block';
    document.getElementsByClassName('modal-overlay')[0].style.display = 'block';
}

/**
 * Closes the popup window by pressing the "Cancel" button inside that popup
 */
function closeEventPopup() {
    document.getElementById('add-event-modal').style.display = 'none';
    document.getElementsByClassName('modal-overlay')[0].style.display = 'none';

    document.getElementById('check-addevent').style.display = 'none'; // remove warning message
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
    closeEventPopup();
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

    // Show NEXT button only if there are at least 2 events
    if (eventManager.getEvents().length > 1) {
        document.getElementById('to-step2').style.display = 'block';
    }
}

/**
 * Reads the date selected by the user and add it to LocalStorage
 */ 
function selectDate() {
    const date = document.getElementById('calendar-date').value;
    const year = date.substring(0,4);
    const month = date.substring(5,7);
    const day = date.substring(8,10);

    const dateManager = new DateManager();
    dateManager.setDate(year, month, day);

    // Once the date is selected, display to the user the addevent interface
    document.getElementById('step1-content').style.display = 'block';
}

window.selectDate = selectDate;

window.deleteEvent = function(index) {
    const eventManager = new EventManager();
    eventManager.deleteEvent(index);

    const container = document.getElementsByClassName('list')[0];
    const eventRenderer = new Renderer(container);
    eventRenderer.render(eventManager.getEvents());

    // Show NEXT button only if there are at least 2 events
    if (eventManager.getEvents().length < 2) {
        document.getElementById('to-step2').style.display = 'none';
    }
}
