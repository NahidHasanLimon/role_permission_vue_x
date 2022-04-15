import axios from 'axios'
// import auth from './auth'
export default {
  // ...
  namespaced: true,

  state: {
    system_permissions: [],
    user_permissions: []
  },

  getters: {
    system_permissions (state) {
      return state.system_permissions
    },
    user_permissions (state) {
      return state.user_permissions
    },
  },
  mutations: {
    SET_SYSTEM_PERMISSIONS (state, value) {
      state.system_permissions = value
    },
    SET_USER_PERMISSIONS (state, value) {
      state.user_permissions = value
    }
  },
  actions: {
     systemPermission ({ dispatch,commit },data) {
      console.log('From permission js : '+data)
      commit('SET_SYSTEM_PERMISSIONS', data)
      },
     userPermission ({ dispatch,commit },data) {
        console.log('From permission js : '+data)
        commit('SET_USER_PERMISSIONS', data)
        },
      async setUserPermission ({ dispatch,commit }, formData) {
        await axios.post('/api/user/set-permission', formData).then((response) => {
          if(response.data.success){
            console.log('From setUserPermission action'+ response.data.user.permissions)
            commit('SET_USER_PERMISSIONS', response.data.user.permissions)
            
          }
        }).catch(() => {
        })
        // console.log()
        
      },

  }
}