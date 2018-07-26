<template>
    <div class="cookie-banner">
        <div class="text-block">
            <h4>This website uses cookies</h4>
            <p>We use cookies to ensure that we give you the best experience on our website. Welcome to the cookie clicking life!</p>
        </div>
        <button @click="increment">
            <img  src="../assets/PerfectCookie.png"/>
            I agree
        </button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "CookieBanner",
        methods : {
            ...mapActions([
                "increment"
            ])
        }
    }
</script>

<style scoped>
    .cookie-banner {
        width: 100%;
        height: 15vh;
        display: flex;
        justify-content: space-around;
        align-items: center;

        background-color: lightgreen;
    }
    img{
        cursor: pointer;
    }

    button {
        display: inline-block;
        padding: 15px 25px;
        font-size: 24px;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        outline: none;
        color: #fff;
        background-color: #4CAF50;
        border: none;
        border-radius: 15px;
        box-shadow: 0 9px #999;
    }

    button:hover {background-color: #3e8e41}

    button:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
    }

    button img{
        width: 30px;
        height: auto;
    }
</style>