<template>
    <div class="cookie-view">
        <div class="cookie-numbers">
            <h2>{{counter}} Cookies</h2>
            <p>per seconds : 0</p>
        </div>
        <button @click="increment">click me</button>
    </div>
</template>

<script>
    export default {
        name: "CookieView",
        data() {
            return {
                counter: 0
            }
        },
        methods : {
            increment(){
                this.counter++
            }
        }
    }
</script>

<style scoped>
    .cookie-view {
        width: 30vw;
    }
</style>