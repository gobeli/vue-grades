import template from './mark.html';
import helper from '../../services/helper';

export default {
  template,
  data: () => ({
    moduleRef: null,
    module: null,
    markForm: {
      mark: 0,
      weighting: 0
    }
  }),
  created () {
    const semesterId = this.$route.params.id;
    const moduleId = parseInt(this.$route.params.moduleId, 10);
    const user = this.$firebase.auth().currentUser;
    this.moduleRef = this.$firebase.database().ref(`${user.uid}/semesters/${semesterId}/modules/${moduleId}`);
    this.moduleRef.on('value', snapshot => {
      this.module = snapshot.val();
      this.module.marks = helper.fixArr(this.module.marks);
    });
  },
  methods: {
    submit () {
      const id = helper.newId(this.module.marks ? this.module.marks.map(s => s.id) : []);
      const mark = {
        id,
        mark: parseFloat(this.markForm.mark),
        weighting: parseInt(this.markForm.weighting, 10)
      };
      this.moduleRef.child('marks/' + mark.id).set(mark);
      this.$router.go(-1);
    },
    clearMark () {
      this.markForm = { name: '', time: '', room: '' };
    }
  }
}
