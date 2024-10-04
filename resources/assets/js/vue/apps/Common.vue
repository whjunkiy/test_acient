<template>
    <form class="rbs__test-form"
          :class="{loading}"
          @submit.prevent="submit">
        <input type="text"
               v-model="text"
               class="rbs__test-input">
        <button class="rbs__test-btn">Send</button>
    </form>
</template>

<script>

import {ref} from "vue";
import {useStore} from "vuex";

export default {
    setup() {
        const text = ref()
        const loading = ref(false)
        const {dispatch} = useStore()
        const submit = async () => {
            if (text.value) {
                loading.value = true
                try {
                    await dispatch('commonSubmit', text.value)
                } catch (e) {
                    alert(e.message)
                } finally {
                    reset()
                    loading.value = false
                }
            }
        }
        const reset = () => text.value = null

        return {
            loading,
            text,
            submit,
        }
    }
}
</script>

