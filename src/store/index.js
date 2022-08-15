import { createStore } from 'vuex';
import axios from '../axios-auth';
import axiosRefresh from '../axios-refresh';
import router from '../router';

export default createStore({
  state: {
    idToken: null,
  },
  getters: {
    idToken: (state) => state.idToken,
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
  },
  actions: {
    async autoLogin({ commit, dispatch }) {
      const idToken = localStorage.getItem('idToken');
      if (!idToken) return;
      const now = new Date();
      const expiryTimeMs = localStorage.getItem('expiryTimeMs');
      // 有効期限が切れてるかどうか
      const isExpired = now.getTime() >= expiryTimeMs;
      const refreshToken = localStorage.getItem('refreshToken');
      if (isExpired) {
        await dispatch('refreshIdToken', refreshToken);
      } else {
        const expiresInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch('refreshIdToken', refreshToken);
        }, expiresInMs);
      }
      // 有効期限が切れている場合はリフレッシュトークンを取得してトークンを更新する
      commit('updateIdToken', idToken);
    },
    login({ dispatch }, authData) {
      axios
        .post(
          '/accounts:signInWithPassword?key=AIzaSyBwuw2Fmx-CORBKprzFfr67fsBxrt7fYY4',
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          dispatch('setAuthData', {
            idToken: response.data.idToken,
            expiresIn: response.data.expiresIn,
            refreshToken: response.data.refreshToken,
          });
          router.push('/');
        });
    },
    logout({ commit }) {
      commit('updateIdToken', null);
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiryTimeMs');
      localStorage.removeItem('refreshToken');
      router.replace('/login');
    },
    // 1時間後以降にrefreshTokenを使ってidTokenを更新する
    async refreshIdToken({ dispatch }, refreshToken) {
      await axiosRefresh
        .post('/token?key=AIzaSyBwuw2Fmx-CORBKprzFfr67fsBxrt7fYY4', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        })
        .then((response) => {
          dispatch('setAuthData', {
            idToken: response.data.id_token,
            expiresIn: response.data.expires_in,
            refreshToken: response.data.refresh_token,
          });
        });
    },
    register({ dispatch }, authData) {
      axios
        .post('/accounts:signUp?key=AIzaSyBwuw2Fmx-CORBKprzFfr67fsBxrt7fYY4', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((response) => {
          dispatch('setAuthData', {
            idToken: response.data.idToken,
            expiresIn: response.data.expiresIn,
            refreshToken: response.data.refreshToken,
          });
          router.push('/');
        });
    },
    setAuthData({ commit, dispatch }, authData) {
      const now = new Date();
      // 今+1時間後のタイムスタンプを設定
      const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
      commit('updateIdToken', authData.idToken);
      localStorage.setItem('idToken', authData.idToken);
      localStorage.setItem('expiryTimeMs', expiryTimeMs);
      localStorage.setItem('refreshToken', authData.refreshToken);
      setTimeout(() => {
        dispatch('refreshIdToken', authData.refreshToken);
      }, authData.expiresIn * 1000);
    },
  },
});
