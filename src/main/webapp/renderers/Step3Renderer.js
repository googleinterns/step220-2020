import RendererInterface from './RendererInterface.js';

export default class Step3Renderer extends RendererInterface {
    constructor(parentElement) {
        super(parentElement);
    }

    generateLink(from, to) {
        return '#'; // TODO(tzavidas): create the actual link
    }

    formatDate(date) {
        const hours = date.getHours(),
            minutes = date.getMinutes();

        return `${(hours === 12 ? 12 : hours % 12)}:${minutes.toString(10).padStart(2, '0')} ${(date.getHours() < 12) ? 'AM' : 'PM'}`;
    }

    render(events) {
        this.parentElement.innerHTML = '';

        for(let i = 0; i < events.length; i++) {
            const event = events[i];

            this.parentElement.innerHTML += `
                <div class="event-container">
                    <h3>${event.name}</h3>
                    <p>${this.formatDate(event.startingTime)} - ${this.formatDate(event.endingTime)}</p>
                    <p>${event.location}</p>
                </div>
            `;

            if(i < events.length - 1) { // is an intermediate event
                this.parentElement.innerHTML += `
                    <div class="intermediate-info">
                        <div class="bubbles-container">
                            <div class="bubble"></div>
                            <div class="bubble"></div>
                            <div class="bubble"></div>
                        </div>
                        <div class="info-pane">
                            <p>Follow Route:</p>
                            <a href="${this.generateLink(event.location, events[i + 1].location)}">Link</a>
                        </div>
                    </div>
                `;
            }
        }
    }
}
