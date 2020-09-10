import Renderer from './Renderer.js';

// Events array for testing
const events = [
    {
        "name": "Breakfast",
        "location": "Zurich",
        "time": "9:30AM - 10:30AM"
    },
    {
        "name": "Lunch",
        "location": "Stuttgart",
        "time": "1:30PM - 2:30PM"
    },
    {
        "name": "Dinner",
        "location": "Bucharest",
        "time": "7:30PM - 8:30PM"
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
