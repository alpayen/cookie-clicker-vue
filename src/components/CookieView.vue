<template>
    <div class="cookie-view">
        <div class="cookie-numbers">
            <h2>{{cookies.toFixed(0)}} Cookies</h2>
            <p>per seconds : {{cookiesPerSecond.toFixed(1)}}</p>
        </div>
        <img @click="increment" src="../assets/PerfectCookie.png"/>
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
    img{
        cursor: pointer;
    }
</style>