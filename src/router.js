import { createRouter, createWebHistory } from 'vue-router';
import Comments from './views/Comments.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import store from './store';

const routes = [
  {
    path: '/',
    component: Comments,
    beforeEnter(to, from, next) {
      if (store.getters.idToken) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/login',
    component: Login,
    beforeEnter(to, from, next) {
      if (store.getters.idToken) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/register',
    component: Register,
    beforeEnter(to, from, next) {
      if (store.getters.idToken) {
        next();
      } else {
        next('/login');
      }
    },
  },
];
const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
