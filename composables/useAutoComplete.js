const useAutoComplete = () => {
    return function (inputId, callback) {
        const input = document.getElementById(inputId);
        if (!input) return;

        let dubaiBounds = null
        let radius = null
        if (inputId == 'pickupLocation') {
            dubaiBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(25.063, 55.104), // Southwest corner of Dubai
                new google.maps.LatLng(25.276987, 55.437843) // Northeast corner of Dubai
            );
            radius = 4000
        }
        const autocomplete = new google.maps.places.Autocomplete(input, {
            fields: ["geometry", "name"],
            componentRestrictions: { country: "ae" },
            bounds: dubaiBounds, // Restrict to Dubai bounds
            strictBounds: true,
            redius: radius // Optional: restrict to UAE
        });

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place) {
                const coords = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };

                // Call the callback with coordinates and update the input value
                callback(coords, place.name);
            }
        });
    }
};
export default useAutoComplete