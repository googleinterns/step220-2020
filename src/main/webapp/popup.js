/**
 * Opens a popup window for adding an event when the add-button is pressed
 */
function openEventPopup() {
    document.getElementById('add-event').style.display = 'block';
}

/**
 * Closes the popup window by pressing the "Cancel" button inside that popup
 */
function closeEventPopup() {
    document.getElementById('add-event').style.display = 'none';
}
