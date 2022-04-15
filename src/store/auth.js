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
         
          return dispatch('me')
        }
      }).catch(() => {
      })
      // console.log()
      
    },

    async signOut ({ dispatch,commit }) {
      await axios.post('/logout').then((response)=>{
          console.log('From signout action')
          if(response.data.success){
            console.log('Signout successfully.')
            // return dispatch('me')
            commit('SET_AUTHENTICATED', false)
            commit('SET_USER', null)
            
            commit('permission/SET_SYSTEM_PERMISSIONS',null, { root: true })
          }
        }).catch(()=>{
        console.log('From signout action error')
      })
    },

    me ({ dispatch,commit }) {
      return axios.get('/api/user').then((response) => {
        console.log(response.data);
        dispatch('permission/systemPermission', response.data.modules, { root: true })

        console.log('user permissions are: '+response.data.user['permissions']);
        dispatch('permission/userPermission', response.data.user['permissions'], { root: true })
        
        commit('SET_AUTHENTICATED', true)
        commit('SET_USER', response.data.user)
      }).catch(() => {

        commit('SET_AUTHENTICATED', false)
        commit('SET_USER', null)
      })
    }
  }
}