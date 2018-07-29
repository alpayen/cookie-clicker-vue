<template>
    <div class="cookie-view">
        <div class="cookie-numbers">
            <h2>{{Math.floor(cookies)}} Cookies</h2>
            <p>Earnings per seconds : {{cookiesPerSecond.toFixed(1)}}</p>
        </div>
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
        }
    }
</script>

<style scoped>
    .cookie-view {
        width: 70vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cookie-numbers{
        text-align: center;
    }

    img{
        cursor: pointer;
    }
</style>