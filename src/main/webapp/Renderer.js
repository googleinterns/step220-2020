/**
 * Class for adding the events stored in the calendar to the html page
 */
export default class Renderer {
    constructor(eventList) {
        this.eventList = eventList;        
    }

    render(events) {
        this.eventList.innerHTML = "";

        for (let event of events) {
            this.eventList.innerHTML += `
                <div class="event-container">
                    <h3>${event.title}</h3>
                    <p>${event.startTime} - ${event.endTime}</p>
                    <p>${event.location}</p>
                </div>
            `
        }
    }
}
