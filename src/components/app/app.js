import {authService} from '../../services/user';
import template from './app.html';

export default {
  template,
  name: 'app',
  data: () => ({
    errors: [],
    user: null
  }),
  mounted () {
    this.$bus.$on('error', e => this.errors.push(e));
    this.$firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    remove (index) {
      console.log(index);
      this.errors.splice(index, 1);
    },
    logout () {
      authService.logout();
      this.$router.push('/login');
    }
  }
}
