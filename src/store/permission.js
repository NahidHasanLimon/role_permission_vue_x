import axios from 'axios'
// import auth from './auth'
export default {
  // ...
  namespaced: true,

  state: {
    system_permissions: null
  },

  getters: {
    system_permissions (state) {
      return state.system_permissions
    },
  },
  mutations: {
    SET_SYSTEM_PERMISSIONS (state, value) {
      state.system_permissions = value
    }
  },
  actions: {
    async systemPermission ({ dispatch,commit }) {
      await axios.get('/api/system-permissions').then((response) => {
        console.log('From Sign in action')
        if(response.data.success){
          console.log();
          commit('SET_SYSTEM_PERMISSIONS', response.data.data)
        }
      }).catch(() => {
      })
    },


  }
}