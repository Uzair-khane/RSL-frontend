<template>
  <div>
    <HeroSection
      title="terms and conditions"
      :imagePath="'/images/terms.png'"
    />
    <div class="px-3 md:px-16 py-10">
      <p>
        Welcome to Real Smart Limousine (“we,” “our,” or “us”). By accessing or
        using our website and services, you agree to comply with the following
        Terms and Conditions. Please read them carefully before using our
        services..
      </p>
      <div
        class="mt-6"
        v-for="(data, index) in termsAndConditions"
        :key="index"
      >
        <h3 class="text-xl font-semibold">
          {{ index + 1 }}. {{ data.section }}
        </h3>
        <p class="mt-3">{{ data.description }}</p>
      </div>
      <div class="mt-6">
        <h2 class="text-blue-600 font-semibold">REAL SMART LIMOUSINE</h2>
        <ul>
          <li class="flex gap-2 mt-4 items-center">
            <iconPhone class="w-4 h-4 fill-black stroke-black" />
            <span> (+971) 4- 552-0932 </span>
          </li>
          <li class="flex gap-2 mt-4 items-center">
            <iconMobile class="w-4 h-4 fill-black stroke-black" />
            <span> (+971) 50- 187-6887 </span>
          </li>
          <li class="flex gap-2 mt-4 items-center">
            <iconMail class="w-4 h-4 fill-black stroke-white" />
            <span> info@realsmartlimousine.com </span>
          </li>
        </ul>
        <p class="mt-10">
          By using our Site and services, you acknowledge that you have read,
          understood, and agreed to these Terms and Conditions.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
const termsAndConditions = [
  {
    section: "Use of Services",
    description:
      "Our services are intended for lawful purposes only. By using our Site and booking our services, you agree not to engage in any activity that violates applicable laws or regulations or harms our reputation.",
  },
  {
    section: "Booking and Payments",
    description:
      "All bookings must be made through the designated channels on our Site. Payments are required as per the terms outlined during the booking process. Failure to provide accurate payment information may result in cancellation of your reservation.",
  },
  {
    section: "Cancellations and Refunds",
    description:
      "Cancellations must be made in accordance with our cancellation policy. Refunds will be processed as outlined in the booking confirmation. Late cancellations or no-shows may be subject to additional charges.",
  },
  {
    section: "User Responsibilities",
    description:
      "You are responsible for providing accurate and complete information during the booking process. Failure to do so may result in delays, cancellations, or additional fees.",
  },
  {
    section: "Limitation of Liability",
    description:
      "We strive to ensure a safe and reliable service; however, we are not liable for delays, damages, or losses caused by factors beyond our control, including but not limited to traffic, weather, or third-party actions.",
  },
  {
    section: "Intellectual Property",
    description:
      "All content on our Site, including text, images, and logos, is the property of Real Smart Limousine. Unauthorized use, reproduction, or distribution of this content is strictly prohibited.",
  },
  {
    section: "Privacy Policy",
    description:
      "Your use of the Site is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. Please visit Privacy Policy.",
  },
  {
    section: "Changes to Terms",
    description:
      "We reserve the right to update these Terms and Conditions at any time without prior notice. Continued use of our Site and services signifies your acceptance of the updated terms.",
  },
  {
    section: "Governing Law",
    description:
      "These Terms and Conditions are governed by the laws of United Arab Emirates. Any disputes arising from the use of our services will be subject to the exclusive jurisdiction of the courts in that jurisdiction.",
  },
  {
    section: "Contact Us",
    description:
      "If you have any questions or concerns about this Privacy Policy or our data practices, please get in touch with us.",
  },
];
</script>
