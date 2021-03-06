import { API_KEY } from './CONSTANTS.js';

export default class MapInterface {
    /**
     * @param element the DOM element the map to be rendered
     * @param centerCoordinates coordinates object that will be the center of the map
     * @param {zoom: number, directionsService: type} options (optional) additional parameters that might be needed
     * @param zoom (on options) initial zoom of the map
     * @param directionsService (on options) mock object for directionsService, can be used for testing
     */
    constructor(element, centerCoordinates, options = {
        zoom: 8,
        directionsService: new google.maps.DirectionsService(),
    }) {
        this.map = new google.maps.Map(element, {
            center: centerCoordinates,
            zoom: options.zoom,
        });

        // Service that fetches the route (used on drawRoute)
        this.directionsService = options.directionsService;

        // Stores all the markers on the map
        this.markers = [];

        // Stores all the routes rendered on the map
        this.directionRenderers = [];
    }

    /**
     * @param coordinates coordinates object of the marker's position
     * @param markerObject mock object for the marker, can be used for testing
     */
    addMarker(coordinates, markerObject) {
        const marker = markerObject || new google.maps.Marker({
            position: coordinates
        });

        marker.setMap(this.map);
        this.markers.push(marker);
    }

    /**
     * @param index the index of the marker to remove
     */
    removeMarker(index) {
        const markerToRemove = this.markers[index];

        markerToRemove.setMap(null);
        this.markers.splice(index, 1);
    }

    /**
     * Converts a text - address or place - to coordinates
     * @async
     * @param text the location as a string
     * @param fetch (optional) the fetch object - can use a mock to test this function
     * @returns converts into and return the coordinates object, empty object if location not found
     */
    async convertToCoordinates(text, fetch = window.fetch) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&address=${text}`; // Maps JS API can also be used
        // you can add your API key at the CONSTANTS.js file

        try {
            const response = await fetch(url);
            const json = await response.json();

            if(json.status === 'OK') {
                return { status: 'OK', coordinates: json.results[0].geometry.location };
            } else {
                return { status: json.status, coordinates: {} };
            }
        } catch(e) {
            console.log("An unexpected error has occured while making an API request to convert to coordinates:", e);

            return { status: 'UNKNOWN_ERROR', coordinates: {} };
        }
    }

    /**
     * Adds a route to the map
     * @param originCoordinates the coordinates of the origin of the route
     * @param destinationCoordinates the coordinates of the destination of the route
     * @param travelMode constant that indicates the mode of transportation
     * @param directionServiceOptions (optional) additional options for the directionsService
     * @param directionsRendererObject mock object for the directions renderer, can be used for testing
     */
    drawRoute(originCoordinates, destinationCoordinates, travelMode, directionServiceOptions = {},
        directionsRendererObject =  new google.maps.DirectionsRenderer({
            suppressMarkers: true, // do not display default markers of the route
        })
    ) {
        this.directionsService.route({
            origin: originCoordinates,
            destination: destinationCoordinates,
            travelMode,
            ...directionServiceOptions
        }, (result, status) => {
            if(status == 'OK') {
                directionsRendererObject.setMap(this.map);
                directionsRendererObject.setDirections(result);

                this.directionsRenderers.push(directionsRendererObject);
            }
        })
    }
}
