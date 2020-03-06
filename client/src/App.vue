<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>

      <template v-if="$auth.isAuthenticated">
        | <router-link to="/profile">Profile</router-link>
        | <router-link to="/external-api">External API</router-link>
      </template>
    </div>
    <router-view/>
  </div>
</template>
