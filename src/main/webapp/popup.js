import Event from './Event.js';

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
    const startingTime = document.getElementById('starting-time').value;
    const endingTime = document.getElementById('ending-time').value;

    // Proceed only if all the fields are completed
    if (!title || !location || !startingTime || !endingTime) {
        return;
    }

    const event = new Event(title, location, startingTime, endingTime);
    addEvent(event);
}

// Export functions to global object "window"
window.openEventPopup = openEventPopup;
window.closeEventPopup = closeEventPopup;
window.createNewEvent = createNewEvent;

// TODO (remusn@)
function addEvent(event) {

}
