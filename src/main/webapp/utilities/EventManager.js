export class EventManager {
    /**
     * Constructor for normal usage
     * @constructor
     */
    constructor() {
        this.localStorage = Window.localStorage;

        setup();
    }

    /**
     * Constructor that enables injecting a mock object (for testing)
     * @constructor
     * @param {*} LocalStorageObject the mock object
     */
    constructor(LocalStorageObject) {
        this.localStorage = localStorageObject;

        setup();
    }

    /**
     * Gets JSON-parsed value from LocalStorage
     * @returns {Any} the value on that field
     */
    getValueInLocalStorageParsed() {
        return JSON.parse(this.localStorage.getItem('events'));
    }

    /**
     * Sets value to LocalStorage
     * @param {Any} value the value to be set (if not string -> convert to one using JSON)
     * @returns {void}
     */
    setValueInLocalStorage(value) {
        if(typeof value === 'string') {
            this.localStorage.setItem('events', value);
        } else {
            const jsonSerialized = JSON.stringify(value);

            this.localStorage.setItem('events', jsonSerialized);
        }
    }

    /**
     * Initial setup of the LocalStorage
     * @returns {void}
     */
    setup() {
        this.eventsList = this.getValueInLocalStorageParsed();

        if(this.eventsList === null) { // no events object exists - first time users
            this.eventsList = [];
            this.setValueInLocalStorage(this.eventsList);
        }
    }

    /**
     * Get all events
     * @returns {Event[]}
     */
    getEvents() {
        return this.getValueInLocalStorageParsed();
    }

    /**
     * Append event to the list
     * @param {Event} event 
     * @returns {void}
     */
    addEvent(event) {
        this.eventsList.push(event);

        this.setValueInLocalStorage(this.eventsList);
    }

    /**
     * Update the Event on a given index
     * @param {Int} index the index of the event to be updated
     * @parem {Object} the JSON object of the attributes to be updated
     * @returns {void}
     */
    updateEvent(index, updated) {
        if(index >= this.eventList.length || !this.eventsList[index]) {
            throw Error('Malformed or out of bounds index!');
        } else {
            let eventToModify = this.eventsList[index]
            eventToModify = Object.assign({}, eventToModify, updated); // update the keys present on the updated object

            this.eventsList[index] = eventToModify;
            this.setValueInLocalStorage(this.eventsList);
        }
    }

    /**
     * Delete the Event residing on the given index
     * @param {Int} index the index of the event to be updated
     * @returns {void}
     */
    deleteEvent(index) {
        if(index >= this.eventList.length || !this.eventsList[index]) {
            throw Error('Malformed or out of bounds index!');
        } else {
            this.eventsList.splice(index, 1);
            this.setValueInLocalStorage(this.eventsList);
        }
    }
    
    /**
     * Deletes all events on the list (clears it)
     * @returns {void}
     */
    deleteAllEvents() {
        this.eventsList = [];
        this.setValueInLocalStorage(this.eventsList);
    }
};
