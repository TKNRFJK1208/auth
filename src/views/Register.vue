<template>
  <div>
    <h3>Register</h3>
    <label for="email">Email:</label>
    <input type="email" v-model="email" />
    <br>
    <label for="password">Password</label>
    <input type="password" v-model="password" />
    <br>
    <button @click="register">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    register() {
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password
      })
      this.email = '';
      this.password = '';
    }
  }
}
</script>