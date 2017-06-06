import template from './semester.html';
import helper from '../../services/helper';

export default {
  template,
  data: () => ({
    semester: {},
    semesterRef: {},
    markForm: {
      mark: '',
      weighting: ''
    }
  }),
  mounted () {
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
    deleteModule (module) {
      this.semesterRef.child('modules/' + module.id).remove();
    },
    submitMark () {
      const id = helper.newId(this.selectedModule.marks ? this.selectedModule.marks.map(m => m.id) : []);
      let mark = this.mark.id ? this.mark : Object.assign({}, this.mark, {id});
      mark = Object.assign(mark, {mark: parseFloat(mark.mark), weighting: parseFloat(mark.weighting)});
      this.semesterRef.child(`modules/${this.selectedModule.id}/marks/${id}`).set(mark);
      this.clearMark();
    },
    deleteMark (module, mark) {
      this.semesterRef.child(`modules/${module.id}/marks/${mark.id}`).remove();
    },
    clearMark () {
      this.mark = {mark: '', weighting: ''}
    }
  }
}
