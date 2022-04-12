import axios from 'axios'

export default {
  // ...
  namespaced: true,
  state: {
    authenticated: false,
    user: null,
    permissions:null,
  },

  getters: {
    authenticated (state) {
      return state.authenticated
    },

    user (state) {
      return state.user
    },
    permissions (state) {
      return state.permissions
    },
  },

  mutations: {
    SET_AUTHENTICATED (state, value) {
      state.authenticated = value
    },

    SET_USER (state, value) {
      state.user = value
    },
    SET_PERMISSIONS (state, value) {
      state.permissions = value
    }
  },


  actions: {
    async signIn ({ dispatch }, credentials) {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/login', credentials).then((response) => {
        console.log('From Sign in action')
        if(response.data.success){
          dispatch('permission/systemPermission', null, { root: true })
          return dispatch('me')
        }
      }).catch(() => {
      })
      // console.log()
      
    },

    async signOut ({ dispatch }) {
      await axios.post('/logout').then((response)=>{
          console.log('From signout action')
          if(response.data.success){
            console.log('Signout successfully.')
            return dispatch('me')
          }
        }).catch(()=>{
        console.log('From signout action error')
      })
    },

    me ({ commit }) {
      return axios.get('/api/user').then((response) => {
        commit('SET_AUTHENTICATED', true)
        commit('SET_USER', response.data)
      }).catch(() => {
        commit('SET_AUTHENTICATED', false)
        commit('SET_USER', null)
      })
    }
  }
}