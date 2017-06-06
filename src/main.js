// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('vue-material/dist/vue-material.css');
require('./styles/styles.scss');

import Vue from 'vue';
import VueMaterial from 'vue-material';

import router from './router';
import firebase from './services/firebase';
import App from './components/app/app';

Vue.config.productionTip = false

Vue.use(VueMaterial)

Vue.prototype.$bus = new Vue();
Vue.prototype.$firebase = firebase;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
