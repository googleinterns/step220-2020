export default class SessionManager {
    constructor(localStorageObject = window.localStorage, localStorageKey) {
        this.localStorage = localStorageObject;

        this.localStorageKey = localStorageKey;
    }

    /**
     * Gets JSON-parsed value from LocalStorage
     * @returns {Any} the value on that field
     */
    getValueInLocalStorageParsed() {
        return JSON.parse(this.localStorage.getItem(this.localStorageKey));
    }

    /**
     * Sets value to LocalStorage
     * @param {Any} value the value to be set (if not string -> convert to one using JSON)
     * @returns {void}
     */
    setValueInLocalStorage(value) {
        if(typeof value === 'string') {
            this.localStorage.setItem(this.localStorageKey, value);
        } else {
            const jsonSerialized = JSON.stringify(value);

            this.localStorage.setItem(this.localStorageKey, jsonSerialized);
        }
    }
}
