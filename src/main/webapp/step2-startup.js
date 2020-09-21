import Step2Renderer from './renderers/Step2Renderer.js';
import EventManager from './utilities/EventManager.js';

/**
 * Empties the event list
 * Add the events from local storage
 */
function startup() {
    let container = document.getElementsByClassName('main-interface')[0];
    const renderer = new Step2Renderer(container);

    const eventManager = new EventManager();
    renderer.render(eventManager.getEvents());
}

/**
 * Startup() function is used every time the window refreshes
 */
window.onload = startup;
