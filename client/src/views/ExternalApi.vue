<template>
  <div>
    <h1>External API</h1>
    <button @click="callApi">Call</button>
    <p>{{ apiMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'external-api',
  data() {
    return {
      apiMessage: '',
    };
  },
  methods: {
    async callApi() {
      const token = await this.$auth.getTokenSilently();
      const { data } = await axios.get('/api/external', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.apiMessage = data;
    },
  },
};
</script>
