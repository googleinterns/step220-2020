/**
 * Class for adding the events stored in the calendar to the html page
 */
export default class Renderer {
    constructor(eventList) {
        this.eventList = eventList;        
    }

    render(events) {
        this.eventList.innerHTML = "";

        for (let index of events) {
            this.eventList.innerHTML += `
                <div class="event">
                    <p>${index.name}</p>
                    <p>${index.location}</p>
                    <p>${index.startTime}</p>
                    <p>${index.endTime}</p>
                </div>
            `
        }
    }
}
