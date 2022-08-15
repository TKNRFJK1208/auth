import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';

axios.defaults.baseURL =
  'https://firestore.googleapis.com/v1/projects/vue-login-form-80a6b/databases/(default)/documents/';
// axios interceptors(request and response) are used to modify the request and response
// before accessing server
axios.interceptors.request.use(
  (config) => {
    // 設定追加が可能
    // console.log('interceptors request', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// after accessing server
axios.interceptors.response.use(
  (response) => {
    // 設定追加が可能
    // console.log('interceptors response', response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//毎回自動認証を行う
store.dispatch('autoLogin');
createApp(App).use(store).use(router).mount('#app');
// axios.interceptors.request.eject(0);
// axios.interceptors.response.eject(0);
