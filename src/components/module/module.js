import template from './module.html';
import helper from '../../services/helper';

export default {
  template,
  data: () => ({
    semesterRef: null,
    semester: null,
    initialModuleForm: {
      id: 0,
      name: '',
      time: '',
      room: ''
    },
    moduleForm: {}
  }),
  created () {
    this.$bus.$emit('popup', true);
    const semesterId = this.$route.params.id;
    const moduleId = parseInt(this.$route.params.moduleId, 10);
    const user = this.$firebase.auth().currentUser;
    this.semesterRef = this.$firebase.database().ref(`${user.uid}/semesters/${semesterId}`);
    this.semesterRef.on('value', snapshot => {
      this.semester = snapshot.val();
      this.moduleForm = this.semester.modules.find(m => m && m.id === moduleId) || this.initialModuleForm;
    });
  },
  methods: {
    submit () {
      const id = helper.newId(this.semester.modules ? this.semester.modules.map(s => s.id) : []);
      const module = this.moduleForm.id ? this.moduleForm : Object.assign({}, this.moduleForm, {id});
      this.semesterRef.child('modules/' + module.id).set(module);
      this.$router.go(-1);
    },
    clearModule () {
      this.moduleForm = { name: '', time: '', room: '' };
    }
  }
}
