<template>
  <div>
    <HeroSection title="Terms and Conditions" :imagePath="'/images/terms.png'" />
    <div class="px-3 md:px-16 py-10">
      <p class="text-gray-700 leading-relaxed">
        Welcome to Real Smart Limousine (RSL). By accessing or using our platform,
        you agree to comply with the following Terms and Conditions. These terms
        govern your relationship with RSL regarding ride bookings, payments, and safety.
      </p>

      <div class="mt-8" v-for="(data, index) in termsAndConditions" :key="index">
        <h3 class="text-xl font-semibold text-gray-900">
          {{ index + 1 }}. {{ data.section }}
        </h3>
        <p class="mt-3 text-gray-600 leading-relaxed">{{ data.description }}</p>
      </div>

      <div class="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
        <h2 class="text-blue-600 font-bold text-lg uppercase tracking-wider">Real Smart Limousine</h2>
        <ul class="mt-4 space-y-3">
          <li class="flex gap-3 items-center">
            <iconPhone class="w-5 h-5 fill-black" />
            <span class="text-gray-700"> (+92) 91-XXXXXXX </span>
          </li>
          <li class="flex gap-3 items-center">
            <iconMobile class="w-5 h-5 fill-black" />
            <span class="text-gray-700"> 0314-9535884 </span>
          </li>
          <li class="flex gap-3 items-center">
            <iconMail class="w-5 h-5 fill-black" />
            <span class="text-gray-700"> info@realsmartlimousine.com </span>
          </li>
          <li class="flex gap-3 items-start">
            <iconLocation class="w-5 h-5 fill-black mt-1" />
            <span class="text-gray-700"> Office 604, City Tower, Main University Road, Peshawar, Pakistan </span>
          </li>
        </ul>
        <p class="mt-10 text-sm text-gray-500 italic">
          By using our site and services, you acknowledge that you have read,
          understood, and agreed to these Terms and Conditions. Last updated: April 2026.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const termsAndConditions = [
  {
    section: "Service Eligibility",
    description:
      "RSL provides a luxury transport platform. Users must provide valid identification for registration. Drivers must undergo a full background check, including CNIC and license verification, before being authorized to provide services.",
  },
  {
    section: "Booking and Fixed Pricing",
    description:
      "All bookings are subject to availability. RSL provides a 'Fixed Fare Estimation' before confirmation. Once a ride is booked, the fare remains fixed unless the destination is changed or additional stops are added during the journey.",
  },
  {
    section: "Payment Terms",
    description:
      "Payments are processed securely via Stripe or PayPal. By booking, you authorize RSL to charge the estimated amount. Invoices are generated automatically and can be downloaded as PDFs within the application.",
  },
  {
    section: "Cancellation and Refund Policy",
    description:
      "Cancellations made within the free window incur no charges. Late cancellations will be subject to a penalty fee as defined in the app. If a vehicle breakdown occurs, a backup driver is dispatched, and a partial refund is automatically processed.",
  },
  {
    section: "Safety and Conduct",
    description:
      "Safety is our top priority. Users have access to SOS buttons and fake call features. RSL reserves the right to suspend any account involved in misconduct, harassment, or illegal activities during a ride.",
  },
  {
    section: "Route Optimization",
    description:
      "Our AI-powered system optimizes routes for efficiency. While we strive for accuracy in ETAs, RSL is not liable for delays caused by extreme traffic, weather, or road closures beyond our control.",
  },
  {
    section: "Intellectual Property",
    description:
      "The 'RSL' brand, logo, and the 'Zilber' backend architecture are the exclusive property of Real Smart Limousine. Unauthorized use or reproduction of our software or content is strictly prohibited.",
  },
  {
    section: "Data Privacy",
    description:
      "Your use of RSL is also governed by our Privacy Policy. We collect real-time location data only to facilitate tracking and emergency response features.",
  },
  {
    section: "Governing Law",
    description:
      "These Terms and Conditions are governed by the laws of Pakistan. Any disputes arising from the use of our services will be subject to the jurisdiction of the courts in Peshawar.",
  },
  {
    section: "Modifications",
    description:
      "RSL reserves the right to update these terms at any time. Continued use of the platform after changes are posted signifies your acceptance of the revised Terms and Conditions.",
  },
];
</script>