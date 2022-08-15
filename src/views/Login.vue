<template>
  <div>
    <h3>Login</h3>
    <label for="email">Email:</label>
    <input type="email" v-model="email" />
    <br>
    <label for="password">Password</label>
    <input type="password" v-model="password" />
    <br>
    <button @click="login">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      this.email = '';
      this.password = '';
    }
  }
}
</script>