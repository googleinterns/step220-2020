import Step2Renderer from './renderers/Step2Renderer.js';
import EventManager from './utilities/EventManager.js';

const eventManager = new EventManager();

/**
 * Empties the event list
 * Add the events from local storage
 */
function startup() {
    let container = document.getElementsByClassName('main-interface')[0];
    const renderer = new Step2Renderer(container);

    renderer.render(eventManager.getEvents());
}

/**
 * Checks the value in all radio boxes and add data to LocalStorage
 * TODO (remusn@) Check if radio boxes are empty
 */
function addTransportToLocalStorage() {
    const size = document.getElementsByClassName('info-pane').length;
    for (let index = 0; index < size; ++index)  {
        const checkbox = document.getElementsByClassName('info-pane')[index];
        addTransportationToEvent(checkbox, index)
    }
}

/**
 * Update events from LocalStorage
 * For a transportation mode with index n (from event n to event n+1)
 * the information is added to the n-th event data
 */
function addTransportationToEvent(checkbox, index) {
    const transportation = [ "WALKING", "TRANSIT", "DRIVING", "BICYCLING" ];
    
    // Two consecutive elements are in the same location
    if (!checkbox.getElementsByTagName('input').length) {
        return;
    }

    for (let step = 0; step < 4; ++step) {
        if (checkbox.getElementsByTagName('input')[step].checked) {
            eventManager.updateEvent(index, 
                { travelMode: transportation[step] } 
            )
            break; 
        }
    }
}

/**
 * Create the window.itnerary object only once
 */
if (window.itnerary == null) {
    window.itnerary = {};
}

/**
 * Adds the methods of transportation to LocalStorage
 */
window.itnerary.addTransportToLocalStorage = addTransportToLocalStorage;

/**
 * Startup() function is used every time the window refreshes
 */
window.onload = startup;
