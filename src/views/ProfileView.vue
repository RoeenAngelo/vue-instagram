<script setup>
import { useRoute } from 'vue-router';
import Profile from '../components/Profile.vue';

const route = useRoute()
</script>

<!-- bind :key to profile inorder to make the route reactive and listen for the username, so
    the Profile will be re-rendered (persist) -->
<template>
  <Profile :key="$route.params.username"  />
</template>
