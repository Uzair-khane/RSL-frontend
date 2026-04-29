<template>
  <div>
    <HeroSection title="Privacy policy" :imagePath="'/images/privacy-policy.png'" />
    <div class="md:px-16 px-3 mt-5">
      <div v-for="(section, index) in privacyPolicy" :key="index" class="my-6">
        <h2 class="text-xl font-semibold">{{ section.title }}</h2>
        <p class="mt-2">{{ section.content }}</p>
        <ul v-if="section.list" class="list-disc mt-2 ml-5">
          <li v-for="(item, index) in section.list" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>


const privacyPolicy = [
  {
    title: "1. Introduction",
    content: "Real Smart Limousine (RSL) operates a premium ride-booking and fleet management platform. This Privacy Policy outlines our commitment to protecting the personal data of our customers, drivers, and partners. By using our Services, you agree to the collection and use of information in accordance with this policy."
  },
  {
    title: "2. Information Collection and Use",
    content: "To provide a seamless luxury experience, we collect personally identifiable information, including but not limited to:",
    list: [
      "Personal Identity: Name, Email, Mobile Number, and CNIC (for driver verification).",
      "Vehicle Data: Car Number, Brand, Model, and registration documents for fleet management.",
      "Real-Time Location: We collect precise location data via GPS and WebSockets to enable live tracking and SOS features.",
      "Payment Information: Secure transaction tokens processed via Stripe/PayPal (we do not store full card details)."
    ]
  },
  {
    title: "3. Real-Time Tracking & Safety",
    content: "For passenger and driver safety, RSL monitors live routes. In the event of an SOS activation or route deviation, location data is shared with our emergency response team and designated contacts. Offline location broadcasting via SMS is used when internet connectivity is lost."
  },
  {
    title: "4. Account Management & Deletion",
    content: "Users and Drivers have the right to manage or delete their accounts. Upon account deletion, all personal identifiers are permanently removed from our MySQL database, except where legal or financial records (e.g., invoices) are required to be maintained by law."
  },
  {
    title: "5. Information Sharing",
    content: "We do not sell your data. Information is shared only with:",
    list: [
      "Service Providers: Google Maps API (for navigation) and Twilio/Firebase (for notifications).",
      "Drivers/Passengers: Limited contact details and real-time location to facilitate the ride.",
      "Legal Authorities: When required for safety investigations or compliance with Pakistan's telecommunication laws."
    ]
  },
  {
    title: "6. Data Security",
    content: "We implement industry-standard security measures, including SSL/TLS encryption for data in transit and Bcrypt hashing for password protection. Our platform utilizes Role-Based Access Control (RBAC) to ensure only authorized personnel access sensitive fleet and user logs."
  },
  {
    title: "7. Cookies & Tracking Technologies",
    content: "RSL uses cookies and Redis-based session management to improve user experience, maintain login states, and analyze platform performance. By using our website, you consent to our use of these technologies."
  },
  {
    title: "8. Contact Us",
    content: "For any privacy-related inquiries, complaints, or data access requests, please reach out to our team:",
    list: [
      "Email: info@realsmartlimousine.com",
      "Office: Office 604, City Tower, Main University Road, Peshawar, Pakistan"
    ]
  }
];

</script>
