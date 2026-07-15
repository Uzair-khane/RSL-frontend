<template>
  <div class="min-h-screen bg-gray-100">
    <!-- PREMIUM HEADER -->
    <div class="bg-gradient-to-r from-[#0693E3] via-[#0878C9] to-[#045A9C] text-white px-4 py-5 shadow-lg">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.25em] opacity-80">Real Smart Limousine</p>
          <h1 class="font-bold text-xl mt-1">Live Ride Tracking</h1>
          <p class="text-xs opacity-80 mt-1">Booking #{{ bookingId }}</p>
        </div>

        <div class="flex items-center gap-2">
          <div
            class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20"
            :class="isOnline ? 'bg-white/20' : 'bg-red-500'"
          >
            <span
              class="w-2 h-2 rounded-full"
              :class="isOnline ? 'bg-green-300 animate-ping' : 'bg-white'"
            ></span>
            <span class="text-xs font-semibold">
              {{ isOnline ? 'LIVE' : 'OFFLINE' }}
            </span>
          </div>

          <div
            v-if="offlineCount > 0"
            class="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full"
          >
            {{ offlineCount }} saved
          </div>
        </div>
      </div>
    </div>

    <!-- MAP -->
    <div ref="mapSectionRef" class="relative bg-gray-200">
      <GoogleMap
        ref="trackingMapRef"
        :api-key="googleMapKey"
        :center="mapCenter"
        :zoom="mapZoom"
        class="w-full"
        style="height: 60vh;"
      >
        <Marker
          v-if="hasValidDriverLocation"
          :key="markerKey"
          :options="markerOptions"
        />

        <Marker
          v-if="hasValidPickupLocation"
          :key="pickupMarkerKey"
          :options="pickupMarkerOptions"
        />
      </GoogleMap>

      <div class="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-lg rounded-2xl px-4 py-3 text-xs text-gray-700 border border-white">
        <p class="font-bold text-gray-900">Tracking Legend</p>
        <div class="flex items-center gap-2 mt-2">
          <span class="w-3 h-3 rounded-full bg-red-600"></span>
          <span>Driver / Vehicle</span>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <span class="w-3 h-3 rounded-full bg-green-600"></span>
          <span>Pickup Point</span>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <span class="w-3 h-3 rounded-full bg-[#0693E3]"></span>
          <span>Recommended Route</span>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <span class="w-3 h-3 rounded-full bg-green-600"></span>
          <span>Selected Route</span>
        </div>
      </div>

      <button
        @click="showShareModal = true"
        class="absolute top-4 right-4 bg-white shadow-lg rounded-full px-4 py-2 text-sm font-semibold text-gray-700"
      >
        Share
      </button>

      <button
        @click="resetDriverToOffice"
        class="absolute top-16 right-4 bg-gray-900 text-white shadow-lg rounded-full px-4 py-2 text-xs font-semibold"
      >
        Reset Office
      </button>

      <button
        @click="saveTestOfflineLocation"
        class="absolute top-28 right-4 bg-orange-600 text-white shadow-lg rounded-full px-4 py-2 text-xs font-semibold"
      >
        Test Offline Save
      </button>

      <NuxtLink
        :to="safetyUrl"
        class="absolute bottom-16 right-4 bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl border-4 border-red-300 z-10 font-bold"
      >
        SOS
      </NuxtLink>

      <div
        v-if="lastUpdate"
        class="absolute bottom-4 left-4 bg-white shadow-lg rounded-full px-3 py-1 text-xs text-gray-500"
      >
        Updated: {{ lastUpdate }}
      </div>
    </div>

    <!-- CONTENT -->
    <div class="bg-white rounded-t-[2rem] -mt-5 relative z-10 px-4 pt-6 pb-8 shadow-2xl">
      <div
        v-if="!isOnline"
        class="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 text-sm text-red-700"
      >
        Offline mode active. GPS locations will be saved on this device and synced when internet returns.
      </div>

      <div
        v-if="offlineCount > 0"
        class="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4 text-sm text-yellow-800"
      >
        {{ offlineCount }} offline GPS point(s) saved. They will auto-sync when internet returns.

        <button
          v-if="isOnline"
          @click="syncOfflineLocations"
          class="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-xl text-xs font-semibold"
        >
          Sync Now
        </button>
      </div>

      <!-- QUICK STATUS STRIP -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div class="bg-[#0693E3]/10 border border-[#0693E3]/20 rounded-2xl p-3">
          <p class="text-xs text-gray-500">Tracking Mode</p>
          <p class="font-bold text-gray-900">{{ demoMoving ? 'Demo Running' : 'Live Ready' }}</p>
        </div>

        <div class="bg-green-50 border border-green-100 rounded-2xl p-3">
          <p class="text-xs text-gray-500">Driver Source</p>
          <p class="font-bold text-gray-900">{{ formatSource(driverLocationSource || 'Office Default') }}</p>
        </div>

        <div class="bg-blue-50 border border-blue-100 rounded-2xl p-3">
          <p class="text-xs text-gray-500">ETA Source</p>
          <p class="font-bold text-gray-900">{{ formatSource(etaPrediction?.eta_source || 'Pending') }}</p>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-3">
          <p class="text-xs text-gray-500">Route Risk</p>
          <p class="font-bold text-gray-900 capitalize">{{ routeDeviation?.risk_level || 'Waiting' }}</p>
        </div>
      </div>

      <!-- DRIVER DETAILS CARD -->
      <div class="bg-white border border-gray-100 rounded-3xl p-4 mb-4 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <div class="bg-gradient-to-br from-[#0693E3] to-[#045A9C] rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold overflow-hidden shadow-lg">
            <img v-if="driverImage" :src="driverImage" class="w-full h-full object-cover" />
            <span v-else>{{ driverName ? driverName[0] : '?' }}</span>
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="font-bold text-xl">{{ driverName || 'Assigning Driver...' }}</p>

              <span
                v-if="driverVerified == 1"
                class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold"
              >
                Verified
              </span>

              <span
                v-if="driverLocationSource"
                class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold"
              >
                {{ formatSource(driverLocationSource) }}
              </span>
            </div>

            <p class="text-gray-500 text-sm">{{ driverContact || 'Please wait' }}</p>

            <div class="flex items-center gap-2 mt-1 text-xs text-gray-500 flex-wrap">
              <span>⭐ {{ driverRating || '5.0' }}</span>
              <span>•</span>
              <span>{{ driverTotalRides || 0 }} rides</span>
              <span>•</span>
              <span>{{ driverExperience || 0 }} yrs exp</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3 text-xs text-gray-600">
              <div>
                <span class="text-gray-400">Driver ID:</span>
                <span class="font-semibold ml-1">{{ driverId || 'N/A' }}</span>
              </div>

              <div>
                <span class="text-gray-400">Email:</span>
                <span class="font-semibold ml-1">{{ driverEmail || 'N/A' }}</span>
              </div>

              <div>
                <span class="text-gray-400">CNIC:</span>
                <span class="font-semibold ml-1">{{ driverCnic || 'N/A' }}</span>
              </div>

              <div>
                <span class="text-gray-400">Vehicle:</span>
                <span class="font-semibold ml-1">{{ vehicleTitle || 'N/A' }}</span>
              </div>

              <div>
                <span class="text-gray-400">Vehicle No:</span>
                <span class="font-semibold ml-1">{{ vehicleNumber || 'N/A' }}</span>
              </div>

              <div>
                <span class="text-gray-400">Driver Source:</span>
                <span class="font-semibold ml-1">{{ driverId ? 'Assigned' : 'Pending' }}</span>
              </div>
            </div>
          </div>

          <div v-if="driverContact" class="flex md:flex-col gap-2">
            <a
              :href="`tel:${driverContact}`"
              class="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold text-center"
            >
              Call
            </a>

            <a
              :href="`sms:${driverContact}`"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold text-center"
            >
              SMS
            </a>
          </div>
        </div>
      </div>

      <!-- AI DRIVER ARRIVAL ETA CARD -->
      <div class="bg-gradient-to-br from-blue-50 via-cyan-50 to-white border border-blue-100 rounded-3xl p-4 mb-4 shadow-sm">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="bg-[#0693E3] text-white text-xs font-bold px-2 py-1 rounded-full">AI</span>
              <h3 class="font-bold text-gray-900">Driver Arrival ETA</h3>
            </div>

            <p class="text-xs text-gray-500 mt-1">
              Driver-to-pickup arrival estimate using Google Maps driving route.
            </p>

            <p class="text-[11px] text-blue-600 mt-1">
              This predicts when the driver will reach pickup point, not full pickup-to-drop trip duration.
            </p>

            <p v-if="pickupGeoLoading" class="text-[11px] text-blue-700 mt-1 font-semibold">
              Finding pickup coordinates from location name...
            </p>

            <p v-if="pickupCoordinateSource" class="text-[11px] text-green-700 mt-1 font-semibold">
              Pickup coordinates source: {{ formatSource(pickupCoordinateSource) }}
            </p>

            <p v-if="demoMode" class="text-[11px] text-green-700 mt-1 font-semibold">
              Demo mode active: driver marker is moving from City Towers office toward pickup location.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-2">
            <button
              @click="fetchAiEta"
              :disabled="etaLoading || !bookingId || !driverId"
              class="bg-[#0693E3] text-white px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {{ etaLoading ? 'Checking...' : 'Refresh ETA' }}
            </button>

            <button
              @click="startDemoMovement"
              :disabled="demoMoving || !bookingId || !driverId"
              class="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {{ demoMoving ? 'Moving...' : 'Start Demo Movement' }}
            </button>

            <button
              v-if="demoMoving"
              @click="stopDemoMovement"
              class="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm"
            >
              Stop
            </button>
          </div>
        </div>

        <div
          v-if="etaError"
          class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm mb-3"
        >
          {{ etaError }}
        </div>

        <div
          v-if="!etaPrediction && !etaError && !etaLoading"
          class="bg-white/70 rounded-xl p-3 text-sm text-gray-600"
        >
          ETA will appear after driver location and booking details are available.
        </div>

        <div
          v-if="etaLoading && !etaPrediction"
          class="bg-white/70 rounded-xl p-3 text-sm text-gray-600"
        >
          Calculating AI ETA prediction...
        </div>

        <div v-if="etaPrediction" class="space-y-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
              <p class="text-xs text-gray-400">Estimated Arrival</p>
              <p class="text-xl md:text-2xl font-bold text-gray-900">
                {{ formatEtaDuration(etaPrediction.estimated_arrival_minutes) }}
              </p>
            </div>

            <div class="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
              <p class="text-xs text-gray-400">Driver to Pickup</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ etaPrediction.distance_km }} km
              </p>
            </div>

            <div class="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
              <p class="text-xs text-gray-400">Confidence</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ etaPrediction.confidence }}%
              </p>
            </div>

            <div class="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
              <p class="text-xs text-gray-400">Status</p>
              <span
                class="inline-flex mt-1 px-3 py-1 rounded-full text-xs font-bold capitalize"
                :class="etaStatusClass"
              >
                {{ etaPrediction.status }}
              </span>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-3 shadow-sm text-sm border border-gray-100">
            <div class="flex flex-wrap items-center gap-2 text-gray-600">
              <span>
                ETA Range:
                <strong>
                  {{ formatEtaDuration(etaPrediction.eta_range?.min_minutes) }}
                  –
                  {{ formatEtaDuration(etaPrediction.eta_range?.max_minutes) }}
                </strong>
              </span>

              <span class="hidden sm:inline">•</span>

              <span>
                Route Source:
                <strong>{{ formatSource(etaPrediction.eta_source) }}</strong>
              </span>

              <span class="hidden sm:inline">•</span>

              <span>
                Location Source:
                <strong>{{ formatSource(etaPrediction.location_source) }}</strong>
              </span>

              <span
                v-if="etaPrediction.straight_distance_km !== undefined"
                class="hidden sm:inline"
              >
                •
              </span>

              <span v-if="etaPrediction.straight_distance_km !== undefined">
                Straight Distance:
                <strong>{{ etaPrediction.straight_distance_km }} km</strong>
              </span>
            </div>

            <p v-if="etaLastUpdated" class="text-xs text-gray-400 mt-1">
              Last ETA update: {{ etaLastUpdated }}
            </p>
          </div>

          <div
            v-if="etaPrediction.reasons && etaPrediction.reasons.length"
            class="bg-white rounded-2xl p-3 shadow-sm border border-gray-100"
          >
            <p class="font-semibold text-sm text-gray-800 mb-2">AI ETA Reasoning</p>

            <ul class="space-y-1 text-xs text-gray-600">
              <li
                v-for="(reason, index) in etaPrediction.reasons"
                :key="index"
                class="flex gap-2"
              >
                <span class="text-[#0693E3] font-bold">•</span>
                <span>{{ reason }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- AI ROUTE OPTIMIZATION + DEVIATION CARD -->
      <div class="bg-white border border-gray-100 rounded-3xl p-4 mb-4 shadow-sm">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="bg-[#0693E3] text-white text-xs font-bold px-2 py-1 rounded-full">
                AI
              </span>

              <h3 class="font-bold text-gray-900">
                Smart Route Intelligence
              </h3>

              <span
                v-if="recommendedRoute"
                class="bg-green-100 text-green-700 text-[11px] px-2 py-1 rounded-full font-bold"
              >
                Recommended: {{ recommendedRoute.route_id }}
              </span>
            </div>

            <p class="text-xs text-gray-500 mt-1">
              AI compares available pickup-to-drop routes, recommends the best one, and lets the driver select the final route.
            </p>

            <p v-if="dropGeoLoading" class="text-[11px] text-blue-700 mt-1 font-semibold">
              Finding drop coordinates from location name...
            </p>

            <p v-if="dropCoordinateSource" class="text-[11px] text-green-700 mt-1 font-semibold">
              Drop coordinates source: {{ formatSource(dropCoordinateSource) }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-2">
            <button
              @click="fetchRouteOptimization"
              :disabled="routeLoading || !bookingId || !hasValidPickupLocation || !toLocation"
              class="bg-[#0693E3] text-white px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {{ routeLoading ? 'Optimizing...' : 'Optimize Routes' }}
            </button>

            <button
              @click="fetchRouteDeviation"
              :disabled="deviationLoading || !activeRoutePolyline || !hasValidDriverLocation"
              class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {{ deviationLoading ? 'Checking...' : 'Check Deviation' }}
            </button>
          </div>
        </div>

        <div
          v-if="routeError"
          class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm mb-3"
        >
          {{ routeError }}
        </div>

        <div
          v-if="deviationError"
          class="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-3 text-sm mb-3"
        >
          {{ deviationError }}
        </div>

        <div
          v-if="!routeOptions.length && !routeLoading && !routeError"
          class="bg-gray-50 border border-gray-100 rounded-2xl p-3 text-sm text-gray-600"
        >
          AI route options will appear after pickup and drop coordinates are available.
        </div>

        <div
          v-if="routeLoading && !routeOptions.length"
          class="bg-blue-50 border border-blue-100 rounded-2xl p-3 text-sm text-blue-700"
        >
          Comparing available routes using traffic-aware AI route scoring...
        </div>

        <div v-if="routeOptions.length" class="space-y-4">
          <!-- TOP SUMMARY -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="bg-blue-50 rounded-2xl p-3 border border-blue-100">
              <p class="text-xs text-gray-500">Best Route</p>
              <p class="font-bold text-gray-900 leading-snug">
                {{ recommendedRoute?.summary || 'Recommended Route' }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-3 border border-gray-100">
              <p class="text-xs text-gray-500">Trip Distance</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ selectedRoute?.distance_km || recommendedRoute?.distance_km }} km
              </p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-3 border border-gray-100">
              <p class="text-xs text-gray-500">Traffic ETA</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ selectedRoute?.duration_in_traffic_minutes || recommendedRoute?.duration_in_traffic_minutes }} min
              </p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-3 border border-gray-100">
              <p class="text-xs text-gray-500">Confidence</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ selectedRoute?.confidence || recommendedRoute?.confidence }}%
              </p>
            </div>
          </div>

          <!-- ROUTE CHOICE CARDS -->
          <div>
            <div class="flex items-center justify-between gap-3 mb-2">
              <p class="font-bold text-sm text-gray-900">
                Driver Route Choices
              </p>

              <p class="text-[11px] text-gray-500">
                System recommends. Driver makes final selection.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div
                v-for="routeItem in routeOptions"
                :key="routeItem.route_id"
                class="rounded-2xl border p-3 transition cursor-pointer"
                :class="getRouteCardClass(routeItem)"
                @click="handleRouteChoiceClick(routeItem)"
              >
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <p class="font-bold text-gray-900">
                        Route {{ routeItem.rank }}
                      </p>

                      <span
                        v-if="routeItem.is_recommended"
                        class="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold"
                      >
                        Recommended
                      </span>

                      <span
                        v-if="selectedRouteId === routeItem.route_id"
                        class="bg-[#0693E3] text-white text-[10px] px-2 py-0.5 rounded-full font-bold"
                      >
                        Selected
                      </span>
                    </div>

                    <p class="text-xs text-gray-500 mt-1 line-clamp-2">
                      {{ routeItem.summary || 'Google Maps Route' }}
                    </p>
                  </div>

                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                    :class="selectedRouteId === routeItem.route_id ? 'bg-[#0693E3] text-white' : 'bg-gray-100 text-gray-500'"
                  >
                    {{ routeItem.rank }}
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div class="bg-white rounded-xl p-2 border border-gray-100">
                    <p class="text-gray-400">Distance</p>
                    <p class="font-bold text-gray-900">
                      {{ routeItem.distance_km }} km
                    </p>
                  </div>

                  <div class="bg-white rounded-xl p-2 border border-gray-100">
                    <p class="text-gray-400">ETA</p>
                    <p class="font-bold text-gray-900">
                      {{ routeItem.duration_in_traffic_minutes }} min
                    </p>
                  </div>

                  <div class="bg-white rounded-xl p-2 border border-gray-100">
                    <p class="text-gray-400">Delay</p>
                    <p class="font-bold text-gray-900">
                      {{ routeItem.traffic_delay_minutes || 0 }} min
                    </p>
                  </div>

                  <div class="bg-white rounded-xl p-2 border border-gray-100">
                    <p class="text-gray-400">Fare</p>
                    <p class="font-bold text-gray-900">
                      {{ routeItem.estimated_fare ? `Rs ${routeItem.estimated_fare}` : 'N/A' }}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  @click.stop="handleRouteChoiceClick(routeItem)"
                  :disabled="selectingRouteId === routeItem.route_id"
                  class="w-full mt-3 py-2 rounded-xl text-xs font-bold transition disabled:opacity-60"
                  :class="selectedRouteId === routeItem.route_id ? 'bg-[#0693E3] text-white' : 'bg-gray-900 text-white'"
                >
                  {{
                    selectingRouteId === routeItem.route_id
                      ? 'Saving...'
                      : selectedRouteId === routeItem.route_id
                        ? 'Active Route'
                        : 'Select This Route'
                  }}
                </button>
              </div>
            </div>
          </div>

          <!-- DEVIATION + RECALCULATION -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div class="bg-gray-50 rounded-2xl p-3 border border-gray-100">
              <p class="font-bold text-sm text-gray-900 mb-2">
                Deviation Monitor
              </p>

              <div v-if="routeDeviation" class="space-y-2">
                <div class="flex flex-wrap items-center gap-2">
                  <span
                    class="inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize"
                    :class="routeDeviationStatusClass"
                  >
                    {{ routeDeviation.confirmed_deviation ? 'Deviation Confirmed' : routeDeviation.deviated ? 'Watching' : 'On Route' }}
                  </span>

                  <span
                    class="inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize"
                    :class="routeRiskClass"
                  >
                    {{ routeDeviation.risk_level }} Risk
                  </span>
                </div>

                <div class="grid grid-cols-3 gap-2 text-xs">
                  <div class="bg-white rounded-xl p-2 border border-gray-100">
                    <p class="text-gray-400">From Route</p>
                    <p class="font-bold text-gray-900">
                      {{ routeDeviation.distance_from_route_meters }} m
                    </p>
                  </div>

                  <div class="bg-white rounded-xl p-2 border border-gray-100">
                    <p class="text-gray-400">Threshold</p>
                    <p class="font-bold text-gray-900">
                      {{ routeDeviation.threshold_meters }} m
                    </p>
                  </div>

                  <div class="bg-white rounded-xl p-2 border border-gray-100">
                    <p class="text-gray-400">Off Route</p>
                    <p class="font-bold text-gray-900">
                      {{ routeDeviation.off_route_count }}/{{ routeDeviation.required_off_route_count }}
                    </p>
                  </div>
                </div>

                <p class="text-xs text-gray-600">
                  {{ routeDeviation.recommendation }}
                </p>

                <p
                  v-if="routeDeviation.driver_notification"
                  class="bg-yellow-50 border border-yellow-100 text-yellow-800 rounded-xl p-2 text-xs"
                >
                  Driver notice: {{ routeDeviation.driver_notification }}
                </p>

                <p v-if="deviationLastUpdated" class="text-[11px] text-gray-400">
                  Last deviation check: {{ deviationLastUpdated }}
                </p>
              </div>

              <div v-else class="text-xs text-gray-500">
                Deviation status will appear after driver location and selected route are available.
              </div>
            </div>

            <div class="bg-gray-50 rounded-2xl p-3 border border-gray-100">
              <p class="font-bold text-sm text-gray-900 mb-2">
                ETA / Fare Recalculation
              </p>

              <div v-if="routeCostRecalculation" class="space-y-2 text-xs">
                <div class="grid grid-cols-2 gap-2">
                  <div class="bg-white rounded-xl p-2 border border-gray-100">
                    <p class="text-gray-400">Old ETA</p>
                    <p class="font-bold text-gray-900">
                      {{ routeCostRecalculation.old_eta_minutes }} min
                    </p>
                  </div>

                  <div class="bg-white rounded-xl p-2 border border-gray-100">
                    <p class="text-gray-400">New ETA</p>
                    <p class="font-bold text-gray-900">
                      {{ routeCostRecalculation.new_eta_minutes }} min
                    </p>
                  </div>

                  <div class="bg-white rounded-xl p-2 border border-gray-100">
                    <p class="text-gray-400">Old Fare</p>
                    <p class="font-bold text-gray-900">
                      Rs {{ routeCostRecalculation.old_fare || 'N/A' }}
                    </p>
                  </div>

                  <div class="bg-white rounded-xl p-2 border border-gray-100">
                    <p class="text-gray-400">New Fare</p>
                    <p class="font-bold text-gray-900">
                      Rs {{ routeCostRecalculation.new_fare || 'N/A' }}
                    </p>
                  </div>
                </div>

                <p
                  class="rounded-xl p-2 text-xs font-semibold"
                  :class="routeCostRecalculation.fare_changed ? 'bg-yellow-50 text-yellow-800 border border-yellow-100' : 'bg-green-50 text-green-700 border border-green-100'"
                >
                  {{
                    routeCostRecalculation.fare_changed
                      ? 'Fare changed because selected route distance is different.'
                      : 'Fare unchanged for the selected route.'
                  }}
                </p>
              </div>

              <div v-else class="text-xs text-gray-500">
                ETA and fare recalculation will appear after driver selects a route.
              </div>
            </div>
          </div>

          <!-- AI REASONS -->
          <div
            v-if="selectedRoute?.reasons && selectedRoute.reasons.length"
            class="bg-blue-50 rounded-2xl p-3 border border-blue-100"
          >
            <p class="font-bold text-sm text-gray-900 mb-2">
              AI Route Reasoning
            </p>

            <ul class="space-y-1 text-xs text-gray-600">
              <li
                v-for="(reason, index) in selectedRoute.reasons"
                :key="index"
                class="flex gap-2"
              >
                <span class="text-[#0693E3] font-bold">•</span>
                <span>{{ reason }}</span>
              </li>
            </ul>
          </div>

          <div
            v-if="routeDeviation?.reasons && routeDeviation.reasons.length"
            class="bg-gray-50 rounded-2xl p-3 border border-gray-100"
          >
            <p class="font-bold text-sm text-gray-900 mb-2">
              AI Deviation Reasoning
            </p>

            <ul class="space-y-1 text-xs text-gray-600">
              <li
                v-for="(reason, index) in routeDeviation.reasons"
                :key="index"
                class="flex gap-2"
              >
                <span class="text-[#0693E3] font-bold">•</span>
                <span>{{ reason }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- RIDE DETAILS -->
      <div class="bg-white border border-gray-100 rounded-3xl p-4 mb-4 shadow-sm">
        <h3 class="font-bold mb-3">Ride Details</h3>

        <div class="space-y-4 text-sm">
          <div class="flex gap-3">
            <div class="flex flex-col items-center">
              <span class="w-4 h-4 rounded-full bg-green-600"></span>
              <span class="w-px h-10 bg-gray-300"></span>
            </div>
            <div>
              <p class="text-gray-400 text-xs">Pickup</p>
              <p class="font-semibold">{{ fromLocation || 'Loading pickup...' }}</p>
            </div>
          </div>

          <div class="flex gap-3">
            <div class="flex flex-col items-center">
              <span class="w-4 h-4 rounded-full bg-red-600"></span>
            </div>
            <div>
              <p class="text-gray-400 text-xs">Drop</p>
              <p class="font-semibold">{{ toLocation || 'Hourly Ride / Not available' }}</p>
            </div>
          </div>

          <div v-if="hasValidPickupLocation" class="bg-gray-50 rounded-2xl p-3">
            <p class="text-gray-400 text-xs">Pickup Coordinates</p>
            <p class="font-semibold">
              Lat: {{ pickupLat.toFixed(6) }},
              Lng: {{ pickupLng.toFixed(6) }}
            </p>
          </div>

          <div v-else class="bg-yellow-50 rounded-2xl p-3">
            <p class="text-gray-400 text-xs">Pickup Coordinates</p>
            <p class="font-semibold text-yellow-700">
              Missing. System will try to generate coordinates from pickup text.
            </p>
          </div>

          <div v-if="hasValidDropLocation" class="bg-gray-50 rounded-2xl p-3">
            <p class="text-gray-400 text-xs">Drop Coordinates</p>
            <p class="font-semibold">
              Lat: {{ dropLat.toFixed(6) }},
              Lng: {{ dropLng.toFixed(6) }}
            </p>
          </div>

          <div v-else-if="toLocation" class="bg-yellow-50 rounded-2xl p-3">
            <p class="text-gray-400 text-xs">Drop Coordinates</p>
            <p class="font-semibold text-yellow-700">
              Missing. System will try to generate coordinates from drop text.
            </p>
          </div>
        </div>
      </div>

      <!-- DRIVER CURRENT LOCATION -->
      <div v-if="hasValidDriverLocation" class="bg-blue-50 rounded-3xl p-4 mb-4 text-sm border border-blue-100">
        <p class="font-semibold text-[#0693E3] mb-1">Driver Current Location</p>
        <p class="text-gray-600">
          Lat: {{ driverLocation.lat.toFixed(6) }},
          Lng: {{ driverLocation.lng.toFixed(6) }}
        </p>
      </div>

      <div v-else class="bg-yellow-50 rounded-3xl p-4 mb-4 text-sm text-yellow-700 border border-yellow-100">
        Waiting for driver to start sharing location...
      </div>
    </div>

    <!-- DRIVER ARRIVED POPUP -->
    <div
      v-if="showDriverArrivedPopup"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999] px-4"
    >
      <div class="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full text-center">
        <div class="w-16 h-16 bg-green-100 text-green-700 rounded-full mx-auto flex items-center justify-center text-3xl font-bold mb-4">
          ✓
        </div>

        <h2 class="text-xl font-bold text-gray-900 mb-2">
          Driver Reached Pickup Location
        </h2>

        <p class="text-sm text-gray-600 mb-5">
          Driver successfully arrived at the pickup location. Please contact your driver.
        </p>

        <div class="flex gap-3 justify-center">
          <a
            v-if="driverContact"
            :href="`tel:${driverContact}`"
            class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold"
          >
            Call Driver
          </a>

          <button
            @click="showDriverArrivedPopup = false"
            class="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';

const route = useRoute();
const config = useRuntimeConfig();
const { $useCustomFetch } = useNuxtApp();

const bookingId = ref(route.query.booking_id || '');

const fromLocation = ref('');
const toLocation = ref('');
const customerId = ref('');

const pickupLat = ref(toNumberOrNull(route.query.pickup_lat));
const pickupLng = ref(toNumberOrNull(route.query.pickup_lng));

const dropLat = ref(toNumberOrNull(route.query.drop_lat));
const dropLng = ref(toNumberOrNull(route.query.drop_lng));

const pickupCoordinateSource = ref('');
const pickupGeoLoading = ref(false);

const dropCoordinateSource = ref('');
const dropGeoLoading = ref(false);

const driverId = ref('');
const driverName = ref('');
const driverContact = ref('');
const driverImage = ref('');
const driverRating = ref('');
const driverTotalRides = ref('');
const driverExperience = ref('');
const driverVerified = ref('');

const driverEmail = ref('');
const driverCnic = ref('');
const vehicleTitle = ref('');
const vehicleNumber = ref('');

const etaPrediction = ref(null);
const etaLoading = ref(false);
const etaError = ref('');
const etaLastUpdated = ref('');

const routeOptimization = ref(null);
const routeLoading = ref(false);
const routeError = ref('');
const routeLastUpdated = ref('');

const routeDeviation = ref(null);
const deviationLoading = ref(false);
const deviationError = ref('');
const deviationLastUpdated = ref('');

const routeOptions = ref([]);
const selectedRouteId = ref('');
const selectingRouteId = ref('');
const routeCostRecalculation = ref(null);

const hoveredRouteId = ref('');

const demoMode = ref(false);
const demoMoving = ref(false);
const showDriverArrivedPopup = ref(false);
const demoRoutePoints = ref([]);
const demoCurrentPointIndex = ref(0);

let demoInterval = null;

const DEMO_STEP_INTERVAL_MS = 10000;

const googleMapKey = config.public.gmapKey;

const officeLocation = ref({
  lat: toNumberOrNull(route.query.office_lat) || 34.0008965,
  lng: toNumberOrNull(route.query.office_lng) || 71.4986689
});

const mapCenter = ref({
  lat: officeLocation.value.lat,
  lng: officeLocation.value.lng
});

const mapZoom = ref(15);
const trackingMapRef = ref(null);
const renderedRoutePolylines = ref([]);
const mapSectionRef = ref(null);

const driverLocation = ref(null);
const driverLocationSource = ref('');

const lastUpdate = ref('');
const showShareModal = ref(false);

const isOnline = ref(true);
const offlineCount = ref(0);

let trackingInterval = null;
let etaInterval = null;
let routeDeviationInterval = null;
let offlineGpsInterval = null;

const OFFLINE_STORAGE_KEY = 'rsl_offline_locations';

const driverMarkerIcon = createMarkerIcon('#DC2626', 'D');
const pickupMarkerIcon = createMarkerIcon('#16A34A', 'P');

const hasValidDriverLocation = computed(() => {
  return isValidLatLngPair(driverLocation.value?.lat, driverLocation.value?.lng);
});

const hasValidPickupLocation = computed(() => {
  return isValidLatLngPair(pickupLat.value, pickupLng.value);
});

const hasValidDropLocation = computed(() => {
  return isValidLatLngPair(dropLat.value, dropLng.value);
});

const recommendedRoute = computed(() => {
  return routeOptions.value.find((routeItem) => routeItem.is_recommended) || routeOptions.value[0] || null;
});

const selectedRoute = computed(() => {
  return routeOptions.value.find((routeItem) => routeItem.route_id === selectedRouteId.value) || recommendedRoute.value;
});

const activeRoutePolyline = computed(() => {
  return (
    getRoutePolyline(selectedRoute.value) ||
    routeOptimization.value?.route_polyline ||
    routeOptimization.value?.encoded_polyline ||
    ''
  );
});

const routePolylineOptions = computed(() => {
  return routeOptions.value
    .map((routeItem) => {
      const encodedPolyline = getRoutePolyline(routeItem);
      const path = decodeGooglePolyline(encodedPolyline);

      return {
        routeItem,
        encodedPolyline,
        path
      };
    })
    .filter((item) => item.encodedPolyline && item.path.length)
    .map((item) => {
      const routeItem = item.routeItem;
      const isSelected = selectedRouteId.value === routeItem.route_id;
      const isRecommended = routeItem.is_recommended;
      const isHovered = hoveredRouteId.value === routeItem.route_id;

      let strokeColor = '#94A3B8';
      let strokeWeight = 4;
      let strokeOpacity = 0.55;
      let zIndex = 1;

      if (isRecommended) {
        strokeColor = '#0693E3';
        strokeWeight = 6;
        strokeOpacity = 0.9;
        zIndex = 2;
      }

      if (isSelected) {
        strokeColor = '#16A34A';
        strokeWeight = 8;
        strokeOpacity = 1;
        zIndex = 3;
      }

      if (isHovered) {
        strokeWeight = 9;
        strokeOpacity = 1;
        zIndex = 4;
      }

      return {
        key: `route-line-${routeItem.route_id}-${isSelected}-${isHovered}`,
        route_id: routeItem.route_id,
        options: {
          path: item.path,
          geodesic: true,
          strokeColor,
          strokeOpacity,
          strokeWeight,
          zIndex,
          clickable: true,
          visible: true
        }
      };
    });
});

watch(
  routePolylineOptions,
  () => {
    renderRoutePolylines();
  },
  { deep: true }
);

const markerKey = computed(() => {
  if (!hasValidDriverLocation.value) return 'no-marker';
  return `driver-${driverLocation.value.lat}-${driverLocation.value.lng}`;
});

const pickupMarkerKey = computed(() => {
  if (!hasValidPickupLocation.value) return 'no-pickup-marker';
  return `pickup-${pickupLat.value}-${pickupLng.value}`;
});

const markerOptions = computed(() => {
  if (!hasValidDriverLocation.value) return {};

  return {
    position: {
      lat: driverLocation.value.lat,
      lng: driverLocation.value.lng
    },
    title: 'Driver Current Location',
    icon: driverMarkerIcon
  };
});

const pickupMarkerOptions = computed(() => {
  if (!hasValidPickupLocation.value) return {};

  return {
    position: {
      lat: pickupLat.value,
      lng: pickupLng.value
    },
    title: 'Pickup Location',
    icon: pickupMarkerIcon
  };
});

const etaStatusClass = computed(() => {
  const status = etaPrediction.value?.status;

  if (status === 'arrived') {
    return 'bg-green-600 text-white';
  }

  if (status === 'nearby') {
    return 'bg-green-100 text-green-700';
  }

  if (status === 'delayed') {
    return 'bg-red-100 text-red-700';
  }

  return 'bg-blue-100 text-blue-700';
});

const routeRiskClass = computed(() => {
  const risk = routeDeviation.value?.risk_level;

  if (risk === 'high') {
    return 'bg-red-600 text-white';
  }

  if (risk === 'medium') {
    return 'bg-yellow-400 text-slate-950';
  }

  if (risk === 'low') {
    return 'bg-green-500 text-white';
  }

  return 'bg-white/20 text-white';
});

const routeDeviationStatusClass = computed(() => {
  if (!routeDeviation.value) {
    return 'bg-white/20 text-white';
  }

  if (routeDeviation.value.deviated) {
    return 'bg-red-600 text-white';
  }

  return 'bg-green-500 text-white';
});

const safetyUrl = computed(() => {
  return `/safety?booking_id=${bookingId.value}&customer_id=${customerId.value}&driver_id=${driverId.value}&driver_phone=${driverContact.value}`;
});

function createMarkerIcon(color, label) {
  const svg = `
    <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 0C7.61 0 0 7.61 0 17C0 29.75 17 42 17 42C17 42 34 29.75 34 17C34 7.61 26.39 0 17 0Z" fill="${color}"/>
      <circle cx="17" cy="17" r="10" fill="white" fill-opacity="0.18"/>
      <text x="17" y="22" text-anchor="middle" font-size="13" font-family="Arial" font-weight="700" fill="white">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString();
}

function formatEtaDuration(minutes) {
  const totalSeconds = Math.max(0, Math.round(Number(minutes || 0) * 60));

  const hours = Math.floor(totalSeconds / 3600);
  const remainingAfterHours = totalSeconds % 3600;
  const mins = Math.floor(remainingAfterHours / 60);
  const seconds = remainingAfterHours % 60;

  if (hours > 0) {
    return `${hours} hr ${mins} min ${seconds} sec`;
  }

  if (mins > 0) {
    return `${mins} min ${seconds} sec`;
  }

  return `${seconds} sec`;
}

function formatSource(source) {
  if (!source) return 'Unknown';

  return String(source)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildSmartGeocodeQuery(locationText) {
  const text = String(locationText || '').trim();

  if (!text) {
    return '';
  }

  const lowerText = text.toLowerCase();

  const hasCountry =
    lowerText.includes('pakistan') ||
    lowerText.includes('pk');

  if (hasCountry) {
    return text;
  }

  return `${text}, Pakistan`;
}

function toNumberOrNull(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}

function isValidLatLngPair(lat, lng) {
  const latitude = Number(lat);
  const longitude = Number(lng);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return false;
  }

  if (latitude < -90 || latitude > 90) {
    return false;
  }

  if (longitude < -180 || longitude > 180) {
    return false;
  }

  if (latitude === 0 && longitude === 0) {
    return false;
  }

  return true;
}

function safeSetDriverLocation(lat, lng, source = 'unknown') {
  const latitude = toNumberOrNull(lat);
  const longitude = toNumberOrNull(lng);

  if (!isValidLatLngPair(latitude, longitude)) {
    return false;
  }

  driverLocation.value = {
    lat: latitude,
    lng: longitude
  };

  driverLocationSource.value = source;

  mapCenter.value = {
    lat: latitude,
    lng: longitude
  };

  return true;
}

function resetDriverToOffice() {
  safeSetDriverLocation(
    officeLocation.value.lat,
    officeLocation.value.lng,
    'office_default'
  );

  lastUpdate.value = `${formatTime(new Date())} (office location)`;
}

function getFirstValue(object, keys) {
  for (const key of keys) {
    if (
      object &&
      object[key] !== undefined &&
      object[key] !== null &&
      object[key] !== ''
    ) {
      return object[key];
    }
  }

  return null;
}

function getOfflineLocations() {
  if (process.server) return [];

  try {
    return JSON.parse(localStorage.getItem(OFFLINE_STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveOfflineLocations(locations) {
  if (process.server) return;

  localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(locations));
  offlineCount.value = locations.length;
}

function clearOfflineLocations() {
  if (process.server) return;

  localStorage.removeItem(OFFLINE_STORAGE_KEY);
  offlineCount.value = 0;
}

function saveCurrentLocationOffline(position) {
  if (!bookingId.value) {
    console.log('Offline GPS not saved: booking_id missing');
    return;
  }

  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  const locations = getOfflineLocations();

  locations.push({
    driver_id: driverId.value || 1,
    booking_id: bookingId.value,
    latitude: lat,
    longitude: lng,
    accuracy: position.coords.accuracy || null,
    recorded_at: new Date().toISOString()
  });

  saveOfflineLocations(locations);

  safeSetDriverLocation(lat, lng, 'offline_gps');

  lastUpdate.value = `${formatTime(new Date())} (offline saved)`;
}

function saveTestOfflineLocation() {
  if (!bookingId.value) {
    alert('booking_id missing in URL');
    return;
  }

  const lat = hasValidDriverLocation.value
    ? driverLocation.value.lat
    : officeLocation.value.lat;

  const lng = hasValidDriverLocation.value
    ? driverLocation.value.lng
    : officeLocation.value.lng;

  const locations = getOfflineLocations();

  locations.push({
    driver_id: driverId.value || 1,
    booking_id: bookingId.value,
    latitude: lat,
    longitude: lng,
    accuracy: 10,
    recorded_at: new Date().toISOString()
  });

  saveOfflineLocations(locations);

  safeSetDriverLocation(lat, lng, 'test_offline');

  lastUpdate.value = `${formatTime(new Date())} (test offline saved)`;
}

function startOfflineGpsTracking() {
  if (offlineGpsInterval) return;

  if (!navigator.geolocation) {
    console.log('Geolocation not supported.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      saveCurrentLocationOffline(position);
    },
    (error) => {
      console.log('Initial Offline GPS Error:', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );

  offlineGpsInterval = setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        saveCurrentLocationOffline(position);
      },
      (error) => {
        console.log('Offline GPS Error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, 120000);
}

function stopOfflineGpsTracking() {
  if (offlineGpsInterval) {
    clearInterval(offlineGpsInterval);
    offlineGpsInterval = null;
  }
}

async function syncOfflineLocations() {
  const locations = getOfflineLocations();

  if (!locations.length) {
    return;
  }

  try {
    const res = await $useCustomFetch('/api/site/v1/tracking/offline-sync', {
      method: 'POST',
      body: {
        locations
      }
    });

    if (res.success) {
      clearOfflineLocations();
      await fetchLatestLocation();
      await fetchAiEta();
      await fetchRouteDeviation();
    } else {
      console.log('Offline sync failed:', res.message);
    }
  } catch (error) {
    console.log('Offline Sync Error:', error);
  }
}

function handleOnline() {
  isOnline.value = true;
  stopOfflineGpsTracking();
  syncOfflineLocations();
}

function handleOffline() {
  isOnline.value = false;
  startOfflineGpsTracking();
}

async function fetchBookingStatus() {
  if (!bookingId.value) return;

  try {
    const res = await $useCustomFetch(`/api/site/v1/booking/status/${bookingId.value}`);

    console.log('Booking Status Response:', res);

    if (res.success && res.data) {
      fromLocation.value =
        res.data.from_location ||
        res.data.pickup_location ||
        res.data.source_location ||
        '';

      toLocation.value =
        res.data.to_location ||
        res.data.drop_location ||
        res.data.destination_location ||
        '';

      customerId.value =
        res.data.customer_id ||
        res.data.user_id ||
        res.data.id ||
        '';

      const bookingPickupLat = toNumberOrNull(
        getFirstValue(res.data, [
          'pickup_lat',
          'pickupLat',
          'from_lat',
          'fromLat',
          'source_lat',
          'sourceLat'
        ])
      );

      const bookingPickupLng = toNumberOrNull(
        getFirstValue(res.data, [
          'pickup_lng',
          'pickupLng',
          'from_lng',
          'fromLng',
          'source_lng',
          'sourceLng'
        ])
      );

      const bookingDropLat = toNumberOrNull(
        getFirstValue(res.data, [
          'drop_lat',
          'dropLat',
          'to_lat',
          'toLat',
          'destination_lat',
          'destinationLat',
          'dropoff_lat',
          'dropoffLat'
        ])
      );

      const bookingDropLng = toNumberOrNull(
        getFirstValue(res.data, [
          'drop_lng',
          'dropLng',
          'to_lng',
          'toLng',
          'destination_lng',
          'destinationLng',
          'dropoff_lng',
          'dropoffLng'
        ])
      );

      if (isValidLatLngPair(bookingPickupLat, bookingPickupLng)) {
        pickupLat.value = bookingPickupLat;
        pickupLng.value = bookingPickupLng;
        pickupCoordinateSource.value = 'booking_record';
      }

      if (isValidLatLngPair(bookingDropLat, bookingDropLng)) {
        dropLat.value = bookingDropLat;
        dropLng.value = bookingDropLng;
        dropCoordinateSource.value = 'booking_record';
      }

      if (!hasValidPickupLocation.value && fromLocation.value) {
        await geocodePickupFromText();
      }

      if (!hasValidDropLocation.value && toLocation.value) {
        await geocodeDropFromText();
      }

      if (hasValidPickupLocation.value && !hasValidDriverLocation.value) {
        mapCenter.value = {
          lat: pickupLat.value,
          lng: pickupLng.value
        };
      }

      if (res.data.driver) {
        driverId.value = res.data.driver.id || driverId.value || '';

        driverName.value =
          res.data.driver.name ||
          res.data.driver.full_name ||
          '';

        driverContact.value =
          res.data.driver.contact ||
          res.data.driver.phone ||
          res.data.driver.mobile ||
          '';

        driverImage.value = res.data.driver.image || '';
        driverRating.value = res.data.driver.rating || '';
        driverTotalRides.value = res.data.driver.total_rides || '';
        driverExperience.value = res.data.driver.experience_years || '';
        driverVerified.value = res.data.driver.verified_status || '';

        driverEmail.value = res.data.driver.email || '';

        driverCnic.value =
          res.data.driver.cnic ||
          res.data.driver.cnic_number ||
          res.data.driver.nic ||
          '';

        vehicleTitle.value =
          res.data.driver.car?.title ||
          res.data.driver.vehicle?.title ||
          res.data.car?.title ||
          res.data.vehicle?.title ||
          res.data.car_type ||
          res.data.vehicle_name ||
          '';

        vehicleNumber.value =
          res.data.driver.car?.registration_number ||
          res.data.driver.vehicle?.registration_number ||
          res.data.car?.registration_number ||
          res.data.vehicle?.registration_number ||
          res.data.vehicle_number ||
          '';
      }

      if (!driverId.value) {
        driverId.value =
          res.data.driver_id ||
          res.data.driverId ||
          res.data.assigned_driver_id ||
          '';
      }
    }
  } catch (error) {
    console.log('Booking Status Error:', error);
  }
}

async function geocodePickupFromText() {
  if (!fromLocation.value || hasValidPickupLocation.value) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  try {
    pickupGeoLoading.value = true;
    etaError.value = '';

    const pickupQuery = buildSmartGeocodeQuery(fromLocation.value);

    console.log('Trying pickup geocode:', pickupQuery);

    await waitForGoogleMaps();

    const geocoder = new window.google.maps.Geocoder();

    const result = await new Promise((resolve, reject) => {
      geocoder.geocode(
        {
          address: pickupQuery,
          region: 'pk'
        },
        (results, status) => {
          if (status === 'OK' && results && results.length) {
            resolve(results[0]);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        }
      );
    });

    const location = result.geometry.location;

    pickupLat.value = Number(location.lat());
    pickupLng.value = Number(location.lng());
    pickupCoordinateSource.value = 'google_maps_geocoder';

    mapCenter.value = {
      lat: pickupLat.value,
      lng: pickupLng.value
    };

    console.log('Pickup geocoded successfully:', {
      input: fromLocation.value,
      query: pickupQuery,
      address: result.formatted_address,
      pickup_lat: pickupLat.value,
      pickup_lng: pickupLng.value
    });
  } catch (error) {
    console.log('Pickup Geocoding Error:', error);

    etaError.value =
      'Pickup location text was found, but coordinates could not be generated. Add pickup_lat and pickup_lng to booking data.';
  } finally {
    pickupGeoLoading.value = false;
  }
}

async function geocodeDropFromText() {
  if (!toLocation.value || hasValidDropLocation.value) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  try {
    dropGeoLoading.value = true;
    routeError.value = '';

    const dropQuery = buildSmartGeocodeQuery(toLocation.value);

    console.log('Trying drop geocode:', dropQuery);

    await waitForGoogleMaps();

    const geocoder = new window.google.maps.Geocoder();

    const result = await new Promise((resolve, reject) => {
      geocoder.geocode(
        {
          address: dropQuery,
          region: 'pk'
        },
        (results, status) => {
          if (status === 'OK' && results && results.length) {
            resolve(results[0]);
          } else {
            reject(new Error(`Drop geocoding failed: ${status}`));
          }
        }
      );
    });

    const location = result.geometry.location;

    dropLat.value = Number(location.lat());
    dropLng.value = Number(location.lng());
    dropCoordinateSource.value = 'google_maps_geocoder';

    console.log('Drop geocoded successfully:', {
      input: toLocation.value,
      query: dropQuery,
      address: result.formatted_address,
      drop_lat: dropLat.value,
      drop_lng: dropLng.value
    });
  } catch (error) {
    console.log('Drop Geocoding Error:', error);

    routeError.value =
      'Drop location text was found, but coordinates could not be generated. Route optimization needs drop latitude and longitude.';
  } finally {
    dropGeoLoading.value = false;
  }
}

function waitForGoogleMaps() {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const interval = setInterval(() => {
      attempts += 1;

      if (window.google && window.google.maps && window.google.maps.Geocoder) {
        clearInterval(interval);
        resolve();
      }

      if (attempts >= 30) {
        clearInterval(interval);
        reject(new Error('Google Maps JavaScript API not loaded'));
      }
    }, 300);
  });
}

async function fetchLatestLocation() {
  if (!bookingId.value) return;

  if (demoMoving.value) {
    return;
  }

  if (!navigator.onLine) {
    handleOffline();
    return;
  }

  try {
    const res = await $useCustomFetch(`/api/site/v1/tracking/location/${bookingId.value}`);

    console.log('Location API Response:', res);

    if (res.success && res.data) {
      const lat = parseFloat(
        res.data.latitude ||
        res.data.lat ||
        res.data.driver_lat
      );

      const lng = parseFloat(
        res.data.longitude ||
        res.data.lng ||
        res.data.driver_lng
      );

      if (!driverId.value) {
        driverId.value =
          res.data.driver_id ||
          res.data.driverId ||
          res.data.driver?.id ||
          '';
      }

      const didSetLocation = safeSetDriverLocation(lat, lng, 'database');

      if (didSetLocation) {
        lastUpdate.value = formatTime(new Date());
        return;
      }
    }

    if (!hasValidDriverLocation.value) {
      resetDriverToOffice();
    }
  } catch (error) {
    console.log('Location Error:', error);

    if (!hasValidDriverLocation.value) {
      resetDriverToOffice();
    }
  }
}

async function fetchAiEta() {
  etaError.value = '';

  if (!bookingId.value) {
    etaError.value = 'Booking ID is missing.';
    return;
  }

  if (!driverId.value) {
    etaError.value = 'Driver is not assigned yet.';
    return;
  }

  if (!navigator.onLine) {
    etaError.value = 'ETA prediction is not available in offline mode.';
    return;
  }

  if (!hasValidPickupLocation.value) {
    await geocodePickupFromText();
  }

  if (!hasValidPickupLocation.value) {
    etaError.value = 'Pickup coordinates are missing. ETA needs pickup latitude and longitude.';
    return;
  }

  if (!hasValidDriverLocation.value) {
    resetDriverToOffice();
  }

  try {
    etaLoading.value = true;

    const body = {
      booking_id: Number(bookingId.value) || bookingId.value,
      driver_id: Number(driverId.value) || driverId.value,
      pickup_lat: pickupLat.value,
      pickup_lng: pickupLng.value,
      driver_lat: driverLocation.value.lat,
      driver_lng: driverLocation.value.lng,
      demo_mode: demoMode.value
    };

    console.log('AI ETA Request Body:', body);

    const res = await $useCustomFetch('/api/site/v1/ai/predict-eta', {
      method: 'POST',
      body
    });

    console.log('AI ETA Response:', res);

    if (res.success) {
      etaPrediction.value = res;
      etaLastUpdated.value = formatTime(new Date());

      if (res.driver_location_source) {
        driverLocationSource.value = res.driver_location_source;
      }

      if (res.status === 'arrived') {
        showDriverArrivedPopup.value = true;
      }
    } else {
      etaError.value = res.message || 'Unable to generate ETA prediction.';
    }
  } catch (error) {
    console.log('AI ETA Error:', error);
    etaError.value =
      error?.data?.message ||
      error?.message ||
      'AI ETA prediction failed.';
  } finally {
    etaLoading.value = false;
  }
}

async function fetchRouteOptimization() {
  routeError.value = '';

  if (!bookingId.value) {
    routeError.value = 'Booking ID is missing.';
    return;
  }

  if (!navigator.onLine) {
    routeError.value = 'Route optimization is not available in offline mode.';
    return;
  }

  if (!hasValidPickupLocation.value) {
    await geocodePickupFromText();
  }

  if (!hasValidDropLocation.value && toLocation.value) {
    await geocodeDropFromText();
  }

  if (!hasValidPickupLocation.value) {
    routeError.value = 'Pickup coordinates are missing. Route optimization needs pickup latitude and longitude.';
    return;
  }

  if (!hasValidDropLocation.value) {
    routeError.value = 'Drop coordinates are missing. Route optimization needs drop latitude and longitude.';
    return;
  }

  try {
    routeLoading.value = true;

    const body = {
      booking_id: Number(bookingId.value) || bookingId.value,
      pickup_lat: pickupLat.value,
      pickup_lng: pickupLng.value,
      drop_lat: dropLat.value,
      drop_lng: dropLng.value,
      ride_type: 'per_km',
      price_per_km: 250,
      gps_accuracy_meters: 25
    };

    console.log('AI Multiple Route Optimization Request Body:', body);

    const res = await $useCustomFetch('/api/site/v1/ai/optimize-routes', {
      method: 'POST',
      body
    });

    console.log('AI Multiple Route Optimization Response:', res);

    if (res.success) {
      routeOptimization.value = res;
      routeOptions.value = normalizeRouteOptions(res);

      console.log('RSL Route Polyline Debug:', {
        routes_count: routeOptions.value.length,
        polyline_count: routeOptions.value.filter((routeItem) => getRoutePolyline(routeItem)).length,
        routes: routeOptions.value.map((routeItem) => ({
          route_id: routeItem.route_id,
          rank: routeItem.rank,
          has_encoded_polyline: Boolean(routeItem.encoded_polyline),
          has_route_polyline: Boolean(routeItem.route_polyline),
          polyline_length: getRoutePolyline(routeItem).length
        }))
      });

      selectedRouteId.value = res.recommended_route_id || routeOptions.value[0]?.route_id || '';
      routeLastUpdated.value = formatTime(new Date());

      await nextTick();
      renderRoutePolylines();
      focusMapOnRoute(selectedRoute.value || recommendedRoute.value);

      if (selectedRouteId.value) {
        await selectDriverRoute(
          routeOptions.value.find((routeItem) => routeItem.route_id === selectedRouteId.value),
          true
        );
      }

      await fetchRouteDeviation();
    } else {
      routeError.value = res.message || 'Unable to optimize routes.';
    }
  } catch (error) {
    console.log('AI Multiple Route Optimization Error:', error);

    routeError.value =
      error?.data?.message ||
      error?.message ||
      'AI route optimization failed.';
  } finally {
    routeLoading.value = false;
  }
}

async function fetchRouteDeviation() {
  deviationError.value = '';

  if (!bookingId.value) {
    deviationError.value = 'Booking ID is missing.';
    return;
  }

  if (!navigator.onLine) {
    deviationError.value = 'Route deviation check is not available in offline mode.';
    return;
  }

  if (!hasValidDriverLocation.value) {
    deviationError.value = 'Driver location is missing. Deviation check needs driver latitude and longitude.';
    return;
  }

  if (!activeRoutePolyline.value) {
    deviationError.value = 'Selected route polyline is missing. Generate or select route first.';
    return;
  }

  try {
    deviationLoading.value = true;

    const body = {
      booking_id: Number(bookingId.value) || bookingId.value,
      driver_id: Number(driverId.value) || driverId.value,
      driver_lat: driverLocation.value.lat,
      driver_lng: driverLocation.value.lng,
      route_polyline: activeRoutePolyline.value,
      road_type: 'city',
      gps_accuracy_meters: 25,
      speed_kmph: 30,
      driver_email: driverEmail.value || ''
    };

    console.log('AI Improved Route Deviation Request Body:', body);

    const res = await $useCustomFetch('/api/site/v1/ai/check-route-deviation', {
      method: 'POST',
      body
    });

    console.log('AI Improved Route Deviation Response:', res);

    if (res.success) {
      routeDeviation.value = res;
      deviationLastUpdated.value = formatTime(new Date());
    } else {
      deviationError.value = res.message || 'Unable to check route deviation.';
    }
  } catch (error) {
    console.log('AI Improved Route Deviation Error:', error);

    deviationError.value =
      error?.data?.message ||
      error?.message ||
      'AI route deviation check failed.';
  } finally {
    deviationLoading.value = false;
  }
}

async function selectDriverRoute(routeItem, silent = false) {
  if (!routeItem || !routeItem.route_id) {
    return;
  }

  if (!bookingId.value) {
    routeError.value = 'Booking ID is missing. Route selection cannot be saved.';
    return;
  }

  try {
    selectingRouteId.value = routeItem.route_id;

    const body = {
      booking_id: Number(bookingId.value) || bookingId.value,
      driver_id: Number(driverId.value) || driverId.value || null,
      selected_route_id: routeItem.route_id,
      selected_by: silent ? 'system_recommendation' : 'driver',
      reason: silent
        ? 'System selected recommended route by default.'
        : 'Driver selected route from Smart Route Intelligence UI.'
    };

    console.log('AI Select Route Request Body:', body);

    const res = await $useCustomFetch('/api/site/v1/ai/select-route', {
      method: 'POST',
      body
    });

    console.log('AI Select Route Response:', res);

    if (res.success) {
      selectedRouteId.value = routeItem.route_id;
      await nextTick();
      renderRoutePolylines();
      focusMapOnRoute(routeItem);

      await recalculateRouteCost(routeItem.route_id);
      await fetchRouteDeviation();
    } else if (!silent) {
      routeError.value = res.message || 'Unable to save selected route.';
    }
  } catch (error) {
    console.log('AI Select Route Error:', error);

    if (!silent) {
      routeError.value =
        error?.data?.message ||
        error?.message ||
        'Selected route could not be saved.';
    }
  } finally {
    selectingRouteId.value = '';
  }
}

async function recalculateRouteCost(routeId) {
  if (!bookingId.value || !routeId) {
    return;
  }

  try {
    const body = {
      booking_id: Number(bookingId.value) || bookingId.value,
      selected_route_id: routeId,
      ride_type: 'per_km',
      price_per_km: 250,
      original_fare: selectedRoute.value?.estimated_fare || recommendedRoute.value?.estimated_fare || null
    };

    console.log('AI Route Cost Recalculation Request Body:', body);

    const res = await $useCustomFetch('/api/site/v1/ai/recalculate-route-cost', {
      method: 'POST',
      body
    });

    console.log('AI Route Cost Recalculation Response:', res);

    if (res.success) {
      routeCostRecalculation.value = res;
    }
  } catch (error) {
    console.log('AI Route Cost Recalculation Error:', error);
  }
}

function getRoutePolyline(routeItem) {
  if (!routeItem) {
    return '';
  }

  return (
    routeItem.encoded_polyline ||
    routeItem.route_polyline ||
    routeItem.polyline ||
    routeItem.overview_polyline?.points ||
    routeItem.overview_polyline ||
    ''
  );
}

function normalizeRouteOptions(response) {
  const routes = Array.isArray(response?.routes) ? response.routes : [];

  if (routes.length) {
    return routes.map((routeItem, index) => {
      const encodedPolyline =
        getRoutePolyline(routeItem) ||
        (index === 0 ? response?.route_polyline : '') ||
        (index === 0 ? response?.encoded_polyline : '');

      return {
        ...routeItem,
        route_id: routeItem.route_id || `route_${index + 1}`,
        rank: routeItem.rank || index + 1,
        encoded_polyline: encodedPolyline
      };
    });
  }

  if (response?.route_polyline || response?.encoded_polyline) {
    return [
      {
        route_id: response.recommended_route_id || 'route_1',
        rank: 1,
        summary: response.best_route?.summary || response.summary || 'Recommended Route',
        distance_km: response.distance_km || response.best_route?.distance_km || 0,
        duration_in_traffic_minutes:
          response.duration_minutes ||
          response.best_route?.duration_minutes ||
          0,
        confidence: response.confidence || 80,
        estimated_fare: response.estimated_fare || null,
        is_recommended: true,
        encoded_polyline: response.route_polyline || response.encoded_polyline
      }
    ];
  }

  return [];
}

function getGoogleMapInstance() {
  return (
    trackingMapRef.value?.map ||
    trackingMapRef.value?.$mapObject ||
    trackingMapRef.value?.googleMap ||
    null
  );
}

function clearRenderedRoutePolylines() {
  renderedRoutePolylines.value.forEach((polyline) => {
    if (polyline && typeof polyline.setMap === 'function') {
      polyline.setMap(null);
    }
  });

  renderedRoutePolylines.value = [];
}

function renderRoutePolylines() {
  if (typeof window === 'undefined' || !window.google?.maps) {
    return;
  }

  const map = getGoogleMapInstance();

  if (!map) {
    setTimeout(() => {
      renderRoutePolylines();
    }, 300);
    return;
  }

  clearRenderedRoutePolylines();

  routePolylineOptions.value.forEach((routeLine) => {
    const polyline = new window.google.maps.Polyline({
      ...routeLine.options,
      map
    });

    polyline.addListener('click', () => {
      selectRouteById(routeLine.route_id);
    });

    polyline.addListener('mouseover', () => {
      hoveredRouteId.value = routeLine.route_id;
    });

    polyline.addListener('mouseout', () => {
      hoveredRouteId.value = '';
    });

    renderedRoutePolylines.value.push(polyline);
  });

  console.log('Rendered route polylines on map:', renderedRoutePolylines.value.length);
}

function getRouteCardClass(routeItem) {
  if (!routeItem) {
    return 'bg-white border-gray-100';
  }

  if (selectedRouteId.value === routeItem.route_id) {
    return 'bg-blue-50 border-[#0693E3] shadow-md';
  }

  if (routeItem.is_recommended) {
    return 'bg-green-50 border-green-200 hover:border-green-300 hover:shadow-md';
  }

  return 'bg-white border-gray-100 hover:border-[#0693E3]/40 hover:shadow-md';
}

function selectRouteById(routeId) {
  const routeItem = routeOptions.value.find((item) => item.route_id === routeId);

  if (!routeItem) {
    return;
  }

  selectDriverRoute(routeItem);
}

async function handleRouteChoiceClick(routeItem) {
  if (!routeItem) {
    return;
  }

  await selectDriverRoute(routeItem);

  setTimeout(() => {
    scrollToTrackingMap();
  }, 200);
}

function scrollToTrackingMap() {
  if (typeof window === 'undefined') {
    return;
  }

  if (mapSectionRef.value) {
    mapSectionRef.value.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    return;
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function decodeGooglePolyline(encoded) {
  if (!encoded || typeof encoded !== 'string') {
    return [];
  }

  let index = 0;
  const path = [];
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let b;
    let shift = 0;
    let result = 0;

    do {
      b = encoded.charCodeAt(index) - 63;
      index += 1;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt(index) - 63;
      index += 1;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    path.push({
      lat: lat / 1e5,
      lng: lng / 1e5
    });
  }

  return path;
}

function focusMapOnRoute(routeItem) {
  const encodedPolyline = getRoutePolyline(routeItem);

  if (!encodedPolyline) {
    console.log('Focus route skipped: polyline missing', routeItem);
    return;
  }

  const path = decodeGooglePolyline(encodedPolyline);

  if (!path.length) {
    console.log('Focus route skipped: decoded path empty', {
      route_id: routeItem?.route_id,
      polyline_length: encodedPolyline.length
    });
    return;
  }

  const map = getGoogleMapInstance();

  if (map && window.google?.maps) {
    const bounds = new window.google.maps.LatLngBounds();

    path.forEach((point) => {
      bounds.extend(point);
    });

    map.fitBounds(bounds);
  } else {
    const centerPoint = path[Math.floor(path.length / 2)];

    if (isValidLatLngPair(centerPoint.lat, centerPoint.lng)) {
      mapCenter.value = {
        lat: centerPoint.lat,
        lng: centerPoint.lng
      };
    }
  }

  const distanceKm = Number(routeItem.distance_km || 0);

  if (distanceKm >= 80) {
    mapZoom.value = 8;
  } else if (distanceKm >= 30) {
    mapZoom.value = 10;
  } else if (distanceKm >= 10) {
    mapZoom.value = 12;
  } else {
    mapZoom.value = 14;
  }

  console.log('Map focused on selected route:', {
    route_id: routeItem.route_id,
    points: path.length,
    zoom: mapZoom.value,
    center: mapCenter.value
  });
}

async function startDemoMovement() {
  etaError.value = '';
  showDriverArrivedPopup.value = false;

  if (!bookingId.value) {
    etaError.value = 'Booking ID is missing. Demo movement cannot start.';
    return;
  }

  if (!driverId.value) {
    etaError.value = 'Driver is not assigned yet. Demo movement cannot start.';
    return;
  }

  if (!hasValidPickupLocation.value) {
    await geocodePickupFromText();
  }

  if (!hasValidPickupLocation.value) {
    etaError.value = 'Pickup coordinates are missing. Demo movement cannot start.';
    return;
  }

  demoMode.value = true;
  demoMoving.value = true;
  demoCurrentPointIndex.value = 0;
  demoRoutePoints.value = [];

  resetDriverToOffice();

  const startLat = officeLocation.value.lat;
  const startLng = officeLocation.value.lng;

  try {
    await buildDemoRoutePoints(startLat, startLng);

    if (!demoRoutePoints.value.length) {
      etaError.value = 'Unable to generate demo route points.';
      stopDemoMovement();
      return;
    }

    await moveDriverAlongRoute();

    if (demoInterval) {
      clearInterval(demoInterval);
    }

    demoInterval = setInterval(() => {
      moveDriverAlongRoute();
    }, DEMO_STEP_INTERVAL_MS);
  } catch (error) {
    console.log('Demo movement error:', error);
    etaError.value = 'Demo movement failed. Fallback movement started.';

    buildFallbackRoutePoints(startLat, startLng);
    await moveDriverAlongRoute();

    demoInterval = setInterval(() => {
      moveDriverAlongRoute();
    }, DEMO_STEP_INTERVAL_MS);
  }
}

async function buildDemoRoutePoints(startLat, startLng) {
  await waitForGoogleMaps();

  const directionsService = new window.google.maps.DirectionsService();

  const routeResult = await new Promise((resolve, reject) => {
    directionsService.route(
      {
        origin: {
          lat: startLat,
          lng: startLng
        },
        destination: {
          lat: pickupLat.value,
          lng: pickupLng.value
        },
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === 'OK' && result?.routes?.length) {
          resolve(result.routes[0]);
        } else {
          reject(new Error(`Directions failed: ${status}`));
        }
      }
    );
  });

  const path = routeResult.overview_path || [];

  demoRoutePoints.value = path.map((point) => ({
    lat: Number(point.lat()),
    lng: Number(point.lng())
  }));

  if (!demoRoutePoints.value.length) {
    buildFallbackRoutePoints(startLat, startLng);
  }

  console.log('Demo route points generated:', demoRoutePoints.value.length);
}

function buildFallbackRoutePoints(startLat, startLng) {
  const points = [];
  const totalSteps = 12;

  for (let index = 0; index <= totalSteps; index += 1) {
    const progress = index / totalSteps;

    points.push({
      lat: Number((startLat + (pickupLat.value - startLat) * progress).toFixed(6)),
      lng: Number((startLng + (pickupLng.value - startLng) * progress).toFixed(6))
    });
  }

  demoRoutePoints.value = points;
}

async function moveDriverAlongRoute() {
  if (!demoMoving.value || !demoRoutePoints.value.length) {
    return;
  }

  const totalPoints = demoRoutePoints.value.length;
  const currentIndex = Math.min(demoCurrentPointIndex.value, totalPoints - 1);
  const point = demoRoutePoints.value[currentIndex];

  safeSetDriverLocation(point.lat, point.lng, 'demo_movement');

  lastUpdate.value = `${formatTime(new Date())} (driver moving)`;

  await fetchAiEta();
  await fetchRouteDeviation();

  const nextIndex = currentIndex + Math.max(1, Math.ceil(totalPoints / 12));
  demoCurrentPointIndex.value = nextIndex;

  if (nextIndex >= totalPoints) {
    safeSetDriverLocation(pickupLat.value, pickupLng.value, 'arrived_pickup');

    await fetchAiEta();
    await fetchRouteDeviation();

    stopDemoMovement();

    lastUpdate.value = `${formatTime(new Date())} (driver reached pickup)`;
    showDriverArrivedPopup.value = true;
  }
}

function stopDemoMovement() {
  demoMoving.value = false;

  if (demoInterval) {
    clearInterval(demoInterval);
    demoInterval = null;
  }
}

onMounted(async () => {
  isOnline.value = navigator.onLine;
  offlineCount.value = getOfflineLocations().length;

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  resetDriverToOffice();

  await fetchBookingStatus();

  if (navigator.onLine) {
    await syncOfflineLocations();
    await fetchLatestLocation();
    await fetchAiEta();
    await fetchRouteOptimization();
  } else {
    handleOffline();
  }

  trackingInterval = setInterval(async () => {
    if (navigator.onLine) {
      await fetchBookingStatus();

      if (!demoMoving.value) {
        await fetchLatestLocation();
        await fetchAiEta();

        if (!routeOptions.value.length) {
          await fetchRouteOptimization();
        } else {
          await fetchRouteDeviation();
        }
      }
    } else {
      handleOffline();
    }
  }, 10000);

  etaInterval = setInterval(async () => {
    if (navigator.onLine && !demoMoving.value) {
      await fetchAiEta();
    }
  }, 30000);

  routeDeviationInterval = setInterval(async () => {
    if (navigator.onLine && !demoMoving.value && activeRoutePolyline.value) {
      await fetchRouteDeviation();
    }
  }, 15000);
});

onBeforeUnmount(() => {
  if (trackingInterval) clearInterval(trackingInterval);
  if (etaInterval) clearInterval(etaInterval);
  if (routeDeviationInterval) clearInterval(routeDeviationInterval);
  if (demoInterval) clearInterval(demoInterval);

  clearRenderedRoutePolylines();
  stopOfflineGpsTracking();

  window.removeEventListener('online', handleOnline);
  window.removeEventListener('offline', handleOffline);
});
</script>