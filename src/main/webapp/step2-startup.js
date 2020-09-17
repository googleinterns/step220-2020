import Step2Renderer from './renderers/Step2Renderer.js';

// TODO(tzavidas): replace this array with the event management class, as discussed with remusn
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
    const renderer = new Step2Renderer(container);

    renderer.render(events);
}

/**
 * Startup() function is used every time the window refreshes
 */
window.onload = startup;
