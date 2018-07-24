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
                image_url : "url.com",
                owned : 0
            },
            {
                name : "Grandma",
                image_url : "url.com",
                owned : 0
            },
        ]
    },
    mutations: {
        increment() {
            this.state.cookies++
        },
        initialiseStore(state) {
            if(localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }
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
        }
    },
})
