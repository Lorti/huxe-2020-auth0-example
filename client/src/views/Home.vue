<template>
  <div>
    <h1>Home</h1>
    <div v-if="!$auth.loading">
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>
