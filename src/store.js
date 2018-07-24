import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cookies: 0
    },
    mutations: {
        increment() {
            this.state.cookies++
        }
    },
    actions: {}
})
