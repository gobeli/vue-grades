import template from './module.html';
import helper from '../../services/helper';

export default {
  template,
  data: () => ({
    semesterRef: null,
    semester: null,
    moduleForm: {
      id: 0,
      name: '',
      time: '',
      room: ''
    }
  }),
  mounted () {
    const semesterId = this.$route.params.id;
    const moduleId = parseInt(this.$route.params.moduleId, 10);
    const user = this.$firebase.auth().currentUser;
    this.semesterRef = this.$firebase.database().ref(`${user.uid}/semesters/${semesterId}`);
    this.semesterRef.on('value', snapshot => {
      this.semester = snapshot.val();
      this.moduleForm = this.semester.modules.find(m => m && m.id === moduleId) || {};
      console.log(this.moduleForm);
    });
  },
  methods: {
    submit () {
      const id = helper.newId(this.semester.modules ? this.semester.modules.map(s => s.id) : []);
      const module = this.moduleForm.id ? this.moduleForm : Object.assign({}, this.moduleForm, {id});
      this.semesterRef.child('modules/' + module.id).set(module);
    },
    clearModule () {
      this.moduleForm = { name: '', time: '', room: '' };
    }
  }
}
