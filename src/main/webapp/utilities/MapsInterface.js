class MapInterface {
    /**
     * @param element the DOM element the map to be rendered
     * @param centerCoordinates coordinates object that will be the center of the map
     * @param options (optional) additional parameters that might be needed
     */
    constructor(element, centerCoordinates, options = {}) {
        this.map = new google.maps.Map(element, {
            center: centerCoordinates,
            zoom: options.zoom || 8,
        });

        // Service that fetches the route (used on drawRoute)
        this.directionsService = options.directionsService || new google.maps.DirectionsService();

        // Service that draws a route on the map (used on drawRoute)
        this.directionsRenderer = options.directionsRenderer || new google.maps.DirectionsRenderer({
                suppressMarkers: true, // do not display default markers of the route
            });

        this.directionsRenderer.setMap(this.map);

        this.markers = [];
    }

    /**
     * @param coordinates coordinates object of the marker's position
     * @param markerObject substitude object for marker (for testing)
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
    async converToCoordinates(text, fetch = windows.fetch) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&address=${text}`; // Maps JS API can also be used
        // you can add your API key at the CONSTANTS.js file

        try {
            const response = await fetch(url);
            const json = await response.json();

            if(json.status === 'OK') {
                return json.results[0].geometry.location;
            } else {
                throw 'Error with the API';
            }
        } catch(e) {
            return {};
        }
    }

    /**
     * Adds a route to the map
     * @param originCoordinates the coordinates of the origin of the route
     * @param destinationCoordinates the coordinates of the destination of the route
     * @param travelMode constant that indicates the mode of transportation
     * @param options (optional) additional options that might be needed (like adding a starting or arrival time for the route)
     */
    drawRoute(originCoordinates, destinationCoordinates, travelMode, options = {}) {
        const directionsService = new google.maps.DirectionsService(),
            directionsRenderer = new google.maps.DirectionsRenderer({
                suppressMarkers: true, // do not display default markers of the route
            });

        directionsRenderer.setMap(this.map);

        directionsService.route({
            origin: originCoordinates,
            destination: destinationCoordinates,
            travelMode,
            ...options
        }, (result, status) => {
            if(status == 'OK') {
                directionsRenderer.setDirections(result);
            } else {
                alert('An error has occured while calculating a route');
                // TODO: as soon as test it, replace this with an actual action (like reloading the page)
            }
        })
    }
}
