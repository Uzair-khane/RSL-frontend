export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const useCustomFetch = $fetch.create({
    baseURL: config.public.baseUrl,
    async onRequest({ options }) {
      const token = useCookie("token");
      if (token.value) {
        options.headers = {
          ...options.headers,
          token: token.value,
        };
      }
    },
  });
  return {
    provide: {
      useCustomFetch: useCustomFetch,
    },
  };
});
