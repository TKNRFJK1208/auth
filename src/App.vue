<template>
  <div id="app">
    <header>
      <template v-if="isAuthenticated">
        <router-link to="/" class="header-item">Comments</router-link>
        <span @click="logout" class="header-item">Logout</span>
      </template>
      <template v-if="!isAuthenticated">
        <router-link to="/login" class="header-item">Login</router-link>
        <router-link to="/register" class="header-item">Register</router-link>
      </template>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.header-item {
  padding: 10px;
  cursor: pointer;
}
</style>
