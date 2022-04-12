// import Vue from 'vue'
import { createApp } from "vue";
import Vuex from 'vuex'
import auth from './auth'
import permission from './permission'

// Vue.use(Vuex)
const app = createApp();
app.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    permission
  }
})