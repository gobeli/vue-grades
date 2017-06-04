import {authService} from '../../services/user';
import template from './app.html';

export default {
  template,
  name: 'app',
  data: () => ({
    error: {},
    user: null
  }),
  mounted () {
    this.$bus.$on('error', e => {
      this.error = e;
      this.$refs.snackbar.open();
    });
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
      this.errors.splice(index, 1);
    },
    logout () {
      authService.logout();
      this.$router.push('/login');
    }
  }
}
