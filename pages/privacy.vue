<template>
  <div>
    <HeroSection
      title="Privacy policy"
      :imagePath="'/images/privacy-policy.png'"
    />
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
    title: "Introduction",
    content: "Real Smart Limousine, We operate Real Smart limousine mobile application. This privacy policy informs you of our policies regarding the collection, use, and disclosure of personal information we receive from users of the app."
  },
  {
    title: "Information Collection and Use",
    content: "When you use our app, we collect certain personally identifiable information that can be used to contact or identify you. The information we collect includes:",
    list: [
    "Driver Name: Collected to identify the driver.",
    "Email: Used for communication purposes.",
    "Mobile Number: Used for communication and verification purposes.",
    "Car Number: Used to identify the vehicle.",
    "Brand: Used to specify the make of the vehicle."
  ]
  },
  {
    title: "Account Deletion",
    content: "Drivers have the option to delete their accounts at any time. If you choose to delete your account, all your personal information will be permanently removed from our systems."
  },
  {
    title: "Registration and Ride Details",
    content: "Drivers can register in the app by signing up themselves or being registered by the company admin. Once registered, drivers can log in to the app and manually upload ride details. Drivers can also download a generated PDF of a single ride for their records."
  },
  {
    title: "Security Precautions",
    content: "Your information are protected and RSL staff will never proactively reach out to you and ask for any personal account information. RSL makes every effort to ensure that your Personal Data is secure on its system. RSL has staff dedicated to maintaining our privacy policy as set forth herein and other privacy initiatives, periodically reviewing Web security and making sure that every RSL employee is aware of our security practices. Unfortunately, no data transmission over the Internet can be guaranteed to be 100% secure. As a result, RSL cannot guarantee the security of any Personal Data you transmit to us, and you do so at your own risk. If You have any further questions on this issue, refer to our customer terms of use. To the extent permitted by applicable law, RSL expressly disclaims any liability that may arise should any other individuals obtain the Personal Data you submit to RSL. RSL has security measures in place to protect your Personal Data. We use industry-standard secure socket layer (SSL) encryption technology to safeguard the account registration process and sign-up information. Information provided to RSL is also housed in a secure data center and, where applicable, information is encrypted. However, you understand and agree that 'perfect' security does not exist anywhere, including on the Internet."
  },
  {
    title: "Sharing of Personal Data",
    content: "We may share Personal Data which we collect about you as described in this privacy policy or as described at the time of collection or sharing, including as follows: Through Our Services, We may share your Personal Data: With Service Providers, With Drivers, Other Important Sharing, and Legal requirements."
  },
  {
    title: "Changes to Our Privacy Policy",
    content: "RSL may make changes to this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy, and in some cases; we may provide you with more prominent notice (such as adding a statement to our homepage or sending you an email notification). We encourage you to review the privacy policy whenever you access the Services or otherwise interact with us to stay informed about our information practices and the ways you can help protect your privacy."
  },
  {
    title: "Cookies",
    content: "Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our website and the Services we provide. By accessing and browsing our website, you are agreeing to our use of cookies."
  },
  {
    title: "Contact Us",
    content: "If you have any questions, comments and requests related to this Privacy Statement, or if you have any complaints related to how RSL processes your personal data, please contact us at info@realsmartlimousine.com."
  },
];

</script>
