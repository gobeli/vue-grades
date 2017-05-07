import template from './login.html';
import firebase from 'firebase';

export default {
  template,
  data: () => ({
    email: '',
    password: ''
  }),
  mounted () {
    this.$firebase.auth().getRedirectResult()
      .catch(error => this.$bus.$emit('error', error));
    this.$firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.push('/home');
      }
    });
  },
  methods: {
    googleSignIn () {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      this.$firebase.auth().signInWithRedirect(provider);
    }
  }
};
