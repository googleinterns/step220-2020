/**
 * Class for adding the events stored in the calendar to the html page
 */
export default class Renderer {
    constructor(eventList) {
        this.eventList = eventList;        
    }

    render(events) {
        this.eventList.innerHTML = "";

        for (let [ index, event ] of events.entries()) {
            this.eventList.innerHTML += `
                <div class="event-wrapper">
                    <div class="event-details">
                        <h3>${event.title}</h3>
                        <p>${event.startTime} - ${event.endTime}</p>
                        <p>${event.location}</p>
                    </div>
                    <div class="remove-button-container">
                        <button onclick="window.deleteEvent(${index})">+</button>
                    </div>
                </div>
            `
        }
    }
}
