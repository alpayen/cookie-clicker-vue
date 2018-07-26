<template>
    <div class="item-single" :class="{ 'disabled' : isTooExpensive }" @click="buyItem(index)">
        <div class="item-logo" :style="{ 'background-position' : itemImagePos }"></div>
        <div class="item-info">
            <h5>{{item.name}}</h5>
            <p>{{item.price}}</p>
        </div>
        <p>{{item.owned}}</p>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "StoreItem",
        props: {
            item: Object,
            index : Number
        },
        computed: {
            isTooExpensive() {
                return this.item.price > this.cookies
            },
            itemImagePos(){
                if(this.isTooExpensive){
                    return `${this.item.logo_pos.x-64}px ${this.item.logo_pos.y}px`
                }
                return `${this.item.logo_pos.x}px ${this.item.logo_pos.y}px`
            },
            ...mapGetters([
                'cookies'
            ])
        },
        methods: {

            ...mapActions([
                "buyItem"
            ])
        }
    }
</script>

<style scoped>
    .item-single {
        height: 100px;
        border-bottom: solid 1px black;

        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
    }

    .item-single.disabled{
        background: lightgray;
        color: gray;
        cursor: not-allowed;
    }

    .item-single:hover {
        background: lightcoral;
    }
    
    .item-single.disabled:hover {
        background: darkgrey;
    }

    .item-logo{
        width: 64px;
        height: 64px;
        background: url("../assets/buildings.png") no-repeat;

    }

</style>