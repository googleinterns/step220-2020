import Step3Renderer from './renderers/Step3Renderer.js';

// TODO: replace this array with the event management class, as discussed with Remus
const events = [{
        name: 'Breakfast',
        location: 'Zurich',
        startingTime: '9:30',
        endingTime: '10:30',
    }, {
        name: 'Lunch',
        location: 'Stuttgart',
        startingTime: '13:30',
        endingTime: '14:30',
    }, {
        name: 'Dinner',
        location: 'Bucharest',
        startingTime: '19:30',
        endingTime: '20:30',
    }
];

/**
 * Empties the event list
 * Add the events from local storage
 */
function startup() {
    let container = document.getElementsByClassName('main-interface')[0];

    const renderer = new Step3Renderer(container);

    renderer.render(events);
}

/**
 * Startup() function is used every time the window refreshes
 */
window.onload = startup;
