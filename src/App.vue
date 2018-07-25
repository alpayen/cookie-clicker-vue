<template>
    <div id="app">
        <div class="cookie-view">
            <CookieView/>
        </div>
        <div class="items-store">
            <StoreItem v-for="(item, key) in storeItems" :key="key" :item="item"></StoreItem>
        </div>
    </div>
</template>

<script>
    import CookieView from './components/CookieView'
    import StoreItem from './components/StoreItem'
    import { mapGetters } from 'vuex'

    export default {
        name: 'app',
        components: {
            CookieView,
            StoreItem
        },
        computed: {

            ...mapGetters([
                'storeItems'
            ])
        },
    }
</script>

<style lang="scss">
   body{
       margin: 0;
   }
    #app{
        height: 100vh;
        width: 100vw;

        display: flex;
        justify-content: space-between;
    }

    .cookie-view{
        width: 30vw;
        height: 100%;
        background: lavender;
    }
    .items-store{
        width: 30vw;
        height: 100%;
        background: lightcyan;
    }
</style>
