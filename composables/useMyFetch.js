export const useMyFetch = (request, opts) => {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const options = {};
    if (token.value) {
        options.token = token;
    }


    return useFetch(request, {
        baseURL: config.public.baseUrl,
        headers: options,
        ...opts,
    });
};
