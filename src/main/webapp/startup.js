import Renderer from './Renderer.js';
import addEventToLocalStorage from './popup.js'

// Events array for testing
const events = [
    {
        "name": "Breakfast",
        "location": "Zurich",
        "startTime": "9:30AM",
        "endTime": "10:30AM"
    },
    {
        "name": "Lunch",
        "location": "Stuttgart",
        "startTime": "1:30PM",
        "endTime": "2:30PM"
    },
    {
        "name": "Dinner",
        "location": "Bucharest",
        "startTime": "7:30PM",
        "endTime": "8:30PM"
    }
]

/**
 * Empties the event list
 * Add the events from local storage
 */
function startup() {
    let container = document.getElementsByClassName('list')[0];
    var eventRenderer = new Renderer(container);
    
    eventRenderer.render(events)
}

/**
 * Startup() function is used every time the window refreshes
 */
window.onload = startup;
