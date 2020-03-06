<template>
  <div>
    <h1>Profile</h1>
    <img :src="$auth.user.picture">
    <h2>{{ $auth.user.name }}</h2>
    <p>{{ $auth.user.email }}</p>
    <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
  </div>
</template>
