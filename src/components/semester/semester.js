import template from './semester.html';

export default {
  template,
  data: () => ({
    semester: {},
    semesterRef: {},
    selectedModule: null,
    module: {
      name: '',
      time: '',
      room: ''
    },
    mark: {
      mark: '',
      weighting: ''
    },
    fields: {
      name: {
        label: 'Name',
        sortable: true
      },
      time: {
        label: 'Time',
        sortable: true
      },
      room: {
        label: 'Room'
      },
      actions: {
        label: 'Actions'
      }
    },
    moduleFields: {
      mark: {
        label: 'Mark',
        sortable: true
      },
      weighting: {
        label: 'Weighting',
        sortable: true
      }
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
        this.semester.modules = this.semester.modules
          ? this.semester.modules.filter(m => !!m)
          : [];
        if (this.selectedModule) {
          const selected = this.semester.modules
            ? this.semester.modules.find(m => this.selectedModule.id === m.id)
            : null;
          this.selectModule(selected);
        }
      });
    }
  },
  computed: {
    average () {
      if (this.selectedModule && this.selectedModule.marks && this.selectedModule.marks.length > 0) {
        const sum = this.selectedModule.marks.map(m => m.mark * m.weighting).reduce((a, b) => a + b);
        const count = this.selectedModule.marks.map(m => m.weighting).reduce((a, b) => a + b)
        const average = sum / count;
        return Math.round(average * 100) / 100;
      }
    }
  },
  methods: {
    next (array) {
      const max = Math.max(...array);
      return !isFinite(max) || isNaN(max) ? 1 : max + 1;
    },
    selectModule (module) {
      if (module) {
        this.selectedModule = Object.assign({}, module, {marks: module.marks && module.marks.length > 0 ? module.marks.filter(m => !!m) : []});
      }
    },
    submitModule () {
      const id = this.next(this.semester.modules ? this.semester.modules.map(s => s.id) : []);
      const module = this.module.id ? this.module : Object.assign({}, this.module, {id});
      this.semesterRef.child('modules/' + module.id).set(module);
      this.clearModule();
    },
    clearModule () {
      this.module = { name: '', time: '', room: '' };
    },
    submitMark () {
      const id = this.next(this.selectedModule.marks ? this.selectedModule.marks.map(m => m.id) : []);
      let mark = this.mark.id ? this.mark : Object.assign({}, this.mark, {id});
      mark = Object.assign(mark, {mark: parseFloat(mark.mark), weighting: parseFloat(mark.weighting)});
      this.semesterRef.child(`modules/${this.selectedModule.id}/marks/${id}`).set(mark);
      this.clearMark();
    },
    clearMark () {
      this.mark = {mark: '', weighting: ''}
    }
  }
}
