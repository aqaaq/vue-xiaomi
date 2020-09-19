import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        token: ''
    },
    mutations: {
        assignment(state, str) {
            state.token = str;
        }
    },
    actions: {

    },
    getters: {

    },
    module: {

    }
})
export default store;