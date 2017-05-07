import firebase from './firebase';

const initializeAuth = new Promise(resolve => {
  firebase.auth().onAuthStateChanged(user => {
    authService.setUser(user)
    resolve(user)
  })
})

export const authService = {
  user: null,
  authenticated () {
    return initializeAuth.then(user => {
      return user && !user.isAnonymous
    })
  },
  setUser (user) {
    this.user = user
  },
  login (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  logout () {
    firebase.auth().signOut().then(() => {
      console.log('logout done')
    })
  }
}
