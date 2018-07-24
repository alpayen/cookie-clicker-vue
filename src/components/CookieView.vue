<template>
    <div class="cookie-view">
        <div class="cookie-numbers">
            <h2>{{cookies}} Cookies</h2>
            <p>per seconds : 0</p>
        </div>
        <button @click="increment">click me</button>
    </div>
</template>

<script>
    export default {
        name: "CookieView",
        computed : {
            cookies(){
                return this.$store.state.cookies
            }
        },
        methods : {
            increment(){
                this.$store.commit('increment')
            }
        }
    }
</script>

<style scoped>
    .cookie-view {
        width: 30vw;
    }
</style>