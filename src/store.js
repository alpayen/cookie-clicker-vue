import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cookies: 0,
        storeItems: [
            {
                name: "Pointer",
                logo_posX: 0,
                logo_posY: 0,
                price: 15,
                cps: 0.1,
                owned: 0
            },
            {
                name: "Grandma",
                logo_posX: 0,
                logo_posY: -64,
                price: 100,
                cps: 1,
                owned: 0
            },
        ]
    },
    mutations: {
        increment(state) {
            state.cookies++
        },
        initialiseStore(state) {
            if (localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }
        },
        buyItem(state, index) {
            if (state.cookies >= state.storeItems[index].price) {
                state.storeItems[index].owned++;
                state.cookies -= state.storeItems[index].price;
                state.storeItems[index].price = Math.floor(state.storeItems[index].price + state.storeItems[index].price * (15 / 100));
                }
        },
        incrementBySeconds(state) {
            state.cookies += this.getters.cookiesPerSecond
        }
    },
    actions: {
        increment({commit}) {
            commit('increment')
        },
        buyItem({commit}, index) {

            commit("buyItem", index)
        },
        launchIncrementBySeconds({commit}) {
            setInterval(function () {
                commit("incrementBySeconds")
            }, 1000);
        }
    },
    getters: {
        cookies: state => {
            return state.cookies
        },
        cookiesPerSecond: state => {
            let cpsTotal = 0;
            state.storeItems.map((cookie) => {
                cpsTotal += cookie.cps * cookie.owned
            });
            return cpsTotal;
        },
        storeItems: state => {
            return state.storeItems
        },
    },
})
