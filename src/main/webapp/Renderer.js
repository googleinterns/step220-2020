/*
** Class for adding the events stored in the calendar to the html page
*/
export default class Renderer {
    constructor(eventList) {
        this.eventList = eventList;        
    }

    render(events) {
        this.eventList.innerHTML = "";

        for (var index in events.list) {
            this.eventList.innerHTML += `
                <div class="event">
                    <p>${events.list[index].name}</p>
                    <p>${events.list[index].location}</p>
                    <p>${events.list[index].time}</p>
                </div>
            `
        }
    }
}
