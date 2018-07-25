import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cookies: 0,
        cookiesPerSecond : 0,
        storeItems : [
            {
                name : "Pointer",
                logo_posX : 0,
                logo_posY : 0,
                price : 15,
                cps : 0.1,
                owned : 0
            },
            {
                name : "Grandma",
                logo_posX : 0,
                logo_posY : -64,
                price : 100,
                cps : 1,
                owned : 0
            },
        ]
    },
    mutations: {
        increment() {
            this.state.cookies++
        },
        initialiseStore(state) {

            /*if(localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }*/
        }
    },
    actions: {
        increment ({ commit }) {
            commit('increment')
        },

    },
    getters : {
        cookies: state => {
            return state.cookies
        },
        cookiesPerSecond : state => {
            return state.cookiesPerSecond
        },
        storeItems : state => {
            return state.storeItems
        }
    },
})
