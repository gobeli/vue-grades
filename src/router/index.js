import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/login';
import Semester from '@/components/semester/semester';
import Home from '@/components/home/home';
import Module from '@/components/module/module';
import Mark from '@/components/mark/mark';
import { authService } from '../services/user';

Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        auth: false
      }
    }, {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        auth: true
      }
    }, {
      path: '/semester/:id',
      name: 'Semester',
      component: Semester,
      meta: {
        auth: true
      }
    }, {
      path: '/semester/:id/module/:moduleId',
      name: 'Module',
      component: Module,
      meta: {
        auth: true
      }
    }, {
      path: '/semester/:id/module/:moduleId/mark',
      name: 'Mark',
      component: Mark,
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  authService.authenticated().then(auth => {
    if (to.meta.auth && !auth) {
      next({ path: '/login' });
    } else {
      next();
    }
  });
});

export default router;
