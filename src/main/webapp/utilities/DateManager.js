import SessionManager from './SessionManager.js';

// Utility class to manage the date field on the LocalStorage, which stores the reference date of the events
export default class DateManager extends SessionManager {
    /**
     * Constructor for normal usage
     * @constructor
     * @param localStorageObject (optional) mock object for testing
     */
    constructor(localStorageObject = window.localStorage) {
        const localStorageKey = 'date';
        super(localStorageObject, localStorageKey);
    }

    /**
     * Gets the date stored in the LocalStorage
     * @returns {date: number, month: number, year: number}
     */
    getDate() {
        return super.getValueInLocalStorageParsed();
    }

    /**
     * Sets the date on the LocalStorage
     */
    setDate(year, month, date) {
        super.writeValueToLocalStorage({
            year,
            month,
            date
        });
    }
}
