function calculateRoute() {
    let directionsRenderer = null;
    // Create a DirectionsService instance
    return async function (origin, destination, googleMap) {
        const directionService = new google.maps.DirectionsService();
        if (!directionsRenderer) {
            directionsRenderer = new google.maps.DirectionsRenderer({
                polylineOptions: {
                    strokeColor: "#FF0000", // Red route
                    strokeOpacity: 0.7,
                    strokeWeight: 5,
                },
            });
        } else {
            directionsRenderer.setMap(null); // Clear previous rendering
        }

        if (origin && destination) {
            try {
                console.log("origin ", origin);

                // Call the route method and await the result
                const result = await directionService.route({
                    origin: origin, // Should be a Lat/Lng object or a place name
                    destination: destination, // Should be a Lat/Lng object or a place name
                    travelMode: google.maps.TravelMode.DRIVING, // Set travel mode to DRIVING
                });

                const googleMapInstance = googleMap.map;
                directionsRenderer.setMap(googleMapInstance);
                directionsRenderer.setDirections(result);
                return result.routes[0].legs[0].distance.text;
            } catch (error) {
                console.error("Error fetching route:", error);
            }
        } else {
            // Reset renderer and clear the map if origin or destination is missing
            directionsRenderer.setMap(null);
            console.log("Route reset: No origin or destination provided.");
        }
    }
}

export default calculateRoute