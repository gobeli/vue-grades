import template from './home.html';
import helper from '../../services/helper';

export default {
  template,
  data: () => ({
    semestersRef: {},
    semesters: []
  }),
  mounted () {
    this.$bus.$emit('popup', false);
    const user = this.$firebase.auth().currentUser;
    if (user) {
      this.semestersRef = this.$firebase.database().ref(user.uid + '/semesters');
      this.semestersRef.on('value', snapshot => {
        const semesters = snapshot.val();
        if (semesters && Array.isArray(semesters)) {
          this.semesters = semesters.filter(s => !!s);
        } else {
          const keys = Object.keys(semesters);
          if (keys && keys.length > 0) {
            this.semesters = [semesters[keys[0]]];
          }
        }
      });
    }
  },
  methods: {
    add () {
      const id = helper.newId(this.semesters.map(s => s.id))
      this.semestersRef.child('/' + id).set({ id });
    },
    remove (semester) {
      this.semestersRef.child('/' + semester.id).remove();
    }
  }
}
