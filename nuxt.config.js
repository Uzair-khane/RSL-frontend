// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCc0FXkMRujB1PIFO39Z1Bg-Xu1AHGSlwE&libraries=places",
          async: true,
          defer: true,
        },
      ],
      title: "RSL",
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  server: {
    port: process.env.PORT
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      gmapKey: process.env.GMAP_ACCESS_TOKEN,
      socketUrl: process.env.BASE_URL  
    },
  },
  modules: ["nuxt-aos", 'nuxt-swiper'],
  mapbox: {
    accessToken: process.env.MAPBOX_ACCESS_TOKEN
  }
})