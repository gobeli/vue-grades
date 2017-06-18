import template from './semester.html';
import helper from '../../services/helper';

export default {
  template,
  data: () => ({
    semester: {},
    semesterRef: {},
    deletingModule: {}
  }),
  created () {
    this.$bus.$emit('popup', false);
    const id = this.$route.params.id;
    const user = this.$firebase.auth().currentUser;
    if (id && user) {
      this.semesterRef = this.$firebase.database().ref(`${user.uid}/semesters/${id}`);
      this.semesterRef.on('value', snapshot => {
        const semester = snapshot.val();
        this.semester = semester;
        this.semester.modules = helper.fixArr(this.semester.modules);
        this.semester.modules.forEach(module => {
          module.marks = helper.fixArr(module.marks);
        });
        if (this.selectedModule) {
          const selected = this.semester.modules
            ? this.semester.modules.find(m => this.selectedModule.id === m.id)
            : null;
          this.selectModule(selected);
        }
      });
    }
  },
  methods: {
    getAvg (marks) {
      if (marks && marks.length) {
        const fixed = helper.fixArr(marks);
        const sum = fixed.map(m => m.mark * m.weighting).reduce((a, b) => a + b);
        const count = fixed.map(m => m.weighting).reduce((a, b) => a + b);
        const average = sum / count;
        return Math.round(average * 100) / 100;
      }
      return 'No grades available'
    },
    tryDelete (module) {
      this.deletingModule = module;
      this.$refs['deleteDialog'].open();
    },
    deleteModule () {
      this.semesterRef.child('modules/' + this.deletingModule.id).remove();
    },
    deleteMark (module, mark) {
      this.semesterRef.child(`modules/${module.id}/marks/${mark.id}`).remove();
    },
    clearMark () {
      this.mark = {mark: '', weighting: ''}
    }
  }
}
