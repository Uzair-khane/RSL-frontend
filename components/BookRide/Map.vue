<template></template>

<script setup>
import { ref, onMounted, toRefs } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
const origin = ref(null);
const destination = ref(null);
const distance = ref(null);
const selectedRideType = ref("flate");
const selectedHours = ref("1");
const initAutocomplete = useAutoComplete();

const googleMap = ref(null);
// Map center and marker position
const mapCenter = ref({ lat: 25.2048, lng: 55.2708 });

// Pickup and drop-off locations
const props = defineProps({
  pickup: String,
  drop: String,
  ride_type: String,
  hours: String,
});
const { pickup, drop, ride_type } = toRefs(props);

const emit = defineEmits([
  "update:pickup",
  "update:drop",
  "update:rideType",
  "update:hours",
  "update:distance",
  "getMinimumPrice",
]);

// Autocomplete initialization function
let directionsRenderer = null;
async function calculateRoute() {
  // Create a DirectionsService instance
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

  if (origin.value && destination.value) {
    try {
      console.log("origin ", origin.value);

      // Call the route method and await the result
      const result = await directionService.route({
        origin: origin.value, // Should be a Lat/Lng object or a place name
        destination: destination.value, // Should be a Lat/Lng object or a place name
        travelMode: google.maps.TravelMode.DRIVING, // Set travel mode to DRIVING
      });

      const googleMapInstance = googleMap.value.map;
      directionsRenderer.setMap(googleMapInstance);
      distance.value = result.routes[0].legs[0].distance.text;
      emit("update:distance", distance.value);

      directionsRenderer.setDirections(result);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  }
}
async function geocodePlaceplaceName(placename) {
  try {
    const geocoder = new google.maps.Geocoder();
    const result = await geocoder.geocode({ address: placename });
    if (result.results.length) {
      const location = result.results[0].geometry.location;
      return {
        lat: location.lat(),
        lng: location.lng(),
      };
    }
  } catch (error) {
    console.error("Geocoding error:", error);
  }
  return null;
}

onMounted(async () => {
  // Initialize Autocomplete for Pickup and Drop locations
  initAutocomplete("pickupLocation", (coords, name) => {
    emit("update:pickup", name);
    if (origin.value) {
      origin.value = null;
    }
    mapCenter.value = coords; // Update map center to pickup location
    origin.value = coords;
    calculateRoute();
  });

  if (props.pickup && props.drop) {
    const pickupCoords = await geocodePlaceplaceName(props.pickup);
    const dropCoords = await geocodePlaceplaceName(props.drop);
    origin.value = pickupCoords;
    destination.value = dropCoords;
    calculateRoute();
  }

  initAutocomplete("dropLocation", (coords, name) => {
    emit("update:drop", name);
    // Update map center to pickup location
    if (destination.value) {
      destination.value = null;
    }
    destination.value = coords;
    calculateRoute();
  });
});
</script>
