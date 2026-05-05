const useAutoComplete = () => {
    return function (inputId, callback) {
        const input = document.getElementById(inputId);
        if (!input) return;

        const autocomplete = new google.maps.places.Autocomplete(input, {
            fields: ["geometry", "name"],
            componentRestrictions: { country: "PK" },
            strictBounds: false,
        });

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place && place.geometry) {
                const coords = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                callback(coords, place.name);
            }
        });
    }
};

export default useAutoComplete