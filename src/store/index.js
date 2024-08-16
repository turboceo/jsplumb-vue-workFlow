import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        pageOptions: {
            companyCodeOptiopns: [],
            flowschemeTypeOptions: [],
            liuchengtiaojianleixingOptions: [],
            userOptions: [],
            roleOptions: [],
        }
    },
    mutations: {
        updatePageOptions(state, payload) {
            state.pageOptions = payload
        }
    }
})

export default store