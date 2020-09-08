/*
** Empty the event list and add the current events
*/
function startup() {
    let container = document.getElementsByClassName("list")[0];
    container.innerHTML = "";
}

/*
** Startup() function is used every time the window refreshes
*/
window.onload = startup;
