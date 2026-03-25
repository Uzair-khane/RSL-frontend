import { ref } from "vue"
let result = ref([])
const loader = ref(false)
export default async function useCars() {
    if (result.value.length) {
        return result.value
    }
    loader.value = true
    const { $useCustomFetch } = useNuxtApp()
    const res = await $useCustomFetch("api/site/v1/general/cars")
    const { data } = res
    result.value = data
    return result.value
}