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
function checkRadioBoxes() {
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
    if (checkbox.getElementsByTagName('input')[0].checked) {
        eventManager.updateEvent(index, 
            { travelMode: "Walk" } 
        ) 
    } else if (checkbox.getElementsByTagName('input')[1].checked) {
        eventManager.updateEvent(index, 
            { travelMode: "Public Transport" } 
        )
    } else if (checkbox.getElementsByTagName('input')[2].checked) {
        eventManager.updateEvent(index, 
            { travelMode: "Car" } 
        )
    } else if (checkbox.getElementsByTagName('input')[3].checked) {
        eventManager.updateEvent(index, 
            { travelMode: "Bike" } 
        )
    }
}

/**
 * Adds the methods of transportation to LocalStorage
 */
window.getTransportMethods = checkRadioBoxes;

/**
 * Startup() function is used every time the window refreshes
 */
window.onload = startup;
