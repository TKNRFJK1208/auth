<template>
  <div>
    <h3>Commetns</h3>
    <label for="email">Email:</label>
    <input type="email" v-model="email" />
    <br>
    <label for="password">Password</label>
    <input type="password" v-model="password" />
    <br>
    <button @click="post">Post</button>
    <div v-for="post in posts" :key="post.name">
      <div>email: {{ post.fields.email.stringValue }}</div>
      <div>password: {{ post.fields.password.stringValue }}</div>
    </div>
  </div>
</template>

<script>
import axios from '../axios-auth';
export default {
  name: 'Comments',
  data() {
    return {
      email: '',
      password: '',
      posts: []
    }
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    }
  },
  created() {
    axios.get(
      'https://firestore.googleapis.com/v1/projects/vue-login-form-80a6b/databases/(default)/documents/user',
      {
        headers: {
          Authorization: `Bearer ${this.idToken}`
        }
      }
    ).then(response => {
      this.posts = response.data.documents;
    })
  },
  methods: {
    post() {
      // 非同期処理, promiseを返す, 重たい処理はpromiseを使う
      axios.post(
        'https://firestore.googleapis.com/v1/projects/vue-login-form-80a6b/databases/(default)/documents/user',
        {
          fields: {
            email: {
              stringValue: this.email
            },
            password: {
              stringValue: this.password
            }
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }
      )
      this.email = '';
      this.password = '';
    }
  }
}
</script>