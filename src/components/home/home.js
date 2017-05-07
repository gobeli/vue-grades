import template from './home.html';
import { operations } from '../../services/firebase';
import './home.css';

export default {
  template,
  data: () => ({
    semestersRef: {},
    semesters: []
  }),
  mounted () {
    const user = this.$firebase.auth().currentUser;
    if (user) {
      this.semestersRef = this.$firebase.database().ref(user.uid + '/semesters');
      this.semestersRef.on('value', snapshot => {
        const semesters = snapshot.val();
        if (semesters) {
          this.semesters = semesters.filter(s => !!s);
        }
      });
    }
  },
  methods: {
    add () {
      const max = Math.max(...this.semesters.map(s => s.id));
      const id = !isFinite(max) || isNaN(max) ? 1 : max + 1;
      operations.set(this.$firebase, userId => `${userId}/semesters/${id}`, { id })
    }
  }
}
