export default function auth({ next, router,store }) {
    // if (!localStorage.getItem('jwt')) {
    //   return router.push({ name: 'login' });
    // }
    console.log('From auth middlware: '+store.getters['auth/authenticated'])
    // 
    let isAuthenticated = store.getters['auth/authenticated']
    if (!isAuthenticated){
        // return router.push({ name: 'Signin' });
        next({ name: 'SignIn' })
    }
    next()

    // return next();
  }