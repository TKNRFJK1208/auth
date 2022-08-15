import axios from 'axios';

// axios.create でカスタムインスタンスを作成
const instance = axios.create({
  baseURL:
    // 'https://firestore.googleapis.com/v1/projects/vue-login-form-80a6b/databases/(default)/documents/',
    'https://identitytoolkit.googleapis.com/v1',
});

export default instance;
