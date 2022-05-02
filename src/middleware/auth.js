export default function auth({ next, router,store }) {
    console.log('From auth middlware: '+store.getters['auth/authenticated'])
    // 
    let isAuthenticated = store.getters['auth/authenticated']
    if (!isAuthenticated){
        next({ name: 'SignIn' })
    }
    next()
  }