<template>
    <div class="cookie-view">
        <div class="cookie-numbers">
            <h2>{{cookies}} Cookies</h2>
            <p>per seconds : {{cookiesPerSecond}}</p>
        </div>
        <button @click="increment">click me</button>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "CookieView",
        computed: {

            ...mapGetters([
                'cookies',
                'cookiesPerSecond'
            ])
        },
        methods : {

            ...mapActions([
                "increment"
            ])
        }
    }
</script>

<style scoped>
    .cookie-view {
        width: 30vw;
    }
</style>