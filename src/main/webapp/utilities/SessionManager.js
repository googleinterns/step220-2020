export default class SessionManager {
    constructor(localStorageObject = window.localStorage, localStorageKey) {
        this.localStorage = localStorageObject;

        this.localStorageKey = localStorageKey;
    }

    /**
     * Gets the JSON-parsed value from LocalStorage
     * @returns {Any} the value on that field
     */
    getValueInLocalStorageParsed() {
        return JSON.parse(this.localStorage.getItem(this.localStorageKey));
    }

    /**
     * Sets the given value to the LocalStorage (if already existing, it overwrites it)
     * @param {Any} value the value to be set (if not string -> convert to one using JSON)
     * @returns {void}
     */
    writeValueToLocalStorage(value) {
        if(typeof value === 'string') {
            this.localStorage.setItem(this.localStorageKey, value);
        } else {
            const jsonSerialized = JSON.stringify(value);

            this.localStorage.setItem(this.localStorageKey, jsonSerialized);
        }
    }
}
