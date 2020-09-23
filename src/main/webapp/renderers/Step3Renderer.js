import RendererInterface from './RendererInterface.js';

export default class Step3Renderer extends RendererInterface {
    constructor(parentElement) {
        super(parentElement);
    }

    generateLink(from, to) {
        return '#'; // TODO(tzavidas): create the actual link
    }

    render(events) {
        this.parentElement.innerHTML = '';

        for(let i = 0; i < events.length; i++) {
            const event = events[i];

            this.parentElement.innerHTML += `
                <div class="event-container">
                    <h3>${event.title}</h3>
                    <p>${event.startTime} - ${event.endTime}</p>
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
