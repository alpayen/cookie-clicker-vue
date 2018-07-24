<template>
    <div id="app">
        <CookieView/>
    </div>
</template>

<script>
    import CookieView from './components/CookieView.vue'

    export default {
        name: 'app',
        components: {
            CookieView
        }
    }
</script>

<style lang="scss">
    #app {
        display: flex;

    }
</style>
