<template>
    <img
            class="fadeOut"
            :style="{'top' : y+'px', 'left' : x+'px' }"
            @click="dispatchGCActions"
            src="./../assets/GoldCookie.png"/>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "GoldenCookie",
        props: {
            cookie_type: String
        },
        computed: {
            y() {

                return Math.floor(Math.random() * window.innerHeight) + 68;
            },

            x() {
                return Math.floor(Math.random() * window.innerWidth)- 68;
            }
        },
        mounted() {
            let $this = this;
            setTimeout(function () {
                $this.$store.dispatch("removeGoldenCookie", $this.cookie_type);
            }, 13500)
        },
        methods: {
            dispatchGCActions() {
                this.$store.dispatch("doGoldenCookieAction", this.cookie_type);
                this.$store.dispatch("removeGoldenCookie", this.cookie_type);
            },
        }

    }
</script>

<style scoped>
    img {
        position: fixed;
        width: 96px;
        height: auto;
        opacity: 1;
        -webkit-animation-duration: 13s;
        animation-duration: 13s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;

        z-index: 1000;
        cursor: pointer;
    }

    @-webkit-keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .fadeOut {
        -webkit-animation-name: fadeOut;
        animation-name: fadeOut;
    }
</style>