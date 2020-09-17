class EventManager {
    /**
     * Constructor for normal usage
     * @constructor
     * @param localStorageObject (optional) mock object for testing
     */
    constructor(localStorageObject = window.localStorage) {
        this.localStorage = localStorageObject;

        this.setup();
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
        if(this.getValueInLocalStorageParsed() === null) { // no events object exists - first time users
            this.setValueInLocalStorage([]);
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
        const eventsList = this.getValueInLocalStorageParsed();
        eventsList.push(event);

        this.setValueInLocalStorage(eventsList);
    }

    /**
     * Update the Event on a given index
     * @param {Int} index the index of the event to be updated
     * @parem {Object} the JSON object of the attributes to be updated
     * @returns {void}
     */
    updateEvent(index, updated) {
        const eventsList = this.getValueInLocalStorageParsed();

        if(!eventsList[index] || index >= eventsList.length) {
            throw Error('Malformed or out of bounds index!');
        } else {
            let eventToModify = eventsList[index];
            eventToModify = Object.assign({}, eventToModify, updated); // update the keys present on the updated object

            eventsList[index] = eventToModify;
            this.setValueInLocalStorage(eventsList);
        }
    }

    /**
     * Delete the Event residing on the given index
     * @param {Int} index the index of the event to be updated
     * @returns {void}
     */
    deleteEvent(index) {
        const eventsList = this.getValueInLocalStorageParsed();

        if(!eventsList[index] || index >= eventsList.length) {
            throw Error('Malformed or out of bounds index!');
        } else {
            eventsList.splice(index, 1);
            this.setValueInLocalStorage(eventsList);
        }
    }
    
    /**
     * Deletes all events on the list (clears it)
     * @returns {void}
     */
    deleteAllEvents() {
        this.setValueInLocalStorage([]);
    }
}
