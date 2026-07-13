<template>
  <div class="min-h-screen bg-[#050B14] text-white">
    <!-- BACKGROUND -->
    <div class="relative min-h-screen overflow-hidden pb-32">
      <div class="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-[#0693E3]/25 blur-3xl"></div>
      <div class="pointer-events-none absolute left-[-180px] top-[380px] h-[460px] w-[460px] rounded-full bg-red-600/20 blur-3xl"></div>
      <div class="pointer-events-none absolute bottom-0 right-[-160px] h-[480px] w-[480px] rounded-full bg-cyan-400/10 blur-3xl"></div>

      <!-- HERO -->
      <section class="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#020617] via-[#061C31] to-[#063D67]">
        <div class="pointer-events-none absolute inset-0 opacity-[0.08]">
          <div class="h-full w-full bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"></div>
        </div>

        <div class="relative mx-auto max-w-7xl px-4 pb-24 pt-7">
          <!-- TOP BAR -->
          <div class="flex items-center justify-between gap-4">
            <NuxtLink
              :to="`/tracking?booking_id=${bookingId}`"
              class="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl font-bold backdrop-blur-xl transition hover:bg-white/20"
            >
              <span class="transition group-hover:-translate-x-1">←</span>
            </NuxtLink>

            <div class="text-center">
              <p class="text-xs font-black uppercase tracking-[0.35em] text-blue-100/60">
                RSL Protection
              </p>
              <h1 class="mt-1 text-3xl font-black md:text-4xl">
                Safety Command Center
              </h1>
            </div>

            <button
              type="button"
              @click="shareTrackingLink"
              class="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-black backdrop-blur-xl transition hover:bg-white/20"
            >
              <span class="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </button>
          </div>

          <!-- HERO GRID -->
          <div class="mt-10 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div class="lg:col-span-7">
              <div class="inline-flex items-center gap-2 rounded-full border border-green-300/20 bg-green-400/10 px-4 py-2 text-xs font-black text-green-300">
                <span class="h-2 w-2 rounded-full bg-green-300 animate-pulse"></span>
                Live Protection Active
              </div>

              <p class="mt-6 text-sm font-semibold text-white/65">
                Booking Reference
              </p>

              <h2 class="mt-1 text-6xl font-black tracking-tight md:text-7xl">
                #{{ bookingId || 'N/A' }}
              </h2>

              <p class="mt-4 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
                Emergency alert, driver verification, live ride sharing, incident reporting,
                and RSL support are available from this secure passenger safety dashboard.
              </p>
            </div>

            <div class="lg:col-span-5">
              <div class="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-2xl">
                <div class="h-1.5 bg-gradient-to-r from-[#0693E3] via-cyan-300 to-green-400"></div>

                <div class="p-5">
                  <div class="flex items-center justify-between gap-4">
                    <div>
                      <p class="text-xs uppercase tracking-[0.25em] text-white/45">
                        Protection Mode
                      </p>
                      <p class="mt-1 text-2xl font-black">
                        Live Protected
                      </p>
                    </div>

                    <div class="flex h-16 w-16 items-center justify-center rounded-3xl bg-green-400/15 text-3xl shadow-inner">
                      🛡
                    </div>
                  </div>

                  <div class="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
                    <div class="rounded-2xl border border-white/10 bg-white/10 p-3">
                      <p class="font-black text-green-300">Active</p>
                      <p class="mt-1 text-white/45">GPS</p>
                    </div>

                    <div class="rounded-2xl border border-white/10 bg-white/10 p-3">
                      <p class="font-black text-green-300">Online</p>
                      <p class="mt-1 text-white/45">Admin</p>
                    </div>

                    <div class="rounded-2xl border border-white/10 bg-white/10 p-3">
                      <p class="font-black text-green-300">Ready</p>
                      <p class="mt-1 text-white/45">Support</p>
                    </div>
                  </div>

                  <div class="mt-4 rounded-2xl border border-white/10 bg-white/10 p-3 text-xs text-white/60">
                    Emergency actions attach booking ID, driver info and passenger location where available.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- MAIN CONTENT -->
      <main class="relative mx-auto max-w-7xl px-4 -mt-16">
        <div class="grid gap-6 lg:grid-cols-12">
          <!-- LEFT COLUMN -->
          <section class="space-y-6 lg:col-span-4">
            <!-- DRIVER PREMIUM CARD -->
            <div class="overflow-hidden rounded-[2rem] bg-white text-slate-950 shadow-2xl">
              <div class="h-1.5 bg-gradient-to-r from-[#0693E3] via-[#0878C9] to-[#045A9C]"></div>

              <div class="p-5">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs font-black uppercase tracking-[0.25em] text-[#0693E3]">
                      Assigned Chauffeur
                    </p>
                    <h2 class="mt-1 text-xl font-black">
                      Driver Profile
                    </h2>
                  </div>

                  <span
                    v-if="driverVerified == 1"
                    class="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700"
                  >
                    Verified
                  </span>

                  <span
                    v-else
                    class="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700"
                  >
                    Pending
                  </span>
                </div>

                <div class="mt-5 flex items-center gap-4">
                  <div class="flex h-[76px] w-[76px] min-w-[76px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#0693E3] to-[#034f8c] text-3xl font-black text-white shadow-lg">
                    <img
                      v-if="driverImage"
                      :src="driverImage"
                      class="h-full w-full object-cover"
                    />
                    <span v-else>{{ driverName ? driverName[0] : '?' }}</span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <p class="break-words text-2xl font-black">
                      {{ driverName || 'Driver Details Loading...' }}
                    </p>

                    <p class="mt-1 text-sm font-semibold text-slate-500">
                      {{ driverContact || driverPhone || 'Contact not available' }}
                    </p>

                    <p class="mt-2 text-xs font-semibold text-slate-400">
                      ⭐ {{ driverRating || '5.0' }}
                      • {{ driverTotalRides || 0 }} rides
                      • {{ driverExperience || 0 }} yrs exp
                    </p>
                  </div>
                </div>

                <div class="mt-5 grid grid-cols-2 gap-3">
                  <a
                    :href="`tel:${driverContact || driverPhone}`"
                    class="rounded-2xl bg-green-600 py-3 text-center font-black text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700"
                  >
                    Call Driver
                  </a>

                  <a
                    :href="whatsappUrl"
                    target="_blank"
                    class="rounded-2xl bg-slate-950 py-3 text-center font-black text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-black"
                  >
                    WhatsApp
                  </a>
                </div>

                <!-- DRIVER META -->
                <div class="mt-5 space-y-3 text-sm">
                  <div class="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <p class="text-xs text-slate-400">Email</p>
                    <p class="break-all font-bold">{{ driverEmail || 'N/A' }}</p>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div class="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                      <p class="text-xs text-slate-400">License No</p>
                      <p class="font-bold">{{ driverLicense || 'N/A' }}</p>
                    </div>

                    <div class="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                      <p class="text-xs text-slate-400">CNIC</p>
                      <p class="font-bold">{{ driverCnic || 'N/A' }}</p>
                    </div>
                  </div>

                  <div class="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <p class="text-xs text-slate-400">Emergency Contact</p>
                    <p class="font-bold">{{ driverEmergencyContact || 'N/A' }}</p>
                  </div>

                  <div class="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <p class="text-xs text-slate-400">Address</p>
                    <p class="break-words font-bold">{{ driverAddress || driverCurrentAddress || 'N/A' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIDE SNAPSHOT -->
            <div class="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-xl backdrop-blur-2xl">
              <div class="h-1.5 bg-gradient-to-r from-green-400 via-[#0693E3] to-red-500"></div>

              <div class="p-5">
                <div class="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p class="text-xs font-black uppercase tracking-[0.25em] text-blue-200">
                      Ride Info
                    </p>
                    <h3 class="mt-1 text-xl font-black">Safety Snapshot</h3>
                  </div>

                  <span class="rounded-full bg-green-500/20 px-3 py-1 text-xs font-black text-green-300">
                    Protected
                  </span>
                </div>

                <div class="rounded-3xl bg-white/10 p-4">
                  <div class="flex gap-4">
                    <div class="flex flex-col items-center">
                      <span class="mt-1 h-4 w-4 rounded-full bg-green-500 shadow-sm"></span>
                      <span class="my-2 h-12 w-px bg-white/20"></span>
                      <span class="h-4 w-4 rounded-full bg-red-500 shadow-sm"></span>
                    </div>

                    <div class="flex-1 space-y-5">
                      <div>
                        <p class="text-xs text-white/40">Pickup</p>
                        <p class="break-words font-black">{{ fromLocation || 'Loading...' }}</p>
                      </div>

                      <div>
                        <p class="text-xs text-white/40">Drop</p>
                        <p class="break-words font-black">{{ toLocation || 'N/A' }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 grid grid-cols-2 gap-3">
                  <div class="rounded-2xl bg-white/10 p-3">
                    <p class="text-xs text-white/40">Booking</p>
                    <p class="font-black capitalize">{{ bookingStatus || 'N/A' }}</p>
                  </div>

                  <div class="rounded-2xl bg-white/10 p-3">
                    <p class="text-xs text-white/40">Payment</p>
                    <p class="font-black capitalize">{{ paymentStatus || 'N/A' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- RIGHT COLUMN -->
          <section class="space-y-6 lg:col-span-8">
            <!-- SOS COMMAND PANEL -->
            <div class="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">
              <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-500/20 blur-3xl"></div>
              <div class="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#0693E3]/15 blur-3xl"></div>

              <div class="relative grid gap-8 xl:grid-cols-2 xl:items-center">
                <!-- SOS TEXT -->
                <div>
                  <div class="inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-500/10 px-4 py-2 text-xs font-black text-red-200">
                    <span class="h-2 w-2 rounded-full bg-red-300 animate-pulse"></span>
                    Emergency Response
                  </div>

                  <h2 class="mt-5 text-4xl font-black leading-tight md:text-5xl">
                    One tap can alert RSL admin.
                  </h2>

                  <p class="mt-4 max-w-md text-sm leading-6 text-white/65">
                    Press SOS to send your booking ID, driver details, passenger GPS location,
                    and ride context to the RSL support team.
                  </p>

                  <div class="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
                    <div class="rounded-2xl border border-white/10 bg-white/10 p-3">
                      <p class="font-black text-green-300">GPS</p>
                      <p class="mt-1 text-white/40">Included</p>
                    </div>

                    <div class="rounded-2xl border border-white/10 bg-white/10 p-3">
                      <p class="font-black text-green-300">Driver</p>
                      <p class="mt-1 text-white/40">Attached</p>
                    </div>

                    <div class="rounded-2xl border border-white/10 bg-white/10 p-3">
                      <p class="font-black text-green-300">Admin</p>
                      <p class="mt-1 text-white/40">Alerted</p>
                    </div>
                  </div>
                </div>

                <!-- SOS BUTTON -->
                <div class="flex justify-center">
                  <div class="relative flex h-[330px] w-[330px] items-center justify-center">
                    <div class="absolute inset-0 rounded-full bg-red-500/10 animate-ping"></div>
                    <div class="absolute inset-8 rounded-full border border-red-300/20 bg-red-500/10"></div>
                    <div class="absolute inset-16 rounded-full border border-red-300/20 bg-red-500/10"></div>

                    <button
                      type="button"
                      @click="triggerSOS"
                      :disabled="sosLoader"
                      class="relative flex h-48 w-48 flex-col items-center justify-center rounded-full border-[12px] border-red-300/30 bg-gradient-to-br from-red-500 via-red-700 to-red-950 text-white shadow-2xl shadow-red-900/40 transition active:scale-95 disabled:opacity-70"
                    >
                      <span v-if="!sosLoader" class="text-6xl font-black">SOS</span>
                      <span
                        v-else
                        class="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"
                      ></span>
                      <span v-if="!sosLoader" class="mt-1 text-xs font-black uppercase tracking-[0.25em]">
                        Emergency
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- ACTION GRID -->
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                type="button"
                @click="showMisbehaviourModal = true"
                class="group overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-600 via-purple-700 to-purple-950 p-5 text-left shadow-xl transition hover:-translate-y-1"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs font-black uppercase tracking-[0.22em] text-purple-100/70">
                      Passenger Safety
                    </p>
                    <h3 class="mt-2 text-2xl font-black">Misbehaviour</h3>
                  </div>

                  <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">
                    !
                  </span>
                </div>

                <p class="mt-5 text-sm leading-6 text-purple-100/80">
                  Report rude behavior, unsafe route, harassment, suspicious activity or passenger discomfort.
                </p>

                <p class="mt-4 text-xs font-black text-purple-100">
                  Submit urgent report →
                </p>
              </button>

              <button
                type="button"
                @click="reportBreakdown"
                :disabled="breakdownLoader"
                class="group overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-500 via-orange-600 to-orange-900 p-5 text-left shadow-xl transition hover:-translate-y-1 disabled:opacity-70"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs font-black uppercase tracking-[0.22em] text-amber-100/75">
                      Vehicle Issue
                    </p>

                    <h3 class="mt-2 text-2xl font-black">
                      <span v-if="!breakdownLoader">Breakdown</span>
                      <span
                        v-else
                        class="inline-block h-7 w-7 animate-spin rounded-full border-4 border-white border-t-transparent"
                      ></span>
                    </h3>
                  </div>

                  <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">
                    ⚠
                  </span>
                </div>

                <p class="mt-5 text-sm leading-6 text-amber-100/85">
                  Send urgent vehicle breakdown alert to RSL admin support with booking context.
                </p>

                <p class="mt-4 text-xs font-black text-amber-100">
                  Alert admin →
                </p>
              </button>

              <button
                type="button"
                @click="startFakeCall"
                class="group rounded-[2rem] border border-white/10 bg-white/10 p-5 text-left shadow-xl backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/15"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs font-black uppercase tracking-[0.22em] text-white/40">
                      Safety Trick
                    </p>
                    <h3 class="mt-2 text-2xl font-black">Fake Call</h3>
                  </div>

                  <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                    ☎
                  </span>
                </div>

                <p class="mt-5 text-sm leading-6 text-white/60">
                  Simulate an incoming RSL support call to exit uncomfortable or unsafe situations.
                </p>

                <p class="mt-4 text-xs font-black text-white/70">
                  Start fake call →
                </p>
              </button>

              <a
                href="tel:+923001234567"
                class="group rounded-[2rem] border border-white/10 bg-white/10 p-5 text-left shadow-xl backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/15"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs font-black uppercase tracking-[0.22em] text-white/40">
                      RSL Support
                    </p>
                    <h3 class="mt-2 text-2xl font-black">Call Office</h3>
                  </div>

                  <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl font-black">
                    24/7
                  </span>
                </div>

                <p class="mt-5 text-sm leading-6 text-white/60">
                  Direct call to RSL office support for immediate operational assistance.
                </p>

                <p class="mt-4 text-xs font-black text-white/70">
                  Contact support →
                </p>
              </a>
            </div>

            <!-- SHARE CARD -->
            <div class="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-2xl">
              <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p class="text-xs font-black uppercase tracking-[0.25em] text-blue-200">
                    Live Tracking
                  </p>
                  <h3 class="mt-1 text-2xl font-black">Share your ride safely</h3>
                  <p class="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                    Send your live ride tracking link to family or trusted contacts.
                  </p>
                </div>

                <button
                  type="button"
                  @click="shareTrackingLink"
                  class="rounded-2xl bg-white px-6 py-4 font-black text-slate-950 shadow-lg transition hover:bg-slate-100"
                >
                  Share Link
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>

    <!-- STICKY BOTTOM ACTIONS -->
    <div class="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-slate-950/95 p-4 backdrop-blur-xl">
      <div class="mx-auto grid max-w-3xl grid-cols-2 gap-3">
        <NuxtLink
          :to="`/tracking?booking_id=${bookingId}`"
          class="rounded-2xl bg-[#0693E3] py-4 text-center font-black text-white shadow-lg shadow-[#0693E3]/20 transition hover:bg-[#057FCC]"
        >
          Track Ride
        </NuxtLink>

        <button
          type="button"
          @click="shareTrackingLink"
          class="rounded-2xl bg-white py-4 text-center font-black text-slate-950 shadow-lg transition hover:bg-slate-100"
        >
          Share Link
        </button>
      </div>
    </div>

    <!-- MISBEHAVIOUR MODAL - PERFECT CENTER -->
    <transition name="fade">
      <div
        v-if="showMisbehaviourModal"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-4 py-4 backdrop-blur-sm"
      >
        <div class="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white text-slate-950 shadow-2xl">
          <div class="h-1.5 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-950"></div>

          <div class="p-5 md:p-6">
            <button
              type="button"
              @click="closeMisbehaviourModal"
              class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-black text-slate-700 transition hover:bg-slate-200"
            >
              ✕
            </button>

            <div class="pr-12">
              <p class="text-xs font-black uppercase tracking-[0.25em] text-purple-600">
                Urgent Safety Report
              </p>

              <h3 class="mt-2 text-2xl font-black md:text-3xl">
                Report Driver Misbehaviour
              </h3>

              <p class="mt-2 text-sm leading-6 text-slate-500">
                Select a reason. Admin will receive passenger location, booking ID, and driver details.
              </p>
            </div>

            <div class="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
              <button
                v-for="reason in misbehaviourReasons"
                :key="reason"
                type="button"
                @click="selectedReason = reason"
                class="rounded-2xl border p-3 text-left text-sm font-bold transition"
                :class="selectedReason === reason ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-sm' : 'border-slate-200 text-slate-700 hover:bg-slate-50'"
              >
                {{ reason }}
              </button>
            </div>

            <textarea
              v-model="customReason"
              placeholder="Write additional details for admin..."
              class="mt-4 w-full rounded-2xl border border-slate-200 p-4 text-sm focus:border-purple-600 focus:outline-none"
              rows="3"
            ></textarea>

            <div class="mt-4 rounded-2xl bg-slate-100 p-4 text-sm">
              <p class="font-black">Driver attached to report:</p>
              <p class="mt-1 text-slate-600">
                {{ driverName || 'Driver' }} — {{ driverContact || driverPhone || 'No contact' }}
              </p>
            </div>

            <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                @click="closeMisbehaviourModal"
                class="rounded-2xl border border-slate-200 bg-white py-4 font-black text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                @click="reportMisbehaviour"
                :disabled="misbehaviourLoader || !selectedReason"
                class="flex items-center justify-center rounded-2xl bg-purple-600 py-4 font-black text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span v-if="!misbehaviourLoader">Submit Report</span>
                <span
                  v-else
                  class="inline-block h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- FAKE CALL SCREEN -->
    <transition name="fade">
      <div
        v-if="fakeCallActive"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
      >
        <div class="mb-6 flex h-28 w-28 animate-pulse items-center justify-center rounded-full bg-[#0693E3] text-4xl font-black shadow-2xl shadow-[#0693E3]/30">
          RSL
        </div>

        <p class="text-3xl font-black">Incoming Call...</p>
        <p class="mt-2 text-slate-400">RSL Safety Support</p>

        <div class="mt-16 flex gap-10">
          <button
            type="button"
            @click="fakeCallActive = false"
            class="h-20 w-20 rounded-full bg-red-600 text-3xl shadow-lg shadow-red-600/30"
          >
            ✕
          </button>

          <button
            type="button"
            @click="fakeCallActive = false"
            class="h-20 w-20 rounded-full bg-green-600 text-3xl shadow-lg shadow-green-600/30"
          >
            ✓
          </button>
        </div>
      </div>
    </transition>

    <!-- TOAST -->
    <transition name="fade">
      <div
        v-if="toast.show"
        :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-700'"
        class="fixed bottom-24 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl py-4 text-center font-bold text-white shadow-2xl"
      >
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

const route = useRoute();
const { $useCustomFetch } = useNuxtApp();

const bookingId = route.query.booking_id || null;
const customerId = route.query.customer_id || null;

const driverId = ref(route.query.driver_id || '');
const driverPhone = ref(route.query.driver_phone || '');

const driverName = ref('');
const driverContact = ref('');
const driverEmail = ref('');
const driverImage = ref('');
const driverLicense = ref('');
const driverCnic = ref('');
const driverAddress = ref('');
const driverRating = ref('');
const driverTotalRides = ref('');
const driverExperience = ref('');
const driverEmergencyContact = ref('');
const driverVerified = ref('');
const driverCurrentAddress = ref('');

const fromLocation = ref('');
const toLocation = ref('');
const bookingStatus = ref('');
const paymentStatus = ref('');

const sosLoader = ref(false);
const breakdownLoader = ref(false);
const misbehaviourLoader = ref(false);
const fakeCallActive = ref(false);
const showMisbehaviourModal = ref(false);

const selectedReason = ref('');
const customReason = ref('');

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
});

const misbehaviourReasons = [
  'Driver rude behavior',
  'Harassment or inappropriate behavior',
  'Unsafe driving',
  'Wrong route / suspicious route',
  'Passenger feels unsafe',
  'Other'
];

const trackingUrl = computed(() => {
  if (!process.client) return '';
  return `${window.location.origin}/tracking?booking_id=${bookingId}`;
});

const whatsappUrl = computed(() => {
  const phone = String(driverContact.value || driverPhone.value || '')
    .replace(/\D/g, '');

  if (!phone) {
    return 'https://wa.me/';
  }

  return `https://wa.me/${phone}`;
});

function showToast(message, type = 'success') {
  toast.message = message;
  toast.type = type;
  toast.show = true;

  setTimeout(() => {
    toast.show = false;
  }, 4000);
}

function closeMisbehaviourModal() {
  showMisbehaviourModal.value = false;
  selectedReason.value = '';
  customReason.value = '';
}

function getLocation() {
  return new Promise((resolve) => {
    if (!process.client || !navigator.geolocation) {
      resolve({ lat: null, lng: null });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => {
        resolve({ lat: null, lng: null });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

async function fetchBookingDetails() {
  if (!bookingId) return;

  try {
    const res = await $useCustomFetch(`/api/site/v1/booking/status/${bookingId}`);

    if (res.success && res.data) {
      fromLocation.value = res.data.from_location || '';
      toLocation.value = res.data.to_location || '';
      bookingStatus.value = res.data.booking_status || '';
      paymentStatus.value = res.data.payment_status || '';

      if (res.data.driver) {
        driverId.value = res.data.driver.id || driverId.value;
        driverName.value = res.data.driver.name || '';
        driverContact.value = res.data.driver.contact || driverPhone.value;
        driverPhone.value = res.data.driver.contact || driverPhone.value;
        driverEmail.value = res.data.driver.email || '';
        driverImage.value = res.data.driver.image || '';
        driverLicense.value = res.data.driver.license_no || '';
        driverCnic.value = res.data.driver.id_card_no || '';
        driverAddress.value = res.data.driver.address || '';
        driverRating.value = res.data.driver.rating || '';
        driverTotalRides.value = res.data.driver.total_rides || '';
        driverExperience.value = res.data.driver.experience_years || '';
        driverEmergencyContact.value = res.data.driver.emergency_contact || '';
        driverVerified.value = res.data.driver.verified_status || '';
        driverCurrentAddress.value = res.data.driver.current_address || '';
      }
    }
  } catch (error) {
    console.log('Safety booking fetch error:', error);
  }
}

async function triggerSOS() {
  sosLoader.value = true;
  const { lat, lng } = await getLocation();

  try {
    const res = await $useCustomFetch('/api/site/v1/safety/sos', {
      method: 'POST',
      body: {
        booking_id: bookingId,
        customer_id: customerId || bookingId,
        driver_id: driverId.value,
        driver_phone: driverPhone.value,
        latitude: lat,
        longitude: lng
      }
    });

    if (res.success) {
      showToast('SOS sent. Admin received your location and ride details.', 'success');
    } else {
      showToast('Failed to send SOS.', 'error');
    }
  } catch {
    showToast('Error. Call office directly.', 'error');
  }

  sosLoader.value = false;
}

async function reportBreakdown() {
  breakdownLoader.value = true;
  const { lat, lng } = await getLocation();

  try {
    const res = await $useCustomFetch('/api/site/v1/safety/breakdown', {
      method: 'POST',
      body: {
        booking_id: bookingId,
        customer_id: customerId || bookingId,
        driver_id: driverId.value,
        driver_phone: driverPhone.value,
        latitude: lat,
        longitude: lng
      }
    });

    if (res.success) {
      showToast('Breakdown reported to admin.', 'success');
    } else {
      showToast('Failed to report breakdown.', 'error');
    }
  } catch {
    showToast('Error. Call office directly.', 'error');
  }

  breakdownLoader.value = false;
}

async function reportMisbehaviour() {
  if (!selectedReason.value) {
    showToast('Please select a reason.', 'error');
    return;
  }

  misbehaviourLoader.value = true;
  const { lat, lng } = await getLocation();

  const finalReason = customReason.value
    ? `${selectedReason.value} — ${customReason.value}`
    : selectedReason.value;

  try {
    const res = await $useCustomFetch('/api/site/v1/safety/misbehaviour', {
      method: 'POST',
      body: {
        booking_id: bookingId,
        customer_id: customerId || bookingId,
        driver_id: driverId.value,
        driver_phone: driverPhone.value,
        latitude: lat,
        longitude: lng,
        reason: finalReason
      }
    });

    if (res.success) {
      closeMisbehaviourModal();
      showToast('Urgent safety report sent to admin.', 'success');
    } else {
      showToast(res.message || 'Failed to send report.', 'error');
    }
  } catch {
    showToast('Error. Call RSL office immediately.', 'error');
  }

  misbehaviourLoader.value = false;
}

function startFakeCall() {
  fakeCallActive.value = true;

  setTimeout(() => {
    fakeCallActive.value = false;
  }, 30000);
}

async function shareTrackingLink() {
  const text = `Track my RSL ride live: ${trackingUrl.value}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Track My RSL Ride',
        text,
        url: trackingUrl.value
      });
    } else {
      await navigator.clipboard.writeText(trackingUrl.value);
      showToast('Tracking link copied.', 'success');
    }
  } catch (error) {
    console.log('Share error:', error);
  }
}

onMounted(() => {
  fetchBookingDetails();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>