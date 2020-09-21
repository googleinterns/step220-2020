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
 */
function addTransportToLocalStorage() {
    const size = document.getElementsByClassName('info-pane').length;
    for (let index = 0; index < size; ++index)  {
        const checkbox = document.getElementsByClassName('info-pane')[index];
        
        if(!addTransportationToEvent(checkbox, index)) {
            /**
            * No field was selected
            * Show warning message to user
            */
            document.getElementById('check-transport').style.display = 'block';
            return;
        }
    }

    /**
    * All boxes are checked
    * Remove warning message
    */ 
    document.getElementById('check-transport').style.display = 'none';    
}

/**
 * Update events from LocalStorage
 * For a transportation mode with index n (from event n to event n+1)
 * the information is added to the n-th event data
 * Returns 0 if there is no field selected, 1 otherwise
 */
function addTransportationToEvent(checkbox, index) {
    const transportation = [ "WALKING", "TRANSIT", "DRIVING", "BICYCLING" ];
    
    // Two consecutive elements are in the same location
    if (!checkbox.getElementsByTagName('input').length) {
        return 1;
    }

    for (let step = 0; step < 4; ++step) {
        if (checkbox.getElementsByTagName('input')[step].checked) {
            eventManager.updateEvent(index, 
                { travelMode: transportation[step] } 
            )
            return 1; 
        }
    }

    // There is no field selected
    return 0;
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
