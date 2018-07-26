<template>
    <div id="app">
        <div class="main">
            <CookieView/>
            <div class="items-store">
                <div class="upgrade-container">
                    <StoreUpgrade v-for="(upgrade, key) in availableUpgrades" :key="key" :upgrade="upgrade" :index="key"></StoreUpgrade>
                </div>
                <StoreItem v-for="(item, key) in storeItems" :key="key" :item="item" :index="key"></StoreItem>
            </div>
        </div>
        <div class="banner">
            <CookieBanner/>
        </div>
        <GoldenCookie v-for="cookie in currentGoldenCookies" :cookie_type="cookie"></GoldenCookie>
    </div>
</template>

<script>
    import CookieView from './components/CookieView'
    import StoreItem from './components/StoreItem'
    import CookieBanner from './components/CookieBanner'
    import StoreUpgrade from './components/StoreUpgrade'
    import GoldenCookie from './components/GoldenCookie'
    import {mapGetters} from 'vuex'

    export default {
        name: 'app',
        components: {
            CookieView,
            StoreItem,
            CookieBanner,
            StoreUpgrade,
            GoldenCookie
        },
        computed: {

            ...mapGetters([
                'storeItems',
                'availableUpgrades',
                'currentGoldenCookies'
            ])
        },
        beforeCreate() {
            this.$store.dispatch("launchIncrementBySeconds");
            this.$store.dispatch("launchGoldenInterval");
        },
        methods: {},

    }
</script>

<style lang="scss">
    body {
        margin: 0;
    }

    .main {
        height: 85vh;
        width: 100vw;

        display: flex;
        justify-content: space-between;
    }

    .cookie-view {
        width: 30vw;
        height: 100%;
        background: lavender;
    }

    .items-store {
        width: 30vw;
        height: 100%;
        background: lightcyan;
    }
    .upgrade-container{
        display: flex;
        align-items: center;
        height: 10vh;
        border-bottom: gray solid 1px ;
    }
</style>
