<template>
    <div class="upgrade-logo" :style="{ 'background-position' : upgradeIconPos }"
         :class="{'disabled' : isTooExpensive}"
        @click="buyUpgrade(upgrade.indexes)"
    ></div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "StoreUpgrade",
        props: {
            upgrade: Object
        },
        computed: {
            isTooExpensive() {
                return this.upgrade.price > this.cookies
            },
            upgradeIconPos() {
                return `${this.upgrade.icon_pos.x}px ${this.upgrade.icon_pos.y}px`
            },
            ...mapGetters([
                "cookies",
                "availableUpgrades"
            ])
        },
        methods : {
            ...mapActions([
                "buyUpgrade"
            ])
        }
    }
</script>

<style scoped>
    .upgrade-logo {
        width: 48px;
        height: 48px;
        background: url("../assets/icons.png") no-repeat;
        border: solid 1px lightsalmon;
        margin-left: 5px;
        cursor: pointer;
    }

    .upgrade-logo.disabled,
    .upgrade-logo.disabled:hover {
        cursor: not-allowed;
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/icons.png") no-repeat;
    }

    .upgrade-logo:hover {
        background: lightcoral url("../assets/icons.png") no-repeat;
    }
</style>