import {authService} from '../../services/user';
import template from './app.html';

export default {
  template,
  name: 'app',
  data: () => ({
    error: {},
    user: null,
    popup: false,
    transitionName: ''
  }),
  mounted () {
    this.$bus.$on('popup', e => {
      this.popup = e;
    });
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
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
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
